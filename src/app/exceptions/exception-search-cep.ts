import { ErrorValues, ErroCep } from '@brunoc/ngx-viacep';

export class ExceptionSearchCep {

  static exceptions(error: ErroCep) {
    switch(error.getCode()){
      case ErrorValues.CEP_NAO_ENCONTRADO:
          alert('O CEP informado não foi encontrado!');
          break;
      case ErrorValues.CEP_INVALIDO:
          alert('O CEP informado está inválido!');
          break;
      case ErrorValues.CEP_MUITO_CURTO:
          alert('O CEP informado está muito curto para consulta!');
          break;
      case ErrorValues.CEP_MUITO_LONGO:
          alert('O CEP informado está muito longo para consulta!');
          break;
      case ErrorValues.ERRO_SERVIDOR:
          alert('Desculpe, ocorreu um erro na busca pelo CEP!');
          break;
    }
  }

}
