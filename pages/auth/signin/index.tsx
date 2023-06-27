import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Label,
  Input,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import { login } from "api/auth";
import image from "../../../assets/images/login.png";
import { object, string } from 'yup';
import { toast } from "react-toastify";
import { asynchronousEmulation } from '../../../utils';
import { HOME_PAGE_LINK } from '../../../constants';

const LoginSchema = object({
  email: string().email("Invalid email").required("Required"),
  password: string().required("Required").min(6),
});

function LoginPage() {
  // Local state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const verification = async () => {
      const payload = await verifyForm();

      console.log(payload);

      if (payload) setVerified(true);
      else setVerified(false);
    };

    verification();
  }, [email, password]);

  React.useEffect(() => {
    const redirection = async () => {
      // Wait for 2 seconds
      await asynchronousEmulation(2000);

      // Redirect to home page
      window.location.href = HOME_PAGE_LINK;
    }

    if (redirect) redirection();
  }, [redirect])

  // Some handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    if (target === "email") setEmail(e.target.value);
    if (target === "password") setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (verified) {
      // Start login process
      setLoading(true);

      const { data, error } = await login(email, password);

      // End login process
      setLoading(false);

      if (data) {
        // Redirect to home page
        setRedirect(true);

        // Show success message
        toast.success(`Soyez le bienvenu ${email}`);
      } else {
        console.log(error);

        // Show error message
        toast.error("Une erreur est survenue lors de la connexion");
      }
    }
  };

  const verifyForm = async () => {
    try {
      return await LoginSchema.validate({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2 ">
            <Image
              aria-hidden="true"
              className="object-contain w-full h-full"
              src={image}
              alt="Office"
              width={400}
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                  value={email}
                  onChange={(e) => handleChange(e, "email")}
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  value={password}
                  onChange={(e) => handleChange(e, "password")}
                />
              </Label>

              {/* <Link href="/example" passHref={true}> */}
              <Button
                className="mt-4"
                block
                onClick={handleLogin}
                disabled={!verified || loading}
              >
                Log in
              </Button>
              {/* </Link> */}

              <hr className="my-8" />

              <p className="mt-4">
                <Link href="/example/forgot-password">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Mot de passe oublié ?
                  </span>
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
