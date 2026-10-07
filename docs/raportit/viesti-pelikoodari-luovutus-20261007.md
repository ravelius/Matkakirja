# Pelikoodarin luovutus 7.10.2026 (päivitetty klo 13.2x, ennen tilin 5 h taukoa)

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Edellinen: viesti-pelikoodari-luovutus-20261006.md.

## KESKEN JA SEURAAVAKSI (päivitetty 13.2x, ennen tilin 5 h taukoa; jatka klo 15 jälkeen)
0. OMISTAJA 13.1x: KAIKKI ÄÄNET eleven_v4_turbo (halvempi; ei eroa). Esittelyt jo turbolla.
1. Prahan ja Wienin avaukset: äänet tehty, vienti opas-esittely-vienti-20261007c AMPÄRISSÄ. #4141 (esittely_polut →
   opas/esittely-v1b/{praha,wien}.json; LS1 vahvisti TF 159/160 ohittavat kentän) ja #4142 (/opas/liiku-kierros alkaa
   avauksen kohteesta; #4138 kattoi vain /opas/seuraava) Julkaisijalla. DEPLOYN JÄLKEEN TODENNA: /opas/seuraava
   "Esittele kaupunki" Praha → Kaarlensilta, Wien → Stephansdom (valmis + aani), ja /opas/liiku?kaupunki=Rooma&lat=41.89737
   &lon=12.48703 kierros[0] = Q180212. Komennot: origin https://matkakirja.app + x-matkakirja-testi: 1 (ei generointia).
2. Olavinlinnan 31 repliikkiä VALMIIT: _valmiit/olavinlinna-repliikit-v1 (manifest, kooste.mp3), skripti
   proto-3d/tyokalut/pelikoodari-ajot/olavinlinna-repliikit.py. Toimitettu Siirtosepälle ja kooste Päätoimittajalle;
   odotetaan Siirtosepän polkutoivetta, jos ämpärivienti halutaan.
3. Esittely: 6 kaupunkia tuotannossa (Pariisi, Praha, Wien, Rooma, Lontoo, Kööpenhamina). Loput 31 odottavat omistajan
   määrälupaa (ÄLÄ generoi ennen). Tekstit pilvihaarassa pelikoodari-esittely-pilvi. Lupa → korjaukset omaan haaraan
   pelikoodari-esittely, tarkistin → tee-esittelyaanet.mjs + avaukset tee-aanet-kohdistuksella.mjs --r2 → koosta-kuuntelu.mjs
   --avaukset → vientipaketti (JSONiin kierros: pohja.kierros + avaus.aani opas/esittely-v1/aanet/<id>-avaus.mp3). Mallina
   _tyo/opas-esittely/kolme/ ja _valmiit/opas-esittely-vienti-20261007b.
4. Junassa: #4132 (yöportti), #4133 (Kysy vuosiluvut), #4134 (lippurivi).
5. Opastus erillinen leike yleiset-v1/opastus-01.mp3; yleiset-v2.json ilman kierrossääntöä. Kysy ilman ääntä
   testitunnuksella on tarkoituksellista. ÄLÄ KÄYTÄ Agent isolation remote.

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
