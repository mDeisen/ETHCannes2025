"use client"
import { useParams } from "next/navigation";
import { SelfQRcodeWrapper, SelfApp, SelfAppBuilder } from '@selfxyz/qrcode';
import { useHypergraphAuth } from "@graphprotocol/hypergraph-react";
import { useState } from "react";
import { addUserToGroup } from "@/connectors/hypergraph-actions";

const SELF_CONTRACT_ADDRESS = "0x7b6436b0c98f62380866d9432c2af0ee08ce16a171bda6951aecd95ee1307d61";

export default function AppPermissions() {
  const { appId, groupId } = useParams();
  const { identity } = useHypergraphAuth();
  // Hash of the transaction triggered by the Self verification
  const [ txHash, setTxHash ] = useState();

  if ( typeof appId != "string" || typeof groupId != "string" ) {
    return "Error";
  }

  const selfApp = new SelfAppBuilder({
        appName: "Any Auth",
        scope: "Self-Birthday-Example",
        endpoint: SELF_CONTRACT_ADDRESS,
        endpointType: "staging_celo",
        userId: identity?.address,
        userIdType: "hex",
        disclosures: {
            date_of_birth: true,
        },
        devMode: true,
    } as Partial<SelfApp>).build();

    const handleSuccess = async (data?: any) => {
        console.log('Verification successful', data);
        // If we get a tx hash from the data, use it to display progress
        if (data?.txHash) {
            setTxHash(data.txHash);
        }
        // Add user to desired group
        addUserToGroup(identity?.address ?? "", appId, groupId)
    };

    const handleError = async (error?: any) => {
        console.log('Verification failure', error);
    };

    return (
    <>
      <div className="container is-max-desktop">
        <section className="section">
          <h4 className="is-size-4">Permissions</h4>
        </section>
        <section className="section">
          {selfApp && (
                <div className="flex justify-center mb-6">
                    <SelfQRcodeWrapper
                        selfApp={selfApp}
                        type='websocket'
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>
            )}
            {txHash &&
                <a
                    href={`https://alfajores.celoscan.io/address/${address}#tokentxns`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button is-primary is-outlined"
                >
                    View your verification here
                </a>}
        </section>
      </div>
    </>
  );
}
