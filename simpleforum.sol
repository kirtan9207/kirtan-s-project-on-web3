// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleForum {

    // Structure for a forum post
    struct Post {
        address author;
        string message;
        uint256 timestamp;
    }

    // Array to store all posts
    Post[] public posts;

    // Function to create a new forum post
    function createPost(string memory _message) public {
        posts.push(Post({
            author: msg.sender,
            message: _message,
            timestamp: block.timestamp
        }));
    }

    // Function to get total number of posts
    function getPostCount() public view returns (uint256) {
        return posts.length;
    }

    // Function to get a specific post by index
    function getPost(uint256 index)
        public
        view
        returns (address, string memory, uint256)
    {
        require(index < posts.length, "Post does not exist");
        Post memory p = posts[index];
        return (p.author, p.message, p.timestamp);
    }
}
