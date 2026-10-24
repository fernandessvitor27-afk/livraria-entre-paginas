import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './Catalogo.css'

type Produto = {
  id: number
  titulo: string
  autor: string
  custo: number
  preco: number
  estoque: number
  capa?: string
}

const CHAVE = 'catalogo-produtos-livraria'
function Catalogo() {
  const [produtos, setProdutos] = useState<Produto[]>(() => {
    try {
      const dados = localStorage.getItem(CHAVE)
      return dados ? (JSON.parse(dados) as Produto[]) : []
    } catch {
      return []
    }
  })

  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [custo, setCusto] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')
  const [capa, setCapa] = useState('')
  const [busca, setBusca] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(produtos))
    } catch {
      alert(
        'Não foi possível salvar: o armazenamento do navegador está cheio. Tente usar imagens menores.',
      )
    }
  }, [produtos])

  function removerImagem() {
    setCapa('')
  }

  function cadastrarProduto(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const custoNumero = Number(custo)
    const precoNumero = Number(preco)
    const estoqueNumero = Number(estoque)

    if (
      !titulo.trim() ||
      !autor.trim() ||
      custo === '' ||
      preco === '' ||
      estoque === '' ||
      !Number.isFinite(custoNumero) ||
      !Number.isFinite(precoNumero) ||
      !Number.isInteger(estoqueNumero) ||
      custoNumero < 0 ||
      precoNumero <= 0 ||
      estoqueNumero < 0
    ) {
      alert('Preencha os campos corretamente.')
      return
    }

    const novoProduto: Produto = {
      id: Date.now(),
      titulo: titulo.trim(),
      autor: autor.trim(),
      custo: custoNumero,
      preco: precoNumero,
      estoque: estoqueNumero,
      capa: capa || undefined,
    }

    setProdutos((atuais) => [...atuais, novoProduto])

    setTitulo('')
    setAutor('')
    setCusto('')
    setPreco('')
    setEstoque('')
    removerImagem()
  }

  function excluirProduto(id: number) {
    if (window.confirm('Deseja realmente excluir este livro?')) {
      setProdutos((atuais) =>
        atuais.filter((produto) => produto.id !== id),
      )
    }
  }

  const produtosFiltrados = produtos.filter((produto) =>
    `${produto.titulo} ${produto.autor}`
      .toLocaleLowerCase('pt-BR')
      .includes(busca.toLocaleLowerCase('pt-BR')),
  )

  const moeda = (valor: number) =>
    valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  const totalEstoque = produtos.reduce(
    (total, produto) => total + produto.estoque,
    0,
  )

  return (
    <section className="catalogo-pagina">
      <header className="catalogo-topo">
        <span className="catalogo-etiqueta">ENTRE PÁGINAS</span>
        <h2>Nosso Catálogo 📚</h2>
        <p>
          Organize seus livros, acompanhe o estoque e consulte os preços
          da sua livraria.
        </p>
      </header>

      <section className="catalogo-indicadores">
        <article className="catalogo-indicador">
          <span>📚</span>
          <div>
            <p>Títulos cadastrados</p>
            <strong>{produtos.length}</strong>
          </div>
        </article>

        <article className="catalogo-indicador">
          <span>📦</span>
          <div>
            <p>Unidades em estoque</p>
            <strong>{totalEstoque}</strong>
          </div>
        </article>

        <article className="catalogo-indicador">
          <span>🔎</span>
          <div>
            <p>Resultados da pesquisa</p>
            <strong>{produtosFiltrados.length}</strong>
          </div>
        </article>
      </section>

      <section className="catalogo-painel">
        <div className="catalogo-titulo-secao">
          <span>✦</span>
          <div>
            <h3>Cadastrar novo livro</h3>
            <p>Preencha os dados para adicionar um título ao catálogo.</p>
          </div>
        </div>

        <form className="catalogo-formulario" onSubmit={cadastrarProduto}>
          <label>
            Título do livro
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex.: O Pequeno Príncipe"
              required
            />
          </label>

          <label>
            Autor
            <input
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Nome do autor"
              required
            />
          </label>

          <div className="catalogo-campo-capa">
            <label>
              Link da capa (opcional)
              <input
                type="url"
                value={capa}
                onChange={(e) => setCapa(e.target.value.trim())}
                placeholder="Cole aqui o link da imagem (https://...)"
              />
            </label>

            {capa && (
              <div className="catalogo-previa">
                <img
                  src={capa}
                  alt="Prévia da capa"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  className="catalogo-botao-remover-capa"
                  onClick={removerImagem}
                >
                  Remover imagem
                </button>
              </div>
            )}
          </div>

          <div className="catalogo-campos-valores">
            <label>
              Custo (R$)
              <input
                type="number"
                min="0"
                step="0.01"
                value={custo}
                onChange={(e) => setCusto(e.target.value)}
                placeholder="0,00"
                required
              />
            </label>

            <label>
              Preço de venda (R$)
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="0,00"
                required
              />
            </label>

            <label>
              Quantidade em estoque
              <input
                type="number"
                min="0"
                step="1"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                placeholder="0"
                required
              />
            </label>
          </div>

          <button className="catalogo-botao-principal" type="submit">
            + Cadastrar livro
          </button>
        </form>
      </section>

      <section className="catalogo-listagem">
        <div className="catalogo-listagem-topo">
          <div>
            <span className="catalogo-etiqueta">ACERVO</span>
            <h3>Livros cadastrados</h3>
            <p>Consulte os preços e acompanhe o estoque dos títulos.</p>
          </div>

          <span className="catalogo-contador">
            {produtosFiltrados.length}{' '}
            {produtosFiltrados.length === 1 ? 'livro' : 'livros'}
          </span>
        </div>

        <label className="catalogo-busca">
          <span>⌕</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar por título ou autor..."
          />
        </label>

        {produtosFiltrados.length === 0 ? (
          <div className="catalogo-vazio">
            <span>📖</span>
            <h4>
              {produtos.length === 0
                ? 'Seu catálogo está começando!'
                : 'Nenhum livro encontrado'}
            </h4>
            <p>
              {produtos.length === 0
                ? 'Cadastre seu primeiro livro no formulário acima.'
                : 'Tente pesquisar usando outro título ou nome de autor.'}
            </p>
          </div>
        ) : (
          <div className="catalogo-grade">
            {produtosFiltrados.map((produto) => {
              const margem =
                produto.preco > 0
                  ? ((produto.preco - produto.custo) / produto.preco) * 100
                  : 0

              return (
                <article className="catalogo-livro" key={produto.id}>
                  <div className="catalogo-capa">
                    {produto.capa ? (
                      <img
                        className="catalogo-capa-imagem"
                        src={produto.capa}
                        alt={`Capa de ${produto.titulo}`}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <>
                        <span>📖</span>
                        <small>ENTRE PÁGINAS</small>
                      </>
                    )}
                  </div>

                  <div className="catalogo-livro-conteudo">
                    <span className="catalogo-livro-etiqueta">
                      LIVRO CADASTRADO
                    </span>

                    <h4>{produto.titulo}</h4>
                    <p className="catalogo-autor">{produto.autor}</p>

                    <div className="catalogo-precos">
                      <div>
                        <span>Preço de venda</span>
                        <strong>{moeda(produto.preco)}</strong>
                      </div>
                      <div>
                        <span>Custo</span>
                        <strong>{moeda(produto.custo)}</strong>
                      </div>
                    </div>

                    <div className="catalogo-livro-rodape">
                      <span
                        className={
                          produto.estoque === 0
                            ? 'catalogo-estoque esgotado'
                            : 'catalogo-estoque'
                        }
                      >
                        {produto.estoque === 0
                          ? 'Sem estoque'
                          : `${produto.estoque} em estoque`}
                      </span>

                      <span className="catalogo-margem">
                        Margem: {margem.toFixed(1)}%
                      </span>
                    </div>

                    <button
                      className="catalogo-botao-excluir"
                      type="button"
                      onClick={() => excluirProduto(produto.id)}
                    >
                      Excluir livro
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </section>
  )
}

export default Catalogo