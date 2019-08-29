import scheduleRootUpdate from '../scheduler/scheduleRootUpdate';


export default function updateContainer (
  element,
  root
) {
  const current = root.current;

  return scheduleRootUpdate(current, element);
}