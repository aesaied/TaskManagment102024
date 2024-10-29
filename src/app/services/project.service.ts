import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

import { AppTokens } from '../app.tokens';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiPath = inject(AppTokens.API)

  constructor(private http: HttpClient, @Inject(AppTokens.API) api: string) {



  }

  /**
   * name
   */
  public getAll(): Observable<Project[]> {

    return this.http.get<Project[]>(`${this.apiPath}/projects`);
  }

  public add(project: Project): Observable<any> {
    return this.http.post(`${this.apiPath}/projects`, project);
  }

  public update(project: Project): Observable<any> {

    return this.http.put(`${this.apiPath}/projects/${project.id}`, project);
  }

  public delete(projectId: number): Observable<any> {

    return this.http.delete(`${this.apiPath}/projects/${projectId}`);
  }
}
