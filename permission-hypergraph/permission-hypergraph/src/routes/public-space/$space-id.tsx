import { Application } from '@/schema';
import { HypergraphSpaceProvider, useCreateEntity, useQuery, useSpace } from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';
import { preparePublish, publishOps, useHypergraphApp } from "@graphprotocol/hypergraph-react";


export const Route = createFileRoute('/public-space/$space-id')({
  component: RouteComponent,
});

function RouteComponent() {


  return (
    <HypergraphSpaceProvider space={"37a2994a-ed71-47d4-b88d-691cff5883b4"}>
      <PublicSpace />
    </HypergraphSpaceProvider>
  );
}

function PublicSpace() {
  const { ready, name } = useSpace({ mode: 'public' });
  const { data: applications } = useQuery(Application, { mode: 'public' });
  const { getSmartSessionClient } = useHypergraphApp();
  const createApplication = useCreateEntity(Application);

  if (!ready) {
    return <div>Loading...</div>;
  }

  // Handle async operations
  const handlePublish = async () => {
    try {
      const names = ["Hypergraph", "AnyAuth", "ETH"]
      
      const smartSessionClient = await getSmartSessionClient();
      
      const applications = names.map(name => 
        createApplication({ 
          domain: `${name.toLowerCase()}.app`, 
          name: name 
        })
      );

      const spaceId = "37a2994a-ed71-47d4-b88d-691cff5883b4"

      const allOps = [];
      for (const app of applications) {
        const { ops } = await preparePublish({
          entity: app,
          publicSpace: spaceId,
        });
        allOps.push(...ops);
      }

      const result = await publishOps({
        ops: allOps,
        walletClient: smartSessionClient,
        space: spaceId,
        name: "Create Multiple Applications", // description which can be any string
      });

      console.log('Publish result:', result);
    } catch (error) {
      console.error('Error publishing:', error);
    }
  };


  

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold">{name}</h1>
      <button 
        onClick={handlePublish}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        Publish Application
      </button>
      <ul>
        {applications?.map((application) => (
          <li key={application.id}>{application.name} - {application.domain}</li>
        ))}
      </ul>
    </div>
  );
}
