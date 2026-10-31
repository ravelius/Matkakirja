# Cloudflare-säästöpaketti: käyttämättömät karttaversiot (Julkaisija 31.10.2026 klo 22.59)

Tilaus: PT 31.10. ~22.47 (omistajan päätös 28.10. klo 12.28, loki paatokset-2026-10.md:3067). **Mitään ei ole poistettu.**
Lista odottaa PT:n tarkistusta; poisto vasta PT:n kuittauksen jälkeen.

## a) Kirjanpito (paikallinen luettelo HEADien sijaan)

Tehty jo 28.10. (PR 5447): `julkaisija-tyokalut/amparin-luettelo.tsv` + `.lisays.tsv`; vie-paketti.sh ei enää tee HEAD-pyyntöjä.
**Havainto:** luettelo on vanhentunut. 28.10. jälkeen ämpäristä on poistettu kansioita (maaston vuoristopilotit 1–6,
kerma 2026-09-23a-p080, pyramidin 25-ranta/25-viivat/30-viivat, omat-mallit v2–v6k26 osoittamattomat), eikä luettelo tiedä
uusia polttoja (pallo 2026-10-26-pohja-20261027, maasto 2026-10-29-maailma, kerma 2026-10-27-p060), koska ne eivät
kulkeneet vie-paketti.sh:n kautta. Ehdotus: aja `rakenna-luettelo.zsh` uudelleen (~11 600 listauskutsua ≈ 0,05 $) ja
kirjaa jatkossa myös poistot ja Karttasepän suorat poltot luetteloon.

## c) Käyttämättömät karttaversiot (ei viittausta webin mainissa, TF 215:ssä c0b59f6b0 eikä junan 216 rungossa ca536d93e)

Menetelmä: version tunniste haettu ajonaikaisesta koodista ja datasta (ei kommentteja, testejä, docs/ eikä tools/),
osoitintiedostoista (pyramidi.json, omat-mallit/uusin-*.json, sisalto/1–2/uusin.json, maasto layer.json) ja ämpärin
ajantasaisesta kansiolistauksesta 31.10. klo 22.5x. Koot luettelosta 28.10.

| Kansio | Koko | Huom. |
|---|---|---|
| julisteet/maasto/2026-09-23a/ | 0,99 Gt | |
| julisteet/maasto/2026-09-23b/ | 1,00 Gt | |
| julisteet/maasto/2026-09-24-maailma/ | 11,78 Gt | työkalujen oletusarvo (tee-maasto --vanhempi, vie-rajakorkeudet, offline.mjs) → KS vahvistaa |
| julisteet/maasto/2026-10-16-maailma/ | 11,85 Gt | natiivissa vain "Aiempi"-kommentti |
| julisteet/pallo/laatat/2026-09-25-pohja-20260925/ | 2,28 Gt | |
| julisteet/pallo/laatat/2026-09-26-pohja-20260926/ | 2,57 Gt | vain natiivin testeissä ja offline.mjs-kommentissa |
| julisteet/pallo/laatat/2026-09-30-pohja-20261015/ | 6,85 Gt | natiivin edellinen pohja (TF 214, vanhennettu) |
| julisteet/pallo/kerma/2026-09-25-p045, -p080, 2026-09-26-p060, 2026-09-27-p060, 2026-09-30-p060, 2026-10-15-p060 | 0,45 Gt | |
| julisteet/pyramidi/2026-09-26-pohja/ | 2,76 Gt | |
| julisteet/pyramidi/2026-09-26s-pohja/ | 18,95 Gt | vain pyramidi.json:n historiakentässä `erat`, jota laattapyramidi.js ei lue |
| julisteet/pallo/satelliitti/2026-09-25/ | 0,14 Gt | natiivi käyttää 2026-09-24 |
| linssit/astronautin-kamera/iss-yovalot-20260930/ | 0,02 Gt | |
| kartta/omat-mallit/v6k28/ | ~0,25 Gt | uusin-5 → v6k29 |
| **Yhteensä** | **~60 Gt ≈ 0,9 $/kk** | |

Käytössä (EI poisteta): maasto 2026-10-29-maailma; pallo/laatat 2026-10-26-pohja-20261027, 2026-09-30-pohja-20260930,
2026-09-27-pohja-20260927, 2026-09-23a-pohja-20260923arajaton (Isoisä 1873); kerma 2026-10-27-p060 ja 2026-09-25-p060
(kehittäjäkomento "vari sarja p060"); pyramidi 2026-09-30-pohja, 2026-09-27-pohja (delta-perus), 27-ranta, 27-viivat,
2026-10-07-viivat, 2026-09-14b- ja 2026-10-01-tasoitus, 2026-09-22g-nimiot, 2026-09-25c-nostot, koe/ (KS:n koepyramidi),
varmuus/; omat-mallit v2, v6b3, v6h3, v6k26, v6k29, piilo; satelliitti 2026-09-24; astronautin kamera muut kansiot.
Sivuhavainto: pyramidi.json viittaa rantatasoon 2026-09-30-ranta, jota ämpärissä ei ole kansiona (ei tutkittu, KS:lle).

## Iso havainto: Olavinlinnan dioraama on ~80 % ämpäristä

dioraama/olavinlinna/ = 861 Gt (koko ämpäri ~1 070 Gt). Käytössä vain 7 kansiota (12,3 Gt): uusin.json → 1a1857e06ec1386f,
natiivin PelattavaPala b8b9489b12ee5576 ja 7264551e1a39e864, KavelyPielet b257fdf63e18f222 ja fef286897291691f,
webin blender.json → blender/cb1c356eb133f1c1, huoneet/. **Viittaamattomia 474 kansiota, 848 Gt ≈ 12,7 $/kk**
(niistä blender/-alikansioita 225 = 415 Gt). Tämä ei ole karttaversio eikä kuulunut tilaukseen; Olavinlinna on tauolla
(omistaja 19.10. klo 17.05), joten päätös PT:lle/omistajalle (esim. säilytetään vain hyväksytyt versiot, muut NAS:lle tai pois).
Täysi lista: julkaisijan scratchpad olavin.tsv (pyydettäessä repoon).

## Poistotapa PT:n kuittauksen jälkeen

`aws s3 rm --recursive` kansio kerrallaan (R2:n poistot ovat maksuttomia, listaus pieni A-kulu), ennen jokaista poistoa uusi grep TF 215:stä ja
junan 216 rungosta (opit: pk7-tapaus), ja poistot kirjataan ämpäriluetteloon.
