const IUserController = require('./IUserController.js');
const User = require('../persistencelayer/persistence/User.js');


const config = require('../config.js');
const UserDAO = require('../persistencelayer/dao/'+config.IUserDAO);
let userdao = new UserDAO();
const user = new User();

class UserControllerEncap extends IUserController{
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
        user.nome = req.body.nome;
        user.email = req.body.email;
        user.password = req.body.password;
        const user =  await userdao.create(user);
        return res.json(user);
     }
   async destroy(req,res){
        user.id = req.params.id; 
        let user = await userdao.delete(user);
         return res.json(user);
    }
   async update(req,res){
        user.id = req.params.id
        user.nome = req.body.nome;
        user.email = req.body.email;
        user.password = req.body.password;
        let user = await userdao.update(user);
        return res.json(user);
    }

   async index(req,res)
    {
        user.nome = req.body.nome;
        user.email = req.body.email;
        user.password = req.body.password;
        let users = await userdao.search(user);
        return res.json(users);
    }

}
module.exports = UserControllerEncap;