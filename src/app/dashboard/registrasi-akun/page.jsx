"use client"

import { useState, useEffect, useRef } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'

const RegistrasiAkun = () => {
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null)
        setMessage('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      userType: data.get('userType')
    }

    try {
      const response = await fetch('/api/registrasi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Akun berhasil didaftarkan!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setStatus('error')
        setMessage(result.error || 'Terjadi kesalahan saat mendaftarkan akun.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Terjadi kesalahan saat mendaftarkan akun.')
    }
  }

  return (
    <div>
      <Card>
        <CardHeader title='Registrasi Akun' />
        <CardContent>
          {status && (
            <Alert severity={status} style={{ marginBottom: '1rem' }}>
              {message}
            </Alert>
          )}
          <form onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  id='nama'
                  name='name'
                  fullWidth
                  label='Nama'
                  placeholder='Nama Akun'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-user-3-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='email'
                  name='email'
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='Email Akun'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-mail-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='password'
                  name='password'
                  fullWidth
                  type='password'
                  label='Password'
                  placeholder='Password'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-key-2-fill' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='usertype'>Tipe Akun</InputLabel>
                  <Select
                    native
                    label='Tipe Akun'
                    defaultValue=''
                    inputProps={{
                      name: 'userType',
                      id: 'usertype'
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={'KARYAWAN'}>Karyawan</option>
                    <option value={'ADMIN'}>Admin</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant='contained' type='submit'>
                  Daftar
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegistrasiAkun
