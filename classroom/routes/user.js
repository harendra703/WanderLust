const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Get For Users");
})

router.get("/:id",(req,res)=>{
    res.send("Get For Users id");
})

router.post("/",(req,res)=>{
    res.send("Post For Users");
})

router.delete("/",(req,res)=>{
    res.send("Delete For Users");
})

module.exports = router;
