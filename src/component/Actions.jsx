"use client";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MuiButton from "@/shared/Button";

const Actions = ({ id, movie, setCurrentPage, currentPage }) => {
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    router.push(`/movie/edit/${id}`);
  };

  const handleDelete = async () => {
    setLoader(true);
    try {
      const data = await api("delete", `/api/movies?id=${id}`, null, true);
      toast.success(data?.message || "Movie deleted successfully");
      setLoader(false);
      const updatedData = movie.filter((item) => item._id !== id);
      if (updatedData.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      router.refresh();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      setLoader(false);
    }
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row">
        <IconButton>
          <EditIcon color="white" onClick={handleEdit} />
        </IconButton>
        <IconButton>
          <DeleteForeverIcon color="white" onClick={handleClickOpen} />
        </IconButton>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#093545",
            color: "#ffffff",
            padding: 1,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ pt: 1 }}>
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this movie?
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleClose} color="primary">
            Cancel
          </MuiButton>
          <MuiButton
            onClick={handleDelete}
            variant="contained"
            color="error"
            autoFocus
            sx={{
              "&.Mui-disabled": {
                color: "white !important",
                backgroundColor: "#eb5757",
              },
            }}
            disabled={loader}
          >
            {loader ? "Loading..." : "Delete"}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
