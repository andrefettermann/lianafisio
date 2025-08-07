import { Injectable } from '@angular/core';
import * as Realm from 'realm-web';
import { Paciente } from '../models/paciente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private app: Realm.App;
  private credentials!: Realm.Credentials;
  private currentUser: Realm.User | null = null;

  constructor() {
    // Substitua pelo seu App ID
    this.app = new Realm.App({ id: environment.apiId});
      //{ id: 'application-0-zteel' });
  }

  async login(email: string, password: string): Promise<void> {
    this.credentials = Realm.Credentials.apiKey(environment.apiKey);
    const user = await this.app.logIn(this.credentials);
    this.currentUser = user;
  }

  setPaciente(element: any): Paciente {
      const paciente = new Paciente();
      paciente.setCpf(element.cpf);
      paciente.setNome(element.nome);
      paciente.setCidade(element.cidade);
      paciente.setDataNascimento(element.data_nascimento);
      paciente.setEndereco(element.endereco);
      paciente.setEstado(element.estado);
      paciente.setSexo(element.sexo);
      paciente.setTelefone(element.telefone);
      paciente.setEmail(element.email);

      return paciente;
  }

  getPaciente(paciente: Paciente): any {
    const doc = {
      'nome': paciente.getNome(),
      'cpf': paciente.getCpf(),
      'data_nascimento': paciente.getDataNascimento(),
      'telefone': paciente.getTelefone(),
      'email': paciente.getEmail(),
      'sexo': paciente.getSexo(),
      'endereco': paciente.getEndereco(),
      'cidade': paciente.getCidade(),
      'estado': paciente.getEstado()
    }

    return doc;
  }

  async callFunctionGetPacientes(): Promise<Paciente[]> {
    var pacientes: Paciente[] = [];

    if (!this.currentUser) throw new Error('Usuário não autenticado.');
    
    const result = await this.currentUser.functions.callFunction('getPacientes', []);

    result.result.forEach((element: any) => {
      pacientes.push(this.setPaciente(element));
    });

    return pacientes;
  }

  async callFunctionPostPaciente(paciente: any): Promise<any> {
    try {
      if (!this.currentUser) throw new Error('Usuário não autenticado.');

      const resultado = await this.currentUser.functions.callFunction(
          'postPaciente', this.getPaciente(paciente));
      
      console.log("Resultado da inserção:", resultado);
      return resultado;
    } catch (err: any) {
      console.error("Erro ao chamar a função:", err);
      return { success: false, message: err.message };
    }
  }

  logout() {
    if (this.currentUser) {
      this.currentUser.logOut();
      this.currentUser = null;
    }
  }

}
