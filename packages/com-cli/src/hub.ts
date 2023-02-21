
import cmdMap from './command/map';

export default async function hub(cmd, args) {
    // console.log(args);
    if(!cmd){
        return;
    }
    cmdMap[cmd](args);
}
