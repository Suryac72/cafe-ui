import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useImageUpload from "../../hooks/useImageUpload";
import { VisuallyHiddenInput } from "@chakra-ui/react";

const AddProductModal: React.FC<{ open: boolean; onClose: () => void }> = ({
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
      <DialogTitle>Add Product</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Product Name" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="category1">Category 1</MenuItem>
                  <MenuItem value="category2">Category 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Price" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Quantity" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Availability</InputLabel>
                <Select label="Category">
                  <MenuItem value="category1">Yes</MenuItem>
                  <MenuItem value="category2">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select label="Category">
                  <MenuItem value="category1">True</MenuItem>
                  <MenuItem value="category2">False</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload product image
                <VisuallyHiddenInput type="file" />
              </Button>
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
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddProductModal;
