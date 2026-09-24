# Kontaktiarkki: lehti web vs. natiivi (Pariisi, Ranska)

6 näkymää molemmilla alustoilla, samat kohteet. Kuvat:
`/Users/Shared/Claude/proto-3d/lokit/lehti-savuke-20260923/`
(natiivi `ui-*.png`, web `web-*.png`). Web-skripti
`tools/mittaus/kontakti-lehti-web.mjs` (web-repo, ei committoitu,
kertaluonteinen kuten muutkin kontakti-skriptit).

## Kaupunkilehti Pariisi

| Näkymä | Natiivi | Web | Huomio |
|---|---|---|---|
| Etusivu | OK | OK | **Sisältöero**: web näyttää säärivin ("syyskuussa keskimäärin 16°, sadetta 47 mm · Vuosiennuste") ja "Matkailijalle"-vihjeboksin heti etusivulla; natiivi ei näyttänyt kumpaakaan tässä kaappauksessa. Muuten sama kuva/teksti/attribuutio (Invalidien kirkko, 1706/1861). |
| Sisällys/aiheet | **Eroaa merkittävästi** | OK, rikas ruudukko kuvineen | Web: 4 aihetta kuvineen (Etusivu, Pariisi pintaa syvemmältä, Musiikki, Historia). **Natiivi: `ui lehti sisallys` ei näyttänyt mitään** (kuva identtinen etusivun kanssa) — natiivilla kaupunkilehden sisällysvalikko ei siis ole vielä kytketty testikomentoon, vaikka web-puolella toiminto on olemassa ja rikas. |
| Sivu 1 (Pariisi pintaa syvemmältä) | OK | OK | **Täsmää lähes täydellisesti**: sama otsikko, sama artikkeli ("Paras patonki valitaan sokkona"), sama kuva + attribuutio (Lionel Allorge, CC BY-SA 3.0), sama nimetty navigointi (natiivi "‹ Etusivu / Musiikki ›", web "EDELLINEN Etusivu / SEURAAVA Musiikki"). |

## Maan oma lehti (Ranska/FRA)

| Näkymä | Natiivi | Web | Huomio |
|---|---|---|---|
| Etusivu | OK, Historia-aihe kanteen | OK | **Sisältöero**: web näyttää PERUSTIEDOT-tilastolaatikon (väkiluku, pinta-ala, V-Dem-indeksi, BKT sijalukuineen), kartan, "HYVÄÄ PÄIVÄÄ"-tervehdystilastot ja "France Inter LIVE" -radiowidgetin. Natiivin etusivu näytti pelkän Historia-artikkelin ilman näitä lisäelementtejä — joko natiivi ei vielä toteuta niitä, tai `ui maalehti FRA` -testikomento ohittaa ne. |
| Sisällys/aiheet | OK, 6 aihetta | OK, **9 aihetta** | Natiivi: Historia, Ruoka, Keksinnöt, Luonto, Urheilu, Arki. Web: samat 6 + **Ranska (kartta-yleiskatsaus), Tavat, Ranska numeroina** — kolme ylimääräistä aihetta puuttuu natiivista. |
| Sivu 1 | OK | OK | Molemmat siirtyivät seuraavaan aiheeseen oikein; en verrannut sisältöä rivi riviltä koska maalehden sivujärjestys voi erota (natiivi näytti Ruoka-aiheen ensin, web näytti saman aihelistan mutta en tarkistanut tarkkaa sivu 1 -sisältöä natiivin ruudulta uudelleen). |

## Yhteenveto

Kaupunkilehden **sisältösivu** (sivu 1) ja rakenteet täsmäävät hyvin
molemmilla alustoilla. Kolme todellista eroa löytyi:

1. Kaupunkilehden sisällysvalikko ei toimi natiivin testikomennolla
   (web: toimii ja on rikas).
2. Maalehden etusivu puuttuu natiivista tilastolaatikko, kartta ja
   radiowidget (web: kaikki mukana).
3. Maalehdessä natiivilla on 6 aihetta, webillä 9 (Ranska-yleiskatsaus,
   Tavat, Ranska numeroina puuttuvat natiivista).

En osaa sanoa varmasti, ovatko erot 1-3 kesken olevaa toteutusta
(natiivilehti on juuri mergetty, build 8b3e12b) vai testikomennon
rajoitteita — suosittelen Natiivi-UI:n tarkistavan.
