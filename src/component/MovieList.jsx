"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  // Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Pagination,
  Grid2,
} from "@mui/material";
import bgImage from "../../public/assets/Vectors.png";
import Plus from "../../public/assets/round-plus.svg";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import Actions from "./Actions";
import Typography from "@/shared/Typography";

export default function MovieList({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const currentMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0a3644",
        position: "relative",
        minHeight: "100vh",
        padding: { sm: "20px", md: "50px", lg: "120px" },
        paddingBottom: { xs: "100px !important", md: "200px !important" },
        color: "#FFFFFF",
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "#0a3644", boxShadow: "none", padding: "0" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "unset !important",
          }}
        >
          <Typography
            variant="h6"
            color="white.main"
            sx={{
              fontWeight: "bold",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            My Movies
            <Link href="/movie/create" sx={{ cursor: "pointer" }}>
              <Image src={Plus.src} height={20} width={20} alt="plus icon" />
            </Link>
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      <Grid2 container spacing={4} sx={{ padding: "20px" }}>
        {currentMovies.map((movie, index) => (
          <Grid2 key={index} size={{ xs: 12, xxs: 6, md: 4, xl: 3 }}>
            <Card
              sx={{
                backgroundColor: "#092C39",
                borderRadius: "12px",
                height: "100%",
              }}
            >
              <Box sx={{ padding: "8px" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={movie.poster}
                  alt={movie.title}
                  sx={{
                    borderRadius: "12px",
                    height: { lg: "400px", xs: "250px" },
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { lg: "20px", md: "18px" },
                      fontWeight: "500",
                      color: "white",
                      lineHeight: "32px",
                      color: "white.main",
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="white.main"
                    lineHeight="24px"
                  >
                    {movie.publishingYear}
                  </Typography>
                </Box>
                <Actions
                  id={movie?._id}
                  movie={currentMovies}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "20px 0" }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#ffffff",
            },
          }}
        />
      </Box>

      <Box
        component="img"
        src={bgImage.src}
        alt="Wave Background"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
