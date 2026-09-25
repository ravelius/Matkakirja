# Omistajan löydökset build 13:sta (1.0.13, proto ddb3cfb6) — 25.9.2026 klo 13.5x–14.1x

Kaikki sitovia. Korjaukset build 14:ään, ellei toisin mainita. Rooli = ensisijainen tekijä; sulkeissa avustaja.
Merkitse valmis rivi tähän tiedostoon ("→ KORJATTU <sha>") merge-pyynnön yhteydessä.

## Avaus ja aloituslento

| # | Löydös | Rooli |
|---|---|---|
| 80 | Avauskuva: kermasivun keskellä musta neliö ennen logoa. Esilataus niin, että siirrytään mustasta suoraan valmiiseen näkymään feidillä, tai kaikki elementit ruudulle yhtä aikaa. | Natiiviseppä (Natiivi-UI) |
| 81 | Aloitusnäytöllä ei ruskeaa yläpalkkia, ei Matkakirja-logoa, ei ☰-nappia. → KORJATTU natiivi-ui/aloitus-81-83 2647976e (juna/b13, build 14) | Natiivi-UI |
| 82 | Aloituskaupungin valinta: kartalla vain kohdekaupungit, ei muiden kaupunkien pisteitä eikä nimiä. Yläpalkki pois. | Natiivi-UI (Natiiviseppä: pisteet ja nimet) |
| 83 | Lennon aikana yläpalkki pois, pulu pois kuvasta, alareunassa Ohita-nappi, joka ohittaa koko animaation. → KORJATTU natiivi-ui/aloitus-81-83 2647976e + Ohita verhon päällä natiiviseppa/verho-ohita dbcc0eb1 | Natiivi-UI |
| 84 | Kohteen valinnan jälkeen: feidi mustaan, värillinen topografiakartta latautuu taustalla, feidi takaisin. Vasta sitten kamera lähtee kohti Lontoota, kone on jo nousussa, ja kamera löytää koneen vasta täydessä korkeudessa. | Natiiviseppä |
| 85 | Lennon loppu: karttaa ei vaihdeta kesken animaation vanhaksi kartaksi. Koko animaatio topografiakartalla, sitten feidi kermanväriselle paperille ja teksti "Ateena, päivä 1", sen jälkeen automaattinen feidi vanhalle kartalle ja peli alkaa kaupungista. | Natiiviseppä (Natiivi-UI: paperi + teksti) |

## Saapuminen, matkakirja ja yläpalkki

| # | Löydös | Rooli |
|---|---|---|
| 86 | Ateenaan saavuttaessa isoisän kirjassa näkyy virheellisesti "Pölyä ja puhetta kullasta" → pois. Matkakirja pienennettynä vain "Ateena, elokuussa 1873", vaalealla pohjalla. → KORJATTU natiivi-ui/matkakirja-86 c931ab2b + paikkarivi-ilmoitus pois natiivi-ui/paikkarivi-89 951c4c93 | Natiivi-UI (Pelikoodari: tekstin lähde) |
| 87 | Isoisän luennon jälkeen matkakirja tiivistyy: pelkkä "Ateena", ikkuna tekstin kokoiseksi. → KORJATTU natiivi-ui/matkakirja-86 c931ab2b | Natiivi-UI |
| 88 | Ruskea yläpalkki: logoa ja ☰-nappia sisennetään lisää. → KORJATTU natiivi-ui/ylapalkki-88 3aca5217 | Natiivi-UI |
| 89 | Matkakirja saa oikean värinsä vasta, kun isoisän valokuvat tulevat näytölle; värin pitää olla oikea alusta asti. → KORJATTU natiivi-ui/paikkarivi-89 951c4c93 (juurisyy: tumma paikkarivi-ilmoitus) | Natiivi-UI |
| 90 | Isoisän valokuvat isommiksi ainakin iPadilla, mutta kaiuttimen pitää silti näkyä matkakirjan rivillä. → KORJATTU natiivi-ui/luentakuva-90 f640ade3 (iPad 528 pt, build 15) | Natiivi-UI |
| 91 | Pulun chatin väritys väärä → tarkistetaan webistä ja tehdään sama. → KORJATTU natiivi-ui/chat-91 02c9a50d | Natiivi-UI |

## Kartta ja nostot

| # | Löydös | Rooli |
|---|---|---|
| 92 | Kaupungin klikkaus kartalla: minivalikko aivan liian pieni → isommaksi. → KORJATTU natiivi-ui/liuska-92 19e6dd53 | Natiivi-UI |
| 93 | Kaikki karttakohteet klikattaviksi myös tekstistä, ei vain pisteestä tai symbolista (nähtävyydet). → KORJATTU pelikoodari/nosto-nimio 5e21527b (natiivi-ui/nimiolukko-106:n mukana juna/b13 9f78c612) | Pelikoodari (Natiivi-UI) |
| 94 | Koko ruutu -nappi ei toimi, ja se on oudon näköinen ovaali → toiminta ja ulkoasu webin mallin mukaan. → KORJATTU natiivi-ui/kokoruutu-94 8798fc55 (build 15; todennettu video b13o/video-b15-todennus-94-102-96b-iphone.mp4) | Natiivi-UI |
| 95 | Ateenan nähtävyyksistä osa ei ole leikattuja: piirretty tausta näkyy. → EI VIKAA natiivissa: 7 kohtauskuvassa tausta on lähdetiedostossa (ImageIO säilyttää alfan), Sisältökirjuri/Codex | Sisältökirjuri (kuvaputki/Codex) |
| 102 | Nostoissa kuvan avaus koko ruudun kokoiseksi aukeaa liian pienenä. → KORJATTU natiivi-ui/suurennos-102 1a71f32c (build 15; todennettu videolla) | Natiivi-UI |
| 103 | Kehittäjätilassa ei löydy, mistä Maailma-tilan saa pois päältä. → KORJATTU natiivi-ui/kehittaja-103 1da2bfc7 | Natiivi-UI |
| 104 | Karttanostot aukeavat hitaasti. Webissä service worker + kaupungin kuvien esilataus saavuttaessa; natiivin esilataus (build 9) ei kata karttanostoja → selvitys ja korjaus samaan kaavaan. → KORJATTU pelikoodari/nosto-esilataus c50c572b (juna/b13 9f78c612; maan nostodata esiladataan saapuessa) | Pelikoodari |
| 105 | Maakunnat kaikille maille. Jos maalla ei ole maakuntia, lista on tyhjä tai sisältää vain maan nimen, ei koskaan muiden maiden maakuntia. → KORJATTU natiivi-ui/maakunnat-105 6ef4985c (lista), data 142 maata moduulissa | Karttaseppä (data) + Natiivi-UI (lista) |
| 106 | Karttanostojen teksti saattaa panoroidessa yhä hypätä merkin toiselle puolelle. | Natiiviseppä (nimiölukko) |
| 107 | Välimeri ja Messinansalmi voivat piirtyä maan päälle; merinimien pitää piirtyä aina meren päälle. | Karttaseppä (nimiödata) + Natiiviseppä |
| 108 | Välimeri ja Messinansalmi klikattaviksi nostoiksi kuvineen ja teksteineen. → KORJATTU data PR #3181 (v2226); natiivin näyttö Natiivi-UI | Sisältökirjuri (data) + Natiivi-UI |
| 109 | Kaupunkien reitit piilossa aina, ellei liikkumistila ole päällä; näkyvyys Raamatun liikkumistilan sääntöjen mukaan. → KORJATTU pelikoodari/reitit-alku e4c75de4 (junassa; todennus aloituskartan napautuksella build 14:ssä) | Pelikoodari |

## Linssit ja laatikot

| # | Löydös | Rooli |
|---|---|---|
| 96 | Avaruuslinssi: pulu liian reunassa chatissa, ja chatti ei toimi vielä oikein. → KORJATTU natiivi-ui/avaruus-96 af0b998b, avaruus-96b fe98c37e, minipulu-96c 8debbdf3 (build 15; 96b todennettu videolla) | Linssiseppä (Natiivi-UI) |
| 97 | Vasemman yläreunan nimilaatikko kuvaa katsottaessa liian iso → tekstin kokoinen. Pienennys animoidaan rivi kerrallaan, ei kertarysäyksellä. SÄÄNTÖ: sama kaikille laatikoille, jotka näyttävät sisällön ja pienenevät automaattisesti (myös 86/87 matkakirja). → KORJATTU natiivi-ui/matkakirja-86 c931ab2b | Natiivi-UI |
| 98 | Avaruuslinssin topografianäkymä reilusti tummemmaksi, jotta vihreät pisteet hehkuvat yökartalla. | Linssiseppä (Natiiviseppä) |
| 99 | Topografian navat ovat vielä pyöreitä reikiä → korjataan (napakalotit). | Natiiviseppä |
| 100 | Pelinäkymässä kartun klikkaus: radiopainike menee punaiseksi, mutta mitään ei kuulu. → KORJATTU pelikoodari/kartun-radio c13af0b3 (juna/b13 9f78c612; voimakkuus Avaa-kutsun jälkeen) | Pelikoodari |
| 101 | Maalehdet skrollautuvat edelleen todella tahmaisesti (laitteella; löydöksen 64 jatko). → KORJATTU pelikoodari/lehti-piirto 6ba8ada0 (juna/b13 9f78c612; laitteella A/B: lehti 30 → 120 fps) | Pelikoodari (Natiivi-UI) |

## Lisäksi Linssisepän kierrokselta 3 (ei omistajan numero)

- Kotimaan korostus: web korostaa kotimaan kultareunalla ja reliefillä, natiivissa reliefi kaikkialla eikä korostusta → Natiiviseppä.

## Lisäys klo 14.5x

| # | Löydös | Rooli |
|---|---|---|
| 110 | Aloituslennolle kiinteä kesto sekunteina riippumatta kohteen etäisyydestä. Aika kurotaan umpeen nopeuttamalla koneen vauhtia vain keskivaiheilla (nousu ja lasku ennallaan). Yleisemmin: kone saa lentää animaatioissa eri vauhdeilla tarpeen mukaan. Natiiviseppä ehdottaa kestoarvon videon perusteella, omistaja vahvistaa. | Natiiviseppä |
| 111 | Siirtymäreitit (matkareitit) ovat webissä paksummat kuin natiivissa. Tarkista webistä mitattuna (viivan leveys, väri, katkoviiva) ja tee natiiviin sama. | Pelikoodari (mittaus) + Natiiviseppä (piirto) |
| 112 | Aloitusnäytön taustapallo: webissä aloitustekstien takana pyörii pallo, jolla lentokone lentää kaupungista toiseen ja piirtää punaista viivaa perässään → sama natiivin oikealle karttapallolle. Webin isoisän valokuvat jätetään pois (eivät toimi). Web on malli, mitattuna (nopeus, viivan väri ja leveys, reitti). → KORJATTU UI-osa natiivi-ui/portti-112 51007795 (tumma portti, build 15) | Natiiviseppä (Pelikoodari: webin mittaus) |

## Build 14 (1.0.14) — omistajan löydökset klo 17.0x

| # | Löydös | Rooli |
|---|---|---|
| 113 | Maakuntien ääriviivat ovat liian voimakkaat, ja niiden pitää näkyä vain kohdemaassa (pelaajan maa). Viivan voimakkuus webin mukaan mitattuna. | Natiiviseppä |
| 114 | Maakunnat-listaan valinta "pois", jolla kohdemaankin maakunnat häviävät näkyvistä. → KORJATTU natiivi-ui/maakunnat-114-116 c875cf31 (build 16) | Natiivi-UI |
| 115 | Maakunnan mini-inforuutuun pieni kuva kyseisestä maakunnasta. Data: kuvat tilataan kuvaputkelta pelin maiden maakunnille ensin. → KORJATTU natiivi-ui/maakunnat-114-116 c875cf31 (build 16, kuva datan kuvat[0]) | Sisältökirjuri (data) + Natiivi-UI (ruutu) |
| 116 | Mini-inforuudun plusmerkki pois; tilalle tekstin loppuun "Lue lisää" (Fablen valinta omistajan kahdesta vaihtoehdosta). → KORJATTU natiivi-ui/maakunnat-114-116 c875cf31 (build 16) | Natiivi-UI |
| 117 | Nostot (väripallojen kytkimet päälle/pois) saavat näkyä vain kohdemaassa (pelaajan maa), kuten maakunnat. → UI-muutosta ei tarvita (Pelikoodarin pelikoodari/valot-kohdemaa rajaa selitteen luvut) | Pelikoodari (nostojen rajaus) + Natiivi-UI (kytkimet) |
| 118 | "Vintiltä löytyi isoisän matkalaukku" -luenta ja teksti tulevat SAMAAN aloitusruutuun, jossa Aloita seikkailu -painike on: taustalla pyörii sama pallo- ja lentokoneanimaatio ja sama musiikki jatkuu, kun luenta alkaa (ei erillistä ruutua). → KORJATTU UI-osa natiivi-ui/intro-118 b84c8a55 + avausluenta ja musiikki buildiin (Pelikoodari, puhe 31 ms pyynnöstä, merge-pyynnössä build 16) | Natiivi-UI (ruutu) + Pelikoodari (luennan ajoitus) |
| 119 | Pallossa on vieläkin todella paljon reikiä, joista näkyy maapallon läpi (build 14). | Natiiviseppä (Karttaseppä: laattojen/maaston kattavuus) |
| 120 | Lentokonekohtaus on outo: kamera pomppii liian villisti eri paikkoihin. Opus miettii sen paremmaksi: vaihtelevat nopeudet säilyvät, mutta yksi yhtenäinen kamera-ajo ilman hyppyjä (KAMERA-AJOT: ease in/out, yhtenäinen spline). VIDEOPARI 1 (lento-spline f9d785c9) → omistaja 19.0x: EI VIELÄ — lentokone koko ajan näkyvissä, ja lennon alku näkyy vaikka kaukaa; uusi videopari. | Natiiviseppä |
