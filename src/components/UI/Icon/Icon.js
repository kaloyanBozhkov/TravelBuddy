import React from 'react'

//import icons

//icons used on invision are from fontawesome, but some are available only for PRO fontawesome, such as most of sidenav icons :( We should consider font awesome PRO if they are not provided for us
import { 
    FaBars, 
    FaSearch, 
    FaTimes, 
    FaEdit, 
    FaTrashAlt, 
    FaCheck, 
    FaAtom, //to be removed, is a placeholder for image on table!
    FaSortUp, 
    FaSortDown, 
    FaSort, 
    FaUsers, 
    FaMoneyBillWave, 
    FaRetweet, 
    FaQuestionCircle, 
    FaSpinner, 
    FaShoppingBasket,
    FaUserCircle
 } from 'react-icons/fa'

//import styles
import styles from './icon.module.scss'

export default function Icon(props) {
    let { icon } = props;

    const getIcon = (whatIcon) => {
        switch(whatIcon) {
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
            case 'atom':
                return <FaAtom />
            case 'sortUp':
                return <FaSortUp />
            case 'sortDown':
                return <FaSortDown />
            case 'sort':
                return <FaSort />
            case 'users':
                return <FaUsers />
            case 'moneyBillWave':
                return <FaMoneyBillWave />
            case 'retweet':
                return <FaRetweet />
            case 'questionCircle':
                return <FaQuestionCircle />
            case 'shoppingBasket':
                return <FaShoppingBasket />
            case 'spinner':
                return <FaSpinner className={styles.icon_spinner}/>
            case 'userCircle':
                return <FaUserCircle />
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