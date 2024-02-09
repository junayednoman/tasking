import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useGetData = ({ key, url }) => {
    const axiosSecure = useAxiosSecure();
    const { isPending, data, isError, error, refetch } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const res = await axiosSecure.get(url);
            return res.data;
        }
    })
    return { isPending, data, isError, error, refetch };
};

export default useGetData;