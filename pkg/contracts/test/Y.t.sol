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
        y = new Y();
    }

    function test_Post() public {
        vm.expectEmit(true, true, true, false);
        emit PostCreated("hello world", block.timestamp, msg.sender);

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
