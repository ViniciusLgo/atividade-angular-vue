// avisos que aparecem no canto da tela
// aqui o Vue usa reactive() no lugar do servico do AngularJS:
// a lista e a mesma pra todo mundo que importar esse arquivo
import { reactive } from 'vue'

export const avisos = reactive([])

let proximoId = 1

export function fechar (id) {
  const i = avisos.findIndex(a => a.id === id)
  if (i !== -1) {
    avisos.splice(i, 1)
  }
}

function mostrar (mensagem, tipo) {
  const aviso = { id: proximoId++, mensagem, tipo }
  avisos.push(aviso)

  // some sozinho em 3 segundos
  setTimeout(() => fechar(aviso.id), 3000)
}

export const toast = {
  sucesso: (mensagem) => mostrar(mensagem, 'sucesso'),
  erro:    (mensagem) => mostrar(mensagem, 'erro'),
  info:    (mensagem) => mostrar(mensagem, 'info')
}
