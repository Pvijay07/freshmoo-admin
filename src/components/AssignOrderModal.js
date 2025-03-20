import { useState, useEffect } from "react";
import { MoreHorizontal, Check } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { assignOrder, getOrderAssignee } from "../api"; // Assuming you have an API to fetch the current assignee

const AssigneeDropdown = ({ assignees, orderId }) => {
  const [selectedAssignee, setSelectedAssignee] = useState(null);

  // Load the selected assignee from localStorage when the component mounts
  useEffect(() => {
    const savedAssignee = localStorage.getItem(`selectedAssignee-${orderId}`);
    if (savedAssignee) {
      setSelectedAssignee(JSON.parse(savedAssignee));
    } else {
      // Optionally, fetch the current assignee from the server
      fetchCurrentAssignee(orderId);
    }
  }, [orderId]);

  // Fetch the current assignee from the server
  const fetchCurrentAssignee = async (orderId) => {
    try {
      const response = await getOrderAssignee(orderId);
      if (response.success) {
        setSelectedAssignee(response.assignee);
        localStorage.setItem(`selectedAssignee-${orderId}`, JSON.stringify(response.data.assignee));
      }
    } catch (error) {
      console.error("Error fetching assignee:", error);
    }
  };

  // Handle assigning an order to an assignee
  const handleAssign = async (assignee, orderId) => {
    try {
      const response = await assignOrder(assignee, orderId);

      if (response.success) {
        console.log("Successfully assigned to:", assignee.name);
        alert(`Assigned to ${assignee.name}`);
        setSelectedAssignee(assignee); // Update the selected assignee
        localStorage.setItem(`selectedAssignee-${orderId}`, JSON.stringify(assignee)); // Save to localStorage
      } else {
        console.error("Assignment failed:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <MoreHorizontal size={18} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white shadow-md border rounded-md p-2 w-40">
            {assignees.map((assignee) => (
              <DropdownMenu.Item
                key={assignee.id}
                onClick={() => handleAssign(assignee, orderId)}
                className="flex justify-between items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <span>{assignee.name ?? assignee.number}</span>
                {selectedAssignee?.id === assignee.id && <Check size={16} />}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </td>
  );
};

export default AssigneeDropdown;