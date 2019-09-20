// vim: set ft=typescript.tsx sts=2 sw=2:

import React, { useState, useReducer } from "react";

import { TextField, Paper, Button, Typography } from "@material-ui/core";

import Event from "./Event";
import ActionType from "./actions/ActionType";
import EventAction from "./actions/EventAction";
import EventQueue from "./EventQueue";
import EventQueueItem from "./EventQueueItem";
import AddEvent from "./actions/AddEvent";
import PopEvent from "./actions/PopEvent";
import StatusCard from "./StatusCard";

const App: React.FC = () => {
  const [eventDescription, setEventDescription] = useState("");
  const [repetitions, setRepetitions] = useState(-1);
  const [duration, setDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [triggeredEvent, setTriggeredEvent] = useState(null);

  const queueReducer = (state: EventQueue, action: EventAction): EventQueue => {
    switch (action.type) {
      case ActionType.ADD_EVENT: {
        const { maxTime, time, repeat, description } = action;

        if (description) {
          return [
            ...state,
            new EventQueueItem(time, maxTime, repeat, description, {})
          ].sort(({ time: time1 }, { time: time2 }) => time1 - time2);
        }
        return state;
      }
      case ActionType.POP_EVENT: {
        const [nextEvent, ...newState] = state;
        if (!nextEvent) return state;
        setTriggeredEvent(nextEvent);
        return [
          ...newState.map(event => ({
            ...event,
            time: Math.max(0, event.time - nextEvent.time)
          })),
          ...(nextEvent.repeat
            ? [
                {
                  ...nextEvent,
                  repeat: nextEvent.repeat - 1,
                  time: nextEvent.maxTime
                }
              ]
            : [])
        ].sort(({ time: time1 }, { time: time2 }) => time1 - time2);
      }
      case ActionType.MODIFY_EVENT: {
        const newState = [...state];
        const { id, time } = action;
        const index = newState.findIndex(({ id: entryId }) => id === entryId);
        newState.splice(index, 1, {
          ...newState[index],
          time: newState[index].time + time
        });
        return newState;
      }
      case ActionType.REMOVE_EVENT: {
        const newState = [...state];
        const { id } = action;
        newState.splice(
          newState.findIndex(({ id: entryId }) => id === entryId),
          1
        );
        return newState.sort(
          ({ time: time1 }, { time: time2 }) => time1 - time2
        );
      }
      default: {
        return state;
      }
    }
  };

  const [queue, dispatch] = useReducer(queueReducer, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: 20,
        flexDirection: "column",
        textAlign: "center"
      }}
    >
      <div>
        <Typography variant="h1">Novus Initiative Tracker</Typography>
      </div>

      <Paper>
        {triggeredEvent &&
          `${triggeredEvent.description} - Repetitions Left: ${
            triggeredEvent.repeat >= 0 ? triggeredEvent.repeat : "Forever"
          }`}
      </Paper>

      <div
        style={{
          height: "60vh",
          margin: "20px calc(20px + 8%)",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr"
        }}
      >
        <Paper
          style={{
            margin: 5,
            overflowY: "auto",
            padding: 10
          }}
        >
          {queue.map(({ id, ...props }) => (
            <Event key={id} dispatch={dispatch} id={id} {...props} />
          ))}
        </Paper>

        <Paper
          style={{
            margin: 5,
            overflowY: "auto",
            padding: 10
          }}
        >
          <StatusCard>Stun</StatusCard>
          <StatusCard>Poison</StatusCard>
          <StatusCard>Incapacitated</StatusCard>
        </Paper>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TextField
          variant="outlined"
          label="Event Description"
          style={{
            margin: "5px 5px"
          }}
          defaultValue=""
          onChange={({ target: { value } }): void => setEventDescription(value)}
        />
        <TextField
          variant="outlined"
          label="Duration"
          type="number"
          style={{ margin: "5px 5px", width: "8em" }}
          defaultValue={0}
          onChange={({ target: { value } }): void =>
            setDuration(parseInt(value, 10))
          }
        />
        <TextField
          variant="outlined"
          label="Max Duration"
          type="number"
          defaultValue={0}
          style={{ margin: "5px 5px", width: "8em" }}
          onChange={({ target: { value } }): void =>
            setMaxDuration(parseInt(value, 10))
          }
        />
        <TextField
          variant="outlined"
          label="Repetitions"
          type="number"
          defaultValue={-1}
          style={{ margin: "5px 5px", width: "8em" }}
          onChange={({ target: { value } }): void =>
            setRepetitions(parseInt(value, 10))
          }
        />

        <Button
          variant="contained"
          onClick={(): void =>
            dispatch(
              new AddEvent(duration, maxDuration, repetitions, eventDescription)
            )
          }
        >
          Add Event
        </Button>
      </div>

      <div>
        <Button
          variant="contained"
          onClick={(): void => dispatch(new PopEvent())}
        >
          Pop Entry
        </Button>
      </div>
    </div>
  );
};

export default App;
