"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TaskProps } from "@/app/types/task";
import connectDb from "@/lib/mongoDb";
import Task from "@/schemas/task";
import User from "@/schemas/user";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function createTask(data: TaskProps) {
  await connectDb();

  const session = await getServerSession(authOptions);

  const userId = await User.findOne({ email: session?.user?.email }, "id");

  try {
    await Task.create({ ...data, userId });
    revalidatePath("/tasks");
  } catch (error) {
    throw new Error("Erro when create task.");
  }
}