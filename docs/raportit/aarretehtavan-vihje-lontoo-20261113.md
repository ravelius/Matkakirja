# Aarretehtävän vihje: Lontoo (SK 13.11.2026, KK:n tehtävä 2)

Taulukko ja ehdotus, EI pelidataa. Malli: aarretehtavan-vihje-pariisi-20261112.md.

## Löydös
Lontoon vihreän pisteen aarretehtäviä (tarinakaari, tietovisa) on YKSI: Leila, "Leila sanoo, ettei kadulla ennen näkynyt kuvattavaa savulta. Mihin vuoden 1956 Clean Air Act erityisesti puuttui?" (tarinakaari.lontoo.kysymys; js/tyohuone-kehitys-data.js KAARI_PAKETIT, id `lontoo`). Oikea vastaus on "Rakennusten ja tulisijojen savupäästöihin" (oikea: 2). Kentät `lahde` ja `vihje` puuttuvat vielä.

## Vastaus ei löydy yhdestäkään kartan tarinapaikan jutusta
Luettu kaikki Lontoon kohdekartan 43 kohteen jutut (js/packs/nahtavyysjutut.js, kaupunki lontoo): 5 tarinapaikkaa (`tarinapaikka: true`: Faraday 1831, Fleming 1928, Brunel 1827, Lontoon palo 1666, Shakespeare 1599) ja 38 muuta (maamerkit, kadonneet ihmeet, nostot). Yhdessäkään ei esiinny vuoden 1956 lakia, Clean Air Actia, savuttomia alueita eikä tulisijojen tai piippujen savun kieltoa.

Lähimmät maininnat (savu esiintyy, mutta ei vastausta):
- Albert Memorial: "ilmansaasteet olivat jo pilanneet kullan" (patsas maalattiin mustaksi).
- Victoria Memorial: palatsin julkisivu "mureni Lontoon savussa".
- Natural History Museum: terrakotta "kesti Lontoon nokea paremmin kuin kivi".
- Royal Observatory: "kaupungin savu ja valot peittivät tähdet".
- Metron höyryveturi: savu johdettiin ulos tunneliin jätetyistä aukoista (1863).
- Pyhän Paavalin katedraali: pommituksen "savun keskellä" (1940).

Vastaus on kahdessa muussa paikassa:
1. Fokusvirran oppitunti (js/packs/fokusvirta-lontoo.js, loppukappale "Isoisäsi matkavuoden sumu…"): sisältää koko vastauksen (tumman savun kielto piipusta, kunnat saavat määrätä savuttomia alueita, kodin tulisijassa vain savutonta polttoainetta). Ei kartan tarinapaikka.
2. Ison-Britannian maalehden luontonosto "Sumu, joka ei ollutkaan sumua" (js/packs/maa-kategoriat.js, GBR/luonto; savusumu 5.–9.12.1952, 4 000–12 000 kuolemaa, "neljä vuotta myöhemmin säädettiin laki, jonka nojalla kaupunginosia voitiin määrätä savuttomiksi"). Ei sanaa "Clean Air Act", ei tulisijoja; ei Lontoon kohdekartan kohde.

## Lähde (`lahde`)
EI LÖYDY. Ei keksitty. Huomio datamuodosta: `lahde` = kohdekartan kohteen `nosto`-tunnus. Lontoon 14 3D-mallin kyltillä (esim. Albert Memorial) ei ole `nosto`-kenttää, joten niihin ei voi viitata `lahde`-kentällä ilman uutta tunnusta.

## Vaihtoehdot KK:lle (valitse yksi; kumpikaan ei ole vielä dataa)
**A. UUSI TARINAPAIKKA "Savusumu 1952 — laki, jota savu odotti"** (tiimalasi). Juttu valmiista hyväksytystä aineistosta (fokusvirran loppukappale + maalehden "Sumu, joka ei ollutkaan sumua"): 1952 savusumu, 1956 laki (tumma savu piipusta kielletty, kunnat saavat määrätä savuttomia alueita, tulisijassa vain savutonta polttoainetta). Sama visa kuin nyt, koska vastaus on jutussa. Luonteva, koska Leila on jo kuvattu ja 1873 sumu on fokusvirrassa isoisän aikaan.
 Paikka: ehdotus KK:lta (en keksi koordinaattia). Mahdollisia: Albert Memorial (savu pilasi kullan, vain 3D-kyltti) tai Westminster (laki säädettiin parlamentissa), kumpikin tarvitsee oman pisteen eikä kyltin paikkaa voi käyttää.
 Luonnos `vihje`: "Kysyn sinulta Lontoon sumusta. Etsi tiimalasi [paikka]."
 Vaatii: nosto + nähtävyysjuttu + kohdekartan kohde (`nosto`) + kuva + äänijono; testit.
**B. VAIHDETAAN KYSYMYS yhdeksi, jonka vastaus on jo tarinapaikan jutussa.** Esimerkki Albert Memorialista (savuteema säilyy): "Miksi Albert Memorialin kullattu patsas maalattiin mustaksi?" (vastaus: ilmansaasteet olivat pilanneet kullan; ei ensimmäisen maailmansodan ilmalaivat). Ongelma: Albert Memorialilla ei ole `nosto`-tunnusta (3D-kyltti), ja Leilan kohtaaminen ja aarteen teksti pitäisi sovittaa. Muita: Metron höyryveturi (vastaus höyryveturi, nosto-lontoon-metro-1863) tai Fleming 1928 (vastaus home).
**C. Jätetään Lontoon vihje pois (vanha käytös), kunnes A tai B on tehty.**
SUOSITUS: A (säilyttää Clean Air Act -kysymyksen ja Leilan; aineisto on jo hyväksyttyä).

## Muuta
- Lehden aarteen avaus -visat ovat toinen järjestelmä (PK:n selvitys kohta 4); ne eivät kuulu tähän.
- Pariisin tapaan tarinapaikan kuva/miniatyyri tulisi tehdä vasta KK:n sanalla (ei generoitu).
