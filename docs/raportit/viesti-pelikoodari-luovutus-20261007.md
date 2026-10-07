# Pelikoodarin luovutus 7.10.2026 (päivitetty klo 10.5x, ennen Macin uudelleenkäynnistystä)

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Edellinen: viesti-pelikoodari-luovutus-20261006.md.

## KESKEN JA SEURAAVAKSI (järjestyksessä)
1. #4126 (Kerro lisää + valmiit kysymykset /opas/kysymykset-vastaukseen, litteät kentät; ääni VAIN R2:sta, ei generointia)
   Päätoimittajan kuittaama → Julkaisija julkaisee.
2. Kun #4126 on tuotannossa: pyydä Julkaisijalta vienti _valmiit/opas-esittely-vienti-20261007 (pariisi, praha, wien + Pariisin
   avaus + opas/yleiset-v1.json opastus; --kuiva ok; kaikki 71 kohdeääntä jo R2:ssa) → indeksi-PR tools/pollo/aineistot.js
   esittely: ['pariisi', 'praha', 'wien'] → LS1 todentaa TF 159:llä (#4107-opetus). Jos jokin rikkoutuu: indeksistä pois heti.
3. 34 kaupungin pilviajo (haara pelikoodari-esittely-pilvi, esittely-tyo/OHJE-pilvi.md) kirjoittaa tekstit, kysymykset ja
   avaukset (avaukset/<id>.md → siirrä avaus-kenttään). Omistaja: "Ensin 3 kaupunkia" Rooma, Lontoo, Kööpenhamina →
   Päätoimittaja tarkistaa → äänitä tools/opas/tee-esittelyaanet.mjs (with-timestamps, kohdistus talteen, fi lukittu,
   suomenkielinen alku uusissa teksteissä) + koosteet omistajalle. Loput vasta omistajan kuuntelun jälkeen.
   ÄLÄ KÄYTÄ Agent isolation remote (ajaa paikallisesti Matkakirja-fable/.claude/worktrees, 11 Gt).
4. Prahan ja Wienin avaukset (tekstiehdotukset korjattu/*.json) odottavat Päätoimittajaa; Pariisin avaus ja opastus äänitetty.

## TÄNÄÄN JULKI (tärkeimmät)
#4082 pidempi kerronta, #4089 vuosiluvut, #4086 lyhin reitti, #4084/#4090/#4102 äänikartat (Pariisi, Venetsia, Kööpenhamina)
+ silmukat + tuuli/sade, #4092/#4098/#4109 sallitut (37; esto päällä #4108, OPAS_SALLITUT_ESTO=1), #4103 kuvat-v4, #4105 tiet
38 kaupunkiin, #4107 Kysy toisen kaupungin kohteeseen (kohde_nimi/_id/_lat/_lon), #4116 Giza kokeilukohteena
(x-matkakirja-kokeilu: giza) + valmiin esittelyn tarjoaminen, #4122 web: "Oppiminen on hauskaa" pois.
Siltalauseet v2 (ei-sallittu, 292 krediittiä), pilotin äänet 71 kpl + avaus/opastus/Notre-Dame (682 krediittiä).

## Työkalut (haara pelikoodari-esittely, ei PR:ää; worker-osat menivät #4116/#4126:lla)
tools/opas/: tee-esittelypohja, tarkista-esittely, koosta-esittely, tee-esittelyaanet (kohdistus), tee-aanet-kohdistuksella,
koosta-kuuntelu, tee-siltalauseet-v2. tools/kartta/tee-tiet.mjs välimuistiavain korjattu (keskipiste mukana).
Paikallinen opas-aineisto: node tools/pollo/tee-opas-aineisto.mjs ja palauta tynkä git checkoutilla ennen committia.
