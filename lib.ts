import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

interface IUser {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  isVerified: boolean;
}


export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user

  const user: IUser = {
    email: "test@gmail.com",
    fullName: "John",
    isAdmin: true,
    isVerified: true,
    _id: "dfd65f5d55fy5g4reg4654g",
    avatar: "http://",
  };

  // Create the session
  const session = await encrypt(user);

  // Save the session in a cookie
  const today = new Date();
  const accessTokenExpiry = new Date().setDate(today.getDate() + 1); // next day
  const refreshTokenExpiry = new Date().setDate(today.getDate() + 5); // next 5 days

  cookies().set({
    name: "accessToken",
    value : session,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: accessTokenExpiry,
  });

  cookies().set({
    name: "refreshToken",
    value : session,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: refreshTokenExpiry,
  });

  cookies().set({
    name: "currentUser",
    value : session,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: refreshTokenExpiry,
  });
}

// Destroy the session
export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  cookies().delete("currentUser");
};

export async function updateSession(request: NextRequest) {
  const res = NextResponse.next();
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  // return res;

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (accessToken) {
    res.headers.set("accessToken", accessToken);
    return res;
  }

  // if access token doesn't expire
  const parsed = await decrypt(refreshToken);
  const session = await encrypt(parsed);

  // Save the session in a cookie
  const today = new Date();
  const accessTokenExpiry = new Date().setDate(today.getDate() + 1); // next day
  const refreshTokenExpiry = new Date().setDate(today.getDate() + 5); // next 5 days

  res.cookies.set({
    name: "accessToken",
    value : session,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: accessTokenExpiry,
  });

  res.cookies.set({
    name: "refreshToken",
    value : session,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: refreshTokenExpiry,
  });

  res.cookies.set({
    name: "currentUser",
    value : session,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: refreshTokenExpiry,
  });

  res.headers.set("accessToken", session);
  return res;
}

export const currentUser = async (): Promise<IUser | null> => {
  const session = cookies().get("currentUser")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export const getToken = () => {
  return headers().get("accessToken");
}

export const getAuthStatus = () => {
  return cookies().has("accessToken");  
}

export const auth = async (req: NextRequest) => {
  const refreshToken = req.cookies.has("refreshToken");
  const user = await currentUser();
  
  return {
    isLoggedIn: refreshToken,
    isAdmin: user?.isAdmin ?? false,
  };
};


export const ClientSignedOut = () => {
  const session = cookies().has("accessToken");
  // return !session ? children : null;
  return session;
}
