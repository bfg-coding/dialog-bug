"use client"
import {useEffect, useReducer} from "react";

interface GoalModalProps {
    id: string;
    buttonClass?: string;
    Button: () => React.ReactElement;
    children: React.ReactNode;
}

export const ButtonModal = ({ id, buttonClass, Button, children }: GoalModalProps) => {
    return (
        <>
            <button className={buttonClass || "btn"} onClick={() => window[id].showModal()}>
                <Button />
            </button>
            <dialog id={id} className="modal">
                <form method="dialog" className="modal-box">
                    <button formMethod="dialog" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        X
                    </button>
                    {children}
                </form>
            </dialog>
        </>
    )
}

interface IconModalProps {
    id: string;
    children: React.ReactNode;
}

export const IconModal = ({ id, children }: IconModalProps) => {
    const showModal = () => {
        // @ts-ignore
        window[id].showModal();
    }

    return (
        <>
            <button onClick={showModal}>Edit</button>
            <dialog id={id} className="modal">
                <form method="dialog" className="modal-box">
                    <button formMethod="dialog" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        X
                    </button>
                    {children}
                </form>
            </dialog>
        </>
    )
}


export const YearSelect = ({disabled, today, changeYear}) => {
    const years: number[] = [];

    for (let i= 0; i <= 2; i++) {
        years.push(today.getFullYear() + i);
    }

    return (
        <select
            onChange={e => changeYear(e.target.value)}
            defaultValue="Year"
            disabled={disabled}
            className="select max-w-xs">
            <option disabled>Year</option>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
    )
}

export const monthName = (id: string) => {
    const month = parseInt(id);
    if (!month) return "";
    switch (month) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "";
    }
};

export const MonthSelect = ({disabled, today, changeMonth}) => {
    const months: number[] = [];

    for (let i = today.getMonth(); i < 12; i++) {
        months.push(i + 1);
    }

    return (
        <select
            onChange={(e) => {changeMonth(e.target.value)}}
            defaultValue="Month"
            disabled={disabled}
            className="select max-w-xs">
            <option disabled>Month</option>
            {months.map(month => <option key={month} value={month}>{monthName(`${month}`)}</option>)}
        </select>
    )
}

///////////////////////////////////////////////////////////////////////////////////////

const AddGoalButton = () => {
    return <>
        +
        <span>Add Goal</span>
    </>
}

const ModalWrapper = ({ type, children, id=null }) => {
    return type === "add" && !id
        ? <ButtonModal
            id="goal_modal"
            buttonClass="btn btn-primary"
            Button={AddGoalButton}>
            {children}
        </ButtonModal>
        : <IconModal id={`goal_edit_${id}`}>
            { children }
        </IconModal>

}

export const GoalGorm = ({ goal=null }) => {
    const today = new Date();
    const type = goal ? "edit" : "add";

    const goalReducer = (state, action) => {
        switch(action.type) {
            case "default":
                return {
                    isSaved: false,
                    year: goal?.year || today.getFullYear(),
                    month: goal?.month || today.getMonth() + 1,
                    title: goal?.title || "",
                    description: goal?.description || "",
                    complete: false
                }
            case "title":
                return { ...state, title: action.value }
            case "description":
                return { ...state, description: action.value }
            case "isSaved":
                return { ...state, isSaved: !state.isSaved }
            case "month":
                return { ...state, month: action.value }
            case "year":
                return { ...state, year: action.value }
            default:
                console.error("action type was not recongized", action.type);
                return state;
        }
    }

    const [state, dispatch] = useReducer(goalReducer, {
        isSaved: false,
        year: goal?.year || today.getFullYear(),
        month: goal?.month || today.getMonth() + 1,
        title: goal?.title || "",
        description: goal?.description || "",
        complete: false
    });

    const save = (e) => {
        console.log("saving goal")
        e.preventDefault();
        // TODO: Add validation

        if (type === "add") {
            console.log("add");
        } else {
            console.log("update")
        }
    }

    const handleInput = (e) => {
        if (e.target.name === "title") {
            dispatch({ type: "title", value: e.target.value })
        } else if (e.target.name === "description") {
            dispatch({ type: "description", value: e.target.value })
        }
    }

    const changeMonth = (month: number) => {
        dispatch({ type: "month", value: month })
    }

    const changeYear = (year: number) => {
        dispatch({ type: "year", value: year });
    }

    useEffect(() => {
        return () => {
            dispatch({ type: "default" })
        }
    }, [])

    return (
        <ModalWrapper type={type} id={goal?.id}>
            <h1 className="text-xl font-bold border-b border-primary">Add Goal</h1>
            <div className="form-control w-full my-2">
                <label className="label">
                    <span className="label-text">Goal Complete Date</span>
                </label>
                <div className="join">
                    <input onClick={() => { dispatch({ type: "isSaved" } )}}
                           className="join-item btn"
                           checked={state.isSaved}
                           type="checkbox"
                           name="saved"
                           aria-label="Saved"
                    />
                    <YearSelect changeYear={changeYear} today={today} disabled={state.isSaved}/>
                    <MonthSelect changeMonth={changeMonth} today={today} disabled={state.isSaved}/>
                </div>
            </div>
            <div>
                <div className="form-control w-full max-w-xs my-2">
                    <label className="label">
                        <span className="label-text">Goal Title</span>
                    </label>
                    <input name="title"
                           className="input input-bordered w-full max-w-xs"
                           value={state.title}
                           onChange={handleInput}
                           type="text"
                           placeholder="Complete ____ certification"
                    />
                </div>
            </div>
            <div className="form-control my-2">
                <label className="label">
                    <span className="label-text">Goal Description</span>
                </label>
                <textarea name="description"
                          className="textarea textarea-bordered h-24"
                          value={state.description}
                          onChange={handleInput}
                          placeholder="I'm going to complete lastest certification"
                />
            </div>
            <div className="flex flex-row justify-between items-center my-5">
                <button formMethod="dialog" className="btn btn-outline btn-secondary">
                    Cancel
                </button>
                <div className="flex flex-row items-center gap-4">
                    <button onClick={() => {}} className="btn btn-outline btn-error">
                        Delete
                    </button>
                    <button onClick={save} className="btn btn-primary">
                        Save
                    </button>
                </div>
            </div>
        </ModalWrapper>
    )
}
