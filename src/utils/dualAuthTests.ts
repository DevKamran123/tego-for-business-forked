// Test script for dual authentication functionality
// This can be run in the browser console for testing

import { dualAuthRegister, dualAuthLogin } from "../lib/auth/dualAuth";
import { registerUserPHP, loginUserPHP } from "../lib/auth/phpAuth";

// Test data
const testUser = {
  firstName: "Test",
  lastName: "User",
  email: "test.dual.auth@example.com",
  password: "TestPassword123!",
  accountType: "enterprise" as const,
  countryCode: "+234",
  mobileNo: "8012345678"
};

// PHP API specific test data
const phpRegisterPayload = {
  first_name: testUser.firstName,
  last_name: testUser.lastName,
  email: testUser.email,
  password: testUser.password,
  password_confirmation: testUser.password,
  country_code: testUser.countryCode,
  mobile_no: testUser.mobileNo,
};

const phpLoginPayload = {
  email: testUser.email,
  password: testUser.password,
};

// Test functions
export const testPHPRegistration = async () => {
  console.log("Testing PHP API Registration...");
  try {
    const result = await registerUserPHP(phpRegisterPayload);
    console.log("PHP Registration Result:", result);
    return result;
  } catch (error) {
    console.error("PHP Registration Error:", error);
    return { success: false, error };
  }
};

export const testPHPLogin = async () => {
  console.log("Testing PHP API Login...");
  try {
    const result = await loginUserPHP(phpLoginPayload);
    console.log("PHP Login Result:", result);
    return result;
  } catch (error) {
    console.error("PHP Login Error:", error);
    return { success: false, error };
  }
};

export const testDualRegistration = async () => {
  console.log("Testing Dual Auth Registration...");
  try {
    const result = await dualAuthRegister(testUser);
    console.log("Dual Registration Result:", result);
    return result;
  } catch (error) {
    console.error("Dual Registration Error:", error);
    return { success: false, error };
  }
};

export const testDualLogin = async () => {
  console.log("Testing Dual Auth Login...");
  try {
    const result = await dualAuthLogin({
      email: testUser.email,
      password: testUser.password,
    });
    console.log("Dual Login Result:", result);
    return result;
  } catch (error) {
    console.error("Dual Login Error:", error);
    return { success: false, error };
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log("🧪 Starting Dual Auth Tests...");
  
  // Test PHP API endpoints individually
  console.log("\n1. Testing PHP API Registration:");
  const phpRegResult = await testPHPRegistration();
  
  console.log("\n2. Testing PHP API Login:");
  const phpLoginResult = await testPHPLogin();
  
  // Test dual auth functions
  console.log("\n3. Testing Dual Auth Registration:");
  const dualRegResult = await testDualRegistration();
  
  console.log("\n4. Testing Dual Auth Login:");
  const dualLoginResult = await testDualLogin();
  
  // Summary
  console.log("\n📊 Test Summary:");
  console.log("PHP Registration:", phpRegResult.success ? "✅ PASS" : "❌ FAIL");
  console.log("PHP Login:", phpLoginResult.success ? "✅ PASS" : "❌ FAIL");
  console.log("Dual Registration:", dualRegResult.success ? "✅ PASS" : "❌ FAIL");
  console.log("Dual Login:", dualLoginResult.success ? "✅ PASS" : "❌ FAIL");
  
  return {
    phpRegistration: phpRegResult,
    phpLogin: phpLoginResult,
    dualRegistration: dualRegResult,
    dualLogin: dualLoginResult,
  };
};

// Utility function to check environment variables
export const checkEnvironment = () => {
  console.log("🔍 Checking Environment Configuration:");
  
  const nodeApiUrl = import.meta.env.VITE_PUBLIC_NODE_API_URL;
  const phpApiUrl = import.meta.env.VITE_PUBLIC_PHP_API_URL;
  
  console.log("Node API URL:", nodeApiUrl);
  console.log("PHP API URL:", phpApiUrl);
  
  if (!nodeApiUrl) {
    console.warn("⚠️ Node API URL not configured");
  }
  
  if (!phpApiUrl) {
    console.warn("⚠️ PHP API URL not configured");
  }
  
  return { nodeApiUrl, phpApiUrl };
};

// Export for console testing
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).dualAuthTests = {
    testPHPRegistration,
    testPHPLogin,
    testDualRegistration,
    testDualLogin,
    runAllTests,
    checkEnvironment,
  };
  
  console.log("🎯 Dual Auth Test Functions Available:");
  console.log("  - window.dualAuthTests.checkEnvironment()");
  console.log("  - window.dualAuthTests.testPHPRegistration()");
  console.log("  - window.dualAuthTests.testPHPLogin()");
  console.log("  - window.dualAuthTests.testDualRegistration()");
  console.log("  - window.dualAuthTests.testDualLogin()");
  console.log("  - window.dualAuthTests.runAllTests()");
}
