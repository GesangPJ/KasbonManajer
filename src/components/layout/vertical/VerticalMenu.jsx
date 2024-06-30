// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >

        <MenuItem
            href='/dashboard'  //link ke dashboard
            icon={<i className="ri-dashboard-line"></i>}
          >
            Dashboard
          </MenuItem>
        <MenuSection Label='Menu Kasbon'>
        <SubMenu
          label='Kasbon'
          icon={<i className="ri-bill-line"></i>}
        >
          <MenuItem
            href='/dashboard/kasbon'

          >
            Tabel Kasbon
          </MenuItem>
          <MenuItem
            href='/dashboard/request'

          >
            Request Kasbon
          </MenuItem>
          <MenuItem
            href='/dashboard/bayar'

          >
            Konfirmasi Bayar
          </MenuItem>

        </SubMenu>
        </MenuSection>
        <SubMenu
          label='Laporan'
          icon={<i className='ri-file-chart-fill' />}
        >
          <MenuItem
            href='/dashboard/laporan'
            target='_blank'
          >
            Laporan Kasbon
          </MenuItem>
          <MenuItem
            href='/dashboard/cetak'
            target='_blank'
          >
            Export / Print
          </MenuItem>
        </SubMenu>
        <SubMenu
          label='Akun'
          icon={<i className='ri-account-circle-fill' />}
        >
          <MenuItem
            href='/dashbard/daftar-akun'
          >
            Tabel Akun
          </MenuItem>
          <MenuItem
            href='/dashboard/registrasi-akun'
          >
            Registrasi Akun
          </MenuItem>
        </SubMenu>
        <MenuSection label='Forms & Tables'>
          <MenuItem href='/form-layouts' icon={<i className='ri-layout-4-line' />}>
            Form Layouts
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_PRO_URL}/forms/form-validation`}
            icon={<i className='ri-checkbox-multiple-line' />}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Form Validation
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_PRO_URL}/forms/form-wizard`}
            icon={<i className='ri-git-commit-line' />}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Form Wizard
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_PRO_URL}/react-table`}
            icon={<i className='ri-table-alt-line' />}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            React Table
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`}
            icon={<i className='ri-radio-button-line' />}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
          >
            Form Elements
          </MenuItem>
          <MenuItem
            href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`}
            icon={<i className='ri-table-2' />}
            suffix={<i className='ri-external-link-line text-xl' />}
            target='_blank'
          >
            MUI Tables
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
