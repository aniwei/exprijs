export default function updateClassComponent (
  current,
  workInProgress,
  Component,
  nextProps
) {
  const classComponent = new ClassComponent(
    current,
    workInProgress,
    Component,
    nextProps
  );

  return classComponent.workInProgress.child;
}



