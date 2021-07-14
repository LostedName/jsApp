
export async function respond(res,status,promise){
    try{
        return await res.status(status).json(await promise);
    }catch(err){
        return res.status(err.status || 500).json(err);
    }

}