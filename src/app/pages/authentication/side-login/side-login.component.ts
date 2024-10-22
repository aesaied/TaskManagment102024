import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { ValidationPipe } from 'src/app/pipes/validation.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, ValidationPipe
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  constructor(private router: Router) { }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.authService.login(this.form.value.username!, this.form.value.password!).subscribe({

      next: () => {

        this.toastr.success("Login success", "Success!");
        this.router.navigate(['/dashboard'])

      },

      error: (msg) => {

        this.toastr.error(msg, "Error!");
      }

    });

    ;

  }
}
