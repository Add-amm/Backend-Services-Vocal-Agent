import { sync } from '../config/database.js';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';


async function seedUsers(){
    try{
        await sync();
        const exists = await User.findAll();

        if(exists.length === 0){
            const hashedPassword = await bcrypt.hash('password123', 10);

            await User.bulkCreate([
                {
                    id: 'MDP-000001',
                    nom_complet: 'Demo Account',
                    email: 'demo@medplus.com',
                    phone_num:'+212601234567',
                    mdp: hashedPassword
                },{
                    id: 'MDP-000002',
                    nom_complet: 'Mohamed Bensalem',
                    email: 'mohamed.bensalem@example.com',
                    phone_num:'+212612345678',
                    mdp: hashedPassword
                }
            ]);
        }

    } catch(error){
        console.error('User Seeding error:', error);
        process.exit(1);
    }
};

export default seedUsers;