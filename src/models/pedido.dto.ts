import { RefDto } from "./ref.dto";
import { PagamentoDto } from "./pagamento.dto";
import { itemPedidoDto } from "./item-pedido.dto";

export interface PedidoDto{
    cliente : RefDto;
    enderecoDeEntrega : RefDto;
    pagamento : PagamentoDto;
    itens : itemPedidoDto[];
}