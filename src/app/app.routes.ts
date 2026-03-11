import { Routes } from '@angular/router';


import { Auth_Routes } from './features/auth/auth.routes';

import { Feed_Routes } from './features/feed/feed.routes';
import { User_Profile_Routes } from './features/user-profile/user-profile.routes';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./core/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children:Auth_Routes
    },

    {
        path:'',
        loadComponent: () => import('./core/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children:[
            {
                path:'feed',
                children:Feed_Routes
            },
            {
                path:'user-profile',
                children:User_Profile_Routes
            }
        ]
    },
    
    {
        path:'not-found',
        loadComponent: () => import('./features/static-pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
    {
        path:'**',
        redirectTo:'not-found'
    }
];
