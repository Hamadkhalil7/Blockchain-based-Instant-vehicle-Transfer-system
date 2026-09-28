import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Shield, LogOut, Clock, CheckCircle, X, FileText, History, Loader2, AlertCircle } from "lucide-react";
import {
  getPendingApprovals,
  getVehicle,
  getVehicleHistory,
  approveTransfer,
  rejectTransfer,
  ApiError,
  type Transfer,
  type Vehicle,
  type VehicleHistoryEntry,
} from "../lib/api";
import { getSession } from "../lib/session";

interface EnrichedTransfer extends Transfer {
  vehicle?: Vehicle;
  vehicleError?: string;
}

export function OfficerDashboard() {
  const session = getSession();
  // No login endpoint yet, so fall back to a demo officer identity.
  const officerId = session?.cnic || "OFF-2026-001";
  const officerName = session?.name || "Duty Officer";

  const [pendingApprovals, setPendingApprovals] = useState<EnrichedTransfer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [actionTransferId, setActionTransferId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [rejectTarget, setRejectTarget] = useState<EnrichedTransfer | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [historyTransfer, setHistoryTransfer] = useState<EnrichedTransfer | null>(null);
  const [historyEntries, setHistoryEntries] = useState<VehicleHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const [receiptTransfer, setReceiptTransfer] = useState<EnrichedTransfer | null>(null);

  async function loadPendingApprovals() {
    setIsLoading(true);
    setLoadError(null);
    try {
      const transfers = await getPendingApprovals();
      // The transfer record only has regNo — pull each vehicle's make/model/year/chassis
      // to render the cards. Fetched in parallel; a failed lookup doesn't block the rest.
      const enriched: EnrichedTransfer[] = await Promise.all(
        transfers.map(async (t) => {
          try {
            const vehicle = await getVehicle(t.regNo);
            return { ...t, vehicle };
          } catch (err) {
            return { ...t, vehicleError: err instanceof ApiError ? err.message : "Could not load vehicle" };
          }
        })
      );
      setPendingApprovals(enriched);
    } catch (err) {
      setLoadError(err instanceof ApiError ? err.message : "Could not load pending approvals.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPendingApprovals();
  }, []);

  const handleApprove = async (transfer: EnrichedTransfer) => {
    setActionError(null);
    setActionTransferId(transfer.transferId);
    try {
      const approved = await approveTransfer(transfer.transferId, officerId);
      setPendingApprovals((prev) => prev.filter((t) => t.transferId !== transfer.transferId));
      setReceiptTransfer({ ...approved, vehicle: transfer.vehicle });
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Could not approve this transfer.");
    } finally {
      setActionTransferId(null);
    }
  };

  const openRejectModal = (transfer: EnrichedTransfer) => {
    setActionError(null);
    setRejectReason("");
    setRejectTarget(transfer);
  };

  const confirmReject = async () => {
    if (!rejectTarget) return;
    setActionError(null);
    setActionTransferId(rejectTarget.transferId);
    try {
      await rejectTransfer(rejectTarget.transferId, officerId, rejectReason);
      setPendingApprovals((prev) => prev.filter((t) => t.transferId !== rejectTarget.transferId));
      setRejectTarget(null);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Could not reject this transfer.");
    } finally {
      setActionTransferId(null);
    }
  };

  const viewHistory = async (transfer: EnrichedTransfer) => {
    setHistoryTransfer(transfer);
    setHistoryEntries([]);
    setHistoryError(null);
    setHistoryLoading(true);
    try {
      const entries = await getVehicleHistory(transfer.regNo);
      setHistoryEntries(entries);
    } catch (err) {
      setHistoryError(err instanceof ApiError ? err.message : "Could not load vehicle history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1a3c5e] border-b border-[#2c5282]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#1a3c5e]" />
            </div>
            <div>
              <h1 className="text-white text-lg leading-tight">Officer Dashboard</h1>
              <p className="text-white/70 text-xs">Excise & Taxation Department</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-white">{officerName}</p>
              <p className="text-xs text-white/70">Officer ID: {officerId}</p>
            </div>
            <Link
              to="/"
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-1 gap-6 mb-8 max-w-xs">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Pending Approvals</span>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl text-gray-900">{isLoading ? "—" : pendingApprovals.length}</p>
          </div>
        </div>

        {actionError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-900">{actionError}</p>
          </div>
        )}

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg text-gray-900">Pending Transfer Approvals</h2>
            <button
              onClick={loadPendingApprovals}
              disabled={isLoading}
              className="text-sm text-[#2563eb] hover:underline disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          {isLoading && (
            <div className="px-6 py-16 text-center text-gray-500 flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin" />
              Loading pending approvals...
            </div>
          )}

          {!isLoading && loadError && (
            <div className="px-6 py-16 text-center">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <p className="text-red-700 mb-3">{loadError}</p>
              <button
                onClick={loadPendingApprovals}
                className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !loadError && pendingApprovals.length === 0 && (
            <div className="px-6 py-16 text-center text-gray-500">No transfers awaiting approval.</div>
          )}

          {!isLoading && !loadError && pendingApprovals.length > 0 && (
            <div className="divide-y divide-gray-200">
              {pendingApprovals.map((approval) => (
                <div key={approval.transferId} className="px-6 py-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg text-gray-900 mb-1">
                        {approval.vehicle
                          ? `${approval.vehicle.year} ${approval.vehicle.make} ${approval.vehicle.model}`
                          : approval.vehicleError || "Vehicle details unavailable"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">Registration: {approval.regNo}</p>
                      {approval.vehicle && (
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Chassis No:</span>
                            <span className="text-gray-900 ml-2">{approval.vehicle.chassisNo}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => viewHistory(approval)}
                      className="px-3 py-2 text-sm text-[#2563eb] border border-[#2563eb] rounded-lg hover:bg-[#2563eb]/5 transition-colors flex items-center gap-2"
                    >
                      <History className="w-4 h-4" />
                      View History
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm text-gray-700 mb-2">Seller Information</h4>
                        <p className="text-gray-900">{approval.sellerName}</p>
                        <p className="text-sm text-gray-600">CNIC: {approval.sellerCNIC}</p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-700 mb-2">Buyer Information</h4>
                        <p className="text-gray-900">{approval.buyerName}</p>
                        <p className="text-sm text-gray-600">CNIC: {approval.buyerCNIC}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm text-gray-400">Ledger Record</h4>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                        {approval.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 font-mono">Transfer ID: {approval.transferId}</p>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                      <div>
                        <span className="text-gray-500">Transfer Amount:</span>
                        <p className="text-gray-300">PKR {approval.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Date Initiated:</span>
                        <p className="text-gray-300">{new Date(approval.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openRejectModal(approval)}
                      disabled={actionTransferId === approval.transferId}
                      className="flex-1 py-2.5 border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Reject Transfer
                    </button>
                    <button
                      onClick={() => handleApprove(approval)}
                      disabled={actionTransferId === approval.transferId}
                      className="flex-1 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {actionTransferId === approval.transferId ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      Approve Transfer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Vehicle History Modal */}
      {historyTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-gray-900">Vehicle Transfer History</h3>
              <button
                onClick={() => setHistoryTransfer(null)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm text-gray-600 mb-2">Vehicle Details</h4>
              <p className="text-lg text-gray-900">
                {historyTransfer.vehicle
                  ? `${historyTransfer.vehicle.year} ${historyTransfer.vehicle.make} ${historyTransfer.vehicle.model}`
                  : "Vehicle details unavailable"}
              </p>
              <p className="text-sm text-gray-600">Registration: {historyTransfer.regNo}</p>
            </div>

            {historyLoading && (
              <div className="py-10 text-center text-gray-500 flex flex-col items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                Loading history...
              </div>
            )}

            {!historyLoading && historyError && (
              <p className="text-red-700 text-sm">{historyError}</p>
            )}

            {!historyLoading && !historyError && (
              <div className="space-y-4">
                {historyEntries.length === 0 && (
                  <p className="text-sm text-gray-500">No on-chain history found for this vehicle.</p>
                )}
                {historyEntries.map((entry, idx) => {
                  const value = typeof entry.value === "string" ? null : entry.value;
                  return (
                    <div key={entry.txId + idx} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-900">
                          {entry.isDelete ? "Record Deleted" : "Ledger Update"}
                        </span>
                      </div>
                      {value && (
                        <>
                          <p className="text-sm text-gray-600">Owner: {value.ownerName} ({value.ownerCNIC})</p>
                          <p className="text-sm text-gray-600">Status: {value.status}</p>
                        </>
                      )}
                      <p className="text-xs text-gray-500 mt-1 font-mono">TX: {entry.txId}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setHistoryTransfer(null)}
              className="w-full mt-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Reject Transfer</h3>
              <p className="text-sm text-gray-600">
                Rejecting the transfer for {rejectTarget.regNo}. This will be recorded on the ledger.
              </p>
            </div>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection (optional)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent mb-6"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setRejectTarget(null)}
                disabled={actionTransferId === rejectTarget.transferId}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={actionTransferId === rejectTarget.transferId}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {actionTransferId === rejectTarget.transferId && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approval Receipt Modal */}
      {receiptTransfer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">Transfer Approved!</h3>
              <p className="text-gray-600">Ledger record updated</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-6 text-white">
              <h4 className="text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Transfer Record
              </h4>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Transfer ID:</span>
                  <span className="text-xs">{receiptTransfer.transferId}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Vehicle:</span>
                  <span>{receiptTransfer.regNo}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">New Owner:</span>
                  <span className="text-xs">{receiptTransfer.buyerName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400">{receiptTransfer.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Decided At:</span>
                  <span>
                    {receiptTransfer.officerDecisionAt
                      ? new Date(receiptTransfer.officerDecisionAt).toLocaleString()
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                The ownership transfer has been recorded on the ledger and is now complete.
                Both parties can view their digital ownership certificate.
              </p>
            </div>

            <button
              onClick={() => setReceiptTransfer(null)}
              className="w-full py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
