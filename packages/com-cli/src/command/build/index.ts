// tslint-disable
import path from 'path';
import shelljs from 'shelljs';
import { buildParams } from '../../util';

/**
 * 构建命令实现
 */
export default (args) => {
    const argsStr = buildParams(args);
    const file = path.resolve(__dirname, '../../build/gulpfile.js');
    // console.log(argsStr)
    shelljs.exec(`gulp -f ${file}`);
}
