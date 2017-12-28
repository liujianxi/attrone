import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Me from '@/components/Me'
import OrderList from '@/components/OrderList'
import WenZhen from '@/components/WenZhen'
const MakeOrder = () =>
  import ('@/components/MakeOrder')
const BranchList = () =>
  import ('@/components/BranchList')
const HospitalList = () =>
  import ('@/components/HospitalList')
const Login = () =>
  import ('@/components/Login')
const AddrList = () =>
  import ('@/components/AddrList')
const AddrEdit = () =>
  import ('@/components/AddrEdit')
const RechargeSucc = () =>
  import ('@/components/RechargeSucc')
const Order = () =>
  import ('@/components/Order')
const HandleResult = () =>
  import ('@/components/HandleResult')
const Assess = () =>
  import ('@/components/Assess')
const DayDetail = () =>
  import ('@/components/DayDetail')
const YuE = () =>
  import ('@/components/YuE')
const Recharge = () =>
  import ('@/components/Recharge')
const TiXian = () =>
  import ('@/components/TiXian')
const Profile = () =>
  import ('@/components/Profile')
const Message = () =>
  import ('@/components/Message')
const MessageDetail = () =>
  import ('@/components/MessageDetail')
const Family = () =>
  import ('@/components/Family')
const Setting = () =>
  import ('@/components/Setting')
const Reback = () =>
  import ('@/components/Reback')
const About = () =>
  import ('@/components/About')
const Agreement = () =>
  import ('@/components/Agreement')
const Introduction = () =>
  import ('@/components/Introduction')
const HeiWei = () =>
  import ('@/components/HeiWei')
const Test = () =>
  import ('@/components/Test')
const LongProtectReq = () =>
  import ('@/components/LongProtectReq')
const MyLongProtect = () =>
  import ('@/components/MyLongProtect')
const PayEnsure = () =>
  import ('@/components/PayEnsure')
const LongProtectIntro = () =>
  import ('@/components/LongProtectIntro')
const LongProtectFamily = () =>
  import ('@/components/LongProtectFamily')
const LpQualification = () =>
  import ('@/components/LpQualification')
const LpDetail = () =>
  import ('@/components/LpDetail')
const LpAllowance = () =>
  import ('@/components/LpAllowance')
const AddrSearch = () =>
  import ('@/components/AddrSearch')
const TestResult = () =>
  import ('@/components/TestResult')
const InsureAgainAssess = () =>
  import ('@/components/InsureAgainAssess')
const newsList01 = () =>
  import ('@/components/newsList01')
const newsList02 = () =>
  import ('@/components/newsList02')
const newsList03 = () =>
  import ('@/components/newsList03')
const newsList01_wechat = () =>
  import ('@/components/newsList01-wechat')
const newsList02_wechat = () =>
  import ('@/components/newsList02-wechat')
const newsList03_wechat = () =>
  import ('@/components/newsList03-wechat')
const CheckDetail = () =>
  import ('@/components/CheckDetail')
const banner01 = () =>
  import ('@/components/banner01')
const banner02 = () =>
  import ('@/components/banner02')
const bannershow = () =>
  import ('@/components/bannershow')
const careApply1 = () =>
  import ('@/components/careApply1')
const careApply2 = () =>
  import ('@/components/careApply2')
const careApply3 = () =>
  import ('@/components/careApply3')
const applyPage = () =>
  import ('@/components/applyPage')
const applysucc = () =>
  import ('@/components/applysucc')
const orderDetail = () =>
  import ('@/components/orderDetail')
const orderServiceDetail = () =>
  import ('@/components/orderServiceDetail')
const HospitalPhoto = () =>
  import ('@/components/HospitalPhoto')
const HospitalOrder = () =>
  import ('@/components/HospitalOrder')
const BankQuestion = () =>
  import ('@/components/BankQuestion')
const EditCard = () =>
  import ('@/components/EditCard')
const BankCard = () =>
  import ('@/components/BankCard')
const VerfiedCard = () =>
  import ('@/components/VerfiedCard')
const ServiceAdjust = () =>
  import ('@/components/ServiceAdjust')
const addMember = () =>
  import ('@/components/addMember')
const showImg = () =>
  import ('@/components/showImg')
const longProtectApply = () =>
  import ('@/components/longProtectApply')
const hosLocation = () =>import ('@/components/HospitalLocation')
const hisInput = () =>import ('@/components/hisInput')
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/messagedetail',
      name: 'messagedetail',
      component: MessageDetail
    },
    {
      path: '/wenzhen',
      name: 'wenzhen',
      component: WenZhen
    },
    {
      path: '/insureagainassess',
      name: 'insureagainassess',
      component: InsureAgainAssess
    },
    {
      path: '/testresult',
      name: 'testresult',
      component: TestResult
    },
    {
      path: '/addrSearch',
      name: 'addrSearch',
      component: AddrSearch
    },
    {
      path: '/',
      name: 'none',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/makeorder',
      name: 'makeorder',
      component: MakeOrder
    },
    {
      path: '/branchList',
      name: 'branchList',
      component: BranchList
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/hospitallist',
      name: 'hospitallist',
      component: HospitalList
    },
    {
      path: '/addrlist',
      name: 'addrlist',
      component: AddrList
    },
    {
      path: '/addredit',
      name: 'addredit',
      component: AddrEdit
    },
    {
      path: '/rechargesucc',
      name: 'rechargesucc',
      component: RechargeSucc
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: OrderList
    },
    {
      path: '/me',
      name: 'me',
      component: Me
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/handleresult',
      name: 'handleresult',
      component: HandleResult
    },
    {
      path: '/assess',
      name: 'assess',
      component: Assess
    },
    {
      path: '/daydetail',
      name: 'daydetail',
      component: DayDetail
    },
    {
      path: '/yue',
      name: 'yue',
      component: YuE
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge
    },
    {
      path: '/tixian',
      name: 'tixian',
      component: TiXian
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/family',
      name: 'family',
      component: Family
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/reback',
      name: 'reback',
      component: Reback
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: Agreement
    },
    {
      path: '/introduction/:service',
      name: 'introduction',
      component: Introduction
    },
    {
      path: '/heiwei',
      name: 'heiwei',
      component: HeiWei
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/longprotectreq',
      name: 'longprotectreq',
      component: LongProtectReq
    },
    {
      path: '/mylongprotect',
      name: 'mylongprotect',
      component: MyLongProtect
    },
    {
      path: '/payensure',
      name: 'payensure',
      component: PayEnsure
    },
    {
      path: '/longprotectintro',
      name: 'longprotectintro',
      component: LongProtectIntro
    },
    {
      path: '/longprotectfamily',
      name: 'longprotectfamily',
      component: LongProtectFamily
    },
    {
      path: '/lpqualification',
      name: 'lpqualification',
      component: LpQualification
    },
    {
      path: '/lpdetail',
      name: 'lpdetail',
      component: LpDetail
    },
    {
      path: '/lpallowance',
      name: 'lpallowance',
      component: LpAllowance
    },
    {
      path: '/newsList01',
      name: 'newsList01',
      component: newsList01
    },
    {
      path: '/newsList02',
      name: 'newsList02',
      component: newsList02
    },
    {
      path: '/newsList03',
      name: 'newsList03',
      component: newsList03
    },
    {
      path: '/newsList01-wechat',
      name: 'newsList01-wechat',
      component: newsList01_wechat
    },
    {
      path: '/newsList02-wechat',
      name: 'newsList02-wechat',
      component: newsList02_wechat
    },
    {
      path: '/newsList03-wechat',
      name: 'newsList03-wechat',
      component: newsList03_wechat
    },
    {
      path: '/checkdetail',
      name: 'checkdetail',
      component: CheckDetail
    },
    {
      path: '/banner01',
      name: 'banner01',
      component: banner01
    },
    {
      path: '/banner02',
      name: 'banner02',
      component: banner02
    },
    {
      path: '/bannershow',
      name: 'bannershow',
      component: bannershow
    },
    {
      path: '/careapply1',
      name: 'careapply1',
      component: careApply1
    },
    {
      path: '/careapply2',
      name: 'careapply2',
      component: careApply2
    },
    {
      path: '/careapply3',
      name: 'careapply3',
      component: careApply3
    },
    {
      path: '/applypage',
      name: 'applypage',
      component: applyPage
    },
    {
      path: '/applysucc',
      name: 'applysucc',
      component: applysucc
    },
    {
      path: '/orderdetail',
      name: '/orderdetail',
      component: orderDetail
    },
    {
      path: '/orderservicedetail',
      name: '/orderservicedetail',
      component: orderServiceDetail
    },
    {
      path: '/hospitalphoto',
      name: '/hospitalphoto',
      component: HospitalPhoto
    },
    {
      path: '/hospitalorder',
      name: '/hospitalorder',
      component: HospitalOrder
    },
    {
      path: '/bankquestion',
      name: '/bankquestion',
      component: BankQuestion
    },
    {
      path: '/bankcard',
      name: '/bankcard',
      component: BankCard
    },
    {
      path: '/editcard',
      name: '/editcard',
      component: EditCard
    },
    {
      path: '/verfiedcard',
      name: '/verfiedcard',
      component: VerfiedCard
    },
    {
      path: '/serviceadjust',
      name: '/serviceadjust',
      component: ServiceAdjust
    },
    {
      path: '/addmember',
      name: '/addmember',
      component: addMember
    },
    {
      path: '/showimg',
      name: '/showimg',
      component: showImg
    },
    {
      path: '/longprotectapply',
      name: '/longprotectapply',
      component: longProtectApply
    },
    {
      path:'/hoslocation',
      name: '/hoslocation',
      component: hosLocation
    },
    {
      path:'/hisinput',
      name: '/hisinput',
      component: hisInput
    },
  ]
})
