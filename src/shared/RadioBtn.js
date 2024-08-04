import React, { memo } from "react";

const RadioBtn = ({ fieldData }) => {
  const {
    type,
    id,
    name,
    value,
    updateData,
    checked,
  } = fieldData || {};

  const fieldAttribute = { type, id, name, value, checked };

  return (
    <div>
      <input
        {...fieldAttribute}
        onChange={(e) => {
          updateData(e)
        }}
        className="border-black border"
      />
    </div>
  );
};

export default memo(RadioBtn);
