import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUsers,
  updateUserById,
} from "../controllers/users.controllers";

export const UsersRouter = Router();

UsersRouter.get("/get-users", async (req, res) => {
  try {
    const allUsers = await getUsers();
    res.send(allUsers);
  } catch (error) {
    console.log({ error });
    res.sendStatus(400);
  }
});

UsersRouter.post("/create-user", async (req, res) => {
  const payload = req.body;
  try {
    const user = await createUser(payload);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

UsersRouter.patch("/update-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    console.log(userId, payload);

    await updateUserById(userId, payload);
    res.send({ message: "User Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

UsersRouter.delete("/delete-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await deleteUserById(userId as string);
    res.send({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
