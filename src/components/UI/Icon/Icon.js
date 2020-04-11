import React from 'react'

//import icons

//icons used on invision are from fontawesome, but some are available only for PRO fontawesome, such as most of sidenav icons :( We should consider font awesome PRO if they are not provided for us
import {
  FaHome,
  FaPlane,
  FaUserCircle,
  FaExpand,
  FaCompress,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGitSquare,
  FaBars,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaAt,
  FaSignature,
  FaCog,
  FaSpinner,
  FaTimes,
  FaCamera,
  FaSignOutAlt,
  FaMinus,
  FaPlus,
  FaCalendarAlt,
  FaSun,
  FaClock,
} from 'react-icons/fa'

//import styles
import styles from './icon.module.scss'

const Icon = (props) => {
  const { icon } = props

  const getIcon = (whatIcon) => {
    switch (whatIcon) {
      case 'home':
        return <FaHome />
      case 'plane':
        return (
          <FaPlane
            style={{
              transform: 'rotate(-45deg)',
            }}
          />
        )
      case 'userCircle':
        return <FaUserCircle />
      case 'expand':
        return <FaExpand />
      case 'compress':
        return <FaCompress />
      case 'mapMarkerAlt':
        return <FaMapMarkerAlt />
      case 'envelope':
        return <FaEnvelope />
      case 'phone':
        return <FaPhone />
      case 'github':
        return <FaGitSquare />
      case 'linkedin':
        return <FaLinkedin />
      case 'menu':
        return <FaBars />
      case 'lock':
        return <FaLock />
      case 'google':
        return <FaGoogle />
      case 'facebook':
        return <FaFacebook />
      case 'at':
        return <FaAt />
      case 'signature':
        return <FaSignature />
      case 'cog':
        return <FaCog />
      case 'spinner--cog':
        return <FaCog className={styles.icon_spinner} />
      case 'spinner':
        return <FaSpinner className={styles.icon_spinner} />
      case 'times':
        return <FaTimes />
      case 'camera':
        return <FaCamera />
      case 'signout':
        return <FaSignOutAlt />
      case 'plus':
        return <FaPlus />
      case 'minus':
        return <FaMinus />
      case 'calendar':
        return <FaCalendarAlt />
      case 'sun':
        return <FaSun />
      case 'clock':
        return <FaClock />
      default:
        return <i>Icon not found</i>
    }
  }

  return (
    <div className={styles.icon} {...props}>
      {getIcon(icon)}
    </div>
  )
}

export default Icon
