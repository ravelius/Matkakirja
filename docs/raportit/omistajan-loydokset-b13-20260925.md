# Omistajan löydökset build 13:sta (1.0.13, proto ddb3cfb6) — 25.9.2026 klo 13.5x–14.1x

Kaikki sitovia. Korjaukset build 14:ään, ellei toisin mainita. Rooli = ensisijainen tekijä; sulkeissa avustaja.
Merkitse valmis rivi tähän tiedostoon ("→ KORJATTU <sha>") merge-pyynnön yhteydessä.

## Avaus ja aloituslento

| # | Löydös | Rooli |
|---|---|---|
| 80 | Avauskuva: kermasivun keskellä musta neliö ennen logoa. Esilataus niin, että siirrytään mustasta suoraan valmiiseen näkymään feidillä, tai kaikki elementit ruudulle yhtä aikaa. | Natiiviseppä (Natiivi-UI) |
| 81 | Aloitusnäytöllä ei ruskeaa yläpalkkia, ei Matkakirja-logoa, ei ☰-nappia. | Natiivi-UI |
| 82 | Aloituskaupungin valinta: kartalla vain kohdekaupungit, ei muiden kaupunkien pisteitä eikä nimiä. Yläpalkki pois. | Natiivi-UI (Natiiviseppä: pisteet ja nimet) |
| 83 | Lennon aikana yläpalkki pois, pulu pois kuvasta, alareunassa Ohita-nappi, joka ohittaa koko animaation. | Natiivi-UI |
| 84 | Kohteen valinnan jälkeen: feidi mustaan, värillinen topografiakartta latautuu taustalla, feidi takaisin. Vasta sitten kamera lähtee kohti Lontoota, kone on jo nousussa, ja kamera löytää koneen vasta täydessä korkeudessa. | Natiiviseppä |
| 85 | Lennon loppu: karttaa ei vaihdeta kesken animaation vanhaksi kartaksi. Koko animaatio topografiakartalla, sitten feidi kermanväriselle paperille ja teksti "Ateena, päivä 1", sen jälkeen automaattinen feidi vanhalle kartalle ja peli alkaa kaupungista. | Natiiviseppä (Natiivi-UI: paperi + teksti) |

## Saapuminen, matkakirja ja yläpalkki

| # | Löydös | Rooli |
|---|---|---|
| 86 | Ateenaan saavuttaessa isoisän kirjassa näkyy virheellisesti "Pölyä ja puhetta kullasta" → pois. Matkakirja pienennettynä vain "Ateena, elokuussa 1873", vaalealla pohjalla. | Natiivi-UI (Pelikoodari: tekstin lähde) |
| 87 | Isoisän luennon jälkeen matkakirja tiivistyy: pelkkä "Ateena", ikkuna tekstin kokoiseksi. | Natiivi-UI |
| 88 | Ruskea yläpalkki: logoa ja ☰-nappia sisennetään lisää. | Natiivi-UI |
| 89 | Matkakirja saa oikean värinsä vasta, kun isoisän valokuvat tulevat näytölle; värin pitää olla oikea alusta asti. | Natiivi-UI |
| 90 | Isoisän valokuvat isommiksi ainakin iPadilla, mutta kaiuttimen pitää silti näkyä matkakirjan rivillä. | Natiivi-UI |
| 91 | Pulun chatin väritys väärä → tarkistetaan webistä ja tehdään sama. | Natiivi-UI |

## Kartta ja nostot

| # | Löydös | Rooli |
|---|---|---|
| 92 | Kaupungin klikkaus kartalla: minivalikko aivan liian pieni → isommaksi. | Natiivi-UI |
| 93 | Kaikki karttakohteet klikattaviksi myös tekstistä, ei vain pisteestä tai symbolista (nähtävyydet). | Pelikoodari (Natiivi-UI) |
| 94 | Koko ruutu -nappi ei toimi, ja se on oudon näköinen ovaali → toiminta ja ulkoasu webin mallin mukaan. | Natiivi-UI |
| 95 | Ateenan nähtävyyksistä osa ei ole leikattuja: piirretty tausta näkyy. | Sisältökirjuri (kuvaputki/Codex) |
| 102 | Nostoissa kuvan avaus koko ruudun kokoiseksi aukeaa liian pienenä. | Natiivi-UI |
| 103 | Kehittäjätilassa ei löydy, mistä Maailma-tilan saa pois päältä. | Natiivi-UI |
| 104 | Karttanostot aukeavat hitaasti. Webissä service worker + kaupungin kuvien esilataus saavuttaessa; natiivin esilataus (build 9) ei kata karttanostoja → selvitys ja korjaus samaan kaavaan. | Pelikoodari |
| 105 | Maakunnat kaikille maille. Jos maalla ei ole maakuntia, lista on tyhjä tai sisältää vain maan nimen, ei koskaan muiden maiden maakuntia. | Karttaseppä (data) + Natiivi-UI (lista) |
| 106 | Karttanostojen teksti saattaa panoroidessa yhä hypätä merkin toiselle puolelle. | Natiiviseppä (nimiölukko) |
| 107 | Välimeri ja Messinansalmi voivat piirtyä maan päälle; merinimien pitää piirtyä aina meren päälle. | Karttaseppä (nimiödata) + Natiiviseppä |
| 108 | Välimeri ja Messinansalmi klikattaviksi nostoiksi kuvineen ja teksteineen. | Sisältökirjuri (data) + Natiivi-UI |
| 109 | Kaupunkien reitit piilossa aina, ellei liikkumistila ole päällä; näkyvyys Raamatun liikkumistilan sääntöjen mukaan. | Pelikoodari |

## Linssit ja laatikot

| # | Löydös | Rooli |
|---|---|---|
| 96 | Avaruuslinssi: pulu liian reunassa chatissa, ja chatti ei toimi vielä oikein. | Linssiseppä (Natiivi-UI) |
| 97 | Vasemman yläreunan nimilaatikko kuvaa katsottaessa liian iso → tekstin kokoinen. Pienennys animoidaan rivi kerrallaan, ei kertarysäyksellä. SÄÄNTÖ: sama kaikille laatikoille, jotka näyttävät sisällön ja pienenevät automaattisesti (myös 86/87 matkakirja). | Natiivi-UI |
| 98 | Avaruuslinssin topografianäkymä reilusti tummemmaksi, jotta vihreät pisteet hehkuvat yökartalla. | Linssiseppä (Natiiviseppä) |
| 99 | Topografian navat ovat vielä pyöreitä reikiä → korjataan (napakalotit). | Natiiviseppä |
| 100 | Pelinäkymässä kartun klikkaus: radiopainike menee punaiseksi, mutta mitään ei kuulu. | Pelikoodari |
| 101 | Maalehdet skrollautuvat edelleen todella tahmaisesti (laitteella; löydöksen 64 jatko). | Pelikoodari (Natiivi-UI) |

## Lisäksi Linssisepän kierrokselta 3 (ei omistajan numero)

- Kotimaan korostus: web korostaa kotimaan kultareunalla ja reliefillä, natiivissa reliefi kaikkialla eikä korostusta → Natiiviseppä.

## Lisäys klo 14.5x

| # | Löydös | Rooli |
|---|---|---|
| 110 | Aloituslennolle kiinteä kesto sekunteina riippumatta kohteen etäisyydestä. Aika kurotaan umpeen nopeuttamalla koneen vauhtia vain keskivaiheilla (nousu ja lasku ennallaan). Yleisemmin: kone saa lentää animaatioissa eri vauhdeilla tarpeen mukaan. Natiiviseppä ehdottaa kestoarvon videon perusteella, omistaja vahvistaa. | Natiiviseppä |
| 111 | Siirtymäreitit (matkareitit) ovat webissä paksummat kuin natiivissa. Tarkista webistä mitattuna (viivan leveys, väri, katkoviiva) ja tee natiiviin sama. | Pelikoodari (mittaus) + Natiiviseppä (piirto) |
