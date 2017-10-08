const { readdirSync, statSync } = require(`fs`);
const { spawn } = require(`child_process`);
const { join } = require(`path`);

isDirectory(join(`.`, `./src/Bots`)).forEach(dir => {
	start(`src/Bots/${dir}`);
});

function isDirectory(source) {
	return readdirSync(source).filter(name => statSync(`${source}/${name}`).isDirectory());
}

function start(input) {
	const proc = spawn(`node`, [`../../__Global/Main.js`], { cwd: input });

	proc.stdout.on(`data`, data => {
		console.log(String(data));
	});

	proc.stderr.on(`data`, data => {
		console.error(String(data));
	});

	proc.on(`close`, () => {
		setTimeout(() => {
			start(input);
		}, 1000 * 5);
	});
}
