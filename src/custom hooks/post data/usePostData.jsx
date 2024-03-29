import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const usePostData = ({url}) => {
    const axiosSecure = useAxiosSecure();
    const mutation = useMutation({
        mutationFn: async (data) => {
            return await axiosSecure.post(url, data)
        },
    })
    return mutation;
};

export default usePostData;