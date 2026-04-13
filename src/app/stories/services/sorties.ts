import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment';
import { NEWSTORY } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class Sorties {
  private http=inject(HttpClient)
baseUrl=signal<string>(environment.apiUrl)
  getAllStories(){
    return this.http.get(`${this.baseUrl()}stories`)
  }

  
  addNewStories(newStory:NEWSTORY){
      return this.http.post(`${this.baseUrl()}stories`,newStory)
  
  }
  updateStory(id: number, storyData: NEWSTORY) {
  return this.http.put(`${this.baseUrl()}stories/${id}`, storyData);
}
}
