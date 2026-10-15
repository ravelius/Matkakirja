# Petřín M01 — ensimmäinen mallikierros, odottaa PT:n palautetta

Tämä on todellinen muokattava 3D-malli ja ensimmäisen mallikierroksen välitoimitus. Malli ei vielä täytä siluettirajoja eikä ole lopullisesti hyväksytty. Lähteet #269–#270 sallivat yhden mallikierroksen ja velvoittavat pysähtymään sen jälkeen palautteeseen. Tässä ei ole M02-kierrosta.

## Toimituksen sisältö

- `petrin-M01.blend`: 33 tornin mesh-objektia, 29 824 verteksiä, 19 680 polygonia. Kahdeksan jalkaa/jalkakenkää, ristikkosauvat, kaksi geometrisesti mallinnettua porraslinjaa, halli aukkoineen, tasanteet, kaiteet, yläkoppi, katto ja masto.
- `renders/K1-model.png`–`K5-model.png`: viisi natiivia Blender-renderiä. Nämä eivät ole uutta AI-kuvagenerointia. Alkuperäisiä tavoitekuvia ei muutettu eikä käytetty mallin tekstuureina tai billboards-kuvina.
- `qa/K1-comparison.png`–`K5-comparison.png` ja `qa/petrin-M01-comparison-sheet.png`: tavoite | todellinen 3D-renderi | ääriviivat. Ääriviivoissa tavoite on syaani, malli punainen.
- `inputs/`: tarkat aiemmin toimitetut kamerat ja hyväksytyt nykyiset tavoitteet (K1 v3, K2–K5 v1). K5:n aktiivinen maski on nyt korjattu v2.
- `qa/metrics.json`, `saved-model-audit.json`, `round-log.json`, `qa/independent-review.json`: mittarit, tallennetun mallin tarkastus, kierrosloki ja tuore erillinen arvio.
- K5:n korjattu maski on lisäksi `posti/petrin-K5-maski-v2.png`, QA `posti/petrin-K5-maskikorjaus-20261015.json`. Vanha kuva ja maski säilyvät ennallaan.

## Mitattu tulos

| Näkymä | Natiivikoko | Siluetti-IoU | Raja | Läpäisy | Pikseli-ΔE76, keskiarvo* |
|---|---|---:|---:|---|---:|
| K1 | 1536 × 1024 | 69.41 % | 85 % | Ei | 24.80 |
| K2 | 1024 × 1536 | 88.01 % | 90 % | Ei | 27.43 |
| K3 | 1536 × 1024 | 86.87 % | 90 % | Ei | 24.93 |
| K4 | 1536 × 1024 | 87.44 % | 90 % | Ei | 27.01 |
| K5 | 1536 × 1024 | 71.57 % | 90 % | Ei | 24.59 |

Keski-IoU on 80.66 %. **Yksikään näkymä ei vielä läpäise omaa siluettirajaansa.** K1:n erillinen raja on 85 %, muiden 90 %.

Maskilaskenta käyttää renderin geometrian alfaa kynnyksellä 128 ja täyttää sen sisään jäävät suljetut reiät ulkopuolen taustahaulla. Se ei käytä konveksia verhoa, kuvan jäljentämistä, skaalausta tai tavoitteeseen sovitettua maskia. Vertailu tehdään samalla natiivipikseliverkolla ilman kuvien venytystä. Kamerat ovat jäädytetyt toimitetut lähtöestimaatit. Kameran pääpiste muunnettiin Blenderiin analyyttisesti; kuvasiluettiin perustuvaa kameraoptimointia ei tehty.

Sitovat fyysiset mitat pysyvät #253:n mukaisina: rungon/katon yläpinta 58,7 m, alatasanteen lattia 20 m ja ylätasanteen lattia 51 m. Tallennetun `.blend`-tiedoston uudelleenavaus vahvisti arvot liukulukutarkkuudella. Koko ei-masto-osan laatikkokorkeuden ero on 0,1364 %, koska jalustan alalista ulottuu 0,08 m maan nollatason alapuolelle. Tämä on geometrian tarkastus tilauksen mittoihin, ei riippumaton tosimaailman mittaus. Maston kanssa noin 71 m kokonaiskorkeus sekä hallin leveys, portaat ja muut yksityiskohdat ovat edelleen arvioita. Generoitujen tavoitteiden tasannevirheitä ei kopioitu mallin fyysisiin korkeuksiin.

*Pikseli-ΔE76 on vain diagnostinen sävyero D65/sRGB-avaruudessa renderin peittävän geometrian ja täytetyn tavoitemaskin yhteisalueella. Kohdistus, valaistus ja ristikon läpi näkyvä tausta vaikuttavat tulokseen. **Sitova materiaalivärin ΔE on `null`; värirajan läpäisyä ei ole varmennettu.** Riippumattomasti rekisteröityjä materiaalialueita ja samaa valaistusta ei ole käytettävissä.

## Erillisen arvioijan kolme suurinta näkyvää eroa

1. Alajalkojen ja jalustan projektio leviää tavoitteen ulkopuolelle, etenkin K1- ja K5-ilmakuvissa. K5:n maapiste on peittyvä arvio; havainto ei yksin osoita fyysisen korkeuden virhettä eikä valtuuta kameran muuttamista.
2. Tasanteiden kaiteet, alapinnat ja yläkopin rakenne ovat vielä tavoitetta pelkistetymmät. Lattiakorkeudet 20/51 m säilyvät, vaikka tavoitekuvassa tasanne olisi eri korkeudella.
3. Hallin julkisivun ja jalkojen koristeelliset kaaret jäävät yleismuodoiksi, selvimmin K2-lähinäkymässä.

Arvioija ei osallistunut tuotantoon ja katsoi kaikki viisi vertailua. Arvio on silmämääräinen eikä itsenäinen pikselilaskennan tai tosimaailman geometria-auditin todistus. K4:n pohjoisdetaljit ovat varmentamaton rekonstruktio. Puiston sijasta mallissa on neutraali maatason ja soran esikatseluympäristö; ympäristö ja lähidetaljit ovat luonnosvaiheessa.

## K5-maskikorjaus

#270 korjasi #269:n virheelliset koordinaatit. Näkyvän oikean ulkojalan rajaan lisättiin 1 544 valkoista pikseliä, poistettiin 0. Lisäysalueen rajat ovat x=823–908, y=570–816. Koko on 1536 × 1024, arvot 0/255, pehmennettyjä reunapikseleitä 0. Tuottaja ja erillinen arvioija katsoivat korjausoverlayn. Tämä ei ole pikselintarkkuuden riippumaton sertifiointi eikä korjatun maskin PT-hyväksyntä.

Kaikki viisi tavoitekuvaa ovat PT:n hyväksymiä kuvina. K1–K4-maskit on kelpuutettu; K5-v2-maskin vahvistus odottaa PT:tä. K5:n jäädytetty kamera-JSON sisältää historiallisena metadatana vanhan maskin SHA:n. Kameran numeroita ja aiemmin toimitettuja tavuja ei muutettu. **Aktiivinen K5-maskiversio sidotaan `authorization.json`- ja `qa/metrics.json`-tiedostojen SHA:lla sekä `inputs/targets/K5-mask.png`-tiedostolla.**

## Tekninen toistettavuus ja historia

Käytössä oli Blender 5.2.1 LTS / Cycles / Metal, Apple M4 Max 40 GPU-ydintä. Ensimmäinen käynnistys pysähtyi ennen mallin tallennusta ja rendereitä taivassolmun vanhaan enum-nimeen; nykyisen runtime-API:n `MULTIPLE_SCATTERING` korjasi yhteensopivuuden. Geometriaa ei tässä muutettu.

Ensimmäisten beauty-renderien valotus oli liian vaalea. Saman M01:n beauty-renderit tuotettiin uudelleen yhtenäisellä −2,5 EV näyttövalotuksella. `exposure-normalization.json` vahvistaa, että geometria, kamerat, materiaalit ja raaka geometria-alfa säilyivät. Tämä on tekninen renderikorjaus yhden geometriakierroksen sisällä. Vanhat kuvat, lokit ja ennen valotuskorjausta tallennettu malli ovat säilyneet tuotantoarkistossa.

Tallennettu malli on jo korjatulla valotuksella. Täysi lähdekoodista uusinta tapahtuu erillisessä työkopiossa tässä järjestyksessä: `build_and_render.py` Blenderissä → `analyse_round.py` Pythonilla (NumPy/Pillow) → `normalize_render_exposure.py` Blenderissä → `analyse_round.py` uudelleen → `audit_saved_model.py` Blenderissä. Luo ensin `renders/` ja `qa/`. Skriptit käyttävät oman hakemistonsa suhteellisia polkuja. Uusinta ei kuulu tähän palautetaukoon eikä sitä käynnistetä automaattisesti.

Lähdevalokuvien tekijät ja lisenssit on säilytetty `source-licenses.json`-tiedostossa ja alkuperäiset ohjeet `sources/`-hakemistossa. M01 on tuotettu geometriasta, tavoitekuvia ei mapattu materiaaliksi. Lähdekuvien tekijätietoja ei korvata AI-tavoitteiden tiedoilla.

## Todellinen toimitus- ja hyväksyntätila

Tämä paketti on ensimmäisen mallikierroksen arviointia varten postilaatikkoon. Lopullinen mallihyväksyntä, korjatun K5-maskin hyväksyntä ja mahdollinen seuraava mallikierros odottavat PT:n palautetta. Ei R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua. Pekingin ja Pulun töihin ei koskettu. Tämän toimituksen jälkeen tuotanto pysähtyy palautteeseen.
