import { useState, useEffect } from 'react'

type ItemChecklist = {
  id: number
  descricao: string
  concluido: boolean
}

function Checklist() {
  const [itens, setItens] = useState<ItemChecklist[]>(() => {
  const dadosSalvos = localStorage.getItem('itens-checklist-livraria')

  if (dadosSalvos) {
    return JSON.parse(dadosSalvos) as ItemChecklist[]
  }

  return [
    { id: 1, descricao: 'Verificar limpeza das estantes', concluido: false },
    { id: 2, descricao: 'Conferir estado dos livros', concluido: false },
    { id: 3, descricao: 'Organizar o espaço de leitura', concluido: false },
    { id: 4, descricao: 'Conferir iluminação do ambiente', concluido: false },
  ]
})

useEffect(() => {
  localStorage.setItem(
    'itens-checklist-livraria',
    JSON.stringify(itens)
  )
}, [itens])

const [observacoes, setObservacoes] = useState(() => {
  return localStorage.getItem('observacoes-checklist-livraria') || ''
})

useEffect(() => {
  localStorage.setItem(
    'observacoes-checklist-livraria',
    observacoes
  )
}, [observacoes])

  const concluidos = itens.filter((item) => item.concluido).length

  const percentual = itens.length === 0
    ? 0
    : Math.round((concluidos / itens.length) * 100)

  function alternarItem(id: number) {
    setItens((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id
          ? { ...item, concluido: !item.concluido }
          : item,
      ),
    )
  }

  return (
    <section className="checklist">
      <div className="checklist-cabecalho">
        <div>
          <h2>Checklist de Qualidade</h2>
          <p>Inspeção e organização da livraria</p>
        </div>

        <strong>{percentual}%</strong>
      </div>

      <div className="progresso">
        <div
          className="progresso-preenchido"
          style={{ width: `${percentual}%` }}
        />
      </div>

      <p>
        {concluidos} de {itens.length} itens concluídos
      </p>

      <div className="lista-checklist">
        {itens.map((item) => (
          <label key={item.id} className="item-checklist">
            <input
              type="checkbox"
              checked={item.concluido}
              onChange={() => alternarItem(item.id)}
            />

            <span className={item.concluido ? 'item-concluido' : ''}>
              {item.descricao}
            </span>
          </label>
        ))}
      </div>

      <label className="label-observacoes" htmlFor="observacoes">
        Observações da inspeção
      </label>

      <textarea
        id="observacoes"
        value={observacoes}
        onChange={(evento) => setObservacoes(evento.target.value)}
        placeholder="Registre problemas encontrados ou melhorias necessárias..."
        rows={4}
      />

      <p className="dica-checklist">
        Marque os itens conforme concluir cada verificação.
      </p>
    </section>
  )
}

export default Checklist