import axiosInterceptor from "./axiosInterceptor";

// Fetch users
export const fetchUserList = async () => {
    const response = await axiosInterceptor.get("/users/userlist");
    return response.data;
};

export const editUser = async (user, id ) => {
    const response = await axiosInterceptor.put(`/auth/user/${id}`, user);
    return response.data;
};
export const deleteUser = async ( id ) => {
    const response = await axiosInterceptor.delete(`/auth/user/${id}`);
    return response.data;
};
