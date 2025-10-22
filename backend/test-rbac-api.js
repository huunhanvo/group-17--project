const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Test credentials
const testUsers = {
    admin: { email: 'admin@test.com', password: 'admin123' },
    moderator: { email: 'mod@test.com', password: 'mod123' },
    user: { email: 'user@test.com', password: 'user123' }
};

let tokens = {};

async function login(userType) {
    try {
        console.log(`Attempting login for ${userType}:`, testUsers[userType]);
        const response = await axios.post(`${BASE_URL}/auth/login`, testUsers[userType]);
        tokens[userType] = response.data.token;
        console.log(`✅ ${userType.toUpperCase()} login successful`);
        console.log(`Token: ${tokens[userType].substring(0, 50)}...`);
        return tokens[userType];
    } catch (error) {
        console.error(`❌ ${userType.toUpperCase()} login failed:`, error.response?.data || error.message);
        return null;
    }
}

async function testGetUsers(userType) {
    console.log(`\n🧪 Testing GET /api/users with ${userType.toUpperCase()} token`);
    try {
        const response = await axios.get(`${BASE_URL}/api/users`, {
            headers: { Authorization: `Bearer ${tokens[userType]}` }
        });
        console.log(`✅ SUCCESS: ${response.data.users?.length || 0} users returned`);
        console.log(`Response:`, JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.log(`❌ FAILED: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
}

async function testUpdateUserRole(userType, targetUserId, newRole) {
    console.log(`\n🧪 Testing PUT /api/users/${targetUserId}/role with ${userType.toUpperCase()} token`);
    console.log(`Attempting to change role to: ${newRole}`);
    try {
        const response = await axios.put(`${BASE_URL}/api/users/${targetUserId}/role`,
            { role: newRole },
            { headers: { Authorization: `Bearer ${tokens[userType]}` } }
        );
        console.log(`✅ SUCCESS: Role updated`);
        console.log(`Response:`, JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.log(`❌ FAILED: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
}

async function getUserId(userType) {
    try {
        const response = await axios.get(`${BASE_URL}/api/users`, {
            headers: { Authorization: `Bearer ${tokens.admin}` }
        });
        const targetUser = response.data.users?.find(u => u.email === testUsers[userType].email);
        return targetUser?._id;
    } catch (error) {
        console.error('Error getting user ID:', error.message);
        return null;
    }
}

async function runTests() {
    console.log('🚀 Starting RBAC API Tests...\n');

    // Step 1: Login all users
    console.log('📝 Step 1: Login all test users');
    await login('admin');
    await login('moderator');
    await login('user');

    if (!tokens.admin || !tokens.moderator || !tokens.user) {
        console.error('❌ Cannot proceed without all tokens');
        return;
    }

    // Step 2: Test GET /api/users with different roles
    console.log('\n📝 Step 2: Test GET /api/users permissions');
    await testGetUsers('admin');      // Should work
    await testGetUsers('moderator');  // Should work
    await testGetUsers('user');       // Should fail (403)

    // Step 3: Get user IDs for role update tests
    const userUserId = await getUserId('user');
    const moderatorUserId = await getUserId('moderator');

    if (!userUserId) {
        console.error('❌ Cannot get user ID for testing');
        return;
    }

    // Step 4: Test PUT /api/users/:id/role with different permissions
    console.log('\n📝 Step 3: Test PUT /api/users/:id/role permissions');

    // Admin should be able to change any role
    await testUpdateUserRole('admin', userUserId, 'moderator');
    await testUpdateUserRole('admin', userUserId, 'user'); // Reset back

    // Moderator should be able to change user role only
    await testUpdateUserRole('moderator', userUserId, 'moderator');

    // Moderator should NOT be able to change admin role
    if (moderatorUserId) {
        await testUpdateUserRole('admin', moderatorUserId, 'admin'); // Make moderator admin first
        await testUpdateUserRole('moderator', moderatorUserId, 'user'); // Try to demote admin (should fail)
    }

    // User should NOT be able to change any roles
    await testUpdateUserRole('user', userUserId, 'admin');

    console.log('\n🎉 RBAC API Tests completed!');
    console.log('\n📋 Expected Results:');
    console.log('✅ Admin: Can access all endpoints and change all roles');
    console.log('✅ Moderator: Can view users, change user roles only');
    console.log('❌ User: Cannot access user management endpoints');
}

runTests().catch(console.error);