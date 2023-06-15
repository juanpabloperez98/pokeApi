import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { characters } from '../interfaces/character.interface';

@Component({
  selector: 'app-character-specific',
  templateUrl: './character-specific.component.html',
  styleUrls: ['./character-specific.component.css']
})
export class CharacterSpecificComponent implements OnInit {

  name!: string | null;
  character: characters | null = null;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.homeService.getCharacter(`pokeapi/get_character_specific/${this.name}`)
    .subscribe( (res: any) => {
      this.character = {
        "name": res.name,
        "id": res.id,
        "weight": res.weight,
        "base_experience": res.base_experience,
        "sprites": res["sprites"]["front_default"],
        "fav": res.fav
      }
    }, (err) => {
      console.log(err);
    })
  }


  addFav(name: string){
    let body = {
      "name": name
    }
    this.homeService.add_fav('pokeapi/add_favorito', body)
    .subscribe((res:any) => {
      alert("Agregado a favoritos exitosamente!")
      this.character!.fav = true;
    },(err:any) => {
      console.log(err);
    })
  }



}
