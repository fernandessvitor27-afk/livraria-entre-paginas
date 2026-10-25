
type Livro = {
  id: number
  titulo: string
  autor: string
  categoria: string
  preco: number
  quantidade: number
  capa?: string
}

type CantinhoLeitorProps = {
  livros: Livro[]
  onVerCatalogo: () => void
}

function CantinhoLeitor({
  livros,
  onVerCatalogo,
}: CantinhoLeitorProps) {
  const livroDestaque = livros[0]

  return (
    <section className="cantinho-leitor">
      <div className="cantinho-conteudo">
        <span className="cantinho-etiqueta">
          ✦ 📚 UM MOMENTO ENTRE PÁGINAS
        </span>

        <h2>Seu cantinho do leitor ☕</h2>

        <p className="cantinho-frase">
          “Cada página é uma nova possibilidade.”
        </p>

        <p className="cantinho-descricao">
          🌿 Encontre sua próxima leitura e reserve um momento
          para imaginar, descobrir e aprender.
        </p>

        <button
          type="button"
          className="cantinho-botao"
          onClick={onVerCatalogo}
        >
          🔎 Explorar catálogo →
        </button>

        <div className="cantinho-detalhes">
          <span>📖 Novas histórias</span>
          <span>☕ Bons momentos</span>
          <span>✧ Grandes descobertas</span>
        </div>
      </div>

      <div className="cantinho-livro">
        <span className="cantinho-livro-etiqueta">
          ✨ LIVRO EM DESTAQUE
        </span>

        {livroDestaque ? (
          <>
            {livroDestaque.capa ? (
              <img
                className="cantinho-capa"
                src={livroDestaque.capa}
                alt={`Capa de ${livroDestaque.titulo}`}
              />
            ) : (
              <div className="cantinho-capa-vazia">
                📖
              </div>
            )}

            <h3>{livroDestaque.titulo}</h3>
            <p>✍️ {livroDestaque.autor}</p>
            <span className="cantinho-selo">✦ Recomendação da casa</span>
          </>
        ) : (
          <>
            <div className="cantinho-capa-vazia">📚</div>
            <h3>Sua próxima leitura</h3>
            <p>Cadastre um livro para vê-lo em destaque aqui.</p>
          </>
        )}
      </div>
    </section>
  )
}

export default CantinhoLeitor
