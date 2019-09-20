import uuid from "uuid/v4";
import EventAction from "./actions/EventAction";

interface EventQueueItem {
  id: string;
  time: number;
  maxTime: number;
  repeat: number;
  description: string;
}

interface EventQueueItemData {
  data?: object;
  onAdd?: () => void;
  onTick?: () => void;
}

class EventQueueItem implements EventQueueItem {
  id: string;

  time: number;

  maxTime: number;

  repeat: number;

  description: string;

  dispatch: React.Dispatch<EventAction>;

  data?: object;

  onAdd?: () => void;

  onTick?: () => void;

  constructor(
    time: number,
    maxPrio: number,
    repeat: number,
    description: string,
    { data, onAdd, onTick }: EventQueueItemData
  ) {
    this.id = uuid();
    this.time = time;
    this.maxTime = maxPrio;
    this.repeat = repeat;
    this.description = description;
    this.data = data;
    this.onAdd = onAdd;
    this.onTick = onTick;
  }
}

export default EventQueueItem;
