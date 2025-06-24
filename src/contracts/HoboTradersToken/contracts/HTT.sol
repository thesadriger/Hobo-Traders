// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HoboTradersToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**3; // 1,000,000 HTT (3 знака после запятой)
    address public feeRecipient;
    uint256 public feeBasisPoints = 100; // 1% комиссия (100 = 1%, 10_000 = 100%)

    constructor(address _feeRecipient) ERC20("Hobo Traders Token", "HTT") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
        feeRecipient = _feeRecipient;
    }

    function decimals() public view virtual override returns (uint8) {
        return 3;
    }

    // Любой может сжечь свои токены
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // Оплата с комиссией (использовать для игровых покупок)
    function payWithFee(address to, uint256 amount) public {
        uint256 fee = (amount * feeBasisPoints) / 10000;
        uint256 toSend = amount - fee;
        _transfer(msg.sender, to, toSend);
        if (fee > 0) {
            _transfer(msg.sender, feeRecipient, fee);
        }
    }

    // Владелец может изменить получателя комиссии и размер комиссии
    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        feeRecipient = _feeRecipient;
    }

    function setFeeBasisPoints(uint256 _feeBasisPoints) external onlyOwner {
        require(_feeBasisPoints <= 1000, "Fee too high"); // максимум 10%
        feeBasisPoints = _feeBasisPoints;
    }
}
