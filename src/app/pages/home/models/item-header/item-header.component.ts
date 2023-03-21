import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-header',
  templateUrl: `item-header.component.html`,

})
export class ItemHeaderComponent implements OnInit {
  forniture = 'furniture';
  itemsShowCount= 6;
  constructor(private activatedRoute:ActivatedRoute,private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.forniture) this.forniture = params.fourniture;
    });
   }

  ngOnInit(): void {
  }

  fornitureUpdated(newforniture: string): void{
    this.forniture = newforniture;
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    localStorage.setItem('item','18' );
    localStorage.setItem('item_table','19' );
    localStorage.setItem('item_cabinet','20');
    localStorage.setItem('item_storage','21');
    localStorage.setItem('item_accessory','22');

  }
  search(fourniture:string):void{
    if(fourniture)
    this.router.navigateByUrl('/search/'+ fourniture);

  }
  

}
