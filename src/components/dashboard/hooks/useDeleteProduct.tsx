import { useMutation, useQueryClient } from "react-query";

function buildApiEndpoint(productId?: string) {
  let url = `http://localhost:8080/product/delete`;
  if (productId) {
    url += `?productId=${productId}`;
  }
  return url;
}

const deleteProduct = async (productId: string) => {
  const url = buildApiEndpoint(productId);
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

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("deleteProduct");
    },
  });

  return {
    deleteProduct: async (categoryId: string) => {
      try {
        return await deleteMutation.mutateAsync(categoryId);
      } catch (error) {
        throw new Error(error.message || "Login Failed");
      }
    },
    isLoading: deleteMutation.isLoading,
    error: deleteMutation.error,
  };
}
