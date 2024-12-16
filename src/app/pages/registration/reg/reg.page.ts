import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
  frmRegistrar: FormGroup;

  constructor(
    public frm: FormBuilder,
    private rt: Router,
    private alertCtrl: AlertController
  ) {
    this.frmRegistrar = this.frm.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'usr': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'password1': new FormControl("", [Validators.required, Validators.minLength(6)]),
      'password2': new FormControl("", [Validators.required]),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'tipo': new FormControl("alumno", Validators.required), // Por defecto, "alumno"
    });
  }

  ngOnInit() {}

  async onSubmit() {
    const { nombre, usr, password1, password2, email, tipo } = this.frmRegistrar.value;

    // Validar que las contraseñas coincidan
    if (password1 !== password2) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Crear el usuario
    const nuevoUsuario = {
      nombre: nombre,
      usr: usr,
      password: password1,
      email: email,
      tipo: tipo,
    };

    // Guardar en localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    const successAlert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Cuenta creada exitosamente.',
      buttons: ['Aceptar'],
    });
    await successAlert.present();

    // Redirigir al login
    this.rt.navigate(['/login']);
  }
}
