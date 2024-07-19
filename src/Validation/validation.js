export const validateData = (data,validate) => {
    // if(data.answer === '^'){
    //     data.answer = '';
    // }

    let error = {};

    for(let key in validate){
        validate[key].some((field) => {
            if(field.required && !data[key]){
                error[key] = field.message;
                return true;
            }
            if(field.pattern && !data[key].match(field.pattern)){
                error[key] = field.message;
                return true;
            }
            if(data[key].length < field.length){
                error[key] = field.message;
                return true;
            }
            if(field.match && data[key] !== field.comKey){
                error[key] = field.message;
                return true;
            }
            if(data?.questions?.includes(data?.question)){
                error.question = data?.sameQueMsg;
                return true;
            }
        })
    }

    // formField.forEach((field) => {
    //     if(data[field.name].length < 3){
    //         error[field.name] = "Please Enter atleast 3 character";
    //     }
    // })

    // if(data.userName.length < 3){
    //     error.userName = 'User Name Must be at least 3 character';
    // }

    // if(!data.email.match(pattern)){
    //     error.email = 'Email is not Valid Formate'
    // }

    // if(data.password.length < 5){
    //     error.password = 'Password must be at least 5 character'
    // }

    // if(data.confirmPassword !== data.password){
    //     error.confirmPassword = 'Conform password did not match with password';
    // }
    
    return error;
}