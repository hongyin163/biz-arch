/**
 * 根据iconfont.css生成icon列表
 */

const fs = require('fs');
const path = require('path');
const dir = __dirname;
const prefix = 'biz-icon';
function main() {
    const content = fs.readFileSync(path.resolve(dir, '../../style/fonts/iconfont.css'), 'utf-8');
    const regx = /.biz-icon-([^:]*)/g;
    const matchs = content.match(regx);

    const result = matchs.map((match) => {
        return match.replace(`.${prefix}-`, '');
    });
    fs.writeFileSync(path.resolve(dir,'./data.json'),JSON.stringify(result));
}

main();
