import scheduleRootUpdate from '../scheduler/scheduleRootUpdate';


export default function updateContainer (
  element,
  root,
  callback
) {
  const current = root.current;

  return scheduleRootUpdate(current, element, callback);
}