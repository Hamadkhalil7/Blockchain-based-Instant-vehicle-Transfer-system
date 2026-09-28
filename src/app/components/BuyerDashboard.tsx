import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Car, Shield, LogOut, Clock, CheckCircle, X, AlertCircle } from "lucide-react";

export function BuyerDashboard() {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const incomingRequests = [
    {
      id: 1,
      vehicle: {
        make: "Honda",
        model: "Civic VTi",
        year: 2019,
        registration: "XYZ-456",
      },
      sellerCnic: "42101-1234567-1",
      sellerName: "Muhammad Ahmad",
      price: "2,850,000",
      date: "2026-05-15",
      status: "pending",
    },
    {
      id: 2,
      vehicle: {
        make: "Toyota",
        model: "Corolla GLi",
        year: 2020,
        registration: "ABC-123",
      },
      sellerCnic: "42201-7654321-3",
      sellerName: "Ali Hassan",
      price: "3,200,000",
      date: "2026-05-16",
      status: "pending",
    },
  ];

  const handleAccept = (transfer: any) => {
    setSelectedTransfer(transfer);
    setShowConfirmModal(true);
  };

  const confirmAccept = () => {
    setShowConfirmModal(false);
    setShowSuccess(true);
  };

  const handleReject = (transferId: number) => {
    // Handle rejection logic
    console.log("Rejected transfer:", transferId);
  };

  if (showSuccess) {
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
                <h1 className="text-[#1a3c5e] text-lg leading-tight">Buyer Dashboard</h1>
                <p className="text-gray-500 text-xs">Incoming transfers</p>
              </div>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-3">Transfer Accepted!</h2>
            <p className="text-gray-600 mb-6">
              You have successfully accepted the ownership transfer for<br />
              <strong>{selectedTransfer?.vehicle.year} {selectedTransfer?.vehicle.make} {selectedTransfer?.vehicle.model}</strong>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                The transfer is now pending approval from the Excise & Taxation Officer.
                You will be notified once it's approved.
              </p>
            </div>
            <Link
              to="/buyer-dashboard"
              onClick={() => setShowSuccess(false)}
              className="inline-block px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-[#1a3c5e] text-lg leading-tight">Buyer Dashboard</h1>
              <p className="text-gray-500 text-xs">Incoming transfers</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-900">Fatima Khan</p>
              <p className="text-xs text-gray-500">42101-9876543-2</p>
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
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Pending Requests</span>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl text-gray-900">{incomingRequests.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Accepted</span>
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl text-gray-900">1</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">My Vehicles</span>
              <Car className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl text-gray-900">2</p>
          </div>
        </div>

        {/* Incoming Transfer Requests */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg text-gray-900">Incoming Transfer Requests</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {incomingRequests.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No pending transfer requests</p>
              </div>
            ) : (
              incomingRequests.map((request) => (
                <div key={request.id} className="px-6 py-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#2563eb]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Car className="w-7 h-7 text-[#2563eb]" />
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900 mb-1">
                          {request.vehicle.year} {request.vehicle.make} {request.vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Registration: {request.vehicle.registration}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>From: {request.sellerName}</span>
                          <span>CNIC: {request.sellerCnic}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-gray-900 mb-1">PKR {request.price}</p>
                      <p className="text-xs text-gray-500">{request.date}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm text-gray-700 mb-2">Smart Contract Details</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Transaction ID:</span>
                        <p className="text-gray-900 font-mono text-xs">0x8f3a...b2c4</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <p className="text-orange-600">Awaiting your acceptance</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex-1 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleAccept(request)}
                      className="flex-1 py-2.5 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept Transfer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#2563eb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Confirm Acceptance</h3>
              <p className="text-sm text-gray-600">
                You are about to accept the ownership transfer for:
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle:</span>
                <span className="text-gray-900">
                  {selectedTransfer?.vehicle.year} {selectedTransfer?.vehicle.make} {selectedTransfer?.vehicle.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registration:</span>
                <span className="text-gray-900">{selectedTransfer?.vehicle.registration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="text-gray-900">PKR {selectedTransfer?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="text-gray-900">{selectedTransfer?.sellerName}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900">
                This will sign a blockchain transaction. The transfer will be complete after officer approval.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAccept}
                className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors"
              >
                Sign with MetaMask
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
