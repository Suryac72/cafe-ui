import { useMutation, useQueryClient } from "react-query";

const useImageUpload = () => {
  const queryClient = useQueryClient();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/talk-addictive/image/upload",
        {
          method: "POST",
          headers: {
            Authorization: "Basic 159376523737984:wP509-qjTsLcjzekY1qUTu384qw",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error uploading file: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  };

  const { mutate, isLoading, error, data } = useMutation(uploadImage, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error("Error uploading file:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries("images");
    },
  });

  const handleUpload = (file: File) => {
    mutate(file);
  };

  return {
    handleUpload,
    isLoading,
    error,
    data,
  };
};

export default useImageUpload;
