import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  styled,
  tableCellClasses,
  CircularProgress,
  Backdrop,
  AlertColor,
} from "@mui/material";
import { useCategory } from "../../../hooks/useCategory";
import Toaster from "../../toaster/toaster";
import Header from "../../header/header";
import AddCategoryModal from "../../modal/add-category-modal";

export interface Category {
  categoryId: number;
  categoryTitle: string;
  categoryDescription: string;
}

const Category: React.FC = () => {
  const { categories, isLoading, error } = useCategory();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAlert, setIsAlert] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [autoHideDuration, setAutoHideDuration] = useState(3000);
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#3559E0",
      color: theme.palette.common.white,
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (error) {
      setIsAlert(true);
      setSeverity("error");
      setAutoHideDuration(4000);
      setAlertMessage(error.message);
    }
  }, []);

  const handleClose = () => {
    setIsAlert(false);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isLoading && (
        <StyledBackdrop open={isLoading}>
          <CircularProgress sx={useStyles.circularProgress} color="inherit" />
        </StyledBackdrop>
      )}
      {isAlert && alertMessage && (
        <Toaster
          isAlert={isAlert}
          severity={severity}
          autoHideDuration={autoHideDuration}
          handleClose={handleClose}
          alertMessage={alertMessage}
        />
      )}
      <Header
        title="Manage Categories"
        buttonText="Add Category"
        onButtonClick={() => setOpen(!open)}
      />
      <AddCategoryModal open={open} onClose={handleModalClose} />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell sx={{ fontSize: 18 }}>
                  Category ID
                </StyledTableCell>
                <StyledTableCell sx={{ fontSize: 18 }}>Title</StyledTableCell>
                <StyledTableCell sx={{ fontSize: 18 }}>
                  Description
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? // eslint-disable-next-line no-unsafe-optional-chaining
                  categories?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : categories
              )?.map((category: Category) => (
                <TableRow key={category?.categoryId}>
                  <TableCell>{category?.categoryId}</TableCell>
                  <TableCell>{category?.categoryTitle}</TableCell>
                  <TableCell>{category?.categoryDescription}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={categories?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
        />
      </Paper>
    </>
  );
};

export default Category;
