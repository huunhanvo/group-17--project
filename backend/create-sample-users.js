const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createSampleUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB Atlas');

        // Delete existing test users
        await User.deleteMany({
            email: { $in: ['admin@test.com', 'mod@test.com', 'user@test.com'] }
        });

        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 12);
        const admin = new User({
            name: 'Admin User',
            email: 'admin@test.com',
            password: adminPassword,
            role: 'admin'
        });

        // Create moderator user
        const modPassword = await bcrypt.hash('mod123', 12);
        const moderator = new User({
            name: 'Moderator User',
            email: 'mod@test.com',
            password: modPassword,
            role: 'moderator'
        });

        // Create regular user
        const userPassword = await bcrypt.hash('user123', 12);
        const regularUser = new User({
            name: 'Regular User',
            email: 'user@test.com',
            password: userPassword,
            role: 'user'
        });

        // Save all users
        await admin.save();
        await moderator.save();
        await regularUser.save();

        console.log('\n🎉 Sample users created successfully:');
        console.log('👑 Admin: admin@test.com / admin123');
        console.log('🛡️ Moderator: mod@test.com / mod123');
        console.log('👤 User: user@test.com / user123');
        console.log('\n📋 Test plan:');
        console.log('1. Login as Admin - Can access all panels (Admin, Moderator, User)');
        console.log('2. Login as Moderator - Can access Moderator and User panels');
        console.log('3. Login as User - Can only access User panel');

        mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error creating users:', error.message);
        mongoose.disconnect();
    }
}

createSampleUsers();