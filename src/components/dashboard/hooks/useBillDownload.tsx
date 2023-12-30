import { useMutation, useQueryClient } from "react-query";
import { Bill } from "../components/bill/bill";

function buildApiEndpoint() {
  const url = `http://localhost:8080/bill`;
  return url;
}

const downloadBill = async (bill: Bill) => {
  let url = buildApiEndpoint();
  if (bill.billUUID && bill.isGenerated) {
    url += `/getPdf`;
  } else {
    url += `/generateReport`;
  }
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bill),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong!!");
  }

  return response.json();
};

export function useBillDownload() {
  const queryClient = useQueryClient();

  const downloadMutation = useMutation(downloadBill, {
    onSuccess: () => {
      queryClient.invalidateQueries("downloadBill");
    },
  });

  return {
    downloadBill: async (bill: Bill) => {
      try {
        return await downloadMutation.mutateAsync(bill);
      } catch (error) {
        throw new Error(error.message || "Login Failed");
      }
    },
    isLoading: downloadMutation.isLoading,
    error: downloadMutation.error,
  };
}
