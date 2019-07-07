import {
  CLASS_COMPONENT
} from '../../shared/workTags';

import updateClassComponent from '../updater/updateClassComponent';

export default function beginWork (workInProgress) {
  const { tag } = workInProgress;

  switch (tag) {
    case CLASS_COMPONENT: {
      return updateClassComponent(workInProgress);
    }
  }
}