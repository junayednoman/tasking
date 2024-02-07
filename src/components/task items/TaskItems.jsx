import PropTypes from 'prop-types';

const TaskItems = ({ task }) => {
    return (
        <div className="bg-white rounded-[4px] py-2 px-3 cursor-grabbing mb-3 flex items-center justify-between">
            <p>{task.title}</p>
            <div className="tooltip tooltip-right" data-tip={`${task.priority === "High" ? 'High Priority' :
                (
                    task.priority === "Moderate" ? 'Moderate Priority' : 'Low Priority'
                )
                }`}>
                <div className={`h-[12px] w-[40px] rounded-md ${task.priority === "High" ? 'bg-red-500' : (task.priority === "Moderate" ? 'bg-yellow-500' : 'bg-green-500')}`}></div>
            </div>
        </div>
    );
};

TaskItems.propTypes = {
    task: PropTypes.object
}

export default TaskItems;