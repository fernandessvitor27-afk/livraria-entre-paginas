import type { ReactNode } from 'react'
import Hero from '../components/Hero'
import NovidadesCatalogo from '../components/NovidadesCatalogo'

type Livro = {
  id: number
  titulo: string
  autor: string
  categoria: string
  preco: number
  quantidade: number
  capa?: string
}

type DashboardProps = {
  totalLivros: number
  totalCatalogo: number
  totalAgendamentos: number
  totalChamados: number
  totalOrcamentos: number
  totalFornecedores: number
  tarefasConcluidas: number
  aoMudarSecao: (secao: string) => void
  livros: Livro[]
}

// Ícones em SVG (traço fino), herdam a cor do texto
function Icone({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const icones = {
  livro: (
    <Icone>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </Icone>
  ),
  catalogo: (
    <Icone>
      <path d="M4 4v16" />
      <path d="M8 8v12" />
      <path d="M12 6v14" />
      <path d="m16 6 4 14" />
    </Icone>
  ),
  agenda: (
    <Icone>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Icone>
  ),
  chamados: (
    <Icone>
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </Icone>
  ),
  orcamento: (
    <Icone>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </Icone>
  ),
  fornecedor: (
    <Icone>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </Icone>
  ),
  concluido: (
    <Icone>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </Icone>
  ),
}

// O campo "secao" precisa ser igual ao nome usado no App.tsx
const modulos = [
  {
    icone: icones.livro,
    titulo: 'Livros',
    texto: 'Cadastre livros e controle o estoque.',
    secao: 'Livros',
  },
  {
    icone: icones.catalogo,
    titulo: 'Catálogo',
    texto: 'Organize produtos, preços e edições.',
    secao: 'Catálogo',
  },
  {
    icone: icones.agenda,
    titulo: 'Agendamentos',
    texto: 'Gerencie eventos, clubes de leitura e oficinas.',
    secao: 'Agendamentos',
  },
  {
    icone: icones.orcamento,
    titulo: 'Orçamentos',
    texto: 'Crie e acompanhe orçamentos de forma simples.',
    secao: 'Orçamentos',
  },
  {
    icone: icones.fornecedor,
    titulo: 'Fornecedores',
    texto: 'Gerencie seus fornecedores e compras.',
    secao: 'Fornecedores',
  },
  {
    icone: icones.concluido,
    titulo: 'Checklist',
    texto: 'Acompanhe as tarefas e rotinas da livraria.',
    secao: 'Checklist',
  },
]

function Dashboard({
  totalLivros,
  totalCatalogo,
  totalAgendamentos,
  totalChamados,
  totalOrcamentos,
  totalFornecedores,
  tarefasConcluidas,
  aoMudarSecao,
  livros,
}: DashboardProps) {
  const indicadores = [
    { icone: icones.livro, rotulo: 'Livros cadastrados', valor: totalLivros, secao: 'Livros' },
    { icone: icones.catalogo, rotulo: 'Produtos no catálogo', valor: totalCatalogo, secao: 'Catálogo' },
    { icone: icones.agenda, rotulo: 'Agendamentos', valor: totalAgendamentos, secao: 'Agendamentos' },
    { icone: icones.chamados, rotulo: 'Chamados', valor: totalChamados, secao: 'Central de Chamados' },
    { icone: icones.orcamento, rotulo: 'Orçamentos', valor: totalOrcamentos, secao: 'Orçamentos' },
    { icone: icones.fornecedor, rotulo: 'Fornecedores', valor: totalFornecedores, secao: 'Fornecedores' },
    { icone: icones.concluido, rotulo: 'Tarefas concluídas', valor: tarefasConcluidas, secao: 'Checklist' },
  ]

  return (
    <div className="dashboard">
      <Hero onVerCatalogo={() => aoMudarSecao('Catálogo')} />

      <section className="indicadores">
        {indicadores.map((item) => (
          <button
            type="button"
            className="indicador-card"
            key={item.rotulo}
            onClick={() => aoMudarSecao(item.secao)}
          >
            <span className="indicador-icone">{item.icone}</span>
            <span className="indicador-rotulo">{item.rotulo}</span>
            <strong className="indicador-valor">{item.valor}</strong>
          </button>
        ))}
      </section>

      <section className="destaques">
        <header className="destaques-topo">
          <div>
            <span className="destaques-etiqueta">ACERVO</span>
            <h2>Destaques do acervo</h2>
            <p>Confira alguns dos livros cadastrados na sua livraria.</p>
          </div>

          {livros.length > 0 && (
            <span className="destaques-contador">
              {livros.length} {livros.length === 1 ? 'livro' : 'livros'}
            </span>
          )}
        </header>

        {livros.length === 0 ? (
          <div className="destaques-vazio">
            <span>📖</span>
            <p>Você ainda não cadastrou nenhum livro.</p>
            <button
              type="button"
              className="destaques-botao"
              onClick={() => aoMudarSecao('Livros')}
            >
              Cadastrar primeiro livro
            </button>
          </div>
        ) : (
          <div className="destaques-grade">
            {livros.map((livro) => (
              <article className="destaques-livro" key={livro.id}>
                <div className="destaques-capa">
                  {livro.capa ? (
                    <img
                      src={livro.capa}
                      alt={`Capa do livro ${livro.titulo}`}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span>📖</span>
                  )}
                </div>

                <div className="destaques-info">
                  <span className="destaques-categoria">
                    {livro.categoria}
                  </span>
                  <h3>{livro.titulo}</h3>
                  <p className="destaques-autor">{livro.autor}</p>

                  <div className="destaques-rodape">
                    <strong>
                      {livro.preco.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </strong>
                    <span
                      className={
                        livro.quantidade === 0
                          ? 'destaques-estoque esgotado'
                          : livro.quantidade <= 5
                            ? 'destaques-estoque baixo'
                            : 'destaques-estoque'
                      }
                    >
                      {livro.quantidade === 0
                        ? 'Sem estoque'
                        : `${livro.quantidade} em estoque`}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {livros.length > 0 && (
          <footer className="destaques-base">
            <p>
              {livros.length}{' '}
              {livros.length === 1 ? 'livro cadastrado' : 'livros cadastrados'}
            </p>

            <button
              type="button"
              className="destaques-botao"
              onClick={() => aoMudarSecao('Livros')}
            >
              Gerenciar livros →
            </button>
          </footer>
        )}
      </section>

      <NovidadesCatalogo
        livros={livros}
        onVerCatalogo={() => aoMudarSecao('Catálogo')}
      />

      <section className="acesso-rapido">
        <h2>Acesso rápido aos módulos</h2>
        <p>Gerencie todas as áreas da sua livraria em um só lugar.</p>

        <div className="acesso-grade">
          {modulos.map((modulo) => (
            <button
              type="button"
              className="acesso-card"
              key={modulo.titulo}
              onClick={() => aoMudarSecao(modulo.secao)}
            >
              <span className="acesso-icone">{modulo.icone}</span>

              <div>
                <strong>{modulo.titulo}</strong>
                <small>{modulo.texto}</small>
              </div>

              <span className="acesso-seta">→</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard