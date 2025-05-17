// import React from "react";

// export default function Dashboard() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {["Users", "Orders", "Revenue", "Visits"].map((title) => (
//         <div key={title} className="p-4 bg-white rounded shadow">
//           <h2 className="font-semibold text-lg">{title}</h2>
//           <p className="text-gray-600 mt-1">Some analytics data</p>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";
import {
  User,
  DollarSign,
  Users,
  ShoppingCart,
  CheckCircle,
  XCircle,
  ClipboardList,
} from "lucide-react"; // Ensure lucide-react is installed

export default function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      icon: <User className="text-blue-500 w-6 h-6" />,
      value: "1,245",
      description: "Active registered users",
    },
    {
      title: "Revenue",
      icon: <DollarSign className="text-green-500 w-6 h-6" />,
      value: "$45,120",
      description: "Monthly revenue",
    },
    {
      title: "Visitors",
      icon: <Users className="text-purple-500 w-6 h-6" />,
      value: "8,230",
      description: "Site visits this month",
    },
    {
      title: "Table Bookings",
      icon: <ClipboardList className="text-yellow-500 w-6 h-6" />,
      value: "321",
      description: "People booked tables",
    },
  ];

  const orders = [
    {
      title: "Total Orders",
      icon: <ShoppingCart className="text-blue-500 w-6 h-6" />,
      value: "1,122",
      description: "All orders received",
    },
    {
      title: "Confirmed Orders",
      icon: <CheckCircle className="text-green-500 w-6 h-6" />,
      value: "970",
      description: "Orders successfully confirmed",
    },
    {
      title: "Cancelled Orders",
      icon: <XCircle className="text-red-500 w-6 h-6" />,
      value: "152",
      description: "Orders that were cancelled",
    },
  ];

  return (
    <div className="space-y-10 p-6 bg-gray-50 min-h-screen">
      {/* Section 1: Top Analytics */}
      <div>
        <h1 className="text-xl font-bold mb-4 text-gray-800">Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ title, icon, value, description }) => (
            <div
              key={title}
              className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{title}</p>
                  <h2 className="text-xl font-semibold text-gray-800">{value}</h2>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Orders Analysis */}
      <div>
        <h1 className="text-xl font-bold mb-4 text-gray-800">Order Analysis</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(({ title, icon, value, description }) => (
            <div
              key={title}
              className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{title}</p>
                  <h2 className="text-xl font-semibold text-gray-800">{value}</h2>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
