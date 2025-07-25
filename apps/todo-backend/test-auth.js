#!/usr/bin/env node

// Simple authentication test script
// Run with: node test-auth.js

const API_BASE = 'http://localhost:3001/api';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: '123456'
};

let authToken = '';

async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { 'Authorization': `Bearer ${authToken}` })
    }
  };
  
  const response = await fetch(url, { ...defaultOptions, ...options });
  const data = await response.json();
  
  console.log(`\n🌐 ${options.method || 'GET'} ${endpoint}`);
  console.log(`📊 Status: ${response.status}`);
  console.log('📄 Response:', JSON.stringify(data, null, 2));
  
  return { response, data };
}

async function testAuthentication() {
  console.log('🚀 Starting Authentication Test...\n');

  try {
    // Test 1: Register user
    console.log('='.repeat(50));
    console.log('TEST 1: Register User');
    console.log('='.repeat(50));
    
    const { data: registerData } = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(testUser)
    });

    if (registerData.success) {
      authToken = registerData.data.token;
      console.log('✅ Registration successful!');
      console.log(`🔑 Token: ${authToken.substring(0, 20)}...`);
    } else {
      console.log('❌ Registration failed:', registerData.message);
    }

    // Test 2: Login
    console.log('\n' + '='.repeat(50));
    console.log('TEST 2: Login User');
    console.log('='.repeat(50));
    
    const { data: loginData } = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });

    if (loginData.success) {
      authToken = loginData.data.token;
      console.log('✅ Login successful!');
      console.log(`👤 User: ${loginData.data.user.username}`);
      console.log(`🔑 Token: ${authToken.substring(0, 20)}...`);
    } else {
      console.log('❌ Login failed:', loginData.message);
    }

    // Test 3: Get Profile (Protected)
    console.log('\n' + '='.repeat(50));
    console.log('TEST 3: Get User Profile (Protected)');
    console.log('='.repeat(50));
    
    const { data: profileData } = await apiCall('/auth/profile');
    
    if (profileData.success) {
      console.log('✅ Profile access successful!');
    } else {
      console.log('❌ Profile access failed:', profileData.message);
    }

    // Test 4: Create Todo (Protected)
    console.log('\n' + '='.repeat(50));
    console.log('TEST 4: Create Todo (Protected)');
    console.log('='.repeat(50));
    
    const { data: todoData } = await apiCall('/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test todo with authentication',
        isImportant: true
      })
    });
    
    if (todoData.success) {
      console.log('✅ Todo creation successful!');
    } else {
      console.log('❌ Todo creation failed:', todoData.message);
    }

    // Test 5: Get Todos (Protected)
    console.log('\n' + '='.repeat(50));
    console.log('TEST 5: Get User Todos (Protected)');
    console.log('='.repeat(50));
    
    const { data: todosData } = await apiCall('/todos');
    
    if (todosData.success) {
      console.log('✅ Todos retrieval successful!');
      console.log(`📝 Found ${todosData.count} todos`);
    } else {
      console.log('❌ Todos retrieval failed:', todosData.message);
    }

    // Test 6: Invalid Token
    console.log('\n' + '='.repeat(50));
    console.log('TEST 6: Invalid Token Test');
    console.log('='.repeat(50));
    
    authToken = 'invalid-token';
    const { data: invalidData } = await apiCall('/auth/profile');
    
    if (!invalidData.success) {
      console.log('✅ Invalid token correctly rejected!');
    } else {
      console.log('❌ Invalid token was accepted (security issue!)');
    }

  } catch (error) {
    console.error('💥 Test failed with error:', error.message);
  }

  console.log('\n' + '='.repeat(50));
  console.log('🏁 Authentication Test Completed');
  console.log('='.repeat(50));
}

// Run if this file is executed directly
if (require.main === module) {
  // Check if server is running by trying the root endpoint
  fetch(`${API_BASE}/`)
    .then(() => {
      console.log('✅ Server is running, starting tests...');
      testAuthentication();
    })
    .catch(() => {
      console.error('❌ Server is not running. Please start the server first:');
      console.error('   cd apps/todo-backend && yarn dev');
    });
}

module.exports = { testAuthentication };
