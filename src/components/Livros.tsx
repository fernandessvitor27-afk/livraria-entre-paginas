import { useState, useEffect } from 'react'

type Livro = {
  id: number
  titulo: string
  autor: string
  categoria: string
  preco: number
  quantidade: number
  capa?: string
}

function Livros() {
  const [livros, setLivros] = useState<Livro[]>(() => {
    const dadosSalvos = localStorage.getItem('livros-livraria')
    return dadosSalvos ? JSON.parse(dadosSalvos) : []
  })

  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [preco, setPreco] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [capa, setCapa] = useState('')
  const [pesquisa, setPesquisa] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')

  useEffect(() => {
    localStorage.setItem('livros-livraria', JSON.stringify(livros))
  }, [livros])

  function cadastrarLivro(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const novoLivro: Livro = {
      id: Date.now(),
      titulo: titulo.trim(),
      autor: autor.trim(),
      categoria: categoria.trim(),
      preco: Number(preco),
      quantidade: Number(quantidade),
      capa: capa.trim(),
    }

    setLivros((listaAtual) => [...listaAtual, novoLivro])

    setTitulo('')
    setAutor('')
    setCategoria('')
    setPreco('')
    setQuantidade('')
    setCapa('')
  }

  function excluirLivro(id: number) {
    setLivros((listaAtual) =>
      listaAtual.filter((livro) => livro.id !== id)
    )
  }

  const categorias = Array.from(
    new Set(livros.map((livro) => livro.categoria))
  )

  const livrosFiltrados = livros.filter((livro) => {
    const termo = pesquisa.toLowerCase()

    const correspondePesquisa =
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo)

    const correspondeCategoria =
      filtroCategoria === 'Todas' ||
      livro.categoria === filtroCategoria

    return correspondePesquisa && correspondeCategoria
  })

  return (
    <section className="boas-vindas catalogo-livros">
      <h2>Catálogo de livros</h2>
      <p>Organize o acervo da livraria em um só lugar.</p>

      <form onSubmit={cadastrarLivro}>
        <label htmlFor="titulo">Título do livro</label>
        <input
          id="titulo"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          required
          placeholder="Ex.: O Pequeno Príncipe"
        />

        <label htmlFor="autor">Autor</label>
        <input
          id="autor"
          value={autor}
          onChange={(event) => setAutor(event.target.value)}
          required
          placeholder="Nome do autor"
        />

        <label htmlFor="categoria">Categoria</label>
        <input
          id="categoria"
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          required
          placeholder="Ex.: Literatura"
        />

        <label htmlFor="preco">Preço (R$)</label>
        <input
          id="preco"
          type="number"
          min="0"
          step="0.01"
          value={preco}
          onChange={(event) => setPreco(event.target.value)}
          required
          placeholder="Ex.: 39.90"
        />

        <label htmlFor="quantidade">Quantidade em estoque</label>
        <input
          id="quantidade"
          type="number"
          min="0"
          step="1"
          value={quantidade}
          onChange={(event) => setQuantidade(event.target.value)}
          required
          placeholder="Ex.: 10"
        />

        <label htmlFor="capa">Endereço da imagem da capa (opcional)</label>
        <input
          id="capa"
          type="url"
          value={capa}
          onChange={(event) => setCapa(event.target.value)}
          placeholder="https://site.com/capa.jpg"
        />

        <button type="submit">Cadastrar livro</button>
      </form>

      <div className="catalogo-cabecalho">
        <h2>Acervo ({livros.length})</h2>

        <input
          type="search"
          aria-label="Pesquisar livros por título ou autor"
          placeholder="Pesquisar título ou autor..."
          value={pesquisa}
          onChange={(event) => setPesquisa(event.target.value)}
        />

        <label htmlFor="filtroCategoria">Filtrar categoria</label>
        <select
          id="filtroCategoria"
          value={filtroCategoria}
          onChange={(event) => setFiltroCategoria(event.target.value)}
        >
          <option value="Todas">Todas as categorias</option>
          {categorias.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {livrosFiltrados.length === 0 ? (
        <p>Nenhum livro encontrado. Tente outra pesquisa ou cadastre um livro.</p>
      ) : (
        <div className="grade-livros">
          {livrosFiltrados.map((livro) => (
            <article className="cartao livro-cartao" key={livro.id}>
              <div className="capa-livro">
                <span>📚<br />Capa indisponível</span>
                {livro.capa && (
                  <img
                    src={livro.capa}
                    alt={`Capa do livro ${livro.titulo}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                )}
              </div>

              <div className="livro-detalhes">
                <h3>{livro.titulo}</h3>
                <p>Autor: {livro.autor}</p>
                <p>Categoria: {livro.categoria}</p>
                <p className="livro-preco">
                  R$ {livro.preco.toFixed(2).replace('.', ',')}
                </p>
                <p>
                  Estoque: {livro.quantidade}
                  {livro.quantidade === 0 && ' — Esgotado'}
                </p>

                <button
                  type="button"
                  onClick={() => excluirLivro(livro.id)}
                >
                  Excluir livro
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Livros