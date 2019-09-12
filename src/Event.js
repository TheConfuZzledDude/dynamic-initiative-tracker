// vim: set ft=javascript.jsx sts=2 sw=2:

import { Paper, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { red } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import { ADD_ENTRY, POP_ENTRY, REMOVE_ENTRY, MODIFY_ENTRY } from "./enums";

const Event = ({ prio, description, repeat, id, dispatch }) => {
  const [durationModifier, setDurationModifier] = useState(0);

  return (
    <Paper>
      {prio} ticks ({prio / 4} seconds) | {description}{" "}
      {repeat > 0 && `| ${repeat} more times`}
      <TextField
        type="number"
        label="Time to Add"
        onChange={({ target: { value } }) => setDurationModifier(value)}
      />
      <Button
        style={{ margin: "5px 5px" }}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => dispatch({ type: MODIFY_ENTRY, id })}
      >
        Delete
      </Button>
      <Button
        style={{ backgroundColor: red[400], margin: "5px 5px" }}
        variant="contained"
        size="small"
        onClick={() => dispatch({ type: REMOVE_ENTRY, id })}
      >
        Delete
      </Button>
    </Paper>
  );
};

Event.propTypes = {
  prio: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  repeat: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Event;
