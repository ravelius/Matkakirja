# Pariteettikatsaus web vs natiivi, 29.9.2026 (Siirtoseppä)

Päätoimittajan tilaus 29.9. klo 10.xx: näkyvät erot webin mainin (tuotanto v2397–v2401) ja TF 1.0.43:n (476e251f) välillä,
jotka eivät ole Raamatun sallittuja poikkeuksia. Suunta, vakavuus ja korjaava rooli.

## Aineisto ja rajaus

- **Web:** tuotanto https://matkakirja.app/, `tools/pariteetti-web-kuva.mjs` (Chromium, `--use-angle=metal`).
  - iPhone 393 × 852: 12 näkymää. iPad 834 × 1194: 3 näkymää.
  - Kuvat: `proto-3d/lokit/siirtoseppa-pariteetti-20260929/web/`.
- **Natiivi:** 1.0.43:sta ei ole kokonaista laitekuvasarjaa. Laitetestaajan kuvat ovat vain istunnon sisäisiä, eikä Natiivi-UI:lla ole koko sarjaa. Käytetyt lähteet:
  - `natiivi-ui-lappu-20260929/cl2-iphone-avaukset.mp4` (BUILD 42–44 -pohja, iPhone). Ruudut kansiossa `siirtoseppa-pariteetti-20260929/natiivi/`.
  - `natiivi-ui-lappu-20260929/cl1-*` ja `natiivi-ui-pelaaja-20260929/`.
  - 28.9. vanhemmat: `natiivi-ui-1035/`.
- **Menetelmä:** kolme Sonnet-vertailijaa rinnakkain (A kartta, B kortit, C valikot). Siirtoseppä tarkisti jokaisen korkean tai keskivakavan rivin itse kuvaparista. Neljä riviä hylättiin: väärä pari, tilaero tai sallittu. Ne on lueteltu lopussa.
  - Raakavertailut: `siirtoseppa-pariteetti-20260929/vertailu-{A,B,C}.md`.
  - Sallittujen lista: `siirtoseppa-pariteetti-20260929/sallitut.md`, koottu Raamatusta (origin/main).

## Löydökset (ei sallittuja eroja)

| # | Näkymä | Ero | Suunta | Vakavuus | Korjaa | Kuvapari |
|---|---|---|---|---|---|---|
| 1 | Yläpalkin pilleri | Web: "400 £ · Päivä 1, aamu". Natiivi: "400 £ 1/80", eli päivä ja vuorokaudenaika puuttuvat ja tilalla on laskuri. Sallittu poikkeus kattaa vain matalamman palkin ja logon puuttumisen, ei sisältöä. | natiivi eri | keski | Natiivi-UI | web/w03 · natiivi/video-t1 |
| 2 | Saapumisen valokuvakortti (fokusvirta, Ohita) | Web: kallistettu polaroid, jossa valkoinen kehys ja kuvateksti ("Ateena, 1873. …"). Natiivi: pelkkä kuva ilman kehystä ja kuvatekstiä. **Epävarma:** natiivin kuva on videoruutu, joten kyse voi olla siirtymän välitilasta. Tarkistettava pysäytyskuvasta. | natiivi eri | keski | Natiivi-UI | pari-valokuvakortti.jpg (vasen web, kolmas natiivi) |
| 3 | Yläpalkin ratas (Äänentasot) | Webissä on ratas ja ☰. Natiivin iPhone-kuvissa näkyy vain ☰, ja rataspaikka on mustan KOKEET-peitteen alla. **Epävarma:** Äänentasot voivat olla natiivissa ☰:n alla. Tarkistettava. | natiivi eri? | matala | Natiivi-UI | web/w07 · natiivi/video-t1 |
| 4 | WEB: valokuvakortti | Ohita-nappi osuu kuvatekstin viimeisen rivin päälle ("ilman ~~Ohita~~ kultaa."). | web vika | keski | Pelikoodari | web/w05 |
| 5 | WEB: kortti kortin päällä | Valokuvakortti (nosto tai fokusvirta) avautuu auki olevan maakortin tai kaupunkilehden päälle, jolloin kaksi lappua on auki yhtä aikaa ja alempi jää sumennettuna näkyviin. Kuvaaja toisti tämän kahdesti. | web vika | keski | Pelikoodari | web/w05 (tausta), i04 |
| 6 | WEB iPad: Liiku | Liiku-nappi osuu Kreetanmeren meren nimiöön, eikä sillä näy nappipohjaa (834 × 1194). | web vika | matala | Pelikoodari (+ Karttaseppä, jos nimiö siirretään) | web-ipad-liiku-kreetanmeri.jpg |

Vastaavat hyvin: kartan tyyli ja merkit, Pulun paikka ja koko, kartuscha (pieni muoto), maakuntakortti (rakenne, kuva, lähde, kysymykset), matkalaukun MATKA-osio ja kaupungin nosto-minikortti (kuva, kuvateksti, HAVAINNEKUVA, LISÄÄ).

## Hylätyt tai sallitut (eivät vaadi korjausta)

- **"Nostokortti eri muotoinen":** väärä pari. Web-kuva oli saapumisen valokuvakortti, jonka oikea vertailu on rivi 2. Natiivin LISÄÄ-minikortilla ei ole web-paria tässä sarjassa.
- **Silmänappi selitteen alla:** kehittäjän Pelaajan näkymä -apunappi (#3608), näkyy vain maailmatilassa.
- **"Kysy ~~viisaalta pöllöltä~~ pululta":** tarkoituksellinen, sama webissä (`js/fokusnosto.js` `yli:`).
- **Natiivin maakuntalappu, jossa pikkukuva:** Päätoimittajan päätös 28.9. Mininosto on natiivin, ja webin luonnehdintaan ei lisätä kuvaa.
- **Paikkapilleri "Ateena" vs "Ateena, elokuussa 1873":** natiivin laajenemisanimaatio. Myöhempi ruutu näyttää täyden tekstin.
- **Pulu-chatin mykistyskuvake:** tilaero (puhuu, hiljaa).

## Ei vertailtu (natiivikuva puuttuu)

Näistä näkymistä tarvitaan tuore natiivin pysäytyskuva, ja luonteva ottaja on Laitetestaaja tai Natiivi-UI seuraavalla laitekierroksella:
- kaupunkilehti (hero, nähtävyyskartta, Turisti-info)
- päävalikko ☰ (natiivi-ui-1035:n "valikko"-kuvat ovat lukijan alavalikko)
- ratas / Äänentasot
- karttaselitteen Nostot-välilehti
- auki oleva kartuscha (maan tietokortti)
- aloituskaupungin valinta
- matkalaukun tilastot samassa tilassa
- linssit: web-linssiä ei tavoitettu kuvaustyökalulla, natiivista on Keksinnöt 1769 -ruutu.

Tallennettu pysäytyskuvasarja 1.0.43:sta nostaisi kattavuuden noin 40 %:sta lähes täyteen.

## Muut huomiot

- `pariteetti-web-kuva.mjs`: etusivun kuva ei terävöidy Playwrightissa edes metal-lipulla ("avaus-kesken" yli 15 s). Työkalun ohje sanoo, että tämä ilmoitetaan Pelikoodarille.
- Pallon aloituskaupunkien napautus ei osu hiiren klikkauksella tuotannossa, vain kosketuksella (`page.touchscreen.tap`, hasTouch). Tämä on huomio työkalulle, ei välttämättä pelivika.
