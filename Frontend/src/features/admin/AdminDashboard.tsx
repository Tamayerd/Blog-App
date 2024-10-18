import React, { useState } from "react";
import { useGetAdminGroupsQuery } from "./AdminApi";
import { Groups, GroupMember } from "../../types/Type";
import {
  handleGroupClick,
  useFetchGroupMembers,
} from "../../hooks/admin/dashboardAdmin";

const AdminDashboard: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const { data: adminGroups = [] } = useGetAdminGroupsQuery({});
  const { members: groupMembers } = useFetchGroupMembers(selectedGroupId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-7xl w-full mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Group name
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {adminGroups.map((group: Groups) => (
                <tr
                  key={group.group_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                  onClick={() =>
                    handleGroupClick(group.group_id, setSelectedGroupId)
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {group.group_name}
                  </th>
                  <td className="px-6 py-4">{group.created_at}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View Blogs & Members
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedGroupId && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">
              Blogs & Members of Group {selectedGroupId}
            </h2>
            <div className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-4">Members</h3>
              {groupMembers? (
                <ul className="list-disc pl-6">
                  {groupMembers.user.map((member: GroupMember) => (
                    <li key={member.user_id}>{member.username}</li>
                  ))}
                </ul>
              ) : (
                <p>No members found for this group.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
