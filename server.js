const express = require("express")
const createRouter = require("./router/createProgram_router")
const { dbConnection } = require("./config/db")
const cors = require("cors")

const app = express();
app.use(cors());

dbConnection();
const PORT = 5000;

app.use(express.json());
app.use("/hero/create", createRouter);

app.listen(PORT, () => {
    console.log(`I am connected to ${PORT}`);
});



