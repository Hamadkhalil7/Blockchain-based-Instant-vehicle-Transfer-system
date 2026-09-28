import { Link } from "react-router";
import { Shield, Zap, Eye, CheckCircle } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a3c5e] to-[#2563eb]">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#1a3c5e]" />
            </div>
            <div>
              <h1 className="text-white text-lg leading-tight">Vehicle Transfer System</h1>
              <p className="text-white/70 text-xs">Excise & Taxation Department</p>
            </div>
          </div>
          <Link
            to="/login"
            className="px-6 py-2 bg-white text-[#1a3c5e] rounded-lg hover:bg-white/90 transition-colors"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl text-white mb-6">
            Instant Vehicle Ownership Transfer
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Secure, transparent, and instant vehicle transfers powered by blockchain technology.
            Transfer vehicle ownership in minutes, not days.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-white text-[#1a3c5e] rounded-lg text-lg hover:bg-white/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl text-white text-center mb-12">
          Why Choose Our System?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl text-white mb-3">Secure & Immutable</h4>
            <p className="text-white/70">
              All transfers are recorded on the blockchain, ensuring tamper-proof records and complete security.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl text-white mb-3">Instant Transfers</h4>
            <p className="text-white/70">
              Complete vehicle ownership transfers in minutes instead of waiting days for paperwork processing.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl text-white mb-3">Transparent Process</h4>
            <p className="text-white/70">
              Track every step of the transfer process with complete transparency and real-time updates.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl text-white text-center mb-12">
          How It Works
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              1
            </div>
            <h4 className="text-white mb-2">Register & Login</h4>
            <p className="text-white/70 text-sm">
              Create account with CNIC and connect wallet
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              2
            </div>
            <h4 className="text-white mb-2">Initiate Transfer</h4>
            <p className="text-white/70 text-sm">
              Seller enters buyer details and vehicle info
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              3
            </div>
            <h4 className="text-white mb-2">Buyer Accepts</h4>
            <p className="text-white/70 text-sm">
              Buyer reviews and confirms the transfer
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl">
              4
            </div>
            <h4 className="text-white mb-2">Officer Approves</h4>
            <p className="text-white/70 text-sm">
              Government officer validates and approves
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-white/60 text-sm">
          <p>© 2026 Excise & Taxation Department, Government of Pakistan</p>
          <p className="mt-2">Powered by Blockchain Technology</p>
        </div>
      </footer>
    </div>
  );
}
