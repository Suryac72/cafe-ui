import { useMutation, useQueryClient } from "react-query";

function buildApiEndpoint(billId?:string) {
  let url = `http://localhost:8080/bill/delete`;
  if(billId){
    url += `/${billId}`;
  }
  return url;
}

const deleteBill = async (billId:string) => {
  const url = buildApiEndpoint(billId);
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong!!");
  }

  return response.json();
};

export function useBillDelete() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteBill, {
    onSuccess: () => {
      queryClient.invalidateQueries("deleteBill");
    },
  });

  return {
    deleteBill: async (billId:string) => {
      try {
        return await deleteMutation.mutateAsync(billId);
      } catch (error) {
        throw new Error(error.message || "Login Failed");
      }
    },
    isLoading: deleteMutation.isLoading,
    error: deleteMutation.error,
  };
}
