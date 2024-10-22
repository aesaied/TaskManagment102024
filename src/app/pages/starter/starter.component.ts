import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppNewCustomersComponent } from 'src/app/components/new-customers/new-customers.component';
import { AppTotalIncomeComponent } from 'src/app/components/total-income/total-income.component';
import { AppDailyActivitiesComponent } from 'src/app/components/daily-activities/daily-activities.component';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { AppRevenueProductComponent } from 'src/app/components/revenue-product/revenue-product.component';
import { AppRevenueForecastComponent } from 'src/app/components/revenue-forecast/revenue-forecast.component';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { catchError, map, Observable, retry, tap } from 'rxjs';
import { Weather } from 'src/app/models/weather';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppNewCustomersComponent,
    AppTotalIncomeComponent,
    AppDailyActivitiesComponent,
    AppBlogCardsComponent,
    AppRevenueProductComponent,
    AppRevenueForecastComponent, CommonModule
  ],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent implements OnInit {

  weatherData$: Observable<Weather[]>
  userList: User[];

  refreshWeather() {

    this.weatherData$ = this.http.get<Weather[]>(
      'https://localhost:7123/WeatherForecast');

  }
  ngOnInit(): void {


    this.weatherData$ = this.http.get<Weather[]>(
      'https://localhost:7123/WeatherForecast');

    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(

      retry(3),

      map((users) => {

        users.push({ id: 99, name: "atallah", email: "a@a.ps" });

        return users;
      }),

      tap((data) => {
        localStorage.setItem("USERS", JSON.stringify(data));

      }
      ),
      catchError((error) => {


        let msg = "Error occured!"

        if (error.status == 0) {
          msg = "Please check  internet  connection!";
        }
        else if (error.status == 404) {
          msg = "Invalid url!";
        }
        throw msg;

      })

    ).subscribe({
      next: (data) => {
        this.userList = data;

      }
      , error: (err) => {

        alert(err);

      }

    });
  }


  http = inject(HttpClient);




}
