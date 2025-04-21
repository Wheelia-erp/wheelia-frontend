import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.decode(token);
    return decoded as {
      email: string;
      tenantId: string;
      userId: string;
      role: string;
    };
  } catch {
    return null;
  }
}
