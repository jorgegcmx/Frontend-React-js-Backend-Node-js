
const express  = require("express");
const entradas = require("./entradas/entradas");
var cors = require('cors')
const app = express();



app.use(express.json());
const PORT = 3322;

app.use(cors())
app.use('/entradas',entradas);


app.listen(PORT,()=>{
console.log("server node run port: "+PORT);
});