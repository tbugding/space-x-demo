import axios, {CreateAxiosDefaults} from 'axios'

const request = axios.create({
    baseURL: 'https://api.spacexdata.com/v5/'
} as CreateAxiosDefaults);

request.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        }
        return Promise.reject(new Error('server error'))
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default request
