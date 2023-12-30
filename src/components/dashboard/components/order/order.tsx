import {
  AlertColor,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../../../header/header";
import PrintIcon from "@mui/icons-material/Print";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { paymentMethods } from "../../../../shared/constants";
import { useProduct } from "../../hooks/useProduct";
import { useCategory } from "../../hooks/useCategory";
import { ProductProps } from "../product/product";
import { Category } from "../category/category";
import { DropDown } from "../../../../shared/models/order";
import { useForm } from "react-hook-form";
import { Order } from "../../../../shared/models/order";
const Order = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [autoHideDuration, setAutoHideDuration] = useState(3000);
  const [alertMessage, setAlertMessage] = useState("");
  const [product, setProduct] = useState<DropDown[]>([]);
  const [category, setCategory] = useState<DropDown[]>([]);
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<Order>({
    defaultValues: {
      customerName: "",
      customerEmail: "",
      contactNumber: "",
      paymentMethod: "",
      productDetails: "",
      isGenerated: "",
    },
  });

  const {
    products,
    isLoading: isProductLoading,
    error: productError,
  } = useProduct();
  const {
    categories,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useCategory();

  const StyledBackdrop = styled(Backdrop)(() => ({
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0, 0, 30, 0.4)",
  }));

  const useStyles = {
    circularProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#F3F3F3",
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const onSubmit = async (formData: Order) => {
    console.log(formData);
  };
  useEffect(() => {
    const productResponse = products?.map((product: ProductProps) => {
      return { label: product.productName, value: product.productName };
    });
    const categoryResponse = categories?.map((category: Category) => {
      return { label: category.categoryTitle, value: category.categoryTitle };
    });
    setProduct(productResponse);
    setCategory(categoryResponse);
  }, [products, categories]);

  return (
    <>
      <Header
        title="Manage Order"
        buttonText="Submit & get bill"
        icon={<PrintIcon />}
        buttonType="submit"
      />
      <Card
        sx={{ marginBottom: 4 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Customer Details
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  required
                  id="standard-required"
                  label="Name"
                  variant="standard"
                  fullWidth
                  {...register("customerName", {
                    required: "Customer name is required.",
                  })}
                  error={!!errors.customerName}
                  helperText={errors?.customerName?.message}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="standard-required"
                  label="Email"
                  variant="standard"
                  fullWidth
                  {...register("customerEmail", {
                    required: "Customer email is required.",
                  })}
                  error={!!errors.customerEmail}
                  helperText={errors?.customerEmail?.message}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  required
                  id="standard-required"
                  label="Contact Number"
                  variant="standard"
                  fullWidth
                  {...register("contactNumber", {
                    required: "Contact number is required.",
                  })}
                  error={!!errors.contactNumber}
                  helperText={errors?.contactNumber?.message}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Payment Method"
                  variant="standard"
                  fullWidth
                  {...register("paymentMethod", {
                    required: "Payment method is required.",
                  })}
                  error={!!errors.paymentMethod}
                  helperText={errors?.paymentMethod?.message}
                  value={watch("paymentMethod") || ""}
                  onChange={(e) => setValue("paymentMethod", e.target.value)}
                >
                  {paymentMethods.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Select Products
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <TextField
                id="standard-select-currency"
                select
                label="Category"
                variant="standard"
                fullWidth
                {...register("categoryName", {
                    required: "Category is required.",
                  })}
                  error={!!errors.categoryName}
                  helperText={errors?.categoryName?.message}
                  value={watch("categoryName") || ""}
                  onChange={(e) => setValue("categoryName", e.target.value)}
              >
                {category?.map((option: DropDown) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="standard-select-currency"
                select
                label="Product"
                variant="standard"
                fullWidth
                {...register("productName", {
                    required: "Product is required.",
                  })}
                  error={!!errors.productName}
                  helperText={errors?.productName?.message}
                  value={watch("productName") || ""}
                  onChange={(e) => setValue("productName", e.target.value)}
              >
                {product?.map((option: DropDown) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField
                required
                id="standard-required"
                label="Price"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                required
                id="standard-required"
                label="Quantity"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                required
                id="standard-required"
                label="Total"
                variant="standard"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" sx={{ marginTop: 4 }}>
            <Button variant="contained" size="large">
              Add
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<CurrencyRupeeIcon />}
            >
              Total Amount
            </Button>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginBottom: 4 }}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell sx={{ fontSize: 18 }}>Name</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 18 }}>
                    Category
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 18 }}>
                    Product
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 18 }}>Price</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 18 }}>
                    Quantity
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 18 }}>Total</StyledTableCell>
                  <StyledTableCell sx={{ fontSize: 18 }}>
                    Actions
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              {/* <TableBody>
                {(rowsPerPage > 0
                  ? // eslint-disable-next-line no-unsafe-optional-chaining
                    products?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : products
                )?.map((product: ProductProps) => (
                  <TableRow key={product?.productId}>
                    <TableCell>{product?.productId}</TableCell>
                    <TableCell>{product?.productName}</TableCell>
                    <TableCell>{product?.productDescription}</TableCell>
                    <TableCell>{product?.productPrice}</TableCell>
                    <TableCell>{product?.category?.categoryTitle}</TableCell>
                    <TableCell>
                      {product?.productAvailability?.toString() === "true"
                        ? "Yes"
                        : "No"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          product?.status.toLowerCase() === "true"
                            ? "Active"
                            : "Inactive"
                        }
                        size="medium"
                        color={
                          product?.status.toLowerCase() === "true"
                            ? "success"
                            : "error"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        style={{ marginRight: 8 }}
                        onClick={() =>
                          handleDelete(product?.productId?.toString())
                        }
                      />
                      <EditIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            component="div"
            count={products?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows per page:"
          /> */}
        </Paper>
      </Card>
    </>
  );
};

export default Order;
