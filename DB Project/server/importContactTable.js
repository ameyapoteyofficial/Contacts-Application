var fs = require('fs');
const csv = require('fast-csv');
var pool = require('./pgdb').pool;


let counter = 0;

let csvStream = csv.parseFile('Contacts.csv', {headers: true})
    .on("data", function(record){
        csvStream.pause();

        if(counter < 1000){

            let contact_id = record.contact_id;
            let first_name = record.first_name;
            let middle_name = record.middle_name;
            let last_name = record.last_name;
            let home_address =  record.home_address;
            let home_city =  record.home_city;
            let home_state =  record.home_state;
            let home_zip =  record.home_zip;
            let home_phone =  record.home_phone;
            let work_address =  record.work_address;
            let work_city =  record.work_city;
            let work_state =  record.work_state;
            let work_zip =  record.work_zip;
            let work_phone =  record.work_phone;
            let cell_phone =  record.cell_phone;
            let birth_date =  record.birth_date;
            let home = "home";
            let work ="work";
            let date = "birth_date";

            pool.query(" Insert into CONTACT(Contact_id, Fname, Mname,Lname) \ VALUES($1, $2, $3, $4)", [contact_id, first_name, middle_name, last_name], function(err){
                if(err)
                {
                    console.log(err);
                }
            });
           
            
            ++counter;
        }
        csvStream.resume();
    }).on("end", function(){
        console.log("Records Inserted!!");
    }).on("error",function(err){
        console.log(err);
    })


    