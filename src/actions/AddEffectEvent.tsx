import ActionType from "./ActionType";
import StatusEffect from "../status_effects/StatusEffect";

interface AddEffectEvent {
  type: ActionType.ADD_EFFECT_EVENT;
  id: string;
  effect: StatusEffect;
}

class AddEffectEvent implements AddEffectEvent {
  type: ActionType.ADD_EFFECT_EVENT = ActionType.ADD_EFFECT_EVENT;

  id: string;

  effect: StatusEffect;

  constructor(id: string, effect: StatusEffect) {
    this.id = id;
    this.effect = effect;
  }
}

export default AddEffectEvent;
