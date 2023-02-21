为了避免不必要的浪费，组件库不提供默认的图标库。

每个业务系统单独提供自己的图标库，配置方式如下：

首先，在 https://www.iconfont.cn/ 上建立自己的图标库，获取图标库 css 链接。

然后，在应用的入口处使用 Icon 的 config 方法配置 css 以及 字体的 CSS Class,默认规则：`FontClass` = `Font Family` + '_'


```js static
import {Icon} from 'biz-ux';
Icon.config({
    css:'//at.alicdn.com/t/font_975812_z1ypf0066nc.css';
    fontFamily:'biz-icon'
})
```

```js
<Icon type="phone" />
```

对应的 HTML 如下：

```html
<i class="biz-icon biz-icon-phone"></i>
```
