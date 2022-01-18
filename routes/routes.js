const express = require('express')
const router = express.Router()
const queryData = require('../entity/query')

router.post('/add',(req,res)=>{
    try {
        console.log(req.body)
        // insert into tbl_devices values(0,'D111','IM54544','ICC455458',null,now(),now())
        queryData(`insert into tbl_devices values(0,'${req.body.deviceIs}','${req.body.Imid}','${req.body.IccId}',null,now(),now())`)
        .then(data=>{
            console.log('DATA =>',data)
            res.status(200).json({
                success:true,
                message:'success',
                data:data
            })
        }).catch(err=>{
            res.status(200).json({
                success:false,
                message:'failed'
            })
        })
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error!!!'
        })
    }
})

router.get('/all',(req,res)=>{
    try {
        queryData(`select * from tbl_devices`)
        .then(data=>{
            console.log('DATA =>',data)
            res.status(200).json({
                success:true,
                message:'success',
                data:data
            })
        }).catch(err=>{
            res.status(200).json({
                success:false,
                message:'failed'
            })
        })
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error!!!'
        })
    }
})


router.get('/single/:deviceId',(req,res)=>{
    try {
        let deviceId = req.params.deviceId
        queryData(`select * from tbl_devices where id='${deviceId}'`)
        .then(data=>{
            console.log('DATA =>',data)
            res.status(200).json({
                success:true,
                message:'success',
                data:data[0]
            })
        }).catch(err=>{
            res.status(200).json({
                success:false,
                message:'failed'
            })
        })
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal server error!!!'
        })
    }
})


module.exports=router