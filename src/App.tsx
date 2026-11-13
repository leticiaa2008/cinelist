import { useMemo, useState } from 'react';

type Film = { id: number; title: string; year: number; genre: string; director: string; synopsis: string; rating: string; color: string };
const films: Film[] = [
  { id: 1, title: 'A Cidade Silenciosa', year: 2023, genre: 'Drama', director: 'Marina Costa', synopsis: 'Em uma cidade do interior, uma jovem registra histórias de moradores que estão prestes a partir.', rating: '★★★★☆', color: 'poster-one' },
  { id: 2, title: 'Depois da Chuva', year: 2022, genre: 'Romance', director: 'Caio Mendes', synopsis: 'Dois desconhecidos se encontram em uma pequena estação e compartilham lembranças durante uma noite.', rating: '★★★★★', color: 'poster-two' },
  { id: 3, title: 'Luzes de Domingo', year: 2024, genre: 'Documentário', director: 'Joana Ribeiro', synopsis: 'Um retrato sensível de artistas independentes que mantêm vivo um antigo cinema de bairro.', rating: '★★★★☆', color: 'poster-three' },
  { id: 4, title: 'O Último Verão', year: 2021, genre: 'Suspense', director: 'Rafael Nunes', synopsis: 'Uma família retorna à casa de praia e descobre cartas que mudam sua memória sobre o passado.', rating: '★★★☆☆', color: 'poster-four' }
];

export default function App() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('Todos');
  const [saved, setSaved] = useState<number[]>([]);
  const [selected, setSelected] = useState<Film | null>(null);
  const genres = ['Todos', ...Array.from(new Set(films.map(f => f.genre)))];
  const visible = useMemo(() => films.filter(f =>
    (genre === 'Todos' || f.genre === genre) &&
    `${f.title} ${f.director} ${f.genre}`.toLowerCase().includes(query.toLowerCase())
  ), [query, genre]);

  function toggleSaved(id: number) {
    setSaved(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  }

  return <main className="app-shell">
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-mark">▰</span> Cine<span>List</span></a>
      <span className="tagline">O cinema fora do óbvio.</span>
    </header>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">DESCUBRA NOVAS HISTÓRIAS</p>
        <h1>Grandes filmes.<br/><em>Novos olhares.</em></h1>
        <p className="hero-description">Explore produções independentes, conheça novos diretores e compartilhe suas resenhas.</p>
        <a className="hero-button" href="#catalogo">Explorar catálogo <span>↗</span></a>
      </div>
      <div className="hero-art" aria-label="Ilustração de claquete de cinema"><div className="film-reel">✺</div><div className="clapper"><div className="clapper-top">◩ ◩ ◩ ◩</div><div className="clapper-body">CINEMA<br/><small>INDEPENDENTE</small></div></div><span className="art-caption">SESSÃO AUTORAL Nº 021</span></div>
    </section>
    <section className="catalog" id="catalogo">
      <div className="section-heading"><div><p className="eyebrow">CURADORIA CINELIST</p><h2>Encontre seu próximo filme</h2></div><span className="count">{visible.length} títulos</span></div>
      <div className="filters">
        <input aria-label="Buscar filmes" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por filme ou diretor..." />
        <select aria-label="Filtrar gênero" value={genre} onChange={e => setGenre(e.target.value)}>{genres.map(g => <option key={g}>{g}</option>)}</select>
      </div>
      <div className="film-grid">
        {visible.map((film) => <article className="film-card" key={film.id}>
          <button className={`poster ${film.color}`} onClick={() => setSelected(film)} aria-label={`Ver detalhes de ${film.title}`}><span className="poster-kicker">CINELIST ORIGINAL</span><span className="poster-symbol">✦</span><strong>{film.title}</strong><small>{film.year} · {film.genre}</small></button>
          <div className="film-info"><div><h3>{film.title}</h3><p>{film.director} · {film.year}</p></div><button className={`save ${saved.includes(film.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(film.id)} aria-label="Salvar filme">{saved.includes(film.id) ? '♥' : '♡'}</button></div>
          <div className="film-bottom"><span className="stars">{film.rating}</span><button className="details" onClick={() => setSelected(film)}>Ver resenha ↗</button></div>
        </article>)}
      </div>
      {visible.length === 0 && <p className="empty">Nenhum filme encontrado. Tente outra busca.</p>}
    </section>
    <footer>© 2026 CineList · Feito para quem ama descobrir cinema independente.</footer>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}>×</button><p className="eyebrow">RESENHA EM DESTAQUE</p><h2>{selected.title}</h2><p className="modal-meta">{selected.year} · {selected.genre} · Direção: {selected.director}</p><p>{selected.synopsis}</p><p className="stars">{selected.rating}</p><button className="hero-button" onClick={() => toggleSaved(selected.id)}>{saved.includes(selected.id) ? 'Remover dos salvos' : 'Salvar na minha lista'}</button></section></div>}
  </main>;
}
