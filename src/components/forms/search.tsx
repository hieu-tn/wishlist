import React from "react";
import {Box, TextField} from "@mui/material";

export default function SearchForm() {
  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
    </>
  )
}
