import { PrismaClient } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import addTodo from "./actions/addTodo";
import deleteTodo from "./actions/deleteTodo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Todo List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form 
              action={addTodo} 
              className="flex gap-2 mb-6"
            >
              <Input
                name="title"
                type="text"
                placeholder="Add a new todo..."
                className="flex-1"
              />
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Todo
              </Button>
            </form>

            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No todos yet. Add one to get started!
              </div>
            ) : (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md"
                  >
                    <span className="text-gray-700 font-medium">
                      {todo.title}
                    </span>
                    <form action={deleteTodo}>
                      <input type="hidden" name="id" value={todo.id} />
                      <Button 
                        variant="destructive" 
                        size="sm"
                        type="submit"
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}