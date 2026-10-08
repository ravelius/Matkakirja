# Kuumailmapallo: kohteiden parannus ja elävä kaupunki (suunnitelma 8.10.2026, Linssiseppä + Karttaseppä)

Omistaja 8.10. klo 20.4x: "Pystytäänkö kuumailmapallossa esiteltäviä kohteita vielä parantamaan jotenkin itse? Ja saadaanko
kaupunkeihin jotain eläviä elementtejä? Ja mitä ne voisivat olla? Ja miten ne kannattaisi toteuttaa?"

Linjaus 19.5x: kaikki grafiikan parannukset käyttöön ja muistia saa käyttää. Työnjako: Linssiseppä tekee pallonäkymän ja toteutuksen,
Karttaseppä hoitaa reitit avoimesta kartasta (OSM) ja Googlen ehtojen tulkinnan (osio C). Merkintä (EPÄVARMA) tarkoittaa, ettei
asiaa ole todennettu ensisijaisesta lähteestä.

## Yhteenveto

- **Kohteet paranevat ilman Googlen aineiston muokkausta.** Hento korostus, yövalaistukset ja tarkemmat laatat lähellä ovat
  meidän omaa piirtoamme Googlen laattojen päällä tai laattojen tarkkuusasetus. Googlen mallin piilotus ja korvaus omalla
  mallilla (Eiffel-ristikko) on todennäköisesti ehtojen vastainen; Karttaseppä tarkistaa (osio C).
- **Eläviä elementtejä voi lisätä,** kun ne ovat liikkuvia kohteita eivätkä karttaa: veneet ja lautat, linnut, autot ja
  raitiovaunut, muut pallot, savu, suihkulähteet. Reitit tulevat OSM:stä kaupungeittain esikäsiteltyinä (ODbL-maininta Lähteisiin).
- **Toteutus kevyesti:** Ydin-simulaatio (reitit, parvet) ja GPU-instansoidut pienet mallit, yksi piirtokutsu lajia kohden,
  määrät laatutason mukaan. Mallit CC0-paketeista (Kenney), ei ostoja.
- **Järjestys:** kupu (Linnanrakentajan malli tänään) → Tukholman vesiliikenne ja lokit → muut pallot → Tukholman katuliikenne
  → kaikki 37 kaupunkia datavetoisesti. Ensimmäinen kuvapari, kun Tukholman vesiliikenne ja lokit ovat valmiit.

## A. Esiteltävien kohteiden parannus (Linssiseppä)

| # | Parannus | Nykytila | Toteutus | Ehdot | Arvio |
|---|---|---|---|---|---|
| A1 | Hento korostus esittelyn aikana | Rengas tai alue (OpasKorostus), sammuu ennen lähtöä | Pehmeämpi reunavalo kohteen ympärille (hehku 2–3 s, sitten heikko), kohteen siluetin "kultareuna" maanpinnan näytteestä ilman Googlen geometrian muokkausta | Oma piirto laattojen päällä; ei peitä kohdetta (C1) | 1 pv |
| A2 | Yön omat valaistukset | KaupunkiYovalot (ikkunavalot, kohdevalo) | Kohdekohtaiset valaisutyypit datana: julkisivuvalo (ylös suunnattu lämmin), tornin huippuvalo, sillan valonauhat OSM-viivoista (bridge=yes), Eiffelin tasatuntivälke | Valo on värin lisäys laattojen päälle; Karttaseppä vahvistaa (C2) | 2–3 pv |
| A3 | Tarkemmat laatat lähellä | Googlen SSE 16 koko näkymälle, esikamera seuraavalle | Pysähdyksellä SSE 8–10 kohteen ympärillä (laatutason mukaan, Ultra 6), muistikatto Natiivisepän tasoissa; esikamera lataa jo saapumiskehyksen | Ei ehtokysymystä | 1 pv (+ iPad-mittaus) |
| A4 | Omat mallit huonosti kuvattuihin (Eiffel-ristikko, ohuet tornit) | Googlen fotogrammetria "sulaa" ohuissa rakenteissa | Vain jos Googlen mallin saa piilottaa kohdalta. Vaihtoehto ilman piilotusta: lähikuva kohteesta omana korttina (YksityiskohtaKortti) | Todennäköisesti kielletty (C3) | 3–5 pv / kohde, jos sallittu |

## B. Elävät elementit pallon korkeudelta (Linssiseppä)

Pallo on pysähdyksellä noin 100–350 m:n etäisyydellä ja lennoilla korkeammalla. Siltä korkeudelta erottuvat veneet, autot,
raitiovaunut ja lintuparvet; yksittäiset ihmiset ovat 1–3 pikseliä, joten ne tulevat vain liikkuvina pisteinä toreille.

| # | Elementti | Reittidata (Karttaseppä, osio C) | Toteutus | Määrä Mobile / PC / Ultra | Arvio |
|---|---|---|---|---|---|
| B1 | Vesiliikenne: lautat, jokiveneet, kanavaveneet, gondolit, purjeveneet | OSM route=ferry, waterway=river/canal-keskiviivat, satamat | Ydin ReittiLiike (polku, nopeus, väli, kääntöhitaus), vanavesi varjostimella; vesipinnan korkeus laattanäytteestä | 15 / 40 / 100 | 3 pv (ensin Tukholma) |
| B2 | Linnut: lokit vesillä, kyyhkyt toreilla, parvet lennossa | Vesialueet ja aukiot OSM:stä (place=square, highway=pedestrian) | Ydin Parvi (kevyt boids, kiertää pistettä), siipien lyönti verteksivarjostimessa, low-poly lintu instansoituna | 40 / 150 / 400 | 2 pv |
| B3 | Muut pallot | Ei reittiä: kaupungin yllä 300–800 m | Linnanrakentajan ilmapallo_lahi.glb (7,6 k kolmiota, LOD keski/kauko valmiina), hidas tuulen mukainen ajelehtiminen, poltin välillä | 2 / 4 / 6 | 0,5 pv |
| B4 | Katuliikenne: autot, bussit, raitiovaunut | highway=primary/secondary/tertiary, railway=tram, linja-autoreitit | ReittiLiike kaistoilla, valot yöllä (yövalojen jatko), raitiovaunut kiskoilla | 0 / 200 / 800 autoa, raitiovaunut kaikilla tasoilla | 3 pv |
| B5 | Junat | railway=rail (kaupunkiosuudet) | ReittiLiike, pitkät instanssiketjut | 1–3 junaa / kaupunki | 1 pv |
| B6 | Ihmiset toreilla | place=square, aukiot | Liikkuvat pisteet (instansoidut pienet kapselit), vain alle 200 m:n kehyksissä | 0 / 100 / 300 | 1 pv |
| B7 | Maailmanpyörät pyörimässä | attraction=big_wheel (Wien Riesenrad, Lontoon silmä …) | Vain jos oma pyörivä malli Googlen pyörän päällä on sallittu (C3); muuten ei | 0–1 / kaupunki | 1 pv, jos sallittu |
| B8 | Liput, savu, suihkulähteet | flagpole, man_made=chimney, amenity=fountain | Kevyet partikkelit / verteksivarjostin; savu laivoista ja piipuista tuulen suuntaan (sää LIVE) | 10 / 30 / 80 | 2 pv |

**Tekniikka.**
- Simulaatio Ydinissä (puhdas C#, testattava): reitin seuraaja polylinjalla, parvet. Yksi päivitys kehyksessä kaikille lajeille.
  Arvio alle 0,3 ms 1 000 kohteelle (mitataan).
- Piirto: `Graphics.RenderMeshInstanced` lajeittain (1 piirtokutsu / laji / LOD), yksinkertainen varjostin kaupungin valoon
  (sama KoriValaistus kuin korissa), ei varjoja. Kohteet sijoitetaan Googlen pinnan korkeudelle laattanäytteestä
  (SampleHeightMostDetailed), vesi tasaiselle korkeudelle.
- Näkyvyys: vain kameran lähialueella (säde laatutason mukaan), syntyvät ja katoavat kuvan ulkopuolella.
- Muisti: mallit noin 0,5–2 Mt lajia kohden, reittidata noin 50–300 kt kaupunkia kohden ämpärissä.
- Kehysaika: iPad-raja p95 18,3 ms (60 Hz). Mittaus vain omistajan luvalla (ABAB).

**Mallit (ei ostoja).**

| Paketti | Sisältö | Lisenssi | Hinta |
|---|---|---|---|
| Kenney Watercraft Kit | veneet, lautat, purjeveneet | CC0 | ilmainen |
| Kenney Car Kit | autot, bussit | CC0 | ilmainen |
| Kenney Train Kit | junat, raitiovaunut | CC0 | ilmainen |
| Linnut | oma low-poly (proseduraalinen) | oma | — |
| Muut pallot | Linnanrakentajan ilmapallo-v1 | oma | — |

Maksullisia vaihtoehtoja (Synty POLYGON City ja Boats, noin 50–100 $ (EPÄVARMA)) ei tarvita, koska CC0-mallit riittävät pallon
etäisyydeltä ja täyttävät mediasäännön (PD/CC).

## C. Reitit avoimesta kartasta ja Googlen ehdot (Karttaseppä)

*Karttaseppä täydentää: OSM-haut (Overpass, kaupunkikohtainen esikäsittely ämpäriin), ODbL-maininnan paikka, ja Googlen Map Tiles
-ehtojen tulkinta kohdille C1 (oma korostus ja valot laattojen päällä), C2 (yövalaistus värinä), C3 (Googlen mallin piilotus tai
korvaus omalla mallilla kohteen kohdalla, pyörivä maailmanpyörä) ja C4 (liikkuvat omat kohteet Googlen näkymässä: veneet, linnut,
autot).*

## D. Järjestys ja aikataulu

1. Kupu (Linnanrakentajan kupu_nakyma.glb tänään noin klo 23), oma commit junaan 170/171.
2. B1 + B2 Tukholmassa: lautat ja jokiveneet Strömmenillä ja Djurgårdenin reiteillä, lokit vesillä. Kuvapari. Juna 171.
3. B3 muut pallot (kaikki kaupungit, ei reittidataa).
4. A1 + A3: hento korostus ja tarkemmat laatat lähellä (A3 Natiivisepän laatutasoihin).
5. B4 + B5 Tukholma, sitten kaikki 37 kaupunkia datavetoisesti (PalloKaupungitTestit-tyyliin: jokaisessa kaupungissa reitit
   ladattavissa, ei törmäyksiä rakennuksiin, määrät tasojen mukaan).
6. A2 yövalaistukset, B6–B8 ja ehtojen salliessa A4 ja B7.
