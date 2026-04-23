const mongoose = require('mongoose');

const IUserDAO = require('./IUserDAO.js');

const User = require('../models/User');

const objUser = require('../persistence/User.js');
 const objuser = new objUser();


class UserDAO_Encap_Mongoose extends IUserDAO{

   constructor(){ super();
  mongoose.connect('mongodb+srv://vaguetti:dwm20221@cluster0.004qy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
     useNewUrlParser: true,
     useUnifiedTopology: true
});
    
                }
     async create(objuser){

          const user =  await User.create(objuser.toJSON());
          return user;
     }  
     async recovery(){ 
          let users = await User.find();
          return users; 
         }
     async update(objUser){
       let user = await User.findByIdAndUpdate(objuser.id,objuser.toJSON(), 
       {new:true});
       return user;

     }
     async delete(objUser){
        let user = await    User.findByIdAndRemove(objuser.id);
        return user; 
     } 

     async search(objUser){
        let users = await User.find(
          { email : objuser.email}
                                   ); 
       return users;

     } 


}
module.exports = UserDAO_Encap_Mongoose;