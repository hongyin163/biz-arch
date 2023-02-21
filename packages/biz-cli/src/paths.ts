import * as path from 'path'
const libRoot = __dirname;
const root = process.cwd();
const CONFIG_FOLDER = 'config';
export default {
    // 命令启动目录
    root,
    // 构建相关配置
    build: path.resolve(root, `./${CONFIG_FOLDER}/build`),
    // 应用入口位置
    entry: path.resolve(root, `./${CONFIG_FOLDER}/entry`),
    // 应用源代码位置
    src: path.resolve(root, './src'),
    /**
     * 配置文件所在目录
     */
    config: path.resolve(root, `./${CONFIG_FOLDER}`),
    /**
     * 构建输出目录
     */
    dist: path.resolve(root, './dist'),
    /**
     * 相对根目录解析地址
     * @param p 文件路径
     */
    resolve(p) {
        return path.resolve(root, p);
    },
    lib(p) {
        return path.resolve(libRoot, p);
    }
}
