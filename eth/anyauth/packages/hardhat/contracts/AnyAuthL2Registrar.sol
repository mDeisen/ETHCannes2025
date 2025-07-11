// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {StringUtils} from "@ensdomains/ens-contracts/utils/StringUtils.sol";

import {IL2Registry} from "../interfaces/IL2Registry.sol";

contract AnyAuthL2Registrar {
    using StringUtils for string;

    /// @notice Emitted when a new name is registered
    /// @param label The registered label (e.g. "name" in "name.eth")
    /// @param owner The owner of the newly registered name
    event NameRegistered(string indexed label, address indexed owner);

    /// @notice Emitted when a role entry is updated
    /// @param label The label of the name
    /// @param roles The roles for the app
    event RolesUpdated(string indexed label, string indexed roles);

    /// @notice Reference to the target registry contract
    IL2Registry public immutable registry;

    /// @notice The chainId for the current chain
    uint256 public chainId;

    /// @notice The coinType for the current chain (ENSIP-11)
    uint256 public immutable coinType;

    /// @notice Initializes the registrar with a registry contract
    /// @param _registry Address of the L2Registry contract
    constructor(address _registry) {
        // Save the chainId in memory (can only access this in assembly)
        assembly {
            sstore(chainId.slot, chainid())
        }

        // Calculate the coinType for the current chain according to ENSIP-11
        coinType = (0x80000000 | chainId) >> 0;

        // Save the registry address
        registry = IL2Registry(_registry);
    }

    /// @notice Registers a new name under the application subdomain
    /// @param label The label to register - that can be an ens 2nd level domain 
    /// (e.g. "username" for "username.applicationname.eth", e.g. "max" in "max.anyauth.eth")
    /// Can refer to "username(.eth)"
    /// @param owner The address that will own the name
    /// @param roles The roles for the app
    function register(string calldata label, address owner, string calldata roles) external {
        bytes32 node = _labelToNode(label);
        bytes memory addr = abi.encodePacked(owner); // Convert address to bytes

        require(_isAvailable(label), "Label not available");

        // Set the forward address for the current chain. This is needed for reverse resolution.
        // E.g. if this contract is deployed to Base, set an address for chainId 8453 which is
        // coinType 2147492101 according to ENSIP-11.
        registry.setAddr(node, coinType, addr);

        // Set the forward address for mainnet ETH (coinType 60) for easier debugging.
        registry.setAddr(node, 60, addr);

        registry.setText(node, "roles", roles);
        registry.setText(node, "description", "The roles for this app have been set under the 'roles' text record");

        // Register the name in the L2 registry
        registry.createSubnode(
            registry.baseNode(),
            label,
            owner,
            new bytes[](0)
        );
        emit NameRegistered(label, owner);
    }

    /// @notice Updates the roles for a given label
    /// @param label The label of the name
    /// @param roles The roles for the app
    function updateRoles(string calldata label, string calldata roles) external {
        bytes32 node = _labelToNode(label);
        registry.setText(node, "roles", roles);
        emit RolesUpdated(label, roles);
    }

    /// @notice Checks if a given label is available for registration
    /// @dev Uses try-catch to handle the ERC721NonexistentToken error
    /// @param label The label to check availability for
    /// @return available True if the label can be registered, false if already taken
    function available(string calldata label) external view returns (bool) {

        return _isAvailable(label);
    }

    /// @notice Looks up the roles for a given label
    /// @param label The label of the name
    /// @return roles The roles for the app
    function lookupRoles(string calldata label) external view returns (string memory) {
        bytes32 node = _labelToNode(label);
        return registry.text(node, "roles");
    }


    function _isAvailable(
        string calldata label
    ) private view returns (bool) {
        bytes32 node = _labelToNode(label);
        uint256 tokenId = uint256(node);

        try registry.ownerOf(tokenId) {
            return false;
        } catch {
            if (label.strlen() >= 3) {
                return true;
            }
            return false;
        }
    }

    function _labelToNode(
        string calldata label
    ) private view returns (bytes32) {
        return registry.makeNode(registry.baseNode(), label);
    }
}
