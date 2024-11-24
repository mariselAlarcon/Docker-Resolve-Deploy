import { Routes } from '@angular/router';
import { AdminHubLayoutComponent } from './admin-hub/admin-hub-layout/admin-hub-layout.component';
import { AdminHubHomeComponent } from './admin-hub/admin-hub-home/admin-hub-home.component';
import { UserListComponent } from './admin-hub/user/user-list/user-list.component';
import { UserFormComponent } from './admin-hub/user/user-form/user-form.component';
import { MemberListComponent } from './admin-hub/member/member-list/member-list.component';
import { ExerciseListComponent } from './admin-hub/exercise/exercise-list/exercise-list.component';
import { ExerciseFormComponent } from './admin-hub/exercise/exercise-form/exercise-form.component';
import { ClassListComponent } from './admin-hub/class/class-list/class-list.component';
import { ClassFormComponent } from './admin-hub/class/class-form/class-form.component';
import { CoachListComponent } from './admin-hub/coach/coach-list/coach-list.component';
import { CoachFormComponent } from './admin-hub/coach/coach-form/coach-form.component';
import { EventListComponent } from './admin-hub/event/event-list/event-list.component';
import { EventFormComponent } from './admin-hub/event/event-form/event-form.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ExerciseCatalogComponent } from './member-hub/exercise-catalog/exercise-catalog.component';
import { FeedbackFormComponent } from './member-hub/feedback-form/feedback-form.component';
import { HabitTrackerComponent } from './member-hub/habit-tracker/habit-tracker.component';
import { PaymentFormComponent } from './member-hub/payment-form/payment-form.component';
import { MembershipPaymentControlComponent } from './member-hub/membership-payment-control/membership-payment-control.component';
import { ProgressRecordComponent } from './member-hub/progress/progress-record/progress-record.component';
import { ProgressTrackerComponent } from './member-hub/progress/progress-tracker/progress-tracker.component';
import { RoutineCreatorComponent } from './member-hub/routine-creator/routine-creator.component';
import { SavedRoutinesComponent } from './member-hub/saved-routines/saved-routines.component';
import { AttendanceHistoryComponent } from './worker-hub/attendance-history/attendance-history.component';
import { RecordAttendanceComponent } from './worker-hub/record-attendance/record-attendance.component';
import { MemberDetailsComponent } from './worker-hub/member-details/member-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EventsListComponent } from './events-list/events-list.component';
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { FeesListComponent } from './worker-hub/fees-list/fees-list.component';
import { PaymentRecordComponent } from './worker-hub/payment-record/payment-record.component';
import { MonthlyPlansComponent } from './monthly-plans/monthly-plans.component';

export const routes: Routes = [
    {
        path: 'admin-dashboard',
        component: AdminHubLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: AdminHubHomeComponent
            },{
                path: 'users',
                component: UserListComponent
            },{
                path: 'users/new',
                component: UserFormComponent
            },{
                path: 'users/edit/:id',
                component: UserFormComponent
            },{
                path: 'members',
                component: MemberListComponent
            },{
                path: 'members/new',
                component: UserFormComponent
            },{
                path: 'members/edit/:id',
                component: UserFormComponent
            },{
                path: 'exercises',
                component: ExerciseListComponent
            },{
                path: 'exercises/new',
                component: ExerciseFormComponent
            },{
                path: 'exercises/edit/:id',
                component: ExerciseFormComponent
            },{
                path: 'classes',
                component: ClassListComponent
            },{
                path: 'classes/new',
                component: ClassFormComponent
            },{
                path: 'classes/edit/:id',
                component: ClassFormComponent
            },{
                path: 'coaches',
                component: CoachListComponent
            },{
                path: 'coaches/new',
                component: CoachFormComponent
            },{
                path: 'coaches/edit/:id',
                component: CoachFormComponent
            },{
                path: 'events',
                component: EventListComponent
            },{
                 path: 'events/new',
                 component: EventFormComponent
            },{
                path: 'events/edit/:id',
                 component: EventFormComponent
            },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'monthlyPlans',
                component: MonthlyPlansComponent
            },
            {
                path: 'events',
                component: EventsListComponent
            },
            {
                path: 'coaches',
                component: CoachesListComponent
            },
            {
                path: 'exercises/catalog',
                component: ExerciseCatalogComponent
            },
            {
                path: 'feedbacks/new',
                component: FeedbackFormComponent
            },
            {
                path: 'habitsTracker',
                component: HabitTrackerComponent
            },
            {
                path: 'membershipPayments/new',
                component: PaymentFormComponent
            },
            {
                path: 'membershipPayments',
                component: MembershipPaymentControlComponent
            },
            {
                path: 'progresses/record',
                component: ProgressRecordComponent
            },
            {
                path:'progresses/tracker',
                component: ProgressTrackerComponent
            },
            {
                path: 'routines/creator',
                component: ExerciseCatalogComponent
            },
            {
                path: 'routines',
                component: SavedRoutinesComponent
            },

            //WORKER
            {
                path:'fees/record',
                component: PaymentRecordComponent
            }, 
            {
                path: 'attendances/history',
                component: AttendanceHistoryComponent
            },
            {
                path: 'attendances/record',
                component: RecordAttendanceComponent
            },{
                path: 'members/details',
                component: MemberDetailsComponent
            },
            {
                path: 'fee/payment',
                component: PaymentFormComponent
            },
            {
                path: 'fees/details',
                component: FeesListComponent
            },
        ]
    }
];
