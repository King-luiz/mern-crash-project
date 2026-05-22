import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error: ", error.message);
        process.exit(1); // Exit with failure 1 is for failure, 0 is for success
    }
};

//mongodb+srv://mureithilewins_db_user:wcBJ1ApkrPFbEReH@cluster0.p2w7qlq.mongodb.net/