import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useImageUpload from "../../hooks/useImageUpload";

const AddCategoryModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const { handleUpload, isLoading, error, data } = useImageUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setValue("productPic", file);
      handleUpload(file);
    }
  };

  const onSubmit = (formData) => {
    console.log("Product Data:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Category</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Category Name" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category Description"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={isLoading}
            variant="contained"
          >
            {isLoading ? "Adding..." : "Add Category"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCategoryModal;
