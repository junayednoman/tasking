import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrPowerCycle } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";


const TaskItem = ({ task, handleShowOptions, handleTaskDetails, handleTaskDelete, handleUpdateTaskStatus, handleUpdateTask }) => {
    return (
        <div id={task._id} className="bg-white rounded-[4px] py-2 px-3 cursor-pointer mb-3 flex items-center justify-between">
            <div onClick={() => handleTaskDetails(task._id)} className='w-[90%]'>
                <div className="tooltip tooltip-right" data-tip={`${task.priority === "High" ? 'High Priority' :
                    (
                        task.priority === "Moderate" ? 'Moderate Priority' : 'Low Priority'
                    )
                    }`}>
                    <div className={`h-[9px] w-[40px] rounded-md ${task.priority === "High" ? 'bg-red-500' : (task.priority === "Moderate" ? 'bg-yellow-500' : 'bg-green-500')}`}></div>
                </div>
                {/* show task name */}
                <p className='text-sm'>{task.title}</p>
            </div>
            <div className='w-[6%]'>
                <details className="dropdown">
                    <summary onClick={() => handleShowOptions(task._id)} className="p-1 btn bg-transparent border-0 shadow-none hover:bg-transparent">
                        <div className='w-[20px] py-2 flex justify-center mx-auto'>
                            <BsThreeDotsVertical className='text-lg'></BsThreeDotsVertical>
                        </div>
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[180px] font-medium">
                        <p className='m-1'>Mark as:</p>
                        {
                            task?.status != "to-do" &&
                            <li onClick={() => handleUpdateTaskStatus("to-do")}><a><GrPowerCycle className='text-lg' />To-Do</a></li>
                        }
                        {
                            task?.status != "ongoing" &&
                            <li onClick={() => handleUpdateTaskStatus("ongoing")}><a><GrPowerCycle className='text-lg' />Ongoing</a></li>
                        }
                        {
                            task?.status != "completed" &&
                            <li onClick={() => handleUpdateTaskStatus("completed")}><a><FaRegCircleCheck className='text-lg' />Completed</a></li>
                        }


                        <hr className='my-2' />
                        <li onClick={() => handleTaskDetails(task._id)}><a><FaRegEye className='text-lg' />View Details</a></li>
                        {
                            task?.status != "completed" &&
                            <li onClick={handleUpdateTask}><a><FaRegEdit className='text-lg' />Edit Task</a></li>
                        }
                        <li onClick={() => handleTaskDelete(task._id)}><a className='text-red-600'><RiDeleteBin6Line className='text-lg' />Delete Task</a></li>
                    </ul>
                </details>
            </div>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object,
    handleShowOptions: PropTypes.func,
    handleTaskDetails: PropTypes.func,
    handleTaskDelete: PropTypes.func,
    handleUpdateTaskStatus: PropTypes.func,
    handleUpdateTask: PropTypes.func,
    detailedTask: PropTypes.object
}

export default TaskItem;