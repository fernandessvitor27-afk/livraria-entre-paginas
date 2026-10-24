import { useEffect, useState, type FormEvent } from 'react'
import './Orcamentos.css'

type ItemOrcamento = {
  id: number
  descricao: string
  quantidade: number
  precoUnitario: number
}

type Orcamento = {
  id: number
  cliente: string
  itens: ItemOrcamento[]
  situacao: 'Pendente' | 'Aprovado' | 'Recusado'
}

function Orcamentos() {
  const [cliente, setCliente] = useState('')
  const [descricao, setDescricao] = useState('')
  const [quantidade, setQuantidade] = useState('1')
  const [preco, setPreco] = useState('')

  const [orcamentos, setOrcamentos] = useState<Orcamento[]>(() => {
    try {
      const dados = localStorage.getItem('orcamentos-livraria')
      return dados ? (JSON.parse(dados) as Orcamento[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('orcamentos-livraria', JSON.stringify(orcamentos))
  }, [orcamentos])

  function criarOrcamento(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const qtd = Number(quantidade)
    const valor = Number(preco)

    if (
      !cliente.trim() ||
      !descricao.trim() ||
      !Number.isInteger(qtd) ||
      qtd <= 0 ||
      !Number.isFinite(valor) ||
      valor <= 0
    ) {
      alert('Preencha os campos corretamente.')
      return
    }

    const novo: Orcamento = {
      id: Date.now(),
      cliente: cliente.trim(),
      itens: [
        {
          id: Date.now(),
          descricao: descricao.trim(),
          quantidade: qtd,
          precoUnitario: valor,
        },
      ],
      situacao: 'Pendente',
    }

    setOrcamentos((atuais) => [...atuais, novo])
    setCliente('')
    setDescricao('')
    setQuantidade('1')
    setPreco('')
  }

  function alterarSituacao(
    id: number,
    situacao: Orcamento['situacao'],
  ) {
    setOrcamentos((atuais) =>
      atuais.map((orcamento) =>
        orcamento.id === id ? { ...orcamento, situacao } : orcamento,
      ),
    )
  }

  function formatarMoeda(valor: number) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <section className="orcamentos-pagina">
      <header className="orcamentos-cabecalho">
        <div>
          <span className="orcamentos-etiqueta">ENTRE PÁGINAS</span>
          <h2>Orçamentos e propostas</h2>
          <p>
            Registre propostas comerciais, consulte os valores e acompanhe
            a situação de cada orçamento.
          </p>
        </div>

        <div className="orcamentos-icone" aria-hidden="true">
          <span>R$</span>
        </div>
      </header>

      <div className="orcamentos-resumo">
        <article className="orcamento-indicador">
          <span className="indicador-titulo">Total de orçamentos</span>
          <strong>{orcamentos.length}</strong>
          <span className="indicador-detalhe">Registros realizados</span>
        </article>

        <article className="orcamento-indicador">
          <span className="indicador-titulo">Pendentes</span>
          <strong>
            {orcamentos.filter((item) => item.situacao === 'Pendente').length}
          </strong>
          <span className="indicador-detalhe">Aguardando decisão</span>
        </article>

        <article className="orcamento-indicador">
          <span className="indicador-titulo">Aprovados</span>
          <strong>
            {orcamentos.filter((item) => item.situacao === 'Aprovado').length}
          </strong>
          <span className="indicador-detalhe">Propostas aceitas</span>
        </article>
      </div>

      <div className="orcamentos-layout">
        <section className="orcamento-painel">
          <div className="orcamento-titulo-painel">
            <span className="orcamento-numero">01</span>
            <div>
              <h3>Novo orçamento</h3>
              <p>Preencha os dados da proposta comercial.</p>
            </div>
          </div>

          <form className="orcamento-formulario" onSubmit={criarOrcamento}>
            <label>
              Nome do cliente
              <input
                type="text"
                placeholder="Digite o nome do cliente"
                value={cliente}
                onChange={(evento) => setCliente(evento.target.value)}
                required
              />
            </label>

            <label>
              Livro ou serviço
              <input
                type="text"
                placeholder="Ex.: Livro, clube de leitura..."
                value={descricao}
                onChange={(evento) => setDescricao(evento.target.value)}
                required
              />
            </label>

            <div className="orcamento-campos-linha">
              <label>
                Quantidade
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={quantidade}
                  onChange={(evento) => setQuantidade(evento.target.value)}
                  required
                />
              </label>

              <label>
                Preço unitário (R$)
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0,00"
                  value={preco}
                  onChange={(evento) => setPreco(evento.target.value)}
                  required
                />
              </label>
            </div>

            <button className="orcamento-botao-criar" type="submit">
              <span aria-hidden="true">＋</span> Criar orçamento
            </button>
          </form>
        </section>

        <section className="orcamento-painel orcamento-listagem">
          <div className="orcamento-titulo-painel">
            <span className="orcamento-numero">02</span>
            <div>
              <h3>Orçamentos registrados</h3>
              <p>Consulte os valores e atualize as situações.</p>
            </div>
          </div>

          {orcamentos.length === 0 ? (
            <div className="orcamento-vazio">
              <span className="orcamento-vazio-icone" aria-hidden="true">
                $
              </span>
              <h4>Nenhum orçamento cadastrado</h4>
              <p>
                Os novos orçamentos aparecerão aqui depois que você preencher
                o formulário.
              </p>
            </div>
          ) : (
            <div className="orcamento-lista">
              {orcamentos.map((orcamento) => {
                const subtotal = orcamento.itens.reduce(
                  (total, item) =>
                    total + item.quantidade * item.precoUnitario,
                  0,
                )

                return (
                  <article className="orcamento-cartao" key={orcamento.id}>
                    <div className="orcamento-cartao-cabecalho">
                      <div>
                        <span className="orcamento-codigo">
                          ORÇAMENTO #{String(orcamento.id).slice(-6)}
                        </span>
                        <h4>{orcamento.cliente}</h4>
                      </div>

                      <span
                        className={`orcamento-status status-${orcamento.situacao.toLowerCase()}`}
                      >
                        {orcamento.situacao}
                      </span>
                    </div>

                    <div className="orcamento-itens">
                      {orcamento.itens.map((item) => (
                        <div className="orcamento-item" key={item.id}>
                          <div>
                            <strong>{item.descricao}</strong>
                            <span>
                              {item.quantidade} ×{' '}
                              {formatarMoeda(item.precoUnitario)}
                            </span>
                          </div>
                          <strong>
                            {formatarMoeda(
                              item.quantidade * item.precoUnitario,
                            )}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="orcamento-total">
                      <span>Valor total</span>
                      <strong>{formatarMoeda(subtotal)}</strong>
                    </div>

                    <label className="orcamento-campo-status">
                      Atualizar situação
                      <select
                        value={orcamento.situacao}
                        onChange={(evento) =>
                          alterarSituacao(
                            orcamento.id,
                            evento.target.value as Orcamento['situacao'],
                          )
                        }
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Recusado">Recusado</option>
                      </select>
                    </label>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default Orcamentos