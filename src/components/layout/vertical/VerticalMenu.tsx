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


        {/* products */}
        <SubMenu
          label={dictionary['navigation'].products}
          icon={<i className='tabler-layout' />}

        // suffix={<CustomChip label='5' size='small' color='error' round='true' />}
        >
          <MenuItem href={`/${locale}/apps/products/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/products/category`}>{dictionary['navigation'].category}</MenuItem>
          <MenuItem href={`/${locale}/apps/products/unit`}>{dictionary['navigation'].unit}</MenuItem>
        </SubMenu>

        {/* inventory */}
        <SubMenu
          label={dictionary['navigation'].inventory}
          icon={<i className='tabler-shopping-cart' />}
        >
          <MenuItem href={`/${locale}/apps/inventory/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/inventory/add-stock`}>{dictionary['navigation'].addStock}</MenuItem>
          <MenuItem href={`/${locale}/apps/inventory/reduce-stock`}>{dictionary['navigation'].reduceStock}</MenuItem>
        </SubMenu>


        {/* Logistic */}
        <SubMenu
          label={dictionary['navigation'].logistics}
          icon={<i className='tabler-truck' />}
        >
          <MenuItem href={`/${locale}/apps/logistics/list`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/logistics/stock-addition`}>{dictionary['navigation'].stockAdditionData}</MenuItem>
          <MenuItem href={`/${locale}/apps/logistics/stock-reduction`}>{dictionary['navigation'].stockReductionData}</MenuItem>
        </SubMenu>

      </Menu>

    </ScrollWrapper>
  )
}

export default VerticalMenu
