import scheduleWork from './worker/scheduleWork';


export default function scheduleRootUpdate(current, element) {
  scheduleWork(current, element);
}