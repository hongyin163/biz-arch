

import path from 'path';
import exec from './util/exec';
import CliConfig from './cli-config'

export default function execCli(cmd, args) {
    const cmdConfig = CliConfig[cmd];
    const file = path.resolve(__dirname, cmdConfig.entry);
    // shelljs.exec(`"NODE_ENV=development node ${file} ${argsStr}"`);
    let argvs = process.argv.slice(3);
    exec('node', [file,...argvs], {
        env: {
            ...process.env,
            ...cmdConfig.env
        }
    });
}
