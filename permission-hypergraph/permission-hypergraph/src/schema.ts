import { Entity, Type } from '@graphprotocol/hypergraph';

export class Application extends Entity.Class<Application>('Application')({
  domain: Type.Text
}) {}

export class Permission extends Entity.Class<Permission>('Permission')({
  givenAt: Type.Date
}) {}

export class Group extends Entity.Class<Group>('Group')({
  createdAt: Type.Date
}) {}

export class User extends Entity.Class<User>('User')({
  wallet: Type.Text,
  createdAt: Type.Date
}) {}