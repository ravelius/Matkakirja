# Viesti Fablelle: karttauudistuksen suunnitelma (13.9.2026)

**Haara:** `claude/karttauudistus-suunnitelma` · docs-only, ei
versionostoa, ei koskettu js/-, css/- eikä tests/-tiedostoihin.
`npm test`: **3292 pass, 0 fail**.

## HUOM: tämä ei ole docs/viesti-fable.md — ja syy

Tehtävänanto (ja docs/roolitus.md:143) sanoo kirjoittaa raportin
tiedostoon `docs/viesti-fable.md`. **Sitä polkua ei voi käyttää
rikkomatta testiä**, jonka sama tehtävänanto käski pitää vihreänä:
`docs/viesti-fable.md` ei ole Raamatun ohjedokumenttikartalla, ja
tests/dokumentit.test.mjs kaatuu siihen (todennettu: `# fail 1`,
virhe *"docs/viesti-fable.md puuttuu Raamatun
ohjedokumenttikartalta"*). Korjaus olisi rivi js/tyohuone-raamattu.js:ään,
eikä työsessio saa koskea js/-tiedostoihin eikä kirjoittaa Raamattuun.

Siksi viesti on täällä docs/raportit/-kansiossa, joka on kartan
ulkopuolella tarkoituksella (tests/dokumentit.test.mjs:9–12).
**Fablelle päätettäväksi:** lisätäänkö `docs/viesti-fable.md` karttaan
(se on roolituksen virallinen kanava, mutta rikkoo testin joka kerta kun
työsessio sen luo), vai muutetaanko roolitus.md osoittamaan
docs/raportit/-kansioon.

## ESTE: PR:ää ei saatu auki

`create_pull_request` vastaa **HTTP 500** joka yrityksellä (viisi
yritystä, myös minimaalisella otsikolla ja rungolla). Lukevat kutsut
samaan repoon toimivat (`list_branches`, `list_pull_requests`), joten
vika on GitHubin PR-päätepisteessä eikä oikeuksissa tai haarassa.
**Haara on pushattu ja valmis** — PR:n voi avata käsin osoitteesta
https://github.com/ravelius/Matkakirja/pull/new/claude/karttauudistus-suunnitelma
otsikolla "Suunnitelma: karttauudistus (13.9.2026)".

## Mitä valmistui

`docs/raportit/karttauudistus-suunnitelma-20260913.md` (935 riviä),
kahdeksan luvun selvitys omistajan karttauudistusideasta. Tärkeimmät
tulokset:

1. **Kysymykseen "vain kohdemaassa värillinen topografia" vastaus on
   KYLLÄ** — mutta ei linssikuvaa rajaamalla. Linssikuva on 0,30
   px/lautayksikkö eli 24× karkeampi kuin pyramidin z7. Suositus on
   **värilaatat samalle laattaruudukolle** (`pyramidi-vari/z…`),
   clipPath `assets/data/maapolygonit.json`ista. Peli ei tarvitse uutta
   latauslogiikkaa, kuorma seuraa ruutua eikä maata (0,26–0,7 Mt per
   ruutu riippumatta siitä onko maa Albania vai Venäjä), ja generointi
   on maakohtainen eli pilotoitavissa yhdellä maalla.
2. **Batymetria on jo olemassa ja jo väritetty** (ETOPO1, PD;
   tools/tee-reliefikartta.mjs MERI-asteikko). Uutta aineistoa ei
   tarvita mihinkään kohtaan uudistusta.
3. **Uloszoomauksen esto on jo toteutettu** (`ULOSZOOMAUS_KERROIN`);
   omistajan idea on tiukennus 3 → ~1, ja se voidaan tehdä vasta
   Liiku-napin kanssa — muuten naapurimaahan ei pääse matkustamaan.
4. **Pilottikaupungiksi suositellaan Pariisia**, ei Marseillea:
   Pariisissa on 9 osastoa / 20 nostoa / 25 kohdekarttapistettä,
   Marseillessa 2 / 5 / 6. Jakopäätös on uudistuksen suurin työ, ja se
   on olemassa vain siellä missä on jaettavaa.
5. **Työ on jaettu kahdeksaan erään** (pilotti ensin), kullakin
   tiedostot, "mitä EI tehdä", valmis-kriteeri, savuke **vastakokeineen**
   ja kokoarvio.

## Mitä jäi auki — omistajan päätettäväksi (raportin luku 7 loppu)

Kuusi kysymystä, jokaisessa suositus: (1) punaisen rajaviivan paluu,
(2) aluevesipuskuri sinisille vesille, (3) uloszoomauksen kerroin,
(4) mitkä kaupunkilehden sivut pudotetaan, (5) liftaus vs. noppa,
(6) minikysymyksen palkkio.

**Kaksi niistä on RISTIRIITA omistajan aiempien päätösten kanssa**, ja
Fablen kannattaa esittää ne kysymyskortilla juuri siinä muodossa:

- Punainen maan ääriviiva **poistettiin 30.8.2026** ("epätarkka"), samoin
  maan sävytys. Poiston syy (50m vs. 10m -aineisto) on sittemmin
  poistunut, mutta päätöstä ei ole kumottu.
- Uloszoomauksen kerroin 3 on **omistajan oma päätös 30.8.2026**, tehty
  koska kamera tuntui lukolta laitteella.

## Havainnot Fablelle (eivät tämän erän työtä)

- **Marseille on pelin ohuimpia kaupunkilehtiä**: kaksi osastoa, viisi
  nostoa, ei historiaa, ei musiikkia, ei kuvataidetta. Uusi
  lisää-valikko tekee ohuudesta heti näkyvää. Marseille tarvitsee
  sisältöerän ennen kuin uusi käyttöliittymä julkaistaan sille.
- **Ranskan maalehdeltä puuttuvat Musiikki ja Kuvataide**, jotka ovat
  koko pelin yleisimpien maalehtiotsikoiden joukossa (69 ja 43 maata).
- **Erät 4, 7 ja 8 koskevat Horatio–Livia-työn rajapintoihin**
  (fokusvirran saapumisketju, Pulun kuplat). Rajapinta on sovittava
  Codexin kanssa ennen toteutusta; js/pollo.js ja js/livia-*.js ovat
  tekstisession omistuksessa.

## Raportin pituus

Ohje oli ~600 riviä, tulos on 935. Syy on, että kahdeksan luvun mitatut
inventaariot (maalehden otsikot, Pariisin jakotaulukko, kahdeksan erää
vastakokeineen, kuusi päätöskysymystä) eivät mahtuneet sen alle ilman
faktojen pudottamista. Luku 1 on taustaa ja sen voi pudottaa puoleen,
jos haluat lyhyemmän version — sano, niin teen sen.
