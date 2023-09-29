// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {ISuperToken} from "superfluid/interfaces/superfluid/ISuperToken.sol";
import {SuperTokenV1Library} from "superfluid/apps/SuperTokenV1Library.sol";
import {Subscribable} from "../../src/utils/Subscribable.sol";

interface ITestToken {
    function mint(address account, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract SubscribableTest is Test {
    using SuperTokenV1Library for ISuperToken;

    Subscribable public subs;

    address host = 0xEB796bdb90fFA0f28255275e16936D25d3418603;
    address cfa = 0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873;
    address acceptedToken = 0x42bb40bF79730451B11f6De1CbA222F17b87Afd7;
    int96 flowrate = (9 * 10**18) / int96(31 days);

    function setUp() public {
        subs = new Subscribable(host, cfa, acceptedToken, flowrate);
    }

    function test_NoSubscribed() public {
        bool isSubscribed = subs.isSubscribed(address(this));
        assertEq(isSubscribed, false);
    }

    function test_Subscribed() public {
        ISuperToken _acceptedToken = ISuperToken(acceptedToken);
        ITestToken token = ITestToken(0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2);
        token.mint(address(this), 1000 * 10**18);

        token.approve(acceptedToken, 1000 * 10**18);
        _acceptedToken.upgrade(1000 * 10**18);
        _acceptedToken.createFlow(address(subs), flowrate);

        bool isSubscribed = subs.isSubscribed(address(this));
        assertEq(isSubscribed, true);
    }
}
