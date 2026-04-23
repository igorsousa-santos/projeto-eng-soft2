const config = require('./config.js');
let IRoutes = require('./routes/'+config.IRoutes);
let userRoutes = new IRoutes();
    userRoutes.get();
    userRoutes.post();
    userRoutes.listen();
