"use client"
import dynamic from "next/dynamic";

const GoalForm = dynamic(() => import("../components/GoalGorm").then(mod => mod.GoalGorm), {
  ssr: false,
});
const GoalRow = dynamic(() => import("../components/GoalRow").then(mod => mod.GoalRow), {
  ssr: false,
})

export default function Home() {
  const goals = [
    {
      id: 1,
      title: "Eat",
      description: "something",
      assignedDate: "2021-01-01",
      sortOrder: 1,
      completed: false
    },
    {
      id: 2,
      title: "Sleep",
      description: "something",
      assignedDate: "2021-01-01",
      sortOrder: 2,
      completed: false
    },
    {
      id: 3,
      title: "Play",
      description: "something",
      assignedDate: "2021-01-01",
      sortOrder: 3,
      completed: false
    }
  ]
  return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Goal Tracker</h1>
        <GoalForm />
        {
          goals.map((goal) => {
            return <GoalRow key={goal.id} goal={goal} />
          })
        }
      </main>
  )
}
