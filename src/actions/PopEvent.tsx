import ActionType from "./ActionType";

interface PopEvent {
  type: ActionType.POP_EVENT;
}

class PopEvent implements PopEvent {
  type: ActionType.POP_EVENT = ActionType.POP_EVENT;
}

export default PopEvent;
