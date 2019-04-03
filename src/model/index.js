import { ORM,Model } from 'redux-orm'
// import Schedule  from './Schedule.model'
// import Message  from './Message.model'
// import Sound  from './Sound.model'
// import Resume  from './Resume.model'
// import Book  from './Book.model'
// import Interview  from './Interview.model'
// import Log  from './Log.model'
// import CustomSystemField from './CustomSystemField.model'
// import Mailbox from './Mailbox.model'
// import Tag from './Tag.model'
// import ChannelSettings from './ChannelSettings.model'
// import Organization from './Organization.model'
// import Company from './Company.model'
// import User from './User.model'
// import Template from './Template.model'
// import SystemOption from './SystemOption.model'
// import Remind from './Remind.model'
// import Role from './Role.model'
// import Job from './Job.model'
// import Notication from './Notication.model'
//
// import Elite from './Elite.model'
// import Credit from './Credit.model'
// import Member from './Member.model'
// import Channel from './Channel.model'
//
// import Distributed from './Distributed.model'

import {reducerItemSelector,reducerListSelector} from './reducerSelector'

const orm = new ORM({
  // createDatabase:createDatabase
})

const requireComponent = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(model\.js)$/
)

// console.log("requireComponent",requireComponent.keys())

requireComponent.keys().forEach(fileName => {
   const componentConfig = requireComponent(fileName)
   // console.log(componentConfig)
   orm.register(componentConfig.default)
})

// orm.register(Schedule)
// orm.register(Interview)
// orm.register(Sound)
// orm.register(Message)
// orm.register(Resume)
// orm.register(Log)
// orm.register(Notication)
// orm.register(ChannelSettings)
// orm.register(CustomSystemField)
// orm.register(Mailbox)
// orm.register(Organization)
// orm.register(Tag)
// orm.register(Company)
// orm.register(User)
// orm.register(Template)
// orm.register(SystemOption)
// orm.register(Remind)
// orm.register(Role)
// orm.register(Elite)
// orm.register(Credit)
// orm.register(Member)
// orm.register(Channel)
// orm.register(Job)
// orm.register(Distributed)

const emptyDBState = orm.getEmptyState()
const session = orm.session(emptyDBState)


export {session,reducerItemSelector,reducerListSelector}
export default orm
