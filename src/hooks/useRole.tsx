import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "../redux/hooks";
import { useGetSingleUserQuery } from "../redux/features/user/userApi";

const useRole = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { data, isLoading, refetch } = useGetSingleUserQuery(
    user?.email ?? skipToken,
  );

  return {
    role: data?.data.role,
    isLoading,
    refetch,
  };
};

export default useRole;