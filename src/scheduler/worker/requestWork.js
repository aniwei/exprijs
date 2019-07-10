import { request } from 'requestidlecallback';

import performWork from './performWork';

export default function requestWork () {
  request(performWork);
}