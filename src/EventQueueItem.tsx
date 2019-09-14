import uuid from "uuid/v4";

interface EventQueueItem {
  id: string;
  time: number;
  maxTime: number;
  repeat: number;
  description: string;
}

class EventQueueItem implements EventQueueItem {
  id: string;

  time: number;

  maxTime: number;

  repeat: number;

  description: string;

  constructor(
    time: number,
    maxPrio: number,
    repeat: number,
    description: string
  ) {
    this.id = uuid();
    this.time = time;
    this.maxTime = maxPrio;
    this.repeat = repeat;
    this.description = description;
  }
}

export default EventQueueItem;
