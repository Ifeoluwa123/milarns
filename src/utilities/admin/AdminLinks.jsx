import {LuLayoutDashboard} from 'react-icons/lu'
import {TbUsers} from 'react-icons/tb'
import {PiUserList} from 'react-icons/pi'
import {CiWallet} from 'react-icons/ci'
import {IoBarChartOutline} from 'react-icons/io5'
import {MdOutlineManageAccounts} from 'react-icons/md'
import { LuCalendarClock } from "react-icons/lu";

const AdminLinks = [
    {
        name:'Overview',
        path:'/admin',
        icon:<LuLayoutDashboard size={20} />
    },
    {
        name:'Staff List',
        path:'/staff-list',
        icon:<TbUsers size={20} />
    },
    {
        name:'Payroll ',
        path:'/payroll',
        icon:<PiUserList size={20} />
    },
    {
        name:'Wages Pulled',
        path:'/wages',
        icon:<CiWallet  size={20} />
    },
    {
        name:'Finance',
        path:'/finance',
        icon:<IoBarChartOutline size={20} />
    },
    // {
    //     name:'Schedule',
    //     path:'/admin/schedule',
    //     icon:< LuCalendarClock size={20}/>
    // },
    {
        name:'Account Settings',
        path:'/settings',
        icon:<MdOutlineManageAccounts size={26}/>
    },
]

export default AdminLinks