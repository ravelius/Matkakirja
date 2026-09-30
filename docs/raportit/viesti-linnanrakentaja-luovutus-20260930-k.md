# Linnanrakentajan luovutus 30.9.2026 klo 17.1x (-k): Olavinlinna on koko tiimin ykköstyö (omistaja)

Rooli: **Linnanrakentaja (Opus, high)**. Edellinen `…-20260930-j.md` (äänet ja uusi rakenne, säännöt pätevät).
SITOVA: ei äänigenerointia ilman omistajan lupaa. Laatu: "älä pudota laatua yhtään", ja kevennys vain iPhone 15 Pro
(A17 Pro) tai heikompi. Resurssit vapaasti käyttöön (omistaja ei käytä konetta), nice 15, enintään 2 raskasta kerrallaan.

## Avoimet PR:t
- **#3702** linnan CC0/PD-äänet kytketty: PIDOSSA, odottaa omistajan suoraa lupaa Julkaisijalle (mp3-vienti →
  todennus → merge). Mukana myös puhelinja: puhetta ei koodata uudelleen.
- **#3701** (luonnos) uusi rakenne: kertoja 4 jaksoa (laiturijaksossa tila: 'laituri'), infotaulut (Päätoimittajan
  rivit), Pulun v2-tekstit, kuunnelmat (31 riviä, aani null), vihjerivit, anakronismikorjaukset + testiesto.
  Siirtoseppä kytki natiivin (1.1 (73)/(74)). Rebase mainiin #3702:n jälkeen.
- **#3711** laatu: diagnoosi ja suunnitelma, tavoitekuvaskripti, tekselitiheys, materiaalimaski ja AO, linnakirjaston
  speksi + ensimmäinen erä (15 CC0-assettia, manifesti js/dioraama/kirjasto/lahteet.json + testi), merkitse_kuva.py
  ja 8k-huippu (valinnainen). **Mergen jälkeen omistaja ajaa vie-blender.sh** (80 tiedostoa, 786 Mt), ja
  blender.json commitoidaan.

## Laatutyö (Päätoimittajan hyväksymä valinta: B + C)
- Diagnoosi: yksi 4k-atlas koko saarelle, 5,5–6,5 cm tekseliä kohden kaikkialla.
- Tavoitekuvat v1: proto-3d/_valmiit/linna-laatu/tavoite-v1/ (lähetetty omistajalle).
- Vertailu A–D: …/vertailu/vertailu-A-D-merkitty.png. B = CC0-lähidetalji koko linnaan (Siirtoseppä tekee
  kuorivarjostimen maskista kuori-materiaali-2k.png + kirjaston sarjoista). C = Real-ESRGAN ×4 → 8k täyden laadun
  laitteille (tiedostot _valmiit/olavinlinna-blender/ulkokuori/*8k*, LAHDE.md v15). D hylätty.
- **E (Codex)**: tilaus posti/linnanrakentaja-codex-olavinlinna-julkisivu-20260930.md (13671a8c). Taustavahti seuraa
  toimitusta (~/Documents/Codex/2026-09-30/olavinlinna-julkisivu/). Projisoi kuten D (skriptit vertailu/D/) ja vertaa
  B+C:hen. Vaihdetaan vain, jos E on selvästi parempi.
- Kirjasto: lähteet proto-3d/_kirjasto/lahteet/ (29 CC0 + varat) ja tuotokset _kirjasto/valmiit/. Puuttuu: omat
  tarrat (sammal, noki, halkeama proseduraalisesti), esiasetus hamara, vesi, osasarja ja vie-kirjasto.sh.

## Seuraavaksi
1. E:n toimitus → projektio → vertailu → Päätoimittajalle.
2. Tavoitekuvat v2 kirjaston materiaaleilla ja maskilla (sama kuin reaaliaikaputki), ikkunamaskin pisteiden siivous.
3. Delighting (laatusuunnitelman vaihe 3) ja hämärän lightmapit (vaihe 4) Siirtosepän kanssa.
