import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useUpdateTaskStatus = ({ url }) => {
    const axiosSecure = useAxiosSecure();
    const mutation = useMutation({
        mutationFn: async (data) => {
            return await axiosSecure.patch(url, data);
        }
    })
    return mutation;
};

export default useUpdateTaskStatus;