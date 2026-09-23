# Pelilogiikka (Pelikoodari, haara pelikoodari/pelilogiikka)

Verkkopelin js/rules.js, js/game.js ja js/tokens.js (matkustus, raha, aika, kysymykset,
tietäjäpisteet, aarrelaatat) puhtaana C# 9:nä. Yksi `Matka` on sama kokonaisuus kuin
verkkopelin `Game` (yksinpeli vaellustilassa).

- `Assets/Matkakirja/Peli/` — asmdef **Matkakirja.Peli** (`noEngineReferences`, autoReferenced):
  - Sopimukset (rajapinnat IReittiverkko, IKamera, ILehti), MiniJson, SisaltoTuonti,
    Satunnainen (mulberry32), Reittiverkko, LehtiOsoite.
  - **Matka** — tilakone (vuoro, kulkutavat, heitto, siirto, bussi, lento, pankkiapu) ja
    erästä 3 laattojen jako luonnissa, laatan kääntö (web revealToken), lukitus, ennätys.
  - **Pelitila** — tallennettava tila (tallennusversio **3**).
  - **Laatat** — Laattamaailma (jako, kääntö, lukitus; JS Map -järjestys JarjestettyKartta),
    Laattamaarat (paketin `kokoelmat/laatat.json`), Loyto (yhden käännön tulos).
  - **Kysely** + Kysymysdata — kysymysmoottori (js/game.js actionQuiz…closeQuiz).
  - **Kokemus** — tietäjäpisteet (awardXp, ainoa pisteportti), -tasot, tietoprosentti.
  - **Kaupat** — ostot ja palkkiot (kulttuurivisa, lehden minitehtävä, nostolaskuri,
    pulun karttaohje, pulla Livialle, eläintäky, juliste, mannerlento, pöllön sähke,
    availableActions); tila Pelitila.Kaupat (Kauppatila). KauppaVakiot = webin hinnat ja
    palkkiot, Kauppasisalto = paketin elaintayt.json ja julisteet.json.
  - **Voitto** — checkWin (vain moninpeli; vaelluksessa aina epätosi, Matka ei vielä kutsu).
- `Assets/Matkakirja/Scripts/Peli/LehtiKuori.cs` — ILehti-toteutus (GameObject `MatkakirjaLehti`).
- `Assets/Plugins/iOS/MatkakirjaLehti.mm` — WKWebView-liitännäinen, ks. README-lehti.md.
- `Assets/Matkakirja/Editor/LehtiKuoriXcode.cs` — WebKit.framework linkitys Xcode-vientiin.

## API lyhyesti Unity-kerrokselle

```csharp
var verkko = SisaltoTuonti.LueKansiosta(paketti);               // kaupungit.json + reitit.json
var maarat = Laattamaarat.Lue(File.ReadAllText(".../kokoelmat/laatat.json"));
var data   = Kysymysdata.LueKansiosta(paketti);

var matka = Matka.Luo(verkko, new Satunnainen(siemen), "Fogg", "pariisi", maarat); // jakaa laatat heti
var kysely = new Kysely(matka, data);   // kytkee Pysy-tavan ja laattakoukut Matkaan
matka.AloitaVuoro();                    // (tai Matka.UusiPeli(…, maarat) ilman Kyselyä)

matka.Kulkutavat(); matka.ValitseKulkutapa(t); matka.Heita(); matka.Liiku(avain);
matka.Bussi(kohde); matka.Lenna(kohde); matka.PeruKulkutapa();
kysely.Tutki(vaikea); kysely.Vastaa(i); kysely.Vihje(); kysely.Puolita(); kysely.Kaveriapu();
kysely.AikaLoppui(); kysely.Sulje();

var kaupat = new Kaupat(matka);         // ostot ja palkkiot; ei koukkuja
kaupat.Kulttuuri(k, oikein); kaupat.Minitehtava(k, aihe, oikein, KauppaVakiot.TakyPalkkio);
kaupat.PullaVinkki(k); kaupat.PullaOstos(KauppaVakiot.SahkePullaAvain(id, "vinkki"), 50);
kaupat.Elaintaky(iso, KauppaVakiot.ElaintakyPalkkio); kaupat.MyonnaJuliste(avain);
kaupat.MannerLennot(); kaupat.MannerLento(k); kaupat.AvaaAarreSahkeella(k, palkkio);
kaupat.Toiminnot();                     // web availableActions

string json = matka.Tallenna();
var ladattu = Matka.Lataa(verkko, json, maarat);  // luo sen jälkeen uusi Kysely ja Kaupat
```

- Tila: `matka.Tila` (vaihe, pelaaja: Raha, Xp, Tahdet, Loydot/LoytoMantereet/LoytoMaat),
  `matka.Laatat` (Laatat, Kaannetyt, TahdetLoydetty), `matka.LaattaTassa(id)`,
  `matka.LaattaKaupungissa()`, `matka.ViimeLoyto` (viimeisin arvo, ei tallenneta),
  `matka.Kokemus`.
- Tapahtumat: `Matka.Saapui`, `Matka.Tapahtui` (fare, flight, aid, stuck, treasure, robber),
  `Matka.Loysi` (pelaaja, Loyto), `Kysely.Tapahtui`, `Kokemus.TasoNousi` / `OtaNousut()`,
  `matka.OtaPolloPaljastus()`.
- Koukut (null = ei toteutettu): `Matka.Kaksintaistelu` (web beginDuel; tosi = alkoi,
  muuten vuoro päättyy), `Matka.LinssiKylkiaisena`, `Kokemus.KynnysYlitetty` (linssit),
  `Kysely.PulmaOdottaa/AvaaPulma`, `Kysely.TapahtumiaOn/AvaaTapahtuma`, `Kysely.Liput`,
  `Kysely.AsetaKuvat`. Ohitus: `Matka.Tavoitteet` (oletus kääntämättömät laatat).
- Pöllö aarteena: `Matka.Luo(…, polloAarteena: true)`; oletus pois kuten webissä.
- Erien 1–2 muodot säilyvät: `Matka.UusiPeli/Luo(verkko, rng, nimi, aloitus)` ilman
  määriä = peli ilman laattoja (pienet testiverkot), `Matka.Lataa(verkko, json)`.

## Tallennus

Versio 3 lisää `laattamaailma` (laatat, käännetyt, tähdet taulukkoina Map-järjestyksessä),
pelaajalle `tahdet`, `loydot`, `loytoMantereet`, `loytoMaat` sekä `kaksintaistelu`,
`ennatys`, `ennatysPaiva`, `polloAarteena`, `polloLoydetty`. Versiot 1–2 latautuvat:
`Matka.Lataa(verkko, json, maarat)` jakaa niille laatat pelin omalla satunnaisuudella
tallennuksen kohdasta (sama tallennus → sama jako; lukitut kaupungit menettävät laattansa),
koska tyhjä maailma jättäisi vanhan pelin ilman yhtään aarretta. Ilman määriä vanha peli
jatkuu laatoitta.

Kentät `kaupat` (Kauppatila) ja `voittaja` ovat versiossa 3 valinnaisia: puuttuessa
kirjanpito on tyhjä ja voittajaa ei ole (versionumero ei noussut).

## Testit ja kultaiset jäljet

`Peli-testit/` (Unityn ulkopuolella): `./kaanna.sh [nimen osa]` kääntää Peli-kansion +
testit Unityn mukana tulevalla dotnetilla ja csc:llä ilman editoria ja ajaa ne.
Kultaiset vertailut tuotetaan verkkopelistä (`node Kultaiset/<skripti>`; vaativat
verkkopelin checkoutin /Users/Shared/Claude/Matkakirja-pelikoodari). Tulosteet eivät saa
muuttua ilman webin muutosta; C# toistaa ne identtisesti, myös satunnaislukukutsujen määrän.

| Skripti | Tiedosto | Testi | Sisältö |
|---|---|---|---|
| `tee-kultaiset.mjs` | siirrot.json | Reittiverkko-, SatunnainenTestit | siirrot, saavutettavuus, mulberry32 |
| `tee-matkajalki.mjs` | matkajalki.json | MatkaTestit | matkustus ilman tehtäviä, oikea laattajako |
| `tee-kysymysjalki.mjs` | kysymysjalki.json, liput.json | KyselyTestit | kysymykset, rajatut käännöt |
| `tee-laattajalki.mjs` | laattajalki.json, paketti/laatat.json | LaattaTestit | jako, käännöt, lukitus |
| `tee-kauppajalki.mjs` | kauppajalki.json (+ näytteet paketti/elaintayt.json, julisteet.json paketista v2) | KauppaTestit | jokainen kauppateko onnistuvana ja epäonnistuvana, sähke ryöstäjään ja pöllöön, tallennus välissä ja joka teon jälkeen |
| `tee-pelijalki.mjs` | pelijalki.json | PeliTestit | koko peli laattoineen (~2700 tekoa, 9 siementä, pöllö- ja ryöstäjäajot), myös tallennus/lataus välein 7 ja 3 |

`.meta`-tiedostot eivät ole mukana: Unity luo ne ensimmäisessä tuonnissa (3D-selvittäjän editori).
