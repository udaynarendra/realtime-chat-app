type ApiResponse<T>={
success:string;
message?:string;
data?:T;
}
export const apiResponse=<T>(success:string,message?:string,data?:T):ApiResponse<T>=>{
    return {
        success,
         ...(message !== undefined && { message }),
        ...(data !== undefined && { data })
    }
}