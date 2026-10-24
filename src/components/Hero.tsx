type HeroProps = {
  onVerCatalogo?: () => void
}

export default function Hero({ onVerCatalogo }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-texto">
        <small>BEM-VINDO(A)</small>

        <h2>
          Mais que livros,
          <br />
          <span>um espaço de encontro.</span>
        </h2>

        <p>Aqui, a cultura ganha vida em cada página.</p>

        <button className="btn-claro" onClick={onVerCatalogo}>
          Ver catálogo →
        </button>
      </div>

      <div className="hero-imagem" aria-hidden="true" />
    </section>
  )
}



