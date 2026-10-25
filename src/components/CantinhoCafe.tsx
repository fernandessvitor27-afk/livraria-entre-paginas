import { useEffect, useState } from 'react'
import './CantinhoCafe.css'

type ProdutoCafe = {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem: string
}

const produtosIniciais: ProdutoCafe[] = [
  {
    id: 1,
    nome: 'Café Espresso',
    descricao: 'Café encorpado e intenso, perfeito para começar o dia.',
    preco: 6,
    imagem: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    nome: 'Café Coado',
    descricao: 'Sabor clássico e equilibrado, como deve ser.',
    preco: 8,
    imagem: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    nome: 'Cappuccino',
    descricao: 'Café, leite vaporizado e um toque de chocolate.',
    preco: 12,
    imagem: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    nome: 'Latte',
    descricao: 'Café suave com leite espumado.',
    preco: 12,
    imagem: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    nome: 'Chocolate Quente',
    descricao: 'Cremoso e irresistível.',
    preco: 10,
    imagem: '/chocolate-quente.jpg',
  },
  {
    id: 6,
    nome: 'Chá (diversos sabores)',
    descricao: 'Camomila, frutas vermelhas, hortelã e mais.',
    preco: 8,
    imagem: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    nome: 'Café Gelado',
    descricao: 'Refrescante e cheio de sabor.',
    preco: 10,
    imagem: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    nome: 'Panqueca de Chocolate',
    descricao: 'Acompanhe uma bebida quente ou gelada.',
    preco: 16,
    imagem: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80',
  },
]

const CHAVE_PRODUTOS = 'produtos-cantinho-cafe'
const CHAVE_PEDIDO = 'pedido-cantinho-cafe'

// Sugestões de leitura (títulos inventados, só para decorar a página).
const livrosSugeridos = [
  {
    titulo: 'Grandes Histórias',
    tema: 'Clássicos',
    combina: 'Café Espresso',
    capa: 'linear-gradient(160deg, #1d3a6b, #0d1b3a)',
  },
  {
    titulo: 'Noites de Chuva',
    tema: 'Romance',
    combina: 'Chocolate Quente',
    capa: 'linear-gradient(160deg, #a5802f, #5e4517)',
  },
  {
    titulo: 'O Jardim das Palavras',
    tema: 'Poesia',
    combina: 'Chá',
    capa: 'linear-gradient(160deg, #14284f, #0a1530)',
  },
  {
    titulo: 'Manhãs com Aroma',
    tema: 'Crônicas',
    combina: 'Café Coado',
    capa: 'linear-gradient(160deg, #8a6a2c, #4d3a14)',
  },
  {
    titulo: 'Verão em Papel',
    tema: 'Aventura',
    combina: 'Café Gelado',
    capa: 'linear-gradient(160deg, #1a3160, #0d1b3a)',
  },
]
const IMAGEM_PADRAO =
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'

function IconeCarrinho({ tamanho = 16 }: { tamanho?: number }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20.5 7H6" />
    </svg>
  )
}

function IconeCoracao({ tamanho = 14 }: { tamanho?: number }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4.5 6.6 4.5c2 0 3.5 1 5.4 3 1.9-2 3.4-3 5.4-3 3.6 0 5.8 3.7 4.2 7.3C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

function IconeLivro({ tamanho = 28 }: { tamanho?: number }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
      <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function IconeXicara({ tamanho = 20 }: { tamanho?: number }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3c0 1.2 1 1.2 1 2.4M12 3c0 1.2 1 1.2 1 2.4" />
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
    </svg>
  )
}

function carregarProdutos(): ProdutoCafe[] {
  try {
    const dados = localStorage.getItem(CHAVE_PRODUTOS)
    if (dados) {
      const lista = JSON.parse(dados)
      if (Array.isArray(lista)) {
        // Troca a foto antiga (quebrada) do Chocolate Quente pela nova.
        return lista.map((produto: ProdutoCafe) =>
          typeof produto.imagem === 'string' &&
          produto.imagem.includes('photo-1542990253')
            ? { ...produto, imagem: '/chocolate-quente.jpg' }
            : produto,
        )
      }
    }
  } catch {
    // Usa os produtos iniciais caso os dados estejam inválidos.
  }

  return produtosIniciais
}

function carregarPedido(): Record<number, number> {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_PEDIDO) || '{}')
    return dados && typeof dados === 'object' && !Array.isArray(dados)
      ? dados
      : {}
  } catch {
    return {}
  }
}

function CantinhoCafe() {
  const [produtos, setProdutos] = useState<ProdutoCafe[]>(carregarProdutos)
  const [pedido, setPedido] = useState<Record<number, number>>(carregarPedido)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoId, setEditandoId] = useState<number | null>(null)

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')

  useEffect(() => {
    localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(produtos))
  }, [produtos])

  useEffect(() => {
    localStorage.setItem(CHAVE_PEDIDO, JSON.stringify(pedido))
  }, [pedido])

  const formatarPreco = (valor: number) =>
    valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  const limparFormulario = () => {
    setNome('')
    setDescricao('')
    setPreco('')
    setImagem('')
    setEditandoId(null)
    setMostrarFormulario(false)
  }

  const salvarProduto = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const nomeLimpo = nome.trim()
    const descricaoLimpa = descricao.trim()
    const precoNumerico = Number(preco.replace(',', '.'))

    if (
      !nomeLimpo ||
      !descricaoLimpa ||
      !preco.trim() ||
      !Number.isFinite(precoNumerico) ||
      precoNumerico <= 0
    ) {
      alert('Preencha o nome, a descrição e um preço válido maior que zero.')
      return
    }

    if (editandoId !== null) {
      setProdutos((atuais) =>
        atuais.map((produto) =>
          produto.id === editandoId
            ? {
                ...produto,
                nome: nomeLimpo,
                descricao: descricaoLimpa,
                preco: precoNumerico,
                imagem: imagem.trim() || produto.imagem,
              }
            : produto,
        ),
      )
    } else {
      const novoProduto: ProdutoCafe = {
        id: Date.now(),
        nome: nomeLimpo,
        descricao: descricaoLimpa,
        preco: precoNumerico,
        imagem: imagem.trim() || IMAGEM_PADRAO,
      }

      setProdutos((atuais) => [...atuais, novoProduto])
    }

    limparFormulario()
  }

  const abrirNovo = () => {
    if (mostrarFormulario && editandoId === null) {
      limparFormulario()
      return
    }

    setNome('')
    setDescricao('')
    setPreco('')
    setImagem('')
    setEditandoId(null)
    setMostrarFormulario(true)
  }

  const abrirEdicao = (produto: ProdutoCafe) => {
    setNome(produto.nome)
    setDescricao(produto.descricao)
    setPreco(String(produto.preco).replace('.', ','))
    setImagem(produto.imagem)
    setEditandoId(produto.id)
    setMostrarFormulario(true)
  }

  const excluirProduto = (produto: ProdutoCafe) => {
    if (!window.confirm(`Deseja excluir "${produto.nome}" do cardápio?`)) {
      return
    }

    setProdutos((atuais) => atuais.filter((item) => item.id !== produto.id))

    setPedido((atual) => {
      const novo = { ...atual }
      delete novo[produto.id]
      return novo
    })
  }

  const adicionarProduto = (id: number) => {
    setPedido((atual) => ({
      ...atual,
      [id]: (atual[id] || 0) + 1,
    }))
  }

  const removerProduto = (id: number) => {
    setPedido((atual) => {
      const novo = { ...atual }

      if ((novo[id] || 0) <= 1) {
        delete novo[id]
      } else {
        novo[id] -= 1
      }

      return novo
    })
  }

  const irParaCardapio = () => {
    document
      .getElementById('cafe-cardapio')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const totalItens = Object.values(pedido).reduce(
    (total, quantidade) => total + quantidade,
    0,
  )

  const totalPedido = produtos.reduce(
    (total, produto) => total + produto.preco * (pedido[produto.id] || 0),
    0,
  )

  return (
    <div className="cafe-pagina">
      <section className="cafe-banner">
        <div className="cafe-banner-conteudo">
          <span className="cafe-etiqueta">
            <IconeXicara tamanho={30} />
            <span>CANTINHO DO</span>
          </span>
          <h1>Café</h1>
          <p>O sabor perfeito para acompanhar boas histórias.</p>
          <span className="cafe-enfeite" aria-hidden="true">
            <i />
            <b>
              <IconeCoracao />
            </b>
          </span>
        </div>

        <img
          className="cafe-banner-foto"
          src="/cafe-banner.jpg"
          alt="Xícara de café azul com livros e estante ao fundo"
        />
      </section>

      <div className="cafe-layout">
        <section className="cafe-cardapio" id="cafe-cardapio">
          <header className="cafe-cardapio-topo">
            <div>
              <h2>Nossas delícias</h2>
              <p>Cafés, chás e acompanhamentos para tornar sua leitura ainda mais especial.</p>
            </div>

            <button
              type="button"
              className="cafe-botao-novo"
              onClick={abrirNovo}
            >
              + Novo produto
            </button>
          </header>

          {mostrarFormulario && (
            <form className="cafe-formulario" onSubmit={salvarProduto}>
              <h3>
                {editandoId !== null ? 'Editar produto' : 'Cadastrar novo produto'}
              </h3>

              <label htmlFor="cafe-nome">Nome do produto</label>
              <input
                id="cafe-nome"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Ex.: Mocha"
                required
              />

              <label htmlFor="cafe-descricao">Descrição</label>
              <textarea
                id="cafe-descricao"
                value={descricao}
                onChange={(evento) => setDescricao(evento.target.value)}
                placeholder="Descreva o produto"
                required
                rows={3}
              />

              <label htmlFor="cafe-preco">Preço (R$)</label>
              <input
                id="cafe-preco"
                type="text"
                inputMode="decimal"
                value={preco}
                onChange={(evento) => setPreco(evento.target.value)}
                placeholder="Ex.: 12,00"
                required
              />

              <label htmlFor="cafe-imagem">URL da imagem (opcional)</label>
              <input
                id="cafe-imagem"
                type="url"
                value={imagem}
                onChange={(evento) => setImagem(evento.target.value)}
                placeholder="https://..."
              />

              <div className="cafe-formulario-acoes">
                <button type="submit" className="cafe-adicionar">
                  {editandoId !== null ? 'Salvar alterações' : 'Cadastrar produto'}
                </button>

                <button
                  type="button"
                  className="cafe-limpar"
                  onClick={limparFormulario}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          <div className="cafe-grade">
            {produtos.map((produto) => (
              <article className="cafe-produto" key={produto.id}>
                <div className="cafe-produto-imagem">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    loading="lazy"
                    onError={(evento) => {
                      evento.currentTarget.style.visibility = 'hidden'
                    }}
                  />
                  {pedido[produto.id] > 0 && (
                    <span className="cafe-selo" key={pedido[produto.id]}>
                      {pedido[produto.id]}× no pedido
                    </span>
                  )}
                </div>

                <div className="cafe-produto-info">
                  <h3>{produto.nome}</h3>
                  <p>{produto.descricao}</p>
                  <strong>{formatarPreco(produto.preco)}</strong>

                  <button
                    type="button"
                    className="cafe-adicionar"
                    onClick={() => adicionarProduto(produto.id)}
                  >
                    <IconeCarrinho />
                    Adicionar
                  </button>

                  <div className="cafe-produto-acoes">
                    <button type="button" onClick={() => abrirEdicao(produto)}>
                      Editar
                    </button>
                    <button type="button" onClick={() => excluirProduto(produto)}>
                      Excluir
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="cafe-livros">
            <header>
              <h2>Para ler com seu café</h2>
              <p>Sugestões da casa para acompanhar cada xícara.</p>
            </header>

            <div className="cafe-livros-lista">
              {livrosSugeridos.map((livro) => (
                <article className="cafe-livro" key={livro.titulo}>
                  <div
                    className="cafe-livro-capa"
                    style={{ background: livro.capa }}
                  >
                    <IconeLivro tamanho={22} />
                    <strong>{livro.titulo}</strong>
                    <span>{livro.tema}</span>
                  </div>
                  <p>
                    Combina com <b>{livro.combina}</b>
                  </p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside className="cafe-pedido">
          <h3>
            <IconeCarrinho tamanho={18} />
            Seu pedido
            {totalItens > 0 && (
              <em className="cafe-contador" key={totalItens}>
                {totalItens}
              </em>
            )}
          </h3>

          {totalItens === 0 ? (
            <div className="cafe-pedido-vazio">
              <span className="cafe-pedido-icone">
                <IconeCarrinho tamanho={54} />
              </span>
              <strong>Seu carrinho está vazio</strong>
              <p>Escolha suas bebidas e petiscos favoritos.</p>
            </div>
          ) : (
            <div className="cafe-pedido-lista">
              {produtos
                .filter((produto) => pedido[produto.id])
                .map((produto) => (
                  <div className="cafe-pedido-item" key={produto.id}>
                    <img
                      className="cafe-pedido-foto"
                      src={produto.imagem}
                      alt={produto.nome}
                      style={{
                        width: 54,
                        height: 54,
                        flex: 'none',
                        objectFit: 'cover',
                        borderRadius: 10,
                      }}
                    />

                    <div className="cafe-pedido-dados">
                      <strong>{produto.nome}</strong>
                      <p>
                        {pedido[produto.id]} × {formatarPreco(produto.preco)}
                      </p>
                      <span>
                        {formatarPreco(produto.preco * pedido[produto.id])}
                      </span>
                    </div>

                    <div className="cafe-quantidade">
                      <button
                        type="button"
                        aria-label={`Remover uma unidade de ${produto.nome}`}
                        onClick={() => removerProduto(produto.id)}
                      >
                        −
                      </button>

                      <span>{pedido[produto.id]}</span>

                      <button
                        type="button"
                        aria-label={`Adicionar uma unidade de ${produto.nome}`}
                        onClick={() => adicionarProduto(produto.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="cafe-pedido-total">
            <span>
              {totalItens} {totalItens === 1 ? 'item' : 'itens'}
            </span>
            <strong>{formatarPreco(totalPedido)}</strong>
          </div>

          {totalItens > 0 && (
            <button
              type="button"
              className="cafe-limpar"
              onClick={() => setPedido({})}
            >
              Limpar pedido
            </button>
          )}

          <div className="cafe-mensagem">
            <IconeLivro />
            <strong>Leve o sabor da leitura com você!</strong>
            <p>Aqui, cada gole é um convite para novas histórias.</p>

            <button
              type="button"
              className="cafe-convite"
              onClick={irParaCardapio}
            >
              <IconeXicara tamanho={18} />
              Bora tomar um café?
            </button>

            <span className="cafe-mensagem-enfeite" aria-hidden="true">
              <i />
              <b>
                <IconeCoracao tamanho={13} />
              </b>
              <i />
            </span>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CantinhoCafe