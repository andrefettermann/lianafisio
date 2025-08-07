import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  standalone: false,
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {

  pacientes: Paciente[] = []

  constructor(private pacienteService: PacienteService, private router: Router) {}

  async ngOnInit() {
    try {
      await this.pacienteService.login("", "");

      this.pacientes = await this.pacienteService.callFunctionGetPacientes();
      this.pacienteService.logout();
    } catch (err) {
      console.error('Erro:', err);
//      this.message = 'Erro ao chamar a function.';
    }

  }

  adicionarItem() {
    this.router.navigate(['/formulario']);
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
  //  this.generateItems();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

}
