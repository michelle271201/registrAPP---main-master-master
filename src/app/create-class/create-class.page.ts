import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.page.html',
  styleUrls: ['./create-class.page.scss'],
})
export class CreateClassPage implements OnInit {
  frmCrearClase: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.frmCrearClase = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async onSubmit() {
    const claseData = this.frmCrearClase.value;

    console.log('Clase creada:', claseData);

    // Simulación de guardado
    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'La clase se ha creado correctamente.',
      buttons: ['Aceptar'],
    });
    await alert.present();

    // Redirigir al dashboard del docente
    this.router.navigate(['/homedocente']);
  }
}
