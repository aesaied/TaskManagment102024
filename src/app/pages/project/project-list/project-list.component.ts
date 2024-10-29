import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  ngOnInit(): void {
    this.getAll()
  }

  @ViewChild('#myAddInput') myAddInput: HTMLInputElement;

  projectService = inject(ProjectService)

  controlAdd = new FormControl('', { validators: [Validators.required, Validators.maxLength(100)] })
  controlUpdate = new FormControl('', { validators: [Validators.required, Validators.maxLength(100)] })

  $projects: Observable<Project[]>


  getAll() {


    this.$projects = this.projectService.getAll();
  }

  add() {
    if (this.controlAdd.valid) {
      this.projectService.add({ name: this.controlAdd.value! }).subscribe({

        next: () => {
          this.getAll(); this.controlAdd.reset();

          this.myAddInput.focus();
        }
      });

    }
  }

  delete(project: Project) {

    if (confirm(`Are you sure to  delete project '${project.name}'?`)) {

      this.projectService.delete(project.id!).subscribe({

        next: () => {
          this.getAll();

        }
      });


    }
  }

  currentEditProject?: Project;
  edit(project: Project) {
    this.currentEditProject = project;
    this.controlUpdate.setValue(project.name);
  }

  cancelEdit() {
    this.currentEditProject = undefined;
  }

  update() {

    if (this.controlUpdate.valid) {
      this.projectService.update({ name: this.controlUpdate.value!, id: this.currentEditProject?.id }).subscribe({

        next: () => {

          this.currentEditProject = undefined;
          this.getAll();


        }
      });

    }

  }




}
