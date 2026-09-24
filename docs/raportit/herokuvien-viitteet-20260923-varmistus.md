# Herokuvien viiterekonstruktion varmistus (Siirtoseppä 23.9.2026)

Fablen tilaus 23.9.2026 klo 12.43: varmista 60 heron rekonstruoidut
viitteet ([rekonstruktio](herokuvien-viitteet-20260923.md)) ennen kuin ne
näytetään pelissä (PR #2918).

## Tulos

**Kaikki 60 heroa ja kaikki 240 viitettä vastaavat Commonsin tilaa
ajohetkellä.** Sama valinta syntyy sekä ajoikkunan alussa (23.8. klo 00.00
EEST) että sen lopussa (24.8. klo 14.00 EEST). Viitteisiin ei tarvinnut
tehdä korjauksia.

Rekonstruktio ei silti ole lokista luettu tosiasia. Jäljelle jäävät
epävarmuudet ovat kohdassa [Jäännösriski](#jäännösriski), ja ne ovat
pieniä.

## Suoraa todistetta ei ole

| Lähde | Tulos |
|---|---|
| Kuvaputki (`tools/pollo/worker.js`) | Ei kirjaa syötteitä tarkoituksella (rivit 894 ja 1105): viitteet tulevat nimettöminä base64-kuvina, ja vastaus kertoo vain lukumäärän. |
| Ämpäri (`julisteet/herokoe/`) | Kaikki 60 heroa ladattiin kerralla 28.8. klo 14 UTC. Ladattu on vain valmis kuva, ei viitteitä. |
| Katselmoinnit (`docs/mantereet-tyoaineisto/herokuvien-silmatarkistus-1.md`, `-2.md`) | Viitekuvamäärät ovat tarkistajan omia hakuja vanhoista kuvista ennen uudelleengenerointia, eivät ajon syötteitä. |

Varmistus tehtiin siksi epäsuorasti: ajetaan sama valinta uudelleen
Commonsin sen hetken tilalla.

## Menetelmä

`tools/varmista-hero-viitteet.mjs` ajaa muuttamattoman
`tools/hae-viitekuvat.mjs`:n niin kuin Commons oli hetkellä T. Työkalu
ja työlistat ovat samat kuin ajossa: niiden viimeiset commitit ovat ennen
ajon päättymistä.

1. **Ajoikkuna.** Työlistat committoitiin 24.8. klo 01.14–11.40 ja herot
   pakkaan klo 07.16–13.47. Viitekuvaputki (v1079) tuli 24.8. klo 00.23.
   Tarkistin molemmat ääripäät: T1 = 23.8. klo 00.00 ja T2 = 24.8. klo
   14.00 (EEST).
2. **Kategorian jäsenet hetkellä T.** Kategoriahaku palauttaa vain jäsenet,
   joiden liitosaika on ≤ T, samassa lajittelujärjestyksessä. Sama koskee
   alakategorioita, joita Lima ja Port Moresby käyttivät.
3. **Commonsin 50 kuvan raja.** Tämä oli varmistuksen tärkein löydös.
   Alkuperäinen kysely (`gcmlimit=60`) saa kuvatiedot vain 50 sivulle
   tiedostonimen järjestyksessä. Loput jäävät jatkokyselyyn, jota työkalu
   ei tee. Siksi kelvollisia ehdokkaita oli 40–48 eikä 60. Kun raja
   toistetaan tarkasti, kalibrointi (T = nyt) toistaa rekonstruktion
   60/60. Ilman rajaa valinta erosi 26 herolla. Raja on nimijärjestykseen
   sidottu määräraja, joten sivujen muokkaukset eivät siirrä sitä.
4. **Ajon jälkeen poistetut jäsenet.** Commonsin muutoslokista
   (`rctype=categorize`, alkaa 24.8. klo 10.15 UTC) löytyi 68
   kategoriasta kolme tapausta. Kaikki emuloitiin:
   - Lima: `Iglesia San Francisco,Lima.jpg` poistettiin 5.9. →
     valinta sama.
   - Quito: viisi *Carta de Jamaica* -kuvaa poistettiin 18.9. Ne
     siirtävät ikkunan rajaa ja 50 kuvan joukkoa → valinta sama.
   - Darwin: `Fannie Bay Goal` nimettiin 11.9. `…Gaol`iksi, ja
     tiedosto `Fannie Bay Goal P6200008.JPG` nimettiin uudelleen.
     Wikitekstit tarkistettiin hetkellä T1: 11 nykyisestä 12 jäsenestä
     oli vanhassa kategoriassa. Ajonaikaisilla nimillä valinta on sama.
5. **Wikidata.** 25 herolle 60:stä kategoria haetaan
   Wikidatasta. Yhdenkään kohteen Commons-kategoria (sitelink/P373) ei
   ole muuttunut T1:n jälkeen. Ainoa P373-muokkaus (Marine Building,
   12.9.) siivosi lähdeviitteitä, ja arvo pysyi samana.
6. **Tiedostojen muutokset.** Yhtäkään valittua kuvaa ei ole ladattu
   uudelleen T1:n jälkeen. Yhtäkään valittua kuvaa ei myöskään lisätty
   kategoriaansa vasta ajon jälkeen.

| Tarkistus | Tulos |
|---|---|
| T1 = 23.8. klo 00.00 | 60/60 sama |
| T2 = 24.8. klo 14.00 | 60/60 sama |
| Kalibrointi, T = nyt | 60/60 sama |
| Poistetut ja siirretyt jäsenet (3 heroa) | 3/3 sama |

## Jäännösriski

1. **Poistot ennen 24.8. klo 10.15 UTC.** Muutosloki ei ulotu tätä
   aiemmaksi. Jos kuva poistettiin kategoriasta T1:n ja tämän hetken
   välillä, ja ajo tehtiin ennen poistoa, sitä ei nähdä. Ikkuna on
   enintään 37 tuntia. Todennäköisesti se on alle 13 tuntia, koska
   viitekuvaputki committoitiin vasta 24.8. klo 00.23.
2. **Ajurin latausvirhe.** Ajuri pudottaa viitteen, jonka lataus
   epäonnistuu, eikä korvaa sitä. Sitä ei voi rekonstruoida. Tällöin
   attribuutio mainitsee yhden kuvan liikaa, mikä on lisenssin kannalta
   harmitonta.
3. **Kašgar ja Damaskos.** Kummankin parametrit ovat rekonstruktion
   oletuksia (ks. taulukkoliite): Kašgarille korjaus1, Damaskokselle
   korjaus3. Varmistus koskee valintaa näillä oletuksilla.

## Toisto

```
node tools/varmista-hero-viitteet.mjs 2026-08-22T21:00:00Z
node tools/varmista-hero-viitteet.mjs 2026-08-24T11:00:00Z
```

Kumpikin ajo kestää noin 5 minuuttia (Commonsin hidastus 1,1 s).
Poistetut ja siirretyt jäsenet on kirjattu työkalun alkuun
(`POISTETUT`, `SIIRRETTY_KATEGORIA`, `VANHA_NIMI`).
