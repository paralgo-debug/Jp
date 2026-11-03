/* ============ CONFIGURAÇÃO ============ */
const WHATSAPP = "5518996050061";
const MENSAGEM = "Olá! Vim pelo site da VG Limpeza e gostaria de solicitar um orçamento. Poderiam me passar mais informações sobre os serviços e valores?";

/* ANTES E DEPOIS
   Para adicionar um resultado, copie um bloco e ajuste.
   Coloque as fotos em  e informe o nome do arquivo em "antes" e "depois". */
const RESULTADOS = [
  { cat: "Sofás",           titulo: "Sofá de 3 lugares",   desc: "Manchas e sujeira do uso diário removidas.", antes: "sofa1-antes.jpg",     depois: "sofa1-depois.jpg" },
  { cat: "Sofás",           titulo: "Sofá retrátil",       desc: "Tecido renovado após higienização profunda.", antes: "sofa2-antes.jpg",     depois: "sofa2-depois.jpg" },
  { cat: "Colchões",        titulo: "Colchão de casal",    desc: "Limpeza profunda e mais conforto para dormir.", antes: "colchao1-antes.jpg",  depois: "colchao1-depois.jpg" },
  { cat: "Poltronas",       titulo: "Poltrona estofada",   desc: "Tecido limpo e com aspecto de novo.", antes: "poltrona1-antes.jpg", depois: "poltrona1-depois.jpg" },
  { cat: "Cadeiras",        titulo: "Cadeiras de jantar",  desc: "Assentos livres de manchas de alimentos.", antes: "cadeira1-antes.jpg",  depois: "cadeira1-depois.jpg" },
  { cat: "Tapetes",         titulo: "Tapete da sala",      desc: "Sujeira acumulada removida das fibras.", antes: "tapete1-antes.jpg",   depois: "tapete1-depois.jpg" },
  { cat: "Bancos automotivos", titulo: "Bancos do carro",  desc: "Interior limpo, higienizado e sem odores.", antes: "banco1-antes.jpg",    depois: "banco1-depois.jpg" }
];
const CATEGORIAS = ["Sofás","Colchões","Poltronas","Cadeiras","Tapetes","Bancos automotivos"];
/* ================================== */

/* WhatsApp: aplica a mensagem automática em todos os botões */
document.querySelectorAll("a.wa").forEach(a => {
  const servico = a.dataset.s;
  const msg = servico ? MENSAGEM + " Tenho interesse em: " + servico + "." : MENSAGEM;
  a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
});

/* Menu mobile */
const burger = document.getElementById("burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  burger.setAttribute("aria-expanded", aberto);
});
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("aberto"); burger.setAttribute("aria-expanded", false); } });

/* Antes e depois */
const abas = document.getElementById("abas"), grade = document.getElementById("grade-ba");

function foto(src, classe, rotulo) {
  return `<img class="${classe}" src="${src}" alt="${rotulo}" loading="lazy" onerror="this.style.display='none'">`;
}

function mostrar(cat) {
  grade.innerHTML = "";
  RESULTADOS.filter(r => r.cat === cat).forEach(r => {
    const el = document.createElement("article");
    el.className = "ba";
    el.innerHTML = `
      <div class="ba-vis">
        <div class="vazio">Foto do antes</div><div class="vazio d">Foto do depois</div>
        ${foto(r.antes, "antes", "Antes: " + r.titulo)}${foto(r.depois, "depois", "Depois: " + r.titulo)}
        <span class="tag a">Antes</span><span class="tag b">Depois</span>
        <div class="linha"></div>
        <input type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois: ${r.titulo}">
      </div>
      <div class="ba-txt"><h3>${r.titulo}</h3><p>${r.desc}</p></div>`;
    const vis = el.querySelector(".ba-vis");
    el.querySelector("input").addEventListener("input", e => vis.style.setProperty("--p", e.target.value + "%"));
    grade.appendChild(el);
  });
}

CATEGORIAS.forEach((cat, i) => {
  const b = document.createElement("button");
  b.className = "aba"; b.textContent = cat; b.setAttribute("role", "tab");
  b.setAttribute("aria-selected", i === 0);
  b.addEventListener("click", () => {
    abas.querySelectorAll(".aba").forEach(x => x.setAttribute("aria-selected", x === b));
    mostrar(cat);
  });
  abas.appendChild(b);
});
mostrar(CATEGORIAS[0]);

document.getElementById("ano").textContent = new Date().getFullYear();
