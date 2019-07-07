import {
  DELETION,
  UPDATE,
  PLACEMENT
} from '../../shared/effectTags';

export default function commitWork (fiber) {
  const { effectTag } = fiber;

  switch (effectTag) {
    case PLACEMENT: {
      break;
    }

    case UPDATE: {
      break;
    }

    case DELETION: {
      break;
    }
  }
}

export const commitWork = fiber => {
  if (fiber.tag == HOST_ROOT) {
    return;
  }

  let domParentFiber = fiber.parent;
  while (domParentFiber.tag == CLASS_COMPONENT) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.stateNode;

  if (fiber.effectTag == PLACEMENT && fiber.tag == HOST_COMPONENT) {
    domParent.appendChild(fiber.stateNode);
  } else if (fiber.effectTag == UPDATE) {
    updateDomProps(fiber.stateNode, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag == DELETION) {
    commitDeletion(fiber, domParent);
  }
};
