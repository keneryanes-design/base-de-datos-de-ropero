const DATA_URL = "data/compuestos.json";
let compounds = [];
const $ = (s) => document.querySelector(s);
const grid = $("#compoundGrid"), searchInput = $("#searchInput"), groupFilter = $("#groupFilter"), sortFilter = $("#sortFilter");
const groups = ["Ácidos carboxílicos","Alcanos","Alcoholes","Aldehídos","Alquenos","Alquinos","Aminas","Anhídridos","Cetonas","Haluros de ácido"];

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
    card.innerHTML=`<div class="card-top"><span class="group-tag">${escapeHTML(c.group)}</span><span class="card-number">IR · ${escapeHTML(c.id.slice(-2))}</span></div><h3>${escapeHTML(c.name)}</h3><div class="card-details"><div><span>Fórmula molecular</span><b class="formula">${escapeHTML(c.formula)}</b></div><div><span>Grupo funcional</span><b>${escapeHTML(c.group)}</b></div></div><div class="card-foot"><span>Bandas orientativas</span><span>Ver ficha ↗</span></div>`;
    card.addEventListener("click",()=>openCompound(c));card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCompound(c)}});
    grid.appendChild(card);
  });
  $("#groupChips").querySelectorAll(".chip").forEach(b=>b.classList.toggle("active",b.dataset.group===group));
}
function escapeHTML(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function openCompound(c){
  const bands=(c.bands || []).map(b=>`<tr><td>${escapeHTML(b.assignment)}</td><td>${escapeHTML(b.range)}</td></tr>`).join("");
  const nist=`https://webbook.nist.gov/cgi/cbook.cgi?Name=${encodeURIComponent(c.name)}&Units=SI`;
  const sdbs=`https://sdbs.db.aist.go.jp/`;
  const provenance = c.provenance || "Fuente por asignar";
  const provenanceUrl = c.provenance_url || "https://webbook.nist.gov/chemistry/";
  const note = c.note ? escapeHTML(c.note) : "Verificar los datos en la fuente original.";
  $("#modalContent").innerHTML=`<span class="modal-kicker">${escapeHTML(c.group.toUpperCase())} · FICHA DE COMPUESTO</span><h2 id="modalTitle">${escapeHTML(c.name)}</h2><div class="modal-formula">${escapeHTML(c.formula)}</div>
  ${c.image ? `<figure class="spectrum-figure"><img class="spectrum-image" src="${escapeHTML(new URL(c.image, document.baseURI).href)}" alt="Espectro infrarrojo de ${escapeHTML(c.name)}" loading="eager" onerror="this.closest('figure').innerHTML='<p class=\'image-load-error\'>No se pudo cargar la imagen. Comprueba que la carpeta spectra esté subida completa a GitHub.</p>'"><figcaption>Imagen de espectro incluida en los archivos recibidos. La procedencia y las condiciones de medición deben verificarse.</figcaption></figure>` : `<div class="spectrum-unavailable"><div class="spectrum-unavailable-mark">IR</div><div><h3>Espectro no disponible</h3><p>No se ha asociado una imagen a este compuesto.</p></div></div>`}
  <div class="metadata-grid">
    <div><span>Fórmula molecular</span><b class="formula">${escapeHTML(c.formula)}</b></div>
    <div><span>Grupo funcional</span><b>${escapeHTML(c.group)}</b></div>
    <div><span>Procedencia</span><b><a href="${escapeHTML(provenanceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(provenance)}</a></b></div>
  </div>
  <div class="modal-note"><b>Nota sobre los datos:</b> las bandas que siguen son orientativas y no son una lectura automática de los picos de la imagen. ${note}</div>
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


// Preferencia de tema: respeta la selección guardada y, en la primera visita,
// utiliza la preferencia del sistema operativo.
const themeToggle = $("#themeToggle");
function applyTheme(theme){
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  if(themeToggle){
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
    const icon = themeToggle.querySelector(".theme-icon");
    const label = themeToggle.querySelector(".theme-label");
    if(icon) icon.textContent = dark ? "☀" : "☾";
    if(label) label.textContent = dark ? "Modo claro" : "Modo oscuro";
  }
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if(metaTheme) metaTheme.content = dark ? "#101820" : "#24566b";
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("atlas-ir-theme"); } catch(e) {}
const initialTheme = savedTheme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(initialTheme);
if(themeToggle) themeToggle.addEventListener("click",()=>{
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("atlas-ir-theme", next); } catch(e) {}
});

// Búsqueda por imagen: compara una huella visual simplificada de la imagen subida
// con las imágenes del catálogo. Es una ayuda para localizar posibles duplicados,
// no un identificador químico ni una validación de la procedencia.
const spectrumUpload = $("#spectrumUpload");
const imageSearchStatus = $("#imageSearchStatus");
const imageSearchResults = $("#imageSearchResults");
function loadImage(src){
  return new Promise((resolve,reject)=>{
    const img = new Image();
    img.onload = ()=>resolve(img);
    img.onerror = ()=>reject(new Error("No se pudo leer una imagen."));
    img.src = new URL(src, document.baseURI).href;
  });
}
async function visualFingerprint(source){
  const img = typeof source === "string" ? await loadImage(source) : source;
  const canvas = document.createElement("canvas");
  const size = 32;
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d", {willReadFrequently:true});
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0,0,size,size);
  const scale = Math.min(size/img.width, size/img.height);
  const w = img.width*scale, h = img.height*scale;
  ctx.drawImage(img,(size-w)/2,(size-h)/2,w,h);
  const pixels = ctx.getImageData(0,0,size,size).data;
  const values = [];
  for(let i=0;i<pixels.length;i+=4){
    values.push(Math.round((pixels[i]*0.299 + pixels[i+1]*0.587 + pixels[i+2]*0.114)));
  }
  return values;
}
function visualSimilarity(a,b){
  let difference=0;
  for(let i=0;i<a.length;i++) difference += Math.abs(a[i]-b[i]);
  return Math.max(0,Math.round((1-difference/(a.length*255))*100));
}
function showImageMatches(matches){
  imageSearchResults.innerHTML = "";
  if(!matches.length){
    imageSearchResults.innerHTML = "<p>No se encontraron imágenes disponibles para comparar.</p>";
    imageSearchResults.classList.remove("hidden"); return;
  }
  const heading=document.createElement("h4");
  heading.textContent="Posibles coincidencias visuales";
  imageSearchResults.appendChild(heading);
  const list=document.createElement("div"); list.className="image-match-grid";
  matches.forEach(({compound,score})=>{
    const item=document.createElement("button"); item.type="button"; item.className="image-match";
    item.innerHTML=`<img src="${escapeHTML(new URL(compound.image, document.baseURI).href)}" alt="" loading="lazy"><span class="image-match-name">${escapeHTML(compound.name)}</span><span class="image-match-meta">${escapeHTML(compound.formula)} · ${escapeHTML(compound.group)}</span><span class="image-match-score">Similitud visual: ${score}%</span>`;
    item.addEventListener("click",()=>openCompound(compound));
    list.appendChild(item);
  });
  imageSearchResults.appendChild(list);
  imageSearchResults.classList.remove("hidden");
}
if(spectrumUpload){
  spectrumUpload.addEventListener("change",async()=>{
    const file=spectrumUpload.files && spectrumUpload.files[0];
    if(!file) return;
    if(!file.type.startsWith("image/")){
      imageSearchStatus.textContent="Selecciona un archivo de imagen, por ejemplo PNG o JPEG.";
      return;
    }
    imageSearchResults.classList.add("hidden");
    imageSearchStatus.textContent="Analizando la imagen y comparando con el catálogo…";
    spectrumUpload.disabled=true;
    let objectUrl;
    try{
      objectUrl=URL.createObjectURL(file);
      const uploaded=await loadImage(objectUrl);
      const queryFingerprint=await visualFingerprint(uploaded);
      const available=compounds.filter(c=>c.image);
      if(!available.length) throw new Error("No hay rutas de espectros en la base de datos.");
      const scored=await Promise.all(available.map(async compound=>{
        try{
          if(!compound._visualFingerprint) compound._visualFingerprint=await visualFingerprint(compound.image);
          return {compound,score:visualSimilarity(queryFingerprint,compound._visualFingerprint)};
        }catch(error){return null;}
      }));
      const matches=scored.filter(Boolean).sort((a,b)=>b.score-a.score).slice(0,5);
      imageSearchStatus.textContent=`Comparación terminada: ${available.length} imágenes revisadas.`;
      showImageMatches(matches);
    }catch(error){
      console.error(error);
      imageSearchStatus.textContent="No se pudo procesar esa imagen. Prueba con un PNG o JPEG diferente.";
    }finally{
      if(objectUrl) URL.revokeObjectURL(objectUrl);
      spectrumUpload.disabled=false;
    }
  });
}
