
export interface userUseCaseInterf <TRequest,TResponse>{
    execute(request:TRequest):Promise<TResponse>;

}