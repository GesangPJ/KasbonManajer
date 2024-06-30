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
      <CardHeader title='Basic with Icons' />
      <CardContent>
        <Form>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                placeholder='John Doe'
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
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
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
                fullWidth
                label='Phone No.'
                placeholder='123-456-7890'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-phone-fill' />
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
            <Grid item xs={12}>
              <Button variant='contained' type='submit'>
                Submit
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
