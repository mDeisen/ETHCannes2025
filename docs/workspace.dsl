workspace "ETHCANNES2025" "Hackathon project" {

    !identifiers hierarchical

    model {
        admin = person "Administrator"
        user = person "user"

        hack = softwareSystem "The Hack" {
            nextApp = container "HybridApp" {

            }

            govContract = container "Governance Contract" {

            }

            selfConnector = container "Self.xyz Connector Contract" {

            }
        }

        self = softwareSystem "Self.xyz"
        layerZero = softwareSystem "LayerZero"
        graph = softwareSystem "The Graph"
        geobrowser = softwareSystem "Geobrowser"
        ens = softwareSystem "ENS"

        admin -> hack.nextApp "Manages access rights"
        user -> hack.nextApp "Registers and uses"
        user -> self "Identify with passport" "" "async"
        hack.nextApp -> hack.selfConnector "Identifies users"
        hack.nextApp -> graph "<with Hypergraph SDK> Manages users" "" "async"
        hack.nextApp -> ens "???"
        hack.selfConnector -> self "Identify users"
        hack.selfConnector -> hack.govContract "<via Layer Zero> Sends verified user data" "" "async"

        hack.govContract -> graph "Add user entity with verified group memberships"

    }

    views {
        systemContext hack "System_Context" {
            include *
            autolayout lr
        }

        container hack "Containers" {
            include *
            autolayout lr
        }

        styles {
            element "Person" {
                shape Person
            }

            relationship "Relationship" {
                style solid
            }

            relationship "async" {
                style dashed
            }
        }
    }

    configuration {
        scope softwaresystem
    }

}