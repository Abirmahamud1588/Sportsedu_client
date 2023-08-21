import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProviders";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await fetch(
        `https://sportsedu.vercel.app/user/admin/${user?.email}`
      ); // Assuming this is the correct API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
