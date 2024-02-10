import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useUpdateData = ({ url }) => {
    const axiosSecure = useAxiosSecure();
    const mutation = useMutation({
        mutationFn: async (data) => {
            return await axiosSecure.put(url, data);
        }
    })
    return mutation;
};

export default useUpdateData;