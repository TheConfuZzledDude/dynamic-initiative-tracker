// vim: set ft=typescript.tsx sts=2 sw=2:

import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { ConnectableElement, DragSourceMonitor, useDrag } from "react-dnd";

import uuid from "uuid";

type StatusCardPropTypes = {
  children?: React.ReactNode;
};

type StatusCard = React.FC<StatusCardPropTypes>;

const StatusCard: React.FC<StatusCardPropTypes> = ({
  children
}: StatusCardPropTypes) => {
  const [{ opacity, isDragging }, dragRef, dragPreview] = useDrag({
    item: { type: "STATUS_EFFECT" },
    collect: (monitor: DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
      isDragging: monitor.isDragging()
    })
  });

  const [key] = useState(uuid());

  return (
    <>
      <Paper
        key={key}
        style={{
          opacity,
          borderRadius: 4,
          margin: 2,
          borderColor: "black",
          borderWidth: isDragging ? 3 : 8
        }}
        ref={(ref: ConnectableElement): void => {
          dragRef(ref);
          dragPreview(ref);
        }}
      >
        {children}
      </Paper>
    </>
  );
};

export default StatusCard;
