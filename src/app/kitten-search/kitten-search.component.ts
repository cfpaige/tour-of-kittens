import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Kitten } from '../kitten';
import { KittenService } from '../kitten.service';

@Component({
  selector: 'app-kitten-search',
  templateUrl: './kitten-search.component.html',
  styleUrls: [ './kitten-search.component.css' ]
})
export class KittenSearchComponent implements OnInit {
  kittens$: Observable<Kitten[]>;
  private searchTerms = new Subject<string>();

  constructor(private kittenService: KittenService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.kittens$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.kittenService.searchKittens(term)),
    );
  }
}