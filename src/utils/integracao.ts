
export type SolicitacaoIntegrada = {
  id: number
  solicitante: string
  tipo: 'Cliente' | 'Interno'
  assunto: string
  descricao: string
  prioridade: 'Baixa' | 'Média' | 'Alta'
  situacao: 'Aberto' | 'Em andamento' | 'Encerrado'
  origem?: 'Agendamentos'
}

const CHAVE_CHAMADOS = 'chamados-livraria'

export function registrarSolicitacaoDoAgendamento(
  cliente: string,
  servico: string,
  data: string,
  horario: string,
) {
  if (servico !== 'Clube de leitura') {
    return
  }

  try {
    const dados = localStorage.getItem(CHAVE_CHAMADOS)
    const chamados: SolicitacaoIntegrada[] = dados
      ? JSON.parse(dados) as SolicitacaoIntegrada[]
      : []

    const assunto = `Clube de leitura — ${data} às ${horario}`

    const jaExiste = chamados.some(
      (chamado) =>
        chamado.origem === 'Agendamentos' &&
        chamado.assunto === assunto &&
        chamado.solicitante === cliente,
    )

    if (jaExiste) {
      return
    }

    const novaSolicitacao: SolicitacaoIntegrada = {
      id: Date.now(),
      solicitante: cliente,
      tipo: 'Interno',
      assunto,
      descricao: `Organizar e acompanhar a participação de ${cliente} no encontro do clube de leitura.`,
      prioridade: 'Média',
      situacao: 'Aberto',
      origem: 'Agendamentos',
    }

    localStorage.setItem(
      CHAVE_CHAMADOS,
      JSON.stringify([novaSolicitacao, ...chamados]),
    )
  } catch {
    console.error('Não foi possível registrar a solicitação do agendamento.')
  }
}

export function excluirSolicitacaoDoAgendamento(
  cliente: string,
  servico: string,
  data: string,
  horario: string,
) {
  if (servico !== 'Clube de leitura') {
    return
  }

  try {
    const dados = localStorage.getItem(CHAVE_CHAMADOS)

    if (!dados) {
      return
    }

    const chamados = JSON.parse(dados) as SolicitacaoIntegrada[]
    const assunto = `Clube de leitura — ${data} às ${horario}`

    const chamadosAtualizados = chamados.filter(
      (chamado) =>
        !(
          chamado.origem === 'Agendamentos' &&
          chamado.assunto === assunto &&
          chamado.solicitante === cliente
        ),
    )

    localStorage.setItem(
      CHAVE_CHAMADOS,
      JSON.stringify(chamadosAtualizados),
    )
  } catch {
    console.error('Não foi possível excluir a solicitação do agendamento.')
  }
}
