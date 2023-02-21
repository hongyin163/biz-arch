级联选择列表

```js
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            data: [
                {
                   key:'1',
                   value:'水果',
                   children:[
                       {
                           key:'11',
                           value:'苹果',
                           children:[
                                {
                                    key:'111',
                                    value:'红富士'
                                },
                                    {
                                    key:'112',
                                    value:'国光'
                                }
                            ]
                       },
                        {
                           key:'12',
                           value:'香蕉'
                       }, {
                           key:'13',
                           value:'梨'
                       }
                   ]
                },
                {
                    key:'2',
                    value:'蔬菜',
                    children:[
                        {
                            key:'21',
                            value:'黄瓜'
                        },
                        {
                           key:'22',
                           value:'西红柿'
                        }, 
                        {
                            key:'23',
                            value:'大白菜'
                        }
                   ]
                },
                {
                    key:'3',
                    value:'肉类',
                    children:[
                        {
                            key:'31',
                            value:'牛肉'
                        },
                        {
                           key:'32',
                           value:'猪肉'
                        }, {
                           key:'33',
                           value:'鸡肉'
                        }
                   ]
                }
            ],
            value: [],
        };
        me.onListChange = me.onListChange.bind(me);
    }
    onListChange(value) {
        this.setState({
            value,
        })
    }
    render() {
        const me = this;
        const {
            data,
            value,
        } = me.state;
        return (
            <div>
                <div>
                    <ListCascader
                        value={value}
                        listItemModes={['default', 'default']}
                        options={data}
                        valueField="key"
                        textField="value"
                        childrenField="children"
                        onChange={me.onListChange}
                    />
                </div>
                <div>
                    value：{JSON.stringify(value,null,4)}
                </div>
            </div>
        )
    }
}

<Demo />
```

```js
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            data: [
                {
                   key:'1',
                   value:'水果',
                   children:[
                       {
                           key:'11',
                           value:'苹果',
                           children:[
                                {
                                    key:'111',
                                    value:'红富士'
                                },
                                    {
                                    key:'112',
                                    value:'国光'
                                }
                            ]
                       },
                        {
                           key:'12',
                           value:'香蕉'
                       }, {
                           key:'13',
                           value:'梨'
                       }
                   ]
                },
                {
                    key:'2',
                    value:'蔬菜',
                    children:[
                        {
                            key:'21',
                            value:'黄瓜'
                        },
                        {
                           key:'22',
                           value:'西红柿'
                        }, 
                        {
                            key:'23',
                            value:'大白菜'
                        }
                   ]
                },
                {
                    key:'3',
                    value:'肉类',
                    children:[
                        {
                            key:'31',
                            value:'牛肉'
                        },
                        {
                           key:'32',
                           value:'猪肉'
                        }, {
                           key:'33',
                           value:'鸡肉'
                        }
                   ]
                }
            ],
            value: [],
        };
        me.onListChange = me.onListChange.bind(me);
    }
    onListChange(value) {
        this.setState({
            value,
        })
    }
    render() {
        const me = this;
        const {
            data,
            value,
        } = me.state;
        return (
            <>
                <ListCascader
                    value={value}
                    listItemModes={['default', 'single','single']}
                    options={data}
                    valueField="key"
                    textField="value"
                    childrenField="children"
                    onChange={me.onListChange}
                />
                <p>
                    value：{JSON.stringify(value)}
                </p>
            </>
        )
    }
}

<Demo />
```


```js
import React, { Component } from 'react';

class Demo extends Component {
    constructor(props, context) {
        super(props, context);
        const me = this;
        me.state = {
            data: [
                {
                    key: '1',
                    value: '水果',
                    children: [
                        {
                            key: '11',
                            value: '苹果',
                            children: [
                                {
                                    key: '111',
                                    value: '红富士'
                                },
                                {
                                    key: '112',
                                    value: '国光'
                                }
                            ]
                        },
                        {
                            key: '12',
                            value: '香蕉'
                        }, {
                            key: '13',
                            value: '梨'
                        }
                    ]
                },
                {
                    key: '2',
                    value: '蔬菜',
                    children: [
                        {
                            key: '21',
                            value: '黄瓜'
                        },
                        {
                            key: '22',
                            value: '西红柿'
                        },
                        {
                            key: '23',
                            value: '大白菜'
                        }
                    ]
                },
                {
                    key: '3',
                    value: '肉类',
                    children: [
                        {
                            key: '31',
                            value: '牛肉'
                        },
                        {
                            key: '32',
                            value: '猪肉'
                        }, {
                            key: '33',
                            value: '鸡肉'
                        }
                    ]
                }
            ],
            checkedItems: [],
        };
        me.onListItemCheck = me.onListItemCheck.bind(me);
    }
    addValue(item) {
        const me = this;
        me.setState((state) => {
            const {
                checkedItems
            } = state;
            const list = item.map((p) => {
                return {
                    key: p.key,
                    value: p.value,
                }
            })
            state.checkedItems = checkedItems.concat(list);
            return state;
        })
    }
    removeValue(values = []) {
        const me = this;
        me.setState((state) => {
            const {
                checkedItems
            } = state;
            const keys = values.map(p => p.key);
            state.checkedItems = checkedItems.filter(item => keys.indexOf(item.key) < 0 )
            return state;
        })
    }
    onListItemCheck(value, checked) {
        console.log(value, checked)
        if (checked) {
            this.addValue(value);
        } else {
            this.removeValue(value);
        }
    }
    render() {
        const me = this;
        const {
            data,
            checkedItems,
        } = me.state;
        return (
            <>
                <ListCascader
                    value={checkedItems.map((p => p.key))}
                    listItemModes={['default', 'multiple', 'multiple']}
                    options={data}
                    valueField="key"
                    textField="value"
                    childrenField="children"
                    mode='multiple'
                    onItemCheck={me.onListItemCheck}
                />
                <p>
                    value：{JSON.stringify(checkedItems)}
                </p>
            </>
        )
    }
}

<Demo />

```
