import { Usuario } from './../../interfaces/users';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage-angular'


@Component({
  selector: 'app-homedocente',
  templateUrl: './homedocente.page.html',
  styleUrls: ['./homedocente.page.scss'],
})
export class HomedocentePage implements OnInit {

  username:string='';
  usr: string='';
  opc:boolean=false;
  tipo:string;
  dataGet:Usuario;
  iter:number;
  constructor(
    private router:Router,
    private activatedRouter:ActivatedRoute,
    private menu:MenuController,
    public datasv:DataService,
    public navCtrl: NavController,
    private storage:Storage
  ) {
    
    this.activatedRouter.queryParams.subscribe(params=>{
      if (this.router.getCurrentNavigation().extras.state) {
        let refresh = this.router.getCurrentNavigation().extras.state.refresh;
        eval(refresh)
      }
    })
    // this.doRefresh()
    // do {
    //   this.doRefresh()
    //   this.iter=+1
      
    // } while (this.iter>1);
    // while (this.router.url=='/home') {
    //   this.doRefresh()
    //   window.location.reload()
    //   this.iter=+1
    //   break
    // }
    // console.log("este es el url"+this.router.url);

    
    
  }
  verMenu(){
    this.menu.toggle('first');
  }
  async ngOnInit() {
    await this.getData()
    // console.log(this.dataGet);
    this.username = await this.dataGet.nombre
    this.tipo = await this.dataGet.tipo
    
  }
  doRefresh(){
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  async endSession(){
    await this.storage.remove('usr')
    await this.storage.remove('us')
    await window.location.reload();
    this.router.navigate(['/login'])
  }

  async getData(){
    this.dataGet = await this.storage.get("usr")
  }
  
}


