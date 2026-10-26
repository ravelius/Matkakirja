# Karttasepän luovutus 26.10.2026 klo 15.12 (Postivahti: kova raja 39 %)

Lue ensin CLAUDE.md, tuotannonohjauksen osio 0 (`git show origin/main:docs/tuotanto/tuotannonohjaus.md`) ja
`node tools/raamattu-luku.mjs 7.47`. Edellinen luovutus: 024389943 (`viesti-karttaseppa-luovutus-20261026c.md`).
VIESTIT aina send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`), PT:lle ≤ 3 riviä. Käännökset ja simut
vain Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA), kaikki b6:lla.
AJA `zsh tyokalut/tarkista.sh` ENNEN JOKAISTA KÄÄNNÖSPYYNTÖÄ (41e36fef6 kaatui JU:lla liikevahtiin; palauta sen jälkeen
`git checkout -- Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss Assets/Matkakirja/UI/Tyylikirja.cs tyylikirja/tyylikirja.json`).
Kartta-testit: `Kartta-testit/kaanna.sh` (sh, ei zsh) 546/546.

## SEURAAJALLE ENSIN: Tripo-vertailun simuajo (PT 15.4x)
- JU kääntää `peili/proto/karttaseppa/tripo-vertailu` 5fea10af8 (EI JUNAAN) → `_tyo/karttaseppa/tripo-vertailu-app` (L2, alkoi ~15.10).
  KÄÄNNETTY → kirjoita `<app>/kaannos.out` rivi "KÄÄNNETTY 5fea10af8 …" jos puuttuu. SIMU NYT 00CF62C2 →
  `cd /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/elava-kartta-20261025 && SK=sk-tripo.txt ERA=tripo zsh ajo-elava.zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tripo-vertailu-app`
  → SIMU VAPAA JU:lle.
- Skenaario kuvaa saman kamerakohdan ennen ja jälkeen `komento symbolit tripo 1` (A nykyinen sarja / B Tripo): Colosseum,
  Matterhorn, Kinderdijk; `symbolit loydetty` (Kinderdijk ei näkynyt löytämättömänä). Tarkista lokista
  "Tripo-koe <avain> … kolmiota" ja "purettu N kappaletta".
- PT:n ehdot: kuvapari ILMAN tekstiä kuvan päällä (käytä `kuvat/raaka/*.png`, selite omalle raidalle, esim. ffmpeg pad + drawtext
  alle), vasen nykyinen, oikea Tripo, sama kohta ja kulma. Kuva PT:lle (local_5df52e10), hän tarkistaa ennen KK-korttia.
- Toteutus: `Assets/Matkakirja/Kartta/Symbolimallit.TripoKoe.cs` (GLB → GlbLukija, värikartan sävy UV-näytteenä kärkiväreiksi →
  Symbolimalli-seepia, sama sarjan siluettimitoitus, Kinderdijkin SarjaKerroin 0,75 ei käytössä, liikkuvia osia ei luoda),
  GLB:t `Resources/TripoKoe/*.bytes` Codexin toimituksesta (T7 …/output/kartta-maamerkit-812-20261021/review-v1 ja
  review-colosseum-v1; Matterhorn ja Kinderdijk SHA256 = Codexin raportti). Jos Tripo-malli näkyy väärin päin tai sivuttain:
  GlbLukija kääntää −Z → +Z (pohjoinen); Codex ei vahvistanut pohjoissuuntaa (avoin kohta #812).

## Tila: proto-haara `karttaseppa/elava-kartta`, kärki 5dab5b434 (b6, peilissä, PT KUITTASI JUNAAN 211 klo 15.1x)
NS mergeää junaan 211 ja asentaa iPad Pro 11:een (omistajan pyyntö 14.32: uusi tarkempi kartta koko maapallosta). Merge
juna-211 55eebaad1:een puhdas. NUI:n Tietoja-maininta: natiivi-ui/tietoja-elava-kartta-211 = 8316b51cc (korvaa 6f5f3a0bc).
Tänään luovutuksen 024389943 jälkeen:
- 006fc2f1e → 41e36fef6 → 5dab5b434: elävät elementit sarjassa kiinteällä yläviistolla 45° ruudun ylös (häipyy kameran
  kallistuessa); ennen ne näkyivät suoraan ylhäältä (pyörä viivana, karuselli kiekkona). 5dab5b434 = liikepoikkeus-merkintä.
- c5040b16f: elävän kartan peitto Z11 1/3, Z12 2/3, Z13– 1 (PT 14.0x), tyyliversio e6 → siirtymä pehmeä.
- Simut (proto-3d/lokit): todistus-sarja-20261026-1349, -elava-esilataus-…-1355, -sarja2-…-1417, -sarja3-…-1435 (New York,
  Tokio, Sydney), -esilataus3-…-1451 (Reykjavik, Istanbul, Kairo, Rio, Helsinki), -esilataus4-…-1500 (ESILATAUSRIVI TODENNETTU:
  "esilataus edinburgh 251 palaa (haettu 251, puuttui 0) 36,4 s" bussimatkan jälkeen).
- Raportti ja kuvat: `proto-3d/_tyo/karttaseppa/elava-kartta-20261025/raportti-sarja-esilataus-20261026.md`.
- Skenaariohuomiot: `matka … lento` Lontoosta ei käy (ei reittiä), `peninkulma` vaatii linssin, `heita` ei käy vaiheessa
  Toiminta → käytä `peli matka edinburgh bussi`. Kartuscha (vasen alakulma) = pelaajan maa, ei kameran.

## Tasangot (web-haara karttaseppa-tasangot, wt /Users/Shared/Claude/wt/karttaseppa-tasangot)
- c71643abb generaattorin tasankokorostus; e6e71a013 resepti 2026-10-26 (= TUOTANNON 2026-09-26 + `--reliefi-koe
  {"tasanko":{"kerroin":4,"k0":0.02,"pohjaM":1500}}`, ei deltaa) + testi (peruskartta-resepti 16/16).
- POHJA-AJO EI ALOITETTU: PT:n ehto nice 15, Mac joutilas ≥ 10 min (HIDIdleTime), ei ikkunoita, taustalle. Koko ajon komento
  vielä suunnittelematta: aloita `tools/polta-paikallisesti.sh --resepti 2026-10-26 --koe` (yksi shardi + aika-arvio, ei vientiä),
  sitten PT:lle arvio. --resepti vaatii --sarjat kaikki (uudet versiot + --pallo --pallotunniste, ks. skriptin ohje VERSIOVAHTI).
  Sen jälkeen pelikuvapari Tanskasta (sk-tasangot.txt; ENNEN = lokit/todistus-tasanko-ennen-20261026-1317).

## Avoimet
- Joutilaana ennakoitu "saapumislaatat: pariisi (Kohdekaupungit)" toistui 11× ~7 min (kevyt, välimuistista) – ei korjattu.
- Gondolin sarjassa ei Rialtoa; galleria ei rakenna elävien sarjaa uudelleen kytkimellä; ArkkityyppiKartoitus `molen`.
- Höyrylaivaa ei erottunut Lontoon kuvissa (tarkistamatta).
- Paikallinen `.claude/settings.local.json` roolikansiossa muutettu (ei omani, ei commitoida).
