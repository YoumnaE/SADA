import { environment } from "../../../environments/environment.development";

export const App_Apis ={
    auth:{
        register:`${environment.baseUrl}/users/signup`,
        login:`${environment.baseUrl}/users/signin`
    }
}