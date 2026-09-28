// Thin typed client around the Vehicle Transfer REST API (Express -> Fabric Gateway).
// Every function here maps 1:1 to a route in fabric-backend/api/routes/*.js.
//
// Base URL comes from VITE_API_URL (set it in a .env file at the project root,
// e.g. VITE_API_URL=http://<your-ubuntu-server-ip>:4000). Falls back to
// localhost:4000 for local dev against the test network.

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (err) {
    // Network failure — server unreachable, CORS blocked, wrong URL, etc.
    throw new ApiError(
      "Could not reach the Vehicle Transfer API. Check that the server is running and VITE_API_URL is correct.",
      0
    );
  }

  // Some endpoints (e.g. GET /health) may return no body; guard against empty responses.
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = (data && (data.error || data.message)) || `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

// ---------- Data shapes returned by the chaincode ----------

export type VehicleStatus = "OWNED" | "TRANSFER_PENDING";

export interface Vehicle {
  docType: "vehicle";
  regNo: string;
  make: string;
  model: string;
  year: number;
  chassisNo: string;
  ownerCNIC: string;
  ownerName: string;
  status: VehicleStatus;
}

export type TransferStatus = "PENDING_BUYER" | "PENDING_OFFICER" | "APPROVED" | "REJECTED";

export interface Transfer {
  docType: "transfer";
  transferId: string;
  regNo: string;
  sellerCNIC: string;
  sellerName: string;
  buyerCNIC: string;
  buyerName: string;
  price: number;
  status: TransferStatus;
  createdAt: string;
  buyerAcceptedAt: string | null;
  officerId: string | null;
  officerDecisionAt: string | null;
  rejectReason: string | null;
}

export interface VehicleHistoryEntry {
  txId: string;
  timestamp: { seconds: { low: number; high: number; unsigned: boolean } } | string;
  isDelete: boolean;
  value: Vehicle | string;
}

// ---------- Vehicles ----------

export function registerVehicle(input: {
  regNo: string;
  make: string;
  model: string;
  year: number | string;
  chassisNo: string;
  ownerCNIC: string;
  ownerName: string;
}) {
  return request<Vehicle>("/api/vehicles", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getVehicle(regNo: string) {
  return request<Vehicle>(`/api/vehicles/${encodeURIComponent(regNo)}`);
}

export function getVehicleHistory(regNo: string) {
  return request<VehicleHistoryEntry[]>(`/api/vehicles/${encodeURIComponent(regNo)}/history`);
}

export function getTransfersForVehicle(regNo: string) {
  return request<Transfer[]>(`/api/vehicles/${encodeURIComponent(regNo)}/transfers`);
}

// ---------- Transfers ----------

export function initiateTransfer(input: {
  regNo: string;
  sellerCNIC: string;
  buyerCNIC: string;
  buyerName: string;
  price: number | string;
}) {
  return request<Transfer>("/api/transfers", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function acceptTransfer(transferId: string) {
  return request<Transfer>(`/api/transfers/${encodeURIComponent(transferId)}/accept`, {
    method: "POST",
  });
}

export function approveTransfer(transferId: string, officerId: string) {
  return request<Transfer>(`/api/transfers/${encodeURIComponent(transferId)}/approve`, {
    method: "POST",
    body: JSON.stringify({ officerId }),
  });
}

export function rejectTransfer(transferId: string, officerId: string, reason?: string) {
  return request<Transfer>(`/api/transfers/${encodeURIComponent(transferId)}/reject`, {
    method: "POST",
    body: JSON.stringify({ officerId, reason }),
  });
}

export function getPendingApprovals() {
  return request<Transfer[]>("/api/transfers/pending");
}

export function getTransfer(transferId: string) {
  return request<Transfer>(`/api/transfers/${encodeURIComponent(transferId)}`);
}
