import ORM,{session} from '../index'

describe('ORM initial', () => {
  //此处MOCK fetch  可以考虑与api  共用
  it('should be listAction',(done)=>{
    // console.log(Schedule)
    // registerModel(Schedule)
    // const Book = session.Book
    const Schedule = session.Schedule
    const Mailbox = session.Mailbox
    // console.log(session.get("Book"))
    // const book=Book.create({name:1})
    const schedule=Schedule.create({id:"abc",title:"abd",scheduleStartTime:"2018-11-10 12:25:23",title3:"33"})
    const mailbox= Mailbox.create({email:"abc"})
    // console.dir(mailbox.fields)
    // schedule.set('title',"你来了")
    // console.dir(schedule.fields)
    // console.log(Schedule.withId("abc").scheduleEndTime)
    // console.log(Schedule.withId("abc").getScheduleStr())
    // console.log(Schedule.withId("abc").id1)
    // console.log(Schedule.withId("abc").id2)
    // console.log(Schedule)
    done()
  })
})
