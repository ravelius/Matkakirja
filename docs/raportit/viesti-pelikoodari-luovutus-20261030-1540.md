# Pelikoodari: luovutus 30.10.2026 klo 15.40 (konteksti 30 %, hookin pehmeä raja)

Edellinen luovutus: -20261030-1141. Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- Työkansio: P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030.
- Postin worktree: /Users/Shared/Claude/wt/pelikoodari-posti (detached; `git fetch` + `checkout --detach origin/claude/postilaatikko`).
- Proto-worktree: /Users/Shared/Claude/wt/proto-pelikoodari-orto, haara **pelikoodari/orto-216**.

## TEHTY tällä vuorolla
- **Codexin mittapiirrokset tarkistettu ja viety PT:lle kortille** (SHA256SUMS OK, rinnakkaiskuvat P/kortti/*-pohja-vs-codex-v*.png):
  sivuhalli v2, Taihemen v3, Taihedian v3 (6b0baf286). Kaikki täsmäävät mittapohjiin.
- **Ortotyökalu Unity b7:lle** (PT 12.3x): pelikoodari/orto-216 = juna 216:n runko aea0353cd + ortokamera b66d9189a.
  P/orto.sh:n oletus-REF on orto-216.
- **Kohteen 06 orto korjattu** (PT 13.3x): sijainti oli oikein; taustalla näkynyt Jingshan sai sen näyttämään pohjoisportilta.
  - bd3240620 lisää edestä-kuvaan valinnaisen syvyysrajan (far clip): `valo orto edesta x z suunta korkeus y etäisyys [syvyys]`.
  - orto.sh: 06 125 m, f 50 m, g 125 m.
  - Todiste: proto-3d/lokit/orto-20261030-133445/06-edesta.png.
  - LAV:lle ja PT:lle ilmoitettu.
- **portti06-mitat.json:** kivijalka 0–3,0 [A] → **0–1,6 m [K]**, lisätty tapa-kenttä (horisonttimenetelmä, LAV 15.2x). PT 15.3x kohta 2 on valmis.

## KESKEN: PT 15.3x kohta 1 + 15.4x lisäys (EI vielä korjattu, ei viesti PT:lle)
1. **Harmaat laatat aukiolla (havainne 03, lokit/havainne-editori-20261030-150048/03).**
   Ylänäkymät pohja-kehyksessä (85, −30), korkeus 70 m:
   - lokit/esikatselu-20261030-152631/luotain-ylhaalta.png: kaikki osat päällä.
   - lokit/esikatselu-20261030-153051/: täyte pois (`palatsi tayte 0`).
   - lokit/esikatselu-20261030-153529/: täyte päällä; pois ulkorengas, osamallit, osasarja, muurikate, kulmatornit ja avoimet.

   Havainnot:
   - Harmaa ala on tasainen ja tekstuuriton. Siinä on vino osa ja T-muoto, x ≈ 87–131, z ≈ −57…−41, sekä kaista x ≈ 98–101, z > −27.
   - **Maan täyte** (JuoksuSokkeloMaailma.Palatsi.cs LuoMaanTayte):
     - Täyte vastaa vinoista osista. Se ottaa materiaalin `lod[2] ?? lod[1] ?? lod[0]`, eli LOD2-lattian, joka piirtyy harmaana.
     - Ehdotettu korjaus: lod0-materiaali ensin.
   - **T-alue ja pystylaatat jäävät näkyviin**, vaikka täyte ja kaikki QA:lla poistettavat osat on poistettu. Lähde on siis tausta (kielletty-tausta-v76 → LAV:n kiilat-v196/kielletty-tausta-v77) tai rakennukset-v83.
     - Taustan kk-tausta-2-1-lod0:ssa alueella on vain V4_lattia (laji 2 = kivilaatta) ja sivuhallin osia; harmaata materiaalia ei löytynyt keskipistehaulla. Työkalu: P/glbalue.py (`python3 P/glbalue.py x0 x1 z0 z1 <glb>…`).
     - Rakennusten glb:t ovat paikallisessa kehyksessä (sijoitus erikseen), joten aluehaku niihin ei kelpaa.
   - Seuraava askel:
     - Lisää QA-komento, joka nimeää ruudun pisteen renderöijän (säde kolmioihin). Vaihtoehtoisesti aja `pintatieto` niin, että Puyi on harmaan päällä: sijoitus ei siirtänyt Puyita pintatiedon hetkellä, piste jäi (−98, −368).
     - Selvitä sitten, tuleeko harmaa pohja.json:n muurit[338]:sta (way/638513244, paksuus **26,34 m**) tai rakennukset[277]:stä 侧墙6 (LAV:n arvio).
     - Pohja.json kk-pohja-v1d-pk7 on PK:n (P/../kuja05-pk6-20261029/kk-pohja-v1d-pk7). Muuri 338:n paksuus on selvästi virhe; korjaa tai poista, kun lähde on varma.
2. **Vino rosoinen sauma Meridiaaniportin edessä** (lahikuva-sivuaukko-v197.png, raw x 850→2400, y 1390→2064; pari 151749/07).
   - Porrastettu reuna = maan täytteen ruuturaster (y −0,08) taustan lattiaa vasten → todennäköisesti sama LuoMaanTayte.
   - Korjausehdotus: täytteen korkeus tasoon 0 (tai −0,005) ja lod0-lattiamateriaali.
   - Ota uusi lähikuva todisteeksi (PAIKKA "30.7 -405 -2.03", TESTIKAMERA "1.7 6 0 45"; editori.sh LAV:n LUE.md:n mukaan).
3. Kun valmis: PT:lle ≤ 3 riviä, todistekuvat lokit-polkuina.

## Jono sen jälkeen
- A6: kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.

## Huomiot
- Esikatseluajot: `zsh /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214/tyokalut/esikatselu.sh <REF> <skenaario> ipad --batch`.
  - Komentojen vastaukset ovat unity.log:ssa (`MATKAKIRJA ui-komento:`), eivät loki.txt:ssä.
- Taustaajoja ei ole kesken.
