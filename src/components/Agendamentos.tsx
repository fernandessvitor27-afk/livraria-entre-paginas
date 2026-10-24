
import { useState, useEffect, type FormEvent } from 'react'
import {
  registrarSolicitacaoDoAgendamento,
  excluirSolicitacaoDoAgendamento,
} from '../utils/integracao'

type Agendamento = {
  id: number
  cliente: string
  servico: string
  profissional: string
  data: string
  horario: string
  status: string
}

function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    try {
      const dadosSalvos = localStorage.getItem('agendamentos-livraria')
      return dadosSalvos ? (JSON.parse(dadosSalvos) as Agendamento[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'agendamentos-livraria',
      JSON.stringify(agendamentos),
    )
  }, [agendamentos])

  const [cliente, setCliente] = useState('')
  const [servico, setServico] = useState('Atendimento literário')
  const [profissional, setProfissional] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [mensagem, setMensagem] = useState('')

  function cadastrarAgendamento(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const nomeCliente = cliente.trim()
    const nomeProfissional = profissional.trim()

    const novoAgendamento: Agendamento = {
      id: Date.now(),
      cliente: nomeCliente,
      servico,
      profissional: nomeProfissional,
      data,
      horario,
      status: 'Agendado',
    }

    setAgendamentos((listaAtual) => [
      ...listaAtual,
      novoAgendamento,
    ])

    registrarSolicitacaoDoAgendamento(
      nomeCliente,
      servico,
      data,
      horario,
    )

    setCliente('')
    setProfissional('')
    setData('')
    setHorario('')
    setMensagem('Agendamento cadastrado com sucesso!')
  }

  function alterarStatus(id: number, novoStatus: string) {
    setAgendamentos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id
          ? { ...item, status: novoStatus }
          : item,
      ),
    )
  }

  function excluirAgendamento(id: number) {
    const agendamento = agendamentos.find((item) => item.id === id)

    if (agendamento) {
      excluirSolicitacaoDoAgendamento(
        agendamento.cliente,
        agendamento.servico,
        agendamento.data,
        agendamento.horario,
      )
    }

    setAgendamentos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id),
    )

    setMensagem('Agendamento excluído com sucesso!')
  }

  return (
    <section className="agendamentos">
      <div className="agendamentos-cabecalho">
        <h2>Agendamento de Serviços</h2>
        <p>Organize os horários e atendimentos da livraria.</p>
      </div>

      <form
        className="form-agendamento"
        onSubmit={cadastrarAgendamento}
      >
        <label>
          Nome do cliente
          <input
            value={cliente}
            onChange={(evento) => setCliente(evento.target.value)}
            placeholder="Digite o nome do cliente"
            required
          />
        </label>

        <label>
          Serviço
          <select
            value={servico}
            onChange={(evento) => setServico(evento.target.value)}
          >
            <option>Atendimento literário</option>
            <option>Retirada de encomenda</option>
            <option>Clube de leitura</option>
            <option>Oficina cultural</option>
            <option>Evento na livraria</option>
          </select>
        </label>

        <label>
          Profissional responsável
          <input
            value={profissional}
            onChange={(evento) => setProfissional(evento.target.value)}
            placeholder="Nome do profissional"
            required
          />
        </label>

        <div className="campos-data-hora">
          <label>
            Data
            <input
              type="date"
              value={data}
              onChange={(evento) => setData(evento.target.value)}
              required
            />
          </label>

          <label>
            Horário
            <input
              type="time"
              value={horario}
              onChange={(evento) => setHorario(evento.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" className="botao-agendamento">
          Cadastrar agendamento
        </button>

        {mensagem && (
          <p className="mensagem-sucesso" role="status">
            {mensagem}
          </p>
        )}
      </form>

      <div className="lista-agendamentos">
        <h3>Agendamentos cadastrados ({agendamentos.length})</h3>

        {agendamentos.length === 0 ? (
          <p className="sem-agendamentos">
            Nenhum agendamento cadastrado ainda.
          </p>
        ) : (
          agendamentos.map((item) => (
            <article className="cartao-agendamento" key={item.id}>
              <div>
                <h4>{item.cliente}</h4>
                <p>{item.servico}</p>
                <p>Profissional: {item.profissional}</p>
                <p>
                  Data: {item.data} às {item.horario}
                </p>
                <p>
                  Status: <strong>{item.status}</strong>
                </p>
              </div>

              <div className="acoes-agendamento">
                <label>
                  Alterar status
                  <select
                    value={item.status}
                    onChange={(evento) =>
                      alterarStatus(item.id, evento.target.value)
                    }
                  >
                    <option>Agendado</option>
                    <option>Confirmado</option>
                    <option>Concluído</option>
                    <option>Cancelado</option>
                  </select>
                </label>

                <button
                  type="button"
                  className="botao-excluir"
                  onClick={() => excluirAgendamento(item.id)}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default Agendamentos
