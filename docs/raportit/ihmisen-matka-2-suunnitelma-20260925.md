# Ihmisen matka II: yhden sivun suunnitelma (25.9.2026)

*Linssiseppä (Opus, max). Omistajan tilaus 25.9. klo 17.1x (Raamattu "IHMISEN MATKA II", poikkeus linssikieltoon, vain
natiivi). Fable hyväksyy tämän ennen toteutusta. Toteutus aloitetaan pariteettikierroksen 4 jälkeen.*

**Ydinajatus:** sama esitys (21 jaksoa, sama kertoja, kello, pysäkit ja kuvat) kerrotaan valolla. Pallo on yön
hämärässä, ja valokeila kulkee tarinan mukana. Kuvat nousevat valokeilasta, vanat maalautuvat rannikolle hehkuvana
rintamana, sumu ja äänimaisema vaihtuvat seudun mukaan, ja kamera lentää maaston yllä kallistettuna. Ensimmäinen versio
säilyy sellaisenaan.

## Rakenne

- Uusi linssi `ihmisen-matka-2` ("Ihmisen matka II") laukkuun I:n rinnalle. `Esitys`, `IhmisenMatkaLinssi` ja aineisto
  käytetään sellaisinaan, joten sisältö on sama, ja II saa oman muistin (`Tiedot.Id`).
- II:lla on oma näkymä `IhmisenMatka2Kerros : IEsityksenNakyma`, joka koreografioi jakson kutsuista (`Jakso`,
  `SytytaKohde`, `Kuva`, `Tunne`, `Loppu`) valon, sumun, kuvan ja äänen. Ydin (`Linssit.Ydin`) ei muutu.
- Kovakoodatut `ihmisen-matka`-tunnukset (AikajanaNakyma, LinssiUi, Linssirekisteri, UiNakymat…) muutetaan
  tunnistamaan molemmat. UI-tiedostojen muutokset tekee Natiivi-UI.

## Omistajan kolme vaatimusta (erä 1)

1. **Tekstitys oletuksena pois ja CC-nappi.** Logiikka on minun: `Tekstitys`-tila linssin muistiin (oletus pois) ja
   tapahtuma UI:lle. Jakso 0:n ensimmäinen virke ("Tiedätkö, mistä ihmiset lähtivät liikkeelle?") näkyy aina.
   Natiivi-UI tekee CC-napin yläpalkkiin (LINSSIEN YLÄPALKKI iPHONELLA) ja piilotuksen `AsetaKertomusteksti`-kohtaan.
2. **Havainnekuvat isommiksi, ja kartta väistää.**
   - Kuvan koko: iPhone pystyssä noin 92 % leveydestä, iPad ja vaaka noin 55 %.
   - Kuvan paikka: puhelimella yläpuolisko, iPadilla ja vaakasuunnassa oikea puolisko.
   - Kartan väistö: pallon kohde siirtyy projektion linssisiirrolla alakolmannekseen tai vasemmalle, eikä kameraa
     käännetä.
   - Kuvan koko ja paikka kulkevat II-kerroksesta UI:lle `KuvanAlue`-suorakulmiona.
3. **Tasaiset kaistat, ei kuvan päälle.** Juurisyy (natiivin selvitys, Vana.shader):
   - Kaista maalautuu kahdesti janojen liitoksissa. Omistussääntö toleranssilla antaa peiton 0,75 eikä 0,5, joten syntyy
     raita joka kärjessä.
   - Kova `discard` porrastaa reunat.
   - `ZTest LEqual` leikkaa kaistan maastoon (maaston korostus 2).

   Korjaus:
   - Stencil-leimaus antaa peiton vain kerran pikseliä kohti.
   - `ZTest Always`, koska säde-pallo-leikkaus hylkää jo takapuolen.
   - Reunoille pehmeä peitto (`fwidth`).
   - `_KuvanAlue` häivyttää vanan kuvan alta, ja kuvan maski tehdään peittäväksi.

   Korjaus jaettuun varjostimeen korjaisi myös I:n raidat (ks. päätös 1).

## Tehosteet jaksoittain (erät 2–5)

| Vaihe (jaksot) | Valo | Sumu ja ilma | Kamera ja muu | Ääni |
|---|---|---|---|---|
| Avaus (1–2) | pimeästä pieni lämmin piste Afrikan kohdalle, joka aukeaa aamunkoitoksi pallon yli | syöksy kolmen pilvikerroksen läpi (parallaksi) | tähdet, hidas lähestyminen | hiljaisuus, sitten savanni |
| Afrikka (3–6) | keila liukuu pysäkiltä toiselle isoympyrää pitkin, muu pallo hämärä 0,55 | ohut kuumuusutu | kallistus 20–30° maaston yllä (Omo, Rift) | savanni, jokilaakso, meren ranta |
| Ulos Afrikasta (7–10) | kaksi keilaa ylityksissä (lähtö heikko, määränpää kirkas) | merisumu rannikolla | vanan rintama hehkuu ja maalaa rannikkoa | vuoristotuuli, ruohikko, sademetsä, rannikkomeri |
| Luolat (11, 18) | keila kapenee soihduksi (1900 K, lepatus), kuva soihdun valossa | pöly valossa | lähempi kuva | luola |
| Kylmä (12–14, 17) | kylmä keila (6500 K), vaaleat reunat | jää-usva matalalla, lumihiutaleet | Beringia matalalta kallistettuna | arktinen tuuli, tundra |
| Amerikat (15) | keila seuraa rintamaa etelään | sadeusva | pitkä saattolento rintaman takana | metsäsade |
| Aikahyppy (16) | valo sammuu hetkeksi, pallo kelautuu | pyörresumu, harmaa | kello rullaa takaisin (50 ka) | kylmä tuuli |
| Tyynimeri (19–20) | kuunvalo (sininen) ja ohut keila saariin | matala merisumu | kanoottireitti matalalta | avomeri, rantalinnut |
| Loppu (21) | kaikki keilat pois, koko pallo syttyy, viisi virtaa hehkuu | sumu hälvenee | vetäytyminen koko palloon | hiljainen tuuli, musiikki nousee |

**Kaikissa jaksoissa:**
- Havainnekuva nousee valokeilasta: vinjetti ja hidas Ken Burns kertojan ajan.
- Kuvan aikana hämärä syvenee (0,55 → 0,7), ja kohteen korostusrengas sykkii.
- Vanan kärjessä on hehkuva rintama ja sen takana tasainen, vanhempi sävy (paketin rintamavärit).
- Hyvin kevyt bloom valolle ja rintamalle, jos kehysbudjetti sallii.

## Rajapinnat ja työnjako

- **Natiiviseppä (pallo):**
  - `KarttaKerrokset.Valokeila(lat, lon, sadeKm, pehmeys, hamaryys, kestoS, vari, lisakirkkaus)`: kaksi keilaa, hämärä
    vain pohjaan ja laattoihin, siirto isoympyrää pitkin. Sovittu, ja ensimmäinen erä on työn alla.
  - `Sumu(korkeudetKm[], tiheys, kestoS, ajelehtiminen, vari)`: sovittu, oma erä.
  - Uusi: `Linssisiirto(dx, dy, kestoS)` (projektion pääpiste, PalloKierto).
- **Natiivi-UI:** CC-nappi, tekstityksen piilotus, `KuvanAlue` (kuvan koko, paikka ja Ken Burns) sekä id-listat.
- **Pelikoodari:** jaksokohtaisen äänimaiseman soitto ristihäivytyksellä ja kertojan alle väistävä musiikki.
- **Minä:** II-linssi ja -kerros, koreografia, Vana.shader-korjaus, CC-logiikka ja äänimaisemien hankinta.
  - Hankinta: Freesound ja Commons, CC0 ensisijaisesti, CC BY attribuutiolla, aanihaku-putki
    (tools/tehosteet/ihmisen-matka-maisemat.json), 15 tyyppiä, ämpäriin `aanet/tehosteet/ihmisen-matka/`.

## Erät

Jokaisesta erästä toimitetaan video (iPhone ja iPad) ja kehysaikamittaus (60 fps iPhonella tai perustelu).
Omistaja arvioi TestFlight-buildista.

| Erä | Sisältö |
|---|---|
| 0 | II-linssi laukussa, sama esitys (video) |
| 1 | kolme vaatimusta: CC, isot kuvat ja kartan väistö, tasaiset kaistat |
| 2 | kohdennettu valo, korostusrengas, kuva valokeilassa |
| 3 | sumu jaksoittain |
| 4 | äänimaisemat |
| 5 | vapaat kädet: kallistetut lennot, rintaman hehku, hiukkaset (pöly, lumi, soihtu), aamunkoitto, loppukuva |

## Päätettäväksi (Fable)

1. Korjataanko vanojen raidat jaettuun Vana.shaderiin, jolloin I:n raidat korjaantuvat samalla (suositus kyllä: bugi, eikä
   webissä ole raitoja), vai tehdäänkö II:lle oma muunnos?
2. Onko II erillinen linssi laukussa I:n rinnalla (suositus), vai valinta I:n sisällä?
3. Saako äänimaisemat hakea Freesoundista CC0/CC BY -ehdoin nykyisellä aanihaku-putkella (ämpärissä ei ole vielä yhtään)?
