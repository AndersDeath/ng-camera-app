import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { CameraComponent } from './components/camera/camera.component';

const routes: Routes = [
  { path: '*', component: AppComponent },
  { path: 'camera', component: CameraComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
