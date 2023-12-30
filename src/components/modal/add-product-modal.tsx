import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  CircularProgress,
  AlertColor,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useImageUpload from "../dashboard/hooks/useImageUpload";
import {
  AddProductFields,
  useAddProduct,
} from "../dashboard/hooks/useAddProduct";
import { useCategory } from "../dashboard/hooks/useCategory";
import { DropDown } from "../../shared/models/order";
import { Category } from "../dashboard/components/category/category";
import { availability, status } from "../../shared/constants";
import { VisuallyHiddenInput } from "@chakra-ui/react";
import Toaster from "../toaster/toaster";

const AddProductModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
    setError,
  } = useForm<AddProductFields>({
    defaultValues: {
      productAvailability: "",
      productDescription: "",
      productName: "",
      productPic: "",
      category: {},
      productPrice: "",
      productQuantity: "",
      status: "",
      categoryId: "",
    },
  });
  const [category, setCategory] = useState<DropDown[]>([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const { handleUpload, isLoading, error, data: imageData } = useImageUpload();
  const {
    addProduct,
    isLoading: productLoading,
    error: productError,
  } = useAddProduct();
  const [isAlert, setIsAlert] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [autoHideDuration, setAutoHideDuration] = useState(3000);
  const [alertMessage, setAlertMessage] = useState("");
  const { categories } = useCategory();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "cafe-management");
    data.append("cloud_name", "talk-addictive");
    console.log(data);
    try {
      if (!image) {
        setError("productPic", {
          type: "custom",
          message: "Product Pic is required",
        });
      }
      console.log(data);
      const response = handleUpload(data);
      if (error) {
        setIsAlert(true);
        setSeverity("error");
        setAutoHideDuration(4000);
        setAlertMessage(error?.message);
      }
      setUrl(imageData?.secure_url);
      setIsAlert(true);
      setSeverity("success");
      setAutoHideDuration(4000);
      setAlertMessage("Image uploaded successfully");
    } catch (e) {
      setIsAlert(true);
      setSeverity("error");
      setAutoHideDuration(4000);
      setAlertMessage(e?.message);
    }
  };

  const onSubmit = (formData: AddProductFields) => {
    try {
      const category = categories?.find(
        (category: Category) =>
          formData.categoryId === category.categoryId.toString()
      );
      setValue("productPic", url);
      const productPayload: AddProductFields = {
        ...formData,
        category: category,
        productPic: url,
      };
      const response = addProduct(productPayload);
      console.log(response);
      console.log(productError);
      if (!response) {
        setIsAlert(true);
        setSeverity("error");
        setAutoHideDuration(4000);
        setAlertMessage(productError?.message);
      }
      onClose();
      setIsAlert(true);
      setSeverity("success");
      setAutoHideDuration(4000);
      setAlertMessage("Product updated successfully");
    } catch (error) {
      setIsAlert(true);
      setSeverity("error");
      setAutoHideDuration(4000);
      setAlertMessage(productError?.message);
    }
  };

  useEffect(() => {
    const categoryResponse = categories?.map((category: Category) => {
      return { label: category.categoryTitle, value: category.categoryId };
    });
    setCategory(categoryResponse);
  }, [categories]);

  return (
    <>
      {isAlert && alertMessage && (
        <Toaster
          isAlert={isAlert}
          severity={severity}
          autoHideDuration={autoHideDuration}
          handleClose={() => setIsAlert(!isAlert)}
          alertMessage={alertMessage}
        />
      )}
      <Dialog
        open={open}
        onClose={() => {
          reset();
          onClose();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Product</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Product Name"
                  fullWidth
                  variant="outlined"
                  {...register("productName", {
                    required: "Product name is required.",
                  })}
                  error={!!errors.productName}
                  helperText={errors?.productName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Product Description"
                  fullWidth
                  variant="outlined"
                  {...register("productDescription", {
                    required: "Product description is required.",
                  })}
                  error={!!errors.productDescription}
                  helperText={errors?.productDescription?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Category"
                  variant="standard"
                  fullWidth
                  {...register("categoryId", {
                    required: "Category is required.",
                  })}
                  error={!!errors.categoryId}
                  helperText={errors?.categoryId?.message}
                  value={watch("categoryId") || ""}
                  onChange={(e) => setValue("categoryId", e.target.value)}
                >
                  {category?.map((option: DropDown) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  fullWidth
                  variant="outlined"
                  {...register("productPrice", {
                    required: "Price is required.",
                  })}
                  error={!!errors.productPrice}
                  helperText={errors?.productPrice?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Quantity"
                  fullWidth
                  variant="outlined"
                  {...register("productQuantity", {
                    required: "Quantity is required.",
                  })}
                  error={!!errors.productQuantity}
                  helperText={errors?.productQuantity?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Product Availability"
                  variant="standard"
                  fullWidth
                  {...register("productAvailability", {
                    required: "Product availability is required.",
                  })}
                  error={!!errors.productAvailability}
                  helperText={errors?.productAvailability?.message}
                  value={watch("productAvailability") || ""}
                  onChange={(e) =>
                    setValue("productAvailability", e.target.value)
                  }
                >
                  {availability?.map((option: DropDown) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Status"
                  variant="standard"
                  fullWidth
                  {...register("status", {
                    required: "Product status is required.",
                  })}
                  error={!!errors.status}
                  helperText={errors?.status?.message}
                  value={watch("status") || ""}
                  onChange={(e) => setValue("status", e.target.value)}
                >
                  {status?.map((option: DropDown) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Upload product image"
                  )}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                  />
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                reset();
                onClose();
              }}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={productLoading}
              variant="contained"
            >
              {productLoading ? "Adding..." : "Add Product"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddProductModal;
