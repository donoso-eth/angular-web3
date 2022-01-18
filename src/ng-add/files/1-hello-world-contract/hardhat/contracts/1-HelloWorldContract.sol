//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HelloWorldContract {
    string private greeting;
    string public testpublic = 'ahora public';
    event SetPurpose(uint purpose,address sender);
    
    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }


    
    
    function greet() public view returns (string memory) {
    
        return greeting;
    }

    function setGreeting(string memory _greeting) public payable {
      
        greeting = _greeting;
    }

    receive() external payable {
}
}
