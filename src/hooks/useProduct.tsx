import { useQuery } from "react-query";

const buildApiEndpoint = () => {
  const url = "http://localhost:8080/product/get";
  return url;
};

const getProducts = async () => {
  const token = localStorage.getItem("token");
  const url = buildApiEndpoint();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

export function useProduct() {
  const { data, isLoading, error } = useQuery({
    queryKey: "productData",
    queryFn: async () => await  getProducts(),
  });

  return {
    products: data,
    isLoading,
    error,
  };
}
