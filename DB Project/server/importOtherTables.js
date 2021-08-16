var fs = require('fs');
const csv = require('fast-csv');
var pool = require('./pgdb').pool;


let counter = 0;

let csvStream = csv.parseFile('Contacts.csv', {headers: true})
    .on("data", function(record){
        csvStream.pause();

        if(counter < 1001){

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
            let home_number_areacode =  home_phone.substring(0,3);
            let work_number_areacode =  work_phone.substring(0,3);
            let cell_number_areacode =  cell_phone.substring(0,3);

            if((home_address==="")&&(home_city==="")&&(home_state==="")&&(home_zip==="")){

            }
            else{
                 pool.query(" Insert into address(Contact_id, address_type, address,city, state, zip) \ VALUES($1, $2, $3, $4, $5, $6)", [contact_id, home, home_address, home_city, home_state, home_zip], function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                });
            }
            
            if((work_address==="")&&(work_city==="")&&(work_state==="")&&(work_zip==="")){

            }
            else{
                pool.query(" Insert into address(Contact_id, address_type, address,city, state, zip) \ VALUES($1, $2, $3, $4, $5, $6)", [contact_id, work, work_address, work_city, work_state, work_zip], function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                });
            }
            if(home_phone!=="" ){
                pool.query(" Insert into phone(Contact_id, phone_type, area_code, number) \ VALUES($1, $2, $3, $4)", [contact_id, "home", home_number_areacode, home_phone], function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                });

            }
            if(work_phone!=="" ){
                pool.query(" Insert into phone(Contact_id, phone_type, area_code, number) \ VALUES($1, $2, $3, $4)", [contact_id, "work", work_number_areacode, work_phone], function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                });

            }
            if(cell_phone!=="" ){
                pool.query(" Insert into phone(Contact_id, phone_type, area_code, number) \ VALUES($1, $2, $3, $4)", [contact_id, "cell", cell_number_areacode, cell_phone], function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                });

            }
            if(birth_date === ""){

            }
            else{
                pool.query(" Insert into date(Contact_id, date_type, date) \ VALUES($1, $2, $3)", [contact_id, date, birth_date], function(err){
                    if(err)
                    {
                        console.log(err);
                    }
                });

            } 
            ++counter;
        }
        csvStream.resume();
    }).on("end", function(){
        console.log("Records Inserted!!");
    }).on("error",function(err){
        console.log(err);
    })


    