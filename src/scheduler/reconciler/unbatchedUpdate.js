import reconciler from './index';

export default function unbatchedUpdate (callback) {
  if (
    reconciler.isBatchingUpdates &&
    !reconciler.isUnBatchingUpdates
  ) {
    reconciler.isUnBatchingUpdates = true;
    
    try {
      return callback();
    } finally {
      reconciler.isUnBatchingUpdates = false;
    }
  }

  return callback()
}