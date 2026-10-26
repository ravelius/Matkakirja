# Dioraamamoottorin rajapinnat, erä 2 (Linnanrakentaja 29.9.2026)

Jatke speksiin `docs/raportit/dioraama-rajapinnat-20260929.md` (erä 1; sen säännöt pätevät). Tavoite: kun Codexin
pinnat, kokin atlas ja liekit (tilaus `posti/fable-codex-dioraama-osa1-20260929.md`) sekä Pelikoodarin äänet tulevat,
ne vain pudotetaan paikoilleen ja paketti rakennetaan uudelleen. Siihen asti kaikki toimii paikkamerkeillä.
Nimet ovat tarkkoja. Jos jokin on mahdoton, kirjaa poikkeama raporttiin; älä keksi omaa nimeä hiljaa.

## 1. Lähteet ja paketti

- Kuvalähteet repossa: `assets/dioraama/pinnat/<pinta>.jpg` (läpinäkymättömät, Codexin PNG → JPG q90 tuonnissa),
  `assets/dioraama/hahmot/<henkilo>.png` (RGBA-atlas), `assets/dioraama/liekit/<liekki>.png` (RGBA).
  Puuttuva lähde EI ole virhe: rakennuskone käyttää paikkamerkkiä ja tulostaa rivin `ei lähdettä: <polku>`.
- **Äänitiedostoja ei koskaan repoon** (omistaja 11.9.2026, VARTIO-testi `tests/media.test.mjs`). Äänet asuvat ämpärissä
  rakennuksen juuressa: `dioraama/<rakennus>/aanet/v<versio>/<id>.mp3` (EI hash-kansiossa; `v<versio>` = AANET-pankin
  kyseisen äänen `versio`, koordinaattorin lisäys 29.9.: natiivi välimuistittaa äänet levylle URL:n mukaan, joten
  uusintaotosta pitää syntyä uusi URL). Paikallinen kehitys: `rakenna.mjs <r> --aanet <kansio>` kopioi
  `<kansio>/<id>.mp3` (lähde EI ole versioitu) → `<ulos>/<r>/aanet/v<versio>/<id>.mp3`; ilman lippua ei kopioida.
- Paketin uudet tiedostot (manifestiin kuten muutkin, deterministisesti): `pinnat/<pinta>.jpg`, `hahmot/<henkilo>.png`
  (maalattu tai paikkamerkki), `liekit/<liekki>.png` (maalattu tai paikkamerkki).

## 2. Data (pelin repo)

**PINNAT** (`js/dioraama/pankit/pinnat.js`): uudet valinnaiset kentät `lahde: 'pinnat/<id>.jpg'` (suhteessa
`assets/dioraama/`), `toisto_m: number | [u_m, v_m]`, `virtaus: [u_m_s, v_m_s]` (vain vesi). Codexin mittakaavat:
kivi 2, leikkaus [4, 1], rappaus 2, lankku 1,5, puu 1, katto 1,5, tiili [4, 1], kallio 4, vesi 8 (virtaus [0,04, 0,015]).
`rakennus.json` → `pinnat[id] = { vari, toisto_m, hehku?, virtaus?, tekstuuri?: 'pinnat/<id>.jpg' }`
(`tekstuuri` vain jos lähde on olemassa; `lahde` ei tulostu).

**UV:** `u = a / tu`, `v = b / tv` (numero → tu = tv). Tasoprojektio ennallaan (|nx| → (z, y), |ny| → (x, z),
|nz| → (x, y)). Resepti voi antaa kärjelle `uv_m: [a, b]` metreinä, joka ohittaa projektion:
`torni` ulko/sisä/vyo: a = kulma_rad · säde (sisällä säde − paksuus), b = y; `kartiokatto`: a = kulma_rad · r_pohja,
b = viistomatka pohjasta. Saumakohdassa kärjet eivät hitsaudu (eri uv).

**HENKILOT** (`js/dioraama/pankit/henkilot.js`): valinnainen `maalattu: { lahde: 'hahmot/<id>.png', ruutu: [256, 384],
sarakkeet: 8, pivot: [0.5, 15/384], px_per_m: 196, silmukat: { idle: {rivi: 0, ruudut: 8, fps: 10}, tyo: {rivi: 1,
ruudut: 12, fps: 10}, puhe: {rivi: 3, ruudut: 6, fps: 10} }, lisenssi }` (kokille nyt; muille myöhemmin).
`rakennus.json` → jos `maalattu` ja lähde olemassa: `henkilot[id] = { nimi, korkeus_m, ruutu, sarakkeet, pivot, px_per_m,
silmukat, lisenssi, atlas: 'hahmot/<id>.png' }` (maalattu), muuten nykyinen paikkamerkkimuoto (ei `px_per_m`).
Silmukan ruudut juoksevat riveittäin: ruutu i → k = rivi · sarakkeet + i → (rivi k / sarakkeet, sarake k % sarakkeet).
Puuttuva silmukka (esim. `kavely` maalatussa) → `idle`.

**LIEKIT** (uusi `js/dioraama/pankit/liekit.js`):
```js
export const LIEKIT = {
  tulisija: { lahde: 'liekit/tulisija.png', ruutu: [256, 256], sarakkeet: 4, ruudut: 8, fps: 12, koko_m: [1.1, 1.1], pivot: [0.5, 0.06] },
  kynttila: { lahde: 'liekit/kynttila.png', ruutu: [64, 128], sarakkeet: 4, ruudut: 4, fps: 10, koko_m: [0.05, 0.1], pivot: [0.5, 0.1] },
  soihtu:   { lahde: 'liekit/soihtu.png',   ruutu: [128, 256], sarakkeet: 8, ruudut: 8, fps: 12, koko_m: [0.3, 0.6], pivot: [0.5, 0.08] },
};
```
Tila: `liekit: [{ liekki: 'tulisija', paikka: [x, y, z], koko: 1, vaihe: 0–1 }]`. `rakennus.json` → `liekit[id] =
{ ruutu, sarakkeet, ruudut, fps, koko_m, pivot, atlas: 'liekit/<id>.png' }` käytetyille; tilan `liekit`-lista sellaisenaan.
Paikkamerkkiatlas (ei lähdettä): proseduraalinen, pehmeä pisara valkoisesta keskeltä oranssiin reunaan, alfa = kirkkaus,
ruudut hieman eri muotoisia (siemen), sama koko ja ruudukko kuin yllä.

**AANET** (`js/dioraama/pankit/aanet.js`): `{ id: { silmukka: bool, voimakkuus: 0–1, kesto_s, lisenssi, versio } }`
(`versio` koordinaattorin lisäys 29.9., ks. kohta 1 — kasvatetaan VAIN kun kyseinen äänitiedosto vaihtuu).
Viittaukset: `repliikit[].aani`, `reaktio.aani`, `taulu.kohdat[].aani` (tila- JA rakennustasolla), tilan
`aanet: [{ aani, voimakkuus? }]`. Käsikirjoituksen `{ tee: 'repliikki', hahmo: id, n? }`: valinnainen `n` valitsee
hahmon `repliikit[n]`-rivin (oletus 0, kuten aiemmin, ks. erä 1 kohta 4/5); `reaktio` on aina yksiselitteinen.
Tilan satunnaiset kertaäänet: `tehosteet: [{ aanet: [id, …], valit_s: [min_s, max_s], voimakkuus? }]` — soittaa
listalta yhden satunnaisen äänen kerrallaan, odottaen seuraavaa satunnaisin väliajoin `valit_s`-väliltä (min…max s).
`rakennus.json` → `aanet[id] = { tiedosto: 'aanet/v<versio>/<id>.mp3', silmukka, voimakkuus, kesto_s }`. `tiedosto` on
suhteessa RAKENNUKSEN JUUREEN (kansio, jossa `uusin.json`), ei hash-kansioon.

## 3. Natiivi (proto-git, haara `linnanrakentaja/keittio`)

- **Data** (`DioraamaData.cs`): `Pinta { …, double ToistoU, ToistoV, string Tekstuuri, double VirtausU, VirtausV }`
  (`ToistoM` säilyy = ToistoU); `Henkilo { …, double PxPerM }` (0 = ei); `Rakennus.Liekit : Dictionary<string, Liekki>`,
  `Liekki { Id, Atlas, RuutuL, RuutuK, Sarakkeet, Ruudut, Fps, KokoL, KokoK, PivotX, PivotY }`;
  `Tila.Liekit : List<LiekkiPaikka { LiekkiId, V3 Paikka, double Koko, double Vaihe }>`;
  `Rakennus.Aanet : Dictionary<string, Aani { Id, Tiedosto, bool Silmukka, double Voimakkuus, double KestoS }>`;
  `Tila.Aanet : List<AaniPaikka { AaniId, double Voimakkuus }>`; `Repliikki.Aani` ja `Kohta.Aani` (string).
  Koordinaattorin lisäys 29.9.: `Tila.Tehosteet : List<TehosteJakso { List<string> AaniIdt, double ValiMin, ValiMax,
  Voimakkuus }>` (satunnaiset kertaäänet); `Askel.N` oli jo olemassa (repliikki-askel voi valita rivin sillä);
  `Aani.Tiedosto` sisältää nyt `v<versio>`-alikansion merkkijonona sellaisenaan, ei erillistä Versio-kenttää.
- **Lataus** (`DioraamaSovitin.cs`): pinnan `Tekstuuri` → `Texture2D(2, 2, RGBA32, mipChain: true, linear: false)`,
  `LoadImage`, wrap Repeat, Trilinear, aniso 4 → `rakennusNakyma.AsetaPinta(pintaId, kuva)`. Liekin atlas → wrap Clamp,
  Bilinear → `liekit.AsetaAtlas(liekkiId, kuva)`. `poikki mittaus` kirjaa tekstuurimuistin summan (Mt).
- **Pinta** (`DioraamaRakennus.AsetaPinta(string pintaId, Texture2D kuva)`): materiaaliin `_PohjaKuva`, `_Vari` valkoiseksi,
  `_Virtaus = (VirtausU / ToistoU, VirtausV / ToistoV)` UV/s. Varjostin `DioraamaMaalattu`: `_PohjaKuva ("Pohjakuva", 2D)
  = "white" {}`, `_Virtaus ("Virtaus", Vector) = (0,0,0,0)`; albedo = `_Vari.rgb · tex(uv + _Virtaus.xy · _Time.y).rgb`.
- **Hehku:** näyttämön Volumeen Bloom (threshold 0,9, intensity 0,7, scatter 0,6, lämmin tint), kameraan HDR jos URP
  sallii; lämpötermi saa ylittää 1. Komento `poikki hehku 0|1` (kuten `poikki dof`).
- **Hahmot** (`DioraamaHahmot.cs`): `PxPerM > 0` → quad = (RuutuL / PxPerM, RuutuK / PxPerM), muuten ennallaan;
  ruudut riveittäin; puuttuva silmukka → idle.
- **Liekit** (uusi `DioraamaLiekit.cs` + `Resources/Varjostimet/DioraamaLiekki.shader`): billboard kuten hahmot
  (pystyakselin ympäri), additiivinen (Blend One One, ZWrite Off, Cull Off), väri = tex · `_Voima` ·
  (0,85 + 0,15 · `_DioraamaLepatus`), ruutu = floor(t · fps + vaihe · ruudut) mod ruudut. Elinkaari samoin nimin kuin
  DioraamaHahmot (luonti, `AsetaAtlas(string, Texture2D)`, päivitys kehyksittäin, tuhoaminen).
- **Äänet:** rajapinta sovitaan Natiivisepän kanssa ennen toteutusta (ehdotus: `docs/raportit/dioraama-aanirajapinta-ehdotus.md`).
