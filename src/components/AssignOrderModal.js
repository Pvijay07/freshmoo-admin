import { useState } from "react";
import { MoreHorizontal, Check } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { assignOrder } from "../api";

const AssigneeDropdown = ({ assignees, orderId  }) => {
  const [selectedAssignee, setSelectedAssignee] = useState(null);

  const handleAssign = async (assignee, orderId) => {
    try {
      const response = await assignOrder(assignee, orderId)

      if (response.data.success) {
        console.log("Successfully assigned to:", assignee.name);
        alert(`Assigned to ${assignee.name}`);
      } else {
        console.error("Assignment failed:", response.data.message);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };;

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
                {assignee.name ?? assignee.number}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </td>
  );
};

export default AssigneeDropdown;
