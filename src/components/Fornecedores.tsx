import { useEffect, useState } from 'react'

type Fornecedor = {
  id: number
  nome: string
  contato: string
  telefone: string
  produto: string
  preco: string
}

type Pedido = {
  id: number
  fornecedor: string
  produto: string
  quantidade: number
  status: string
}

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(() => {
    const dados = localStorage.getItem('fornecedores-livraria')
    return dados ? JSON.parse(dados) as Fornecedor[] : []
  })

  const [pedidos, setPedidos] = useState<Pedido[]>(() => {
    const dados = localStorage.getItem('pedidos-livraria')
    return dados ? JSON.parse(dados) as Pedido[] : []
  })

  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')
  const [telefone, setTelefone] = useState('')
  const [produto, setProduto] = useState('')
  const [preco, setPreco] = useState('')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    localStorage.setItem('fornecedores-livraria', JSON.stringify(fornecedores))
  }, [fornecedores])

  useEffect(() => {
    localStorage.setItem('pedidos-livraria', JSON.stringify(pedidos))
  }, [pedidos])

  function cadastrarFornecedor(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const novoFornecedor: Fornecedor = {
      id: Date.now(),
      nome,
      contato,
      telefone,
      produto,
      preco,
    }

    setFornecedores((lista) => [...lista, novoFornecedor])
    setNome('')
    setContato('')
    setTelefone('')
    setProduto('')
    setPreco('')
    setMensagem('Fornecedor cadastrado com sucesso!')
  }

  function criarPedido(fornecedor: Fornecedor) {
    const novoPedido: Pedido = {
      id: Date.now(),
      fornecedor: fornecedor.nome,
      produto: fornecedor.produto,
      quantidade: 1,
      status: 'Pendente',
    }

    setPedidos((lista) => [...lista, novoPedido])
    setMensagem(`Pedido de ${fornecedor.produto} criado!`)
  }

  function alterarStatusPedido(id: number, status: string) {
    setPedidos((lista) =>
      lista.map((pedido) =>
        pedido.id === id ? { ...pedido, status } : pedido,
      ),
    )
  }

  function excluirFornecedor(id: number) {
    setFornecedores((lista) => lista.filter((item) => item.id !== id))
  }

  return (
    <section className="fornecedores">
      <header className="fornecedores-cabecalho">
        <h2>Fornecedores e Compras</h2>
        <p>Organize fornecedores, compare preços e acompanhe pedidos.</p>
      </header>

      <form className="form-fornecedor" onSubmit={cadastrarFornecedor}>
        <h3>Cadastrar fornecedor</h3>

        <label>
          Nome da empresa
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Distribuidora Central"
            required
          />
        </label>

        <label>
          Nome do contato
          <input
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            placeholder="Pessoa responsável"
            required
          />
        </label>

        <label>
          Telefone
          <input
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone para contato"
            required
          />
        </label>

        <label>
          Produto fornecido
          <input
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            placeholder="Ex.: Livros de literatura"
            required
          />
        </label>

        <label>
          Preço unitário (R$)
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Ex.: 35,90"
            required
          />
        </label>

        <button type="submit" className="botao-fornecedor">
          Cadastrar fornecedor
        </button>

        {mensagem && <p className="mensagem-fornecedor">{mensagem}</p>}
      </form>

      <div className="lista-fornecedores">
        <h3>Fornecedores cadastrados ({fornecedores.length})</h3>

        {fornecedores.length === 0 ? (
          <p>Nenhum fornecedor cadastrado ainda.</p>
        ) : (
          fornecedores.map((fornecedor) => (
            <article className="cartao-fornecedor" key={fornecedor.id}>
              <h4>{fornecedor.nome}</h4>
              <p>Contato: {fornecedor.contato}</p>
              <p>Telefone: {fornecedor.telefone}</p>
              <p>Produto: {fornecedor.produto}</p>
              <p>
                Preço unitário: R${' '}
                {Number(fornecedor.preco).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <div className="acoes-fornecedor">
                <button
                  type="button"
                  className="botao-fornecedor"
                  onClick={() => criarPedido(fornecedor)}
                >
                  Criar pedido
                </button>

                <button
                  type="button"
                  className="botao-excluir-fornecedor"
                  onClick={() => excluirFornecedor(fornecedor.id)}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="lista-pedidos">
        <h3>Pedidos de compra ({pedidos.length})</h3>

        {pedidos.length === 0 ? (
          <p>Nenhum pedido criado ainda.</p>
        ) : (
          pedidos.map((pedido) => (
            <article className="cartao-fornecedor" key={pedido.id}>
              <h4>{pedido.produto}</h4>
              <p>Fornecedor: {pedido.fornecedor}</p>
              <p>Quantidade inicial: {pedido.quantidade}</p>

              <label>
                Situação do pedido
                <select
                  value={pedido.status}
                  onChange={(e) => alterarStatusPedido(pedido.id, e.target.value)}
                >
                  <option>Pendente</option>
                  <option>Enviado</option>
                  <option>Recebido</option>
                  <option>Cancelado</option>
                </select>
              </label>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default Fornecedores