function cpfMask(value: string) : string{

  value = value.replace(/\D/g, ""); //Limpa a string removendo tudo que não for digito de forma global (em toda a string)

    //A instrução regex é colada dentro de duas "/"
   /*  
    value = value.replace(/(\d{3})(\d)/g, "$1.$2");
    value = value.replace(/(\d{3})(\d)/g, "$1.$2");
    value = value.replace(/(\d{3})(\d{2})$/, "$1-$2"); */

    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); 

    return value;

}

function telefoneMask(value: string): string{

  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); 
  value = value.replace(/(\d)(\d{4})$/, "$1-$2"); 

  return value;

}

function decimalMask(value: string): string{

  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1.$2"); 

  return value;

}

export {cpfMask, decimalMask, telefoneMask};