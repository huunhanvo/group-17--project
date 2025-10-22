// Simple test using built-in fetch (Node 18+)
async function testLogin() {
    try {
        console.log('Testing login...');
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'admin@test.com',
                password: 'admin123'
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Login successful!');
        console.log('Response:', JSON.stringify(data, null, 2));

        return data.token;
    } catch (error) {
        console.error('❌ Login failed:', error.message);
        return null;
    }
}

async function testGetUsers(token) {
    try {
        console.log('\nTesting GET /api/users...');
        const response = await fetch('http://localhost:5000/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(`❌ GET users failed: ${response.status} - ${data.message}`);
            return;
        }

        console.log('✅ GET users successful!');
        console.log(`Found ${data.users?.length || 0} users`);
        console.log('Users:', data.users?.map(u => ({ id: u._id, email: u.email, role: u.role })));

        return data.users;
    } catch (error) {
        console.error('❌ GET users error:', error.message);
        return null;
    }
}

async function testUpdateRole(token, userId, newRole) {
    try {
        console.log(`\nTesting PUT /api/users/${userId}/role (change to ${newRole})...`);
        const response = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(`❌ Update role failed: ${response.status} - ${data.message}`);
            return;
        }

        console.log('✅ Update role successful!');
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('❌ Update role error:', error.message);
    }
}

async function runAllTests() {
    console.log('🚀 Starting RBAC API Tests (Simple Version)...\n');

    // Test 1: Admin login
    const adminToken = await testLogin();
    if (!adminToken) {
        console.error('Cannot proceed without admin token');
        return;
    }

    // Test 2: Get users with admin token
    const users = await testGetUsers(adminToken);
    if (!users || users.length === 0) {
        console.error('No users found');
        return;
    }

    // Find a regular user to test role updates
    const regularUser = users.find(u => u.role === 'user');
    if (!regularUser) {
        console.error('No regular user found for testing');
        return;
    }

    // Test 3: Update user role (admin should succeed)
    await testUpdateRole(adminToken, regularUser._id, 'moderator');

    console.log('\n🎉 Basic RBAC tests completed!');
    console.log('\n📝 To test full RBAC:');
    console.log('1. Login with different roles (mod@test.com, user@test.com)');
    console.log('2. Test access restrictions for each role');
    console.log('3. Verify 403 errors for unauthorized actions');
}

runAllTests().catch(console.error);