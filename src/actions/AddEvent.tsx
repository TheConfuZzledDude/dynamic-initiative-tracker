import ActionType from "./ActionType";

interface AddEvent {
  type: ActionType.ADD_EVENT;
  maxTime: number;
  time: number;
  repeat: number;
  description: string;
}

class AddEvent implements AddEvent {
  type: ActionType.ADD_EVENT = ActionType.ADD_EVENT;

  time: number;

  maxTime: number;

  repeat: number;

  description: string;

  constructor(
    time: number,
    maxTime: number,
    repeat: number,
    description: string
  ) {
    this.time = time;
    this.maxTime = maxTime;
    this.repeat = repeat;
    this.description = description;
  }
}

export default AddEvent;
