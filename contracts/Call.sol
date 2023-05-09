pragma solidity ^0.8.18;

contract Target {
    uint public x;

    constructor() payable {}

    fallback() external payable {
        payable(msg.sender).transfer(1);
    }
}

contract TestCall {
    fallback() external payable {}

    function call_1(address target) external {
        target.call("");
    } 

    function call_2(address target) external {
        (bool success, ) = target.call("");
    } 

    function call_3(address target) external {
        (bool success, ) = target.call("");
        require(success, "failed");
    } 
}