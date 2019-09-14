import ActionType from "./ActionType";

interface RemoveEvent {
  type: ActionType.REMOVE_EVENT;
  id: string;
}

class RemoveEvent implements RemoveEvent {
  id: string;

  type: ActionType.REMOVE_EVENT = ActionType.REMOVE_EVENT;

  constructor(id: string) {
    this.id = id;
  }
}

export default RemoveEvent;
