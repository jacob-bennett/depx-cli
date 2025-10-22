#!/usr/bin/env node

import {Command} from "commander";
import {install} from "./install.js";

const initCli = () => {
    const program = new Command();

    program
        .name('depx-cli')
        .description('Supply chain insights')
        .version('0.0.1', '-v, --version');

    program.command('install')
        .alias('i')
        .description('Install a package')
        .argument('<package-name>', 'package name')
        .action(install);

    program.parse()
}

initCli()
