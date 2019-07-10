import { isNull } from "../../shared/is";

export default function appendUpdateToQueue (queue, update) {
  if (isNull(queue.lastUpdate)) {
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
}