import AddEvent from "./AddEvent";
import ModifyEvent from "./ModifyEvent";
import PopEvent from "./PopEvent";
import RemoveEvent from "./RemoveEvent";
import AddEffectEvent from "./AddEffectEvent";

type EventAction =
  | AddEvent
  | ModifyEvent
  | PopEvent
  | RemoveEvent
  | AddEffectEvent;
export default EventAction;
