# Karttaseppä: luovutus 3.11.2026 klo 02.37 (KS)
Edellinen: viesti-karttaseppa-luovutus-20261103-0025.md (162d457a6; käsitelty: AVOIN 1 valmis, AVOIN 2–4 jatkuvat alla).
Syy: kontekstivahti 26 %. V = `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/valitaso-20261103/`,
P = `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-valmis-runko-20261102/`, posti-worktree `/Users/Shared/Claude/wt/karttaseppa-postilaatikko`.

## TEHTY
1. **Skeemakorjaus PR 6049 mainissa**: kaupunki.schema.json + keskusta/alue (1.68); JU vei 1.68-paketin.
2. **Kohdetunnisteet PR 5986 mainissa (f38d76dd5), sisältöpaketti v947**: 2039 kohdetta, 1117 tunnistetta (479 Sonnet-tarkistettua
   ehdokasta, käsilukko `kartta: true`), 9 pelin väärää pistettä korjattu Wikidatan paikkaan (PT 3.11.), Bukarestin Văcărești-kainalo
   siirretty + kartta/värikartta uudelleen. Raportti docs/raportit/kohdetunnisteet-20261102.md. Worktreet poistettu (levy, PT).

## AVOIN (järjestyksessä)
1. **VÄLITASO: pohjan Z9–Z10 tyhjä (PT 02.4x, virhe; NS 55ce62126 tasorajat):** natiivissa Z9–Z10 näkyy VAIN pohja
   (SileaUrl julisteet/pallo/laatat/2026-10-26-pohja-20261027/{z}/{x}/{reverseY}.jpg, KarttaKerrokset.cs:456; Z10 vain kaupunkien ±1°
   = offline.json kaupunkiRasteri, muualla Z10 = Z9 suurennettuna; elävä kartta alkaa Z11). Pohjassa ei teitä, Thames 1 px.
   - Koepala tehty: `V/piirra.py <osm.json> <pohjakansio> <ulos> z:x0-x1:y0-y1 …` piirtää OSM:n moottoritiet/valtatiet/päätiet, joet
     (waterway=river) ja vesialueet (natural=water, multipolygonit koottu) laattoihin 4× ylinäytteistyksellä. Pohjalaatat (koko sarja,
     XYZ-numerointi): `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261027/delta/lavastus/`.
     Lontoo: `V/lontoo.json` (Overpass, 51.25–51.95 N, −0.8–0.8 E), tulos `V/koe/`, parit `V/pari-lontoo-z10.jpg` ja `-z9.jpg`
     (vasen vanha | oikea uusi). Toimii: tiet ja Thames näkyvät.
   - Säädettävää ennen sarjaa: (a) datan rajaus näkyy suorana reunana → haku koko alueelle; (b) Z9:llä vain motorway+trunk
     (primary liian tiheä?), Z10 + primary; (c) veden sävy sinisemmäksi/tummempi reuna, Thames luettavammaksi (vrt. elävän kartan Z11:n
     harmaansininen nauha, lepokuva NS:n raportissa); (d) jokien leveys tasolla 10.
   - NS:n suositus 03.0x: **Z9 koko pelialueelle (Eurooppa)**, ei vain kaupunkilaatikoihin (Z10 ulkopuolella tehdään Z9:stä, sauma
     laatikon reunaan, PT: sisältöä joka tasolla). Vienti kokonaisena sarjana. Jos koko Euroopan Z9 on liian raskas, kysy PT:ltä
     rajaus ennen osittaista. Data: Overpass ruudukkona (hae.zsh: exp. odotus, kolme palvelinta; ruuhkaa 02.xx) — Eurooppa
     motorway+trunk+river noin 5°×5° ruuduin; Z10-kaupunkilaatikoihin + primary ja vesialueet.
   - Valmis = uusi kansio (esim. julisteet/pallo/laatat/2026-11-03-pohja-valitaso/: kopio vanhasta + muutetut Z9/Z10), JU vie,
     sha + kansio NS:lle (SileaUrl + offline.json kaupunkiRasteri, lepokuvat-valitaso.sh kaaret 1.5/0.8/0.4, simuvuoro JU:lta),
     pari (ennen | jälkeen, sama rajaus, laitteelta) PT:lle. Käännökset JU:n vuorolla. Selvitä myös, onko sama aukko muissa
     kaupungeissa (on: pohja on sama kaikkialla) → raportoi PT:lle.
2. **Pariisin palat 1–15**: tilaus Codexille 10a39d6b9, ei vielä generointeja (posti 67a53bb14 viimeisin). Seuraa postia; tarkistus
   `tarkista_ala.py`, kokoaminen ja muu kuten luovutuksessa 20261102-2210 AVOIN 2.
3. **G (KS + NUI)** ja vanhat kohdat kuten edellisessä luovutuksessa (AVOIN 3–4).

## Opit
- Overpassin vastauksessa "elements" on vasta ~300 tavun jälkeen: tarkista vähintään 1000 ensimmäistä tavua (hae.zsh korjattu).
- Kohdepisteen siirto voi pudottaa sen kainalon ulkopuolelle: tarkista kainalon rajat ja piirrä kartta uudelleen.
