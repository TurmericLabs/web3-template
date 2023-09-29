// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {StringUtils} from "../src/utils/StringUtils.sol";
import {Y} from "../src/Y.sol";

contract YTest is Test {
    using StringUtils for string;
    Y public y;

    event PostCreated(uint256 index, string content, uint256 timestamp, address author);

    function setUp() public {
        address host = 0xEB796bdb90fFA0f28255275e16936D25d3418603;
        address cfa = 0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873;
        address acceptedToken = 0x42bb40bF79730451B11f6De1CbA222F17b87Afd7;
        int96 flowrate = (9 * 10**18) / int96(31 days);
        y = new Y(host, cfa, acceptedToken, flowrate);
    }

    function test_Post() public {
        vm.expectEmit(true, true, true, false);
        emit PostCreated(0, "hello world", block.timestamp, msg.sender);

        y.post("hello world");
        assertEq(y.getPost(0).content, "hello world");
        assertEq(y.getPost(0).timestamp, block.timestamp);
        assertEq(y.getPost(0).author, address(this));
    }

    function test_PostEmpty() public {
        vm.expectRevert(Y.ContentIsEmpty.selector);
        y.post("");
    }

    function test_PostTooLong() public {
        string memory acceptableContent = "hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello wo";
        assert(acceptableContent.strlen() == 140);
        y.post(acceptableContent);

        vm.expectRevert(Y.ContentIsTooLong.selector);
        string memory unacceptableContent = "hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello wor";
        assert(unacceptableContent.strlen() == 141);
        y.post(unacceptableContent);
    }
}
