import { Application, Group, User, Permission } from '@/schema';
import {
  HypergraphSpaceProvider,
  preparePublish,
  publishOps,
  useCreateEntity,
  useHypergraphApp,
  useQuery,
  useSpace,
  useSpaces,
} from '@graphprotocol/hypergraph-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/private-space/$space-id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { 'space-id': spaceId } = Route.useParams();

  return (
    <HypergraphSpaceProvider space={spaceId}>
      <PrivateSpace />
    </HypergraphSpaceProvider>
  );
}

function PrivateSpace() {
  const { name, ready } = useSpace({ mode: 'private' });
  const { data: applications } = useQuery(Application, { mode: 'private' });
  const { data: publicSpaces } = useSpaces({ mode: 'public' });
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const createApplication = useCreateEntity(Application);
  // const createUser = useCreateEntity(User);
  // const createGroup = useCreateEntity(Group);
  // const createPermission = useCreateEntity(Permission);

  const [domain, setDomain] = useState('');
  const { getSmartSessionClient } = useHypergraphApp();

  if (!ready) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createApplication({ domain: domain, name: "Default Application"});
    // const user = createUser({ name: "Default User"})
    // const group = createGroup({ name: "Default Group", users: [user.id]})
    // const permission = createPermission({name: "Default Permission", })
    setDomain('');
  };

  const publishToPublicSpace = async (application: Application) => {
    if (!selectedSpace) {
      alert('No space selected');
      return;
    }
    try {
      const { ops } = await preparePublish({ entity: application, publicSpace: selectedSpace });
      const smartSessionClient = await getSmartSessionClient();
      if (!smartSessionClient) {
        throw new Error('Missing smartSessionClient');
      }
      const publishResult = await publishOps({
        ops,
        space: selectedSpace,
        name: 'Publish Application',
        walletClient: smartSessionClient,
      });
      console.log(publishResult, ops);
      alert('Application published to public space');
    } catch (error) {
      console.error(error);
      alert('Error publishing application to public space');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold">{name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <h3 className="text-sm font-semibold text-blue-800">Create New Application</h3>
          <p className="text-xs text-blue-600">Fill in the details below to create a new Application entity</p>
        </div>
        <label className="flex flex-col">
          <span className="text-sm font-bold">Domain</span>
          <input 
            type="text" 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain for new application"
            required
          />
        </label>
        <button type="submit">Create Application</button>
      </form>

      <ul>
        {applications?.map((application) => (
          <li key={application.id}>
            {application.domain}
            <select value={selectedSpace} onChange={(e) => setSelectedSpace(e.target.value)}>
              <option value="">Select a space</option>
              {publicSpaces?.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.name}
                </option>
              ))}
            </select>
            <button onClick={() => publishToPublicSpace(application)}>Publish</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
