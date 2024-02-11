import Btn from "../btn/Btn";
import PropTypes from 'prop-types';

const AddTaskModal = ({ handleSubmit, register, handleTaskSubmit }) => {
    return (
        <>
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
                            <span className="font-medium">Title*</span>
                            <input required {...register("title")} id="title" type="text" placeholder="Title" className="input input-bordered w-full mt-1" />
                        </label>

                        <div className="flex gap-3">
                            <label htmlFor="deadline" className="mt-3 block w-1/2">
                                <span className="font-medium">Deadline*</span>
                                <input required {...register("deadline")} id="deadline" type="date" placeholder="deadline" className="input input-bordered w-full mt-1" />
                            </label>

                            <label htmlFor="priority" className="mt-3 block w-1/2">
                                <span className="font-medium">Priority*</span>
                                <select required {...register("priority")} id="priority" className="select select-bordered w-full mt-1">
                                    <option value={""} selected disabled>Set Priority</option>
                                    <option value={"High"}>High</option>
                                    <option value={"Moderate"}>Moderate</option>
                                    <option value={"Low"}>Low</option>
                                </select>
                            </label>
                        </div>

                        <label htmlFor="description" className="mt-3 block mb-3">
                            <span className="font-medium">Description*</span>
                            <textarea required {...register("description")} id="description" className="textarea textarea-bordered h-[100px] w-full" placeholder="Description"></textarea>
                        </label>
                        <Btn text={"Add Task"} fullWidth={true}></Btn>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </>
    );
};

AddTaskModal.propTypes = {
    handleSubmit: PropTypes.func,
    handleTaskSubmit: PropTypes.func,
    register: PropTypes.func
}

export default AddTaskModal;