'use client'

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

import { useImageVariant } from '@core/hooks/useImageVariant';

const Login = ({ mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const darkImg = '/images/pages/auth-v1-mask-dark.png';
  const lightImg = '/images/pages/auth-v1-mask-light.png';

  const router = useRouter();
  const authBackground = useImageVariant(mode, lightImg, darkImg);

  const handleClickShowPassword = () => setIsPasswordShown(show => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setTimeout(() => setError(null), 5000); // Hapus pesan error setelah 5 detik
      } else {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Terjadi kesalahan pada server.');
      setTimeout(() => setError(null), 5000); // Hapus pesan error setelah 5 detik
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12 justify-center'>
          <div className='flex flex-col gap-5'>
            <div className='items-center justify-center text-center'>
              <Typography variant='h4'><i className="ri-receipt-fill"></i> KASBON MANAGER</Typography>
              <Typography className='mbs-1'>Masuk Akun Anda</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <TextField
                autoFocus
                fullWidth
                label='Alamat Email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label='Password'
                id='password'
                type={isPasswordShown ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {error && <Alert severity='error'>{error}</Alert>}
              <Button fullWidth variant='contained' type='submit'>
                Masuk
              </Button>
              <Divider className='gap-3'></Divider>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
