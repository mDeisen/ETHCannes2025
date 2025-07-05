import { Id } from '@graphprotocol/grc-20';
import type { Mapping } from '@graphprotocol/hypergraph';

export const mapping: Mapping = {
  Application: {
    typeIds: [Id.Id("7e65c7e1-57db-4b3d-a7f6-293695db0629")],
    properties: {
        name: Id.Id("a126ca53-0c8e-48d5-b888-82c734c38935"),
        domain: Id.Id("f5b187aa-ff7b-4702-b858-0ea1b9158a95")
    }
  },
  User: {
    typeIds: [Id.Id("d5812d54-4690-4ef5-b287-ce69965f832b")],
    properties: {
        name: Id.Id("a126ca53-0c8e-48d5-b888-82c734c38935"),
    }
  },
  Group: {
    typeIds: [Id.Id("2a37fb16-9b5a-4ab7-897f-672db1f38a6a")],
    properties: {
        name: Id.Id("a126ca53-0c8e-48d5-b888-82c734c38935"),
    },
    relations: {
        users: Id.Id("d3a2c871-18e0-4dea-8fae-ab5669cc3bb5")
    }
  },
  Permission: {
    typeIds: [Id.Id("8cc69572-f077-49f6-ae53-68572c18090c")],
    properties: {
        name: Id.Id("a126ca53-0c8e-48d5-b888-82c734c38935"),
        permissionType: Id.Id("95ac3d0c-a9c9-47cf-ab68-6b03939ca6e3")
    },
    relations: {
      application: Id.Id("9ca22737-a6e5-43fd-ac65-36f5fa3e589a"),
      group: Id.Id("f665062f-73b6-4be3-90f4-2168508e0a04"),
    }
  }
};