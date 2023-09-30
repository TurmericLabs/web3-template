pragma solidity ^0.8.17;

import {ISuperfluid} from "superfluid/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "superfluid/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {ISuperToken} from "superfluid/interfaces/superfluid/ISuperToken.sol";
import {SuperTokenV1Library} from "superfluid/apps/SuperTokenV1Library.sol";

contract Subscribable {
    using SuperTokenV1Library for ISuperToken;

    ISuperfluid private _host;
    IConstantFlowAgreementV1 private _cfa;
    ISuperToken private _acceptedToken;
    int96 private _minFlowrate;

    modifier onlySubscribers() {
        require(isSubscribed(msg.sender), "please subscribe to call");
        _;
    }

    modifier onlySubscribersTo(address recipient) {
        require(isSubscribedTo(msg.sender, recipient), "please subscribe to call");
        _;
    }

    constructor(
        address host,
        address cfa,
        address acceptedToken,
        int96 minFlowrate
    ) {
        require (minFlowrate > 0, "minFlowrate must be positive");
        _host = ISuperfluid(host);
        _cfa = IConstantFlowAgreementV1(cfa);
        _acceptedToken = ISuperToken(acceptedToken);
        _minFlowrate = minFlowrate;
    }

    function isSubscribed(address sender) public view returns (bool) {
      return isSubscribedTo(sender, address(this));
    }

    function isSubscribedTo(address sender, address recipient) public view returns (bool) {
        int96 flowrate = _acceptedToken.getFlowRate(sender, recipient);
        return flowrate > 0 && flowrate >= _minFlowrate;
    }
}