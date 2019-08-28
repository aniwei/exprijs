export default function updateHostText (
  current,
  workInProgress
) {
  const nextProps = workInProgress.pendingProps;

  workInProgress.memoizedProps= nextProps;
}