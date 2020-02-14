import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {


  constructor(
    private httpClient: HttpClient
  ) {

  }

  /**
   * Create new Person
   * @param person 
   */
  public addPerson(person: Person) {
    return this.httpClient.post<Person>(environment.endPoinUrl.concat('/person/add'), person);
  }

  /**
   * Load Persons
   */
  getPersons() {
    return this.httpClient.get<Person[]>(environment.endPoinUrl.concat('/person/view'));
  }

  /**
   * deletePerson
   * @param person 
   */
  public deletePerson(person: Person) {
    return this.httpClient.delete<Person>(environment.endPoinUrl.concat('/person/delete/' + person.id));
  }

    /**
   * editPerson
   * @param id 
   */
  public editPerson(id : number) {
    return this.httpClient.get<Person>(environment.endPoinUrl.concat('/person/view/' + id));
  }
}