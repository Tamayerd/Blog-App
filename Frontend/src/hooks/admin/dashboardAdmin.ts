import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetAllGroupMembersQuery } from "../../features/admin/AdminApi";

export const handleGroupClick = (
  groupId: number,
  setSelectedGroupId: Dispatch<SetStateAction<number | null>>
) => {
  setSelectedGroupId(groupId);
};

export const useFetchGroupMembers = (selectedGroupId: number | null) => {
  const { data: groupMembers = [], refetch } = useGetAllGroupMembersQuery(
    { groupId: selectedGroupId },
    { skip: !selectedGroupId }
  );

  useEffect(() => {
    if (selectedGroupId) {
      refetch();
    }
  }, [selectedGroupId, refetch]);

  return groupMembers;
};
