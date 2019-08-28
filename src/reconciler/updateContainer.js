import scheduleRootUpdate from '../scheduler/scheduleRootUpdate';


export default function updateContainer (
  element,
  fiber
) {
  const current = fiber.current;
  return scheduleRootUpdate(current, element);
}