import request from './request.ts'
import { SpacexLaunchData, SpacexLaunchItem} from "../types";

// /**
//  * get launches
//  */
// export const getLaunches= async (): Promise<SpacexLaunchItem[] > => {
//     return await request.get('/launches')
// }


/**
 * get details by id
 * @param id
 */
export const getDetails = async (id:string): Promise<SpacexLaunchItem | undefined > => {
    return await request.get(`/launches/${id}`)
}

/**
 * Search data by condition
 * @params data
 */
export const getLaunch = async (data:any):Promise<SpacexLaunchData | undefined>=>{
    return await request.post('/launches/query', data)
}