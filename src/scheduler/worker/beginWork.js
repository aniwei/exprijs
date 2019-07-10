import { CLASS_COMPONENT, HOST_ROOT } from '../../shared/workTags';

import updateClassComponent from '../updater/updateClassComponent';
import updateHostComponent from '../updater/updateHostComponent';
import updateHostRoot from '../updater/updateHostRoot';

import { HOST_COMPONENT } from '../../shared';

export default function beginWork (workInProgress) {
  const { tag, alternate: current } = workInProgress;
  

  switch (tag) {
    case CLASS_COMPONENT: {
      return updateClassComponent(current, workInProgress);
    }

    case HOST_ROOT: {
      debugger;
      return updateHostRoot(current, workInProgress);
    }
  }
};