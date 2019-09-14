import AddEvent from "./AddEvent";
import ModifyEvent from "./ModifyEvent";
import PopEvent from "./PopEvent";
import RemoveEvent from "./RemoveEvent";

type EventAction = AddEvent | ModifyEvent | PopEvent | RemoveEvent;
export default EventAction;
