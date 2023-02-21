常规页签使用示例：
```js
import { Tabs } from 'biz-ux';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

<Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
    </TabPane>
</Tabs>
```

页签过多会在左侧右侧显示导航按钮，页签也支持左右拖拽。
```js
import { Tabs } from 'biz-ux';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

function list(n) {
    const ls = [];
    for (let i = 0; i < n; i++) {
        ls.push(i);
    }
    return ls;
}

<Tabs defaultActiveKey="1" onChange={callback} style={{
    width: 500
}}>
    {
        list(20).map((i)=>{
            return (
                <TabPane tab={`Tab ${i}`} key={i+''}>
                    Content of Tab Pane {i}
                </TabPane>
            )
        })
    }
</Tabs>
```
