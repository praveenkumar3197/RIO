const {Pool} =require("pg")

const pool = new Pool({
    user:"praveen",
    password:"praveen1",
    host:"localhost",
    port:5432,
    database:"bxfeuuyg_flutter"
});


module.exports = pool;