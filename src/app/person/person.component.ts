import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../model/person';
import { HttpClientService } from '../service/httpclient.service';
import { AddPersonComponent } from '../add-person/add-person.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {


  persons: Person[];

  @ViewChild(AddPersonComponent) addPersonComponent: AddPersonComponent;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.httpClientService.getPersons().subscribe(
      response => {
        this.persons = response;
      }
    );
  }

  deletePerson(person: Person): void {
    this.httpClientService.deletePerson(person)
      .subscribe(data => {
        this.persons = this.persons.filter(u => u !== person);
      })
  };

  editPerson(person: Person): void {
    this.httpClientService.editPerson(person.id)
      .subscribe(data => {
        this.router.navigate(['/editPerson/' + person.id]);

      })
  };




}
