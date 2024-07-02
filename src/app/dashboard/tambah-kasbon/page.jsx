"use client"

import { useState, useEffect, useRef } from 'react'

import { useSession } from 'next-auth/react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const TambahKasbon = () =>{
  const { data: session } = useSession()
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
      userId : session.user.id,
      jumlah: data.get('jumlah'),
      keterangan: data.get('keterangan'),
      metode: data.get('metode')
    }

    try {
      const response = await fetch('/api/tambah-kasbon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Permintaan Kasbon berhasil dikirim!')
        formRef.current.reset() // Kosongkan form setelah berhasil didaftarkan
      } else {
        setStatus('error')
        setMessage(result.error || 'Terjadi kesalahan saat mengirim data permintaan kasbon.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Terjadi kesalahan saat mengirim data.')
    }
  }

  return(
    <div>
      <Card>
        <CardHeader title='Form Permintaan Kasbon' />
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
                  id='jumlah'
                  name='jumlah'
                  type='number'
                  fullWidth
                  label='Jumlah'
                  placeholder='Jumlah Kasbon'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i class="ri-money-dollar-circle-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='keterangan'
                  name='keterangan'
                  fullWidth
                  label='Keterangan'
                  placeholder='Keterangan'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i class="ri-message-2-line"></i>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='usertype'>Metode Pembayaran</InputLabel>
                  <Select
                    native
                    label='Metode'
                    defaultValue=''
                    inputProps={{
                      name: 'metode',
                      id: 'metode'
                    }}
                  >
                    {/* <option aria-label='None' value='' /> */}
                    <option value={'CASH'}>Cash</option>
                    <option value={'TRANSFER'}>Transfer</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Button variant='contained' type='submit'>
                  Kirim
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

    </div>
  )
}

export default TambahKasbon
