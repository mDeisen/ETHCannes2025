workspace "ETHCANNES2025" "Hackathon project" {

    !identifiers hierarchical

    model {
        # Personas
        admin = person "Administrator" ""
        user = person "user" ""

        # External systems
        self = softwareSystem "Self.xyz" {
            url "https://github.com/selfxyz/self"
        }

        layerZero = softwareSystem "Layer Zero" {
            tags "queue"
            url "https://github.com/LayerZero-Labs/LayerZero-v2"
        }

        graph = softwareSystem "Hypergraph sync server"  {
            url "https://github.com/graphprotocol/hypergraph"
            tags "database"    
        }

        ens = softwareSystem "ENS" {
            url "https://docs.ens.domains/"
            tags "database"
        }

        # Internal system
        hack = softwareSystem "The Hack" "" "focus" {
            applicationContract = container "Application Contract" "Contract for the demo app leveraging graph for IAM. Also forwards data from Self to graph." "Solidity, deployed to ETH Mainnet or Sepolia" {
                lzInterface = component "Layer Zero interface" {
                    layerZero -> this "Forward transaction"
                }

                dummyFunction = component "Dummy function that requires a transaction and is limited to specific access right" {
                    -> graph "Verifies access right"
                }

                identificationFunction = component "Function for adding new users to app" {
                    -> ens "Add text record with verified user data"
                    lzInterface -> this "Calls after receiving verified user data"
                }
            }

            selfConnector = container "Self.xyz Connector Contract" "Contract for connecting with Self" "Solidity, deployed to Celo" {
                lzInterface = component "Layer Zero interface" {
                    -> layerZero "Sends transactions after identifying user" "" "async"
                }

                self -> this "Send verified user data"

                -> applicationContract.identificationFunction "Forward verified user data" "Layer Zero" "async"
            }

            nextApp = container "Hybrid App" "Backend and Frontends" "Next.js, Hypergraph, Bulma" {
                subjectManagementPage = component "Subject Management" "Page for adding/updating groups and viewing users" {
                    admin -> this "Manages group assignments"
                    -> ENS "Read attestations"
                    -> hack.selfConnector "Forward to identification for enrollment"
                    -> graph "Read/write groups and users" "Hypergraph SDK" "async"
                }

                objectManagementPage = component "Object Management" "Page for adding/updatings roles and access rights " {
                    admin -> this "Manages roles and access rights"
                    -> graph "Read/write roles and access rights" "Hypergraph SDK" "async"
                }

                dashboard = component "Dashboard" "Requests login and displays user's roles" {
                    user -> this "Login"
                    -> graph "Query roles" "Hypergraph SDK"
                }

                dummyPage = component "Applications page" "Lists applications for which you have roles" {
                    admin -> this "Create new application" "Hypergraph SDK" "async"
                    -> graph "Check roles" "Hypergraph SDK"
                }
            }
        }

        user -> self "Identify with passport" "NFC" "async"
    }

    views {
        systemContext hack "hack_sc" {
            include *
            autolayout lr
        }

        container hack "hack_con" {
            include *
            autolayout lr
        }

        component hack.applicationContract "applicationContract_com" {
            include *
            autolayout lr
        }

        component hack.selfConnector "selfConnector_com" {
            include *
            autolayout lr
        }


        component hack.nextApp "nextApp_com" {
            include *
            autolayout lr
        }

        styles {
            element "Person" {
                shape Person
            }

            element "Boundary" {
                strokeWidth 4
            }

            element "Group" {
                strokeWidth 3
            }

            element "Software System" {
                opacity 60
            }

            element "focus" {
                background lightskyblue
                stroke darkslateblue
                opacity 100
            }

            element "database" {
                shape cylinder
            }

            element "queue" {
                shape pipe
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