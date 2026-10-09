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

## NOLLAUS 10.10. klo 03.0x (PT, konteksti 71 %): TILA JA JATKO TÄSSÄ JÄRJESTYKSESSÄ

**Tehty tämän luovutuksen kirjoittamisen jälkeen (02.1x–03.0x):**
- ND tekselitaso korjattu (projisoi_tekseli.py): piilopinnat naapureihin (2 kierrosta hitsatulla kopiolla → sahakuvio pois),
  UV-kopio tahkovastaavuudella (KDTree), materiaalitunnisteen leivonta (MATID), näkymättömät tekselit materiaalinsa projisoituun
  keskisävyyn, valoisuus 0,75–1,3 × odotus, lyijy = projisoitu mediaani × alkuperäinen^0,2, rakennus yhdeksi meshiksi ja puut yhdeksi
  meshiksi (vientiportti). Ajo: `zsh _valmiit/notre-dame-v1/aja_tekseli_v3.zsh` (lod0 4096 / lod1 2048 / lod2 1024 + portti) → **PORTTI 0 virhettä**.
  Tiedostot `notre-dame-v1/tekoaly-v3-tekseli/nd_atlas_lod{0,1,2}.glb`. Blender-vertailu `esikatselu/tekoaly-v3/vertailu-peli-vs-valokuva-etela-v3-tekseli.jpg`
  (lahde/nd_vertailu_kuva01.py) – PT: EI omistajalle (liian valkoinen, yläosat vaaleammat, lyijy liian vaalea; omistajalle vain pelikuva).

**1) ND sävykalibrointi (ENSIN, pelikuva PT:lle ennen klo 07):** valokuvasta 01 (nd-kl-referenssit-20261009/kuvat/nd-etela/01-…jpg, 900 px:n
   koordinaatit) mitattu: aurinkoinen kivi (länsitorni) **203/192/176**, aurinkoinen kivi (poikkilaivan pääty) 158/150/135, varjoinen kivi
   (laivan tukipilarit) 121/119/91, lyijy (kuorin katto) 191/185/181, lyijy (laivan katto, kirkas taivas) 217/214/213. Atlaksen nykyiset
   keskisävyt: kalkkikivi 199/188/172 (projisoitu), lyijy 130/131/135, veistos 171/158/143, tumma 133/121/113.
   Tee projisoi_tekseli.py:hin `--kalibroi <json>`: (a) materiaalikohtainen korkeusnormalisointi (texel-P:n z 2 m:n lohkoissa → valoisuus
   globaaliin mediaaniin, kerroin 0,7–1,4) = yläosat ja alaosat yhtenäisiksi; (b) kanavakertoimet niin, että mediaani → tavoite (lämmin beige:
   valokuvan aurinko+varjo-keskiarvo sävyltään, valoisuus ~0,85 × nykyinen; lyijy tummemmaksi ~ 0,8 × valokuvan suhde, sinertävän harmaa).
   (c) **Oranssi ovilaatta** etelän poikkilaivan portaalissa keskellä alhaalla: tunnista materiaali (todennäk. alkuperäisen mallin puu/ovi
   MATID:ssä) → tumma puu ~70/50/38. Sitten aja_tekseli_v3.zsh (portti 0) → **luovuta glb:t LS2:lle** (testipaketti ilman osoitinta + pelikuva
   samasta eteläkulmasta PT:lle). Muista: omistajalle vain pelistä otettu kuva.
**2) v46q:n harjat tornin kivipinnalla:** aja_tornit.zsh muutettu (lähde s4 nykyinen = tornin valokuvapinta kohdemaskilla, sävy 0,75 × mediaani,
   pohjana v46p-talteen/). **Ajo käynnistettiin 03.0x taustalle** (`linna-laatu/ulkokuori-v25-koe/tornit-1499/aja_tornit.log`) – jos lokissa ei ole
   "TORNIT KOKO VALMIS", aja uudelleen. Sitten tarkistus (scratchpad ol_lahi.py -malli: kamera tornin harjalle), `tornit-1499/kokoa_v46q.zsh`
   (kopioi glb:t + 8k:t v25-kansioon, 4k/2k + ASTC), MUUTOKSET v46r, vie-blender.sh → commit v45e → peiliajo → Siirtoseppä + PT 8 suuntaa.
**3) a) Kijlin torni kulmatorniksi (PT KYLLÄ, TULKINTA):** kuori_tornit_1499.py:ssä jo leikkaus 20,5 → **16,5** (kehämuuri ympärillä ~14,2 m;
   mittaus scratchpad kijl_tutki.py) – tulee samassa ajossa kuin 2). Tarkista renderillä.
**4) b) Pyhän Eerikin torni:** faktapohja r. 17/246/298 (SE-kulma, purettu osin 1714, jäljellä alin kerros). Etsi paikka ja perusmitat
   (halkaisija, korkeus suhteessa muihin) faktapohjasta/vanhoista piirroksista (Opas 1923, Aspelin 1875); jos riittää → yksinkertainen
   rekonstruktio (TULKINTA), muuten kirjaa syy. Tarkista samalla, että 1600-l. bastionit ovat pelin 1499-asussa piilossa (renderissä näkyvät
   180°/225°/270°; ranta-1499-leikkaukset).
**5) Esittelyn 1499-asu junaan 175** Siirtosepän kanssa (v46q/v46r kytkentä).
**6) Riddarholmen:** Karttasepän ohjauskuvat (_tyo/karttaseppa/ohje-riddarholmen/, diff ortho_ohje.diff) – LR antoi OK:n 02.0x; v1 valmis 02.17,
   v2 (tumma tiili, valurautaspiira) ~02.55. Projisoi projisoi_tekseli.py:llä (lisää malli rh: JUURI riddarholmen-v1, GLB glb-v2b lod*, OHJE
   Karttasepän codex-ohje) – Karttaseppä kertoo kumpi tulos.
