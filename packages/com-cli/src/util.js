export function buildParams(args) {
    return Object
        .keys(args)
        .map((key) => {
            if (key === '_' || key === '$0') {
                return '';
            }
            if(args[key] === ''){
                return '';
            }
            return `--${key} ${args[key]}`
        })
        .join(' ');
}
