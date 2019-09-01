import { INDETERMINATE_COMPONENT, HOST_ROOT, CLASS_COMPONENT, HOST_COMPONENT } from '../../shared/workTags';
import { PLACEMENT } from '../../shared/effectTags';
import { isNullOrUndefined, isContextProvider } from '../../shared/is';
import updateHostComponent from '../updater/updateHostComponent';
import createInstance from '../../renderer/config/createInstance';
import ReactCurrentRootInstance from '../../react/ReactCurrentRootInstance';
import setInitialProperties from '../../renderer/config/setInitialProperties';


export default function completeWork (
  current,
  workInProgress
) {
  const nextProps = workInProgress.pendingProps;
  const { tag } = workInProgress;

  switch (tag) {
    case CLASS_COMPONENT: {
      const Component = workInProgress.type;
      if (isContextProvider(Component)) {
        popContext();
      }
      break;
    }

    case HOST_ROOT: {
      const root = workInProgress.stateNode;

      if (root.pendingContext) {
        root.context = root.pendingContext;
        root.pendingContext = null;
      }

      if (isNullOrUndefined(current) || isNullOrUndefined(current.child)) {
        workInProgress.effectTag &= ~PLACEMENT;
      }

      // updateHostContainer()

      break;
    }

    case HOST_COMPONENT: {
      const type = workInProgress.type;
      const nextProps = workInProgress.pendingProps;
      const rootContainerInstance = getRootHostContainer();

      if (!isNullOrUndefined(current) && !isNullOrUndefined(workInProgress.stateNode)) {
        updateHostComponent(current, workInProgress, type, nextProps);
      } else {
        const instance = createInstance(type, nextProps, null, null, workInProgress);

        workInProgress.stateNode = instance;

        setInitialProperties(instance, type, nextProps, rootContainerInstance);
      }

      break;
    }

    case isContextProvider: {
      break;
    }
  }
}

function getRootHostContainer () {
  const rootInstance = ReactCurrentRootInstance.current;
  return rootInstance;
}