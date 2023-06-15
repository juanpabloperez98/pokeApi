import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  characters: any[] = [];

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getCharacters('pokeapi/get_favoritos')
    .subscribe( (res: any) => {
      console.log(res);
      this.characters = res;
    }, (err) => {
      console.log(err);
    })
  }

}
