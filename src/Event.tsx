// vim: set ft=typescript.tsx sts=2 sw=2:

import { Button, Paper, TextField } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import React, { useState } from "react";
import EventAction from "./actions/EventAction";
import ActionType from "./actions/ActionType";

type EventPropTypes = {
  time: number;
  description: string;
  repeat: number;
  id: string;
  dispatch: (action: EventAction) => void;
};

const Event: React.FC<EventPropTypes> = ({
  time,
  description,
  repeat,
  id,
  dispatch
}: EventPropTypes) => {
  const [durationModifier, setDurationModifier] = useState(0);

  return (
    <Paper
      style={{
        display: "flex",
        margin: 10,
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          height: "min-content",
          display: "flex",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        {time} ticks ({time / 4} seconds) | {description}{" "}
        {repeat > 0 && `| ${repeat} more times`}
      </div>
      <TextField
        margin="dense"
        variant="outlined"
        style={{ height: "min-content", margin: "5px 5px", width: "8em" }}
        InputLabelProps={{ shrink: true }}
        type="number"
        label="Time to Add"
        onChange={({ target: { value } }): void =>
          setDurationModifier(parseInt(value, 10))
        }
      />
      <Button
        style={{ height: "min-content", margin: "5px 5px" }}
        variant="contained"
        color="primary"
        size="small"
        onClick={(): void =>
          dispatch({
            type: ActionType.MODIFY_EVENT,
            id,
            time: durationModifier
          })
        }
      >
        Add Time
      </Button>
      <Button
        style={{
          height: "min-content",
          backgroundColor: red[400],
          margin: "5px 5px"
        }}
        variant="contained"
        size="small"
        onClick={(): void => dispatch({ type: ActionType.REMOVE_EVENT, id })}
      >
        Delete
      </Button>
    </Paper>
  );
};

export default Event;
