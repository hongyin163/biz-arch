import yargs from 'yargs';
import bizCli from './cli-exec';

export default cli;

function cli(cwd) {

	yargs.usage(
		'$0',
		'biz-cli 是集创建、构建、发布项目于一体 cli 工具。',
	).command('init --name [name]', '初始化项目，包括文件目录、配置文件等', (yargs) => {
		// console.log('hello', 'welcome to yargs!')
		yargs.positional('name', {
			type: 'string',
			alias: '',
			default: 'my-project',
			describe: '项目名称',
		})
	}, function (argv) {
		bizCli('init', argv);
	}).command('add --name [name]', '创建子模块', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			alias: 'n',
			default: '',
			describe: '子模块的名称，英文编码。'
		})
	}, function (argv) {
		bizCli('add', argv);
	}).command('build --name [name]', '构建子模块', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			default: '',
			describe: '构建名称为 name 的模块，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		bizCli('build', argv);
	}).command('dev --name [name]', '启动开发模式', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			default: '',
			describe: '指定构建模块的 name ，启动开发模式，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		bizCli('dev', argv);
	}).command('test', '启动联调模式', (yargs) => {}, function (argv) {
		bizCli('test', argv);
	}).command('commit [m]', '提交代码到分支', (yargs) => {
		yargs.positional('m', {
			type: 'string',
			default: '',
			describe: '指定构建模块的 name ，启动开发模式，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		bizCli('commit', argv);
	}).command('tag [m]', '启动开发模式', (yargs) => {
		yargs.positional('m', {
			type: 'string',
			default: '',
			describe: '指定构建模块的 name ，启动开发模式，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		bizCli('tag', argv);
	}).command('publish --name [name]', '启动开发模式', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			default: '',
			describe: '指定构建模块的 name ，启动开发模式，如果 name 为空，构建所有模块。'
		})
	}, function (argv) {
		bizCli('publish', argv);
	}).help().argv;

	return;
}
