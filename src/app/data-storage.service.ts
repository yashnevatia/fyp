import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
	public workout_details : any
  constructor() { }

  setWorkoutDetails(params) {
  	this.workout_details = params;
  	console.log(this.workout_details);
  }

  getWorkoutDetails() {
  	return this.workout_details;
  }
}
