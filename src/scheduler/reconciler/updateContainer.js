import scheduleRootUpdate from './scheduleRootUpdate';

export default function updateContainer (
  element,
  container,
  parentComponent,
  callback
) {
  const { current } = container;

  return scheduleRootUpdate(
    current,
    element,
    callback
  );
}