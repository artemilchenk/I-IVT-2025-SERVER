import { GetUpdateProfileSchema } from '../types';
import { updateUser, user } from '../constants';

export const getUpdateProfileSchema: GetUpdateProfileSchema = {
  example: user,
};

export const updateBodyProfileSchema: GetUpdateProfileSchema = {
  example: updateUser,
};
