
import { GrPowerCycle } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import PropTypes from 'prop-types';

const TaskDetailsModal = ({ detailsTaskModalData }) => {
    const { detailedTask, loadingGIF, handleUpdateTaskStatus, handleDeleteTaskOnModal, handleShowDeleteConfirmation, handleUpdateTask, } = detailsTaskModalData;

    return (
        <>
            < dialog id="taskDetails" className="modal" >
                <div className="modal-box max-w-2xl p-8 py-12">
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
                                            <hr className='my-2' />

                                            {
                                                detailedTask?.status != "completed" &&
                                                <li onClick={handleUpdateTask}><a><FaRegEdit className='text-lg' />Edit Task</a></li>
                                            }
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
        </>
    );
};

TaskDetailsModal.propTypes = {
    detailsTaskModalData: PropTypes.object
}

export default TaskDetailsModal;