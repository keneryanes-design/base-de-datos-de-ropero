const DATA_URL = "data/compuestos.json";
let compounds = [];
const $ = (s) => document.querySelector(s);
const grid = $("#compoundGrid"), searchInput = $("#searchInput"), groupFilter = $("#groupFilter"), sortFilter = $("#sortFilter");
const groups = ["Alquenos","Alquinos","Alcoholes","Cetonas","Aldehídos","Ácidos carboxílicos","Haluros de ácido","Anhídridos","Aminas","Ésteres"];

function updateConnectionStatus(){
  const el = $("#connectionStatus");
  if (!el) return;
  const offline = !navigator.onLine;
  el.textContent = offline ? "Sin conexión · modo local" : "Conectado";
  el.classList.toggle("offline", offline);
  el.classList.toggle("online", !offline);
}
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();

async function init(){
  try {
    const response = await fetch(DATA_URL);
    if(!response.ok) throw new Error("No se pudo cargar data/compuestos.json");
    compounds = await response.json();
    $("#totalCount").textContent = compounds.length;
    groups.forEach(group=>{
      const opt=document.createElement("option"); opt.value=group; opt.textContent=group; groupFilter.appendChild(opt);
    });
    renderChips(); render();
  } catch(error) {
    grid.innerHTML = '<div class="loading">No se pudo cargar el catálogo. Abre la página mediante un servidor local o GitHub Pages y verifica que exista <code>data/compuestos.json</code>.</div>';
    console.error(error);
  }
}
function renderChips(){
  const holder=$("#groupChips");
  holder.innerHTML="";
  const all=document.createElement("button"); all.className="chip active"; all.textContent="Todos"; all.dataset.group="";
  holder.appendChild(all);
  groups.forEach(g=>{const b=document.createElement("button");b.className="chip";b.textContent=g;b.dataset.group=g;holder.appendChild(b)});
  holder.addEventListener("click",e=>{
    const b=e.target.closest(".chip");if(!b)return;
    groupFilter.value=b.dataset.group;
    holder.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x===b));
    render();
  });
}
function render(){
  const q=searchInput.value.trim().toLocaleLowerCase("es");
  const group=groupFilter.value;
  let rows=compounds.filter(c=>(!group||c.group===group)&&(!q||[c.name,c.formula,c.group,c.id].join(" ").toLocaleLowerCase("es").includes(q)));
  rows.sort((a,b)=>sortFilter.value==="group"?(a.group.localeCompare(b.group,"es")||a.name.localeCompare(b.name,"es")):a.name.localeCompare(b.name,"es"));
  $("#resultCount").textContent=`${rows.length} ${rows.length===1?"resultado":"resultados"}`;
  grid.innerHTML="";
  $("#emptyState").classList.toggle("hidden",rows.length>0);
  grid.classList.toggle("hidden",rows.length===0);
  rows.forEach(c=>{
    const card=document.createElement("article");card.className="compound-card";card.tabIndex=0;card.setAttribute("role","button");card.setAttribute("aria-label",`Ver ficha de ${c.name}`);
    card.innerHTML=`<div class="card-top"><span class="group-tag">${escapeHTML(c.group)}</span><span class="card-number">IR · ${c.id.slice(-2)}</span></div><h3>${escapeHTML(c.name)}</h3><div class="formula">${escapeHTML(c.formula)}</div><div class="card-foot"><span>Bandas orientativas</span><span>Ver ficha ↗</span></div>`;
    card.addEventListener("click",()=>openCompound(c));card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCompound(c)}});
    grid.appendChild(card);
  });
  $("#groupChips").querySelectorAll(".chip").forEach(b=>b.classList.toggle("active",b.dataset.group===group));
}
function escapeHTML(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function openCompound(c){
  const bands=c.bands.map(b=>`<tr><td>${escapeHTML(b.assignment)}</td><td>${escapeHTML(b.range)}</td></tr>`).join("");
  const nist=`https://webbook.nist.gov/cgi/cbook.cgi?Name=${encodeURIComponent(c.name)}&Units=SI`;
  const sdbs=`https://sdbs.db.aist.go.jp/`;
  const cas = c.cas && c.cas.trim() ? escapeHTML(c.cas) : "Pendiente de verificar";
  const state = c.state && c.state.trim() ? escapeHTML(c.state) : "Consultar registro de la fuente";
  const note = c.note ? escapeHTML(c.note) : "Verificar los datos en la fuente original.";
  $("#modalContent").innerHTML=`<span class="modal-kicker">${escapeHTML(c.group.toUpperCase())} · FICHA DE COMPUESTO</span><h2 id="modalTitle">${escapeHTML(c.name)}</h2><div class="modal-formula">${escapeHTML(c.formula)}</div>
  <div class="spectrum-unavailable"><div class="spectrum-unavailable-mark">IR</div><div><h3>Espectro experimental original</h3><p>El espectro original no está incorporado todavía en esta ficha. Consulta las bases de datos de referencia para localizar una medición correspondiente a este compuesto.</p><span class="status-label">Estado: pendiente de localizar y verificar</span></div></div>
  <div class="metadata-grid"><div><span>Grupo funcional</span><b>${escapeHTML(c.group)}</b></div><div><span>Número CAS</span><b>${cas}</b></div><div><span>Estado / técnica</span><b>${state}</b></div><div><span>Identificación</span><b>Confirmar en la fuente</b></div></div>
  <div class="modal-note"><b>Nota sobre los datos:</b> esta ficha no muestra una curva simulada como si fuera experimental. ${note}</div>
  <h3>Bandas características orientativas</h3><p class="table-intro">Rangos generales para el grupo funcional; no son posiciones medidas de este compuesto.</p><table class="band-table"><thead><tr><th>Asignación</th><th>Rango aproximado</th></tr></thead><tbody>${bands}</tbody></table>
  <div class="source-box"><h3>Consultar fuentes originales</h3><p>Busca el nombre o la fórmula y verifica que la identidad del compuesto y las condiciones de medición coincidan antes de utilizar el espectro.</p><div class="modal-actions"><a class="btn primary" href="${nist}" target="_blank" rel="noopener noreferrer">Buscar en NIST ↗</a><a class="btn secondary" href="${sdbs}" target="_blank" rel="noopener noreferrer">Abrir SDBS / AIST ↗</a></div></div>`;
  $("#modal").classList.remove("hidden");document.body.style.overflow="hidden";$("#closeModal").focus();
}
function closeModal(){$("#modal").classList.add("hidden");document.body.style.overflow="";}
searchInput.addEventListener("input",render);groupFilter.addEventListener("change",render);sortFilter.addEventListener("change",render);
$("#clearFilters").addEventListener("click",()=>{searchInput.value="";groupFilter.value="";sortFilter.value="name";render()});
$("#closeModal").addEventListener("click",closeModal);$("#modalBackdrop").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
init();
