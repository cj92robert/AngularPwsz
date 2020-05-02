import { Component, OnInit } from '@angular/core';
import {FilmServiceService} from "../film-service.service";
import {Film} from "../models/Film";
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-film-component',
  templateUrl: './film-component.component.html',
  styleUrls: ['./film-component.component.css'],
  providers: [MessageService]
},)
export class FilmComponentComponent implements OnInit {
  editClickindex: number=-1;
  listFilms: Film[]=null;
  addView=false;
  addingFilm :Film=new Film();

  constructor(private filmService: FilmServiceService,private messageService: MessageService) { }



  ngOnInit() {
    this.getFilms();
  }
  getFilms(){
    this.filmService.getFilms().subscribe(value=>{
      this.listFilms=value;
    })


  }
  updateFilm(film: Film) {
    this.filmService.updateFilm(film).subscribe(value => {
      //sucess
      this.getFilms();
      this.messageService.add({severity:'success', summary:'Sukces', detail:'Zaktualizowano dane o filmie'});
    },error => {
      this.messageService.add({severity:'error', summary:'Błąd', detail:'Aktualizacja nie powiodła się.'});
      this.getFilms();
    })
    this.editClickindex=-1;
  }

  clicEdit(id: number) {
    if(this.editClickindex==id){
      this.editClickindex=-1;
    }else{
      this.editClickindex=id;
    }
  }

  deleteNote(id: number) {
    this.filmService.deleteFilm(id).subscribe(value => {
      //sucess
      this.getFilms();
      this.messageService.add({severity:'success', summary:'Sukces', detail:'Usunieto film'});
    },error => {
      //porażka
      this.getFilms();
      this.messageService.add({severity:'error', summary:'Błąd', detail:'Nie udało się usunąć filmu'});
    })
    this.editClickindex=-1;
  }

  showAdd() {
    this.addView=true;
  }

  addNewFilm(addingFilm: Film) {
    console.log(addingFilm);
    this.filmService.addFilm(addingFilm).subscribe(res=>{
      this.getFilms();
      //sukces
      this.messageService.add({severity:'success', summary:'Sukces', detail:'Dodano film'});
    },error => {
      this.getFilms();
      //bład
      this.messageService.add({severity:'error', summary:'Błąd', detail:'Dodawanie filmu nie powiodło się'});
    })

    this.addingFilm.nazwaStudia="";
    this.addingFilm.tytul="";
    this.addingFilm.czasTrwania=0;
    this.addingFilm.gatunek="";
    this.addView=false;
  }
}
