import { CLASS_COMPONENT } from '../../shared';
import updateClassComponent from '../updater/updateClassComponent';
import updateHostComponent from '../updater/updateHostComponent';

export default function beginWork (wipFiber) {
  if (wipFiber.tag == CLASS_COMPONENT) {
    updateClassComponent(wipFiber);
  } else {
    updateHostComponent(wipFiber);
  }
};