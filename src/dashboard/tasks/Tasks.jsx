import SectionContainer from "../../components/section container/SectionContainer";
import Btn from "../../components/btn/Btn";
import { ReactSortable } from "react-sortablejs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import loadingGIF from "../../assets/loading.gif"
import TaskItem from "../../components/task item/TaskItem";

const Tasks = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const [myTodoTasks, setMyTodoTasks] = useState([])
    const [myOngoingTasks, setMyOngoingTasks] = useState([])
    const [myCompletedTasks, setMyCompletedTasks] = useState([])
    const addTaskMutation = useMutation({
        mutationFn: async (newTask) => {
            return axiosSecure.post('/tasks', newTask)
        },
    })
    // load todo items from DB
    const { isPending, isError, data: taskItems, error, refetch, } = useQuery({
        queryKey: ["taskItems"],
        queryFn: async () => {
            const res = await axiosSecure.get("/my-tasks");
            return res.data;
        }
    })
    const myTodoTasks2 = taskItems?.filter(loadedItem => loadedItem.status === "to-do");
    const myOngoingTasks2 = taskItems?.filter(loadedItem => loadedItem.status === "ongoing");
    const myCompletedTasks2 = taskItems?.filter(loadedItem => loadedItem.status === "completed");
    useEffect(() => {
        setMyOngoingTasks(myOngoingTasks2);
        setMyTodoTasks(myTodoTasks2);
        setMyCompletedTasks(myCompletedTasks2);
    }, [taskItems])

    // function to post task item to database
    const handleTaskSubmit = (data) => {
        data.status = "to-do"
        addTaskMutation.mutateAsync(data)
            .then(res => {
                console.log(res.data);
                if (res.data.acknowledged === true) {
                    toast.success("Task added successfully!😊")
                    reset();
                    refetch();
                }
            })
    }

    // const handle options
    const handleShowOptions = (id) => {
        // console.log(id);
    }


    // show error message if occurs any error while fetching the task data from DB
    if (isError) {
        return (
            <div className="text-center mt-32">
                <h2 className="text-4xl mb-2">{error.message} 😔</h2>
                <p>Please try again later</p>
            </div>
        )
    }
    if (isPending) {
        return (
            <div className="h-[100vh] flex justify-center items-center">
                <img src={loadingGIF}></img>
            </div>
        )
    }
    return (
        <>
            <SectionContainer>
                <div id="items" className="grid grid-cols-3 md:gap-4">
                    <div className="p-5 pt-0 bg-[#D9E1FC] rounded-md space-y-3 h-fit">
                        <h4 className="pt-5">To-Do</h4>
                        <div id="innerItems1">
                            {
                                myTodoTasks &&
                                <ReactSortable
                                    group={"shared"}
                                    animation={100}
                                    list={myTodoTasks}
                                    setList={setMyTodoTasks}
                                >
                                    {
                                        myTodoTasks?.length < 1 ? <p className="text-[#5D7ADB] font-semibold mb-3">No task to do</p> : myTodoTasks?.map(task => (
                                            <TaskItem handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
                                        ))
                                    }
                                </ReactSortable>
                            }
                        </div>
                        <span onClick={() => document.getElementById('todo-modal').showModal()}>
                            <Btn text={"Add New Task"} fullWidth={true}></Btn>
                        </span>

                    </div>
                    <div className="p-5 pt-0 bg-[#D9E1FC] rounded-md space-y-3 h-fit">
                        <h4 className="pt-5">Ongoing</h4>
                        <div id="innerItems1">
                            {
                                myOngoingTasks &&
                                <ReactSortable
                                    group={"shared"}
                                    animation={100}
                                    list={myOngoingTasks}
                                    setList={setMyOngoingTasks}
                                >
                                    {
                                        myOngoingTasks.length < 1 ? <p className="text-[#5D7ADB] font-semibold">No task ongoing</p> : myOngoingTasks.map(task => (
                                            <TaskItem handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
                                        ))
                                    }
                                </ReactSortable>
                            }
                        </div>

                    </div>
                    <div className="p-5 pt-0 bg-[#D9E1FC] rounded-md space-y-3 h-fit">
                        <h4 className="pt-5">Completed</h4>
                        <div id="innerItems1">
                            {
                                myCompletedTasks &&
                                <ReactSortable
                                    group={"shared"}
                                    animation={100}
                                    list={myCompletedTasks}
                                    setList={setMyCompletedTasks}
                                >
                                    {
                                        myCompletedTasks.length < 1 ? <p className="text-[#5D7ADB] font-semibold">No task completed</p> : myCompletedTasks.map(task => (
                                            <TaskItem handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
                                        ))
                                    }
                                </ReactSortable>
                            }
                        </div>

                    </div>
                </div >

                {/* modal for todo */}
                < dialog id="todo-modal" className="modal" >
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
                </dialog >

            </SectionContainer >
            <ToastContainer
                autoClose={1600}
            ></ToastContainer>
        </ >

    );
};

export default Tasks;


