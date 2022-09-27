const e = require('express');
const mysql = require('mysql');
const { connect } = require('../routes/students');
const con =mysql.createPool({
    connectionLimit:20,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,

})
exports.view =(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from users",(err,rows)=>{
            connection.release();
            if(!err){
                res.render("home",{rows})
            }
            else{
                res.render("err")
            }

        });
    });
}
exports.adduser=(req,res)=>{
    res.render("adduser");
  }

exports.formsave=(req,res)=>{
    con.getConnection((err,connection)=>{

        if(err) throw err
        const {name,age,city}=req.body;
        connection.query("INSERT INTO users (Name,Age,city) values (?,?,?)",[name,age,city],(req,rows)=>{
            connection.release()
            if(!err){
                res.render("adduser",{msg:"User Added Successfully"})
            }

        })
    })
}
exports.edituser=(req,res)=>{
 
    con.getConnection((err,connection)=>{
      if(err) throw err
      //Get ID from url
      let id=req.params.id;
   
      connection.query("select * from users where id=?",[id],(err,rows)=>{
        connection.release();
        if(!err){
          res.render("edituser",{rows});
        }else{
          console.log("Error in Listing Data "+err);
        }
   
      });
    });
   
  }
   
exports.editpost=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err 
        const {name,age,city} =req.body;
        let id = req.params.id;
        connection.query("update users set Name=? ,Age=?,City=? Where id = ?",[name,age,city,id],(req,rows)=>{
            connection.release();
            if(!err){
                con.getConnection((err,connection)=>{
                    if(err) throw err
                    //Get ID from url
                 
                    connection.query("select * from users where id=?",[id],(err,rows)=>{
                      connection.release();
                      if(!err){
                        res.render("edituser",{rows,msg:"User data successfully updated"});
                      }else{
                        console.log("Error in Listing Data "+err);
                      }
                 
                    });
                  });
            }

            else{
                console.log("Error listng in Data"+err)
            }
        })

    }
)}

exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err;
        let id= req.params.id
        connection.query("DELETE FROM users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/home")
            }
            else{console.log("Errr")}
        })
    })
}