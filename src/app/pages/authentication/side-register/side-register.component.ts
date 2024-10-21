import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { ValidationPipe } from 'src/app/pipes/validation.pipe';
import { compareValidator } from 'src/app/validators/compare.validator';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { F } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [ValidationPipe, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {

  errorDetail?: string;
  isBusy = false;
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {



  }


  form = new FormGroup({

    fullName: new FormControl('', { validators: [Validators.required, Validators.maxLength(100)] }),
    userName: new FormControl('', { validators: [Validators.required, Validators.maxLength(100)] }),
    email: new FormControl('', { validators: [Validators.required, Validators.maxLength(100), Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] }),
    confirmPassword: new FormControl('', { validators: [Validators.required, compareValidator('password')] }),



  });

  submit(): void {


    let request = this.http.post('https://localhost:7123/api/users/register', this.form.value);

    this.isBusy = true;
    request.subscribe({

      next: () => {

        this.isBusy = false;
        this.errorDetail = undefined;
        this.router.navigate(['/authentication/login']);
        this.toastr.success('Your registration complete successfully!', 'Congratulation')

      },
      error: (err) => {

        this.isBusy = false;
        this.errorDetail = err;

        this.toastr.error(err, 'Error!');

      }

    });
    // alert(JSON.stringify(this.form.value));


  }

}
