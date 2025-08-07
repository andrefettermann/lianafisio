export class Paciente {

    private nome: string = '';
    private cpf: string = '';
    private dataNascimento!: Date;
    private telefone: string = '';
    private email: string = '';
    private sexo: string = '';
    private endereco: string = '';
    private cidade: string = '';
    private estado: string = '';

    public getNome(): string {
        return this.nome;
    }
    public setNome(oNome: string) {
        this.nome = oNome;
    }

    public getCpf(): string {
        return this.cpf;
    }
    public setCpf(oCpf: string) {
        this.cpf = oCpf;
    }

    public getDataNascimento(): Date {
        return this.dataNascimento;
    }
    public setDataNascimento(aData: Date) {
        this.dataNascimento = aData;
    }

    public getTelefone(): string {
        return this.telefone;
    }
    public setTelefone(oTelefone: string) {
        this.telefone = oTelefone;
    }

    public getEmail(): string {
        return this.email;
    }
    public setEmail(oEmail: string) {
        this.email = oEmail;
    }

    public getSexo(): string {
        return this.sexo;
    }
    public setSexo(oSexo: string) {
        this.sexo = oSexo;
    }

    public getEndereco(): string {
        return this.endereco;
    }
    public setEndereco(oEndereco: string) {
        this.endereco = oEndereco;
    }

    public getCidade(): string {
        return this.cidade;
    }
    public setCidade(oCidade: string) {
        this.cidade = oCidade;
    }

    public getEstado(): string {
        return this.estado;
    }
    public setEstado(oEstado: string) {
        this.estado = oEstado;
    }
}