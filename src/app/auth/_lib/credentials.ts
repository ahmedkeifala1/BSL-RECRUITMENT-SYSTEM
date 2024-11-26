import { Credentials, CredentialsSchema } from "@/app/auth/_lib/schemas";
import Credential from "next-auth/providers/credentials";
import { credentialsSignIn } from "./actions";

const CredentialsProvider = Credential({
  credentials: {
    email: {},
    password: {},
  },
  async authorize(credentials) {
    const validated = await CredentialsSchema.safeParseAsync(credentials);
    if (!validated.success) {
      throw new Error("Invalid credentials", { cause: 400 });
    }

    const signIn = await credentialsSignIn(credentials as Credentials);

    if (!signIn.data || signIn.isFailure) {
      throw new Error(signIn.message, { cause: signIn.code });
    }

    const user = signIn.data;

    return {
      id: user.id,
      email: user.email,
      name: user.fullName,
      type: user.userType,
      isVerified: user.isEmailVerified,
    };
  },
});

export default CredentialsProvider;
