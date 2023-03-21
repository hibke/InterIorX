import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Item } from 'src/app/components/shared/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-box',
  templateUrl: `./item-box.component.html`,

})
export class ItemBoxComponent implements OnInit {
  items:Item[] = [];
  constructor(private itemService:ItemService,private activatedRoute:ActivatedRoute,private router:Router) { 
    activatedRoute.params.subscribe((params) =>{
      if(params.fourniture)
      this.items = this.itemService.getAllItemsByType(params.fourniture);
      else
      this.items = this.itemService.getAll();
    })

    
    
  }

  
  ngOnInit(): void {
  }
  resetPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute
    })
    


  }

}
