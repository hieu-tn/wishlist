import React, {useState} from "react"
import {Box, Button, TextField} from '@mui/material'
import {useDispatch} from 'react-redux'

export default function SearchForm() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.length <= 2) return

    // dispatch()
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleOnSubmit}
      >
        <TextField id="query" label="Product" variant="outlined" value={query} onChange={handleOnChange}/>
        <Button variant="contained" type="submit">Submit</Button>
      </Box>
    </>
  )
}
