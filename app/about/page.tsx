import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const about = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 500, marginLeft: 10 }}>
      <Typography variant="h4" gutterBottom>
        About This App:
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        This e-commerce website offers a modern and efficient online shopping
        experience, leveraging the power of Next.js for server-side rendering,
        Redux Toolkit for state management, and Material-UI for beautiful and
        responsive user interface components.
      </Typography>
    </Box>
  );
};

export default about;
