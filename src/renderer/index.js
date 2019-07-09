import { request } from 'requestidlecallback';
import { HOST_ROOT, updateQueue } from '../shared'
import performWork from '../scheduler/worker/performWork';


export const render = (elements, containerDom) => {
    updateQueue.push({
        from: HOST_ROOT,
        dom: containerDom,
        newProps: { children: elements }
    });
    
    request(performWork);
}
