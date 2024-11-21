"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import bgImage from "../../public/assets/Vectors.png";
import Button from "@/shared/Button";
import { useRouter } from "next/navigation";
import CustomTypography from "@/shared/Typography";

const EmptyMovieView = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: "#0a3644",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Box component={"div"}>
          <CustomTypography
            variant="h4"
            sx={{
              color: "white.main",
              fontWeight: 600,
              fontSize: "48px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Your movie list is empty
          </CustomTypography>
          <Button
            sx={{
              backgroundColor: "#2BD17E",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "10px",
              textTransform: "none",
              display: "block",
              margin: "0 auto",
              width: { xs: "100%", sm: "fit-content" },
            }}
            onClick={() => router.push("/movie/create")}
          >
            Add a new movie
          </Button>
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
      </Container>
    </Box>
  );
};

export default EmptyMovieView;
