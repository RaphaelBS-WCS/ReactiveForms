import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isRequiredValidator} from "./formUtils/isRequiredValidator";
import {releaseValidator} from "./formUtils/releaseValidator";

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private fb: FormBuilder) { }

  get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }


  ngOnInit(): void {
    this.searchForm = this.fb.group({
      identifierTitle: this.fb.group(
        {
          identifier: [''],
          title: [''],
        },
        {
          validator: isRequiredValidator('identifier', 'title')
        }
      ),
      type: ['série'],
      release: ['', [Validators.required, releaseValidator(1900, new Date())]],
      fiche: ['']
    });

    this.setFiche();
    this.searchForm.valueChanges.subscribe(x => {
      console.log('form value changed')
      console.log(x)
    })
  }

  setFiche() {
    this.searchForm.patchValue({
      fiche: 'courte',
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.searchForm.value, null, 2));
  }
}
