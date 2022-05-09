import jwt from '@tsndr/cloudflare-worker-jwt';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import routes from '../config/routes';

const checkAccessToken = async ({
  token,
  redirectTo,
  redirectOnVerified,
  redirectOnFailed,
}) => {
  if (!token?.accessToken) {
    return NextResponse.redirect(redirectTo);
  }

  try {
    await jwt.verify(token?.accessToken, process.env.JWT_SECRET);
    if (redirectOnVerified) {
      return NextResponse.redirect(redirectOnVerified);
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(redirectTo);
  }
};

const middleware = async (req) => {
  const { url } = req;
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (url.includes('/admin')) {
    return checkAccessToken({
      token,
      redirectTo: `${routes.titan_chest_ui}/login`,
    });
  }

  return NextResponse.next();
};

export default middleware;
