import { Routes } from "@angular/router";


export const Feed_Routes: Routes=[
    {
        path:'feed',
        loadComponent: () => import('./feed-page/feed-page.component').then(m => m.FeedPageComponent)
    }
];