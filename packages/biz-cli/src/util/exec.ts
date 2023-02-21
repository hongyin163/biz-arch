import { spawnSync, execSync } from 'child_process';

export default (cmd, args = [], options = {}) => {
    const defs: any = {
        stdio: 'inherit',
        ...options,
    }
    const ls = spawnSync(cmd, args, defs);
    // ls.stdout.on('data', (data: Buffer) => {
    //     // // console.log(data.toString());
    //     // let content = data.toString();
    //     // // // console.log(/\n$/.test(content));
    //     // let result = content.replace(/\n$/, '').replace(/\n\n/g,'\n');
    //     // // console.log(/\n$/.test(result));
    //     // // if (result)
    //     // //     console.log(result);

    //     // fs.appendFileSync('./log.txt',`${result}\n`);
    //     // fs.appendFileSync('./log2.txt',`${content}`);
    //     // console.log(result);
    // });

    // ls.stderr.on('data', (data) => {
    //     console.error(`${data}`);
    // });

    // ls.on('close', (code) => {
    //     console.log(`child process exited with code ${code}`);
    // });
    return ls;
}

export const exeShell = (cmd, options = {}) => {
    const defs: any = {
        stdio: 'inherit',
        ...options,
    }
    return execSync(cmd, defs);
}
