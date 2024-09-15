// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract StorageWithAllowList {
    address public owner;
    mapping(address => bool) public grantedUers;
    struct DataDoc {
        string id;
        string hashContent;
    }

    mapping(string => DataDoc) docs;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyAllowed() {
        require(grantedUers[msg.sender] || msg.sender == owner, "Only owner or allowed addresses can perform this action");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function grantUser(address user) public onlyOwner {
        grantedUers[user] = true;
    }

    function storeData(string memory docId, string memory hashContent) public onlyOwner {
        docs[docId] = DataDoc(docId, hashContent);
    }

    function getData(string memory docId) public view onlyAllowed returns (string memory) {
        return docs[docId].hashContent;
    }
}