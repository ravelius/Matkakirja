# Pelikoodarin luovutus 12.10.2026 aamu (07.3x)

Tila: JONO TYHJÄ (PT kirjasi, lepo). PT herättää, kun Codexin pääkaupunkierä tai omistajan päätös aarretehtävistä tulee.

## Junaan 183 kuitatut (natiivi NS:llä, web Julkaisijan LUKITSE-mergessä)
- Talous 300: proto `pelikoodari/talous-300-183` 5aa006f5b (kyyti 0,15 £/km, bussi 1,5 × kyyti, laiva 200, lento 350,
  alkuraha 300; Hinnasto + [WebTalous]-testit). Web #4459 (b02290977 + 08e84cd7a tee-kultaiset SEA_FEE).
- Fokus-luennat 5: web #4461 (kestot afinfo).
- Kaariluennot tallenteilta: proto `pelikoodari/kaari-aanet-184` 8d15716ba (+ testikomento `kaariaani`), web #4475 (skeema 1.65
  tarinakaari.aanet, 9 kaarta -v2). Simu OK (Firenzen -v2 Pariisin kaaressa).
- Kultaisten jälkien portti #4469 + talous: proto `pelikoodari/kultaiset-kaaret-184` d88aea397.
- Kolme veljestä -aarrekuva: ämpäri kohtaamiset/aarteet/aarre-europe-kolme-veljesta.jpg, web #4483 4a3f8faa9.
- Web-merge-järjestys: #4459 → #4461 → #4469 → #4470 → #4475 (+ #4483).

## Odottaa
- Lautapelien opastus: logiikka `pelikoodari/lautapeliopas-183` 7ab5fc70a (SK:n tarkistus korjattu), näkymä NUI
  `natiivi-ui/lautapeliopas-183` (36540b920); NUI ajaa kuvat.
- Aarretehtävien kokeilu (kehityslippu, EI junaan ennen omistajan kuvia): proto `pelikoodari/aarretehtavat-koe` 0028216a1
  (moottori Peli/Aarretehtavat.cs, näkymä UI/Aarretehtavakortti.cs, data UI/Resources/Aarretehtavat/kokeilu.json, LS1:n
  katso-kytkentä). Omistajan aamuarkki: proto-3d/lokit/pelikoodari-aarre-aamu2/ipad-aamuarkki.jpg (PT hyväksyi).
  Ajoskriptit scratchpadissa: ajo-aarre.zsh, ajo-aarre-aamu.zsh (UDID/LAITE/KIERTO; `ui konsoli pois`).
- ISS-äänierä (10.10., _tyo/aanisivu-iss-20261010) odottaa omistajan valintaa.
- Codexin pääkaupunkierät (e04–e14): Afrikan 42 kaupungin KAUPUNKIKARTAT-rivit KORVATAAN.

## Opit
- Rakenne.Nappi-napin teksti on lapsi-Label (mk-nappi__teksti): Button.text piirtää toisen tekstin päälle.
- iPad-simun kuvakaappaus tallentuu pystykehykseen vaakanäkymässä → kierrä 90° arkkiin.
- simulaattorien taukoviestit voivat tulla kesken ajon: tarkista Julkaisijan viestit ennen simun käynnistystä.
- Aikaleimaajat: sleep Time::HiResilla ja lopetus ajon lopussa (kaksi orpoa 96 % CPU 1 vrk 9 h, lopetettu 12.10.).
- ASEMATAULU: VAATII TOIMIA (omistaja 12.10. 10.3x, Raamattu, PR #4489): omistajan toimia vaativa kysymys/pyyntö heti Asemataululle:
  ArtifactData set url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix, kokoelma "talo", doc_id "toimi-pelikoodari",
  data {rooli: "Pelikoodari", kysymys: "<yksi rivi: mitä ja missä ikkunassa>", ts: <ms>}; epäonnistuu → Postivahdille
  "VAATII TOIMIA: Pelikoodari: <asia>". Hoidettu → get → delete if_version.
- OMISTAJAN KUVAT TÄYDELLÄ TARKKUUDELLA (omistaja 12.10. 11.1x, PT): yksittäin tai kuvapari nykyinen | uusi natiivikorkeudella,
  merkintä isona alareunaan, JPEG laatu 90. Pienennettyjä monen ruudun arkkeja EI omistajalle; PT:lle saa arkin, täysikokoiset samalla.
- Aarretehtävät käyttöön: ecdcb9e7f KUITATTU 183 (omistajan kyllä 11.2x). SK suunnittelee kaikkiin Euroopan kaupunkeihin + 2–3 uutta
  lajia; moottorin uudet lajit vasta suunnitelman hyväksynnän jälkeen. Katso ja löydä v2: pelikoodari/katso-v2 f7162ddc4 (LS1 yhdistää).

## Tila 12.10. iltapäivä (jono)
- Linnan äänikierros KUITATTU 184: pelikoodari/linna-aanet-184 0c361ebeb (sonniss-aanet-v6 ym.); linnahaaraan vasta PT:n vapaa-ilmoituksella.
- Lautapelipuhe KUITATTU 183: 2ce277f77 NS:llä (juna-183 70ae55223). Ämpäri aanet/pelit/opas-v1.
- Katso ja löydä v2: pelikoodari/katso-v2 f7162ddc4 + ef4f60592; LS1:n yhdistelmä linssiseppa/katso2-yhd-184 (simu LS1:llä).
- Aarretehtävien lajit 184: pelikoodari/aarre-lajit-184 b331119d8 (Valinta, Kartta, Eurooppa-muoto, maavihje, palkkiot × 0,4). Kartta-näkymä odottaa omistajan pohjapäätöstä (kohdekartan kokoruutu + tähtäin).
- Retkikunta: päätepisteet täsmäävät; LT ajaa kahden simun testin (simukäännös natiiviseppa/juna-183 → lokit/laitetestaaja-app-183).
- Pallot näkyviin (#4501 hyväksytty, juna 185): toteutus retkikuntatestin jälkeen. Hibernation-WebSocket, 1 Hz vain pallonäkymässä, yhteys kiinni muuten, Free-tason ylitys → hallittu siirtymä ilman palloja. Nimilappu vain omalle retkikunnalle, Googlen nimeäminen aina näkyvissä.
- Shakki: kartoitus #4503 (docs).
- Äänisivu: nopeat introt Pelissä (90), kippi + jazz palautettu Odottaa-osioon (46).

## Tila 12.10. ilta
- Juna 184 (NS:llä): d3dea2004 (sähke aloituskaupunki + lokit), 51fd69084 (tupla-8), fdce53c2c (jäsenlista + eroa), cd364de79 (pelit-laskuri + vastustajarivi).
- Workerit: #4507 (koodi ilman S/5, julkaistu), #4509 (eroa, mergetty), #4508 web tupla-8 junan mukana, #4513 pallot + kisa (DO-migraatio odottaa PT:n kuittausta → Julkaisija).
- Aarretehtävät 184: pelikoodari/aarre-lajit-184 (Valinta, Kartta + NUI karttavalinta 559496447 yhdistetty 99c8a1a17, palkkiot × 0,4, testikartta-komento). NUI kuvaa Kartta-lajin.
- Pallokisa 184 (lippu.pallokisa): proto pelikoodari/pallokisa-184 0e050ce92 = moottori Linssit/Ydin/Pallokisa (Pallokisa, Kaasu, KisaSelostus, PelaajaVarit, KisaViestit, PalloPuskuri) + Scripts/Peli PalloYhteys (ClientWebSocket) + PallokisaOhjain + NUI:n UI. LS1 kytkee Aloita/Paivita/Muut. Selostus odottaa SK:n käsikirjoitusta ja omistajan hyväksyntää (lippu.pallokisa-selostus). Värit: 0 punainen · 1 sininen · 2 keltainen · 3 vihreä · 4 oranssi · 5 violetti · 6 valkoinen · 7 musta.
- Seuraava: #4513 deployn jälkeen LT:n kahden simun kisatesti (viive lokiin, tavoite < 0,5 s).
