import React, {Fragment, useEffect, useState} from "react";
import EditContact from "./EditContact";
import AddContact from "./addContact";
import { Link } from "react-router-dom";
import ViewContact from "./ViewContact";



const ListContacts = () => {

    const [contacts, setContacts] = useState([]);
    const [numberOfContacts, setNumberofContacts] = useState('100');
    

    
    //Delete Records Function

    const deleteContact = async (id) => {
        try {
           const deleteContact = await fetch(`http://localhost:5000/deleteContact/${id}`, {
               method: "DELETE"
           });
           console.log(deleteContact);
           setContacts(contacts.filter(contact => contact.contact_id !== id));
        } catch (error) {
           console.error(error.message); 
        }
        
    }

    const getContacts = async(id) => {
        try {
            
            
             const response = await fetch(`http://localhost:5000/getAllContacts/${id}`);
            const jsonData = await response.json();
            setContacts(jsonData);
            localStorage.setItem('cachedContacts',contacts);

        } catch (error) {
            console.error(error.message);
        }
    }
   
    

    useEffect(()=>{
       getContacts(numberOfContacts);
    }, []);

 
    
    return <Fragment>
    
        
    <h1 className ="text-center mt-5 "> Contacts List</h1>  
    <AddContact class="d-flex justify-content-center mr-5 "  ></AddContact>
    <button type="button" class="btn btn-warning  mt-5 mr-5 "  > <Link to ="/search" style={{color: 'black', textDecoration: 'none' }}>Search Contact &#x1F50E;</Link></button>
          
    
        <nav aria-label="Page navigation example" class="mt-4 mb-3">
                <a class="lead mr-2 mt-2" >Number of Records :</a>
                <select className = " dropdown col-xs-2 mt-2" id="add" onChange = { e => getContacts(e.target.value)} >
                                        <option value="100" >100</option>
                                        <option value="200" >200</option>
                                        <option value="300">300</option>
                </select>
        </nav>  
        <table id="mainTable" class=" table  table-striped table-bordered table-sm mt-4 text-center">
    <thead>
      <tr>
        <th>Contact Id</th>
        <th>First Name</th>
        <th>Middle Name</th>
        <th>Last Name</th>
        <th>View</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {/*
        <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
        </tr>
        */

        }
       {contacts.map( contact => (
           <tr key = {contact.contact_id}>
               <td>{contact.contact_id}</td>
               <td>{contact.fname}</td>
               <td>{contact.mname}</td>
               <td>{contact.lname}</td>
               <td><ViewContact contact= {contact}></ViewContact></td>
               <td><EditContact contact= {contact}></EditContact></td>
               <td><button className = "btn btn-danger" onClick = {() => deleteContact(contact.contact_id)}> &#10006; Delete</button></td>
           </tr>
       ))}
    </tbody>
  </table>
    </Fragment>
}

export default ListContacts;