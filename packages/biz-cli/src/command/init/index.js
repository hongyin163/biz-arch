import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import symbols from 'log-symbols';
import ora from 'ora';
import minimist from 'minimist';
import path from 'path'
import exec, { exeShell } from '../../util/exec';
const root = process.cwd();

function rootPath(folder) {
    if (!folder) {
        return root;
    }
    return path.resolve(root, folder)
}

function pullTemplate(name) {
    let target = '';
    if (!name) {
        target = rootPath()
    } else {
        let folder = rootPath(name);
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
        }
        target = folder;
    }
    let temp = '~/_temp';
    if (!fs.existsSync(temp)) {
        // fs.mkdirSync(temp)
        exeShell(`cd ~ && mkdir _temp`)
    } else {
        exeShell(`rm -rf ${temp}`);
    }
    exeShell(`git clone http://igit.58corp.com/chinahr-fe/biz-cli-template.git ${temp}`);
    exeShell(`rm -rf ${temp + '/.git'}`)
    exeShell(`mv ${temp}/* ${temp}/.[^.]* ${target}`)
    exeShell(`rm -rf ${temp}`)
}

function initByName(name) {
    const pkgPath = path.resolve(rootPath(name), `package.json`)
    console.log(name)
    inquirer.prompt([
        {
            name: 'author',
            message: '请输入你的名字',
        }, {
            name: 'description',
            message: '请输入项目的描述/作用',
            default: 'this is React project',
        },
    ]).then((res) => {
        const {
            author,
            description,
        } = res;
        const spinner = ora('正在下载项目...');
        spinner.start();

        try {
            pullTemplate(name)
            spinner.succeed('项目下载成功！');

            console.info(symbols.success, chalk.green('正在初始化项目...'));

            if (fs.existsSync(pkgPath)) {
                const content = fs.readFileSync(pkgPath).toString();
                // const result = handlebars.compile(content)(meta);
                const pkgObj = JSON.parse(content);
                pkgObj.name = name;
                pkgObj.author = author;
                pkgObj.description = description;
                const result = JSON.stringify(pkgObj, null, 4);
                fs.writeFileSync(pkgPath, result);
                console.info(chalk.blue(result));
                console.info(symbols.success, chalk.green('项目初始化完成!!!'));
            } else {

                console.info(symbols.error, chalk.green('未找到package.json文件'));
                console.info(symbols.info, chalk.green('npm init'));
            }
            exeShell(`yarn --cwd ${rootPath(name)}`)
        } catch (err) {
            console.error(symbols.error, chalk.red(err.message));
        }

    });
}

function initByCurrentFolder() {
    const name = root.split(/\\|\//).pop();
    const pkgPath = path.resolve(rootPath(), `package.json`)
    console.log(name)
    inquirer.prompt([
        {
            name: 'author',
            message: '请输入你的名字',
        }, {
            name: 'description',
            message: '请输入项目的描述/作用',
            default: 'this is React project',
        },
    ]).then((res) => {
        const {
            author,
            description,
        } = res;
        const spinner = ora('正在下载项目...');
        spinner.start();

        try {
            pullTemplate()
            spinner.succeed('项目下载成功！');

            console.info(symbols.success, chalk.green('正在初始化项目...'));

            if (fs.existsSync(pkgPath)) {
                const content = fs.readFileSync(pkgPath).toString();
                const pkgObj = JSON.parse(content);
                pkgObj.name = name;
                pkgObj.author = author;
                pkgObj.description = description;
                const result = JSON.stringify(pkgObj, null, 4);
                fs.writeFileSync(pkgPath, result);
                console.info(chalk.blue(result));
                console.info(symbols.success, chalk.green('项目初始化完成!!!'));
            } else {
                console.info(symbols.error, chalk.green('未找到package.json文件'));
                console.info(symbols.info, chalk.green('npm init'));
            }
            exeShell('yarn')
        } catch (err) {
            console.error(symbols.error, chalk.red(err.message));
        }

    });
}

const init = (args) => {

    const {
        name,
    } = args;

    if (fs.existsSync(name)) {
        console.info(symbols.error, chalk.red('项目已存在！'));
        return;
    }
    if (name) {
        initByName(name)
    } else {
        initByCurrentFolder()
    }

}

const main = () => {
    const args = minimist(process.argv.slice(2), {
        default: {
            name: ''
        }
    });
    console.log(args)
    init(args);
}

main();
