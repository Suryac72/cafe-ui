import { useMutation, useQueryClient } from "react-query";

interface FormFields {
  userName?: string;
  userEmail?: string;
  password?: string;
  userPhoneNo?: string;
}

function buildApiEndpoint() {
  const url = "http://localhost:8080/user/login";
  return url;
}

const loginUser = async (formData: FormFields) => {
  const url = buildApiEndpoint();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login Failed");
  }

  return response.json();
};

export function useLogin() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      const token = data.token;
      localStorage.setItem("token", token);
      queryClient.invalidateQueries("user");
    },
  });

  return {
    loginUser: async (formData: FormFields) => {
      try {
        return await loginMutation.mutateAsync(formData);
      } catch (error) {
        throw new Error(error.message || "Login Failed");
      }
    },
    isLoading: loginMutation.isLoading,
    error: loginMutation.error,
  };
}
