import React, {Fragment, useState} from "react";


const ViewContact = ({ contact }) => {


    const [contact_id , setContact_id] = useState(contact.contact_id);
    const [homeAddress , setHomeAddress] = useState('');
    const [workAddress , setWorkAddress] = useState('');
    const [birthDate , setBirthDate] = useState('');
    const [homePhone , setHomePhone] = useState('');
    const [workPhone , setWorkPhone] = useState('');
    const [cellPhone , setCellPhone] = useState('');
    

    //get home address
    const getHomeAddress = async(id) => {
        try {
            
            
            const response = await fetch(`http://localhost:5000/getHomeAdd/${id}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setHomeAddress(jsonData);
            

        } catch (error) {
            console.error(error.message);
        }
    }
    //get work address
    const getWorkAddress = async(id) => {
        try {
            
            
            const response = await fetch(`http://localhost:5000/getWorkAdd/${id}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setWorkAddress(jsonData);
            

        } catch (error) {
            console.error(error.message);
        }
    }
    //get date of  birth
    const getBirthDate = async(id) => {
        try {
            
            
            const response = await fetch(`http://localhost:5000/getBirthDate/${id}`);
            const jsonData = await response.json();
            console.log(jsonData);
            let date = String(jsonData.date);
            setBirthDate(date.substring(0,10));
            

        } catch (error) {
            console.error(error.message);
        }
    }

    //get home phone
    const getHomePhone = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/getHomePhone/${id}`);
            const jsonData = await response.json();
            setHomePhone(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }
    //get work phone
    const getWorkPhone = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/getWorkPhone/${id}`);
            const jsonData = await response.json();
            setWorkPhone(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }
    //get cell phone
    const getCellPhone = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/getCellPhone/${id}`);
            const jsonData = await response.json();
            setCellPhone(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }
    return <Fragment>

        
    <button type="button" class="btn btn-success" data-toggle="modal" data-target={`#id${contact.contact_id}+View`} 
    
    onClick={
        () =>{
            getHomeAddress(contact.contact_id);
            getWorkAddress(contact.contact_id);
            getBirthDate(contact.contact_id);
            getHomePhone(contact.contact_id);
            getWorkPhone(contact.contact_id);
            getCellPhone(contact.contact_id);
        }

    }>
    View Contact
    </button>


    <div class="modal" id={ `id${contact.contact_id}+View`}>
        <div class="modal-dialog">
            <div class="modal-content">

           
            <div class="modal-header">
                <h4 class="modal-title">View Contact</h4>
                <button type="button" class="close" data-dismiss="modal"
                onClick={() => setContact_id(contact_id)}
                >&times;</button>
            </div>

            
            <div class="form-group  modal-body">
                        <label  class="ml-5 mr-5 "  >First Name</label> 
                        
                            <input type = "text" className = "form-control mb-1 " value = {contact.fname} disabled></input>
                        <label  class="ml-5 mr-5 "  >Middle Name</label> 
                        
                            <input type = "text"  className = "form-control mb-1" value = {contact.mname} disabled></input>
                        <label class="ml-5 mr-5 "  >Last Name</label> 
                        
                            <input type = "text"  className = "form-control mb-1" value = {contact.lname} disabled></input>

                        <label  class="ml-5 mr-5 "  >Home Phone</label> 
                        
                            <input type = "text"  className = "form-control mb-1" value = {homePhone.number} disabled></input>
                        <label  class="ml-5 mr-5 "  >Work Phone</label> 
                        
                        <input type = "text"  className = "form-control mb-1" value = {workPhone.number} disabled></input>

                        <label  class="ml-5 mr-5 "  >Cell Phone</label> 
                        
                            <input type = "text"  className = "form-control mb-1" value = {cellPhone.number} disabled></input>
                        <label for="homeAdd" class="ml-5 mr-5 "  >Home Address</label> 
                        
                            <input type = "text"  className = "form-control mb-1"  value ={homeAddress.address} disabled></input>

                        <label  class="ml-5 mr-5 "  >Home City</label> 
                        
                            <input type = "text"  className = "form-control mb-1" value = {homeAddress.city} disabled></input>

                        <label  class="ml-5 mr-5 "  >Home State</label> 
                        
                            <input type = "text"  className = "form-control mb-1" value = {homeAddress.state} disabled></input>
                        <label  class="ml-5 mr-5 "  >Home Zip</label> 
                        
                            <input type = "text"  className = "form-control mb-1" value = {homeAddress.zip} disabled></input>  

                        <label  class="ml-5 mr-5 "  >Work Address</label> 
                        
                            <input type = "text"  className = "form-control mb-1" value = {workAddress.address} disabled></input>

                        <label  class="ml-5 mr-5 "  >Work City</label> 
                    
                        <input type = "text"  className = "form-control mb-1" value = {workAddress.city} disabled></input>

                        <label  class="ml-5 mr-5 "  >Work State</label> 
                    
                        <input type = "text"  className = "form-control mb-1" value = {workAddress.state} disabled></input>
                        <label  class="ml-5 mr-5 "  >Work Zip</label> 
                    
                            <input type = "text" className = "form-control mb-1" value = {workAddress.zip} disabled></input>  

                        <label  class="ml-5 mr-5 "  >Birth Date</label> 
                    
                            <input type = "text"  className = "form-control mb-1" value = {birthDate} disabled></input>  
                        
            </div>
            
            
            <div class="modal-footer">
               
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
        </div>
    </Fragment>
}

export default ViewContact;