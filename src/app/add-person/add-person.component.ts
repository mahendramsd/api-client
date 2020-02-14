import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService } from '../service/httpclient.service';
import { first } from 'rxjs/operators';
import { Person } from '../model/person';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']

})
export class AddPersonComponent implements OnInit {

  personForm: FormGroup;
  loading = false;
  submitted = false;
  isSave = false;
  isFail = false;
  person: Person;

  items = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpClientService: HttpClientService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.personForm = this.formBuilder.group({
      id : [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      favouriteColor: ['', Validators.required],
      hobby: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      const personId = +params['id'];
      if(personId) {
        this.loadEdit(personId);
      }
    });
  }

  loadEdit(id: number) {
    this.httpClientService.editPerson(id)
      .subscribe(data => {
        this.createForm(data);
        this.ref.markForCheck();
      })
  }

  createForm(person: Person) {
    this.personForm.controls['id'].setValue(person.id);
    this.personForm.controls['firstName'].setValue(person.firstName);
    this.personForm.controls['lastName'].setValue(person.lastName);
    this.personForm.controls['age'].setValue(person.age);
    this.personForm.controls['favouriteColor'].setValue(person.favouriteColor);
    const hobby = person.hobby.substring(1, person.hobby.length-1).split(", ");
    this.items = hobby;
    this.ref.markForCheck();
  }

  /**
   * convenience getter for easy access to form fields
   */
  get form() { return this.personForm.controls; }

  /**
   * On Submit Form
   */
  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.personForm.invalid) {
      return;
    }

    //fill hobby array
    const hobbies = [];
    this.personForm.value.hobby.forEach(function (value) {
      hobbies.push(value.display);
    });

    // Fill Person object
    const person: Person = {
      id: this.personForm.value.id,
      firstName: this.personForm.value.firstName,
      lastName: this.personForm.value.lastName,
      age: this.personForm.value.age,
      favouriteColor: this.personForm.value.favouriteColor,
      hobby: hobbies
    }
    this.loading = true;
    this.httpClientService.addPerson(person)
      .pipe(first())
      .subscribe(
        data => {
          this.isSave = true;
          this.router.navigate(['']);
        },
        error => {
          this.isFail = true;
          this.loading = false;
        });
  }

}
