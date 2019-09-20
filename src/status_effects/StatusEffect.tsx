import { ReactElement } from "react";
import EventQueueItem from "../EventQueueItem";

interface StatusEffect {
  type: string;
  onAdd: (event: EventQueueItem) => void;
  onTick: (event: EventQueueItem) => void;
  getDescription: (event: EventQueueItem) => string | ReactElement;
}

export default StatusEffect;
