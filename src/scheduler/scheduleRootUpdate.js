import scheduleWork from './scheduleWork';

function createRoot () {

}

function updatRoot () {
  
}

export default function scheduleRootUpdate(current, element) {
  const root = createRoot(element);
  current._reactRoot = root;

  scheduleWork(current);
}