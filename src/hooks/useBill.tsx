import { useQuery } from "react-query";

const buildApiEndpoint = () => {
  const url = "http://localhost:8080/bill/getBills";
  return url;
};

const getBills = async () => {
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

export function useBill() {
  const { data, isLoading, error } = useQuery({
    queryKey: "billData",
    queryFn: async () => await  getBills(),
  });

  return {
    bills: data,
    isLoading,
    error,
  };
}
