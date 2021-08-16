import React, {Fragment, useState} from "react";

const EditSearchContact = ({ contact }) => {
    const [contact_id , setContactId] = useState(contact.contact_id);
    const [fname , setFname] = useState(contact.fname);
    const [mname , setMname] = useState(contact.mname);
    const [lname , setLname] = useState(contact.lname);
    const [address_type, setAddressType] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phone_type, setPhoneType] = useState("");
    const [phone, setPhone] = useState("");
    const [date_type, setDateType] = useState("");
    const [date, setDate] = useState();
    

    // Update Contact Function

    const updateContact = async(e) => {
        e.preventDefault();
        try {
           const body =  {contact_id,fname, mname, lname, address_type, address, city, state, zip, phone_type,phone,date_type, date} ;
           const response =  await fetch(`http://localhost:5000/updateContact/${contact.contact_id}`,{
               method: "PUT",
               headers: { "Content-Type" : "application/json"},
               body: JSON.stringify(body)
           });
           window.location ="/search";
           console.log(response);
        } catch (error) {
           console.error(error.message); 
        }
    }
    return <Fragment>

        
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${contact.contact_id}+search`}>
        &#x270E; Update
        </button>


       
        <div class="modal" id={ `id${contact.contact_id}+search`}>
        <div class="modal-dialog">
            <div class="modal-content">

           
            <div class="modal-header">
                <h4 class="modal-title">Update Contact</h4>
                <button type="button" class="close" data-dismiss="modal"
                onClick={() => setContactId(contact_id)}
                >&times;</button>
            </div>

            
            <div class="modal-body">
        
                    <input 
                        type = "text" 
                        className = "form-control  mt-2" 
                        value = {fname}
                        placeholder = "First Name"
                        onChange = { e => setFname(e.target.value)}
                        />

                    <input 
                    type = "text" 
                    className = "form-control  mt-2" 
                    value = {mname}
                    placeholder = "Middle Name"
                    onChange = { e => setMname(e.target.value)}
                    />

                    <input 
                    type = "text" 
                    className = "form-control  mt-2" 
                    value = {lname}
                    placeholder = "Last Name"
                    onChange = { e => setLname(e.target.value)}
                    />
                    
                     <select className = "form-control  mt-2" id="add" onChange = { e => setAddressType(e.target.value)} >
                        <option value="home" >Select Address Type</option>
                        <option value="home" >Home Address</option>
                        <option value="work">Work Address</option>
                    </select>

                    <input 
                    type = "text" 
                    className = "form-control  mt-2" 
                    value = {address}
                    placeholder = "Street Address"
                    onChange = { e => setAddress(e.target.value)}
                    />


                    <input 
                    type = "text" 
                    className = "form-control  mt-2" 
                    value = {city}
                    placeholder = "City"
                    onChange = { e => setCity(e.target.value)}
                    />


                    <input 
                    type = "text" 
                    className = "form-control  mt-2" 
                    value = {state}
                    placeholder = "State"
                    onChange = { e => setState(e.target.value)}
                    />
                    
                    <input 
                    type = "text" 
                    className = "form-control  mt-2" 
                    value = {zip}
                    placeholder = "zip"
                    onChange = { e => setZip(e.target.value)}
                    />

                    <select className = "form-control  mt-2" id="phone" onChange = { e => setPhoneType(e.target.value)} >
                        <option value="">Select Phone Type</option>
                        <option value="home">Home Phone</option>
                        <option value="work">Work Phone</option>
                        <option value="cell">Cell Phone</option>
                    </select>
                    
                    <input 
                    type = "text" 
                    className = "form-control  mt-2" 
                    value = {phone}
                    placeholder = "Phone Number"
                    onChange = { e => setPhone(e.target.value)}
                    />

                    <input 
                    type = "text" 
                    className = "form-control  mt-2" 
                    value = {date_type}
                    placeholder = "Date Type (e.g. Birth Date, Anniversary Date, etc.)"
                    onChange = { e => setDateType(e.target.value)}
                    />  

                    <input 
                    type = "date" 
                    className = "form-control  mt-2" 
                    value = {date}
                    placeholder = "Date"
                    onChange = { e => setDate(e.target.value)}
                    />  
               
            </div>

            
            <div class="modal-footer">
                <button 
                type="button" 
                class="btn btn-warning" 
                data-dismiss="modal"
                onClick = { e => updateContact(e) }
                > &#x270E; Update
                </button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
        </div>
    </Fragment>;
    
}

export default EditSearchContact;