'use client'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css';

// Style Imports
import '@/app/globals.css';

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css';

import { SessionProvider } from 'next-auth/react';

// export const metadata = {
//   title: 'Kasbon Manager',
//   description: 'Aplikasi Pengelola Kasbon dengan NextJS 14 Full Stack',
// };

const RootLayout = ({ children }) => {
  const direction = 'ltr';

  return (
    <html id='__next' dir={direction}>
      <head>
        <title>Kasbon Manager</title>
      </head>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
