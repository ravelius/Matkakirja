# Linnanrakentajan luovutus 18.10.2026 klo 14.0x (Opus) – Postivahti: kova raja 35 %

Edellinen: `viesti-linnanrakentaja-luovutus-20261018-paiva.md` (7150eb65d). Viestit AINA send_messagella session id:llä
(`/Users/Shared/Claude/osoitekirja.md`); PT:lle enintään 3 riviä, polut absoluuttisina. Ei käynnissä olevia käännöksiä eikä ajoja.

## Tila: juna 202 valmis, ei avoimia ajoja

- KK valitsi (b) koko pilotin → PT kertoi NS:lle **proto linnanrakentaja/pilotti-juna202 dff3222cf** (= yhdistetty-202 03e465087 + juna-202 ee0eaa576;
  KaupunkiMerkit-ristiriita → junan versio). Testit: Museo 183/183, Kehys 30/30, Ranska 9/9, Kartta 508/508, Peli 608/608, tarkista 0. Peilissä.
- Vaihtoehto (a) (vain kehykset v6–v10) jäi käyttämättä: linnanrakentaja/kehykset-juna202 d68b5e829, worktree
  `/Users/Shared/Claude/wt/proto-linnanrakentaja-juna202` → poista `git worktree remove`, kun NS on vahvistanut junan 202.
- Pienoismallit (arkki 7, Big Benin ankkuri Euroopan näkymässä) jo junassa: pienoismallit-juna202 03247ac40 (worktree poistettu).
- `_tyo/linnanrakentaja`: louvre-v2o-202-app (7d6a73d66, uusin) + louvre-v2k-202-app (VS:n käytössä; poista kun VS ei tarvitse).
  Poisto: python-skripti, joka sallii vain `_tyo/linnanrakentaja/*-app` (ei rm); kirjoita uusi tarvittaessa.
- Proto-worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-kehykset` on haarassa linnanrakentaja/pilotti-juna202 (yhdistetty-202 = 03e465087).

## Tehty tänään 11.4x–14.0x

- **Kehykset** (Louvre 904 -malli): v8 → v9 (v5:n terävä veisto, saumaton pituussuunta ristihäivytyksellä, kulta 220/195/135) →
  **v10** 026479468 (veiston jakso profiilin KAARENPITUUDESTA, ei leveydestä: v6:n kaarenpituus-V venytti kuviota ~1,7× poikittain; helmiä 60).
  Kuvat `_valmiit/louvre-kehykset-201/kehykset-v{8,9,10}-202/` (KOLMIKKO-*, HAVAINNOT.md). Työkalut `tyokalut/kultaveisto_helmet.py`,
  `proto-3d/tyokalut/linnanrakentaja-ajot/kolmikko_v10.py` (tekstit kuvan yläpuolelle, raaka-kuvat; omistaja 12.14).
- **Louvren sali** v2n → **v2o** (paketit `_valmiit/taidemuseo-ranska-v2{n,o}-vienti-20261018`, ämpärissä): GG vaaleat seinät 162/152/144,
  poikittaiskaaret z −20,6/−50,6 (harmaa marmori 2 m, kultareunat) + pylväsparit r 0,34 (sali_blender.py `traveet`), Louvren salit
  (sc, gg, se, Daru, Mollien) vaalealla kalanruotoparketilla 158/128/94 (tekstuuri uudelleenvärjätty; alkuperäinen `lokit/parketti_kalanruoto-ennen-v2o.jpg`).
  Generaattori `_tyo/linnanrakentaja/louvre-pilotti-v2k/` (lahde/ranska.py, lokit/aja_v2o.zsh).
- VS:n vartija 867c74f40 ja se-päivänvalo cc3aa269e yhdistetty. **Sopimus VS:n kanssa:** se leivotaan VANHOILLA valoarvoilla (0,25/0,06/0,08,
  ranska.py:ssä kommentti); natiivin sali.json:ssa VS:n 0,8/0,2/0,2. Jos se:tä leivotaan uusilla, VS palauttaa ajonaikaisen heijastuksen samalla kertaa.
- Siivous: worktreet pienoismallit + tivoli-ilta poistettu; vanhat appit poistettu.

## Junaan 203 (PT/KK 18.10. 14.0x)

1. **GG:n pyöreät penkit verhoiluun** – nyt harmaat kivikiekot (sali_blender `penkki(..., malli='pyorea')`, materiaali penkki_harmaa) → verhoiltu
   pyöreä istuin (refe gg1: harmaa kangas, pehmeä reuna).
2. **GG:n kattoikkunan mustat poikkiraidat** (tynnyriholvi: puitteet `metalli_musta` 1,2 m välein) näyttävät tikkailta → ohuemmat/vaaleammat
   puitteet tai ruudukko kuten SE:ssä (refe gg1: vaalea teräsruudukko).
3. **Kehysten tiheämpi lehvästö** uudella lähdetekstuurilla (PD/CC, Commons; Louvre 904:n kaltainen pieni lehvästö) – nykyinen MIA 88.5.3 -veisto
   on karkea (yksi kiemura ≈ sivupalkin levyinen).
- Lisäksi omat havainnot: GG:n poikittaiskaari jää lähikuvissa heikoksi (holvin kasettikaaret yhtä vahvoja); Matterhorn koukkuhuippu (PT: myöhemmin).

## Opit

- **Venymän syy kuvasta, ei arvaus:** v7–v9 korjasivat sumennusta, mutta syy oli UV-jakso. Mittaa (kaarenpituus vs leveys) ennen korjausta.
- **Albedon muutos esikatselussa ensin:** vaalea seinä 198/188/180 ja parketti 192/168/134 paloivat valkoisiksi leivotussa valossa; tarkista esikatselu
  (atlas_kuvat r01–r03) ennen pakettia.
- **Kuvien tekstit kuvan ulkopuolelle** (omistaja 12.14, Raamattu #4872): kolmikot raaka/-kuvista, otsikot omalle raidalleen.
