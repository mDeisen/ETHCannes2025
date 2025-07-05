import { Application } from '@/schema';
import { HypergraphSpaceProvider, useQuery, useSpace } from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/public-space/$space-id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { 'space-id': spaceId } = Route.useParams();

  return (
    <HypergraphSpaceProvider space={spaceId}>
      <PublicSpace />
    </HypergraphSpaceProvider>
  );
}

function PublicSpace() {
  const { ready, name } = useSpace({ mode: 'public' });
  const { data: applications } = useQuery(Application, { mode: 'public' });

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold">{name}</h1>
      <ul>
        {applications?.map((application) => (
          <li key={application.id}>{application.name} - {application.domain}</li>
        ))}
      </ul>
    </div>
  );
}
