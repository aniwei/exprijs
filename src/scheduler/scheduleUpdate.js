import { request } from 'requestidlecallback';

import * as shared from '../shared';
import performWork from './worker/performWork';

export const scheduleUpdate = (instance, partialState) => {
  shared.updateQueue.push({
    from: lets.CLASS_COMPONENT,
    instance: instance,
    partialState: partialState
  });
  
  request(performWork);
};