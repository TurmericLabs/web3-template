// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Y} from "../src/Y.sol";

// import {ISuperToken} from "superfluid/interfaces/superfluid/ISuperToken.sol";
// import {SuperTokenV1Library} from "superfluid/apps/SuperTokenV1Library.sol";

// interface ITestToken {
//     function mint(address account, uint256 amount) external returns (bool);
//     function approve(address spender, uint256 amount) external returns (bool);
// }

contract YScript is Script {
    // using SuperTokenV1Library for ISuperToken;
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // address host = 0xEB796bdb90fFA0f28255275e16936D25d3418603;
        // address cfa = 0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873;
        // address acceptedToken = 0x42bb40bF79730451B11f6De1CbA222F17b87Afd7;
        // int96 flowrate = 3424657534246;
        Y y = new Y();

        // ISuperToken _acceptedToken = ISuperToken(acceptedToken);
        // ITestToken token = ITestToken(0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2);
        // token.mint(msg.sender, 1000 * 10**18);

        // token.approve(acceptedToken, 1000 * 10**18);
        // _acceptedToken.upgrade(900 * 10**18);
        // _acceptedToken.createFlow(address(y), flowrate);

        y.post("hello world");
        y.post("GM");

        vm.stopBroadcast();
    }
}
