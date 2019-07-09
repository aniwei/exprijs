import { request } from 'requestidlecallback';

import performWork from './performWork';

export default function requestWork (current, mode) {
  request(performWork);
}