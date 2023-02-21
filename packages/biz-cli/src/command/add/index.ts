import chalk from 'chalk';
import fs from 'fs';
import symbols from 'log-symbols';
import child_process from 'child_process';
import paths from '../../paths';

export default (args) => {
    const {
        name,
    } = args;
    const src = paths.src;
    if(fs.existsSync(`${src}/${name}`)){
        console.info(symbols.warning, chalk.red(`项目下已存在${name}模块`));
    } else {
        console.log('不存在模块');
        fs.mkdir(`${src}/${name}`,(err)=>{
            if (err) throw err;
            copyIt(`${paths.root}/templates/`,`${src}/${name}`);
        });
    }
};

function copyIt(from, to) {
    child_process.spawn('cp', ['-r', from, to]);    
}