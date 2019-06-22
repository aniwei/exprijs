import { isNull } from '../../shared/is';
import commitRoot from './commitRoot';

export default function completeRoot (
  root,
  finishedWork
) {
  const { firstBatch } = root;
  
  if (!isNull(firstBatch)) {

  }

  root.finishedWork = null;
  
  commitRoot(
    root, 
    finishedWork
  );
}