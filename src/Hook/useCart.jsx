import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const useCart = () => {
  const { user, loading } = useContext(AuthContext);

  const { refetch, data: cart = [] } = useQuery({
    enabled: !loading,
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `https://sportsedu.vercel.app/carts?email=${user.email}`
      );
      return response.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
