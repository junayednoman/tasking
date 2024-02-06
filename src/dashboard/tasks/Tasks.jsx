import SectionContainer from "../../components/section container/SectionContainer";
import Btn from "../../components/btn/Btn";
import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const Tasks = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    // load todo items from DB
    const { data: todoItems, isPending } = useQuery({
        queryKey: ["todoItems"],
        queryFn: async () => {
            const res = await axiosSecure.get("/my-tasks");
            return res.data;
        }
    })
    const [loadedItems, setLoadedItems] = useState(todoItems);


    const [todoTasks, setTodoTasks] = useState(
        [
            { id: 'task-1', content: 'Task 1' },
            { id: 'task-2', content: 'Task 2' },
            { id: 'task-3', content: 'Task 3' }
        ]
    );
    const [ongoingTasks, setOngoingTasks] = useState(
        [
            // { id: 'task-4', content: 'Task 4' },
            // { id: 'task-5', content: 'Task 5' },
            // { id: 'task-6', content: 'Task 6' }
        ]
    );
    const [completedTasks, setCompletedTasks] = useState(
        [
            { id: 'task-7', content: 'Task 7' },
            { id: 'task-8', content: 'Task 8' },
            { id: 'task-9', content: 'Task 9' }
        ]
    );
    const handleTaskSubmit = (data) => {
        data.status = "to-do"
        axiosSecure.post('/tasks', data)
            .then(res => {
                console.log(res.data);
                if (res.data.acknowledged === true) {
                    toast.success("Task added successfully!😊")
                    reset();
                }
            })
    }
    return (
        <div className="md:py-20 py-12">
            <SectionContainer>
                <div id="items" className="grid grid-cols-3 md:gap-4">
                    <div className="p-5 pt-0 bg-[#D9E1FC] rounded-md space-y-3 h-fit">
                        <h4 className="pt-5">To-Do</h4>
                        <div id="innerItems1">
                            <ReactSortable
                                group={"shared"}
                                animation={100}
                                list={todoTasks}
                                setList={setTodoTasks}
                            >
                                {
                                    todoTasks.length < 1 ? <p className="text-[#5D7ADB] font-semibold mb-3">No task to do</p> : todoTasks.map(task => (
                                        <div key={task.id} className="bg-white rounded-[4px] py-2 px-3 cursor-grabbing mb-3">
                                            <p>{task.content}</p>
                                        </div>
                                    ))
                                }
                            </ReactSortable>
                        </div>
                        <span onClick={() => document.getElementById('todo-modal').showModal()}>
                            <Btn text={"Add New Task"} fullWidth={true}></Btn>
                        </span>
                    </div>
                    <div className="p-5 pt-0 bg-[#D9E1FC] rounded-md space-y-3 h-fit">
                        <h4 className="pt-5">Ongoing</h4>
                        <div id="innerItems1">
                            <ReactSortable
                                group={"shared"}
                                animation={100}
                                list={ongoingTasks}
                                setList={setOngoingTasks}
                            >
                                {
                                    ongoingTasks.length < 1 ? <p className="text-[#5D7ADB] font-semibold">No task ongoing</p> : ongoingTasks.map(task => (
                                        <div key={task.id} className="bg-white rounded-[4px] py-2 px-3 cursor-grabbing mb-3">
                                            <p>{task.content}</p>
                                        </div>
                                    ))
                                }
                            </ReactSortable>
                        </div>

                    </div>
                    <div className="p-5 pt-0 bg-[#D9E1FC] rounded-md space-y-3 h-fit">
                        <h4 className="pt-5">Completed</h4>
                        <div id="innerItems1">
                            <ReactSortable
                                group={"shared"}
                                animation={100}
                                list={completedTasks}
                                setList={setCompletedTasks}
                            >
                                {
                                    completedTasks.length < 1 ? <p className="text-[#5D7ADB] font-semibold">No task completed</p> : completedTasks.map(task => (
                                        <div key={task.id} className="bg-white rounded-[4px] py-2 px-3 cursor-grabbing mb-3">
                                            <p>{task.content}</p>
                                        </div>
                                    ))
                                }
                            </ReactSortable>
                        </div>

                    </div>
                </div>

                {/* modal for todo */}
                <dialog id="todo-modal" className="modal">
                    <div className="modal-box max-w-2xl">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="absolute right-6 top-4 text-2xl">✕</button>
                        </form>
                        {/* add task form */}
                        <h4 className="text-center text-2xl mb-6">Add a new task</h4>
                        <form onSubmit={handleSubmit(handleTaskSubmit)}>
                            <label htmlFor="title" className="mt-3 block">
                                <span className="font-medium">Title</span>
                                <input required {...register("title")} id="title" type="text" placeholder="Title" className="input input-bordered w-full mt-1" />
                            </label>

                            <div className="flex gap-3">
                                <label htmlFor="deadline" className="mt-3 block w-1/2">
                                    <span className="font-medium">Deadline</span>
                                    <input required {...register("deadline")} id="deadline" type="date" placeholder="deadline" className="input input-bordered w-full mt-1" />
                                </label>

                                <label htmlFor="priority" className="mt-3 block w-1/2">
                                    <span className="font-medium">Priority</span>
                                    <select defaultValue={"Set priority"} required {...register("priority")} id="priority" className="select select-bordered w-full mt-1">
                                        <option>High</option>
                                        <option>Moderate</option>
                                        <option>Low</option>
                                    </select>
                                </label>
                            </div>

                            <label htmlFor="description" className="mt-3 block mb-3">
                                <span className="font-medium">Description</span>
                                <textarea required {...register("description")} id="description" className="textarea textarea-bordered h-[100px] w-full" placeholder="Description"></textarea>
                            </label>
                            <Btn text={"Add Task"} fullWidth={true}></Btn>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

            </SectionContainer>
            <ToastContainer
                autoClose={1600}
            ></ToastContainer>
        </div>

    );
};

export default Tasks;
