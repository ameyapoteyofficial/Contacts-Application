const express = require("express");
const app = express();
const cors =  require("cors");
var pool = require('./pgdb').pool;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// add a contact

app.post("/addContact", async(req,res) =>{
   try {
       const {contact_id} = req.body;
       const {fname} = req.body;
       const {mname} = req.body;
       const {lname} = req.body;
       const {address_type} = req.body;
       const {address} = req.body;
       const {city} = req.body;
       const {state} = req.body;
       const {zip} = req.body;
       const {phone_type} = req.body;
       const {phone} = req.body;
       const {date_type} = req.body;
       const {date} = req.body;
       const area_code =  phone.substring(0,3);
      
       if((contact_id!=="" )&&(fname!=="")){
         const newContact = await pool.query("insert into contact (contact_id,fname,mname,lname) values ($1,$2,$3,$4) returning *",[contact_id,fname,mname,lname]);
       if(address_type!==""){
        const newAddress = await pool.query("insert into address (contact_id,address_type,address,city,state,zip) values ($1,$2,$3,$4,$5,$6) returning *",[contact_id,address_type,address,city,state,zip]);
       }
       if(phone_type !== ""){
        const newPhone = await pool.query("insert into phone (contact_id,phone_type,area_code,number) values ($1,$2,$3,$4) returning *",[contact_id,phone_type,area_code,phone]);
       }
       if(date_type !== ""){
        const newDate = await pool.query("insert into date (contact_id,date_type,date) values ($1,$2,$3) returning *",[contact_id,date_type,date]);
       }
       
       res.json(newContact.rows[0]);
       }
       else{
          res.json("Not Inserted!");
       }
       
   } catch (error) {
      console.error(error.messaage);
   } 
})

// get all contacts
app.get("/getAllContacts/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const searchedContacts = await pool.query("select * from contact limit $1",[id]);
        res.json(searchedContacts.rows);
    } catch (error) {
       console.error(error.messaage);
    } 
 })

// get a contact
app.get("/searchContacts/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const searchedContact = await pool.query(`select  
        distinct
        con.contact_id,
        con.fname,
        con.mname,
        con.lname
        
        
        from
        
        contact con
        left join address ad on con.contact_id=ad.contact_id
        left join phone pho on con.contact_id=pho.contact_id
        left join date dat on con.contact_id=dat.contact_id
        
        where cast(pho.number as text) like '%'||$1||'%' 
        or lower(con.fname) like lower('%'||$1||'%') 
        or lower(con.mname) like lower('%'||$1||'%') 
        or lower(con.lname) like lower('%'||$1||'%') 
        or lower(ad.address) like lower('%'||$1||'%') 
        or lower(ad.city) like lower('%'||$1||'%') 
        or lower(ad.state) like lower('%'||$1||'%') 
        or ad.zip like '%'||$1||'%'
        or pho.area_code like '%'||$1||'%' 
        
         `, [id]);
        //const searchedContact = await pool.query(`select con.contact_id, con.fname,con.mname,con.lname from contact con where cast(con.contact_id as text) like '%'||$1||'%' or con.fname like '%'||$1||'%' or con.mname like '%'||$2||'%' or con.lname like '%'||$3||'%' `, [id,id,id]);
        res.json(searchedContact.rows);
    } catch (error) {
       console.error(error.messaage);
    } 
 })

//update a contact
app.put("/updateContact/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const {fname} = req.body;
        const {mname} = req.body;
        const {lname} = req.body;
        const {address_type} = req.body;
       const {address} = req.body;
       const {city} = req.body;
       const {state} = req.body;
       const {zip} = req.body;
       const {phone_type} = req.body;
       const {phone} = req.body;
       const {date_type} = req.body;
       const {date} = req.body;
       const area_code =  phone.substring(0,3);

        const updateContact = await pool.query("update contact set fname = $1, mname=$2, lname = $3 where contact_id = $4", [fname,mname,lname,id]);
        if(address_type!==""){
            let insertQuery = {};
            let params = [id,address_type,address,city,state,zip];
            insertQuery.text = 'INSERT INTO address (contact_id, address_type, address, city, state, zip) VALUES ($1, $2, $3,$4,$5,$6) returning *';
            insertQuery.values =params;
            
            let updateQuery = {};
            updateQuery.text ='UPDATE address SET  address = $2, city= $3, state = $4, zip =$5 where contact_id = $6 and address_type = $1';
            updateQuery.values = [address_type,address,city,state,zip,id];

             pool.query(updateQuery, (err, res) => {
                if (err) {
                  console.log(err.stack)
                } 
                else if(res.rowCount === 0){
                    pool.query(insertQuery, (error, res) =>{
                        try {
                          if (error) throw error;
                          console.log ('Rows affected:', res.rowCount);
                        }catch(er){
                          console.log(er);
                         }
                        });
                }
                else {
                  console.log(res.rows[0])
                }
              })
        }
        if(phone_type !== ''){
            let insertQuery = {};
            let params = [id,phone_type,area_code,phone];
            insertQuery.text = 'INSERT INTO phone (contact_id, phone_type, area_code, number) VALUES ($1, $2, $3,$4) returning *';
            insertQuery.values =params;
            
            let updateQuery = {};
            updateQuery.text ='UPDATE phone SET  area_code = $2, number= $3 where contact_id = $4 and phone_type = $1';
            updateQuery.values = [phone_type,area_code,phone,id];

             pool.query(updateQuery, (err, res) => {
                if (err) {
                  console.log(err.stack)
                } 
                else if(res.rowCount === 0){
                    pool.query(insertQuery, (error, res) =>{
                        try {
                          if (error) throw error;
                          console.log ('Rows affected:', res.rowCount);
                        }catch(er){
                          console.log(er);
                         }
                        });
                }
                else {
                  console.log(res.rows[0])
                }
              })
        }
        if(date_type!==''){
            let insertQuery = {};
            let params = [id,date_type,date];
            insertQuery.text = 'INSERT INTO date (contact_id, date_type, date) VALUES ($1, $2, $3) returning *';
            insertQuery.values =params;
            
            let updateQuery = {};
            updateQuery.text ='UPDATE date SET  date = $2 where contact_id = $3 and date_type = $1';
            updateQuery.values = [date_type,date,id];

             pool.query(updateQuery, (err, res) => {
                if (err) {
                  console.log(err.stack)
                } 
                else if(res.rowCount === 0){
                    pool.query(insertQuery, (error, res) =>{
                        try {
                          if (error) throw error;
                          console.log ('Rows affected:', res.rowCount);
                        }catch(er){
                          console.log(er);
                         }
                        });
                }
                else {
                  console.log(res.rows[0])
                }
              })
        }
        res.json("contact updated!");
    } catch (error) {
       console.error(error.messaage);
    } 
 })

//delete a contact
app.delete("/deleteContact/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteAddress = await pool.query("delete from address where contact_id = $1", [id]);
        const deletePhone = await pool.query("delete from phone where contact_id = $1", [id]);
        const deleteDate = await pool.query("delete from date where contact_id = $1", [id]);
        const deleteCon = await pool.query("delete from contact where contact_id = $1", [id]);
        res.json("Record deleted!!");
    } catch (error) {
       console.error(error.messaage);
    } 
 })

 //get home address
 app.get("/getHomeAdd/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const searchedContact = await pool.query("select address, city,state,zip from address where address_type = $2 and contact_id = $1 ", [id,"home"]);
        //const searchedContact = await pool.query(`select con.contact_id, con.fname,con.mname,con.lname from contact con where cast(con.contact_id as text) like '%'||$1||'%' or con.fname like '%'||$1||'%' or con.mname like '%'||$2||'%' or con.lname like '%'||$3||'%' `, [id,id,id]);
        res.json(searchedContact.rows[0]);
    } catch (error) {
       console.error(error.messaage);
    } 
 })

 //get home address
 app.get("/getWorkAdd/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const searchedContact = await pool.query("select address, city,state,zip from address where address_type = $2 and contact_id = $1 ", [id,"work"]);
        //const searchedContact = await pool.query(`select con.contact_id, con.fname,con.mname,con.lname from contact con where cast(con.contact_id as text) like '%'||$1||'%' or con.fname like '%'||$1||'%' or con.mname like '%'||$2||'%' or con.lname like '%'||$3||'%' `, [id,id,id]);
        res.json(searchedContact.rows[0]);
    } catch (error) {
       console.error(error.messaage);
    } 
 })

 //get birth date
 app.get("/getBirthDate/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const searchedContact = await pool.query("select date from date where contact_id = $1 and lower(date_type) like lower('%'||$2||'%')", [id,"Birth"]);
        //const searchedContact = await pool.query(`select con.contact_id, con.fname,con.mname,con.lname from contact con where cast(con.contact_id as text) like '%'||$1||'%' or con.fname like '%'||$1||'%' or con.mname like '%'||$2||'%' or con.lname like '%'||$3||'%' `, [id,id,id]);
        res.json(searchedContact.rows[0]);
    } catch (error) {
       console.error(error.messaage);
    } 
 })
 //get home phone
 app.get("/getHomePhone/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const searchedContact = await pool.query("select number from phone where contact_id = $1 and phone_type = $2", [id,"home"]);
        //const searchedContact = await pool.query(`select con.contact_id, con.fname,con.mname,con.lname from contact con where cast(con.contact_id as text) like '%'||$1||'%' or con.fname like '%'||$1||'%' or con.mname like '%'||$2||'%' or con.lname like '%'||$3||'%' `, [id,id,id]);
        res.json(searchedContact.rows[0]);
    } catch (error) {
       console.error(error.messaage);
    } 
 })
 //get work phone
 app.get("/getWorkPhone/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const searchedContact = await pool.query("select number from phone where contact_id = $1 and phone_type = $2", [id,"work"]);
        //const searchedContact = await pool.query(`select con.contact_id, con.fname,con.mname,con.lname from contact con where cast(con.contact_id as text) like '%'||$1||'%' or con.fname like '%'||$1||'%' or con.mname like '%'||$2||'%' or con.lname like '%'||$3||'%' `, [id,id,id]);
        res.json(searchedContact.rows[0]);
    } catch (error) {
       console.error(error.messaage);
    } 
 })

  //get cell phone
  app.get("/getCellPhone/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const searchedContact = await pool.query("select number from phone where contact_id = $1 and phone_type = $2", [id,"cell"]);
        //const searchedContact = await pool.query(`select con.contact_id, con.fname,con.mname,con.lname from contact con where cast(con.contact_id as text) like '%'||$1||'%' or con.fname like '%'||$1||'%' or con.mname like '%'||$2||'%' or con.lname like '%'||$3||'%' `, [id,id,id]);
        res.json(searchedContact.rows[0]);
    } catch (error) {
       console.error(error.messaage);
    } 
 })
app.listen(5000, () => {
    console.log("server has started on port 5000");
})