// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract InfoContract {
    string name;
    uint age;

     /**定义事件*/
    event Instructor(string name, uint age);

    function setInfo(string memory _name, uint _age) public {
        name = _name;
        age = _age;
        /**触发事件 */
        emit Instructor(name, age);
    }

    function getInfo() public view returns(string memory, uint) {
        return (name, age);
    }
}
