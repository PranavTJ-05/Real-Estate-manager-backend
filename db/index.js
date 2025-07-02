import mongoose from "mongoose"

const connectDB = async () => {
    try{
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        mongoose.connection.on("error", (err) => {
            console.log("MongoDB connection error: " + err);
        });
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
        console.log(error.message);
    }
};

export default connectDB