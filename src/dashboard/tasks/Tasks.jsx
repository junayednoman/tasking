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
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import useUpdateTaskStatus from "../../custom hooks/update task status/useUpdateTaskStatus";
import AddTaskModal from "../../components/add task modal/AddTaskModal";
import TaskDetailsModal from "../../components/task details modal/TaskDetailsModal";
import UpdateTaskModal from "../../components/update task modal/UpdateTaskModal";

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
            });
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

    const handleUpdateTask = (id) => {
        console.log('object');
        document.getElementById("taskDetails").close();
        document.getElementById("update-task-modal").showModal();
        axiosSecure.get(`/tasks/${user?.email}/${id}`)
            .then(res => {
                setDetailedTask(res.data)
            });
    }

    // const handle options
    const handleShowOptions = (id) => {
        setTaskItemId(id)
    }

    // data for task details modal
    const detailsTaskModalData = {
        detailedTask,
        loadingGIF,
        handleUpdateTaskStatus,
        handleUpdateTask,
        handleDeleteTaskOnModal,
        handleShowDeleteConfirmation,
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
                                                    <TaskItem detailedTask={detailedTask} handleUpdateTask={handleUpdateTask} handleUpdateTaskStatus={handleUpdateTaskStatus} handleTaskDelete={handleTaskDelete} handleTaskDetails={handleTaskDetails} handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
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
                                                    <TaskItem detailedTask={detailedTask} handleUpdateTask={handleUpdateTask} handleUpdateTaskStatus={handleUpdateTaskStatus} handleTaskDelete={handleTaskDelete} handleTaskDetails={handleTaskDetails} handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
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
                                                    <TaskItem detailedTask={detailedTask} handleUpdateTask={handleUpdateTask} handleUpdateTaskStatus={handleUpdateTaskStatus} handleTaskDelete={handleTaskDelete} handleTaskDetails={handleTaskDetails} handleShowOptions={handleShowOptions} key={task._id} task={task}></TaskItem>
                                                ))
                                            }
                                        </ReactSortable>
                                    }
                                </div>

                            </div>
                        </div >
                }

                {/* modal for adding tasks */}
                <AddTaskModal handleSubmit={handleSubmit} handleTaskSubmit={handleTaskSubmit} register={register}></AddTaskModal>

                {/* modal for todo details */}
                <TaskDetailsModal detailsTaskModalData={detailsTaskModalData}></TaskDetailsModal>

                {/* modal for updating task */}
                <UpdateTaskModal taskItems={taskItems}></UpdateTaskModal>

            </SectionContainer >
            <ToastContainer
                autoClose={1600}
            ></ToastContainer>
        </ >

    );
};

export default Tasks;


