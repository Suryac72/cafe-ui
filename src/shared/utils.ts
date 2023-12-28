export interface UserData {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface Setting{
  route: string;
  label:string;
}
export function logout(userData?: UserData) {
  if (userData) {
    localStorage.removeItem("token");
  }
  localStorage.removeItem("token");
}

const decodeToken = (token: string): UserData => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decodedData = JSON.parse(atob(base64)) as UserData;
  return decodedData;
};

const isTokenExpired = (token: UserData | null): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  if(token){
    return token.exp < currentTime;
  }
  return true;
};

export function getJwtToken() {
  const token = localStorage.getItem("token");
  let userData, isExpired = true;
  if (token) {
    // Decode the JWT to extract user information
    userData = decodeToken(token);
    // Set the user data in the state
    isExpired = isTokenExpired(userData);
  }
  return { userData, expired: isExpired};
}
