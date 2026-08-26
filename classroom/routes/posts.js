const express = require("express");
const router = express.Router();

//Posts

router.get("/",(req,res)=>{
    res.send("Get for posts");
})

router.get("/:id",(req,res)=>{
    res.send("Get for posts id");
})


router.post("/",(req,res)=>{
    res.send("post for posts");
})

router.delete ("/",(req,res)=>{
    res.send("delete for posts");
})

module.exports = router;

