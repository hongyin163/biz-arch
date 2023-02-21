import fileSystem from 'fs';
import { resolve } from 'path';
import { render } from 'velocityjs';

export default function viewEngine({ viewsDir, fs = fileSystem }) {
    return function (viewPath, options, fn) {

        if (!fs.existsSync(viewPath)) {
            fn(new Error(`该视图模板不存在:${viewPath}`));
            return;
        }

        let template = fs.readFileSync(viewPath, 'utf-8');
        let macros = {
            parse: function (file) {
                //file=views/m/ddd.vm
                let vpath = resolve(viewsDir, '..', file);
                // console.log(vpath);
                if (!fs.existsSync(vpath)) {
                    fn(new Error(`该视图模板不存在:${vpath}`));
                    return;
                }
                let template = fs.readFileSync(vpath, 'utf-8');
                return this.eval(template);
            }
        };
        try {
            fn(null, render(template, options, macros));
        } catch (err) {
            fn(err);
        }
    };
};
