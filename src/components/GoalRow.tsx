import {GoalGorm} from "@/components/GoalGorm";


export const GoalRow = ({ goal }) => {
    return (
        <div className="flex items-center bg-gray-100 rounded-lg w-full p-3 gap-3">
            <div className="flex w-1/5 gap-3">
                <h4>{goal.title}</h4>
            </div>
            <div className="flex flex-grow">
                <p>{goal.description}</p>
            </div>
            <div className="flex gap-3">
                <button>
                    <GoalGorm goal={goal} />
                </button>
                <button>
                    save
                </button>
                <button>
                    copy
                </button>
                <button>
                    delete
                </button>
            </div>
        </div>
    )
}
