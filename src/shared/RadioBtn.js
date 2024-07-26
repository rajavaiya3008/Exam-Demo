import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAnsIndexes } from "../redux/slices/teacher";

const RadioBtn = ({ fieldData }) => {
  const dispatch = useDispatch();
  const ansIndex = useSelector((state) => state.teacher.ansIndex);
  const {
    type,
    id,
    name,
    updateData,
    currQuestion,
    opIndex,
    data,
    currAnsIndex,
    ans,
  } = fieldData || {};
  const checked = data?.[id] === ans && ansIndex?.[currQuestion] === opIndex;

  const fieldAttribute = { type, id, name, checked };

  return (
    <div>
      <input
        {...fieldAttribute}
        onChange={(e) => {
          dispatch(
            handleAnsIndexes({
              currQuestion: currQuestion,
              ansIndex: opIndex,
            })
          );
          const { name, value } = e?.target || {};
          let Data = {
            name,
            value,
            queIndex: currQuestion,
            opIndex,
            ans: data?.[id],
            ansIndex: currAnsIndex,
          };
          dispatch(updateData(Data));
        }}
        className="border-black border"
      />
    </div>
  );
};

export default memo(RadioBtn);
