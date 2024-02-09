import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrPowerCycle } from "react-icons/gr";
import { FaRegCircleCheck } from "react-icons/fa6";




const TaskItem = ({ task, handleShowOptions }) => {
    return (
        <div id={task._id} className="bg-white rounded-[4px] py-2 px-3 cursor-pointer mb-3 flex items-center justify-between">
            <div>
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
            <details className="dropdown">
                <summary onClick={() => handleShowOptions(task._id)} className="p-1 btn bg-transparent border-0 shadow-none hover:bg-transparent">
                    <div className='w-[20px] py-2 flex justify-center'>
                        <BsThreeDotsVertical className='text-lg'></BsThreeDotsVertical>
                    </div>
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[180px] font-medium">
                    <p className='m-1'>Mark as:</p>
                    <li><a><GrPowerCycle className='text-lg' />Ongoing</a></li>
                    <li><a><FaRegCircleCheck className='text-lg' />Completed</a></li>
                    <hr className='my-2' />
                    <li><a><FaRegEye className='text-lg' />View Details</a></li>
                    <li><a><FaRegEdit className='text-lg' />Edit Task</a></li>
                    <li><a className='text-red-600'><RiDeleteBin6Line className='text-lg' />Delete Task</a></li>
                </ul>
            </details>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object,
    handleShowOptions: PropTypes.func
}

export default TaskItem;