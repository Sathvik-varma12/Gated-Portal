import React, { useState } from "react";
import { UserPlus, UserMinus } from "lucide-react";
import Breadcrumb from "../common/Breadcrumb";

interface Visitor {
  id: number;
  name: string;
  contact: string;
  purpose: string;
  status: "Approved" | "Pending" | "Rejected";
}

const ManageVisitors: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([
    { id: 1, name: "Emily Johnson", contact: "9876543210", purpose: "Friend Visit", status: "Approved" },
    { id: 2, name: "Michael Lee", contact: "9123456780", purpose: "Delivery", status: "Pending" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newVisitor, setNewVisitor] = useState<Visitor>({
    id: Date.now(),
    name: "",
    contact: "",
    purpose: "",
    status: "Pending",
  });

  // State to track selected visitors
  const [selectedVisitors, setSelectedVisitors] = useState<number[]>([]);

  const removeVisitor = (id: number) => {
    setVisitors(visitors.filter((v) => v.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVisitor({ ...newVisitor, [name]: value });
  };

  const handleSave = () => {
    setVisitors([...visitors, { ...newVisitor, id: Date.now() }]);
    setShowModal(false);
    setNewVisitor({ id: Date.now(), name: "", contact: "", purpose: "", status: "Pending" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  // Function to handle checkbox selection
  const handleSelect = (id: number) => {
    setSelectedVisitors((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((visitorId) => visitorId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // Function to handle select all checkbox
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allVisitorIds = visitors.map((v) => v.id);
      setSelectedVisitors(allVisitorIds);
    } else {
      setSelectedVisitors([]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Visitors</h2>
      <Breadcrumb />

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowModal(true)}
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
              {/* Select All Checkbox */}
              <th className="py-3 px-4 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedVisitors.length === visitors.length && visitors.length > 0}
                />
              </th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Contact</th>
              <th className="py-3 px-4 text-left">Purpose</th>
              <th className="py-3 px-4 text-left">Status</th> 
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor.id} className="border-b">
                {/* Individual Checkbox */}
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedVisitors.includes(visitor.id)}
                    onChange={() => handleSelect(visitor.id)}
                  />
                </td>
                <td className="py-2 px-4">{visitor.name}</td>
                <td className="py-2 px-4">{visitor.contact}</td>
                <td className="py-2 px-4">{visitor.purpose}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full whitespace-nowrap text-sm font-semibold ${getStatusColor(
                      visitor.status
                    )}`}
                  >
                    {visitor.status}
                  </span>
                </td>
              </tr>
            ))}

            {visitors.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No visitors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Visitor Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h3 className="text-xl font-bold mb-4">Add Visitor</h3>

            <div className="mb-3">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={newVisitor.name}
                onChange={handleChange}
                className="w-full mt-1 border rounded p-2"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Contact</label>
              <input
                type="text"
                name="contact"
                value={newVisitor.contact}
                onChange={handleChange}
                className="w-full mt-1 border rounded p-2"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={newVisitor.purpose}
                onChange={handleChange}
                className="w-full mt-1 border rounded p-2"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={newVisitor.status}
                onChange={handleChange}
                className="w-full mt-1 border rounded p-2"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVisitors;