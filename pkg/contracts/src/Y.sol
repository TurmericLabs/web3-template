// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {StringUtils} from "./utils/StringUtils.sol";

contract Y {
    using StringUtils for string;

    struct Post {
        string content;
        uint256 timestamp;
        address author;
    }

    uint256 public index;
    mapping(uint256 => Post) posts;

    event PostCreated(uint256 index, string content, uint256 timestamp, address author);

    error ContentIsEmpty();
    error ContentIsTooLong();

    function post(string memory _content) public {
        if (_content.strlen() == 0) {
            revert ContentIsEmpty();
        }
        if (_content.strlen() > 140) {
            revert ContentIsTooLong();
        }
        posts[index] = Post(_content, block.timestamp, msg.sender);
        emit PostCreated(index, _content, block.timestamp, msg.sender);
        index++;
    }

    function getPost(uint256 _index) public view returns (Post memory) {
        return posts[_index];
    }
}
