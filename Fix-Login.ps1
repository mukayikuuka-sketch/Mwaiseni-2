# Fix-Login.ps1
cd frontend

# Create/Update LoginPage.tsx with WORKING test credentials
@"
// src/pages/LoginPage.tsx - WORKING VERSION
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // TEST USERS - THESE WILL WORK IMMEDIATELY
  const testUsers = [
    { email: "guest@zamstay.com", password: "guest123", role: "guest", name: "Test Guest" },
    { email: "partner@zamstay.com", password: "partner123", role: "partner", name: "Test Partner" },
    { email: "admin@zamstay.com", password: "admin123", role: "admin", name: "Test Admin" },
    { email: "test@test.com", password: "test123", role: "guest", name: "Demo User" }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if using test credentials
      const testUser = testUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (testUser) {
        console.log("✅ Logging in with test user:", testUser);

        // Create mock JWT token
        const mockToken = "mock_jwt_" + Date.now() + "_" + testUser.role;
        
        // Save to localStorage
        localStorage.setItem("access_token", mockToken);
        localStorage.setItem("user", JSON.stringify({
          id: 1,
          email: testUser.email,
          name: testUser.name,
          role: testUser.role,
          avatar: null
        }));

        // Show success alert
        alert(`✅ Success! Logged in as \${testUser.name} (\${testUser.role})`);

        // Redirect based on role
        setTimeout(() => {
          if (testUser.role === "guest") {
            navigate("/my-trips");
          } else if (testUser.role === "partner" || testUser.role === "admin") {
            navigate("/partner/dashboard");
          } else {
            navigate("/");
          }
          // Force page reload to update all components
          window.location.reload();
        }, 500);

        return;
      }

      // If not test user, try real API
      console.log("Trying real API login...");
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      
      // Save to localStorage
      localStorage.setItem("access_token", data.access);
      if (data.refresh) {
        localStorage.setItem("refresh_token", data.refresh);
      }
      localStorage.setItem("user", JSON.stringify(data.user || {
        email: email,
        name: email.split("@")[0],
        role: "guest"
      }));

      // Redirect
      const role = data.user?.role || "guest";
      if (role === "partner" || role === "admin") {
        navigate("/partner/dashboard");
      } else {
        navigate("/my-trips");
      }

      // Force reload to update auth state everywhere
      setTimeout(() => {
        window.location.reload();
      }, 100);

    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Quick login buttons for testing
  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    // Auto-submit after a short delay
    setTimeout(() => {
      const form = document.querySelector("form");
      if (form) {
        const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-lg w-full">
        {/* Test User Quick Login Panel */}
        <div className="mb-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Quick Test Login</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => quickLogin("guest@zamstay.com", "guest123")}
              className="bg-green-100 text-green-800 py-3 rounded-lg font-medium hover:bg-green-200 transition"
            >
              👤 Login as Guest
            </button>
            <button
              onClick={() => quickLogin("partner@zamstay.com", "partner123")}
              className="bg-blue-100 text-blue-800 py-3 rounded-lg font-medium hover:bg-blue-200 transition"
            >
              🏨 Login as Partner
            </button>
            <button
              onClick={() => quickLogin("admin@zamstay.com", "admin123")}
              className="bg-purple-100 text-purple-800 py-3 rounded-lg font-medium hover:bg-purple-200 transition"
            >
              ⚙️ Login as Admin
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Click any button above for instant login (no password typing needed)
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to your ZamStay account</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-500">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
"@ | Set-Content -Path "src\pages\LoginPage.tsx" -Encoding UTF8

Write-Host "✅ LoginPage.tsx updated with WORKING test credentials" -ForegroundColor Green
