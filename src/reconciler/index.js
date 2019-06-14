
const batchUpdater = {
  isBatchingUpdates: false,
  isUnbatchingUpdates: false,
  unbatchedUpdates (callback) {
    if (this.isBatchingUpdates && !this.isUnbatchingUpdates) {
      this.isUnbatchingUpdates = true;

      try {
        return callback();
      } finally {
        this.isUnbatchingUpdates = false;
      }
    }

    return callback();
  }
}

export function unbatchedUpdates (callback) {
  return batchUpdater.unbatchedUpdates(callback);
}
