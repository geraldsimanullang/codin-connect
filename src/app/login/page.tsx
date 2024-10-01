import Link from "next/link";
export default function Login() {
  return (
    <>

      <div className="flex items-center justify-center min-h-screen bg-[#f5f7fa]">
        <div className="flex w-[70%] bg-white shadow-lg rounded-lg p-8">
          {/* Bagian kiri: Form Register */}
          <div className="w-1/2 p-6">
            <div className="text-gray-900">
              <h2 className="text-center text-3xl font-semibold mb-6 text-[#535C91]">Login to your Account</h2>
              <form className="space-y-4" >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-1 text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#535C91] transition-all duration-300"
                    placeholder="you@mail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm mb-1 text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 text-sm border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#535C91] transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#535C91] text-white rounded-md hover:bg-[#3f497d] transition-colors duration-300"
                >
                  Login
                </button>
              </form>
              <p className="text-center mt-6 text-gray-600">
                Dont have an account?{" "}
                <Link href="/register" className="text-[#535C91] hover:underline hover:text-[#3f497d] transition-colors duration-300">
                {" "}Register?
                </Link>
              </p>
            </div>
          </div>
  
          {/* Bagian kanan: Gambar Gift */}
          <div className="w-1/2 flex justify-center items-center">
            <img
              src="https://cdn.dribbble.com/users/416610/screenshots/4801105/media/be031f8d02ca8cc404d44be54ee2c493.gif"
              alt="Gift Animation"
              className="w-[80%] h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
