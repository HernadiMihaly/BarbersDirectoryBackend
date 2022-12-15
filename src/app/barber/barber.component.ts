import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Barber } from '../barber';
import { BarberService } from '../barber.service';

@Component({
  selector: 'app-barber',
  templateUrl: './barber.component.html',
  styleUrls: ['./barber.component.css']
})
export class BarberComponent implements OnInit {
  public barbers: Barber[] = [];
  public editBarber: Barber | undefined;
  public viewBarber: Barber | undefined;
  displayAdd = "none";
  displayEdit = "none";
  displayView= "none";

  constructor(private barberService: BarberService, private router: Router){}

  ngOnInit() {
    this.getBarbers();
  }

  public getBarbers(): void {
    this.barberService.getBarbers().subscribe(
      (response: Barber[]): void => {
        this.barbers = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/401']);
      }
    );
  }

  public addBarber(addForm: NgForm): void {

    if (addForm.value["imageLink"] == "" || addForm.value["imageLink"] == null){
      addForm.value["imageLink"] = "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png";
    }
    this.barberService.addBarber(addForm.value).subscribe(
      (response: Barber) => {
        this.getBarbers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/401']);
      },
    );
    document.getElementById('close-add-modal')?.click();
}

  public deleteBarber(barber: Barber): void{
    this.barberService.deleteBarber(barber.id).subscribe(
      () => {
        this.getBarbers();
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/401']);
      },
    );
  }

  public updateBarber(barber: Barber): void {
    if (barber.imageLink == "" || barber.imageLink == null || !barber.imageLink){
      barber.imageLink = "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png";
    }
    this.barberService.addBarber(barber).subscribe(
      (response: Barber) => {
        this.getBarbers();
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/401']);
      },
    );
    document.getElementById('close-edit-modal')?.click();
  }

  public findBarbers(searchForm: NgForm): void{
    const searchedValue = searchForm.value["searchValue"]
    const resultBarbers: Barber[] = [];

    this.barbers.forEach(function (barber: Barber){
      if (barber.name.toLowerCase().includes(searchedValue.toLowerCase())) resultBarbers.push(barber);
    })

    this.barbers= resultBarbers;

    if(!searchedValue || resultBarbers.length == 0){
      this.getBarbers();
    }
  }

  public openAddModal() {
    this.displayAdd = "block";
  }
  public onCloseAddModal() {
    this.displayAdd = "none";
  }

  public onOpenEditModal(barber: Barber){
    this.displayEdit = "block";
    this.editBarber = barber;
  }

  public onOpenViewModal(id: number){
    this.displayView = "block";
    
    this.barberService.getBarberById(id).subscribe(
      (response: Barber) => {
        this.viewBarber = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['/401']);
      },
    );
  }

  public onCloseEditModal(){
    this.displayEdit = "none";
  }

  public onCloseViewModal(){
    this.displayView = "none";
  }
  public logout(){
    this.barberService.logout();
    this.router.navigate(['/login']);
  }
}
