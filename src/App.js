// vim: set ft=javascript.jsx sts=2 sw=2:

import React, { useState, useReducer, useEffect } from "react";

import { Input, Paper, Button, Typography } from "@material-ui/core";
import uuid from "uuid/v4";

import Event from "./Event";

import { ADD_ENTRY, POP_ENTRY, REMOVE_ENTRY, MODIFY_ENTRY } from "./enums";

export default () => {
  const [eventDescription, setEventDescription] = useState("");
  const [repetitions, setRepetitions] = useState(0);
  const [duration, setDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);
  const [triggeredEvent, setTriggeredEvent] = useState(null);

  const queueReducer = (state, action) => {
    switch (action.type) {
      case ADD_ENTRY: {
        const { maxPrio, prio, repeat, description } = action;

        if (description) {
          return [
            ...state,
            {
              id: uuid(),
              prio,
              maxPrio,
              repeat,
              description
            }
          ].sort(({ prio: prio1 }, { prio: prio2 }) => prio1 - prio2);
        }
        return state;
      }
      case POP_ENTRY: {
        const [nextEvent, ...newState] = state;
        if (!nextEvent) return state;
        setTriggeredEvent(nextEvent);
        return [
          ...newState.map(event => ({
            ...event,
            prio: Math.max(0, event.prio - nextEvent.prio)
          })),
          ...(nextEvent.repeat
            ? [
                {
                  ...nextEvent,
                  repeat: nextEvent.repeat - 1,
                  prio: nextEvent.maxPrio
                }
              ]
            : [])
        ].sort(({ prio: prio1 }, { prio: prio2 }) => prio1 - prio2);
      }
      case REMOVE_ENTRY: {
        const newState = [...state];
        const { id } = action;
        newState.splice(
          newState.findIndex(({ id: entryId }) => id === entryId),
          1
        );
        return newState;
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

      <Paper style={{ height: "70vh", margin: "20px 20px", overflowY: "auto" }}>
        {queue.map(({ id, ...props }) => (
          <Event key={id} dispatch={dispatch} {...props} />
        ))}
      </Paper>
      <div>
        <Input
          placeholder="Event Description"
          defaultValue=""
          onChange={({ target: { value } }) => setEventDescription(value)}
        />
        <Input
          placeholder="Duration"
          type="number"
          defaultValue={0}
          onChange={({ target: { value } }) => setDuration(parseInt(value, 10))}
        />
        <Input
          placeholder="Max Durations"
          type="number"
          defaultValue={0}
          onChange={({ target: { value } }) =>
            setMaxDuration(parseInt(value, 10))
          }
        />
        <Input
          placeholder="Repetitions"
          type="number"
          defaultValue={-1}
          onChange={({ target: { value } }) =>
            setRepetitions(parseInt(value, 10))
          }
        />

        <Button
          onClick={() =>
            dispatch({
              type: ADD_ENTRY,
              prio: duration,
              maxPrio: maxDuration,
              repeat: repetitions,
              description: eventDescription
            })
          }
        >
          Add Event
        </Button>
      </div>

      <div>
        <Button
          onClick={() =>
            dispatch({
              type: POP_ENTRY
            })
          }
        >
          Pop Entry
        </Button>
      </div>
    </div>
  );
};
