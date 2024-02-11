import SectionContainer from "../../components/section container/SectionContainer";
import Btn from "../../components/btn/Btn";
import { ReactSortable } from "react-sortablejs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import loadingGIF from "../../assets/loading.gif"
import TaskItem from "../../components/task item/TaskItem";
import usePostData from "../../custom hooks/post data/usePostData";
import useGetData from "../../custom hooks/get data/useGetData";
import useContextData from "../../custom hooks/get context data/useContextData";
import notFound from "../../assets/not found.gif"
import useAxiosSecure from "../../custom hooks/useAxiosSecure";
import { GrPowerCycle } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import useUpdateTaskStatus from "../../custom hooks/update task status/useUpdateTaskStatus";

const Tasks = () => {
    const { user } = useContextData();
    const { register, handleSubmit, reset } = useForm();
    const [myTodoTasks, setMyTodoTasks] = useState([]);
    const [myOngoingTasks, setMyOngoingTasks] = useState([]);
    const [taskItemId, setTaskItemId] = useState("");
    const [myCompletedTasks, setMyCompletedTasks] = useState([]);
    // const [deleteItemId, setDeleteItemId] = useState("");
    const [detailedTask, setDetailedTask] = useState({});
    // mutation to add task
    const addTaskMutation = usePostData({ url: "/tasks" });
    // mutation for updating task status
    const statusMutation = useUpdateTaskStatus({ url: `/tasks/${user?.email}/${taskItemId}` });
    const axiosSecure = useAxiosSecure();
    // get task data based on user email
    const { isPending, data: taskItems, isError, error, refetch } = useGetData({ key: "my-tasks", url: `/tasks/${user?.email}` });
    // react mutation for deleting a task
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return await axiosSecure.delete(`/tasks/${user?.email}/${id}`)
        }
    });

    // filter task item by task status
    const myTodoTasks2 = taskItems?.filter(loadedItem => loadedItem.status === "to-do");
    const myOngoingTasks2 = taskItems?.filter(loadedItem => loadedItem.status === "ongoing");
    const myCompletedTasks2 = taskItems?.filter(loadedItem => loadedItem.status === "completed");
    useEffect(() => {
        setMyOngoingTasks(myOngoingTasks2);
        setMyTodoTasks(myTodoTasks2);
        setMyCompletedTasks(myCompletedTasks2);
    }, [taskItems])

    // show task details on clicking over task
    const handleTaskDetails = async (id) => {
        setTaskItemId(id);
        document.getElementById("taskDetails").showModal()
        axiosSecure.get(`/tasks/${user?.email}/${id}`)
            .then(res => {
                setDetailedTask(res.data)
            })
    }


    // function to post task item to database
    const handleTaskSubmit = (data) => {
        data.status = "to-do"
        data.userEmail = user?.email;
        data.userName = user?.displayName;
        data.userPhoto = user?.photoURL;
        if (user) {
            addTaskMutation.mutateAsync(data)
                .then(res => {
                    if (res.data.acknowledged === true) {
                        toast.success("Task added successfully!😊");
                        document.getElementById("todo-modal").close();
                        reset();
                        refetch();
                    }
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    }

    // handle task delete
    const handleTaskDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutateAsync(id)
                    .then(res => {
                        if (res.data.deletedCount === 1) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success"
                            });
                            document.getElementById("task-delete-confirmation").classList.add("hidden")
                            refetch();
                        }
                    })
            }
        });

    }
    const handleShowDeleteConfirmation = () => {
        const deleteConfirmationModal = document.getElementById("task-delete-confirmation");
        deleteConfirmationModal.classList.toggle("hidden");
    }

    const handleDeleteTaskOnModal = (id) => {
        deleteMutation.mutateAsync(id)
            .then(res => {
                if (res.data.deletedCount === 1) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success"
                    });
                    document.getElementById("task-delete-confirmation").classList.add("hidden");
                    document.getElementById("taskDetails").close();
                    refetch();
                }
            })
    }

    const handleUpdateTaskStatus = (status) => {
        const updates = { status: status }
        statusMutation.mutateAsync(updates)
            .then(res => {
                if (res?.data?.modifiedCount === 1) {
                    toast.success(`The task transferred to ${status}`);
                    refetch();
                    document.getElementById("taskDetails").close();
                }
            })
        // console.log(status);
    }

    // const handle options
    const handleShowOptions = (id) => {
        setTaskItemId(id)
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
                {
                    taskItems?.length <= 0 ?
                        <div className="text-center space-y-3">
                            <h4 className="text-3xl">No task available!</h4>
                            <img className="w-[200px] mx-auto" src={notFound} alt="" />
                            <p>Please add a task now to see the magic</p>
                            <div className="w-[400px] mx-auto mt-12">
                                <span onClick={() => document.getElementById('todo-modal').showModal()}>
                                    <Btn text={"Add New Task"} fullWidth={true}></Btn>
                                </span>
                            </div>
                        </div>
                        :
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
                                                    <TaskItem detailedTask={detailedTask} handleUpdateTaskStatus={handleUpdateTaskStatus} handleTaskDelete={handleTaskDelete} handleTaskDetails={handleTaskDetails} handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
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
                                                    <TaskItem detailedTask={detailedTask} handleUpdateTaskStatus={handleUpdateTaskStatus} handleTaskDelete={handleTaskDelete} handleTaskDetails={handleTaskDetails} handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
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
                                                    <TaskItem detailedTask={detailedTask} handleUpdateTaskStatus={handleUpdateTaskStatus} handleTaskDelete={handleTaskDelete} handleTaskDetails={handleTaskDetails} handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
                                                ))
                                            }
                                        </ReactSortable>
                                    }
                                </div>

                            </div>
                        </div >
                }


                {/* modal for adding todo */}
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

                {/* modal for todo details */}
                < dialog id="taskDetails" className="modal" >
                    <div className="modal-box max-w-2xl">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="absolute right-6 top-4 text-2xl">✕</button>
                        </form>
                        {/* modal content */}
                        {
                            !detailedTask ?
                                <div className="h-full flex justify-center items-center py-32">
                                    <img src={loadingGIF}></img>
                                </div>
                                :
                                <div>
                                    <div className="pr-8">
                                        <h4 className="text-xl font-semibold mb-1">{detailedTask?.title}</h4>
                                        <p>In: {detailedTask?.status}</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-x-6 mt-6">
                                        <div className="col-span-2">
                                            <div className=" border rounded-md p-3 h-fit">
                                                <p className="text-sm mb-4">{detailedTask?.description}</p>
                                                <p><span className="font-medium">Priority: </span><span className={`${detailedTask?.priority === "High" ? 'text-red-600' : (detailedTask?.priority === "Moderate" ? 'text-yellow-600' : 'text-green-600')}`}>{detailedTask?.priority}</span></p>
                                                <p className="mt-1"><span className="font-medium">Deadline: </span>{detailedTask?.deadline}</p>
                                            </div>
                                            <div className="flex gap-4 mt-5 items-center">
                                                <div className="w-[60px]">
                                                    <img className="rounded-full" src={detailedTask?.userPhoto} alt="" />
                                                </div>
                                                <div className="w-full">
                                                    <h5 className="text-sm font-semibold">{detailedTask?.userName}</h5>
                                                    <p className="text-sm">{detailedTask?.userEmail}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1 border rounded-md p-2 h-fit">
                                            <ul className="menu font-medium">
                                                <p className='m-1'>Mark as:</p>
                                                {
                                                    detailedTask?.status != "to-do" &&
                                                    <li onClick={() => handleUpdateTaskStatus("to-do")}><a><GrPowerCycle className='text-lg' />To-Do</a></li>
                                                }
                                                {
                                                    detailedTask?.status != "ongoing" &&
                                                    <li onClick={() => handleUpdateTaskStatus("ongoing")}><a><GrPowerCycle className='text-lg' />Ongoing</a></li>
                                                }
                                                {
                                                    detailedTask?.status != "completed" &&
                                                    <li onClick={() => handleUpdateTaskStatus("completed")}><a><FaRegCircleCheck className='text-lg' />Completed</a></li>
                                                }
                                                <li><a><FaRegEdit className='text-lg' />Edit Task</a></li>
                                                <li onClick={handleShowDeleteConfirmation}><a className='text-red-600'><RiDeleteBin6Line className='text-lg' />Delete Task</a></li>
                                                <div id="task-delete-confirmation" className="border p-3 rounded-md shadow-sm text-center absolute bottom-[15px] right-[190px] bg-white hidden">
                                                    <h6 className="font-semibold text-lg">Are you sure?</h6>
                                                    <p className="text-sm my-2">You want to delete the task?</p>
                                                    <button onClick={() => handleDeleteTaskOnModal(detailedTask?._id)} className="bg-[#6788f3] hover:bg-[#5d7adb] text-white text-sm py-2 px-5 font-medium duration-300 rounded-md">Yes, Delete</button>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                        }

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


