import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  Calendar,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen p-6">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-indigo-600">
          TaskFlow
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Productivity Workspace
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-3">

        <button className="flex items-center gap-3 bg-indigo-50 text-indigo-600 px-4 py-3 rounded-2xl font-medium w-full">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition w-full">
          <CheckSquare size={20} />
          Tasks
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition w-full">
          <Calendar size={20} />
          Calendar
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-100 px-4 py-3 rounded-2xl transition w-full">
          <Settings size={20} />
          Settings
        </button>

      </div>

      {/* Bottom Card */}
      <div className="mt-auto bg-indigo-600 text-white p-5 rounded-3xl">

        <h3 className="font-semibold text-lg">
          Upgrade Pro
        </h3>

        <p className="text-sm opacity-80 mt-2">
          Unlock advanced productivity tools.
        </p>

        <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-xl font-medium w-full">
          Upgrade
        </button>

      </div>
    </div>
  );
};

export default Sidebar;