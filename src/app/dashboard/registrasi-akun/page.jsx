// Component Imports
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

import Form from '@components/Form'

const RegistrasiAkun = () =>{
  return(
    <div>
      <Card>
      <CardHeader title='Registrasi Akun' />
      <CardContent>
        <Form action='/api/registrasi'>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                id='nama'
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
                    name: 'usertype',
                    id: 'usertype'
                  }}
                >
                  <option aria-label='None' value='' />
                  <option value={'KARYAWAN'}>Karyawan</option>
                  <option value={'Admin'}>Admin</option>
                </Select>
          </FormControl>

            </Grid>
            <Grid item xs={12} justifyContent="center" alignItems="center">
              <Button variant='contained' type='submit'>
                Daftar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </CardContent>
    </Card>
    </div>
  )
}

export default RegistrasiAkun
