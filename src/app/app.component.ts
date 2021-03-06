import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as _ from "lodash"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
  :host ::ng-deep .forms-grid > div {
      display: flex;
      align-items: center;
      padding: 1em;
  }

  :host ::ng-deep .forms-grid > div > div:first-child {
     min-width: 10em;
  }
  
  input, textarea {
      flex: 1 1 auto;
  }

  :host ::ng-deep .ui-message {
      margin-left: 1em;
  }

  @media screen and (max-width: 64em) {
      :host ::ng-deep .ui-message-text {
          display: none;
      }
  }
`]
})
export class AppComponent  implements OnInit{
  title = 'pjone';
  currentPath: string = ''
  hideMenu: any = ['/login','/home','/parent','/editparent','class','namecheckinghistory',
                   '/classdetail']
  
  animals = ['Ant', 'Bat', 'Cat', 'Dog']


  constructor(private router:Router){
    
    this.animals.forEach((animal) => {
        // console.log(animal)
     });


     let datateacher = JSON.parse(localStorage.getItem('user'))
     if(datateacher != null){
       this.router.navigate(['/home'])
     }else{
       
     }

  }

  

  ngOnInit(): void {
    this.subscribeCurrentPath();

  }

 


  

  get isHideMenu(): boolean {
    return !(_.chain(this.hideMenu)
      .map((it) => {
        return this.currentPath.search(it) >= 0
      })
      .reduce((bool = false, it) => {
        return bool || it
      })
      .value())
     
  }
  private subscribeCurrentPath() {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.currentPath = value.urlAfterRedirects
      }
    })
  }
}
