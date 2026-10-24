// src/components/NovidadesCatalogo.tsx
type Livro = {
  id: number | string;
  titulo: string;
  capa?: string; // URL da imagem da capa
};

type Props = {
  livros?: Livro[];
  onVerCatalogo?: () => void;
};

export default function NovidadesCatalogo({ livros = [], onVerCatalogo }: Props) {
  const novidades = livros.slice(-6).reverse(); // os 6 últimos cadastrados

  return (
    <section className="novidades">
      <div className="novidades-texto">
        <strong>📖 Novidades do catálogo</strong>
        <span>Descubra os lançamentos e os títulos mais procurados da semana.</span>
      </div>

      <div className="novidades-livros">
        {novidades.length === 0 && (
          <span style={{ fontSize: 12, color: "#7b6f69" }}>Nenhum livro cadastrado ainda.</span>
        )}
        {novidades.map((livro) =>
          livro.capa ? (
            <img
              key={livro.id}
              className="novidades-capa"
              src={livro.capa}
              alt={livro.titulo}
              title={livro.titulo}
            />
          ) : (
            <div key={livro.id} className="novidades-capa novidades-sem-capa" title={livro.titulo}>
              {livro.titulo}
            </div>
          )
        )}
      </div>

      <button className="btn-escuro" onClick={onVerCatalogo}>
        Ver catálogo →
      </button>
    </section>
  );
}