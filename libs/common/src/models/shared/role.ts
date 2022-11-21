export type T_RoleId = number

export enum E_RolePermission {
  'roles.view.all' = 'roles.view.all',
  'roles.view.single' = 'roles.view.single',
  'roles.update' = 'roles.update',
  'roles.create' = 'roles.create',
  'roles.delete' = 'roles.delete',

  'admins.view.all' = 'admins.view.all',
  'admins.view.single' = 'admins.view.single',
  'admins.update' = 'admins.update',
  'admins.update.password' = 'admins.update.password',
  'admins.update.roles' = 'admins.update.roles',
  'admins.create' = 'admins.create',
  'admins.delete' = 'admins.delete',

  'users.view.all' = 'users.view.all',
  'users.view.single' = 'users.view.single',
  'users.update' = 'users.update',
  'users.create' = 'users.create',
  'users.delete' = 'users.delete',
}
