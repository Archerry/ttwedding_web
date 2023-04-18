import {http} from '../index';
import {LoginModel} from './type';

export const fetchLogin = (data: object) => {
    return http.post<LoginModel>('/api/tw-user/login', data)
}
