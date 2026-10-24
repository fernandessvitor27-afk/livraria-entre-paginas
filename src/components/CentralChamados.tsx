import { useEffect, useState, type FormEvent } from 'react'
import './CentralChamados.css'

type Prioridade = 'Baixa' | 'Média' | 'Alta'
type Situacao = 'Aberto' | 'Em andamento' | 'Encerrado'
type TipoChamado = 'Cliente' | 'Interno'

type Chamado = {
  id: number
  solicitante: string
  tipo: TipoChamado
  assunto: string
  descricao: string
  prioridade: Prioridade
  situacao: Situacao
  origem?: 'Agendamentos'
}

const CHAVE = 'chamados-livraria'

function carregarChamados(): Chamado[] {
  try {
    const dados = localStorage.getItem(CHAVE)

    if (!dados) return []

    const chamadosSalvos = JSON.parse(dados) as Chamado[]

    if (!Array.isArray(chamadosSalvos)) return []

    return chamadosSalvos.filter((chamado, indice, lista) => {
      const indiceOriginal = lista.findIndex(
        (outro) =>
          outro.solicitante?.trim().toLowerCase() ===
            chamado.solicitante?.trim().toLowerCase() &&
          outro.assunto?.trim().toLowerCase() ===
            chamado.assunto?.trim().toLowerCase() &&
          outro.descricao?.trim().toLowerCase() ===
            chamado.descricao?.trim().toLowerCase(),
      )

      return indice === indiceOriginal
    })
  } catch {
    return []
  }
}

function CentralChamados() {
  const [chamados, setChamados] =
    useState<Chamado[]>(carregarChamados)

  const [solicitante, setSolicitante] = useState('')
  const [tipo, setTipo] = useState<TipoChamado>('Cliente')
  const [assunto, setAssunto] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] =
    useState<Prioridade>('Média')
  const [filtro, setFiltro] = useState('Todos')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(chamados))
  }, [chamados])

  function abrirChamado(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setMensagem('')

    const nomeSolicitante = solicitante.trim()
    const assuntoLimpo = assunto.trim()
    const descricaoLimpa = descricao.trim()

    if (!nomeSolicitante || !assuntoLimpo || !descricaoLimpa) {
      setMensagem('Preencha todos os campos antes de abrir o chamado.')
      return
    }

    const duplicado = chamados.some(
      (chamado) =>
        chamado.origem !== 'Agendamentos' &&
        chamado.solicitante.trim().toLowerCase() ===
          nomeSolicitante.toLowerCase() &&
        chamado.assunto.trim().toLowerCase() ===
          assuntoLimpo.toLowerCase() &&
        chamado.descricao.trim().toLowerCase() ===
          descricaoLimpa.toLowerCase(),
    )

    if (duplicado) {
      setMensagem('Esse chamado já está registrado.')
      return
    }

    const novoChamado: Chamado = {
      id: Date.now(),
      solicitante: nomeSolicitante,
      tipo,
      assunto: assuntoLimpo,
      descricao: descricaoLimpa,
      prioridade,
      situacao: 'Aberto',
    }

    setChamados((atuais) => [novoChamado, ...atuais])
    setSolicitante('')
    setTipo('Cliente')
    setAssunto('')
    setDescricao('')
    setPrioridade('Média')
    setMensagem('Chamado aberto com sucesso!')
  }

  function alterarSituacao(id: number, situacao: Situacao) {
    setChamados((atuais) =>
      atuais.map((chamado) =>
        chamado.id === id ? { ...chamado, situacao } : chamado,
      ),
    )
  }

  const chamadosFiltrados = chamados.filter((chamado) =>
    filtro === 'Todos' ? true : chamado.situacao === filtro,
  )

  return (
    <section className="central-chamados">
      <h2>Central de Chamados e Solicitações</h2>

      <p>
        Registre solicitações e acompanhe o atendimento da livraria.
      </p>

      <form
        className="formulario-chamados"
        onSubmit={abrirChamado}
      >
        <label>
          Solicitante
          <input
            value={solicitante}
            onChange={(evento) => setSolicitante(evento.target.value)}
            placeholder="Nome do solicitante"
            required
          />
        </label>

        <label>
          Tipo de chamado
          <select
            value={tipo}
            onChange={(evento) =>
              setTipo(evento.target.value as TipoChamado)
            }
          >
            <option value="Cliente">Cliente</option>
            <option value="Interno">Interno</option>
          </select>
        </label>

        <label>
          Assunto
          <input
            value={assunto}
            onChange={(evento) => setAssunto(evento.target.value)}
            placeholder="Assunto da solicitação"
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            placeholder="Descreva a solicitação"
            required
          />
        </label>

        <label>
          Prioridade
          <select
            value={prioridade}
            onChange={(evento) =>
              setPrioridade(evento.target.value as Prioridade)
            }
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </label>

        <button type="submit">Abrir chamado</button>

        {mensagem && (
          <p className="mensagem-chamados" role="status">
            {mensagem}
          </p>
        )}
      </form>

      <div className="filtro-chamados">
        <label>
          Filtrar por situação
          <select
            value={filtro}
            onChange={(evento) => setFiltro(evento.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Encerrado">Encerrado</option>
          </select>
        </label>
      </div>

      <h3 className="titulo-lista-chamados">
        Chamados registrados ({chamadosFiltrados.length})
      </h3>

      {chamadosFiltrados.length === 0 ? (
        <p className="chamados-vazio">
          Nenhum chamado encontrado.
        </p>
      ) : (
        <div className="lista-chamados">
          {chamadosFiltrados.map((chamado) => (
            <article
              className="cartao-chamado"
              key={chamado.id}
            >
              <h4>Chamado #{chamado.id}</h4>

              <p>
                <strong>Solicitante:</strong> {chamado.solicitante}
              </p>

              <p>
                <strong>Tipo:</strong> {chamado.tipo}
              </p>

              <p>
                <strong>Assunto:</strong> {chamado.assunto}
              </p>

              <p>
                <strong>Descrição:</strong> {chamado.descricao}
              </p>

              <p>
                <strong>Prioridade:</strong> {chamado.prioridade}
              </p>

              <p>
                <strong>Situação:</strong> {chamado.situacao}
              </p>

              <label>
                Atualizar situação
                <select
                  value={chamado.situacao}
                  onChange={(evento) =>
                    alterarSituacao(
                      chamado.id,
                      evento.target.value as Situacao,
                    )
                  }
                >
                  <option value="Aberto">Aberto</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Encerrado">Encerrado</option>
                </select>
              </label>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default CentralChamados