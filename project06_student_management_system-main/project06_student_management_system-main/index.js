#! /usr/bin/env node
import { university } from "./university.js";
console.log((`

        _   _   _   _   _   _   _     _   _     _   _   _   _   _   _  
        / \ / \ / \ / \ / \ / \ / \   / \ / \   / \ / \ / \ / \ / \ / \ 
       ( D | E | V | E | L | O | P ) ( B | Y ) ( S | E | N | S | E | I )
        \_/ \_/ \_/ \_/ \_/ \_/ \_/   \_/ \_/   \_/ \_/ \_/ \_/ \_/ \_/ 


        `));
let uni = new university();
let keepContinue = false;
while (!keepContinue) {
    await uni.startProg();
}
