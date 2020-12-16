import { ActivatedRoute, } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editparent',
  templateUrl: './editparent.component.html',
  styleUrls: ['./editparent.component.css']
})
export class EditparentComponent implements OnInit {


  dataEditParent:any=[];

  constructor(private route: ActivatedRoute) {
    this.dataEditParent = this.route.snapshot.paramMap.get('id');
    console.log(this.dataEditParent);
    
   }

  ngOnInit(): void {
  }

}
