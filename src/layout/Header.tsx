type HeaderProps = {
  titulo: string
  descricao: string
}

function Header({ titulo, descricao }: HeaderProps) {
  return (
    <header className="cabecalho-pagina">
      <div>
        <p className="cabecalho-etiqueta">LIVRARIA & ESPAÇO CULTURAL</p>
        <h1>{titulo}</h1>
        <p className="cabecalho-descricao">{descricao}</p>
      </div>

      <div className="cabecalho-status">
        <span className="status-ponto" />
        Sistema ativo
      </div>
    </header>
  )
}

export default Header