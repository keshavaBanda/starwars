import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { PeopleListComponent } from './components/people-list/people-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: PeopleListComponent
            },
            {
                path: 'people-details/:id',
                component: PeopleDetailsComponent
            }
        ]
    },

];
