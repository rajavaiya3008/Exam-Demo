export const validateData = (data,validate) => {
    console.log(data);

    // let pattern = "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$";

    let error = {};

    for(let key in validate){
        validate[key].some((field) => {
            console.log(data[key],'confirm pass',key,'key is',data.password,'pass')
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

                error[key] = 'Password Do not Match';
                return true;
            }
            if(data?.questions?.includes(data?.question)){
                error.question = 'Question already Exists';
                return true;
            }


        })
    }

    console.log(error,'error is here');

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

    console.log(error,'error is here');
    
    return error;
}