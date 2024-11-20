import User from "../models/userSchema.js";

const addUserDetails =  async (req,res) =>{
    const { email } = req.body
    try{
        const existAdmin = await User.findOne({email})
        if(existAdmin){
            return res.status(400).json({
                msg: "Admin already exist"
            })
        }
        const newadmin = await User.create(req.body)
        res.status(201).json({
            msg:"Details added succesfully",
            data:newadmin
        })
    } catch (err) {
        res.status(400).json(err)

}
}

const userLogin = async (req,res)=>{
    const { email,password } = req.body
    try{
        const existAdmin = await User.findOne({email})
        if(!existAdmin){
            res.status(400).json({
                msg:"Admin not found"
            })
        }
        if(await existAdmin.matchPassword(password)){
            return res.status(200).json({
                msg: "login success"
                
            })
        } else {
            return res.status(400).json({
                msg:"Incorrect password"
            })
        }
    } catch (err){
        console.log(err)
        res.status(400).json({
            msg:err
        })
    }
}


export{addUserDetails,userLogin}