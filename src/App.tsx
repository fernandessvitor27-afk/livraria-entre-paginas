import { useState, useEffect } from 'react'
import './App.css'

import Checklist from './components/Checklist'
import Agendamentos from './components/Agendamentos'
import Fornecedores from './components/Fornecedores'
import Livros from './components/Livros'
import Catalogo from './components/Catalogo'
import Orcamentos from './components/Orcamentos'
import CentralChamados from './components/CentralChamados'

import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import Dashboard from './pages/Dashboard'
import './styles/global.css'

type Livro = {
  id: number
  titulo: string
  autor: string
  categoria: string
  preco: number
  quantidade: number
  capa?: string
}

// Chaves do localStorage de cada módulo.
// Se algum contador ficar sempre em 0, confira o nome da chave
// dentro do arquivo do módulo (procure por "localStorage").
const CHAVES = {
  agendamentos: 'agendamentos-livraria',
  fornecedores: 'fornecedores-livraria',
  livros: 'livros-livraria',
  checklist: 'itens-checklist-livraria',
  catalogo: 'catalogo-produtos-livraria',
  orcamentos: 'orcamentos-livraria',
  chamados: 'chamados-livraria',
}

function lerLista<T = unknown>(chave: string): T[] {
  try {
    const dados = JSON.parse(localStorage.getItem(chave) || '[]')
    return Array.isArray(dados) ? (dados as T[]) : []
  } catch {
    return []
  }
}

function App() {
  const [secao, setSecao] = useState('Início')

  const [totalAgendamentos, setTotalAgendamentos] = useState(0)
  const [totalFornecedores, setTotalFornecedores] = useState(0)
  const [totalLivros, setTotalLivros] = useState(0)
  const [totalCatalogo, setTotalCatalogo] = useState(0)
  const [totalOrcamentos, setTotalOrcamentos] = useState(0)
  const [totalChamados, setTotalChamados] = useState(0)
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0)
  const [livros, setLivros] = useState<Livro[]>([])

  useEffect(() => {
    const livrosSalvos = lerLista<Livro>(CHAVES.livros)
    const checklist = lerLista<{ concluido?: boolean }>(CHAVES.checklist)

    setTotalAgendamentos(lerLista(CHAVES.agendamentos).length)
    setTotalFornecedores(lerLista(CHAVES.fornecedores).length)
    setTotalCatalogo(lerLista(CHAVES.catalogo).length)
    setTotalOrcamentos(lerLista(CHAVES.orcamentos).length)
    setTotalChamados(lerLista(CHAVES.chamados).length)
    setTotalLivros(livrosSalvos.length)
    setLivros(livrosSalvos)
    setTarefasConcluidas(checklist.filter((item) => item.concluido).length)
  }, [secao])

  const descricoes: Record<string, string> = {
    Início: 'Acompanhe os principais indicadores da livraria.',
    Livros: 'Organize seu catálogo e controle o estoque.',
    Agendamentos: 'Gerencie atendimentos e atividades culturais.',
    Fornecedores: 'Organize fornecedores e pedidos de compra.',
    Checklist: 'Acompanhe as tarefas de organização do espaço.',
    Catálogo: 'Cadastre livros, preços e controle o estoque.',
    Orçamentos: 'Crie propostas e acompanhe os valores e as situações.',
    'Central de Chamados':
      'Registre solicitações e acompanhe os atendimentos.',
  }

  return (
    <div className="aplicacao layout-novo">
      <Sidebar
        secaoAtiva={secao}
        aoMudarSecao={setSecao}
      />

      <main className="conteudo layout-conteudo">
        <Header
          titulo={secao}
          descricao={descricoes[secao]}
        />

        {secao === 'Início' && (
          <Dashboard
            totalLivros={totalLivros}
            totalCatalogo={totalCatalogo}
            totalAgendamentos={totalAgendamentos}
            totalChamados={totalChamados}
            totalOrcamentos={totalOrcamentos}
            totalFornecedores={totalFornecedores}
            tarefasConcluidas={tarefasConcluidas}
            aoMudarSecao={setSecao}
            livros={livros}
          />
        )}

        {secao === 'Livros' && <Livros />}
        {secao === 'Agendamentos' && <Agendamentos />}
        {secao === 'Fornecedores' && <Fornecedores />}
        {secao === 'Checklist' && <Checklist />}
        {secao === 'Catálogo' && <Catalogo />}
        {secao === 'Orçamentos' && <Orcamentos />}
        {secao === 'Central de Chamados' && <CentralChamados />}
      </main>
    </div>
  )
}

export default App