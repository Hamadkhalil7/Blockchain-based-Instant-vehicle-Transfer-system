import { Link } from "react-router";
import { Car, Shield, LogOut, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

export function SellerDashboard() {
  const vehicles = [
    {
      id: 1,
      make: "Toyota",
      model: "Corolla GLi",
      year: 2020,
      registration: "ABC-123",
      status: "owned",
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic VTi",
      year: 2019,
      registration: "XYZ-456",
      status: "owned",
    },
    {
      id: 3,
      make: "Suzuki",
      model: "Alto VXR",
      year: 2021,
      registration: "LMN-789",
      status: "owned",
    },
  ];

  const pendingTransfers = [
    {
      id: 1,
      vehicle: "Honda Civic VTi - XYZ-456",
      buyerCnic: "42101-1234567-1",
      date: "2026-05-15",
      status: "pending_buyer",
    },
    {
      id: 2,
      vehicle: "Suzuki Alto VXR - LMN-789",
      buyerCnic: "42301-9876543-2",
      date: "2026-05-17",
      status: "pending_officer",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a3c5e] rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[#1a3c5e] text-lg leading-tight">Seller Dashboard</h1>
              <p className="text-gray-500 text-xs">Manage your vehicles</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-900">Muhammad Ahmad</p>
              <p className="text-xs text-gray-500">42101-1234567-1</p>
            </div>
            <Link
              to="/"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Vehicles</span>
              <Car className="w-5 h-5 text-[#2563eb]" />
            </div>
            <p className="text-3xl text-gray-900">3</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Pending Transfers</span>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl text-gray-900">2</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Completed</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl text-gray-900">5</p>
          </div>
        </div>

        {/* My Vehicles */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg text-gray-900">My Vehicles</h2>
            <span className="text-sm text-gray-500">{vehicles.length} vehicles</span>
          </div>
          <div className="divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2563eb]/10 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-500">Registration: {vehicle.registration}</p>
                  </div>
                </div>
                <Link
                  to="/initiate-transfer"
                  state={{ vehicle }}
                  className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center gap-2"
                >
                  Initiate Transfer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Transfers */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg text-gray-900">Pending Transfers</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {pendingTransfers.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No pending transfers</p>
              </div>
            ) : (
              pendingTransfers.map((transfer) => (
                <div key={transfer.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-900">{transfer.vehicle}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        transfer.status === "pending_buyer"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {transfer.status === "pending_buyer" ? "Waiting for Buyer" : "Pending Officer Approval"}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>Buyer CNIC: {transfer.buyerCnic}</span>
                    <span>Date: {transfer.date}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
