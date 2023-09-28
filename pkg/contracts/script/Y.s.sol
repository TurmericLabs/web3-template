// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Y} from "../src/Y.sol";

contract YScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        Y y = new Y();
        y.post("hello world");
        y.post("GM");

        vm.stopBroadcast();
    }
}
