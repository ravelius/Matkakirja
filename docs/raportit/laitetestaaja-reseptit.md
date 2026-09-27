# Laitetestaajan komentoreseptit (kartan/pallon debug-konsolit)

Kolme erillistä komentotiedostoa Documents-kansiossa, sama peli lukee kaikkia sekunnin välein:
`peli-komento.txt` (pelitila, PeliKomennot.cs), `ui-komento.txt` (UiNakymat.cs), `linssi-komento.txt`
(LinssiOhjain.cs) — nämä kolme tunnettiin jo. Neljäs, **`komento.txt`** (paljas nimi, Kartta/Komennot.cs),
löytyi 26.9.2026 build 20:n testauksessa: kamera-, usva- ja maakuntakomennot ovat siinä, ja se toimii
samassa Kartta-skenessä kuin peli-komento.txt (Natiiviseppä vahvisti: sama konsoli kaikissa käännöksissä).

## 1.0.29-kierroksen valmisteltu resepti (Laitetestaaja 27.9.2026 klo 12.0x, ennen buildia)

Tutkittu Explore-agentilla proto-3d/Matkakirja-proto:sta (HEAD master 7788b629 = BUILD 28).
**PÄIVITYS (Fable 27.9. klo 12.1x): juna/b13 kärki nyt 918a18f2** — puhevirta (b6fc76d7)
ON MUKANA (vahvistettu `git merge-base --is-ancestor b6fc76d7 918a18f2`, Puhe.cs-ristiriita
luennan säätimien kanssa ratkaistu). **Avauskortti (11a3c43a) EI KUULU 1.0.29:ään** (odottaa
omistajan kuvaparia) — PUDOTETTU reseptistä, ei "ui kaupunki" -rikkovaa muutosta tähän
kierrokseen. **6/6 jäljellä olevaa aihetta on siis junassa**: meri, lähitaso, nostot heti,
maakuntatäyttö, pulu, puhevirta. Mahdollinen lisäaihe: lipun suunnan korjaus (lippu ei saa
kääntyä kun kamera kulkee yli) — jos Natiiviseppä ehtii sen junaan, SHA-viesti kertoo.
Tarkista silti aina `git merge-base --is-ancestor` juuri saatua SHA:ta vasten ennen kierrosta.

**Meri, 10 lajia (elävät meri-eläimet):**
```
echo "elava elementit meri 1" > komento.txt
echo "elava elementit" > komento.txt
```
Onnistuminen: `elava elementit`-tuloste listaa "meri <maa> (<n> kohtaa): ..." kaikki 10 lajia
mukana (höyrylaiva, valas, purjelaiva, kalastusvene, lautta, majakkalaiva, merihirviö,
delfiinit, lokit, jäävuori). Vertaile `meri 0` (pois) samasta paikasta.

**Lähitaso LOD0 (kolmas tarkkuustaso arkkityypeille/erikoismalleille):**
```
echo "symbolit lahi 1" > komento.txt
echo "aja <kohteen lat> <kohteen lon> 0.05 2" > komento.txt   # zoomaa hyvin lähelle (kerroin >=4)
echo "symbolit tila" > komento.txt
```
Onnistuminen: `symbolit tila` näyttää lähimallin kytkeytyneen kertoimesta ~4 ylöspäin (max 3
lähintä oletuksena). Vertaile `symbolit lahi 0` (pois, vanha käytös).

**Nostot heti (löydöt näkyviin ilman viivettä/porttia):**
```
echo "nostot heti 1" > komento.txt
echo "nostot tila <ISO3>" > komento.txt
```
Onnistuminen: nostot täynnä heti saapumisen jälkeen, ei vähimmäisosuutta eikä porttia eikä
saapumispiiloa. Vertaile `nostot heti 0` (vanha käytös, asteittainen täyttö).

**Maakuntatäyttö (maakunnat heränneinä heti, vanha herätyskomento poistettu):**
```
echo "maakunta herays pois" > komento.txt   # oletus, uusi käytös: ei erillistä herätysväriä
echo "maakunta tila" > komento.txt
```
HUOM: vanha `elava herata`-komento on POISTETTU koodista (Herays.cs poistettu kokonaan) —
jos se palauttaa tuntematon-virheen, se vahvistaa haaran olevan buildissa. A/B-vertailuun
vanhaan käytökseen: `echo "maakunta herays ab" > komento.txt`.

**Pulu ilman äänikytkimiä (persoona "pollo" ohittaa Kertoja/Äänimaisema-kytkimet):**
```
echo "puhe pois" > peli-komento.txt
echo "ui pulu sano <teksti>" > ui-komento.txt
```
Onnistuminen: Pulun puhe kuuluu VAIKKA `puhe pois` on asetettu (vain kaiutinvipu ohjaa sitä) —
tavallisen kertojan puhe pysyy hiljaisena samalla asetuksella. Ei erillistä uutta debug-komentoa,
testataan yhdistelemällä olemassa olevia.

**Puhevirta (progressiivinen TTS-striimaus, VAHVISTETTU JUNASSA 918a18f2):**
```
echo "puhe virta paalle" > peli-komento.txt   # oletus jo päällä
echo "puhe virta pois" > peli-komento.txt     # A/B-vertailu
```
Onnistuminen: lyhyempi "1. ääni" (ViimeEkaAaniMs) striimatussa versiossa verrattuna
ei-striimattuun. Testaa myös yhdessä pulu/luennan säätimien kanssa (sama Puhe.cs) —
tarkista ettei kaiutinvipu/lukijan tauko -löydöksiin (1.0.28) tullut regressiota.

**Avauskortti — POISTETTU 1.0.29-reseptistä (Fable 27.9. klo 12.1x):** haara
natiivi-ui/avauskortti (11a3c43a) ei kuulu tähän käännökseen, odottaa omistajan kuvaparia.
Älä testaa `ui avauskortti`/`ui kutsu` -komentoja tällä kierroksella; `ui kaupunki` toimii
ennallaan (ei rikkovaa muutosta tässä buildissa).

## 1.0.28-kierroksen valmisteltu resepti (Fable 27.9.2026 klo 07.2x, ennen buildia)

Kaikki 7/8 kohteesta ovat jo mergattu juna/b13:een (tip 180e22dc, 27.9. 07:17) — tarkista
`git log master..juna/b13` ennen kierrosta jos lisää on tullut. **HUOM Kinderdijk (kohta 7):**
varsinainen mylly-3D-malli on VAIN mergaamattomalla haaralla `mallinseppa/erikoismallit2`
(01810d0c) — ellei sitä mergata ennen 1.0.28:n käännöstä, testaa vain kynnysarvo-korjaus (yleinen
mylly-arkkityyppi), ei bespoke-mallia.

**P1 (sisältö vaihtuu ilman kaatumista, NostoSisalto-korjaus fa30e4a3):**
Ei komentoa — sama tausta-automatiikka kuin 170:ssä, mutta nyt race-condition korjattu. Käynnistä
haku ennen sisällön vaihtoa herättääksesi saman koodipolun:
```
echo "ui nosto skandaali:shakkiturkkilainen" > ui-komento.txt
```
Vie sovellus taustalle/takaisin ~1 s sisällä (uudempi paketti saatavilla). Onnistuminen: EI
NullReferenceException/KeyNotFoundException NostoSisalto-alueella, normaali "sisältö vaihtui
vX→vY kesken istunnon" -rivi.

**Pulun kaiutinvipu (natiivi, ON=kulta+aallot / OFF=haalea+yliviivaus):**
```
echo "chat" > ui-komento.txt
```
Napauta kaiutinkuvaketta kahdesti (molemmat tilat). Ei lokiriviä — puhtaasti visuaalinen.

**Striimiääni-valitsin ei tyhjä (iPhone):** Avaa `ui valikko` → ☰ Muut → Kehittäjä (rataskuvake) →
tarkista "Striimiääni"-rivin valitsin näyttää tekstin koko rivin levyisenä, ei puristunut tyhjäksi.
Ei konsolikomentoa suoraan tähän näkymään.

**Lukijan tauko (mittaa ms, KortinLukija-putki):**
```
echo "wiki" > ui-komento.txt
```
Napauta "Kuuntele artikkeli". Onnistuminen lokista: ensimmäinen segmentti "(verkko)" ~1-5s ok,
TOINEN+ segmentti pitää lukea "(välimuisti)" pienellä ms-arvolla (ei enää "(verkko)" ~5000ms).
FAIL jos 2.+ segmentti yhä "(verkko)"-tilassa.

**Erikoismallit MSM/Stonehenge/Colosseum (linssi-komento.txt):**
```
echo "aja 48.6361 -1.5115 0.15 2" > komento.txt
echo "erikois tapahtuma mont-saint-michel" > linssi-komento.txt
echo "aja 51.1789 -1.8262 0.15 2" > komento.txt
echo "erikois tapahtuma stonehenge" > linssi-komento.txt
echo "aja 41.8902 12.4922 0.15 2" > komento.txt
echo "erikois tapahtuma colosseum" > linssi-komento.txt
echo "erikois tila" > linssi-komento.txt
```
Onnistuminen: kaikki kolme "liikkuu" (ei "odottaa"/"ei näkyvissä"). Tarkista myös ettei mikään
leikkaudu liioitellun maaston läpi lähikuvassa.

**Kategoriasymbolit 3D + seepiaramppi, vuori Olympoksella (maastokorkeus):**
```
echo "symbolit tila" > komento.txt
echo "aja 40.086 22.358 0.15 2" > komento.txt
echo "kallista 45" > komento.txt
echo "symbolit tila" > komento.txt
```
Onnistuminen: `symbolit tila` listaa vuori-instanssin taso 1:ssä, malli istuu maaston pinnalla
(ei kellu/uppoa) kaikissa kallistus/zoomikulmissa, väri lämmin seepia (ei harmaa).

**Kinderdijk NLD (taso1-kynnys pienissä maissa):**
```
echo "aja 51.88 4.63 0.08 2" > komento.txt
echo "symbolit tila" > komento.txt
echo "nostot tila NLD" > komento.txt
```
Onnistuminen: taso 1:ssä näkyy mylly (tai kinderdijk jos erikoismallit2 mergattu), vaikka
`nostot tila NLD`:n ZoomKerroin on selvästi alle 2.5 (~1.2-1.3).

**177 (uusi peli, mittauslippujen säilyminen, korjaus 0430842):**
```
echo "saapuminen vartija paalle" > komento.txt
echo "uusi-peli 1 ateena" > peli-komento.txt
echo "saapuminen vartija tila" > komento.txt
```
Onnistuminen: `saapuminen vartija tila` raportoi SAMAN tilan (päällä) uuden pelin jälkeen —
ennen korjausta tämä olisi nollautunut. Aja myös perus-177 ja kortti-avattuna-variantti mukana.

## 02:00-käännöksen (jälkeen TF 1.0.27) valmisteltu resepti (Fable 27.9.2026, ennen buildia)

Lyhyt kierros: ylhäältä-perspektiivi (löydös 175 jatko, omistajan "Nyt"), lipun perspektiivi, savuke
(0 poikkeusta + perus), 177. Komennot löytyivät suoraan Kartta/Komennot.cs:n kommenteista (Symbolimallit
ja Lipputanko saavat molemmat saman "LiioiteltuPerspektiivi"-käyrän tässä käännöksessä).

**Ylhäältä-perspektiivi (symbolit, 175 jatko):**
```
echo "symbolit ylhaalta 3d" > komento.txt   # pakota 3D pystykamerassakin (oletus tässä kokeiluhaarassa)
echo "symbolit perspektiivi 55" > komento.txt   # liioitellun perspektiivin kulma reunalla (0-80, 55=oletus)
echo "aja 46.5 2.5 0.4 1.5" > komento.txt   # Ranska, lähes suoraan ylhäältä (kallistus 0 oletuksena)
```
Kriteeri: Linna/Kirkko/Majakka näkyvät 3D-malleina myös pystysuorasta kamerasta (ei enää litteä
2D-symboli kuten 1.0.26:ssa), liioiteltu perspektiivi kasvaa ruudun reunaa kohti. Vertaa
`symbolit perspektiivi 0` (pois) samasta kamera-asemasta nähdäksesi eron. Ei lokiriviä — visuaalinen.

**Lipun perspektiivi (sama käyrä, pikakomento testilipulle):**
```
echo "lipputanko koe" > komento.txt          # testilippu oletuspaikkaan (Ateena 37.98, 23.73)
echo "lipputanko perspektiivi 1" > komento.txt   # varmista päällä (oletus)
```
Yhdistä kameran sijoitteluun kuten aiemmin (41.08 25.95 sivulta, 0.4 arc ylhäältä). `lipputanko
perspektiivi 0` pois-vertailuun jos aikaa jää.

**Savuke:** perus 0-poikkeusta-tarkistus + `pallo lepo` -rivin "Cesium-näkymä pidetty" (C/D/163).

**177:** kuten aiemmin, `uusi-peli 1 <kaupunki>` — tarkista ettei regressiota tullut edellisen
korjauksen (cc33ba3b) päälle.

## TF 1.0.27 -kierroksen valmisteltu resepti (Fable 27.9.2026, ennen buildia)

Kaikki kuusi haaraa ovat MERGE-PYYNTÖTILASSA proto-3d/Matkakirja-proto:ssa, eivät vielä nykyisessä
käännöksessä. Kun Natiiviseppä ilmoittaa 1.0.27:n SHA:n, aja suoraan alla olevat. Kaikkiin kuviin
build-numero/SHA + kuvakulma suoraan kuvaan (ks. yllä oleva pysyvä sääntö).

**178 (nähtävyyskartalla vain paikat, 70 tarinakohdetta):**
```
echo "ui nahtavyydet amsterdam" > ui-komento.txt
```
Onnistuminen: Maitotyttö/Yövartio (EI-RAKENNUS-kohteet) eivät näy enää numeroituina pinneinä
kartalla, löytyvät sen sijaan kaupungin nostojen haitarista numeroimattomana. Ei lokiriviä,
puhtaasti visuaalinen. Vertailukuva: kaappaukset/omistaja-20260926/loydos178-nahtavyydet-ei-rakennus-amsterdam.png.

**179 (Tapaa-nappi pois lehdestä):**
```
echo "lehti firenze" > ui-komento.txt
```
Vanha testikomento `ui lehti tehtava` on POISTETTU tässä haarassa — jos se palauttaa
tuntematon-virheen, se itsessään vahvistaa haaran olevan buildissa. Onnistuminen: ei kultaista
"Tapaa X"/"Etsi kätkö" -nappia alapalkissa millään lehden sivulla, aidossa aktiivisen
kohtaamis/kätkö-tehtävän kaupungissa.

**170 (kuva vaihtuu kesken istunnon):**
EI konsolikomentoa — automaattinen taustatarkistus (käynnistyksen jälkeen + taustalta palatessa).
Vaatii uudemman sisältöpaketin saatavilla session aikana; vie sovellus Home-napilla taustalle ja
takaisin käynnistääkseen tarkistuksen. Onnistumisen lokirivit:
```
MATKAKIRJA paketti: sisältö vaihtui vX → vY kesken istunnon, N tiedostoa muuttui: ...
MATKAKIRJA ui: sisältö vY käyttöön kesken istunnon (N muuttunutta): maakunta- ja nostodata hylätty
```
Visuaalisesti: maakuntakuvat (esim. Attika/Akropolis) ilmestyvät ilman uudelleenkäynnistystä.

**Lipun perspektiivi (keskellä lähes näkymätön, tanko säteittäin ulos, alaosassa alas):**
```
echo "aja 48.87 2.3275 0.4 1.2" > komento.txt   # Pariisi, keskellä (lähes suoraan ylhäältä)
echo "aja 48.66 2.3275 0.4 1.2" > komento.txt   # puolivälissä
echo "aja 48.52 2.3275 0.4 1.2" > komento.txt   # reunalla
```
Vaihtoehto Lontoo: `aja 51.50 -0.12 0.4 1.2` → `51.29` → `51.15` (sama kaava). Perustesti
(vahvistettu aiemmin): `aja 41.08 25.95 2 1.5` (Traakia). Ei lokiriviä. Kriteeri: suoraan ylhäältä
lippu lähes näkymätön (piste + ohut kangas), reunoilla tanko säteittäin poispäin ruudun keskeltä,
näkymän alaosassa tanko osoittaa alas, kangas kääntyy tangon mukana.

**Höyrylaiva (elävä elementti, Thames):**
```
echo "aja 51.503 -0.12 1.5 1.5" > komento.txt
echo "elava elementit tila" > linssi-komento.txt
echo "elava elementit siirra 300" > linssi-komento.txt
```
Sijainti tarkasti 51.50767°N / -0.10192°E. Onnistumisen lokirivi: `hoyrylaiva näkyvissä (peitto
0.xx), 199 kolmiota, nopeus 1.00` (ei "ei näkyvissä, nopeus 0,00"). Visuaalisesti: siipiratashöyry
kulkee Thamesia, ratas pyörii, savupalloja piipusta.

**177-variantti (uusi peli, nostokortti avattuna) — todennäköinen FAIL-kandidaatti:**
```
echo "ui nosto skandaali:shakkiturkkilainen" > ui-komento.txt
# kuvakaappaus kortin ollessa auki, sitten:
echo "uusi-peli 1 ateena" > peli-komento.txt
```
Kumpikaan 177-haara ei erikseen mainitse avoinna olevan nostokortin sulkemista uuden pelin
alkaessa — testaa erikseen jääkö kortti vanhan pelin päälle. Poikkeama = FAIL.

## PYSYVÄ KOHTA: omistajalle päätyvien kuvien merkintä (omistaja 27.9.2026 klo 00.2x, Raamattu-PR #3361)

Kaikkiin omistajalle päätyviin esimerkki-/vertailukuviin (esim. löydös175-tyyppiset ennen/jälkeen-
kuvaparit) merkitään **SUORAAN KUVAAN** — ei vain tiedostonimeen tai raporttitekstiin — build-numero
(tai käännöksen SHA) ja kuvakulma/kohta (esim. "BUILD 26, Ranska maataso, kallistus 45°" tai
"cd41e4fa, ennen"/"83e2fb1e, jälkeen"). Käytä esim. `sips`/`ImageMagick`-tekstileimaa tai vastaavaa
kuvan päälle — kuvatekstiä raportissa EI lasketa merkinnäksi.

## PYSYVÄ KOHTA: arkkityyppien maatason kokotarkistus (löydös 175, Fable 26.9.2026)

Aina kun testataan tason 1–3 arkkityyppejä/nostoja (esim. 160-tyyppiset kohdat), ota AINA myös
maatason (lähelle zoomattu, ei kaukokallistus) kuvakaappaus sekä Ranskasta että Kreikasta samasta
näkymästä. Omistajan löydös 175: 1.0.25:ssä tason 1 -arkkityypit näyttivät maatason zoomissa
valtavilta harmailta muodoilta, jotka peittivät nimistöä — aiempi kierros antoi PASSin ilman tätä
kokokohtaa.

**Kriteeri: mikään nostomalli ei saa ylittää kaupunkinimiön kokoa eikä peittää paikannimiä.**
Poikkeama = FAIL, ei "PASS, ei visuaalisesti tarkistettu". Esimerkkikuva:
`docs/raportit/kaappaukset/omistaja-20260926/loydos175-arkkityypit-ranska-125.png`
(Fablen haara `claude/bold-ride-vow4ki`).

## PYSYVÄ KOHTA: uusi peli kesken pelin (löydös 177, Fable 26.9.2026)

Joka kierroksella testataan myös: käynnistä `uusi-peli`-komento (peli-komento.txt) KESKEN käynnissä
olevan pelin (ei vasta appin käynnistyksen jälkeen tyhjästä). **Kriteeri: kaiken pitää nollautua ja
aloitusjakso (intro/saapuminen) alkaa puhtaasti**, kuten ensimmäisellä kerralla — ei jämiä edellisestä
pelistä (esim. vanha kamera-asento, vanhat heränneet maakunnat, vanha raha/löydöslaskuri jää näkyviin).
Poikkeama = FAIL.

## PYSYVÄ KOHTA: loitonnus Kreikasta Eurooppaan (löydös 176, Fable 26.9.2026)

Joka kierroksella testataan myös: zoomaa/loitonna kamera Kreikan maatasosta koko Euroopan
näkymään (esim. `aja 48 15 40 3`). **Kriteeri: kaikkien laattojen pitää piirtyä 5 sekunnin sisällä,
ei näkyviä pergamenttiaukkoja (tyhjiä/lataamattomia laatta-alueita) loitonnuksen jälkeen.**
Poikkeama = FAIL.

## Kamera kauas + kallistus (H/153/159 usva, I/154 taivas)

```
echo "aja <lat> <lon> <kaari-aste> <s>" > komento.txt   # esim. aja 38.2 23.2 5 1.5
echo "kallista <0-85>" > komento.txt                     # esim. kallista 55-70
```
Vertailuun: `usva pois` / `usva paalle`, `taivas kartta pois` / `taivas kartta utu` / `vaalea` / `sini`
(kaikki komento.txt:hen). Tulos näkyy suoraan kuvakaappauksesta — horisontti häipyy usvaan, taivas muuttuu
sävyltään. Ei vaadi lokia.

## Maakunnan pysyvä herätys, oikea reitti (B/S7)

`elava herata <ISO:tunnus>` (linssi-komento.txt) on VAIN testianimaatio — **ei muuta pelitilaa**, MAAKUNNAT-
laskuri ei nouse, eikä käsialanimeä ilmesty pysyvästi. Oikea reitti on oikea löytö:

```
echo "muste maakunnat <ISO>" > peli-komento.txt   # listaa maakunnat + laskurit, esim. GRC:Attiki 0/14
echo "muste loyda kohde:<valo-id>" > peli-komento.txt   # esim. kohde:marathon (Attikan nosto)
```
Tulos peli-loki.txt:ssä: `kohde:X: uusi True, GRC:Attiki 1/14, herää`. Kuvakaappauksessa maakunnan
**käsialanimi** ("Attika") ilmestyy kartalle pysyvästi kohteen yläpuolelle — tämä on pysyvä efekti, ei
väriä sinänsä. Todennettu 26.9. build 20:ssä (894f1feb): PASS.

## Maakunnan valinta, täyttö (L/157)

```
echo "maakunta <ISO:tunnus>" > komento.txt   # esim. maakunta GRC:Peloponnisos
```
Näkyy heti vihertävänä täyttönä valitulla maakunnalla, ei korostusrajaa; heränneet maakunnat (ks. yllä)
näkyvät samalla kartalla oranssinsävyisenä pysyvänä täyttönä, muut maakunnat ilman täyttöä. Rajaviivat
(ohuet ääriviivat maakuntien välillä) tulevat näkyviin samalla kun jokin maakunta on valittu/herännyt.
Todennettu: PASS.

## Lepo/piirto

```
echo "pallo lepo" > komento.txt      # sama tieto kuin peli-komento.txt:n pallo lepo, PallonLepo.Kuvaus
echo "ruutu" > peli-komento.txt      # Ruudunpaivitys.Kuvaus: tila Paikallaan/lepo/taysi, piirtoväli, fps
```
kehysajat.jsonl (Documents-juuressa) antaa piirretty/150-arvon 5 s:n riveinä — käytä tätä lepopiirron
todentamiseen `pallo lepo`/`ruutu`-tekstin sijaan tai lisäksi.

## Athos-salaisuuskortti (D, toistettu 3x PASS)

```
echo "muste loyda kohde:hahmotelma-athos" > peli-komento.txt
echo "ui kartuscha GRC auki" > ui-komento.txt
```
Kartussiin ilmestyy UI Toolkit -rivi "Maakunnan salaisuus löytyi: <nimi> ›" (ei lokirivi — todenna kuvasta,
UITK-napit eivät näy ui-puussa). Napautus rivin päällä avaa kortin.

## Musiikkiaiheet (E)

```
echo "aani aihe aloituslento|loppu|kaupunki <kaupunki>" > peli-komento.txt
echo "aani mittaa" > peli-komento.txt   # rms/huippu + soivien url-lista peli-lokiin
```
HUOM (Pelikoodari): tunnus (`kaupunki <id>`) ei katkaise jo soivaa aihetta — testaa tuoreella pelillä
ennen muita `aani aihe` -kutsuja, tai odota edellisen aiheen loppuvan.

### Musiikki vaihe 2/3 (build 21)

`ratkaisu`/`epaonnistuminen`/`kohtaaminen`/mannerraidat EIVÄT MYÖSKÄÄN katkaise jo soivaa aihetta (sama
sääntö kuin webissä, kuten yllä). AINA tuoreessa pelisessiossa, ENNEN `aloituslento`/`loppu`-testejä:
```
echo "uusi-peli 1 ateena" > peli-komento.txt
echo "aani aihe ratkaisu" > peli-komento.txt         # tai epaonnistuminen
echo "aani mittaa 2" > peli-komento.txt              # HETI perään (raita kestää vain 4 s)
echo "aani tila kohtaaminen paalle" > peli-komento.txt
echo "aani mittaa 2" > peli-komento.txt
echo "aani aihe kaupunki kairo" > peli-komento.txt   # manner/tunnuskaupunki (musa-saapuminen-lahi-ita)
echo "aani mittaa 2" > peli-komento.txt
```
Jos näitä ajaa `aloituslento`/`loppu`-testien JÄLKEEN samassa sessiossa, tulos näyttää FAILilta (aihe ei
soi) vaikka on PASS — vain testijärjestys oli väärä (Fable/Pelikoodari 26.9., löydös build21-kierroksesta).

## Lipputanko (161, build 21)

Kreikan itäreunassa Traakiassa, 41,08° N / 25,95° E (Aleksandroupolin luoteispuolella). Kamera:
```
echo "aja 41.08 25.95 2 1.5" > komento.txt
```
Lippu liehuu itään maan ulkopuolelle; lepomittaus (kehysajat.jsonl piirretty) tässä näkymässä (Fable 26.9.).

## Yläpalkin piiloutuminen karttaa vieritettäessä (TF-kierros, vain laitteella; Fable 26.9. klo 14.4x)

Simulaattorin touch_path ei panoroi karttaa, joten tämä tarkistetaan TestFlight-iPhonella molemmissa asennoissa
(Ylapalkki.TarkistaVeto, löydös 73). **Vaaka**: kartalla alkanut ≥ 8 pt veto piilottaa palkin (näkyviin jää vain ☰),
lyhyt napautus kartalla (< 6 pt, < 0,7 s) tuo sen takaisin; palkin, korttien tai nappien päällä alkanut ele ei piilota.
**Pysty**: palkki pysyy näkyvissä vedon aikana ja sen jälkeen (odotettu, ei vika). Kirjaa kumpikin asento PASS/FAIL
+ ruutukaappaus. Simulaattorissa logiikan voi ajaa vaaka-asennossa ilman elettä:
```
echo "ui ylapalkki veto" > ui-komento.txt      # piiloon
echo "ui ylapalkki napautus" > ui-komento.txt  # takaisin
```

## Vielä auki (ei komentoa löytynyt / ei ehditty)

- K (156, maakuntien selain sormivedolla): `aja`-komennolla pääsee samaan lopputulokseen kameraa
  siirtämällä, mutta oikeaa "yhden sormen veto" -gesturea ei ole vielä kokeiltu (Kartta/Komennot.cs:n
  `veto x0 y0 x1 y1 s` -komento on olemassa, ei testattu).
- M (158, maakuntanoston pikkukuva): ei komentoa löytynyt.
- N (elävät hetket 4+5, kuljettu reitti tummanpunaisena, 3 s → 0 kehykseen): peli-loki näytti kertaalleen
  "animaatiot ... käynnissä: pallon sumennus elävä kartta" kameran asettuessa; täsmällistä laukaisukomentoa
  ei löytynyt.
- F (pohja 26 + kerma p060 pallonäkymässä): koodissa löytyvät (Kermasarja.Oletus = "2026-09-26-p060",
  rasteriPohja-URL), mutta pelin sisältä ei löytynyt reittiä "Pallo"-maailmankarttanäkymään (etusivun
  sumennettu tausta lienee sama näkymä, mutta terävänä sitä ei tavoitettu).
- A (kylmä verho -uusinta rauhallisemmassa kuormassa): ei uusittu.
