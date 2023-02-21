
const OPTIONS = {
    // 设置网络请求库，替换默认的ajax实现
    http:''
};

export const getOption = (key) => {
    return OPTIONS[key];
}

export const setOption = (key, option) => {
    OPTIONS[key] = option;
}
