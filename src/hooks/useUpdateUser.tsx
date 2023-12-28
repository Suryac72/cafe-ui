import { useMutation, useQueryClient } from "react-query";

interface FormFields {
  userName?: string;
  userEmail?: string;
  password?: string;
  userPhoneNo?: string;
  status?: string;
}

function buildApiEndpoint(userId?:string) {
  let url = `http://localhost:8080/user/update`;
  if(userId){
    url += `?userId=${userId}`;
  }
  return url;
}

const updateUser = async (formData: FormFields) => {
  const url = buildApiEndpoint(formData.userEmail);
  const token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login Failed");
  }

  return response.json();
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  return {
    updateUser: async (formData: FormFields) => {
      try {
        return await updateMutation.mutateAsync(formData);
      } catch (error) {
        throw new Error(error.message || "Login Failed");
      }
    },
    isLoading: updateMutation.isLoading,
    error: updateMutation.error,
  };
}
