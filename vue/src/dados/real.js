// deixa o preco no formato R$ 68,90
export function real (valor) {
  if (valor === undefined || valor === null) {
    return ''
  }
  return 'R$ ' + valor.toFixed(2).replace('.', ',')
}
