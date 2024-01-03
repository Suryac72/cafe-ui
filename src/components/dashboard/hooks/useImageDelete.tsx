import { useMutation, useQueryClient } from "react-query";

const useImageDelete = () => {
  const queryClient = useQueryClient();

  const deleteImage = async (publicId:string) => {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/talk-addictive/image/destroy/${publicId}`,
        {
          method: "DELETE"
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

  const { mutate, isLoading, error, data } = useMutation(deleteImage, {
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

  const handleDelete = (publicId: string) => {
    mutate(publicId);
  };

  return {
    handleDelete,
    isLoading,
    error,
    data,
  };
};

export default useImageDelete;
