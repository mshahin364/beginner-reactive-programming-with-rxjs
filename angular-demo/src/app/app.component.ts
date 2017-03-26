import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchForm: FormGroup;
  results: Observable<{}>;

  constructor(private formBuilder: FormBuilder, private http: Http) {
    const API_URL = 'https://www.googleapis.com/youtube/v3/search';
    const API_KEY = '';

    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });

    this.results = this.searchForm.controls.search.valueChanges // <- Observable Form
      .debounceTime(500)
      .switchMap(query => this.http.get(`${API_URL}?q=${query}&key=${API_KEY}&part=snippet`))  // <-- Observable Http
      .map(res => res.json())
      .map(res => res.items);
  }
}