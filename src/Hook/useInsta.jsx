import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProviders";

const useInsta = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: isInsta, isLoading: isInstaLoading } = useQuery({
    queryKey: ["isInsta", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await fetch(
        `https://sportsedu.vercel.app/user/instructor/${user?.email}`
      ); // Assuming this is the correct API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.admin;
    },
  });

  return [isInsta, isInstaLoading];
};

export default useInsta;
