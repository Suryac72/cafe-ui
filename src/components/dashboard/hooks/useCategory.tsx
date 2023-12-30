import { useQuery } from "react-query";

const buildApiEndpoint = () => {
  const url = "http://localhost:8080/category/get";
  return url;
};

const getCategories = async () => {
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

export function useCategory() {
  const { data, isLoading, error,refetch } = useQuery({
    queryKey: "categoryData",
    queryFn: async () => await  getCategories(),
  });

  return {
    categories: data,
    isLoading,
    error,
    refetch
  };
}
