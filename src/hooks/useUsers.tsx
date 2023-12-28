import { useQuery } from "react-query";

const buildApiEndpoint = () => {
  const url = "http://localhost:8080/user/get";
  return url;
};

const getUsers = async () => {
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

export function useUsers() {
  const { data, isLoading, error } = useQuery({
    queryKey: "userData",
    queryFn: async () => await  getUsers(),
  });

  return {
    users: data,
    isLoading,
    error,
  };
}
