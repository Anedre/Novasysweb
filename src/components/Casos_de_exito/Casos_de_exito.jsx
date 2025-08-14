import React, { useEffect, useMemo, useState } from "react";
import "./Casos_de_exito.css";

import entel from "../../img/entel.png";
import pacifico from "../../img/pacifico.svg";
import centrum from "../../img/centrum.png";
import americatel from "../../img/americatel.png";
import interbank from "../../img/Interbank_logo.png";
import renzocosta from "../../img/renzocosta.png";

const DATA = [
  { id:"entel", cliente:"Entel", industria:"Telecom",       accent:"telecom",  logo:entel,
    resumen:"Omnicanal con OSvC y WhatsApp. Campañas + soporte 360°.",
    kpis:["+22% CSAT","-18% TMO","+31% RR"], link:"/entel" },
  { id:"pacifico", cliente:"Pacífico", industria:"Seguros", accent:"seguros",  logo:pacifico,
    resumen:"Pólizas integradas y Vista 360° priorizada por impacto.",
    kpis:["-25% SLA","+17% FCR","+12% NPS"], link:"/casos/pacifico" },
  { id:"centrum", cliente:"CENTRUM", industria:"Educación", accent:"educacion",logo:centrum,
    resumen:"Onboarding digital y journeys por programa.",
    kpis:["+15% leads","+9% conversión","-20% abandono"], link:"/casos/centrum" },
  { id:"americatel", cliente:"Americatel", industria:"Telecom", accent:"telecom", logo:americatel,
    resumen:"POS conectado y tickets en tiempo real.",
    kpis:["-28% espera","+14% 1er contacto","+11% LTV"], link:"/casos/americatel" },
  { id:"interbank", cliente:"Interbank", industria:"Finanzas", accent:"finanzas", logo:interbank,
    resumen:"Vista 360° y fidelización personalizada.",
    kpis:["+15% conversión","-25% SLA","+12% LTV"], link:"/casos/interbank" },
  { id:"renzocosta", cliente:"Renzo Costa", industria:"Retail / Moda", accent:"retail", logo:renzocosta,
    resumen:"eCommerce + OSvC + POS unificados.",
    kpis:["+18% repeat buyers","+21% AOV","-16% incidentes"], link:"/renzo" },
];

function useReveal(){
  useEffect(()=>{
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
    },{threshold:.12});
    document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[]);
}

export default function CasosDeExito(){
  useEffect(()=>window.scrollTo(0,0),[]);
  useReveal();

  const [q,setQ]=useState("");
  const [tag,setTag]=useState("Todos");

  const tags = useMemo(()=>["Todos", ...new Set(DATA.map(d=>d.industria))],[]);
  const filtered = useMemo(()=>{
    const query=q.trim().toLowerCase();
    return DATA.filter(d=>{
      const okTag = tag==="Todos" || d.industria===tag;
      if(!query) return okTag;
      return okTag && (
        d.cliente.toLowerCase().includes(query) ||
        d.resumen.toLowerCase().includes(query) ||
        d.kpis.some(k=>k.toLowerCase().includes(query))
      );
    });
  },[q,tag]);

  return (
    <section className="CE-sigma" aria-labelledby="ce-title">
      <header className="ce-headline reveal">
        <h1 id="ce-title">Casos de éxito</h1>
        <p>Minimal, pro y con impacto en KPIs — sin humo.</p>

        <div className="meta-pillsR" role="list" aria-label="Filtros de industria">
          <button className={`meta-pillR ${tag==="Todos"?"is-active":""}`} onClick={()=>setTag("Todos")} aria-pressed={tag==="Todos"}>🗂️ Todos</button>
          {tags.slice(1).map(t=>(
            <button key={t} className={`meta-pillR ${tag===t?"is-active":""}`} onClick={()=>setTag(t)} aria-pressed={tag===t}>🏷️ {t}</button>
          ))}
          <input
            className="cases-searchR"
            placeholder="🔎 Buscar cliente, KPI o solución…"
            value={q}
            onChange={e=>setQ(e.target.value)}
            aria-label="Buscar casos de éxito"
          />
        </div>
      </header>

      <div className="sigma-grid reveal">
        {filtered.map((c,i)=>(
          <a
            key={c.id}
            href={c.link}
            className="sigma-card"
            data-accent={c.accent}
            style={{transitionDelay:`${i*45}ms`}}
            aria-labelledby={`${c.id}-title`}
          >
            <div className="sigma-aurora" aria-hidden />
            <div className="sigma-side" aria-hidden />

            {/* Overlay SOLO con emoji de link */}
            <div className="sigma-overlay" aria-hidden>
              <span className="overlay-emoji" role="img" aria-label="Abrir caso">🔗</span>
            </div>

            <div className="sigma-top">
              <img className="sigma-logo" src={c.logo} alt={`${c.cliente} logo`} loading="lazy" height={28}/>
              <span className="sigma-tag">{c.industria}</span>
            </div>

            <h3 id={`${c.id}-title`} className="sigma-title">{c.cliente}</h3>
            <p className="sigma-summary">{c.resumen}</p>
            <ul className="sigma-kpis" aria-label="KPIs">
              {c.kpis.slice(0,3).map((k,idx)=><li key={idx}>{k}</li>)}
            </ul>
          </a>
        ))}
      </div>
    </section>
  );
}
