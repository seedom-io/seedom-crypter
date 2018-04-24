#!/usr/bin/env node

const program = require('commander');
const messages = require('./messages');

program
    .command('secure <message> <address>')
    .action((message, address) => {
        const messageHex = messages.hex(message);
        if (!messageHex) {
            console.log('MESSAGE INVALID');
            return;
        }

        const messageHash = messages.hash(messageHex, address);
        if (!messageHash) {
            console.log('ADDRESS INVALID');
            return;
        }

        // output secure data
        console.log(`BEGIN()  SECRET : ${messageHash}`);
        console.log(`REVEAL() HEX    : ${messageHex}`);
    });

program.parse(process.argv);