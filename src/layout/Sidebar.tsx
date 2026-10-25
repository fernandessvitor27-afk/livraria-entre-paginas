import type { ReactNode } from 'react'
import SidebarFolha from '../components/SidebarFolha'

type SidebarProps = {
  secaoAtiva: string
  aoMudarSecao: (secao: string) => void
}

function Icone({ children }: { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
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

const itensMenu: { nome: string; icone: ReactNode }[] = [
  {
    nome: 'Início',
    icone: (
      <Icone>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9" />
      </Icone>
    ),
  },
  {
    nome: 'Livros',
    icone: (
      <Icone>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </Icone>
    ),
  },
  {
    nome: 'Catálogo',
    icone: (
      <Icone>
        <path d="M4 4v16" />
        <path d="M8 8v12" />
        <path d="M12 6v14" />
        <path d="m16 6 4 14" />
      </Icone>
    ),
  },
  {
    nome: 'Orçamentos',
    icone: (
      <Icone>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
      </Icone>
    ),
  },
  {
    nome: 'Agendamentos',
    icone: (
      <Icone>
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </Icone>
    ),
  },
  {
    nome: 'Fornecedores',
    icone: (
      <Icone>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </Icone>
    ),
  },
  {
    nome: 'Central de Chamados',
    icone: (
      <Icone>
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
        <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
      </Icone>
    ),
  },
  {
    nome: 'Checklist',
    icone: (
      <Icone>
        <path d="m3 17 2 2 4-4" />
        <path d="m3 7 2 2 4-4" />
        <path d="M13 6h8M13 12h8M13 18h8" />
      </Icone>
    ),
  },
  {
    nome: 'Cantinho do Café',
    icone: (
      <Icone>
        <path d="M10 2v2M14 2v2M7 8h10l-1 12H8L7 8Z" />
        <path d="M17 10h2a2 2 0 0 1 0 4h-2" />
        <path d="M9 5h6" />
      </Icone>
    ),
  },
]

function Sidebar({ secaoAtiva, aoMudarSecao }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-marca">
        <img
          className="sidebar-logo"
          src="/logo.jpeg"
          alt="Logo da livraria Entre Páginas"
        />
        <div>
          <h2>Entre Páginas</h2>
          <p>Livraria & Cultura</p>
        </div>
      </div>

      <nav className="sidebar-menu" aria-label="Menu principal">
        <p className="sidebar-legenda">MENU PRINCIPAL</p>

        {itensMenu.map((item) => (
          <button
            key={item.nome}
            type="button"
            className={`sidebar-item ${
              secaoAtiva === item.nome ? 'ativo' : ''
            }`}
            onClick={() => aoMudarSecao(item.nome)}
            aria-current={secaoAtiva === item.nome ? 'page' : undefined}
          >
            <span className="sidebar-simbolo">{item.icone}</span>
            <span>{item.nome}</span>
          </button>
        ))}
      </nav>

      <SidebarFolha />

      <div className="sidebar-rodape">
        <p>Sistema de Gestão</p>
        <small>Livraria independente</small>
      </div>
    </aside>
  )
}

export default Sidebar