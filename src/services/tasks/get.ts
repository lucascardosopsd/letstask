import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDb } from "@/lib/mongoDb";
import Task from "@/schemas/task";
import User from "@/schemas/user";
import { TaskProps } from "@/types/task";
import { getServerSession } from "next-auth";

export default async function getTasks({ query = {} }: { query?: Object }) {
  await connectDb();

  const session = await getServerSession(authOptions);

  const userId = await User.findOne({ email: session?.user?.email }, "id");

  try {
    const tasks = await Task.find(
      { userId },
      "id title description complete important userId"
    );

    return JSON.stringify(
      tasks.sort(
        (a: TaskProps, b: TaskProps) =>
          Number(a.complete) - Number(b.complete) ||
          Number(b.important) - Number(a.important)
      )
    );
  } catch (error) {
    throw new Error("Error when get tasks");
  }
}
