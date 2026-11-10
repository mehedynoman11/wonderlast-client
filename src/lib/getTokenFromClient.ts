import { authClient } from "./auth-client";

export const getTokenFromClient = async() => {
    const {data, error} = await authClient.token();
    // console.log(data);
    const token = data?.token;
    return token;
}