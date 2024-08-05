import React from "react";
import Pagination from "../shared/Pagination";

const keys = ["subjectName", "rank", "score", "resultStatus"];

const CurrStudentDetail = ({currStudentDetail}) => {
  const {name,email,Result} = currStudentDetail || {}

  return (
    <div className="flex flex-col text-xl max-[350px]:text-lg">
      <pre className="text-center">Name: {name}</pre> <br />
      <pre className="text-center">Email: {email}</pre> <br />
      <div className="max-[900px]:w-[850px] max-[860px]:w-[800px] max-[800px]:w-[750px] max-[750px]:w-[700px] max-[700px]:w-[650px] max-[650px]:w-[600px] max-[600px]:w-[540px] max-[530px]:w-[500px] max-[500px]:w-[450px] max-[450px]:w-[400px] max-[400px]:w-[350px] max-[350px]:w-[310px]">
        <pre className="text-center">Result</pre>
        {Result?.length > 0 ? (
          <Pagination data={Result} keys={keys} />
        ) : (
          <pre className="text-center">Result Not found</pre>
        )}
      </div>
    </div>
  );
};

export default CurrStudentDetail;
