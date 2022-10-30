const bodyValid=(body)=>{
    if(body.name==""){
        return "name"
    }
     if(body.email==""){
        return "email"
    }
     if(body.phone==""){
        return "phone"
    }
     if(body.age==""){
        return "age"
    }
     if(body.designation==""){
        return "designation"
    }
    else{
        return true
    }

}

const IdValid=(body)=>{
    if(body.employeeID==""){
        return "employeeID"
    }
    else if(body.employeeID==null){
        return "employeeID"
    }
    else if(body.employeeID==undefined){
        return "employeeID"
    }
    
    else{
        return true
    }

}

module.exports={bodyValid,IdValid}