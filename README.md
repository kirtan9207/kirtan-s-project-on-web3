# kirtan-s-project-on-web3


📘 SimpleForum – A Minimal Blockchain Forum

Welcome to SimpleForum, a beginner-friendly decentralized forum built using Solidity.
This project demonstrates how to create, store, and retrieve posts directly on the blockchain — no backend, no databases, fully trustless.

📝 Project Description

SimpleForum is a lightweight smart contract designed to act as a very simple public forum.
Users can publish posts, and anyone can read them. It’s built for beginners who want to understand:

How structs work in Solidity

How to push data to an array

How to read on-chain data

How to interact with a contract from a frontend

This contract requires no input fields during deployment, making it perfect for learners and simple dApps.

💡 What SimpleForum Does

Lets anyone create a text post on the blockchain

Stores every post with:

Author address

Message

Timestamp

Allows reading posts by index

Provides total post count

Everything is stored on-chain, making it transparent and immutable.

⭐ Features
✔ Public Posting

Anyone can call createPost() to publish a message.

✔ Fully On-Chain Storage

Posts are saved permanently in the blockchain array.

✔ Beginner-Friendly Architecture

Clean structure:

One struct

One array

Basic CRUD-like read operations

✔ Decentralized Forum

No central server. The contract itself is the forum.

🔗 Deployed Smart Contract

Your contract is deployed on the Flare Coston2 Test Network.

👉 View Transaction / Deployment:
https://coston2-explorer.flare.network/tx/0x36c0953d0e249a37ad7e17b3f397ba141f6fea706f994e93d62a2c6d16a02ec4

🧾 Smart Contract Code

Replace the placeholder below with your code:

//paste your code


Or use this version:

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

📌 Future Improvements (Optional Ideas)

Add upvotes / likes

Add post editing

Allow authors to delete their own posts

Add admin moderation features

Emit events for each new post

Build a React / Next.js frontend
