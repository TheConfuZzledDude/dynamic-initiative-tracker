import ActionType from "./ActionType";

interface ModifyEvent {
  type: ActionType.MODIFY_EVENT;
  id: string;
  time: number;
}

class ModifyEvent implements ModifyEvent {
  type: ActionType.MODIFY_EVENT = ActionType.MODIFY_EVENT;

  id: string;

  time: number;

  constructor(time: number) {
    this.time = time;
  }
}

export default ModifyEvent;
