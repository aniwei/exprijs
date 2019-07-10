import { CLASS_COMPONENT, HOST_ROOT } from '../../shared/workTags';

import updateClassComponent from '../updater/updateClassComponent';
import updateHostComponent from '../updater/updateHostComponent';
import { HOST_COMPONENT } from '../../shared';

export default function beginWork (workInProgress) {
  const { tag } = workInProgress;

  switch (tag) {
    case CLASS_COMPONENT: {
      return updateClassComponent(workInProgress);
    }

    case HOST_ROOT: {
      return updateHostComponent(workInProgress);
    }
  }
};