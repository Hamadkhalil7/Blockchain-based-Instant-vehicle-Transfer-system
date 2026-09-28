import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, Wallet, Phone, User, ArrowLeft } from "lucide-react";
import { saveSession } from "../lib/session";

export function LoginRegister() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<"credentials" | "otp" | "wallet">("credentials");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [userType, setUserType] = useState<"seller" | "buyer" | "officer">("seller");

  const handleSubmitCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("wallet");
  };

  const handleConnectWallet = () => {
    // No auth endpoint on the backend yet — every API call runs as the Fabric
    // 'admin' identity regardless. This just remembers the CNIC/role locally
    // so later screens (InitiateTransfer, OfficerDashboard) have something
    // real to send instead of a hardcoded placeholder.
    saveSession({ cnic, phone, userType });

    // Navigate based on user type
    if (userType === "seller") {
      navigate("/seller-dashboard");
    } else if (userType === "buyer") {
      navigate("/buyer-dashboard");
    } else {
      navigate("/officer-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a3c5e] to-[#2563eb] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#1a3c5e]" />
            </div>
          </div>
          <h2 className="text-3xl text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-white/70">
            {isLogin ? "Login to your account" : "Register for vehicle transfers"}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === "credentials" ? "bg-[#2563eb] text-white" : "bg-gray-200 text-gray-600"}`}>
                1
              </div>
              <span className="text-sm text-gray-600">Details</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === "otp" ? "bg-[#2563eb] text-white" : "bg-gray-200 text-gray-600"}`}>
                2
              </div>
              <span className="text-sm text-gray-600">OTP</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === "wallet" ? "bg-[#2563eb] text-white" : "bg-gray-200 text-gray-600"}`}>
                3
              </div>
              <span className="text-sm text-gray-600">Wallet</span>
            </div>
          </div>

          {/* Step 1: Credentials */}
          {step === "credentials" && (
            <form onSubmit={handleSubmitCredentials} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">User Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserType("seller")}
                    className={`py-2 px-3 rounded-lg text-sm border-2 transition-colors ${
                      userType === "seller"
                        ? "border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb]"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    Seller
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("buyer")}
                    className={`py-2 px-3 rounded-lg text-sm border-2 transition-colors ${
                      userType === "buyer"
                        ? "border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb]"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("officer")}
                    className={`py-2 px-3 rounded-lg text-sm border-2 transition-colors ${
                      userType === "officer"
                        ? "border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb]"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    Officer
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">CNIC Number</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="XXXXX-XXXXXXX-X"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 XXX XXXXXXX"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Continue
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#2563eb]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-8 h-8 text-[#2563eb]" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Verify Your Phone</h3>
                <p className="text-sm text-gray-600">
                  Enter the 6-digit code sent to {phone}
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  required
                />
              </div>

              <button
                type="button"
                className="w-full text-sm text-[#2563eb] hover:underline"
              >
                Resend Code
              </button>

              <button
                type="submit"
                className="w-full py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Verify OTP
              </button>

              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </form>
          )}

          {/* Step 3: Wallet Connection */}
          {step === "wallet" && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#2563eb]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wallet className="w-8 h-8 text-[#2563eb]" />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">Connect Your Wallet</h3>
                <p className="text-sm text-gray-600">
                  Connect MetaMask to sign blockchain transactions
                </p>
              </div>

              <button
                onClick={handleConnectWallet}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors flex items-center justify-center gap-3"
              >
                <Wallet className="w-5 h-5" />
                Connect MetaMask Wallet
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Don't have MetaMask?{" "}
                  <a href="#" className="text-[#2563eb] hover:underline">
                    Install Extension
                  </a>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep("otp")}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          )}

          {/* Toggle Login/Register */}
          {step === "credentials" && (
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </span>{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#2563eb] hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
