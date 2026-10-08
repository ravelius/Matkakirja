# Sonniss GDC: poiminta, laatu ja paketointisuunnitelma (Pelikoodari 9.10.2026 klo 00.1x)

PT 00.08: purku T7:lle vain tarvittavista kategorioista, sitten laatutarkistus ja taulukko.
Data on T7:llä eikä repossa (lisenssi: ei avointa jakelua).

## Mistä aineisto tulee

| Mitä | Missä |
|---|---|
| Lataukset | `/Volumes/T7 4TB/sonniss/<vuosi>/*.zip` (lataus.log, vain OK-rivit) |
| Omistajan Safari-lataukset | `/Volumes/T7 4TB/koodaus/Soniss/*.zip` (.download ohitetaan) |
| Poiminta | `/Volumes/T7 4TB/sonniss/poiminta/<vuosi>/<aihe>/` + luettelo.json (zip, sisäpolku, kirjasto, koko) |
| Laatu | `poiminta/laatu.json` + **`poiminta/taulukko.md`** (kaikki rivit) |
| Työkalut | `sonniss/tyokalut/poimi.py`, `laatu.py`, `seuraa.sh` |

`seuraa.sh` ajaa poiminnan ja laatutarkistuksen 5 minuutin välein uusista valmiista osista. Se pysähtyy, kun
lataus.log ilmoittaa KAIKKI VALMIS ja Safarin kansiossa ei ole enää .download-osia.

**Aiheet** ovat pelin tarpeiden mukaiset (Olavinlinna 1499, pallo, sää ja vesi): tuuli, poltin, ovi,
avain/lukko, ketju/köysi, tuli, askel, vene/aallot, vesi/sade, kello, yö (sirkat, pöllö, sammakot), lintu,
kangas/lippu/purje, kivi ja puu.

**Poissulut:** moottorit, junat, aseet, sci-fi, kaupunkiliikenne ja kuntosali. Haku katsoo vain tiedostonimeä ja
kahta ylintä kansiota. Ensimmäinen versio poimi "windowsdown" tuuleen ja "train" sateeseen. Korjaus pudotti
poimittavat 101:stä 66:een (3,5 → 1,9 Gt).

## Laatumittarit

Mittarit ovat samat kuin pelin äänten QA:ssa:

- AST-tunnistus valmiilla mallilla. Tämä ei ole koulutusta, joten Sonnissin tekoälykielto ei koske sitä.
- Odotettu luokka aiheen mukaan.
- Vieraat äänet: puhe, musiikki, liikenne, linnut, eläimet. Linnut ja eläimet sallitaan yö- ja lintuaiheissa.
- Leikkautuminen mitattuna stereona, huippu, kohinapohja sekä lähdeformaatti.

Kahdessa tapauksessa tunnistus ei hylkää ääntä, koska AST arvioi ne epäluotettavasti (8.10. QA):

- foley (lukko, puu, ketju, ovi, kangas, askel, kivi)
- alle 2 sekunnin äänet

Niissä taulukon huomautus on "kuuntelu ratkaisee".

## Ensimmäinen vuosi: 2017, osat 1–3 / 9

66 tiedostoa, joista 44 OK. Kaikki ovat 24-bittisiä, 48–192 kHz.

| aihe | OK / kaikki | huomio |
|---|---|---|
| vesi/sade | 14 / 17 | RATH-sadesilmukat (hard, thunder, plastic), metsäsade, purot, suihkulähteet: hyviä Sää-pohjia |
| yö | 5 / 5 | sammakot, sirkat ja yölinnut: kesäyön tausta (Olavinlinna, elokuun yö) |
| lintu | 5 / 6 | aamun kylä- ja vuoristolinnut |
| vene/aallot | 4 / 6 | aallot kallioon, padon virtaus; yksi leikkautuu (38 näytettä) |
| avain/lukko | 9 / 10 | Lock01–04 ulko-oven lukot ja Latchlocker-salvat: linnan ovet; yksi leikkautuu |
| puu | 5 / 9 | 4 leikkautuu (iskut, repeämät) |
| tuuli | 0 / 6 | AST ei tunnista tuulta luonnossa (enintään 0,54), ja joukossa on lintuja tai liikennettä. Kuuntelu ratkaisee. |
| kello | 0 / 2 | temppelin laulu ja kaupunki: ei käytettäviä |
| poltin | 0 / 1 | kaasupoltin ei ole tunnistimen luokissa; kuuntelu (pallon poltin) |

Johtopäätös toistaiseksi: Sonnissista löytyy laadukkaat sade-, vesi-, yö- ja lukkoäänet. Sade-, vesi- ja yöäänet
ovat valmiiksi pitkiä ja silmukoitavia, joten nykyisten CC0-silmukoiden korvaaminen niillä on helppoa. Tuulet ja
kellot vaativat lisää vuosia, ja 2018–2024 ovat tulossa.

## Jakelu: ämpäriin normaalia reittiä (omistajan linja PT:n kautta 9.10. klo 00.20, korvaa klo 00.18 ohjeen)

Omistaja linjasi: "ei me mitään jaeta… ei kukaan muu pääse ämpäriin". Ämpäri on pelin oma, joten Sonnissin äänet sekä ostetut ja
ladatut äänet viedään sinne kuten muutkin äänet. AssetBundlea, sovelluksen mukaan pakottamista tai kirjallista vahvistusta ei
tarvita. Sovelluksen mukana -haara (faf1a9412) on poistettu, eikä sitä yhdistetä mihinkään.

**Erä 1:** vientipaketti `_valmiit/sonniss-tuulet-vienti-20261009` → `aanet/sonniss-tuulet-v1/` (2 × mp3 192k + manifest.json,
0,96 Mt, LAHTEET.md, SHA256SUMS). 16-bittiset masterit ovat T7:llä kansiossa `sonniss/silmukat/`.

| tunnus | lähde (Sonniss 2017) | valinta | taso | sauma |
|---|---|---|---|---|
| tuuli-korkea | Forest cold wind in altitude, 45–65 s | 14/14 jaksoa kelpaa; tonaalisuus 0,007, ei iskuja, puuskat 1,4 dB, ohut (matalat < 400 Hz 7 %) | −23 LUFS, huippu −11,6 dBFS | −24,7 dB, 0,5 × mediaani |
| tuuli-kostea | Quiet street, wet air, wind, 105–125 s | 16/42 jaksoa kelpaa; tonaalisuus 0,01, ei iskuja, tasainen 0,85 dB, täyteläinen (matalat 62 %) | −23 LUFS, huippu −7,9 dBFS | −28,8 dB, 0,6 × mediaani |

Siirtoseppä kytkee molemmat junaan 169:
- tuuli-kostea: SeikkailuSade, ulkoalueet Sää-tasolla
- tuuli-korkea: muurikäytävä, kirkkotornin portaat ja harja

LS1:lle on tarjottu tuuli-korkeaa pallon tuuleksi.

**Mittaus ilman omaa kuuntelua:** tuulet valittiin spektri- ja tasoanalyysillä (`spektri.py`).
- Tonaalisuus on niiden 50 ms:n kehysten osuus, joissa 2–8 kHz:n kapea huippu nousee vähintään 15 dB paikallisen
  spektrin yli. Mittari tunnistaa linnut, sirkat ja piipit.
- Iskut ovat RMS-hyppyjä, jotka nousevat vähintään 9 dB paikallisen mediaanin yli.
- Puuskat ovat 0,5 s:n RMS-tason keskihajonta.
- Vieraita AST-luokkia (linnut, hyönteiset, liikenne, puhe, musiikki, kellot) sallitaan alle 0,25.

Kellot jäivät pois. Vuoden 2017 kaksi kelloehdokasta ovat temppelilaulua ja kaupunkia, eikä niistä löytynyt
yhtään kelpaavaa jaksoa. Pelin nykyiset kellot ovat jo hyviä (Church bell 0,79–0,82, 8.10. QA).

Lisää aiheita, kuten avainnipun ja seuraavien vuosien tuulet, tulee samaan kansioon sitä mukaa kuin seuranta löytää kelvollisia.

## Alkuperäinen paketointiluonnos (korvattu PT:n päätöksellä)

Sonniss-lisenssi kieltää äänten jakelun äänitehosteina, joten niitä EI viedä avoimeksi mp3-poluksi ämpäriin.

1. **Valinta:** käyttäjä on rooli tai omistaja kuuntelun kautta, ja lähteenä taulukon OK-rivit. Leikkaus,
   silmukka ja tasot tehdään samoilla työkaluilla kuin nyt: L+F-silmukka, tanh-limitteri, −23 LUFS, kerrat −6 dBFS.
2. **Unity:** WAV tuodaan projektiin (Assets/Matkakirja/Aanet/Sonniss/<aihe>/), pakkaus Vorbis.
   - pitkät taustat: Streaming
   - lyhyet: Decompress On Load
3. **Toimitus:** Addressables-ryhmä per aihe (`sonniss-sade`, `sonniss-yo` …).
   - pieni ydin sisältyy appiin
   - isommat ryhmät etäkatalogina samaan ämpäriin uusille poluille (ei koskaan ylikirjoitusta)
   - bundle ei ole avoin äänitiedosto, joten se täyttää "paketoitu toimitus" -ehdon
4. **Ennen junaa:** Sonnissilta kirjallinen vahvistus pelin omasta palvelimesta (8.10. raportin suositus;
   omistajan päätös). Lisäksi Natiivisepältä tieto, onko Addressables jo käytössä. Natiivissa ei nyt ole
   AssetBundle- eikä Addressables-koodia.

Uusia rivejä tulee taulukkoon sitä mukaa kuin osia valmistuu. Lopuksi teen lyhyen yhteenvedon aiheittain ja
listan parhaista ehdokkaista.
