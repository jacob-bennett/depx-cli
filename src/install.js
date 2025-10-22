import readline from "readline";
import yoctoSpinner from "yocto-spinner";
import chalk from "chalk";
import {spawnSync} from 'node:child_process';
import {formatNumber, formatTimeAgo} from "./utils.js";

export const install = async (packageName) => {
    const {packages} = await addSpinnerToRequest(() => getPackageAnalysis(packageName));
    const mainPackage = packages[0];

    showPackageInfo(mainPackage.name, mainPackage.version, [
        {name: 'Released', value: formatTimeAgo(mainPackage.stats.released)},
        {name: 'Weekly downloads', value: formatNumber(mainPackage.stats.downloads)},
        {name: 'Transitive dependencies', value: packages.length - 1},
        {name: 'Total LoC', value: formatNumber(mainPackage.stats.cumulativeLoc)},
        {name: 'View more', value: `https://depx.co/pkg/${mainPackage.name}`}, // Coming soon...
        // {name: 'Has postinstall scripts', value: 'No'},
    ])

    const answer = await askYesNo('Proceed with installation?');
    if (answer) {
        runNpmInstall(mainPackage);
    }
};
// const {packages} = await request.json()
const getPackageAnalysis = async (packageName) =>
    (await fetch(`https://depx.co/api/pkg/${packageName}`, {headers: {'X-Client-Type': 'cli'}})).json();

const addSpinnerToRequest = async (fn) => {
    const spinner = yoctoSpinner({text: 'Analysing dependency…'});
    spinner.start();
    const start = Date.now();
    const request = await fn();
    const duration = Date.now() - start;
    spinner.success(`Analysis loaded (${chalk.gray(`${duration}ms`)})`)
    return request;
}

const askYesNo = question => {
    const rl = readline.createInterface({
        input: process.stdin, output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(`${question} ${chalk.bold('(y/N)')}: `, answer => {
            rl.close();

            const firstChar = answer.trim().charAt(0).toLowerCase();

            if (firstChar === "y") {
                resolve(true);
            } else if (firstChar === "n") {
                resolve(false);
            } else {
                return askYesNo(question);
            }
        });
    });
};

const showPackageInfo = (name, version, stats) => {
    const labelWidth = 25;
    console.log(`${chalk.cyan.bold(name)} ${chalk.gray('@')} ${chalk.yellow(version)}`)
    console.log(chalk.gray('─'.repeat(40)));
    stats.forEach(stat => {
        console.log(`${chalk.dim(padRight(`${stat.name}:`, labelWidth))}${chalk.whiteBright(stat.value)}`);
    })

    console.log(chalk.gray('─'.repeat(40)));
};

const runNpmInstall = (mainPackage) => {
    const args = ['install', mainPackage.name];
    console.log(chalk.dim(`npm ${args.join(' ')}`));
    spawnSync('npm', args, {stdio: 'inherit'});
}

const padRight = (str, length) => str + ' '.repeat(Math.max(0, length - str.length));
