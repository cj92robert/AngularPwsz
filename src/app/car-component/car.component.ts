import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng";
import {CarServiceService} from "../car-service.service";
import {Car} from "../models/Car";



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [MessageService]
})
export class CarComponent implements OnInit {

  editClickindex: number=-1;
  listCars: Car[]=null;
  addView=false;
  addingCar :Car=new Car();



  currentPage=1;
  colour: string="";
  totalElement: String;

  constructor(private carService: CarServiceService,private messageService: MessageService) { }
  ngOnInit() {
    this.getCars("",1);
  }
  getCars(colour: string, page:number){
    this.carService.getCars(this.colour, page).subscribe(value=>{
      this.listCars=value.listCars;
      this.currentPage=value.currentPage;
      this.totalElement=value.elementTotal;
    })


  }
  updateCar(car: Car) {
    this.carService.updateCar(car).subscribe(value => {
      //sucess
      this.getCars("",this.currentPage);
      this.messageService.add({severity:'success', summary:'Sukces', detail:'Zaktualizowano dane o Samochodzie'});
    },error => {
      this.messageService.add({severity:'error', summary:'Błąd', detail:'Aktualizacja nie powiodła się.'});
      this.getCars("",this.currentPage);
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

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(value => {
      //sucess
      this.getCars("",this.currentPage);
      this.messageService.add({severity:'success', summary:'Sukces', detail:'Usunieto Samochód'});
    },error => {
      //porażka
      this.getCars("",this.currentPage);
      this.messageService.add({severity:'error', summary:'Błąd', detail:'Nie udało się usunąć Samochodu'});
    })
    this.editClickindex=-1;
  }

  showAdd() {
    this.addView=true;
  }

  addNewCar(addingCar: Car) {

    this.carService.addCar(addingCar).subscribe(res=>{
      this.getCars("",this.currentPage);
      //sukces
      this.messageService.add({severity:'success', summary:'Sukces', detail:'Dodano samochód'});
    },error => {
      this.getCars("",this.currentPage);
      //bład
      this.messageService.add({severity:'error', summary:'Błąd', detail:'Dodawanie Samochodu nie powiodło się'});
    })

    this.addingCar.id=0;
    this.addingCar.model="";
    this.addingCar.carMake="";
    this.addingCar.colour="";
    this.addingCar.year=0
    this.addView=false;
  }

  changeFiltr(colour:string) {

    this.colour=colour;
    this.getCars(this.colour,this.currentPage);

  }

  refreshFiltr() {
    this.getCars("",this.currentPage);
  }

  paginate(event) {
    this.getCars("",event.page+1);

  }
}
