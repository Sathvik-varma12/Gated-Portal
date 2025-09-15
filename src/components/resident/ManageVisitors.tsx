import React, { useState } from "react";
import { UserPlus, UserMinus } from "lucide-react";
import Breadcrumb from "../common/Breadcrumb";

const ManageVisitors: React.FC = () => {
  const [visitors, setVisitors] = useState([
    { id: 1, name: "Emily Johnson", contact: "9876543210", purpose: "Friend Visit", status: "Approved" },
    { id: 2, name: "Michael Lee", contact: "9123456780", purpose: "Delivery", status: "Pending" },
  ]);

  const addVisitor = () => {
    const newVisitor = {
      id: visitors.length + 1,
      name: `New Visitor ${visitors.length + 1}`,
      contact: "9000000000",
      purpose: "Guest",
      status: "Pending",
    };
    setVisitors([...visitors, newVisitor]);
  };

  const removeVisitor = (id: number) => {
    setVisitors(visitors.filter((v) => v.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Visitors</h2>
        <Breadcrumb /> {/* 👈 Added here */}
      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={addVisitor}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          <UserPlus className="w-5 h-5" /> Add Visitor
        </button>

        <button
          onClick={() => visitors.length > 0 && removeVisitor(visitors[visitors.length - 1].id)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
        >
          <UserMinus className="w-5 h-5" /> Remove Visitor
        </button>
      </div>

      {/* Visitor Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Purpose</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="border-b">
                <td className="py-2 px-4">{visitor.name}</td>
                <td className="py-2 px-4">{visitor.contact}</td>
                <td className="py-2 px-4">{visitor.purpose}</td>
                <td className="py-2 px-4">{visitor.status}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => removeVisitor(visitor.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {visitors.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No visitors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVisitors;
