import React, {Fragment, useEffect, useState} from "react";
import { Link } from "react-router-dom";

import EditSearchContact from "./EditSearchContact";
import ViewContact from "./ViewContact";

const SearchContacts = () => {
   
      var initSearch = localStorage.getItem('searchId');
      const [contacts, setContacts] = useState([]);
      const [searchId, setSearchId] = useState([initSearch]);

    

    // submit search method

    //submit search 
    const onSubmitForm = async(e) => {
        e.preventDefault();
        localStorage.setItem('searchId',searchId);
        try {
           const response = await fetch(`http://localhost:5000/searchContacts/${searchId}`);
           const jsonData = await response.json();
           setContacts(jsonData);
           console.log(jsonData);
           
        } catch (error) {
            console.error(error.message);
        }
    }
    const onPageLoad = async() => {
       
        localStorage.setItem('searchId',searchId);
        try {
           const response = await fetch(`http://localhost:5000/searchContacts/${searchId}`);
           const jsonData = await response.json();
           setContacts(jsonData);
           console.log(jsonData);
           
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(()=>{
        onPageLoad(); 
     }, []);
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
    return <Fragment>
        < h1 className ="text-center mt-5 "> Search Contacts </h1> 
         <form className="d-flex mt-5" onSubmit={onSubmitForm}  >
        
            <input 
                type = "text" 
                className = "form-control mr-2" 
                placeholder = "Enter Name, Address or Phone number"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                />
                <button className="btn btn-warning">Search Contact &#x1F50E;</button>

            </form>
            <button type="button" class="btn btn-success mt-5 mr-5"  > <Link to ="/" style={{color: 'white', textDecoration: 'none' }}>	&#8592; All Contacts</Link></button>
                    
            <table id="mainTable" class="table  table-striped table-bordered table-sm mt-5 text-center">
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
                        <td><EditSearchContact contact= {contact}></EditSearchContact></td>
                        <td><button className = "btn btn-danger" onClick = {() => deleteContact(contact.contact_id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
</Fragment>
}

export default SearchContacts;
