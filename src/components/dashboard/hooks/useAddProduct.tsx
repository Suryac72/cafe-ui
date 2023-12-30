import { useMutation, useQueryClient } from "react-query";
import { Category } from "../components/category/category";
export interface AddProductFields {
    productName: string;
    productDescription: string;
    productPic: string;
    productAvailability: string;
    productPrice: string;
    productQuantity: string;
    status: string;
    categoryName?: string;
    categoryId?:string;
    category: Category;
}
function buildApiEndpoint() {
  const url = "http://localhost:8080/product/add";
  return url;
}

const addProduct = async (formData: AddProductFields) => {
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

export function useAddProduct() {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("productData");
    },
  });

  return {
    addProduct: addProductMutation.mutateAsync,
    isLoading: addProductMutation.isLoading,
    error: addProductMutation.error,
  };
}
