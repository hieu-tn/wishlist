import React, { useState } from "react"
import { Box, Button, Stack, TextField } from "@mui/material"

import { useAppDispatch } from "app/hooks"
import * as crawlerActions from "store/crawler/crawlerSlice"


export default function SearchForm() {
  const dispatch = useAppDispatch()
  const [keyword, setKeyword] = useState("")

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (keyword.length <= 2) return

    dispatch(crawlerActions.setKeyword(keyword))
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={ handleOnSubmit }
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={ 2 }
      >
        <TextField
          id="query"
          label="Product"
          variant="outlined"
          fullWidth
          placeholder="Enter product name..."
          value={ keyword }
          onChange={ handleOnChange }/>
        <Button variant="contained" type="submit" size="large">Submit</Button>
      </Stack>
    </Box>
  )
}
