import { Id } from '@graphprotocol/grc-20';
import type { Mapping } from '@graphprotocol/hypergraph';

export const mapping: Mapping = {
  Application: {
    typeIds: [Id.Id("95a029d3-1270-4814-a91f-6a82eb6cb00a")],
    properties: {
        name: Id.Id("a126ca53-0c8e-48d5-b888-82c734c38935"),
        domain: Id.Id("a9512c01-dd8d-4b3d-9ba6-e33f38d2e802")
    }
  },
  User: {
    typeIds: [Id.Id("d2d6ad9d-434b-4ffd-8a0c-e54b193a7460")],
    properties: {
        name: Id.Id("a126ca53-0c8e-48d5-b888-82c734c38935"),
    }
  },
  Group: {
    typeIds: [Id.Id("61bbc9b2-1b68-47f6-8991-688aa518405f")],
    properties: {
        name: Id.Id("a126ca53-0c8e-48d5-b888-82c734c38935"),
    },
    relations: {
        users: Id.Id("a55dd9b0-c015-4b77-935e-c515f1614687")
    }
  },
};