import React, { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";

interface Visitor {
  id: number;
  name: string;
  contact: string;
  purpose: string;
  status: "Checked In" | "Checked Out";
}

const ManageVisitors: React.FC = () => {
  const [visitors] = useState<Visitor[]>([
    { id: 1, name: "Emily Johnson", contact: "9876543210", purpose: "Delivery", status: "Checked In" },
    { id: 2, name: "Michael Brown", contact: "9123456780", purpose: "Guest", status: "Checked Out" },
    { id: 3, name: "Sophia Patel", contact: "9988776655", purpose: "Maintenance", status: "Checked In" },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Visitors</h2>
      <Breadcrumb />

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Purpose</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{visitor.name}</td>
                <td className="p-3">{visitor.contact}</td>
                <td className="p-3">{visitor.purpose}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      visitor.status === "Checked In"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {visitor.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVisitors;
