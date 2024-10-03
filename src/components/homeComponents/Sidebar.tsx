import Image from "next/image";
import Link from "next/link";
import {
  LuBarChart2,
  LuChevronsUpDown,
  LuCode2,
  LuCrown,
  LuGithub,
  LuListTree,
  LuUserCircle,
} from "react-icons/lu";
import { Typewriter } from "react-simple-typewriter";

let navbarList = [
  { icon: LuBarChart2, title: "Dashboard", path: "/dash" },
  { icon: LuListTree, title: "Soal List", path: "/dash/list" },
  { icon: LuUserCircle, title: "My Profile", path: "/dash/profile" },
  { icon: LuCrown, title: "Premium", path: "/dash/premium" },
  { icon: LuCode2, title: "Docs", path: "/dash/docs", end: true },
  {
    icon: LuGithub,
    title: "Open Source",
    path: "https://github.com/geraldsimanullang/codin-connect",
    blank: true,
  },
  {
    icon: LuGithub,
    title: "Author",
    path: "https://github.com/geraldsimanullang/codin-connect",
    blank: true,
  },
];

const Sidebar = () => {
  return (
    <>
      {/* Mobile Navigation */}
      <nav className="lg:hidden z-10 w-full bg-black fixed bottom-0 px-4 py-3 flex items-center justify-around">
        {navbarList.slice(0, -2).map((x) => (
          <Link href={x.path} key={x.title}>
            <x.icon className="stroke-white text-xl" />
          </Link>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex sticky top-0 flex-col h-full max-h-screen p-5 w-72 bg-gray-50 border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <Image
            className="w-8 invert"
            src="/logo.png"
            alt="Kounter Logo"
            width={32}
            height={32}
          />
          <h1 className="text-xl font-bold text-black">Codin Connect</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-2 drop-shadow-sm mb-8">
          <div className="flex items-center gap-3">
            <>
              <Image
                className="w-8 h-8 rounded-full"
                src=""
                alt="User Avatar"
                width={32}
                height={32}
              />
              <h1 className="font-medium text-gray-700 truncate">
                <Typewriter
                  words={["Reiza Akbar"]}
                  loop={false}
                  delaySpeed={5000}
                />
              </h1>
            </>
          </div>
          <LuChevronsUpDown className="text-gray-600" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          {navbarList.map((x) => (
            <Link
              key={x.title}
              href={x.path}
              target={x.blank ? "_blank" : ""}
              className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-800 transition-colors relative"
            >
              <x.icon className="text-xl text-gray-700 group-hover:text-gray-900 transition-colors" />
              <span className="font-medium">{x.title}</span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <div className="flex flex-col gap-4">
            <Link
              key=""
              href="/"
              target="_blank"
              className="group flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-800 transition-colors relative"
            >
              <LuGithub className="text-xl text-gray-700 group-hover:text-gray-900 transition-colors" />
              <span className="font-medium">apa aja</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
