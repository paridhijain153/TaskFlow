
import { Bell, Search } from "lucide-react";

const Navbar = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="bg-white border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>

          <h1 className="text-3xl font-bold text-indigo-600">
            TaskFlow
          </h1>

          <p className="text-gray-500 text-sm">
            Productivity Dashboard
          </p>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-xl">

            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search tasks..."
              className="bg-transparent outline-none ml-2"
            />

          </div>

          {/* Notification */}
          <button className="bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition">

            <Bell size={20} />

          </button>

          {/* Username */}
          <div className="px-4 py-2">

            <p className="text-sm text-gray-500">
              Hello 👋
            </p>

            <h3 className="text-sm text-gray-500">
              {
  user?.name
    ? user.name.charAt(0).toUpperCase() +
      user.name.slice(1)
    : "User"
}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Navbar;
