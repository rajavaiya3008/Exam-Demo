export const emailValidation = [
  { required: true, message: "Please Enter Email" },
  {
    pattern: /^[a-zA-Z0-9]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/,
    message: "Enter Valid Email",
  },
];

export const confirmPasswordValidation = [
  { required: true, message: "Please Enter Password" },
  { length: 6, message: "Password Must be 6 char" },
];

export const passwordValidation = [
  ...confirmPasswordValidation,
  { pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, message: "Enter Valid Password" },
];

const examValidationData = (requireMsg,validMsg) => {
  return [
    { required: true, message: requireMsg },
    { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: validMsg },
  ]
}
export const nameValidation = [...examValidationData("Please Enter Name","Enter Valid Name"),{ length: 3, message: "username Must be 3 char" }]

const opRequireMsg = 'Option Required'
const opValidMsg = 'Enter Valid Option'

export const examValidation = {
  subjectName: examValidationData('Please Enter Subject','Enter Valid Subject'),
  question: examValidationData('Please Enter Question','Enter Valid Question'),
  op1: examValidationData(opRequireMsg,opValidMsg),
  op2: examValidationData(opRequireMsg,opValidMsg),
  op3: examValidationData(opRequireMsg,opValidMsg),
  op4: examValidationData(opRequireMsg,opValidMsg),
  answer: [{ required: true, message: "Answer Required" }],
};
