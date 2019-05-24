import { createWorker } from './fiber/worker';


export function render (type, container, callback) {
  const worker = createWorker(type, container, callback);
  
  return worker;
}