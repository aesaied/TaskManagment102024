import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';


export const ProjectsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'list'


            },
            {
                path: 'list',
                component: ProjectListComponent,
            },

        ],
    },
];
