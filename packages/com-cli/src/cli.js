import yargs from 'yargs';
import cmdHub from './hub';

export default cli;

function cli(cwd) {

	yargs.usage(
		'$0',
		'com-cli 是集创建、构建、发布项目于一体 cli 工具。',
	).command('init [project-name]', '初始化项目，包括文件目录、配置文件等', (yargs) => {
		// console.log('hello', 'welcome to yargs!')
		yargs.positional('project-name', {
			type: 'string',
			alias: '',
			default: 'my-project',
			describe: '项目名称',
		})
	}, function (argv) {
		cmdHub('init', argv);
	}).command('add [name]', '创建子模块', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			alias: 'n',
			default: '',
			describe: '子模块的名称，英文编码。'
		})
	}, function (argv) {
		cmdHub('add', argv);
	}).command('build [name]', '构建子模块', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			default: '',
			describe: '构建名称为 name 的模块，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		cmdHub('build', argv);
	}).command('dev [name]', '启动开发模式', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			default: '',
			describe: '指定构建模块的 name ，启动开发模式，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		cmdHub('dev', argv);
	}).command('commit [m]', '提交代码到分支', (yargs) => {
		yargs.positional('m', {
			type: 'string',
			default: '',
			describe: '指定构建模块的 name ，启动开发模式，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		cmdHub('commit', argv);
	}).command('tag [m]', '启动开发模式', (yargs) => {
		yargs.positional('m', {
			type: 'string',
			default: '',
			describe: '指定构建模块的 name ，启动开发模式，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		cmdHub('tag', argv);
	}).command('publish [name]', '启动开发模式', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			default: '',
			describe: '指定构建模块的 name ，启动开发模式，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		cmdHub('publish', argv);
	}).help().argv;

	return;
}
