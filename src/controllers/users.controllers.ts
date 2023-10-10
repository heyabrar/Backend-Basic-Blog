import { UserModal } from "../db/users";

export const getUsers = async () => UserModal.find();

export const createUser = async (payload: Record<string, any>) =>
  new UserModal(payload).save().then((res) => res.toObject());

export const updateUserById = async (
  id: string,
  payload: Record<string, any>
) => UserModal.findByIdAndUpdate({ _id: id }, payload);

export const deleteUserById = async (id: string) =>
  UserModal.findByIdAndDelete({ _id: id });
