import { useMutation, useQueryClient } from "react-query";
export interface AddCategoryFields {
  categoryTitle: string;
  categoryDescription: string;
}
function buildApiEndpoint() {
  const url = "http://localhost:8080/category/add";
  return url;
}

const addCategory = async (formData: AddCategoryFields) => {
  const url = buildApiEndpoint();
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};

export function useAddCategory() {
  const queryClient = useQueryClient();

  const addCategoryMutation = useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categoryData");
    },
  });

  return {
    addCategory: addCategoryMutation.mutateAsync,
    isLoading: addCategoryMutation.isLoading,
    error: addCategoryMutation.error,
  };
}
