function getRoot (fiber) {
  while (fiber.return) {
    fiber = fiber.return;
  }

  return fiber;
}

export default function resetNextUnitOfWork () {
  
}

