import React from 'react'

//import icons

//icons used on invision are from fontawesome, but some are available only for PRO fontawesome, such as most of sidenav icons :( We should consider font awesome PRO if they are not provided for us
import { 
    FaHome,
    FaPlane,
    FaUserCircle,
    FaExpand,
    FaCompress,
    
    FaBars, 
    FaSearch, 
    FaTimes, 
    FaEdit, 
    FaTrashAlt, 
    FaCheck, 
    FaSortUp, 
    FaSortDown, 
    FaSort, 
    FaUsers, 
    FaSpinner, 
    FaShoppingBasket,
 } from 'react-icons/fa'

//import styles
import styles from './icon.module.scss'

const Icon = (props) => {
    const { icon } = props

    const getIcon = (whatIcon) => {
        switch(whatIcon) {
            case 'home':
                return <FaHome />
            case 'plane':
                return <FaPlane style={{
                    transform: 'rotate(-45deg)'
                }}/>
            case 'userCircle':
                return <FaUserCircle />
            case 'expand':
                return <FaExpand />
            case 'compress':
                return <FaCompress />

            case 'bars':
                return <FaBars />
            case 'search':
                return <FaSearch />
            case 'times':
                return <FaTimes />
            case 'edit':
                return <FaEdit />
            case 'trash-alt':
                return <FaTrashAlt />
            case 'check':
                return <FaCheck />
            case 'sortUp':
                return <FaSortUp />
            case 'sortDown':
                return <FaSortDown />
            case 'sort':
                return <FaSort />
            case 'users':
                return <FaUsers />
            case 'shoppingBasket':
                return <FaShoppingBasket />
            case 'spinner':
                return <FaSpinner className={styles.icon_spinner}/>
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