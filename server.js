require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');
const route = require('./routes');
const ConnectDB = require('./config/mongoose/config');

ConnectDB.connect();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

route(app);



const PORT = 5000 ;
app.listen(PORT , () => {
    console.log('server run =>', PORT);
})
