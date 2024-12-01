"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export default async function addTodo(formData, res) {
    const title  = formData.get("title");
    try {
        await prisma.todo.create({
            data: {
                title,
            },
        });
        revalidatePath("/");
    } catch (error) {
        console.log(error.message);
    }
}