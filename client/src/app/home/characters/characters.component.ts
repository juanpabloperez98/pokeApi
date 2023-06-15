import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1; // Total de páginas disponibles

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getCharacters('pokeapi/get_characters')
    .subscribe( (res: any) => {
      this.characters = res.map((key: any) => {
        let arr = key['url'].split('/'),
            len = arr.length;
        return { ...key, id: arr[len-2] }
      })
    }, (err) => {
      console.log(err);
    })
  }

}
