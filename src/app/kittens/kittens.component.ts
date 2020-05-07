import { Component, OnInit } from '@angular/core';
import { Kitten } from '../kitten';
import { KittenService } from '../kitten.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-kittens',
  templateUrl: './kittens.component.html',
  styleUrls: ['./kittens.component.css']
})
export class KittensComponent implements OnInit {

  kittens: Kitten[];
  selectedKitten: Kitten;

  constructor(private kittenService: KittenService, private messageService: MessageService) { }

  getKittens(): void {
    this.kittenService.getKittens()
        .subscribe(kittens => this.kittens = kittens);
  }

  ngOnInit() {
    this.getKittens();
  }

  onSelect(kitten: Kitten): void {
    this.selectedKitten = kitten;
    this.messageService.add(`KittenService: Selected kitten id=${kitten.id}`);
  }

}
