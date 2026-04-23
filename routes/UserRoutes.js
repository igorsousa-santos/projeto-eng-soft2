const express = require('express');
const bodyParser = require('body-parser');
//================================

var cors = require('cors');

const IRoutes = require('./IRoutes.js');

const app = express();


const config = require('../config.js');
let UserController = require('../controllers/'+config.IUserController);

let userController = new UserController();



class UserRoutes extends IRoutes{

  constructor() {   
    super();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  
} // finaliza construtor

  get(){
      app.get('/', (req, res) => {
      res.send('Rest API com Polimorfismo');
      });
      app.get('/user', userController.show);

      app.get('/user/search/', userController.index)
      
// lista user, filtrando por email
// ex: /user/buscaemail/?email=vaguetti@gmail.com
//=========================
  }
  post(){
    app.post('/user', userController.store);
// lista user
  }

  listen(){
    app.listen(3000, () => console.log('server started'));
     }

}
module.exports = UserRoutes;
