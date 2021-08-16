import React, {Fragment, useState} from "react";

const InputRecord = () =>{
    const [contact_id, setContact_id] = useState("");
     
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            
        } catch (error) {
            console.error(error.message);
        }

        window.location = "/";
    }

    return(
        <Fragment>
            <form className = "d-flex mt-5" onSubmit= {onSubmitForm}>
               <input 
               type = "text" 
               className = "form-control  mr-2" 
               value = {contact_id}
               placeholder = "Search..."
               onChange = { e => setContact_id(e.target.value)}
               />
               
            </form>
            

        </Fragment>
    )
}

export default InputRecord;