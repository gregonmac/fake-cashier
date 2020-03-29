import { Howl } from 'howler';

import { Component, Inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import {
    faAmbulance, faAppleAlt, faBacon, faBone, faBook, faBreadSlice, faBus, faCandyCane, faCarrot,
    faCarSide, faCashRegister, faCheese, faCloudMeatball, faCoffee, faCookie, faDrumstickBite,
    faEgg, faFish, faGift, faHamburger, faHotdog, faIceCream, faMotorcycle, faPepperHot,
    faPizzaSlice, faTruck, IconDefinition
} from '@fortawesome/free-solid-svg-icons';

export interface Product {
  icon: IconDefinition;
  price: number;
  text: string;
  size: string;
}
export interface Vehicle {
  icon: IconDefinition;
  price: number;
  text: string;
  size: string;
}

export interface CommandItem {
  product: Product;
  number: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentCommandTotal: number = 0;
  faCashRegister = faCashRegister;
  selectedProducts: Map<Product, number> = new Map<Product, number>();
  vehicles: Vehicle[] = [
    { text: 'Ambulance', icon: faAmbulance, price: 2, size: '2x' },
    { text: 'Bus', icon: faBus, price: 2, size: '2x' },
    { text: 'Motorcycle', icon: faMotorcycle, price: 2, size: '2x' },
    { text: 'CarSide', icon: faCarSide, price: 2, size: '2x' },
    { text: 'Truck', icon: faTruck, price: 2, size: '2x' }
  ];
  products: Product[] = [
    { text: 'Pomme', icon: faAppleAlt, price: 1, size: '2x' },
    { text: 'Bacon', icon: faBacon, price: 1, size: '2x' },
    { text: 'Os', icon: faBone, price: 0.5, size: '2x' },
    { text: 'Tartine', icon: faBreadSlice, price: 1, size: '2x' },
    { text: 'Bonbon', icon: faCandyCane, price: 0.2, size: '2x' },
    { text: 'Carrote', icon: faCarrot, price: 0.3, size: '2x' },
    { text: 'Fromage', icon: faCheese, price: 1, size: '2x' },
    { text: 'Café', icon: faCoffee, price: 1.2, size: '2x' },
    { text: 'Cookie', icon: faCookie, price: 1, size: '2x' },
    { text: 'Poulet', icon: faDrumstickBite, price: 3, size: '2x' },
    { text: 'Oeuf', icon: faEgg, price: 2, size: '2x' },
    { text: 'Poison', icon: faFish, price: 2.5, size: '2x' },
    { text: 'Hamburger', icon: faHamburger, price: 4.3, size: '2x' },
    { text: 'Hotdog', icon: faHotdog, price: 3.4, size: '2x' },
    { text: 'Glace', icon: faIceCream, price: 2.2, size: '2x' },
    { text: 'Piment', icon: faPepperHot, price: 1.1, size: '2x' },
    { text: 'Pizza', icon: faPizzaSlice, price: 3.2, size: '2x' },
    { text: 'Boulette', icon: faCloudMeatball, price: 2.0, size: '2x' }
  ];
  category: Category[] = [
    { id: 'cat_boison', name: 'boison', image: 'assets/cat_boison' },
    { id: 'cat_boisons', name: 'boisons', image: 'assets/cat_boisons' },
    { id: 'cat_dessert', name: 'dessert', image: 'assets/cat_dessert' },
    { id: 'cat_menu', name: 'menu', image: 'assets/cat_menu' },
    {
      id: 'cat_petite_faim',
      name: 'petite_faim',
      image: 'assets/cat_petite_faim'
    },
    { id: 'cat_salade', name: 'salade', image: 'assets/cat_salade' },
    { id: 'cat_sandwich', name: 'sandwich', image: 'assets/cat_sandwich' },
    { id: 'cat_sauce', name: 'sauce', image: 'assets/cat_sauce' }
  ];

  constructor(public dialog: MatDialog) {}
  addProduct(product: Product) {
    let items = this.selectedProducts.get(product);
    if (!items) items = 0;
    items++;
    this.selectedProducts.set(product, items);
    this.currentCommandTotal = 0;
    this.selectedProducts.forEach((value, key) => {
      this.currentCommandTotal += value * key.price;
    });
  }
  pay() {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '400px',
      width: '600px',
      data: { name: 'toto', animal: 'cat' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentCommandTotal = 0;
        this.selectedProducts = new Map<Product, number>();
        // var sound = new Howl({
        //   src: ['assets/MONEYWIN.WAV']
        // });
        // sound.play();
      }
    });
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.html'
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data);
  }

  onPay(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
