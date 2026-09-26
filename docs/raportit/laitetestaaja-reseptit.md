# Laitetestaajan komentoreseptit (kartan/pallon debug-konsolit)

Kolme erillistä komentotiedostoa Documents-kansiossa, sama peli lukee kaikkia sekunnin välein:
`peli-komento.txt` (pelitila, PeliKomennot.cs), `ui-komento.txt` (UiNakymat.cs), `linssi-komento.txt`
(LinssiOhjain.cs) — nämä kolme tunnettiin jo. Neljäs, **`komento.txt`** (paljas nimi, Kartta/Komennot.cs),
löytyi 26.9.2026 build 20:n testauksessa: kamera-, usva- ja maakuntakomennot ovat siinä, ja se toimii
samassa Kartta-skenessä kuin peli-komento.txt (Natiiviseppä vahvisti: sama konsoli kaikissa käännöksissä).

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

## Lipputanko (161, build 21)

Kreikan itäreunassa Traakiassa, 41,08° N / 25,95° E (Aleksandroupolin luoteispuolella). Kamera:
```
echo "aja 41.08 25.95 2 1.5" > komento.txt
```
Lippu liehuu itään maan ulkopuolelle; lepomittaus (kehysajat.jsonl piirretty) tässä näkymässä (Fable 26.9.).

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
