# Dual Authentication Test Plan

## Manual Testing Checklist

### Environment Setup
- [ ] Verify `.env` file has correct API URLs
- [ ] Verify `VITE_PUBLIC_PHP_API_URL` is accessible
- [ ] Verify `VITE_PUBLIC_NODE_API_URL` is accessible

### Registration Tests
- [ ] Test dual registration with valid data
- [ ] Test dual registration with invalid email
- [ ] Test dual registration with existing email
- [ ] Test dual registration with missing required fields
- [ ] Test dual registration with invalid phone number format

### Login Tests
- [ ] Test dual login with valid credentials
- [ ] Test dual login with invalid credentials
- [ ] Test dual login with non-existent user
- [ ] Test dual login partial success (Node success, PHP fail)
- [ ] Test dual login partial success (PHP success, Node fail)

### Integration Tests
- [ ] Test token storage in localStorage
- [ ] Test session storage in cookies
- [ ] Test navigation after successful login
- [ ] Test navigation after successful registration
- [ ] Test error handling and toast messages

### API Response Tests
- [ ] Verify Node API response format
- [ ] Verify PHP API response format
- [ ] Verify response mapping functionality
- [ ] Verify combined profile data structure

### Edge Cases
- [ ] Test with network connectivity issues
- [ ] Test with API server down scenarios
- [ ] Test with malformed API responses
- [ ] Test with different country codes
- [ ] Test with very long mobile numbers

## Test Data

### Valid Test User
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe.test@example.com",
  "password": "TestPassword123!",
  "accountType": "enterprise",
  "countryCode": "+234",
  "mobileNo": "8012345678"
}
```

### Invalid Test Cases
```json
{
  "invalidEmail": "invalid-email",
  "shortPassword": "123",
  "emptyFirstName": "",
  "invalidCountryCode": "234",
  "invalidMobileNo": "abc123"
}
```

## Expected Behaviors

### Successful Registration
1. Both APIs return success responses
2. User is redirected to dual-login page
3. Success toast is displayed
4. No error messages in console

### Successful Login
1. Both APIs return success responses
2. Node API token stored in localStorage as "token"
3. PHP API token stored in localStorage as "php_access_token"
4. Session data stored in cookies
5. User redirected to dashboard or onboarding
6. Success toast displayed

### Partial Success Scenarios
1. Node API success + PHP API failure:
   - User can login and use basic features
   - Warning message about limited ride booking
   - PHP error logged to console
   
2. Node API failure + PHP API success:
   - Login fails completely
   - Error message displayed
   - User cannot proceed

### Error Handling
1. Clear error messages for users
2. Detailed error logging for developers
3. No application crashes
4. Proper fallback behaviors

## API Endpoint Testing

### PHP API Endpoints
- Registration: `POST {PHP_API_URL}/api/v3/auth/customer/register`
- Login: `POST {PHP_API_URL}/api/v3/auth/customer/login`

### Node API Endpoints  
- Registration: `POST {NODE_API_URL}/api/v1/auth/register-user`
- Login: `POST {NODE_API_URL}/api/v1/auth/login-user`

## Success Criteria
- [ ] All manual tests pass
- [ ] No TypeScript compilation errors
- [ ] No runtime JavaScript errors
- [ ] Proper error handling for all scenarios
- [ ] Consistent user experience
- [ ] Backward compatibility with existing auth system maintained
- [ ] PHP tokens properly stored for ride booking functionality

## Notes
- This is a temporary implementation
- PHP API errors should not prevent basic app functionality
- All existing functionality should continue to work
- Monitor console for any PHP API connection issues
