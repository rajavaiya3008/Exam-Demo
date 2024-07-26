export const emailValidation = [
  { required: true, message: "Please Enter Email" },
  {
    pattern: /^[a-zA-Z0-9]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/,
    message: "Enter Valid Email",
  },
];
export const passwordValidation = [
  { required: true, message: "Please Enter Password" },
  { length: 6, message: "Password Must be 6 char" },
  { pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, message: "Enter Valid Password" },
];

export const nameValidation = [
  { required: true, message: "Please Enter Name" },
  { length: 3, message: "username Must be 3 char" },
  { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: "Enter Valid Name" },
]

export const examValidation = {
  subjectName: [
    { required: true, message: "Please Enter Subject" },
    { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: "Enter Valid Subject" },
  ],
  question: [
    { required: true, message: "Please Enter Question" },
    { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: "Enter Valid Question" },
  ],
  op1: [
    { required: true, message: "Option Required" },
    { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: "Enter Valid Option" },
  ],
  op2: [
    { required: true, message: "Option Required" },
    { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: "Enter Valid Option" },
  ],
  op3: [
    { required: true, message: "Option Required" },
    { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: "Enter Valid Option" },
  ],
  op4: [
    { required: true, message: "Option Required" },
    { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: "Enter Valid Option" },
  ],
  answer: [{ required: true, message: "Answer Required" }],
};
