import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private api = 'https://rickandmortyapi.com/api/character'
  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  // Rick and Morty API
  getCharacters() {
    return this.http.get<any>(this.api);
  }

  // Favorites
  getFavorites(user: any) {
    console.log(user);

    return this.http.post<any>(this.URL + '/favorites', user);
  }

  // Add favorites
  addFavorites(favorite: any) {
    return this.http.post<any>(this.URL + '/favorites/add', favorite)
  }

}
