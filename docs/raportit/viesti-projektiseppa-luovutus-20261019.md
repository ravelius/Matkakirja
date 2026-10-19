# Projektiseppä (ent. Siirtoseppä): luovutus 19.10.2026 klo 11.4x

Rooli: PT nimesi Siirtosepän 19.10. klo 08.48 Projektisepäksi (Opus, high, sama kansio). Projekti on Olavinlinna loppuun, ja tehtävälista on docs/raportit/olavinlinna-valmiiksi-lista-20261019.md.
Muisti: memory/projektiseppa-tila-20261019.md.

## KÄYNNISSÄ LUOVUTUSHETKELLÄ
- Linjan 2 käännös 1286d90ed ja sen perään botin simuajo omalla simulla 8362879F. Julkaisija antoi KÄÄNNÖS NYT ja SIMULAATTORI NYT klo 11.4x, ja käännös odotti LS:n käännöstä lukkojonossa.
  Tulokset: /Users/Shared/Claude/proto-3d/_tyo/siirtoseppa/linna-botti-1286d90ed/ (kaannos.out, ajo.out, yhteenveto.txt, repliikit-*.mp4).
- **ENSIN:**
  1. Lue kaannos.out:n viimeinen rivi ja ilmoita Julkaisijalle (local_24e63224-…) KÄÄNNETTY.
  2. Kun ajo.out:ssa on SIMU LOPPU, ilmoita SIMU VAPAA. Todistusajo sammuttaa simun itse.
  3. Lähetä PT:lle 3 riviä: botti 10/10 (tavoite) + tyrmä 1–3 + tyrmään viennin repliikki videolla (repliikit-tyrma.mp4, kaappaus nyt 45 s).

## Tehty tänään (proto-haara projektiseppa/linna-botti-10, worktree /Users/Shared/Claude/wt/proto-projektiseppa-linna-botti)
- aa32f9a44: Sisältökirjurin M-osan tekstit (53 avainta) olavinlinna.fi.json:iin. Lähde tyokalut/olavinlinna-m-osa-tekstit.json, ja tekstit_olavinlinna.py yhdistää sen.
- 15f7e89bc: ☰ › Vihje -teksti datana (Vihjeet.TekstiAvain, SeikkailuVihjeet.ViimeTeksti). **Valikkonäyttö puuttuu, ja se kuuluu Natiivi-UI:lle.**
- 23ebd7a6e: pelaava botti.
  - `poikki seikkailu botti pelaa [kohta]` tekee huoneiden 6–10 teot pelaajan syötteillä.
  - `poikki seikkailu botti tyrma` hoitaa tyrmän.
  - Ydin BottiPelaa sijoittaa teot merkeistä reittipisteisiin.
- 0f6bb529f: repliikit-lapi-v4 (Äänittäjä, 20 kpl, omistaja 09.10); muunnelmat kiertävät.
- 779ef1db9: LinnaOsat.Muurilla, eli Lavastajan osajako (harja 88–92, komero 93, pako 94) ja v49a toimivat molemmat.
- 1286d90ed: kulho voudin pöytään vaakamatkalla, ja kulho asetetaan pöydälle. Kyseessä oli pelaajankin vika: kiista ei alkanut, joten avainrengas ja ovi jäivät. Botti laskee kulhon uudelleen.
- Ensimmäinen simuajo (531bf3417, klo 11.17–11.36): 7/10 tekoa, tyrmä 1/2/3 LÄPI, kiinni 0, 522 s. Video äänellä: _tyo/siirtoseppa/linna-botti-0f6bb529f/repliikit-kello-30s.mp4 (PT:lle lähetetty).
- Linssit-testit 2089/2089, tarkista.sh 0.

## Avoimet
- Tripo-pilotti (kokki + portinvartija, Codexin tilaus bacc15a84): kootaan keittiöön MetaHumanien viereen samaan valoon → kuvapari ja tieto siitä, liikkuvatko kasvot. PT ilmoittaa, kun mallit tulevat.
- Codexin geometria huoneisiin 6–10 (e203239d0, palatsi ensin). Lavastaja kokoaa ja ilmoittaa siirretyt merkit. Tarkista silloin BottiOsat- ja Aloituskohdat-jako uusilla osanimillä (AloituskohdatTestit odottaa vielä TarkistusOsa muurikaytava).
- Haaraa ei ole vielä mergetty masteriin. Juna ja merge kulkevat PT:n ja Julkaisijan kautta 10/10:n jälkeen.
- Skenaario on tyokalut/siirtoseppa-ajot/skenaariot/botti-pelaa.txt, ja ajo tehdään skriptillä ajo-botti-pelaa.zsh (APP=… HAARA=…).

## LISÄYS 12.1x (uusinta tehty, ajot loppuneet)
- KÄÄNNETTY e5a88985e (1286d90ed) klo 11.57, ja SIMU VAPAA ilmoitettiin Julkaisijalle klo 12.12. Mitään ei ole käynnissä.
- Tulos: 6/10 tekoa, tyrmä 1/2/3 LÄPI, kiinni 0. Tyrmävideolla kuuluu tyrma-vartija-vienti-2 (_tyo/siirtoseppa/linna-botti-1286d90ed/repliikit-tyrma.mp4). Tulos on lähetetty PT:lle.
- Juurisyy: kädessä ollut kulho irtosi 8 m pelaajasta ja +2,6 m, koska käden kahvan paikka ei seuraa ensimmäisessä persoonassa. Korjaus a67d881d8 (SeikkailuEsineet.Laske) on tarkista.sh 0, mutta sitä EI ole vielä ajettu simulla.
- **ENSIN seuraajalle:** pyydä Julkaisijalta käännös ja simu a67d881d8:lle ja aja `APP=…/linna-botti-a67d881d8/Matkakirja3D.app HAARA=a67d881d8 zsh ajo-botti-pelaa.zsh` (käännä ensin PROTO_LINJA=2 PROTO_APP_KOPIO=<kansio> proto-kaanna.sh a67d881d8).
- Auki on myös kaksi muuta asiaa:
  - Pako ei ehtinyt K4:lle 30 s:ssa (ensimmäisessä ajossa ehti). Katso kallion reitin lokirivit.
  - Todistusajo näki pääsäikeen 24–29 s jumit (pinonayte-1.txt kansiossa lokit/todistus-botti-pelaa-20261019-1157).
