const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true
        })
        console.log(`db is connected to ${connection.connection.host}`)
    } catch (err) {
        console.log(err)
    }
}

module.exports=connectDB