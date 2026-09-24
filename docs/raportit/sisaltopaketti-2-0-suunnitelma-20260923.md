# Sisältöpaketti 2.0: raakakopio pois (suunnitelma, ei toteuteta vielä)

*Siirtoseppä 23.9.2026, Fablen tilaus. Pohjana koepaketti v16 (skeema
1.16, haara siirtoseppa-radiot); täydennetty v19:n (skeema 1.17) jälkeen.*

## Lähtötilanne (mitattu)

| Osa | Koko | Mitä |
|---|---|---|
| Paketti yhteensä | 79 Mt | 445 tiedostoa |
| `kokoelmat/` | 30,4 Mt | tyypitetyt kentät ja alkion raaka `data` |
| josta alkioiden `data` | 11,6 Mt | suurimmat: kaupunkilehdet 3,6, maalehdet 2,6, nahtavyydet 2,4, fokusvirrat 0,9 Mt |
| `moduulit/` | 31,6 Mt | webin exportit häviöttömästi (raakakerros) |

Sopimus (RAJAPINTA 10.1) sanoo jo nyt, ettei `data`-kenttään nojata.
Silti natiivin master lukee `data`-kenttää 16 tiedostossa (Reitit,
LinssiOhjain, KeksintoLuennat, Rantamaski, Kaupat, Kysymysdata, Laatat,
Pulmat, SisaltoTuonti, Fokus, KysymysApu, Luennat, LehtiSisalto,
NostoSisalto, Fokusvirrat, UiSisalto). Lisäksi se lukee 21 moduulia
`moduulit/`-kerroksesta: linssien data, maailmankartta, sen nimet ja
maasto, maakunnat, radiot, viritysäänet ja ui-tekstit.

## Tavoite 2.0

- **Alkioilta pois `data`.** Kaikki, mitä natiivi lukee, on tyypitetyissä
  päätason kentissä.
- **`moduulit/` pois.** Tilalle tulee pieni valkolista `moduulit/`-
  tiedostoja, joilla ei ole luontevaa kokoelmaa (esim. linssien
  kertomusdata). Valkolista on manifestissa (`moduulit[].natiivi: true`).
- **Arvioitu koko:** noin 36 Mt (79 − 11,6 − noin 31 Mt, josta
  valkolistan moduulit noin 1–3 Mt).
- **Osoite `sisalto/2/`.** 1.x jää `sisalto/1/`:een jäädytettynä vanhoille
  sovelluksille (sääntö 5.3: poisto nostaa majoria). CI julkaisee
  siirtymäaikana molemmat majorit samasta commitista.

## Natiivin `data`-lukijat kokoelmittain (master 23.9.2026 ilta)

| Natiivin tiedosto | Kokoelmat, joiden `data`-kenttää luetaan | 1.x-tyypitys |
|---|---|---|
| LehtiSisalto.cs, UiSisalto.cs | kaupunkilehdet, maalehdet | tehty 1.15 (lukija lukee jo molempia) |
| Kohdekartat.cs | nahtavyydet, miniatyyrit | kohdekartat 1.17; nahtavyydet ja miniatyyrit tyypittämättä |
| Fokusvirrat.cs, Fokus.cs, Luennat.cs, Sahketehtava.cs | fokusvirrat | lehtitehtavat 1.17; muu fokusvirta tyypittämättä |
| Kysymysdata.cs, NostoSisalto.cs, KysymysApu.cs | kysymykset, elaintayt | tyypittämättä |
| Kaupat.cs, UiSisalto.cs | elaintayt, julisteet | tyypittämättä |
| Pulmat.cs | pulmat | tyypittämättä (generaattori on jo päätasolla) |
| Laatat.cs | laatat | osittain (kuvat päätasolla 1.10, tyypit datassa) |
| Reitit.cs, SisaltoTuonti.cs | kaupungit, reitit | pääosin päätasolla (1.5); tarkista loput |
| LinssiOhjain.cs, KeksintoLuennat.cs, Rantamaski.cs, Isoisa1873.cs | linssiaineisto ja linssimoduulit | valkolista-ehdokkaat |

Lisäksi natiivin lehtikuori poistuu (Pelikoodari, A4). Sen jälkeen
paketista voidaan poistaa `web/lehti.json`, `skeema/web-nakyma.schema.json`
ja manifestin `webNakymat`. Poisto tehdään 1.x:ssä minor-poikkeuksella
(kuten 1.14), kun Pelikoodari ilmoittaa haaran olevan natiivin masterissa.

## Vaiheet

1. **1.x: tyypitä jokainen natiivin lukema `data`-polku** (kokoelma
   kerrallaan, minor-nostot). Lista saadaan greppaamalla natiivin
   `Kentta(…, "data")`-kutsut ja lukemalla kenttäpolut. Lehdet on tehty
   (1.15), kohdekartat ja lehtitehtävät (1.17). Seuraavat taulukon mukaan
   suuruusjärjestyksessä: nahtavyydet ja miniatyyrit, fokusvirrat,
   kysymykset ja elaintayt, julisteet, pulmat, laatat ja reitit.
2. **1.x: moduulien korvaus.** Jokaiselle natiivin lukemalle moduulille
   joko kokoelma (esim. radiot on jo tehty; maailmankartan nimet →
   maastonimet on jo tehty) tai merkintä `natiivi: true` valkolistaan.
3. **Vartija natiivissa.** Natiivin testi, joka kaatuu, jos koodissa on
   `"data"`-kentän luku tai valkolistan ulkopuolinen `moduulit/`-polku.
   Natiiviseppä omistaa testin. Kun se on vihreä masterissa, natiivi ei
   enää tarvitse raakaa.
4. **Viennin tila 2.0.** `vie-sisalto.mjs --major 2` jättää `data`-kentät
   ja muut kuin valkolistan moduulit pois. Nykyiset testit ajetaan
   1.x:lle, ja 2.0:lle tulevat omat testit (ei `data`-kenttiä,
   valkolista täsmää manifestiin).
5. **CI kahdelle majorille.** vie-sisalto.yml julkaisee `sisalto/1/` ja
   `sisalto/2/`; osoitinvartija toimii majorin sisällä.
   `minSovellus.ios` nostetaan 2.0:ssa siihen versioon, jossa vartija
   (vaihe 3) on vihreä.
6. **1.x jäädytys.** Kun kaikki TestFlight-asennukset ovat 2.0:ssa,
   `sisalto/1/` jätetään viimeiseen versioonsa ja CI lopettaa sen
   julkaisun.

## Riskit

- Webin raakarakenteen muutos voi rikkoa tyypitetyn kentän hiljaa.
  Nykyiset vientitestit vertaavat tyypitettyä pelin funktion tulokseen,
  ja samaa mallia jatketaan jokaiseen uuteen kenttään.
- Valkolista paisuu, jos linssien data jää moduuleiksi. Hyväksytään:
  linssien moduulit ovat pieniä.
- Kahden majorin rinnakkaisjulkaisu kaksinkertaistaa CI-vientiajan
  siirtymän ajaksi.

## Päätettävää (Fable)

- Aloitetaanko vaihe 1 nyt vai vasta, kun natiivin lehdet ja radio ovat
  valmiit?
- Omistaako vaiheen 3 vartijan Natiiviseppä vai Pelikoodari?
