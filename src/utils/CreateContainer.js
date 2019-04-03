/**
 *  自动创建APP运行容器
 *
 *
 **/

let createDefaultStyle = function() {
  var styles = document.createElement("style")
  styles.innerHTML = `
    *, *:before, *:after {
       -moz-box-sizing: border-box;
       -webkit-box-sizing: border-box;
       box-sizing: border-box;
   }

   html, body {
       font-size: 16px;
       line-height: 1.5rem;
       height: 100%;
       min-height: 100%;
   }
   .spinner{
     display:none;
   }
  `
  return styles
}

export default function createContainer() {
  if(document.querySelector(".app")){
    return document.querySelector(".app")
  }else{
    var container = document.createElement("div")
    container.className = "app";
    document.body.appendChild(createDefaultStyle())
    document.body.appendChild(container)
    return container
  }
}
