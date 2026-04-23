const IUserController = require('./IUserController.js');


const config = require('../config.js');
const UserDAO = require('../persistencelayer/dao/'+config.IUserDAO);
let userdao = new UserDAO();

class UserController extends IUserController{
  constructor(){
    super();
       
  }

  
  async show(req, res)
    {
  
       let users = await userdao.recovery();
        return res.json(users);
    }
  async store(req, res)
     {
        const user =  await userdao.create(req);
        return res.json(user);
     }
   async destroy(req,res){
         let user = await userdao.delete(req);
         return res.json(user);
    }
   async update(req,res){
        let user = await userdao.update(req);
        return res.json(user);
    }

   async index(req,res)
    {
        let users = await userdao.search(req);
        return res.json(users);
    }
  
}
module.exports = UserController;