//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DebugContract {
    string private greeting;
    event ValueChangedEvent(uint256 value);
    
    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    
    function greet() public view returns (string memory) {
    
        return greeting;
    }

    function calculate(uint number1, uint number2) pure public returns (uint) {
    return number1 * number2;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
       
    }

    receive() external payable {
    emit ValueChangedEvent(msg.value);
}
}
