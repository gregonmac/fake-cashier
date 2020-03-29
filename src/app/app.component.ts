import { Howl } from 'howler';

import { Component, Inject, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import {
    faAmbulance, faAppleAlt, faBacon, faBone, faBook, faBreadSlice, faBus, faCandyCane, faCarrot,
    faCarSide, faCashRegister, faCheese, faCloudMeatball, faCoffee, faCookie, faDrumstickBite,
    faEgg, faFish, faGift, faHamburger, faHotdog, faIceCream, faMotorcycle, faPepperHot,
    faPizzaSlice, faTruck, IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import * as data from './products.json';

export interface Product {
  id: string;
  price: number;
  text: string;
  icon?: IconDefinition;
  size?: string;
  categories: string[];
}
export interface Vehicle {
  icon: IconDefinition;
  price: number;
  text: string;
  size?: string;
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
  products: Product[] = (data as any).default;

  categories: Category[] = [
    { id: 'cat_sandwich', name: 'sandwichs', image: 'assets/cat_sandwich' },
    {
      id: 'cat_boisson',
      name: 'boissons & sauces',
      image: 'assets/cat_boisson'
    },
    {
      id: 'cat_petite_faim',
      name: 'petite faim',
      image: 'assets/cat_petite_faim'
    },
    { id: 'cat_dessert', name: 'desserts', image: 'assets/cat_dessert' },
    { id: 'cat_salade', name: 'salades & sauces', image: 'assets/cat_salade' }
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
      this.currentCommandTotal = parseFloat(
        this.currentCommandTotal.toFixed(2)
      );
    });
  }
  pay() {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { command: this.selectedProducts, total: this.currentCommandTotal }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentCommandTotal = 0;
        this.selectedProducts = new Map<Product, number>();
        var sound = new Howl({
          src: ['assets/cashier.mp3']
        });
        sound.play();
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.html'
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      command: Map<Product, number>;
      total: number;
    }
  ) {}

  onPay(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

@Pipe({ name: 'categoryFilter' })
export class CategoryFilterPipe implements PipeTransform {
  transform(products: Product[], category: Category): Product[] {
    return products.filter(
      product => product.categories.indexOf(category.id) >= 0
    );
  }
}

@Pipe({ name: 'shortName' })
export class ShortNamePipe implements PipeTransform {
  transform(name: string, length: number): string {
    if (name.length <= length) return name;
    return (
      name
        .split('')
        .slice(0, length)
        .join('') + '...'
    );
  }
}
