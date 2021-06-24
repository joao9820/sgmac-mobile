/* Apenas o typescript lê esse arquivo não a aplicação 
formatos importaveis para a aplicação:
*/

declare module '*.png';

interface Funcao {
    
    id_funcao: number,
    nome: string,
    slug: string,
    descricao ?: string,
    criado_em ?: string,
    atualizado_em ?: string,
}

export interface User {
    id_usuario: number,
    fk_funcao_id: number,
    nome: string,
    email: string,
    cpf: string,
    telefone1: string,
    telefone2?: string,
    avatar?: string,
    criado_em?: string,
    atualizado_em?: string,
    funcao ?: Funcao,
}

interface Pacient {
    fk_usuario_id: number;
    cns?: string;
    peso: string;
    tamanho: string;
    nome_da_mae: string;
    raca: string;
    etnia?: string;
    usuario ?: User;
  }
  
interface Doctor {
    fk_usuario_id: number;
    cns: string;
    cnes: string;
    estabelecimento: string;
    usuario ?: User;
}

interface Status {
    id_status: number;
    cor: string;
    nome: string;
    criado_em: string;
    atualizado_em?: string;
}

interface Doenca {
    id_doenca: number;
    cid_10: string;
    nome: string;
    criado_em?: string;
    atualizado_em?: string;
}

interface SolicitacaoMedicamentos {
    fk_solicitacao_id ?: number;
    fk_medicamento_id: string | number;
    quantidade: string;
    mes1: boolean;
    mes2: boolean;
    mes3: boolean;
    mes4: boolean;
    mes5: boolean;
    mes6: boolean;
}

interface Medicamento {
    id_medicamento: number;
    nome: string;
    pivot ?: SolicitacaoMedicamentos;
    criado_em ?: string;
    atualizado_em ?: string;
}

export interface Solicitation {
    id_solicitacao: number;
    fk_medico_id: number;
    fk_unidade_id?: number;
    fk_paciente_id: number;
    fk_doenca_id: number;
    fk_autorizador_id?: number;
    fk_status_id: number;
    observacao ?: string;
    diagnostico: string;
    anamnese?: string;
    data_inicio?: string;
    data_fim?: string;
    criado_em?: string;
    atualizado_em?: string;
    paciente: Pacient;
    medico: Doctor;
    unidade?: null;
    autorizador: User;
    status: Status;
    doenca: Doenca;
    medicamentos: Medicamento[];
}