import { useQuery } from "react-query";

const buildApiEndpoint = () => {
  const url = "http://localhost:8080/dashboard/details";
  return url;
};

const getDetails = async () => {
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

export function useDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: "dashboardData",
    queryFn: async () => await  getDetails(),
  });

  return {
    details: data,
    isLoading,
    error,
  };
}
