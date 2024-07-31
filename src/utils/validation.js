export const validateData = (data,validate) => {

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
    
    return error;
}