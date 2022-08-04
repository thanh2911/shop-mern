const Users = require('./users');
const Category = require('./category');
const Products = require('./products');
const Posts = require('./posts');
const Upload = require('./upload');


const route = (app) => {
   app.use('/users' , Users);
   app.use('/api' , Category);
   app.use('/api' , Products);
   app.use('/api' , Posts);
   app.use('/api' , Upload);
}
module.exports = route