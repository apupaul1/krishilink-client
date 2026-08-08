import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "../redux/hooks";
import { useGetUserRoleQuery } from "../redux/features/user/userApi";

const useRole = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, refetch } = useGetUserRoleQuery(
    user?.email ?? skipToken,
  );

  return {
    role: data?.data,
    isLoading,
    refetch,
  };
};

export default useRole;