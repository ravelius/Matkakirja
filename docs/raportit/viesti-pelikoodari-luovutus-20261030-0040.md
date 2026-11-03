# Pelikoodari: luovutus 30.10.2026 klo 00.40 (konteksti 34 %, Postivahti)

Edellinen luovutus -20261029-2355 (301ae1d60, PR 5630). Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN).
Työkansio _tyo = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029 (skriptit aja-*.zsh, lokit *.log).

## TEHTY tällä vuorolla
- **LR v83 -osoitinhaara** (PT:n ENSIN): natiivi pelikoodari/lr-v83-215 **6143ab773** (worktree /Users/Shared/Claude/wt/proto-pelikoodari-lr83-215,
  peili peili/proto/pelikoodari/lr-v83-215) = runko 643669f52 + salikamera-215 b20ecd450 + natiivi-ui/halli-215 51ee353a6 (1 ristiriita
  Muurikate.cs c2Id ratkaistu); rakennukset-v69, c2-v14, c1-v8, ulkorengas-v7, kaiteet halli-kaiteet-v2, esto **palatsi-esto-v18**
  (_tyo/palatsi-esto-v18, SHA 8911fdee…d40ef; v17 oli koe). NS mergesi → juna-215 d0d7677dd, VS:n lohkokivi → **362182ba5**.
  Juuri: _tyo/juuri-pk7-v83 (tee-juuri-v83.zsh).
- **Sali 04** (PT:n palaute: katto näkyviin + kamera kauemmas), haara pelikoodari/salikamera-215 (worktree wt/proto-pelikoodari-pk7-214):
  379c187f6 (Katto.Pidetty, SaliKatonAlla, DroneNosto.SaliEtaisyys/SaliKorkeus/SaliPaino, katto rajaa kameran) → c0c640ee5 (pito koko
  hallille 17 palaa, KameraSalissa, 5,4 m) → **c9392b8f3** (kamera salissa = AvoimessaHuoneessa + alle räystään + 2 m; viimeinen halli muistetaan).
  Tulokset: c0c640ee5 keisari 0,13 (havainne 0,12) OK; katto EI pysynyt (loki "kameran -1": palarajaukset ja peittokartan alapinta ∞/−0,09);
  botti sali 1: 21 piiloruutua uloskäynnillä, sali 0: 0. Peli 775/775, unity 0.
- **A6 v2 pari** (Tirenge+Hongyige, LR juuri havainne-kuja40/juuri-pk7-v87, runko 643669f52) 03/03b: lokit/havainne-editori-20261030-002826 → PT.
  PT: ei KK:lle (Codex tekee 7-välisen yläkerran). 03b:n tummansininen laatikko + turkoosit läikät ovat Hongyigen omassa mallissa
  (Tripo-atlas, ei tummansinistä) → epäily UV/mip pelin piirrossa; pintalista ei vaikuta piirtoon. V4_sivupaviljonki pintalistalle KUITATTU (PT) →
  lisää A6-osoitinten kanssa.

## KÄYNNISSÄ TAUSTALLA (prosessi katoaa nollauksessa → tarkista loki, aja uudelleen jos ei VALMIS)
1. Sali 04 c9392b8f3: `zsh _tyo/aja-salikamera-04-c9392b8f3.zsh > _tyo/aja-salikamera-04-c9392b8f3.log 2>&1` (04-pari + salibotti 1 ja 0).
   Tarkista: mittari "keisari korkeus" ~0,12, yläreunassa katto/palkisto (ei taivasta), unity.log "salin katto pysyy" > 0,
   piilossa-ruutuja 0 molemmissa botti-ajoissa. Jos katto ei vieläkään pysy: lokirivi "salin katto … keisarin halli N, kameran M" kertoo syyn.
   OK → pari PT:lle (≤ 3 riviä). Oletus DroneNosto.SaliSisakamera = false, kunnes PT kuittaa.
2. B2/B3 pelipari (PT: rungosta 362182ba5 + 4102feda6): `zsh _tyo/aja-b2b3-pari-36218.zsh > _tyo/aja-b2b3-pari-36218.log 2>&1`
   (editori 06 = Meridiaaniportin nimitaulu; 06 0.8 -24 -2.03 = Taihedianin keskiovi terassilla; V4_keskiovi on VAIN g-taihedian-lod0–2:ssa,
   V4_nimitaulu a-meridiaaniportti-lod0–2:ssa). Tarkista paikka (keisari terassilla oven edessä?) → pari PT:lle.

## SEURAAVAKSI
- A6: kun Codexin korjattu GLB (7-välinen yläkerta) on LR:n paketissa → pari 03/03b rungosta **362182ba5** + tutki läikät (UV/mip);
  A6-osoittimet + V4_sivupaviljonki tyylikirja/palatsi-pinnat.json "sallitut" samaan committiin.
- PT 23.4x: Taihemenin reunamuurit v83:ssa → esto v18 leivottu ja junassa (tehty).
- Avoinna ennallaan: vanhat pinnat LR:lle, NUI:n kaidepaketti (nyt junassa 51ee353a6).
