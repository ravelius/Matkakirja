# Laitetestaajan komentoreseptit (kartan/pallon debug-konsolit)

Kolme erillistä komentotiedostoa Documents-kansiossa, sama peli lukee kaikkia sekunnin välein:
`peli-komento.txt` (pelitila, PeliKomennot.cs), `ui-komento.txt` (UiNakymat.cs), `linssi-komento.txt`
(LinssiOhjain.cs) — nämä kolme tunnettiin jo. Neljäs, **`komento.txt`** (paljas nimi, Kartta/Komennot.cs),
löytyi 26.9.2026 build 20:n testauksessa: kamera-, usva- ja maakuntakomennot ovat siinä, ja se toimii
samassa Kartta-skenessä kuin peli-komento.txt (Natiiviseppä vahvisti: sama konsoli kaikissa käännöksissä).

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
