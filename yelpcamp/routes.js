const express = require('express')
const router = express.Router()
router.get('/',(req,res)=>{
    res.send("From shelter")
})
router.get('/op',(req,res)=>{
    res.cookie("bala","ultrapro")
    const {name = 'God'} = req.cookies
  
    res.send(`Yup bro stealed ,${name}`)
})
router.get('/oksign',(req,res)=>{
    res.cookie('Yup','Signed not broke',{signed:true})
    res.send(req.signedCookies)
})
router.get('/ok/:id',(req,res)=>{
    res.send("From shelter ok")
})
router.get('/ot',(req,res)=>{
    res.send("From shelter ot")
})
module.exports = router