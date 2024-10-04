import { Button } from "@nextui-org/react";

import Link from "next/link";

import { LuLaugh } from "react-icons/lu";

const Login = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="bg-gray-200/50 p-10 rounded-xl">
          <div className="relative flex flex-col gap-5 bg-white rounded-lg p-8 max-w-sm border border-black">
            <div className="absolute -top-3 -right-3">
              <LuLaugh className="text-5xl fill-blue-700 stroke-gray-200 rotate-45" />
            </div>
            <div className="flex flex-col items-center z-10">
              <h1 className="text-4xl font-bold mb-2">Hello</h1>
              <p className="text-gray-600 mb-6">Sign in to your account</p>

              <div className="w-80 mb-4">
                <div className="relative mb-4">
                  <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    className="pl-10 pr-4 py-2 w-full rounded-full shadow-md focus:outline-none"
                  />
                </div>

                <div className="relative mb-2">
                  <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    className="pl-10 pr-4 py-2 w-full rounded-full shadow-md focus:outline-none"
                  />
                </div>

                <div className="text-center m-6">
                  <div className="text-gray-400 text-sm">
                    Don't have an account?
                    <Link href={"/register"} className="text-blue-600">
                      Register
                    </Link>
                  </div>
                </div>
              </div>

              <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-2 px-6 rounded-full shadow-md">
                Sign in
              </button>
            </div>

            <p className="text-xs pr-1">
              *Dengan ini anda menyetujui ketentuan dan persyaratan yang
              berlaku.
            </p>
          </div>
        </div>
        <div className="flex flex-col text-center gap-2 items-center">
          <h1 className="mt-5 font-medium text-sm">
            Copyright &copy; 2024 Built by{" "}
            <Link
              href={"https://github.com/geraldsimanullang/codin-connect"}
              className="font-extrabold"
            >
              CodinConnectDev
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Login;
