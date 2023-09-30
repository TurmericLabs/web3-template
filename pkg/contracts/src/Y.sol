// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {StringUtils} from "./utils/StringUtils.sol";
import {Subscribable} from "./utils/Subscribable.sol";

contract Y {
    using StringUtils for string;

    struct Post {
        string content;
        uint256 timestamp;
        address author;
    }

    uint256 public index;
    mapping(uint256 => Post) private _posts;

    event PostCreated(uint256 index, string content, uint256 timestamp, address author);

    error ContentIsEmpty();
    error ContentIsTooLong();

    function post(string memory content) public {
        if (content.strlen() == 0) {
            revert ContentIsEmpty();
        }
        if (content.strlen() > 140) {
            revert ContentIsTooLong();
        }
        _posts[index] = Post(content, block.timestamp, msg.sender);
        emit PostCreated(index, content, block.timestamp, msg.sender);
        index++;
    }

    function getPost(uint256 i) public view returns (Post memory) {
        return _posts[i];
    }
}
