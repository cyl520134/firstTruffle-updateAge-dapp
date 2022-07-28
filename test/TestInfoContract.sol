pragma solidity >=0.4.22 <0.9.0;

/**断言-专门测试*/
import "truffle/Assert.sol";
/**地址合约*/
import "truffle/DeployedAddresses.sol";
import "../contracts/InfoContract.sol";

contract TestInfoContract {
   InfoContract info = InfoContract(DeployedAddresses.InfoContract());
   string name;
   uint age;

   function testInfo() public {
     info.setInfo("ABC", 10);

     (name, age) = info.getInfo();

     Assert.equal(name, "ABC", "设置名字出错");
     Assert.equal(age, 10, "设置年龄出错");
   }
}
