import { isNull } from '../shared/is';
import { HOST_ROOT, CLASS_COMPONENT } from '../shared/workTags';


const worker = {
  nextUnitOfWork: null,
  pendingCommit: null,
}


worker.beginWork = function () {}
worker.performWork = function () {}
worker.commitWork = function () {}


export function scheduleWork () {
  
}

export default worker;