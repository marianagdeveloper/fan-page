import { Component, OnInit } from '@angular/core';
import { FavoritesService } from "../../services/favorites.service";
import {Subject} from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites:any = [];
  searchText: any;
  user : any = localStorage.getItem('user');

  findByUser = {
    user : this.user
  }

  searchTerm$ = new Subject<any>();
  listFiltered:any = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    // Favorites for user
    this.favoritesService.getFavorites(this.findByUser)
    .subscribe(
      ( res: any) => {
        console.log(res)
        this.favorites = res
        // Exist favorites
        if ( this.favorites.length > 0) {
          for (let index = 0; index < this.favorites.length; index++) {
            const element = this.favorites[index].name;
            this.listFiltered.push(element)
          }
        }
      },
      ( err: any) => console.log(err)
    )
  }
}
