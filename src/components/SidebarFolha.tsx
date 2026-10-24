// src/layout/SidebarFolha.tsx
export default function SidebarFolha() {
  return (
    <div className="sidebar-folha">
      <svg
        className="folha-icone"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 4C10 4 4 9 4 15c0 2 1 4 3 5 6 0 13-4 13-16z" />
        <path d="M4 20c3-6 7-9 12-11" />
      </svg>

      <p>“Livros conectam pessoas, ideias e futuros.”</p>
      <span className="folha-linha" />

      <svg className="folha-fundo" viewBox="0 0 200 260" fill="currentColor" aria-hidden="true">
        <path d="M100 250C96 190 98 120 110 20" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M104 200C60 190 38 160 34 120c40 8 62 34 70 80z" />
        <path d="M106 160c40-6 66-30 72-72-42 6-66 30-72 72z" />
        <path d="M104 120C70 108 56 84 56 52c32 8 50 30 48 68z" />
        <path d="M108 90c28-4 46-22 50-52-30 4-46 22-50 52z" />
      </svg>
    </div>
  );
}