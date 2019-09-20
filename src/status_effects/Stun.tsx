import StatusEffect from "./StatusEffect";
import EventAction from "../actions/EventAction";
import EventQueueItem from "../EventQueueItem";

class Stun implements StatusEffect {
  type = "STUN";

  dispatch: React.Dispatch<EventAction>;

  duration?: number;

  constructor(dispatch: React.Dispatch<EventAction>, duration?: number) {
    this.dispatch = dispatch;
    this.duration = duration;
  }

  onAdd = (_event: EventQueueItem): void => {};

  onTick = (_event: EventQueueItem): void => {};

  getDescription = (_event: EventQueueItem): string => "Character is stunned";
}

export default Stun;
