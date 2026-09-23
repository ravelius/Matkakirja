# Laitetestaaja Fablelle/Codexille: Pulun 70 eleen livepeli-QA (v2138, 23.9.2026)

Tuotanto matkakirja.app, PR #2870 → #2873 (v2138). Testattu Playwright+WebKit-
selaimella (390×844 puhelin, 1024×768 iPad) suoraan tuotanto-osoitteesta,
kartalla Marseille (`?lauta=pallo&dev=marseille`). Ei ehditty tehdä täyttä
manuaalista kierrosta kaikista 70 eleestä eikä suoraa rinnakkaisvertailua
Codexin galleriaan (https://ravelius.github.io/pulun-eleet/, tavoitettavissa,
HTTP 200) — alla se, mikä ehdittiin todentaa.

## Todennettu KUNNOSSA

- **Piiloankkuri**: `.pollo-nappi` laskettu `right`/`bottom` ~57,6 px
  molemmilla ruuduilla (390 px: right 57,6 / bottom 60,8; 1024 px: right 57,6
  / bottom 57,6) — täsmää spekattuun 3,6 rem:iin (3,6 × 16 px = 57,6 px).
- **Pulu näkyy ja reagoi molemmilla ruuduilla**: kartalla oikeassa
  alakulmassa, `aria-label="Pulu — avaa keskustelu"`.
- **Eleiden vaihtuminen todettu keskustelun kautta**: Pulu-napin
  klikkaus → asento vaihtuu selvästi kolmesti peräkkäin (kartalla lepoasento
  → "Hetki, pululla pulla suussa.." + eri asento LATAUKSEN AIKANA, tämä ON
  "pullan syönti" -viittaus tekstissä → asettunut valmis-asento kysymyksineen).
  Kuvakaappaukset: chat-1.png, chat-2.png (tallennettu paikallisesti,
  eivät tässä committissa).
- **prefers-reduced-motion: reduce**: keskustelupaneeli avautuu ja Pulun
  asento asettuu normaalisti ilman virheitä myös vähennetyllä liikkeellä —
  ei havaittua rikkoutumista, mutta EI mitattu erikseen, LOPETTUUKO itse
  siirtymäanimaatio (ei ollut vertailukohtaa, koska idle-eleet eivät
  syklinneet vapaasti ilman vuorovaikutusta, ks. alla).
- **Rest-tilan rAF-silmukka ei kasva** (kehysprofiili, pallolauta-näkymä,
  kaksi peräkkäistä 6–8 s ikkunaa): rafKutsuja/kehys 3,5 → 1,0 (LASKEE, ei
  nouse) — ei viitteitä v2123-tyyppisestä silmukkavuodosta uusissa eleissä.
- **Ei uusia JS-poikkeuksia** eleiden laukaisusta (pageerror-kuuntelija ei
  raportoinut mitään gesture-koodista klikkausten/lepo-ikkunoiden aikana).

## EI ehditty / EI täysin todennettu

- **"Eleet pyörivät" vapaasti levossa**: 15–20 s:n tarkkailuikkunassa ilman
  vuorovaikutusta Pulun asento/luokat eivät muuttuneet kertaakaan — eleet
  vaikuttavat TAPAHTUMAPOHJAISILTA (keskustelun avaus/vastaus), eivät
  ambient-silmukalta. Jos "eleet pyörivät" oli tarkoitettu ambient-idle-
  ilmiöksi, sitä EI havaittu — voi olla oikein (eleet ovat kontekstuaalisia)
  tai puuttuva kytkentä; en osaa sanoa kumpaa ilman Codexin/Pelikoodarin
  vahvistusta siitä, MITKÄ tapahtumat laukaisevat minkäkin 70:stä eleestä.
- **Kaksi karttanokkaisua ja kypärä**: ei tunnistettu varmasti erikseen —
  ei löytynyt selvää triggeriä lyhyessä ajassa erottaakseen niitä muista
  keskustelun aikaisista asennoista.
- **Suora kuvavertailu Codexin galleriaan**: sivu tavoitettavissa, ei
  ehditty käydä läpi rinnakkain.

## Konsolivirheet (HUOM: ei uusi, tunnettu ongelma)

Molemmilla ruuduilla joka latauksella:
```
Origin https://matkakirja.app is not allowed by Access-Control-Allow-Origin. Status code: 403
pageerror: /matkakirja-sahke.samireivinen.workers.dev/ due to access control checks.
Failed to load resource: ... Status code: 403
```
Tämä on "sähke"-työntekijän CORS 403, sama kuin aiemmin raportoitu (21.9.
"sähke-CORS 403", Fablen tila -muistio) — EI liity v2138:n eleisiin, mutta
on edelleen aktiivinen tuotannossa. Yksi ajo näytti myös yhden 404-virheen
(ei toistunut kaikilla ajoilla, ei jäljitetty tarkemmin).

## Yhteenveto

Ei estäviä löydöksiä 70 eleen julkaisussa itsessään: eivät riko sivua,
eivät kasvata rAF-kuormaa levossa, sijoittelu täsmää, toimivat myös
reduced motion -tilassa. Suurin auki oleva kysymys on, ONKO eleiden pitänyt
näkyä vapaassa idle-tilassa vai vain vuorovaikutuksen yhteydessä — tarvitsee
Codexin/Pelikoodarin vahvistuksen ennen kuin QA:n voi sanoa kattavan koko
70 eleen laajuuden.
