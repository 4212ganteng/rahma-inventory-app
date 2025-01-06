// ** Icon Imports
import { Icon } from '@iconify/react'

interface IconifyIconProps {
  icon: string;
  [key: string]: any;
}

const IconifyIcon = ({ icon, ...rest }: IconifyIconProps) => {
  return <Icon icon={icon} fontSize='1.375rem' {...rest} />
}

export default IconifyIcon
