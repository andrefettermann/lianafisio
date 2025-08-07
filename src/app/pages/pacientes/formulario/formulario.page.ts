import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente.model';
import { PacienteService } from 'src/app/services/paciente.service';

interface Estado {
  sigla: string;
  nome: string;
}

@Component({
  standalone: false,
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  cadastroForm!: FormGroup;

  estados: Estado[] = [
    {
      sigla: 'PI',
      nome: 'Piauí',
    },
    {
      sigla: 'RJ',
      nome: 'Rio de Janeiro',
    },
  ];

  constructor(private fb: FormBuilder, 
    private pacienteService: PacienteService) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: [''],
      telefone: [''],
      email: [''],
      data_nascimento: [''],
      sexo: [''],
      endereco: [''],
      cidade: [''],
      estado: ['']
    });
  }

  async salvar() {
    if (this.cadastroForm.valid) {
      const dados = this.cadastroForm.value;
      
      const paciente = new Paciente();
      paciente.setCidade(dados.cidade);
      paciente.setCpf(dados.cpf);
      paciente.setDataNascimento(dados.data_nascimento);
      paciente.setEmail(dados.email);
      paciente.setEndereco(dados.endereco);
      paciente.setEstado(dados.estado);
      paciente.setNome(dados.nome);
      paciente.setSexo(dados.sexo);
      paciente.setTelefone(dados.telefone);

      // Aqui você pode enviar para API ou salvar no storage
      try {
        await this.pacienteService.login("", "");
        const resultado = await this.pacienteService.callFunctionPostPaciente(paciente);
        console.log(resultado)
        console.log('Dados salvos:', dados);
      } catch (err) {
        console.error('Erro:', err);
      }

      this.cadastroForm.reset();
    } else {
      console.log('Formulário inválido');
    }
  }
}
