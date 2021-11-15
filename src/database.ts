import mongoose  from "mongoose";

async function startDB() {
    await mongoose.connect("mongodb://localhost/upload-imgs-db", {
               
    })
    console.log('DB Connected')
}
export default startDB