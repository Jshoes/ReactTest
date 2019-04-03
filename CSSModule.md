# CSS Module
## Usage
```css
/*style.css*/
.title{
	color:red;
}
```
```javascript
import style from './style.css'
/*component.js*/

<div className={style.title}>
	<p>title</p>
</div>

```
## global
```css
/*style.css*/
:global(.title){
	color:red;
}
```
```javascript
/*component.js*/
import './style.css'
import componentB from './componentB'

/*正常className写法*/
<div className="title">
/*这时类名不会转为hash值*/
	<p>title</p>
</div>
/*componentB的title也会生效*/
<componentB/>

----------------------------
/*componentB.js*/

<div className="title">
	<p>title</p>
</div>

```
