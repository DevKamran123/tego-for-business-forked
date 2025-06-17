# Quick Setup Guide for Dual Authentication

## 🚀 Getting Started

### 1. Environment Setup
Ensure your `.env` file has the correct API URLs:
```bash
VITE_PUBLIC_NODE_API_URL="https://tego-for-business-backend-node-505800769156.europe-west1.run.app"
VITE_PUBLIC_PHP_API_URL="http://3.139.70.248"
VITE_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-key"
```

### 2. Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 3. Access Dual Authentication Pages
- Dual Signup: `http://localhost:5173/dual-signup`
- Dual Login: `http://localhost:5173/dual-login`

## 🧪 Quick Testing

### Browser Console Testing
1. Open browser developer tools (F12)
2. Navigate to Console tab
3. Run test commands:

```javascript
// Check environment configuration
window.dualAuthTests.checkEnvironment()

// Test PHP API registration (update email for each test)
window.dualAuthTests.testPHPRegistration()

// Test dual authentication flow
window.dualAuthTests.runAllTests()
```

### Manual Testing Steps

#### Registration Test
1. Go to `/dual-signup`
2. Fill form with:
   - First Name: "Test"
   - Last Name: "User"
   - Email: "test.user@example.com" (use unique email)
   - Password: "Password123!"
   - Country Code: "+234"
   - Mobile: "8012345678"
3. Click "Sign Up (Dual Auth)"
4. Check for success message

#### Login Test
1. Go to `/dual-login`
2. Use credentials from registration
3. Click "Login (Dual Auth)"
4. Should redirect to dashboard

#### Token Verification
1. Open browser dev tools → Application tab → Local Storage
2. Verify these keys exist:
   - `token` (Node API token)
   - `php_access_token` (PHP API token)
   - `php_user_data` (PHP user data)

## 🔍 Troubleshooting

### Common Issues

#### "PHP API connection failed"
- Check if PHP API URL is accessible
- Verify CORS settings on PHP API
- Check network connectivity

#### "Registration successful on Node but failed on PHP"
- PHP API may be down or unreachable
- Check PHP API response format
- Review console for detailed errors

#### "Login works but ride booking fails"
- Verify PHP token is stored correctly
- Check PHP API authentication headers
- Ensure PHP user ID is available

### Debug Commands
```javascript
// Check stored tokens
console.log("Node Token:", localStorage.getItem("token"))
console.log("PHP Token:", localStorage.getItem("php_access_token"))
console.log("PHP User Data:", localStorage.getItem("php_user_data"))

// Test PHP API directly
window.dualAuthTests.testPHPLogin()
```

## 📋 Test Scenarios

### Scenario 1: Full Success
- Both APIs respond successfully
- User gets redirected to dashboard
- Both tokens are stored
- Success toast is shown

### Scenario 2: PHP API Down
- Node API succeeds, PHP fails
- User can still login and use basic features
- Warning message about ride booking limitations
- PHP error logged to console

### Scenario 3: Invalid Credentials
- Both APIs return authentication errors
- User sees error message
- No tokens are stored
- User remains on login page

## 🎯 Production Deployment

### Before Deploying
1. Test with production API URLs
2. Verify CORS settings on both APIs
3. Test error handling scenarios
4. Validate token storage and retrieval
5. Test ride booking functionality

### Deployment Checklist
- [ ] Environment variables configured
- [ ] API endpoints accessible
- [ ] CORS configured for both APIs
- [ ] Error logging in place
- [ ] Fallback behaviors tested
- [ ] User experience validated

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify API connectivity
3. Test individual API endpoints
4. Review token storage in localStorage
5. Check network requests in browser dev tools

## 🔄 Rollback Plan

If issues arise, you can easily rollback:
1. Users can still use `/login` and `/signup` (original pages)
2. Original Node API authentication continues to work
3. No changes to existing authentication flow
4. Dual auth is completely separate and optional
