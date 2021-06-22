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