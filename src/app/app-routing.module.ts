import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'exercise', loadChildren: './exercise/exercise.module#ExercisePageModule' },
  { path: 'start', loadChildren: './start/start.module#StartPageModule' },
  { path: 'data', loadChildren: './data/data.module#DataPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
