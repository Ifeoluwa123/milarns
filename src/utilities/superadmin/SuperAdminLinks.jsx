import {LuLayoutDashboard} from 'react-icons/lu'
import {TbUsers} from 'react-icons/tb'
import { GoOrganization } from "react-icons/go";
import { PiUserList } from 'react-icons/pi';
import { CiCreditCard1 } from "react-icons/ci";
import {IoBarChartOutline} from 'react-icons/io5'
import { RxActivityLog } from "react-icons/rx";
import { FaRegEnvelope } from "react-icons/fa";


const superadminLinks = [
    {
        name:'Overview',
        path:'/overview',
        icon:<LuLayoutDashboard size={20} />
    },
    {
        name:'Oraganisations',
        path:'/organizations',
        // path:'/staff-list',
        icon:<GoOrganization size={20} />
    },
    {
        name:'Payroll',
        path:'/superadmin-payroll',
        // path:'/staff-list',
        icon:<PiUserList size={20} />
    },
    {
        name:'Card',
        path:'/superadmin-card',
        // path:'/staff-list',
        icon:<CiCreditCard1 size={20} />
    },
    {
        name:'Finance',
        path:'/superadmin-finance',
        // path:'/staff-list',
        icon:<IoBarChartOutline size={20} />
    },
    {
        name:'Activity log',
        path:'/superadmin-activity-log',
        // path:'/staff-list',
        icon:<RxActivityLog size={20} />
    },
    {
        name:'Notification',
        path:'/superadmin-notification',
        // path:'/staff-list',
        icon:<FaRegEnvelope size={20} />
    },
]

export default superadminLinks