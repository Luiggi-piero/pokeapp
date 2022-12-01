import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  page: number = 0;
  search: string = '';
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService
      .getAllPokemons()
      .subscribe((pokemonList: Pokemon[]) => {
        this.pokemonList = pokemonList;
        console.log(this.pokemonList);
      });
  }

  prevPage(): void {
    if (this.page > 0) this.page -= 5;
  }

  nextPage(): void {
    this.page += 5;
  }

  searchPokemon(search: string) {
    this.page = 0;
    this.search = search;
  }
}
