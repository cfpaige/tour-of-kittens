import { Injectable } from '@angular/core';
import { Kitten } from './kitten';
import { KITTENS } from './mock-kittens';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class KittenService {

  constructor(private messageService: MessageService) { }

  getKittens(): Observable<Kitten[]> {
    // TODO: send the message _after_ fetching the kittens
    this.messageService.add('KittenService: fetched kittens');
    return of(KITTENS);
  }

}
