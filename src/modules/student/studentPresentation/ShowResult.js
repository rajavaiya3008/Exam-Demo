import React from "react";
import { useShowResult } from "../studentContainer/useShowResult";
import { useLoading } from "../../../hooks/useLoading";
import Button from "../../../shared/Button";
import Loader from "../../../shared/Loader";

const ShowResult = () => {
  const { result, handleBack } = useShowResult();
  const {subjectName,rank,score} = result[0] || {}

  return (
    <div className="flex items-center flex-col mt-[70px] overflow-hidden">
      {useLoading() ? (
        <Loader loaderStyle="spinner"/>
      ) : (
        <div>
          <h2 className="text-4xl text-center">Results</h2>

          <div className="text-2xl mt-[20px] max-[400px]:text-xl max-[350px]:text-lg">
            <pre>Subject: {subjectName}</pre>
            <pre>Rank: {rank}</pre>
            <pre>Score: {score}</pre>
            <Button onSubmit={handleBack} cusStyle='mt-[15px]'>
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowResult;
