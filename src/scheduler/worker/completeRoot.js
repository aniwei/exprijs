import commitRoot from './commitRoot';

export default function completeRoot (
  root,
  finishedWork
) {
  if (root.finishedWork) {
    root.finishedWork = null;
    commitRoot(root, finishedWork);
  }
}