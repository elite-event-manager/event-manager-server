export type T_RoleId = number

export enum E_RolePermission {
  'roles.view' = 'roles.view',
  'roles.update' = 'roles.update',
  'roles.create' = 'roles.create',
  'roles.delete' = 'roles.delete',

  'admins.view' = 'admins.view',
  'admins.update.general' = 'admins.update.general',
  'admins.update.password' = 'admins.update.password',
  'admins.update.roles' = 'admins.update.roles',
  'admins.create' = 'admins.create',
  'admins.delete' = 'admins.delete',

  'users.view' = 'users.view',
  'users.update' = 'users.update',
  'users.create' = 'users.create',
  'users.delete' = 'users.delete',
}
