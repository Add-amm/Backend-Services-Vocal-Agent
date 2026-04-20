import connectDB from "../config/database.js";
import seedUsers from "./seedUsers.js";

const seed = async() => {
    try{
        await connectDB.authenticate();
        await connectDB.sync();

        await seedUsers();

        console.log('Seeding complete');

    } catch(error){
        console.error('Error seeding:', error);
    }
};

export default seed;