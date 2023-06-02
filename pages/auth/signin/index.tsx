import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Label,
  Input,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import image from "../../../assets/images/login.png";

function LoginPage() {
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
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                />
              </Label>

              <Link href="/example" passHref={true}>
                <Button className="mt-4" block>
                  Log in
                </Button>
              </Link>

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
