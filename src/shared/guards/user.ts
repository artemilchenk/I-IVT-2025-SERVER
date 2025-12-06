import { UpdateUserBase, UpdateUserWiaPassword } from '../../types/user';

export function isUserUpdateWiaPassword(
  value: UpdateUserBase | UpdateUserWiaPassword,
): value is UpdateUserWiaPassword {
  return 'oldpassword' in value;
}
