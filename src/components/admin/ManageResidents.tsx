import React, { useState } from "react";
import Breadcrumb from "../common/Breadcrumb";

interface Resident {
  id: number;
  name: string;
  flat: string;
  contact: string;
  status: "Active" | "Inactive";
}

const ManageResidents: React.FC = () => {
  const [residents] = useState<Resident[]>([
    { id: 1, name: "Arjun Mehta", flat: "A-101", contact: "9876543210", status: "Active" },
    { id: 2, name: "Priya Sharma", flat: "B-204", contact: "9123456780", status: "Inactive" },
    { id: 3, name: "Rahul Singh", flat: "C-305", contact: "9988776655", status: "Active" },
  ]);

  return (
     <div className="space-y-8 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
        Admin Dashboard
      </h2>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Residents</h2>
      <Breadcrumb />

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Flat</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{resident.name}</td>
                <td className="p-3">{resident.flat}</td>
                <td className="p-3">{resident.contact}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      resident.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {resident.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ManageResidents;
