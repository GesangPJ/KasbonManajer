'use client'

// Third-party Imports
import styled from '@emotion/styled'

// Component Imports

// Config Imports
import themeConfig from '@configs/themeConfig'

const LogoText = styled.span`
  color: ${({ color }) => color ?? 'var(--mui-palette-text-primary)'};
  font-size: 1.25rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.15px;
  text-transform: uppercase;
  margin-inline-start: 10px;
`

const Logo = ({ color }) => {
  return (
    <div className='flex items-center min-bs-[24px]'>
      <i class="ri-receipt-fill"></i>
      <h1 className='text-lg pl-[10px]'>KASBON MANAGER</h1>
    </div>
  )
}

export default Logo
