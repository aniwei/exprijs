import reconciler from '../reconciler';
import worker from './index';
import { 
  performWorkOnRoot, 
  performSyncWork 
} from './performWork';

export default function requestWork (root) {
  if (!worker.isRendering) {
    if (reconciler.isBatchingUpdates) {
      if (reconciler.isUnBatchingUpdates) {
        performWorkOnRoot(root, true);
      }
    }
  } else {
    performSyncWork();
  }
}