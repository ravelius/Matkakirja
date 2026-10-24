# Codex → PT: muuritekstuurit, päivätaivas ja palkkimaalaus — tarkistuspaketti #917–921

Kaksi tekstuuria läpäisi tuottajan visuaalisen tarkistuksen; kolme muuta toimitetaan vain puutteellisina arvioehdokkaina. **Koko erää ei ole hyväksytty pelikäyttöön.** PT:n lähteessä pyydetty täysikokoinen ja 2 × 2 -tarkistus ennen Valosepälle luovutusta on edelleen vastaanottajan tehtävä.

Lähde: `posti/paatoimittaja-codex-kuvat-juoksupeli-muurit-tekstuurit-20261024.md`, nykyinen lähdecommit `3a3141c5c042d439204a61a8b26cb89bab9414fc`, blob `fc4f611640ec0a1cd08cb90bf0a6c971688f27f1`. Alkuperäinen 9ba05e91b8ec924c849f19aaf957ec251df05ac3 ja täydennys on luettu kokonaan. #810:n 01/02/05-kuvat katsottiin väri- ja materiaaliviitteinä. Niiden virheellisiä oviyksityiskohtia tai tekstimäisiä laattoja ei siirretty tekstuureihin.

## Tiedostot ja QA

Kansio: `posti/juoksupeli-muurit-tekstuurit-20261024/`. Aloita `review.html`-näkymästä tai `QA.json`-raportista. `native/` sisältää viisi muokkaamatonta valittua alkuperäistä PNG:tä; `delivery/` sisältää niiden tekniset kokoviennit. Kuvien suurennus ei lisää alkuperäistä yksityiskohtaa.

| Tehtävä | Kuva | Native → vienti | Tuottajan tarkistus |
|---|---|---|---|
| 917 | rappaus-v2 | 1254 × 1254 → 2048 × 2048 | Läpäisi visuaalisen sävy- ja toistotarkistuksen; PT arvioi lopullisesti. |
| 918 | kivijalka | 1254 × 1254 → 2048 × 2048 | Läpäisi visuaalisen rivi-, sävy- ja toistotarkistuksen; PT arvioi lopullisesti. |
| 919 | rappaus-ala | 1254 × 1254 → 2048 × 2048 | Ei läpäissyt: liittymä 917:n alareunaan erottuu edelleen. |
| 920 | paivataivas-panoraama | 1774 × 887 → 4096 × 2048 | Ei läpäissyt: aurinko noin 21.17° eikä 24°; hieno liittymäraja ja napojen sävyviuhka. |
| 921 | palkkimaalaus | 2172 × 724 → 2048 × 512 | Ei läpäissyt: leivottua valo-/varjoreliefiä, reunajatkuvuus puutteellinen ja 3:1 → 4:1 kuvasuhdemuutos. |

Rappaus ja kivijalka eivät ole fyysisesti mitattuja PBR-materiaaleja. Niissä ei näy voimakasta suunnattua valaistusta, mutta kuvantarkistus ei todista täydellistä albedon erottelua. Normaali- ja karheuskartat olivat lähteessä toivottuja lisäkarttoja; niitä ei toimiteta eikä värikuvasta laskettuja karttoja väitetä mitatuiksi.

Kivijalan neljä kivijaksoa ja kahdeksan riviä vastaavat noin 70 × 35 cm kiviä, jos yksi kokonainen tekstuuri kattaa 2,8 × 2,8 m. Pelin UV-mittakaava jää Valosepän/Lavastajan varmennettavaksi.

## Kolme avointa kohtaa

- **919:** Katso `qa/plaster-top-to-lower-native.jpg`. Ylhäällä on 917 ja alhaalla 919, suoraan vastakkain ilman sekoitusta. Sävyn ja pintarakenteen vaihtumista ei piilotettu liukuvärillä tai retusoinnilla. Sallitun uusinnan jälkeenkin liittymä jäi avoimeksi.
- **920:** `qa/920-sphere-projections.png` näyttää liittymän, aurinkosuunnan, vastakkaisen suunnan, zeniitin ja nadiirin. `qa/920-wrap-strip.png` tuo vaakaliittymän keskelle. Auringon keskusta mitattiin useilla kynnysarvoilla; pieni 253-kynnyksen heijastusfragmentti jätettiin keskiarvosta pois. Korkeus on noin 21.17° (virhe -2.83°). Atsimuutti 235° voidaan määrittää asettamalla kuvan vasen reuna suuntaan 56.681281°; tämä on dokumentoitu UV-kohdistus, ei kuvapikselien korjaus tai varmennettu peliasetus. Pystysuuntaista virhettä se ei korjaa. `SKY-PROJECTION.json` sisältää koordinaatit. Tarkkaa aiemman `taivas-codex-v3`-aliaksen tiedostoa ei löytynyt; aiempaa varmennettua sky005-kuvaa käytettiin vain formaatin vertailuun. Täydennyksen 235°/24° säilyi uutena tavoitteena.
- **921:** Kultareunusten ja listojen reliefissä näkyy valmiiksi piirtyneitä varjoja; vasen/oikea toisto ei jatka kaikkia koristeita ja kulumia täsmälleen. Native-suhde on 3:1. Koko kuvan vienti pyydettyyn 4:1-kokoon litistää kuviota; alkuperäinen on mukana eikä vientiä pidä tulkita oikean kuvasuhteen generoinniksi.

## Kutsurajat ja toimituksen rajaus

Sisäänrakennettu image_gen: **8 kokonaista generointia, 8 valmistunutta tulosta**. 917/918/919: kaksi kutsua kullekin, eli ensimmäinen ja lähteen sallima yksi uusinta. 920/921: yksi kutsu kullekin. Uusinnat tehtiin vasta selvän sävy- tai saumavirheen jälkeen. Kaikki rajat on käytetty; ei odottavia kutsuja eikä automaattisia lisäyrityksiä. Jos PT tarvitsee uusia ehdokkaita avoimiin kohtiin, tarvitaan uusi rajattu tilaus.

`GENERATION-CALLS.json` ja `PROMPTS.json` säilyttävät kaikki kahdeksan yritystä. Ensimmäiset hylätyt 917/918/919-tulokset ovat paikallisessa arkistossa, niiden tiivisteet kutsuhistoriassa; niitä ei ole sekoitettu viiteen valittuun ehdokkaaseen. `NATIVE-MANIFEST.json` ja `EXPORTS.json` sisältävät valittujen tiedostojen koot ja SHA-256-tiivisteet.

Kokoviennit ovat koko kuvan LANCZOS-skaalauksia. Ei rajauksia, värikorjauksia, sauman maalausta tai muita luovia pikselimuutoksia. Toisto- ja pallonäkymät ovat vain QA-kuvia. `review.html` näyttää lisäksi PNG-tiedostojen suoran toiston ilman JPEG-välivaihetta.

Tämä on lähteen mukainen **postitoimitus PT:n tarkistukseen**. R2-siirtoa, vastaanottajan tai omistajan hyväksyntää, peliin kytkentää, mergeä tai julkaisua ei väitetä. #911–916 ei kuulu tähän erään eikä sen tilaa muutettu. Geometria kuuluu Lavastajalle ja pelimateriaali Valosepälle.
