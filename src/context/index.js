const context = {
  stack: [],
  index: -1
}

export function pop (
  cursor, 
  fiber
) {
  const { stack, index } = context;
  if (index > -1) {
    cursor.current = stack[index];
    stack[index] = null;
    context.index--;
  }
}

export function push (
  cursor,
  value,
  fiber
) {
  const index = (context.index++);

  context.stack[index] = cursor.current;
  cursor.current = value;
}

export function createCursor () {
  return { current: null }
}