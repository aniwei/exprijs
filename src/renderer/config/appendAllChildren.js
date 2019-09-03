import { isNullOrUndefined } from '../../shared/is';
import { HOST_COMPONENT, HOST_TEXT, FundamentalComponent, HOST_PORTAL } from '../../shared/workTags';
import appendInitialChild from './appendInitialChild';

export default function appendAllChildren (
  instance,
  workInProgress
) {
  let node = workInProgress.child;

  while (!isNullOrUndefined(node)) {
    if (node.tag === HOST_COMPONENT || node.tag === HOST_TEXT) {
      appendInitialChild(instance, node.stateNode);
    } else if (node.tag === FundamentalComponent) {
      appendInitialChild(instance, node.stateNode.instance);
    } else if (node.tag === HOST_PORTAL) {
      // If we have a portal child, then we don't want to traverse
      // down its children. Instead, we'll get insertions from each child in
      // the portal directly.
    } else if (!isNullOrUndefined(node.child)) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}