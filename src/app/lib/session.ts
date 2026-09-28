// Lightweight session storage. The backend doesn't have a login/auth endpoint yet
// (every request runs as the Fabric 'admin' identity — see SETUP_GUIDE.md "Next steps").
// This just remembers who the UI thinks is logged in, so screens like
// InitiateTransfer and OfficerDashboard can use a real CNIC / officer ID
// instead of a hardcoded placeholder. Swap this out once real auth exists.

export type UserType = "seller" | "buyer" | "officer";

export interface Session {
  cnic: string;
  phone: string;
  userType: UserType;
  name?: string;
}

const STORAGE_KEY = "vehicleTransferSession";

export function saveSession(session: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}
