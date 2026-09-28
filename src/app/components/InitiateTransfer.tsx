import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { ArrowLeft, User, Car, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { initiateTransfer, ApiError } from "../lib/api";
import { getSession } from "../lib/session";

interface LocationVehicle {
  make: string;
  model: string;
  year: number;
  registration: string; // maps to the chaincode's regNo
}

export function InitiateTransfer() {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle: LocationVehicle = location.state?.vehicle || {
    make: "Toyota",
    model: "Corolla GLi",
    year: 2020,
    registration: "ABC-123",
  };

  const session = getSession();
  // Falls back to the demo seller CNIC if nobody has logged in yet.
  const sellerCnic = session?.cnic || "42101-1234567-1";

  const [step, setStep] = useState<"details" | "confirm">("details");
  const [buyerCnic, setBuyerCnic] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [transferPrice, setTransferPrice] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep("confirm");
  };

  const handleConfirmTransfer = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await initiateTransfer({
        regNo: vehicle.registration,
        sellerCNIC: sellerCnic,
        buyerCNIC: buyerCnic,
        buyerName,
        price: transferPrice,
      });
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/seller-dashboard");
      }, 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong submitting the transfer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl text-gray-900 mb-2">Transfer Initiated!</h2>
          <p className="text-gray-600 mb-4">
            The buyer will be notified to accept the transfer
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Redirecting to dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            to="/seller-dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl text-[#1a3c5e]">Initiate Vehicle Transfer</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "details" ? "bg-[#2563eb] text-white" : "bg-green-500 text-white"}`}>
              {step === "details" ? "1" : <CheckCircle className="w-6 h-6" />}
            </div>
            <span className="text-sm text-gray-600 ml-2">Enter Details</span>
          </div>
          <div className="w-20 h-0.5 bg-gray-300 mx-4"></div>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === "confirm" ? "bg-[#2563eb] text-white" : "bg-gray-300 text-gray-600"}`}>
              2
            </div>
            <span className="text-sm text-gray-600 ml-2">Confirm & Submit</span>
          </div>
        </div>

        {/* Step 1: Enter Details */}
        {step === "details" && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-xl text-gray-900 mb-6">Transfer Details</h2>

            {/* Vehicle Info (Read-only) */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Car className="w-6 h-6 text-[#2563eb]" />
                <h3 className="text-gray-900">Vehicle Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Make & Model</p>
                  <p className="text-gray-900">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Registration</p>
                  <p className="text-gray-900">{vehicle.registration}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitDetails} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Buyer Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Full name as on CNIC"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Buyer CNIC Number</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={buyerCnic}
                    onChange={(e) => setBuyerCnic(e.target.value)}
                    placeholder="XXXXX-XXXXXXX-X"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Transfer Price (PKR)</label>
                <input
                  type="number"
                  value={transferPrice}
                  onChange={(e) => setTransferPrice(e.target.value)}
                  placeholder="2500000"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="mb-1">Please verify the buyer's CNIC carefully.</p>
                  <p>Once initiated, this transfer cannot be cancelled by you.</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Continue to Confirm & Submit
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Confirm & Submit */}
        {step === "confirm" && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#2563eb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#2563eb]" />
              </div>
              <h2 className="text-xl text-gray-900 mb-2">Confirm Transfer</h2>
              <p className="text-gray-600">
                Review the details below before submitting to the ledger
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <p className="mb-1">This action will record a transfer request on the ledger.</p>
                <p>The buyer must accept and the officer must approve before ownership is transferred.</p>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-sm text-gray-700 mb-3">Transaction Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">From (Seller)</span>
                  <span className="text-gray-900">{sellerCnic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To (Buyer)</span>
                  <span className="text-gray-900">{buyerName} — {buyerCnic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="text-gray-900">{vehicle.registration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="text-gray-900">PKR {transferPrice}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-900">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setStep("details")}
                disabled={isSubmitting}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleConfirmTransfer}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Transfer"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
