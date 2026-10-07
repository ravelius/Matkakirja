# Pelikoodarin luovutus 7.10.2026 (päivitetty klo 12.5x, ennen tilin 5 h taukoa)

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Edellinen: viesti-pelikoodari-luovutus-20261006.md.

## KESKEN JA SEURAAVAKSI (päivitetty 12.5x, ennen tilin 5 h taukoa; jatka klo 15 jälkeen)
1. Esittely pilotti (Pariisi, Praha, Wien) ja erä 2 (Rooma, Lontoo, Kööpenhamina; omistaja 12.4x "Oikein hyvät") ovat
   TUOTANNOSSA (#4127, #4136; vienti opas-esittely-vienti-20261007 ja -20261007b). LS1 todentaa erän 2 TF:llä.
2. Avoimet PR:t Julkaisijan junassa: #4138 (kierros alkaa avauksen lupaamasta kohteesta: ESITTELY_ALKU-taulu
   opas-esittely.js + esittely.kierros[0]), #4132 (natiivin yöportti: täysi checkout, koska savukkeiden sparse !/docs/
   jää ajurikansioon; vartijaan 4 proton jälkiskriptiä), #4133 (Kysy-kehote: vuosiluvut numeroina), #4134 (lippurivin
   kielikorjaus). #4138:n jälkeen tarkista tuotannossa: Rooma keskipisteestä (41.89737, 12.48703) → Forum Romanum.
3. Loput 31 kaupunkia odottavat omistajan määrälupaa (ÄLÄ generoi ennen). Tekstit ovat pilvihaarassa
   pelikoodari-esittely-pilvi (korjattu/*.json + avaukset/*.md). Kun lupa tulee: korjaukset omaan haaraan
   pelikoodari-esittely (esittely-tyo/korjattu/), tarkistin → tee-esittelyaanet.mjs + avaukset tee-aanet-kohdistuksella.mjs
   --r2 → koosta-kuuntelu.mjs --avaukset → vientipaketti: LISÄÄ JSONIIN kierros: pohja.kierros (alku datassa) + avaus.aani
   media-polku opas/esittely-v1/aanet/<id>-avaus.mp3. Mallina _tyo/opas-esittely/kolme/ ja _valmiit/opas-esittely-vienti-20261007b.
4. Opastus: erillinen leike yleiset-v1/opastus-01.mp3; yleiset-v2.json (ilman opastus_kierroksia) ämpärissä. LS1:n
   natiivi: avaus → opastus vain ensimmäisellä kuumailmapallokyydillä → kierros. Prahalla ja Wienillä ei avausta.
5. Kysy ilman ääntä testitunnuksella on tarkoituksellista (testi ei generoi), ei vika.
   ÄLÄ KÄYTÄ Agent isolation remote.

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
