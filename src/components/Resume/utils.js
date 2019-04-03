import {routerActions, push, replace} from 'react-router-redux'

/*
坑1；
在职位管理中查看简历时  点操作时要原样返回路径 不作处理
*/

function filterPathSpec(path,splitNum){
  let arr = path.split("/")
  arr.length = arr.length - splitNum
  return arr.join("/")
}


function filterPath(path){
  if(path.indexOf("/detail")>=0 ){
    return path
  }else if(path.indexOf("/resume/list")>=0){
    return "/resume/list"
  }else if(path.indexOf("/interview/calendar")>=0){
    return "/interview/calendar"
  }else if(path.indexOf("/interview/list")>=0){
    return "/interview/list"
  }else if(path.indexOf("/job")>=0){
      return "/job/list"
  }else if(path.indexOf("/elite")>=0){
      return "/elite"
  }else if(path.indexOf("/dashboard")>=0){
      return "/dashboard"
  }
}

export function createResumeRoute(){
  return {
      connectEliteAction: function (router,id){
          let pathname = router.getCurrentLocation().pathname
          let path = {
              pathname: `${pathname}/connect`,
              state: {
                selectedKeys:id
              }
          }
          return dispatch => dispatch(routerActions.push(path))
      },
     connectAction:function(router,resumeId,name,item) {
       let pathname = filterPath(router.getCurrentLocation().pathname)
         let path = {
             pathname : `${pathname}/${resumeId}/related`,
             state:{name:name,item:item,pathname:router.getCurrentLocation().pathname}
         }
        return dispatch => dispatch(routerActions.push(path))
    },
    feedbackAction:function(router,planId,resumeId,interviewer) {
       let pathname = filterPath(router.getCurrentLocation().pathname)
       let path = {
           pathname : resumeId ? `${pathname}/${resumeId}/feedback` : `${pathname}/feedback` ,
           state:{
             planId:planId?planId:"",
             interviewer:interviewer,
             pathname:router.getCurrentLocation().pathname
           }
       }
        return dispatch => dispatch(routerActions.push(path))
    },
    feedAction:function(router,item) {
        let pathname = router.getCurrentLocation().pathname
         let path = {
             pathname : `${pathname}/feed`,
             state:{
               item:item,
               pathname:router.getCurrentLocation().pathname
             }
         }
        return dispatch => dispatch(routerActions.push(path))
    },
     joinAction:function(router,ids,libType) {
       let pathname = filterPath(router.getCurrentLocation().pathname)
       let path = {
           pathname : `${pathname}/joinelite`,
           state:{
             ids:ids,
             libType:libType,
             pathname:router.getCurrentLocation().pathname
           }
       }
        return dispatch => dispatch(routerActions.push(path))
    },
      creditAction:function(router,ids) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/addcredit`,
            state:{
              ids:ids,
              pathname:router.getCurrentLocation().pathname
            }
        }
         return dispatch => dispatch(routerActions.push(path))
     },
     refuseAction:function(router,resumeId,name,item) {
       let pathname = filterPath(router.getCurrentLocation().pathname)
         let path  = {
           pathname : `${pathname}/${resumeId}/reject` ,
           state:{name:name,item:item,pathname:router.getCurrentLocation().pathname}
         }
        return dispatch => dispatch(routerActions.push(path))
    },
    offerAction:function(router,resumeId,name,item) {

        let pathname = filterPath(router.getCurrentLocation().pathname)
        let path = {
            pathname : `${pathname}/${resumeId}/offer`,
            state:{name:name,item:item,pathname:router.getCurrentLocation().pathname}
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    syncAction:function(router,selected) {
          let pathname = router.getCurrentLocation().pathname
          let path = {
              pathname : `${pathname}/sync`,
              state:{selected:selected},
              pathname:pathname
          }
          return dispatch => dispatch(routerActions.push(path))
    },
    changeDeptAction:function(router,selected,selectedKeys) {
          let pathname = router.getCurrentLocation().pathname
          let path = {
              pathname : `${pathname}/changeDept`,
              state:{
                selected:selected,
                keys:selectedKeys,
                pathname:pathname
              }
          }
          return dispatch => dispatch(routerActions.push(path))
    },
    changeChargerAction:function(router,selected,selectedKeys) {
          let pathname = router.getCurrentLocation().pathname
          let path = {
              pathname : `${pathname}/changeCharger`,
              state:{
                selected:selected,
                keys:selectedKeys,
                pathname:pathname
              }
          }
          return dispatch => dispatch(routerActions.push(path))
    },
    changeFeederAction:function(router,selected,selectedKeys) {
          let pathname = router.getCurrentLocation().pathname
          let path = {
              pathname : `${pathname}/changeFeeder`,
              state:{
                selected:selected,
                keys:selectedKeys,
                pathname:pathname
              }
          }
          return dispatch => dispatch(routerActions.push(path))
    },
    changeChargerPostAction:function(router,hrAcc,interviewerIds,jobId) {
          let pathname = router.getCurrentLocation().pathname
          let path = {
              pathname : `${pathname}/changeCharger`,
              state:{
                hrAcc:hrAcc,
                interviewerIds:interviewerIds,
                keys:jobId,
                pathname:pathname
              }
          }
          return dispatch => dispatch(routerActions.push(path))
    },
    changeFeederPostAction:function(router,interviewerIds,jobId) {
          let pathname = router.getCurrentLocation().pathname
          let path = {
              pathname : `${pathname}/changeFeeder`,
              state:{
                interviewerIds:interviewerIds,
                keys:jobId,
                pathname:pathname
              }
          }
          return dispatch => dispatch(routerActions.push(path))
    },
    delayAction:function(router,id,type,time,resumeId) {
          let pathname = filterPath(router.getCurrentLocation().pathname)
          //console.log(time)
          let path = {
               pathname : resumeId ? `${pathname}/${resumeId}/delay` : `${pathname}/delay` ,
               state:{
                 id:id,
                 type:type,
                 time:time,
                 pathname:router.getCurrentLocation().pathname
               }
          }
          return dispatch => dispatch(routerActions.push(path))
      },
      /*待分配简历的分配和加入人才库 与简历模块有区别*/
    distributionAction:function(router,ids,type) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/distr/${type}`,

            state:{ids:ids, pathname:pathname}
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    talentAction:function(router,ids,type) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/talent/${type}`,
            state:{ids:ids,  pathname:pathname}
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    send2InterviewerAction:function(router,ids) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/forward`,
            state:{
              ids:ids,
              pathname:pathname
            }
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    recommend2OtherAction:function(router,ids) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/recommend`,
            state:{
              ids:ids,
              pathname:pathname
            }
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    addEliteAction:function(router,ids,rows,libType) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/joinelite`,
            state:{
              ids:ids,
              libType:libType,
              pathname:pathname
            }
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    followAction:function(router,ids) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/follow`,
            state:{
              ids:ids,
              pathname:pathname
            }
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    deleteAction:function(router,ids,rows) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/delete`,
            state:{
              ids:ids,
              rows:rows,
              pathname:pathname
            }
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    addLabelAction:function(router,labels) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/label`,
            state:{
              labels:labels,
              pathname:pathname
            }
        }
        return dispatch => dispatch(routerActions.push(path))
    },
    entryAction:function(router,id) {
        let pathname = router.getCurrentLocation().pathname
        let path = {
            pathname : `${pathname}/entry`,
            state:{
              id:id
            }
        }
        return dispatch => dispatch(routerActions.push(path))
    },
  }
}
