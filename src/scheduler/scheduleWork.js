import requestWork from './worker/requestWork'

export default function schedulWork (
  current,
  mode
) {
  requestWork(current, mode);
}