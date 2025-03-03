// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import type { getDictionary } from '@/utils/getDictionary'
import HorizontalNav, { Menu, MenuItem, SubMenu } from '@menu/horizontal-menu'

import VerticalNavContent from './VerticalNavContent'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'

type RenderExpandIconProps = {
  level?: number
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  // Hooks
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const params = useParams()
  const { lang: locale } = params

  // Vars
  const { transitionDuration } = verticalNavOptions

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor: 'var(--mui-palette-background-paper)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
          menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
        }}
      >


        <MenuItem href={`/${locale}/dashboards/home`} icon={<i className='tabler-smart-home' />}>
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


        {/* Supplier */}
        <SubMenu
          label={dictionary['navigation'].supplier}
          icon={<i className='tabler-truck' />}
        >
          <MenuItem href={`/${locale}/apps/supplier/`}>{dictionary['navigation'].list}</MenuItem>
        </SubMenu>



      </Menu>
    </HorizontalNav>
  )
}

export default HorizontalMenu
