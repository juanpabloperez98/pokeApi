import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters/characters.component';
import { CharacterSpecificComponent } from './character-specific/character-specific.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritosComponent } from './favoritos/favoritos.component';



@NgModule({
  declarations: [
    CharactersComponent,
    CharacterSpecificComponent,
    NavbarComponent,
    ProfileComponent,
    FavoritosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
