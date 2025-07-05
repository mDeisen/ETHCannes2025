import { Entity, Type } from '@graphprotocol/hypergraph';

export class User extends Entity.Class<User>('User')({
  wallet: Type.Text,
}) {}

export class Group extends Entity.Class<Group>('Group')({
  createdAt: Type.Date,
  users: Type.Relation(User),
}) {}

export class Application extends Entity.Class<Application>('Application')({
  domain: Type.Text
}) {}

export class Permission extends Entity.Class<Permission>('Permission')({
  givenAt: Type.Date,
  application: Type.Relation(Application),
  group: Type.Relation(Group),
  type: Type.Text,
}) {}