# Omistajan löydökset build 13:sta (1.0.13, proto ddb3cfb6) — 25.9.2026 klo 13.5x–14.1x

Kaikki sitovia. Korjaukset build 14:ään, ellei toisin mainita. Rooli = ensisijainen tekijä; sulkeissa avustaja.
Merkitse valmis rivi tähän tiedostoon ("→ KORJATTU <sha>") merge-pyynnön yhteydessä.

## Avaus ja aloituslento

| # | Löydös | Rooli |
|---|---|---|
| 80 | Avauskuva: kermasivun keskellä musta neliö ennen logoa. Esilataus niin, että siirrytään mustasta suoraan valmiiseen näkymään feidillä, tai kaikki elementit ruudulle yhtä aikaa. | Natiiviseppä (Natiivi-UI) |
| 81 | Aloitusnäytöllä ei ruskeaa yläpalkkia, ei Matkakirja-logoa, ei ☰-nappia. → KORJATTU natiivi-ui/aloitus-81-83 2647976e (juna/b13, build 14) | Natiivi-UI |
| 82 | Aloituskaupungin valinta: kartalla vain kohdekaupungit, ei muiden kaupunkien pisteitä eikä nimiä. Yläpalkki pois. → KORJATTU ja todennettu build 16:lla (Laitetestaaja 9c4d3844d: vain Lontoo + Moskova/Istanbul/Ateena/Kairo; pysyvä savukekohta) | Natiivi-UI (Natiiviseppä: pisteet ja nimet) |
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
| 119 | Pallossa on vieläkin todella paljon reikiä, joista näkyy maapallon läpi (build 14). → KORJATTU juna/b13 35424e12 (natiiviseppa/reiat-119 6b8d45f0): pohjapallo = pergamentinvärinen (#e5d0a7) umpinainen varapinta 3 km ellipsoidin alla, joten reiästä näkyy pergamenttia eikä avaruutta, ja maastolaattojen uusinta. Koe: magentareiät pinnan sisällä 308/34 px → 0; kuvaparit proto-3d/lokit/reiat-119/koe2/. Juurisyy: laattatasojen saumat latauksen aikana (forbidHoles) ja pysyvät pistereiät (helmat) jäävät. | Natiiviseppä (Karttaseppä: laattojen/maaston kattavuus) |
| 120 | Lentokonekohtaus on outo: kamera pomppii liian villisti eri paikkoihin. Opus miettii sen paremmaksi: vaihtelevat nopeudet säilyvät, mutta yksi yhtenäinen kamera-ajo ilman hyppyjä (KAMERA-AJOT: ease in/out, yhtenäinen spline). VIDEOPARI 1 (lento-spline f9d785c9) → omistaja 19.0x: EI VIELÄ — lentokone koko ajan näkyvissä, ja lennon alku näkyy vaikka kaukaa; lento saa kestää 2 s pidempään (12 s). VIDEOPARI v2 (lento-spline 5cc1597c, 12 s, kone aina kuvassa ≥ 21 %) → OMISTAJA HYVÄKSYI 20.3x → KORJATTU juna/b13 8e53cb03 (natiiviseppa/lento-spline c8b03f98, build 16). | Natiiviseppä |

## Build 16 (1.0.16) — omistajan löydökset klo 22.4x

| # | Löydös | Rooli |
|---|---|---|
| 121 | Aloitusruutu: otsikon alta pois teksti "seuraa isoisän jäljillä…" (tai vastaava alaotsikko). | Natiivi-UI |
| 122 | Lentokohtaus: tekstitys pois — tekstikenttä on lisäksi järkyttävän iso. Luenta kuuluu, teksti ei näy. | Natiivi-UI (Pelikoodari: luennan tekstin lähde) |
| 123 | Lennon Ohita-nappi pienemmäksi ja läpinäkyvälle taustalle (vain teksti ja kevyt reuna, kuten Liiku-nappi). | Natiivi-UI |
| 124 | Lennon jälkeinen "Ateena, päivä 1/80" -teksti näkyviin noin sekunnin pidempään. | Natiivi-UI (Natiiviseppä: ajoitus) |
| 125 | Ateenan karttanostoista puuttuu symboleita, ja niiden teksteistä ei saa selvää. Vertaa webiin mitattuna: symbolit, fonttikoko, kontrasti, hehkupiste. | Natiiviseppä (nimiöt ja symbolit) + Pelikoodari (nostodata, mitkä symbolit puuttuvat) |
| 126 | Meren ja maan välissä näkyy tuplaraja (pohjan antialiasoitu raja + vektorirantaviiva). Reseptin mukaan rantaviiva vektorina himmeänä tai pois → pois. | Natiiviseppä |
| 127 | Maanraja vain kahden maan välillä, ei niiltä osin, joissa maa loppuu mereen; raja joka tapauksessa kevyempi. Rajadata: maa–maa-segmentit erilleen rannikosta. | Karttaseppä (rajadata) + Natiiviseppä (piirto, paino) |
| 128 | Kermahuntu peittää nyt liikaa muita maita → peittoa alas (kuvapari, omistaja valitsee). | Natiiviseppä (Karttaseppä: sarjan peitto) |
| 129 | Meressä syvyyserot näkyvät liian vähän → pohjan meren sävyliuku voimakkaammaksi (poltto, kuvapari). | Karttaseppä |

## Build 16 (1.0.16) — omistajan löydökset klo 22.5x (nostot, matkakirja, kartussi)

| # | Löydös | Rooli |
|---|---|---|
| 130 | Nostot iPadilla ja iPhonella: kuva aukeaa isompana, ja nostokortti saa olla leveämpi. | Natiivi-UI |
| 131 | Kuvaa napautettaessa kuva pysyy täysin paikallaan; otsikko ja muut tekstit tulevat sen ympärille (webin työpöydällä kuva pienenee, kun toinen palsta tulee — natiivissa ei). | Natiivi-UI |
| 132 | Kuva kokoruudulle: tausta pehmennetään (sumennus) sen lisäksi, että se tummenee. | Natiivi-UI (Natiiviseppä: sumennusmekanismi) |
| 133 | (x) pois noston oikeasta yläkulmasta. | Natiivi-UI |
| 134 | Nosto aukeaa edelleen liian hitaasti kartalta napautettaessa; pitää aueta välittömästi (mitattu viive ennen/jälkeen). | Pelikoodari (data, esilataus, viive) + Natiivi-UI (avaus) |
| 135 | Jotkut karttanostot aukeavat paljon pienempinä (esim. Lyon). Kaikki aukeavat samaan kokoon ja tyyliin; vain skandaaleissa tyyli muuttuu, koko pysyy. | Natiivi-UI (Pelikoodari: nostotyypit) |
| 136 | Pulun valmis kysymys tai chatin avaus: nosto pysyy taustalla auki, chat-ikkuna aukeaa sen päälle. | Natiivi-UI |
| 137 | Nostojen sivun vieritys tökkii edelleen. Nostojen sijaintia ei tarvitse voida siirtää itse (raahaus pois). | Natiivi-UI + Pelikoodari (piirto) |
| 138 | Isoisän ja pulun kuvista lisäkehys ja kuvateksti pois kokonaan. | Natiivi-UI |
| 139 | Matkakirja aukeaa edelleen tummana versiona; pohjan pitää olla sama vaalea kuin pienennettynä. | Natiivi-UI |
| 140 | Linssit pois matkalaukusta (vain ☰-valikosta, kaikki laitteet). | Natiivi-UI |
| 141 | Pienennetty kartussi hieman liian iso iPadilla (iPhonella koko hyvä). | Natiivi-UI |
| 142 | Suurennettu kartussi animoidaan: vertailutiedot piirtyvät animoidusti lukujen perään, kun kartussi aukeaa. Visuaalisesti yksinkertaista, mutta liike ja sisääntulo ensiluokkaista animaatiota (KAMERA-AJOT-henki: ease in/out). | Natiivi-UI |
| 143 | Pitkät maannimet (Bosnia ja Hertsegovina ym.) jaetaan kahdelle riville; radionappi tasaa korkeutensa ylimmän rivin mukaan. | Natiivi-UI |
| 144 | Maiden liput animoidaan liikkumaan arvokkaasti kuin tuulessa (omistajan kysymys → toteutetaan: lippu verkkona vertex-aallolla RenderTextureen tai vastaava, hidas ja arvokas, ei lepatus). | Natiiviseppä (tekniikka) + Natiivi-UI (kartussi) |

## Build 16 — omistajan löydökset klo 23.0x (kohtaamiset)

| # | Löydös | Rooli |
|---|---|---|
| 145 | Aarrekohtaaminen aukesi natiivissa lehden kautta → pois. Webin sääntö: kun pelaaja ratkaisee tietovisan lehdestä tai karttanostosta, ruudulle syttyy vihreä piste, josta pääsee tapaamaan henkilön ja ratkaisemaan tehtävän. Omistaja: kynnys pudotetaan kahdesta YHTEEN oikeaan ratkaisuun (web ja natiivi). Kohtaamiset ovat vielä vaiheessa; omistaja palaa niihin. | Pelikoodari (sääntö web + natiivi) + Natiivi-UI (lehden avaus pois, vihreä piste) |

## Build 16 — omistajan löydös klo 23.2x (kaupungin pieni valikko)

| # | Löydös | Rooli |
|---|---|---|
| 146 | Kaupungin napautuksesta aukeava pieni valikko kehitetään: aukeaa VÄLITTÖMÄSTI (kuori heti, tiedot ja pieni kuva esiladattuina), sisältö tulee animoidusti esiin, kuva isompana. Fablen "postikortti"-ehdotus omistajalle: pergamenttikortti ohuella reunalla; herokuva kortin levyisenä (3:2) kellastuneella vinjetillä, paljastuu 180 ms vasemmalta; nimi + postileima (kierto −8° → 0, koko 1,2 → 1, 150 ms); rivit porrastetusti 40 ms välein (Nähtävyydet, Turistiopas, viiva, nostoluokat värillisin pistein, pisteet syttyvät yksi kerrallaan); kokonaisuus < 350 ms, ease-out, ei pomppua; ei (x):ää eikä koristeita; sulkeutuu napautuksesta karttaan 120 ms; iPadilla kaupungin vieressä, iPhonella alareunasta nouseva postikortti. MALLI v1 (Natiivi-UI, lokit/natiivi-ui-146-malli/) → omistaja 23.5x: EI — peittää liikaa ja on raskas, liikaa tyhjää tilaa, leima turha. MALLI v2 tilattu: kapea kortti kaupungin vieressä (iPhone ~60 % leveydestä, iPad ~300 pt), ei leimaa, nimi kuvan päällä, rivit tiiviisti, < 250 ms, korkeus ≤ 45 % ruudusta. MALLI v2 (iPhone 241×310 pt, iPad 300×349 pt) → omistaja 00.4x: "kortti aika hyvä" → TOTEUTETAAN build 17:ään, muutokset pelistä. | Natiivi-UI (Pelikoodari: esilataus välittömään avaukseen) |

## Build 16 — omistajan löydökset klo 23.3x (Ihmisen matka II, nostokuvat)

| # | Löydös | Rooli |
|---|---|---|
| 147 | Ihmisen matka II: CC-nappi siirretään ☰-valikkoon kytkimeksi nimellä "Tekstitys". | Natiivi-UI |
| 148 | II: Jatka/Tauko-nappi → play/pause-symboli togglena; sen molemmin puolin "kelaa alkuun" (aloittaa tarinan alusta) ja "kelaa loppuun" (siirtyy tutkimaan karttaa itse) -symbolit. | Natiivi-UI (Linssiseppä: esityksen ohjaus) |
| 149 | Karttanostojen kuvat eivät lataudu aina → syy (verkko, välimuisti, uusinta) ja korjaus; savukevartija "nostokuva näkyy". | Pelikoodari |
| 150 | Nostokuva suurenee napautuksesta koko sivun kokoiseksi (yhdessä 130–132:n kanssa). | Natiivi-UI |
| 151 | II: luenta-animaation kameraliikkeet ovat liian äkkinäisiä, kun kartta väistää tulevaa kuvaa → pehmeämmin (KAMERA-AJOT: ease in/out, yhtenäinen käyrä). | Linssiseppä (Natiiviseppä: Linssisiirto) |
| 152 | II:n alku: kun ruudulla on vain musta ja ensimmäinen lause, tähdet ja maapallo feidautuvat rauhassa mustasta esiin, ja samalla maapallo zoomautuu jo lähemmäs pelaajaa. | Linssiseppä (Natiiviseppä) |

## Build 17 -savukierros (Laitetestaaja 26.9. klo 04.0x, raportti a147973d8) — sisäiset löydökset

| # | Löydös | Rooli |
|---|---|---|
| S1 | Lepopiirto ei toteudu build 17:ssä: levossa piirretty 150/150, tila "Lepo (ui)" (build 16: 2–3/151). Jokin UI-elementti pitää isDirtyn päällä (epäily: II:n Tekstitys-kytkimen tai soittimen animaatio, postikortti). Ei estänyt vientiä (kehys on nyt 13 ms). | Natiivi-UI (Natiiviseppä) |
| S2 | 143: "Bosnia ja Hertsegovina" rivittyy 3 riville (odotus 2). | Natiivi-UI |

## Build 18 -savukierros (Laitetestaaja 26.9. klo 04.5x, raportti 6e344dd41) — sisäiset löydökset

| # | Löydös | Rooli |
|---|---|---|
| S1 | KORJATTU build 18:ssa: lepopiirto toteutuu (Paikallaan ~40 s levon jälkeen, 2–3/150). Syy oli nostomerkkien hehkusyke, jonka kehyksen hinta -erä oli palauttanut jatkuvaksi; SykeJaatyy = true. | — |
| S2 | KORJATTU build 18:ssa (143b): pitkä maannimi kahdelle riville, pienennys 22 %. | — |
| S3 | Laajennettu nostokortti jää auki linssin avauksen yli; sulkeutuu vain ulkopuolelle napautuksella → linssin avaus sulkee kortin (ja postikortin) automaattisesti. | Natiivi-UI (build 19) |
| S4 | 144 lipun aaltoilua ei voi todentaa pysäytyskuvista (levossa suora ✓) — todennus videosta Natiivi-UI:n k144-lippu.mp4:stä (Fable hyväksyi 04.2x). | — |

## Build 19 -savukierros (Laitetestaaja 26.9. klo 08.3x, raportti b117edc23) — sisäiset löydökset

| # | Löydös | Rooli |
|---|---|---|
| S3 | KORJATTU build 19:ssä: linssin avaus sulkee laajennetun nostokortin. | — |
| S5 | KORJATTU build 19:ssä: 1.0.18:n taustapäivityksen siivous poisti ladatun paketin samalla käynnistyksellä → laite jäi vanhaan sisältöön. 1.0.19: 1. käynnistys lataa uusimman, 2. käyttää sitä. | — |
| S6 | Kylmän käynnistyksen aloitusverho simulaattorissa 5,4–6,1 s (raja 5,3 s) → laitemittaus. | Natiiviseppä (Pelikoodari) |
| S7 | Elävän kartan kohta 3: maakunnan herääminen käynnistyy (loki), mutta pysyvä väri ei näy — MaaKartan pysyvä täyttö on oletuksena pois. | Natiiviseppä (Linssiseppä) |
| S8 | Lepopiirto ei laske verkottomassa testitilassa (ui offline -rivi pitää kerroksen likaisena); vain testitila. | Natiivi-UI |
| S9 | Salaisuuskortille ei ole testilaukaisijaa (Athos 1/1 → Athos-jättiläinen). | Natiiviseppä + Laitetestaaja |

## Build 19 (1.0.19) — omistajan löydökset 26.9. klo 08.4x (kallistettu näkymä, Kreikka; kuva kaappaukset/omistaja-20260926/loydos153-155-kreikka-horisontti.png)

| # | Löydös | Rooli |
|---|---|---|
| 153 | Nostot (merkit ja nimiöt) saisivat häipyä näkyvistä horisontin kanssa — nyt kaukaiset nostot piirtyvät täydellä voimalla horisontin yläpuolelle (Thessaloniki, Filippoi, Pelion). Etäisyyshäivytys kameran etäisyyden/horisontin mukaan, kuten pohja häipyy. | Natiiviseppä (Pelikoodari: nostokerroksen häivytysraja) |
| 154 | Horisontti (taivas) hieman sinisemmäksi — nyt pergamentin kermaa. Kuvapari 2–3 sävyllä (utuinen vaaleansininen → pergamentti alhaalla), omistaja valitsee. | Natiiviseppä |
| 155 | Nostoissa ei näy vielä symboleita (löydös 125 jatkuu): useimmat nostot ovat pelkkiä ympyröitä (Thessaloniki, Epidauros, Monemvasia, Korintin kanava), vain osa saa symbolin (Delfoi kaari, Náfplio salama, tassu). Vertaa webiin: mikä nostotyyppi/luokka jää ympyräksi ja miksi (data vai piirto). | Pelikoodari (data: mitkä tyypit) + Natiiviseppä (piirto) |

## Build 19 (1.0.19) — omistajan löydökset 26.9. klo 09.3x (maakunnat)

| # | Löydös | Rooli |
|---|---|---|
| 156 | Maakuntien selain saisi toimia samalla tavalla vetämällä kuin nostojen selain (sama ele ja tuntuma). | Natiivi-UI |
| 157 | Valitussa maakunnassa ei näytetä vahvennettuja rajoja, vaan maakunnan väri vahvistuu kartalla. | Natiiviseppä (MaaKartta) + Natiivi-UI (valinnan ohjaus) |
| 158 | Kuvat kaikkiin maakuntanostoihin ja pikkukuviin (115:n pikkukuvadata) — nyt osa ilman kuvaa. | Sisältökirjuri (kuvat PD/CC Commonsista) + Siirtoseppä (pikkukuvadata pakettiin) + Natiivi-UI (näyttö) |
| 159 | Vektorireitit (1873-reitit, kuljettu reitti) häipyvät horisontin lähellä enemmän — sama etäisyyshäivytys kuin 153:ssa nostoille. | Natiiviseppä (Linssiseppä kynäviiva) |
| 160 | Kolmiulotteiset symbolinostot: tason 1 nostoille (esim. Delfoi, Akropolis) 3D-mallit kartalle, kun mallit on tehty tai tilattu (PD/CC tai omat); niille sama horisonttihäivytys kuin muille kohteille. Ensin suunnitelma: mitkä nostot, mallien lähde/tekotapa, koko ja hinta kehykselle. | Natiiviseppä (suunnitelma) + Fable (tilaus omistajalle) |
| 161 | Kolmiulotteinen, liioitellun iso lipputanko kohdemaan pääkaupungissa/keskipisteessä, kohdemaan 1873-lippu liehuu oikeissa väreissään (kartan ainoa täysvärinen kohde); vain yksi maa kerrallaan. Liehuu saapumisen ajan ja kosketuksen jälkeen muutaman sekunnin, jähmettyy levossa (lepopiirto 0). Häipyy horisontin mukana kuten 153. Koe build 21. | Natiiviseppä (Linssiseppä liehunta 144:n pohjalta) |

## Build 20 (1.0.20) — omistajan löydökset 26.9. klo 11.5x

| # | Löydös | Rooli |
|---|---|---|
| 162 | Kartan saapumisanimaatio (elävä kartta kohta 1) käynnistyy vasta pulun luennan jälkeen — nyt se pyörii luennan ja kortin aikana eikä näy pelaajalle. Sama elävien hetkien tapahtumille. | Linssiseppä (ajoitus) + Pelikoodari (tapahtuma luenta päättyi) |

## Build 21 (1.0.21) — omistajan löydökset 26.9. klo 15.3x (Alankomaat; kuva kaappaukset/omistaja-20260926/loydos163-pallo-ei-piirry-alankomaat.png)

| # | Löydös | Rooli |
|---|---|---|
| 163 | Pallo jää vieläkin helposti piirtymättä: maakuntanäkymässä pohjan laatat puuttuvat (tasainen pergamentti), vain vektorit (maakuntarajat, nostot, reitti) piirtyvät. Toistuva vika — juurisyy (laatat eivät saavu / piirto ei herää laattojen saapuessa lepopiirrossa / esilataus) ja korjaus build 22:een. | Natiiviseppä (Cesium/laatat, lepopiirron herätys) + Pelikoodari (Esilataaja, mittari) |
| 164 | "Brysseli"-nimiö limittyy maan otsikkorivin ("Nederland · kuningaskunta v. 1873") päälle ruudun alareunassa. | Natiivi-UI (nimiöiden väistö otsikkoalueelta) |
| 163b | Tarkennus (omistaja: MAAILMA-tila oli päällä): kohdemaan (Alankomaat) oma kartta puuttuu kokonaan — maan sisällä tasainen pergamentti, mutta ympäröivät maat (Westfalen, Rheinland, Belgia) piirtyvät reliefeineen. Vika on siis kohdemaan omassa laattakerroksessa (offline-sarja 26 / kermahuntu / kohdemaan korostus), ei koko pallossa. Kuva loydos163b-kohdemaan-kartta-puuttuu.png. | Natiiviseppä + Siirtoseppä (offline-sarja 26 NLD) |
| 165 | Maakuntavalitsin toimii oudosti: valinta ei vastaa odotettua (kuvassa Gelderland korostettu vihreänä, vaikka pelaaja on Amsterdamissa; valinta/veto epäselvä). Natiivi-UI tutkii valitsimen ja kartan korostuksen yhteyden laitteella ja kysyy omistajalta tarkennusta vain jos ei toistu. | Natiivi-UI |
| 166 | Pelaajan nappula nousee kuin ilmaan, kun kameraa kallistaa: kallistetussa näkymässä nappulan jalka irtoaa kaupungin pisteestä (Pariisi: piste ja nimiö jäävät nappulan alle, väliin rako). Ylhäältä katsottuna nappula on oikein pisteen päällä. Nappulan ankkuri pitää olla maaston pinnassa (jalka pisteessä, kolmiulotteinen sijoitus kuten 3D-nostoilla), ei ruutukoordinaatin siirto. Kuvat loydos166-nappula-ilmassa-kallistus.png ja loydos166-nappula-ylhaalta.png. | Natiiviseppä |
| 167 | Nostomerkki piirtyy pulun päälle (Laitetestaajan b23-raportti 6b6eec040) — 164:n kalusteväistö laajennetaan nostomerkkeihin (pulu, kartussi, Liiku, yläpalkki). Natiivin parannus, web ei tee. | Natiivi-UI (1.0.24) |

## Build 24/25 (1.0.24–1.0.25) — omistajan löydökset 26.9. klo 19.3x (tekstinä, ei kuvaa)

| # | Löydös | Rooli |
|---|---|---|
| 168 | Kun kartalta avaa noston, sen maakunta värjäytyy jälkeenpäin. Logiikka: elävän kartan kohta 3 "maakunta herää ensimmäisestä löydöstä" (väri + S7:n pysyvä täyttö). OMISTAJA: OTA VÄRJÄYTYMINEN POIS — noston avaus ei saa värjätä maakuntaa; heräämisen muut osat (käsialanimi, pikkukuva kartussiin, löydösmerkit) jäävät. Raamatun kohta 3 päivitetään. | Natiiviseppä (MaaKartan täyttö pois) + Linssiseppä (kohdan 3 käsikirjoitus) |
| 169 | Maakuntavalitsimeen (165) pitää lisätä "Kaikki"-nappi (koko maa / ei rajausta). | Natiivi-UI |
| 170 | Maakuntanostojen kuvat puuttuvat laitteella (158 merkitty valmiiksi v2274 — tarkista, onko natiivin paketti päivittynyt ja kattaako 158 kaikki maakuntanostot). OMISTAJA: tee KAIKKI puuttuvat kuvat — oikeita (PD/CC Commons) tai havainnekuvia. Lisäksi pieni kuva minitekstin kyljessä (nostolistan rivi/minikortti). | Sisältökirjuri (kuvat) + Siirtoseppä (paketti natiiviin, kattavuusvartija) + Natiivi-UI (pikkukuva minitekstin viereen) |
| 171 | Aloituslennossa (saapuminen käynnistyksessä) kohdemaa näkyi pelkkänä vaaleana laattana — 163:n toistuma saapumislennon aikana: laatat eivät ehdi tai kiirejono/vartija ei kata lentoa. P1. | Natiiviseppä (kiirejono + vartija saapumislennon ajaksi, laitemittaus kylmänä) |
| 172 | Lentokone (saapumislento) saisi lentää matalammalla, ja lähikuvassa sen pitää olla vaakasuorassa (ei nokka alas/ylös). | Linssiseppä (saapumisen käsikirjoitus, korkeus + asento) + Natiiviseppä (toteutus) |
| 173 | Maakuntavalikko (NOSTOT/MAAKUNNAT-paneeli, kuva kaappaukset/omistaja-20260926/loydos173-maakuntavalikko-ranska.png, Ranska, iPhone): OMISTAJA: tee valikosta KAPEAMPI ja KORKEAMPI — nyt paneeli peittää lähes koko leveyden ja loppuu puolivälissä; lista jatkuu piilossa. Kuvassa ylin rivi "Pois" (rajaus pois) — 169:n "Kaikki"-nappi yhdistetään tähän samaan. | Natiivi-UI (paneelin mitat: leveys ≈ 60–65 % ruudusta, korkeus lähes alareunaan asti, ei peittoa yli 45 % pinta-alasta) |
| 174 | Ruskeat pisteet (musteläikät) yhä valtaosassa nostoja maatason näkymässä (Ranska, kuva kaappaukset/omistaja-20260926/loydos174-ruskeat-pisteet-ranska.png): vain osa nostoista on 3D-mallina (majakka, tornit, Pont du Gard, mylly). OMISTAJA KYSYY: milloin kaikki korvataan oikeilla? Selvitettävä: onko kuva 1.0.24 vai 1.0.25, ja näkyvätkö tasojen 2–3 pienet mallit maatason zoomissa lainkaan (siluettiraja 18 pt → läikkä). Linjaus: läikkää ei näytetä missään zoomissa — kaukaa nosto näkyy lajin symbolina (webin kaava, 155), lähellä 3D-mallina. | Natiiviseppä (vastaus + kaukosymbolit) + Pelikoodari (lajisymbolit datassa) |
| 174c | Omistaja (kuva kaappaukset/omistaja-20260926/loydos174-mopntit-lahikuva-ranska.png, Massif Central lähikuva, 1.0.24): läikät ovat "mönttejä" myös läheltä — isoja tummia epämuotoisia täpliä ilman symbolia. Vahvistaa 174:n: läikkää ei missään zoomissa; lähellä 3D-arkkityyppi (1.0.25 tasot 2–3) tai lajin symboli, kaukaa symboli. Omistajan pitää päivittää 1.0.25 nähdäkseen lähikuvan mallit. | Natiivi-UI (174) |

## Build 25 (1.0.25) — omistajan löydökset 26.9. klo 20.1x (Ranska; kuva kaappaukset/omistaja-20260926/loydos175-arkkityypit-ranska-125.png)

| # | Löydös | Rooli |
|---|---|---|
| 175 | P0: tason 1 3D-arkkityypit näyttävät maatason zoomissa "todella kummallisilta" — valtavia tasaisen harmaita muotoja (Normandian kupoli, kaksi linnakehikkoa neljällä pyöreällä tornilla Pariisin ja Loiren päällä, iso harmaa laatikko Akvitaniassa, palkki Provencessa, punainen stadion Bretagnessa). Mittakaava monin­kertainen maakuntiin nähden, ei yksityiskohtia, ei paletin sävyä; peittävät nimistön ja nostomerkit. Omistaja: "Onko tuo valmis?" — EI OLE. Korjaus ennen seuraavaa TF:ää: (a) koko maatasolla murto-osaan (siluetti enintään ~2–3 % ruudun leveydestä, ei koskaan yli kaupunkinimiön), (b) mallit vasta 155:n kynnyksellä (kerroin ≥ 2,5) kuten tasot 2–3, sen alla lajin symboli, (c) sävy kartan paletista (muste/seepia, kaiverrusreunat), ei tasaista harmaata, (d) kuvapari samasta Ranskan näkymästä Fablelle → OMISTAJAN KORTTI ennen TF 1.0.26. Laitetestaajan kierros ei ottanut kantaa ulkonäköön → kierrokseen ulkonäkötarkistus maatasolla. | Natiiviseppä (koko, kynnys, sävy) + Linssiseppä (tyyli) + Laitetestaaja (ulkonäkökohta kierrokseen) |
| 175b | Lähikuva (Massif Central, 1.0.25, kuva kaappaukset/omistaja-20260926/loydos175b-arkkityypit-lahikuva-125.png): tasojen 2–3 pienet mallit ovat haaleita, sumeita harmaita möykkyjä ilman luettavaa siluettia (kupoli, laatikko, "työkalut"). Omistaja: "Ei saa mitään selvää." Löytämättömän himmennys + tasainen harmaa + LOD1 = ei tunnistettavaa. Korjaus samaan erään kuin 175: luettava siluetti (tumma musteääriviiva, kaiverrusreuna), himmennys vain sävyyn ei kontrastiin, LOD0 lähikuvassa, ja jos malli ei ole luettava → lajin symboli. Kuvapari lähikuvasta ennen TF:ää. | Natiiviseppä + Linssiseppä |
