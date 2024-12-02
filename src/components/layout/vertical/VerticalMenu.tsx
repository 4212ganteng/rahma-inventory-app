// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

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
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >

        <MenuItem href={`/${locale}/home`} icon={<i className='tabler-smart-home' />}>
          {dictionary['navigation'].home}
        </MenuItem>
        <MenuItem href={`/${locale}/about`} icon={<i className='tabler-info-circle' />}>
          {dictionary['navigation'].about}
        </MenuItem>



        <SubMenu
          label={dictionary['navigation'].leads}
          icon={<i className='tabler-smart-home' />}

        // suffix={<CustomChip label='5' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/apps/leads`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/leads/add`}>{dictionary['navigation'].add}</MenuItem>
        </SubMenu>


        {/* activity */}
        <SubMenu
          label={dictionary['navigation'].activity}
          icon={<i className='tabler-smart-home' />}
        >
          <MenuItem href={`/${locale}/apps/activity`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/activity/add`}>{dictionary['navigation'].add}</MenuItem>
        </SubMenu>

        {/* products */}
        <SubMenu
          label={dictionary['navigation'].products}
          icon={<i className='tabler-smart-home' />}

        // suffix={<CustomChip label='5' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/apps/products/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/products/add`}>{dictionary['navigation'].category}</MenuItem>
          <MenuItem href={`/${locale}/apps/products/add`}>{dictionary['navigation'].unit}</MenuItem>
        </SubMenu>

      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
