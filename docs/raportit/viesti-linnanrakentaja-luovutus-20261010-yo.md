# Linnanrakentajan luovutus 10.10.2026 yö (Olavinlinna v46m–v46q, ND tekselitaso)

Edellinen: `viesti-linnanrakentaja-luovutus-20261009-yo.md`. Haara koodille: `linnanrakentaja-linna-v45e` (worktree
`/Users/Shared/Claude/wt/linnanrakentaja-linna-v45e`, pohja v45d; v45d-worktree poistettu).

## Olavinlinna (kaikki peilissä, Siirtoseppä kytkee junaan 174)

| versio | paketti | blender | sisältö |
|---|---|---|---|
| v46m | 5bbb1b3e82e4e02a | 87d5fc55cbd371e6 | v25-kuori (1499), tekoälyseinät 1–5 sävytettyinä, ranta-1499 v2b, `ulkokuori/asu.json` → asu "1499" (rakenna.mjs) |
| v46n | fa56743af10242ac | 68caa2ba0747d2b4 | + 1499-katot (s6 v4s, paanu/lauta) |
| v46o | 815c41b4b0258f2a | f95e081c58cab245 | + osat.json `tila` (huoneen äänet) |
| v46p | a1bf8d02670338a8 | c1f59f31d8742e3e | + sinisävyn neutralointi, kupari/katot tervaksi, sininen esine kiveksi |
| v46q | 4c01b13e623e0be1 | 0fc378f98508f9a4 | + tornien 1790-l. korotukset ja kartiot pois, kiviharja muurisakaroin (E16) |

- Kuorikansio `_valmiit/olavinlinna-ulkokuori-v25/` (LAHDE.md ajan tasalla); `olavinlinna-blender-v44/ulkokuori` → siihen. v46p:n
  kuoritiedostot `linna-laatu/ulkokuori-v25-koe/tornit-1499/v46p-talteen/`.
- Peiliajo: vie-blender.sh (scratchpad vie46m.zsh = source ~/.zshrc + `--lahde olavinlinna-blender-v44`) → commit blender.json v45e:hen →
  `gh workflow run vie-dioraama.yml --ref linnanrakentaja-linna-v45e -f rakennus=olavinlinna -f kuiva=false -f osoitin=false` → hash lokista.
  CI kopioi vain json/glb/png/jpg/astcm (.txt kaatoi 781/782).
- Uudet työkalut `_valmiit/kaupunkipinnat-v1/lahde/`: kuori_savytys.py (tekoälyseinä valokuvan sävyyn, oranssit, valokuva-alue,
  keltaiset paneelit kiveksi), kuori_hamara_siirto.py (hämärä albedosuhteella, ei leivontaa), kuori_neutraali.py (sininen varjopuoli),
  kuori_1499_savyt.py (kupari/katot tervaksi, siniset esineet), kuori_tornit_1499.py (tornien leikkaus + harja + lattia, laatta),
  kuori_laatta.py (kivilaatta atlaksen vapaaseen 96 px:n neliöön), kuori_projisoi.py --min-kulma.
- Kavely: ranta1499.py ajettu v25-kuorta vasten, kavely.py MARKYYS ranta-1499 0,15, TILA-kentät; siirra_ranta_v25.py; detalji.py
  KARHEUS_MIN kallio 0,8 (materiaalit/kallio-karheus*).
- **Auki PT:llä:** Kijlin torni (1600-l., kokonaan) ja Pyhän Eerikin torni (puuttuu) – a/b/c-kysymys lähetetty. 225°:n punatiili = 1790-l.
  (PT: leikkaus jos korotus, muuten harmaakivi) – tarkista Siirtosepän v46q-arkista, onko jäljellä (bastionit piilotetaan ranta-1499-leikkauksilla).
- Kappalaisen tartu.paikka kirjan reunaan (pieni, jonossa).

## Notre-Dame: tekselitason projisointi (PT: KYLLÄ, korjauslista)

- Uusi `kaupunkipinnat-v1/lahde/projisoi_tekseli.py`: näkyvät kolmiot → Smart UV hitsatulla kopiolla (piilopinnat hide, pakkaus
  marginaali 0,0003), leivonnat (DIFFUSE väri, EMIT sijainti/normaali, AO), tekselikohtainen projektio (pikselintarkka syvyys, w⁴).
  lod0 valmis: `notre-dame-v1/tekoaly-v3-tekseli/` (4096, ~12 px/m, 13,9 M tekseliä, vara 50 %). Vertailu
  `notre-dame-v1/esikatselu/tekoaly-v3/v3_vs_tekseli_etela.jpg`.
- **PT:n korjauslista (seuraavaksi):** 1) näkymättömät tekselit saman materiaalin projisoitujen keskisävyyn / laajennus (kalkkikivi
  yhtenäiseksi), 2) pinaakkelien tummat läikät, 3) lyijykatot tasaisen harmaiksi (poikkilaivan ristikko, pääkaton viirut),
  4) lod1/lod2, 5) puut yhdeksi meshiksi per tyyppi (Cesium 557 Mt -kaatuminen), --portti, 6) vertailukuva pelikulma vs. valokuva
  (Sisältökirjurin nd-kl-referenssit), kulma + versio kuvaan → PT.
- Riddarholmen: Karttaseppä teki ohjauskuvat (_tyo/karttaseppa/ohje-riddarholmen/, malli rh), LR OK:si; projisoi_tekseli.py tarvitsee rh-tapauksen.
