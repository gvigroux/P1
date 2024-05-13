import { getServerSession } from "next-auth"
import authOptions from "../api/auth/[...nextauth]/options"
//import { signIn } from "../api/auth/[...nextauth]/route";
import { AuthError } from "@auth/core/errors";


export const getAuthSession = () => {
    return getServerSession(authOptions);
}

export const getRequiredAuthSession = async () => {
    const session = await getAuthSession();
    if(!session?.user)
        throw new Error('Session not found');
    return session;
}

 
// ...
 /*
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
*/