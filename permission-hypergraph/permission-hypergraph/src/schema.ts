import { Entity, Type } from '@graphprotocol/hypergraph';

export class User extends Entity.Class<User>('User')({
  name: Type.Text,
}) {}

export class Group extends Entity.Class<Group>('Group')({
  name: Type.Text,
  users: Type.Relation(User),
}) {}

export class Application extends Entity.Class<Application>('Application')({
  domain: Type.Text,
  name: Type.Text,
}) {}

export class Permission extends Entity.Class<Permission>('Permission')({
  name: Type.Text,
  application: Type.Relation(Application),
  group: Type.Relation(Group),
  permissionType: Type.Text,
}) {}