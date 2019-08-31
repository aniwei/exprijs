import { FUNCTION_COMPONENT, HOST_COMPONENT, HOST_TEXT } from '../../shared/workTags';

export default function commitWork (
  current,
  nextEffect
) {
  const { tag } = nextEffect;

  switch (tag) {
    case FUNCTION_COMPONENT: {
      break;
    }

    case HOST_COMPONENT: {
      const instance = nextEffect.stateNode;

      const props = nextEffect.
      break;
    }

    case HOST_TEXT: {
      
    }
  }
}