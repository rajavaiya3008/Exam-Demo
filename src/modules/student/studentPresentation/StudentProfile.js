import React from "react";
import InputField from "../../../shared/InputField";
import { useStudentProfile } from "../studentContainer/useStudentProfile";
import { useLoading } from "../../../form/hooks/useLoading";
import Button from "../../../shared/Button";

const StudentProfile = () => {
  const {
    createStudentFields,
    disable,
    saveProfile,
    handleCancel,
    setDisable,
  } = useStudentProfile();

  return (
    <div className="flex justify-center mt-[70px] overflow-hidden">
      <div>
        {useLoading() ? (
          <div className="spinner"></div>
        ) : (
          <div>
            <p className="text-center text-4xl mb-4">Your Profile</p>
            {createStudentFields.map((field, i) => (
              <InputField fieldData={field} key={i} />
            ))}
            <div className="flex justify-center mt-2">
              <div className="flex gap-2">
                <Button
                  onSubmit={disable ? () => setDisable(!disable) : saveProfile}
                >
                  <span>{disable ? "Edit" : "Save"}</span>
                </Button>
                {!disable && <Button onSubmit={handleCancel}>Cancel</Button>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
