import { Routes } from "@angular/router";


export const User_Profile_Routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/user-profile-page/user-profile-page.component').then(m => m.UserProfilePageComponent)
    }
]
