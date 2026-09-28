import { Link, useParams } from "react-router";
import { Shield, CheckCircle, Download, Share2, ArrowLeft } from "lucide-react";

export function OwnershipCertificate() {
  const { id } = useParams();

  const certificateData = {
    certificateNo: "PKE-2026-VT-00" + id,
    vehicle: {
      make: "Honda",
      model: "Civic VTi",
      year: 2019,
      registration: "XYZ-456",
      engineNo: "F20B-1234567",
      chassisNo: "MRHFB8160GK123456",
      color: "Silver",
    },
    previousOwner: {
      name: "Muhammad Ahmad",
      cnic: "42101-1234567-1",
      address: "House 123, Street 5, F-10, Islamabad",
    },
    newOwner: {
      name: "Fatima Khan",
      cnic: "42101-9876543-2",
      address: "Apartment 45, Block C, DHA Phase 2, Lahore",
    },
    transferDate: "May 18, 2026",
    transferPrice: "2,850,000",
    blockchainHash: "0x8f3ab2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8",
    blockNumber: "789456",
    officerName: "Asif Mahmood",
    officerId: "OFF-2026-001",
    department: "Excise & Taxation Department",
    province: "Punjab",
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Don't print */}
      <header className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/buyer-dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Certificate */}
      <div className="max-w-5xl mx-auto px-6 py-12 print:p-0">
        <div className="bg-white border-4 border-[#1a3c5e] rounded-2xl p-12 shadow-2xl print:border-2 print:shadow-none">
          {/* Header with Emblem */}
          <div className="text-center mb-8 border-b-4 border-[#2563eb] pb-8">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="w-20 h-20 bg-[#1a3c5e] rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-[#1a3c5e] mb-1">
                  Government of Pakistan
                </h1>
                <h2 className="text-xl text-gray-700">{certificateData.department}</h2>
                <p className="text-sm text-gray-600">Province of {certificateData.province}</p>
              </div>
              <div className="w-20 h-20 bg-[#1a3c5e] rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="inline-block bg-gradient-to-r from-[#1a3c5e] to-[#2563eb] text-white px-8 py-3 rounded-full">
              <h3 className="text-2xl tracking-wide">DIGITAL OWNERSHIP CERTIFICATE</h3>
            </div>
          </div>

          {/* Certificate Number and Verification */}
          <div className="flex items-center justify-between mb-8 bg-gray-50 rounded-lg p-4">
            <div>
              <p className="text-sm text-gray-600">Certificate Number</p>
              <p className="text-lg text-gray-900 font-mono">{certificateData.certificateNo}</p>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-900">Blockchain Verified</span>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="mb-8">
            <h3 className="text-lg text-[#1a3c5e] mb-4 border-b-2 border-[#2563eb] pb-2">
              VEHICLE INFORMATION
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Make & Model</p>
                <p className="text-gray-900">
                  {certificateData.vehicle.year} {certificateData.vehicle.make} {certificateData.vehicle.model}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Registration Number</p>
                <p className="text-gray-900 text-xl">{certificateData.vehicle.registration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Engine Number</p>
                <p className="text-gray-900 font-mono">{certificateData.vehicle.engineNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Chassis Number</p>
                <p className="text-gray-900 font-mono">{certificateData.vehicle.chassisNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Color</p>
                <p className="text-gray-900">{certificateData.vehicle.color}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Year of Manufacture</p>
                <p className="text-gray-900">{certificateData.vehicle.year}</p>
              </div>
            </div>
          </div>

          {/* Transfer Details */}
          <div className="mb-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-lg text-[#1a3c5e] mb-4">OWNERSHIP TRANSFER DETAILS</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Previous Owner
                </h4>
                <p className="text-gray-900 mb-1">{certificateData.previousOwner.name}</p>
                <p className="text-sm text-gray-600">CNIC: {certificateData.previousOwner.cnic}</p>
                <p className="text-sm text-gray-600 mt-2">{certificateData.previousOwner.address}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  New Owner (Current)
                </h4>
                <p className="text-gray-900 mb-1">{certificateData.newOwner.name}</p>
                <p className="text-sm text-gray-600">CNIC: {certificateData.newOwner.cnic}</p>
                <p className="text-sm text-gray-600 mt-2">{certificateData.newOwner.address}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t-2 border-blue-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Transfer Date</p>
                <p className="text-gray-900">{certificateData.transferDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Transfer Amount</p>
                <p className="text-gray-900">PKR {certificateData.transferPrice}</p>
              </div>
            </div>
          </div>

          {/* Blockchain Verification */}
          <div className="mb-8 bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              BLOCKCHAIN VERIFICATION
            </h3>
            <div className="space-y-3 text-sm font-mono">
              <div>
                <p className="text-gray-400 mb-1">Transaction Hash</p>
                <p className="break-all text-green-400">{certificateData.blockchainHash}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 mb-1">Block Number</p>
                  <p>{certificateData.blockNumber}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Network</p>
                  <p>Ethereum Mainnet</p>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  This certificate is cryptographically secured on the blockchain and can be verified at any time.
                  Any attempt to modify this document will be immediately detectable.
                </p>
              </div>
            </div>
          </div>

          {/* Official Stamp and Signature */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="border-4 border-[#1a3c5e] rounded-full w-40 h-40 mx-auto flex items-center justify-center mb-4 relative">
                <div className="text-center">
                  <Shield className="w-12 h-12 text-[#1a3c5e] mx-auto mb-2" />
                  <p className="text-xs text-[#1a3c5e]">OFFICIAL SEAL</p>
                  <p className="text-xs text-[#1a3c5e]">E&TD</p>
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600">Official Department Seal</p>
            </div>
            <div className="border-t-2 border-gray-900 pt-4">
              <p className="text-gray-900 mb-1">{certificateData.officerName}</p>
              <p className="text-sm text-gray-600 mb-1">Officer ID: {certificateData.officerId}</p>
              <p className="text-sm text-gray-600 mb-1">{certificateData.department}</p>
              <p className="text-sm text-gray-600">Date: {certificateData.transferDate}</p>
              <p className="text-xs text-gray-500 mt-3 italic">Digitally Signed</p>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="border-t-2 border-gray-300 pt-6 text-center">
            <p className="text-xs text-gray-600 mb-2">
              This is a digitally generated certificate secured by blockchain technology.
            </p>
            <p className="text-xs text-gray-500">
              For verification, visit: verify.etd.gov.pk or scan QR code
            </p>
            <div className="mt-4 flex items-center justify-center gap-8">
              <div className="w-20 h-20 bg-gray-900 rounded flex items-center justify-center">
                <div className="w-16 h-16 bg-white"></div>
              </div>
              <div className="text-left text-xs text-gray-600">
                <p>Scan to verify certificate</p>
                <p className="font-mono">{certificateData.certificateNo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer - Don't print */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4 print:hidden">
          <p className="text-sm text-amber-900">
            <strong>Note:</strong> This digital certificate is legally binding and serves as proof of vehicle ownership.
            The blockchain hash ensures authenticity and prevents tampering. Keep this certificate safe and accessible.
          </p>
        </div>
      </div>
    </div>
  );
}
