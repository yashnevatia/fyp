import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage.service'

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
})
export class WorkoutDetailsPage implements OnInit {

  private data : any ;
  private exercises : any;
  private reps_per_set : number;
  constructor(private data_store : DataStorageService) { 
  	this.data = this.data_store.getWorkoutDetails();
  	this.exercises = Object.keys(this.data);
  	this.reps_per_set = this.data["reps_per_set"];
  }

  ngOnInit() {
  }

}
