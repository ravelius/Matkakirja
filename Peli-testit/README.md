# Pelilogiikka (Pelikoodari, haara pelikoodari/pelilogiikka)

Verkkopelin js/rules.js, js/game.js ja js/tokens.js (matkustus, raha, aika, kysymykset,
tietäjäpisteet, aarrelaatat) puhtaana C# 9:nä. Yksi `Matka` on sama kokonaisuus kuin
verkkopelin `Game` (yksinpeli vaellustilassa).

- `Assets/Matkakirja/Peli/` — asmdef **Matkakirja.Peli** (`noEngineReferences`, autoReferenced):
  - Sopimukset (rajapinnat IReittiverkko, IKamera), MiniJson, SisaltoTuonti,
    Satunnainen (mulberry32), Reittiverkko.
  - **Matka** — tilakone (vuoro, kulkutavat, heitto, siirto, bussi, lento, pankkiapu) ja
    erästä 3 laattojen jako luonnissa, laatan kääntö (web revealToken), lukitus, ennätys.
  - **Pelitila** — tallennettava tila (tallennusversio **4**; versiopolku Pelitila.Paivita, uudempi = UudempiTallennus, TallennusTestit).
  - **Laatat** — Laattamaailma (jako, kääntö, lukitus; JS Map -järjestys JarjestettyKartta),
    Laattamaarat (paketin `kokoelmat/laatat.json`), Loyto (yhden käännön tulos).
  - **Kysely** + Kysymysdata — kysymysmoottori (js/game.js actionQuiz…closeQuiz).
  - **Kokemus** — tietäjäpisteet (awardXp, ainoa pisteportti), -tasot, tietoprosentti.
  - Rosvolaatat ja rosvon kaksintaistelu on POISTETTU pelistä (Raamattu 25.8.2026; natiivista
    23.9.2026). Laattamaarat.Lue ohittaa muut kuin aarretyypit (Ohitetut), vanhan tallennuksen
    rosvolaatta katoaa ja vaihe Kaksintaistelu luetaan Toiminnaksi.
  - **Kaupat** — ostot ja palkkiot (kulttuurivisa, lehden minitehtävä, nostolaskuri,
    pulun karttaohje, pulla Livialle, eläintäky, juliste, mannerlento, pöllön sähke,
    availableActions); tila Pelitila.Kaupat (Kauppatila). KauppaVakiot = webin hinnat ja
    palkkiot, Kauppasisalto = paketin elaintayt.json ja julisteet.json.
  - Moninpelin voitto (checkWin), tekoälypelaaja (isBot) ja tapahtumakortit (events) on POISTETTU
    (Fablen tarkastus A3 ja C1, 23.9.2026). Matkan huipennus on PeliOhjain.KaikkiAarteetLoytyi.
  - **Pulmat** + Pulmadata, Pulmageneraattorit — isoisän pulmat (pendingPuzzle, openPuzzle,
    kaikki 11 generate(rng)-funktiota taulukkoineen C#:na; paketin `kokoelmat/pulmat.json`).
  - **Passi** — pelaajan leimat (js/passport.js): JSON-rajapinta Lue/Kirjoita, Leimaa, Korvaa, Lista,
    IsoPaiva, LeimaPaiva. EI pelitallennuksessa; tallennuspaikka (web 'matkakirja.passi.v1') on
    Unity-kerroksen, Muuttui-tapahtumasta.
  - **Linssiomistus** + Linssitila — linssien omistus ja hankinta (js/linssit/omistus.js, game.js
    tarkistaLinssikynnys ja linssiAarteenKylkiaisena): passi ∪ pelikerran lista, kynnykset
    (Kynnyssaanto vaihdettavissa), ison aarteen kylkiäinen, optikon hyvitys, valmistuneet,
    seitsemän peninkulman linssi (≥ 7 pääaarretta, päivä ≤ 80; ei webissä) ja VapaaSiirtyminen.
  - **Aani/** (B7, musiikki ja äänimaisema; web js/ambience-stream.js, musiikkivalitsin.js,
    kaupunkimusiikki.js, siirtymamusiikki.js, media.js, aani-ehdokkaat.js, ui.js aarreaihe):
    AaniTaulut + AaniVakiot (paketin aanitaulut, skeema ≥ 1.22), AaniOsoite (Url, PeiliPolku,
    Turvanimi, JaaAlku), Musiikkivalitsin + Musiikkitaso, Maisemakori (kori, arvonta, aloituskohta),
    Vaisto, **AaniTila** (tapahtumakone → `Toive` kanavittain: Pohja, Maisema, Visa, Siirtyma, Aarre)
    ja Tehostetaulu (siivut, sovittu Natiivi-UI:n kanssa). Kultainen jälki
    `Kultaiset/aanijalki.json` (`node Kultaiset/tee-aanijalki.mjs <web/js>`), testit AaniTestit.
- WKWebView-lehtikuori (LehtiKuori, MatkakirjaLehti.mm, LehtiOsoite) on poistettu (A4, 23.9.2026):
  lehdet ovat natiiveja (Natiivi-UI, `ILehtiNakyma`).

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

var pulmat = Pulmat.Kytke(kysely, Pulmadata.LueKansiosta(paketti));          // koukut PulmaOdottaa/AvaaPulma
// Pulma avautuu Pysy-tavasta (kysely.Tutki()) kuten webissä; auki: Tila.Kysely.Kysymys.Laji == Pulma,
// näytettävät pulmat.Nakyma (Otsikko, Selite, Luonnos = web sketchData, Kuvat, KuvaLahteet).

var passi = Passi.Lue(tallennettuPassi);  // passi.Muuttui += () => tallenna(passi.Kirjoita())
var linssit = new Linssiomistus(passi, new Linssitila()).Kytke(matka);  // koukut LinssiKylkiaisena, KynnysYlitetty, Loysi
linssit.Omistaa(tunnus); linssit.Myonsi += …; linssit.VapaaSiirtyminen(kohde);

string json = matka.Tallenna();
var ladattu = Matka.Lataa(verkko, json, maarat);  // luo sen jälkeen uudet Kysely, Kaupat (+ Pulmat.Kytke)
```

- Tila: `matka.Tila` (vaihe, pelaaja: Raha, Xp, Tahdet, Loydot/LoytoMantereet/LoytoMaat),
  `matka.Laatat` (Laatat, Kaannetyt, TahdetLoydetty), `matka.LaattaTassa(id)`,
  `matka.LaattaKaupungissa()`, `matka.ViimeLoyto` (viimeisin arvo, ei tallenneta),
  `matka.Kokemus`.
- Tapahtumat: `Matka.Saapui`, `Matka.Tapahtui` (fare, flight, aid, stuck, treasure),
  `Matka.Loysi` (pelaaja, Loyto), `Kysely.Tapahtui`, `Kokemus.TasoNousi` / `OtaNousut()`,
  `matka.OtaPolloPaljastus()`.
- Koukut (null = ei toteutettu): `Matka.LinssiKylkiaisena`, `Kokemus.KynnysYlitetty` (linssit),
  `Kysely.PulmaOdottaa/AvaaPulma` (Pulmat.Kytke), `Kysely.Liput`,
  `Kysely.AsetaKuvat`. Ohitus: `Matka.Tavoitteet` (oletus kääntämättömät laatat).
- Pöllö aarteena: `Matka.Luo(…, polloAarteena: true)`; oletus pois kuten webissä.
- Erien 1–2 muodot säilyvät: `Matka.UusiPeli/Luo(verkko, rng, nimi, aloitus)` ilman
  määriä = peli ilman laattoja (pienet testiverkot), `Matka.Lataa(verkko, json)`.

## Tallennus

Versio 3 lisää `laattamaailma` (laatat, käännetyt, tähdet taulukkoina Map-järjestyksessä),
pelaajalle `tahdet`, `loydot`, `loytoMantereet`, `loytoMaat` sekä
`ennatys`, `ennatysPaiva`, `polloAarteena`, `polloLoydetty` (vanhat kentät `kaksintaistelu` ja
`avoinKaksintaistelu` ohitetaan, rosvo poistettu). Versiot 1–2 latautuvat:
`Matka.Lataa(verkko, json, maarat)` jakaa niille laatat pelin omalla satunnaisuudella
tallennuksen kohdasta (sama tallennus → sama jako; lukitut kaupungit menettävät laattansa),
koska tyhjä maailma jättäisi vanhan pelin ilman yhtään aarretta. Ilman määriä vanha peli
jatkuu laatoitta. Samaan versioon on lisätty valinnaiset `pulmatNahty` (web puzzlesSeen)
ja avoimen pulman `kysymys.pulmaTiedot`; ilman niitä tallennus latautuu. Poistettujen
ominaisuuksien kentät (`tapahtumakortti`, `voittaja`, pelaajan `botti`, `kaksintaistelu`)
ohitetaan, ja vaiheet Kaksintaistelu ja Tapahtuma luetaan Toiminnaksi.

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
| `tee-kauppajalki.mjs` | kauppajalki.json (+ näytteet paketti/elaintayt.json, julisteet.json paketista v2) | KauppaTestit | jokainen kauppateko onnistuvana ja epäonnistuvana, sähke pöllöön, tallennus välissä ja joka teon jälkeen |
| `tee-pulmajalki.mjs` | pulmajalki.json | PulmaTestit | generaattorit (11 × 25 siementä), pulmien avaus/vastaus/sulku kuudella tavalla laatallisena ja laatattomana, koko peli pulmineen, tallennus välein 1, 2, 3 ja 5 |
| `tee-linssijalki.mjs` | linssijalki.json | LinssiomistusTestit | passin leimat (JSON-teksti, stampList, isoDate, stampDate, rikkinäinen tallennus) ja omistus kolmella ajolla koerekisterillä (2 hiomassa-riviä): kylkiäiset, kynnykset (myös kaksi kerralla), optikon hyvitys, valmistuminen, kehittäjätila, toinen pelikerta samalla passilla, tallennus välissä ja joka teon jälkeen |
| `tee-pelijalki.mjs` | pelijalki.json | PeliTestit | koko peli laattoineen (~2700 tekoa, 9 siementä, pöllöajo; koelaudalla ei ryöstäjiä), myös tallennus/lataus välein 7 ja 3 |

## Pakettivartija (sisältöpaketti vs lukijat)

`./vartija.sh` (= `./kaanna.sh PakettivartijaTestit`) ajaa tuotantopaketin jokaisen natiivin lukijan läpi
(`Testit/Pakettivartija.cs`: yksi sääntö per kokoelma + lukija). Punainen, jos lukijan pakollinen kenttä
puuttuu, tyyppi on väärä, lukija kaatuu tai lukee eri määrän kuin vartija hyväksyy, tai skeemaversio on
tuntematon (`Pakettiskeema` Peli/Paataso.cs). Tuloste: kokoelma, lukija, luettu, ohitettu, hylätty ja syy
sekä raakadatan (`data.*`) lukukohdat. Oletus ilman verkkoa: paikallinen kopio `Kultaiset/tuotanto`
(uusin.json + v<N>/manifest.json-ote + kokoelmat). Liput: `--hae` (tuore tuotanto curlilla, kertoo
vanhentuneen kopion), `--paivita` (kirjoittaa kopion), `--koe [kansio]` (koepaketti
/Users/Shared/Claude/sisalto-koe), `--raaka-kielletty` (vaihe 2: `Paataso.RaakaKielletty`). Uusi lukija
= uusi sääntö `Pakettivartija.Saannot`-listaan (AaniTaulut: kohta AANITAULUT).

`.meta`-tiedostot eivät ole mukana: Unity luo ne ensimmäisessä tuonnissa (3D-selvittäjän editori).
