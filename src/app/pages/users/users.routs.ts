import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

export const UsersRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'list'


            },
            {
                path: 'list',
                component: UserListComponent,
            },

        ],
    },
];
