import { Component, OnInit } from '@angular/core';
import { FavoritesService } from "../../services/favorites.service";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  user: any = localStorage.getItem('user');
  closeResult = '';
  searchText: any;
  qualify: string = 'Sin Calificar';
  comment: string = '';
  characters: any = [];
  episodes: any = [];
  charactersFilters: any = [];
  favorites: any = [];
  existingFavorites: any = []

  favorite = {
    id: 0,
    name: '',
    image: '',
    gender: '',
    episode: [],
    status: '',
    record: '',
    comment: '',
    user: ''
  }

  findByUser = {
    user: this.user
  }

  constructor(private favoritesService: FavoritesService, private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    // Get Favorites
    this.getFavorites();

    // Get characters
    this.favoritesService.getCharacters()
      .subscribe(
        res => {
          // All characters
          this.characters = res.results
          // All buttons habilities
          for (let index = 0; index < this.characters.length; index++) {
            const element = this.characters[index];
            // Do not exist in my list
            element.myList = false
            // Translate to spanish
            switch (element.gender) {
              case 'Male':
                element.gender = 'Masculino'
                break;
              case 'Female':
                element.gender = 'Femenino'
                break;
              case 'unknown':
                element.gender = 'Desconocido'
                break;
            }
            switch (element.status) {
              case 'Alive':
                element.status = 'Vivo'
                break;
              case 'Dead':
                element.status = 'Muerto'
                break;
              case 'unknown':
                element.status = 'Desconocido'
                break;
            }
            // Episodes
            this.episodes = []
            for (let index = 0; index < element.episode.length; index++) {
              const episode = element.episode[index];
              this.episodes.push(' '+episode.split('/')[5])
            }
            element.episode = this.episodes
          }
          // If exists favorites
          if (this.existingFavorites.length > 0) {
            // Filter characters with favorites
            // Characters
            for (let index = 0; index < this.characters.length; index++) {
              const element = this.characters[index];
              // List of favorites
              for (let i = 0; i < this.existingFavorites.length; i++) {
                const favorite = this.existingFavorites[i];
                // Exist in my list
                if (favorite === element.id) {
                  element.myList = true
                }
              }
              // Add character filtered
              this.charactersFilters.push(element)
            }
            // All characters filtered
            // console.log(this.charactersFilters);
          } else {
            this.charactersFilters = this.characters;
          }
        },
        err => console.log(err)
      )
  }

  getFavorites() {
    this.favoritesService.getFavorites(this.findByUser)
      .subscribe(
        (res: any) => {
          console.log(res);

          // If exists favorites
          if (res.length > 0) {
            this.favorites = res;
            for (let index = 0; index < this.favorites.length; index++) {
              const element = this.favorites[index];
              const idfav = element.id;
              this.existingFavorites.push(idfav)
            }
          }
          return
        },
        (err: any) => console.log(err)
      )
  }

  addFavoriteInModal(item: any) {
    this.favorite = {
      id: item.id,
      name: item.name,
      image: item.image,
      gender: item.gender,
      episode: item.episode,
      status: item.status,
      record: this.qualify,
      comment: this.comment,
      user: this.user
    };
    // console.log(this.favorite);
  }

  saveFavorite(item: any) {
    this.favorite = {
      id: item.id,
      name: item.name,
      image: item.image,
      gender: item.gender,
      episode: item.episode,
      status: item.status,
      record: this.qualify,
      comment: this.comment,
      user: this.user
    };

    // Save favorite in database
    this.favoritesService.addFavorites(this.favorite)
      .subscribe(
        res => {
          // console.log(res);
          alert(res.msj)
          this.cleanFavorite();
        },
        err => {
          console.log(err)
          alert(err.error)
        }
      )

    // Re-direct to favorites
    this.router.navigate(['/favorites'])
  }

  cleanFavorite() {
    this.favorite = {
      id: 0,
      name: '',
      image: '',
      gender: '',
      episode: [],
      status: '',
      record: '',
      comment: '',
      user: ''
    }
    this.qualify = 'Sin Calificar';
    this.comment = '';
    return
  }

  checkingExistingFavorites(itemId: any) {
    for (let index = 0; index < this.existingFavorites.length; index++) {
      const element = this.existingFavorites[index];
      if (element == itemId) {
        return true
      } else {
        return false
      }
    }
  }

  // Modal
  open(content: any, item: any) {
    this.addFavoriteInModal(item);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        // Save click
        if (result == 'Save click') {
          this.saveFavorite(item)
        }
      },
      (reason) => {
        // Cross click
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}


