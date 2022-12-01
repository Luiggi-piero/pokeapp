import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FetchAllPokemonResponse, Pokemon, SmallPokemon } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<FetchAllPokemonResponse>(`${this.baseUrl}/pokemon?limit=2000/`)
      .pipe(map(this.transformPokemon));
  }

  private transformPokemon(data: FetchAllPokemonResponse): Pokemon[] {
    const pokemonList: Pokemon[] = data.results.map((pokemon: SmallPokemon) => {
      const urlArray = pokemon.url.split('/');
      const id = urlArray[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        name: pokemon.name,
        pic,
      };
    });

    return pokemonList;
  }
}
