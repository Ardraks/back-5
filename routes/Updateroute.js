const app = require('express').Router()
const multer = require('multer');

const updatemodel = require('../model/Update');
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });




//for saving post
app.post('/pnew', upload.single('profilephoto'), async (request, response) => {
    console.log("sdfj")
    console.log(request.file)
        console.log(request.body)
        // // try {
        
                    const { username,email,password } = request.body
                    const newdata = new updatemodel({
                        username,
                        email,
                        password,
                        profilephoto: {
                            data: request.file.buffer,
                            contentType: request.file.mimetype,
                        }
                    })
                    await newdata.save();
                    response.status(200).json({ message: ' successfully' });
            // }
        // catch (error) 
        // {
        //             response.status(500).json({ error: 'Internal Server Error' });
        // }
    
    })
    
    
    app.put('/sedit/:id',async(request,response)=>{
        let id = request.params.id
        await updatemodel.findByIdAndUpdate(id,request.body)
        response.send("Record updated")
    })
    
     
    module.exports=app