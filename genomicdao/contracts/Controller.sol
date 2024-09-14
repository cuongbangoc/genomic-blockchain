pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./NFT.sol";
import "./Token.sol";

contract Controller {
    using Counters for Counters.Counter;

    //
    // STATE VARIABLES
    //
    Counters.Counter private _sessionIdCounter;
    GeneNFT public geneNFT;
    PostCovidStrokePrevention public pcspToken;

    struct UploadSession {
        uint256 id;
        address user;
        string proof;
        bool confirmed;
    }

    struct DataDoc {
        string id;
        string hashContent;
    }

    mapping(uint256 => UploadSession) sessions;
    mapping(string => DataDoc) docs;
    mapping(string => bool) docSubmits;
    mapping(uint256 => string) nftDocs;

    //
    // EVENTS
    //
    event UploadData(string docId, uint256 sessionId);
    event GNFTMinted(string docId, uint256 sessionId, uint256 tokenId);
    event PCSPRewarded(string docId, uint256 sessionId, uint256 riskScore);

    constructor(address nftAddress, address pcspAddress) {
        geneNFT = GeneNFT(nftAddress);
        pcspToken = PostCovidStrokePrevention(pcspAddress);
    }

    function uploadData(string memory docId) public returns (uint256) {
        // TODO: Implement this method: to start an uploading gene data session. The doc id is used to identify a unique gene profile.
        // Also should check if the doc id has been submited to the system before. This method return the session id
        require(!docSubmits[docId], "Doc already been submitted");

        uint256 sessionId = _sessionIdCounter.current();

        sessions[sessionId] = UploadSession(sessionId, msg.sender, "", false);

        emit UploadData(docId, sessionId);

        _sessionIdCounter.increment();

        return sessionId;
    }

    function confirm(
        string memory docId,
        string memory contentHash,
        string memory proof,
        uint256 sessionId,
        uint256 riskScore
    ) public {
        // require(bytes(docs[docId].id).length == 0, "Doc already been submitted");
        require(!docSubmits[docId], "Doc already been submitted");
        require(sessions[sessionId].confirmed == false, "Session is ended");
        require(sessions[sessionId].user == msg.sender, "Invalid session owner");

        // TODO: Implement this method: The proof here is used to verify that the result is returned from a valid computation on the gene data. For simplicity, we will skip the proof verification in this implementation. The gene data's owner will receive a NFT as a ownership certicate for his/her gene profile.

        // TODO: Verify proof, we can skip this step
        sessions[sessionId].proof = proof;
        // TODO: Update doc content
        docs[docId] = DataDoc(docId, contentHash);
        docSubmits[docId] = true;
        // TODO: Mint NFT
        uint256 nftId = geneNFT.safeMint(msg.sender);
        nftDocs[nftId] = docId;
        emit GNFTMinted(docId, sessionId, nftId);

        // TODO: Reward PCSP token based on risk stroke
        pcspToken.reward(msg.sender, riskScore);
        emit PCSPRewarded(docId, sessionId, riskScore);

        // TODO: Close session
        sessions[sessionId].confirmed = true;
    }

    function getSession(uint256 sessionId) public view returns(UploadSession memory) {
        return sessions[sessionId];
    }

    function getDoc(string memory docId) public view returns(DataDoc memory) {
        return docs[docId];
    }
}
