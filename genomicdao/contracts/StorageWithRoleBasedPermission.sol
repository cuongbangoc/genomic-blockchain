pragma solidity ^0.8.9;

contract StorageWithRoleBasedPermission {
    enum Role {
        ADMIN,
        USER
    }
    struct DataDoc {
        string id;
        string hashContent;
    }
    mapping(string => DataDoc) docs;
    mapping(address => Role) public roles;

    constructor() {
        roles[msg.sender] = Role.ADMIN;
    }

    modifier onlyAdmin() {
        require(roles[msg.sender] == Role.ADMIN, "Only admins can perform this action");
        _;
    }

    modifier onlyUser() {
        require(roles[msg.sender] == Role.USER, "Only users can perform this action");
        _;
    }

    function grantAdmin(address user) public onlyAdmin {
        roles[user] = Role.ADMIN;
    }

    function grantUser(address user) public onlyAdmin {
        roles[user] = Role.USER;
    }

    function revokeRole(address user) public onlyAdmin {
        delete roles[user];
    }

    function storeData(string memory docId, string memory hashContent) public onlyAdmin {
        docs[docId] = DataDoc(docId, hashContent);
    }

    function getData(string memory docId) public view onlyUser returns (string memory) {
        return docs[docId].hashContent;
    }
}