// STAFFLIST PAGE USER REOCRDS
import userImag1 from '../../assets/images/admin/users/user1.png'
import userImag2 from '../../assets/images/admin/users/user2.png'
import userImag3 from '../../assets/images/admin/users/user3.png'
import userImag4 from '../../assets/images/admin/users/user4.png'
import userImag5 from '../../assets/images/admin/users/user5.png'




let RecentWageData =[
    {
        image:userImag1,
        name:'Kelvin Adewole',
        amount:'₦300,000.00',
        date:'Sep 04, 2023, 04:09 pm',
        status:'Successful'

    },
    {
        image:userImag2,
        name:'Jenny Wilson',
        amount:'₦85,000.00',
        date:'Sep 11, 2023, 10:21 am',
        status:'Successful'

    },
    {
        image:userImag3,
        name:'Wade Warren',
        amount:'₦7000.00',
        date:'Sep 07, 2023, 03:09 pm',
        status:'Failed'

    },
    {
        image:userImag3,
        name:'Cameron Williamson',
        amount:'₦300,000.00',
        date:'Sep 07, 2023, 02:30 am',
        status:'Successful'

    }
]





















// STAFFLIST PAGE SINGLE USER TRANSACTION DETAILS 
const userTransactionData  = [
    {   id:1,
        transactionType:'Deduction',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {   id:2,
        transactionType:'Bonus',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Cash',
        paymentStatus:true
    },
    {
        id:3,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'Access Bank',
        accNumber:'038840303',
        paymentMethod:'Wallet transfer',
        paymentStatus:false
    },
    {
        id:4,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'GTCo bank',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:5,
        transactionType:'Salary Paid',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Added to wallet',
        paymentStatus:false
    },
    {
        id:6,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'Opay',
        accNumber:'9033428492',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:7,
        transactionType:'Deduction',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:8,
        transactionType:'Bonus',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:9,
        transactionType:'Salary Paid',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'First Bank',
        accNumber:'283000430',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:10,
        transactionType:'Deduction',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:11,
        transactionType:'Bonus',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:12,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'Access Bank',
        accNumber:'038840303',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:13,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'GTCo bank',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:14,
        transactionType:'Salary Paid',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:15,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'Opay',
        accNumber:'9033428492',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:15,
        transactionType:'Deduction',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:16,
        transactionType:'Bonus',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:17,
        transactionType:'Salary Paid',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'First Bank',
        accNumber:'283000430',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:18,
        transactionType:'Deduction',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:19,
        transactionType:'Bonus',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:20,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'Access Bank',
        accNumber:'038840303',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:21,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'GTCo bank',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:22,
        transactionType:'Salary Paid',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:23,
        transactionType:'Wages Pulled',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'Opay',
        accNumber:'9033428492',
        paymentMethod:'Payroll deduction',
        paymentStatus:true
    },
    {
        id:24,
        transactionType:'Deduction',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:false
    },
    {
        id:25,
        transactionType:'Bonus',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'-',
        accNumber:'-',
        paymentMethod:'Payroll deduction',
        paymentStatus:false
    },
    {
        id:26,
        transactionType:'Salary Paid',
        date:'09 Sep, 2023, 02:17 am',
        amt:'290,600',
        bankName:'First Bank',
        accNumber:'283000430',
        paymentMethod:'Payroll deduction',
        paymentStatus:false
    },
]





 

// PAYROLL DATA
const payrolldata = [
    {
        id:1,
        name:'Adewale John',
        date:'09 Sept 2023, 10:00 am',
        wages:'300,000',
        bonus:'10,000',
        deduction:'',
        wagePulled:'20,000',
        netSalary:'200,000',
        status:true,
       
    },
    {
        id:2,
        name:'Mery Bello',
        date:'09 Sept 2023, 10:00 am',
        wages:'180,000',
        bonus:'10,000',
        deduction:500,
        wagePulled:'20,000',
        netSalary:'100,000',
        status:false
    },
    {
        id:3,
        name:'Mery Bello',
        date:'09 Sept 2023, 10:00 am',
        wages:'180,000',
        bonus:'10,000',
        deduction:500,
        wagePulled:'',
        netSalary:'',
        status:true
    },
    {
        id:4,
        name:'Mery Bello',
        date:'09 Sept 2023, 10:00 am',
        wages:'180,000',
        bonus:'10,000',
        deduction:500,
        wagePulled:'20,000',
        netSalary:'',
        status:true
    },
    {
        id:5,
        name:'Mery Bello',
        date:'09 Sept 2023, 10:00 am',
        wages:'180,000',
        bonus:'10,000',
        deduction:500,
        wagePulled:'20,000',
        netSalary:'200,000',
        status:false
    },
    {
        id:6,
        name:'Mery Bello',
        date:'09 Sept 2023, 10:00 am',
        wages:'180,000',
        bonus:'10,000',
        deduction:500,
        wagePulled:'20,000',
        netSalary:'200,000',
        status:true
    },
    {
        id:7,
        name:'Mery Bello',
        date:'09 Sept 2023, 10:00 am',
        wages:'180,000',
        bonus:'10,000',
        deduction:500,
        wagePulled:'20,000',
        netSalary:'',
        status:true
    }
]


// WAGEPULL HISTORY

const wagepullhistorydata = [
    {
        id:1,
        image:'',
        name:'',
        wagepull:'',
        fee:'',
        amount_received:'',
        

    }

]

















export { RecentWageData, userTransactionData, payrolldata, wagepullhistorydata}