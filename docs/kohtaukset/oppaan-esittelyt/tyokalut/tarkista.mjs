import fs from 'fs';
const SP = process.argv[2]; const K = JSON.parse(fs.readFileSync('/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/paakaupungit-3d-20261016/kohteet.json','utf8'));
let virheita = 0; const v = (id, m) => { virheita++; console.log(`  VIRHE ${id}: ${m}`); };
for (const id of Object.keys(K)) {
  const d = JSON.parse(fs.readFileSync(`${SP}/oppaan-${id}.json`,'utf8')); const lista = K[id].kohteet;
  console.log(id, 'avaus', d.avaus.teksti.length, 'kohteita', d.kohteet.length);
  if (d.id !== id || d.aaneton !== true) v(id,'id/aaneton');
  if (JSON.stringify(d.kierros) !== JSON.stringify(lista.map(k=>k.q))) v(id,'kierros');
  if (!/^Tervetuloa /.test(d.avaus.teksti) || !/Kierros alkaa /.test(d.avaus.teksti) || /1873/.test(d.avaus.teksti)) v(id,'avaus');
  d.kohteet.forEach((k,i) => {
    const l = lista[i], t = `${id}/${k.nimi}`;
    if (k.id !== l.q) v(t,'id'); if (k.nimi !== l.nimi) v(t,'nimi'); if (k.luokka !== l.luokka) v(t,'luokka'); if (k.koko_m !== l.koko_m) v(t,'koko_m');
    if (k.katse_suunta !== l.katse_suunta || k.katse_kaari !== l.katse_kaari) v(t,'katse');
    if ((k.korkeus_m ?? null) !== (l.korkeus_m ?? null)) v(t,`korkeus ${k.korkeus_m} vs ${l.korkeus_m}`);
    if (k.teksti.length < 500 || k.teksti.length > 750) v(t,'teksti '+k.teksti.length);
    if (k.lyhyt !== null && (k.lyhyt.length < 215 || k.lyhyt.length > 380)) v(t,'lyhyt '+k.lyhyt.length);
    if (k.kysymykset.length !== 5 || !k.syventava) v(t,'kysymykset'); if (k.isoisa !== false) v(t,'isoisa');
    if (k.kuvaus.length > 48) v(t,'kuvaus '+k.kuvaus.length);
    if ((k.lahteet||[]).length < 2) v(t,'lahteet'); if (/1873/.test(k.teksti+k.lyhyt)) v(t,'1873');
    if (!k.lahteet.every(x => /^https?:\/\//.test(x.url) && x.vaite)) v(t,'lahde-muoto');
  });
}
console.log('virheitä', virheita);
