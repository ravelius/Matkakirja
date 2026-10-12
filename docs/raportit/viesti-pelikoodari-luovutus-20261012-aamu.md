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
