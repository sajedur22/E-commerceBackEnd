const app=require('./app');
require('dotenv').config();
const port = process.env.PORT;
app.listen(port,function(){
    console.log(`port ${port}`)
})