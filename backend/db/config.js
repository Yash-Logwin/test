import mongoose from "mongoose";

const connectionDb = async() => {
    try {
         await mongoose.connect("mongodb+srv://raj:isiIspRAgla0F41x@nodeexpressprojects.z1gchzr.mongodb.net/e-commerce?retryWrites=true&w=majority");
         console.log("connected !");   
    } catch (error) {
        console.log(error);
    }
}

export default connectionDb