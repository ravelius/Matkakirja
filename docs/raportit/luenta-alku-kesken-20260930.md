# Luennan alku kesken (kärki 30.9.2026) — juurisyy ja korjaus

Linssiseppä 2, 30.9.2026. Omistaja, TF 1.0.64, iPhone, kaiutin: "Isoisän luenta alkaa vieläkin kesken kappaleen" ja
"Myös noston luenta alkaa väärästä kohtaa". Tarkennus: alusta puuttuu 1–2 virkettä (noin 3–8 s), määrä vaihtelee, ja
vika näkyy sekä uusissa että vanhoissa kohteissa. Omistajan tilarivillä (kaappaus klo 6.59) on äänetön tila päällä.

## Poissuljettu mittaamalla

| Epäilty | Tulos | Aineisto |
|---|---|---|
| Äänite puutteellinen | 45/45 horatio-äänitettä ehjiä: 10,4–12,4 mrk/s (mediaani 11,6), 1. sana 0,14 s:ssa aikaleimoissa | sisalto/1/v355 luennat.json + aikaleimat |
| Kortin teksti ≠ äänite | 45/45 täsmää (luennat.json teksti = fokusvirran matkakirja.teksti) | fokusvirrat.json |
| Luenta jatkaa muistetusta kohdasta | KortinLukija.jatkoKohta on olion kenttä ilman avainta ja PlayerPrefsiä, nollautuu jokaisessa sisällön vaihdossa; isoisän luento ei käytä sitä | koodi |
| Soitto alkaa kesken | Puhe soittaa aina näytteestä 0; 1. soiva kohta 0,043 s, soittokohta etenee 1,0 s/s | 1.0.64-appi simulaattorilla (A/B/C), iPad 49/49 |
| Musiikki tai tausta peittää | Puheväylän oma RMS ≈ master heti 1. jaksossa (0,25 s); tausta vaimenee puheen alla ~0,002:een | verhomittari (linssiseppa2/luenta-verho) |
| Raskaat ruudut hidastavat vaimennusta | 400 ms/ruutu 6 s: sama tulos, ei peittoa | puhe hidas 400 6 |
| DSP seisoo | DSP-kello etenee jokaisessa jaksossa | verhomittari |

Unity-taso on kunnossa simulaattorissa ja iPadissa. Kumpikaan ei voi nähdä äänetöntä tilaa (ei kytkintä).

## Juurisyy (vahvistus omistajalta kesken)

1. Unityn regressio (6000.0.73f1 alkaen; meillä 6000.3.24f1): `FMOD::OutputCoreAudio::reset()` palauttaa
   AVAudioSessionin taustasiirtymässä Playbackista **Ambientiin** (Unity Discussions: "FMOD resets AVAudioSession category
   to Ambient during background transition", Unityn henkilökunta tutkii). Myös käynnistyksessä istunto on Ambient
   (iPad 4/4: "istunto vaihdetaan (Ambient / Default → Playback …)").
2. **Äänetön tila mykistää Ambientin** (Playback ei mykisty).
3. Koodi varmisti Playbackin vain kerran sovelluksen elinaikana (Puhe ja Aanisoitin, staattinen lippu) ja AaniIstunnossa
   fokus-, tauko- ja kokoonpanotapahtumissa (1 s:n salpa). Puheen alussa luokkaa ei tarkistettu.

Ketju: omistaja käy toisessa sovelluksessa (esim. Claude) → FMOD nollaa istunnon Ambientiksi → äänetön tila mykistää
pelin äänen, kunnes jokin tapahtuma asettaa Playbackin uudelleen → luennan alku ei kuulu.

Ratkaiseva koe omistajalle: sama saapuminen äänetön tila pois. Jos alku kuuluu, juurisyy on vahvistettu.

## Korjaus (haara linssiseppa2/istunto, proto)

- `MatkakirjaAani.mm` istuntovahti: palauttaa Playbackin (SpokenAudio, MixWithOthers), kun luokka vaihtuu Ambientiin tai
  SoloAmbientiin (reitin vaihto, yhdistetty 0,4 s), keskeytys loppuu, mediapalvelut nollautuvat tai sovellus palaa
  etualalle (0,3 ja 1,5 s). PlayAndRecord (Pulun äänikeskustelu, sanelu) ja Playback jätetään rauhaan; kehä rajataan
  8 korjaukseen 2 s:ssa ja jälkitarkistus 2,5 s:n päästä. Jokainen vaihto NSLogiin.
- Puhe tarkistaa luokan juuri ennen jokaista Play()-kutsua, Aanisoitin jokaisen raidan alussa (ennen kerran).
- Uusi puhe alkaa vasta, kun DSP-kello etenee (FMOD:n ulostulon uudelleenkäynnistys taustasiirtymän jälkeen); seisahdus
  lokiin "ulostulo seisoi … ms ennen soittoa".
- Verhomittari (puhe verho 1|0) ja testikomento puhe hidas jäävät mittareiksi.

## Päivitys klo 11 — omistajan tallenne: hyppy eteenpäin, ei mykkä jakso

Omistaja kokeili äänetön tila pois: ei auta, joten Ambient + äänetön tila EI ole juurisyy. Istuntokorjaus
(linssiseppa2/istunto) on silti oikea ja menee junaan.

Omistajan näyttötallenne (iPhone 17 Pro, TF 1.0.64, kaiutin, Lontoo → Edinburgh, 39 s) ristikorrelaatiolla (10 ms verhot
ja aaltomuoto) sekä 10 fps kehyksillä:

| Tapahtuma | Tallenne | Näyttö |
|---|---|---|
| Iskulause | 10,12–15,71 s, kohdasta 0 loppuun (r 0,76–0,95) | traileri |
| Hiljaisuus | 15,75–19,25 s (−66…−94 dBFS) | trailerin kuvat ja kirjaimet 18,8 s asti |
| Kortti Edinburghiin | — | 19,2 s (verhon alla "Lontoo" 18,95 s asti) |
| Isoisä kuuluu | 19,5 s → **äänitteen kohta 6,63 s** (r 0,84–0,99) | luentakuva 19,5 s |

Isoisä käynnistyi noin 19,4 s ja kuului heti, mutta kohdasta 6,6 s: soittokohta hyppää alussa eteenpäin. Äänitteen
alusta ei ole jälkeäkään tallenteessa (r ≈ 0). M5-iPadilla sama noin 20 s ("vain viimeiset sanat").
Omassa iPad Pro 13:ssa (kehitysappi 1.0.61, Edinburgh kahdesti) ja simulaattorissa Unity ilmoittaa kohdan oikein
(1. soiva 0,043 s, 1,5 s:n kohdalla 1,49), eikä sisäinen mittaus näe purkukohtaa.

Päähypoteesi: laitteella pakattu mp3 puretaan soiton aikana (mahdollisesti laitteistopurkimella), ja todellinen
purkukohta eroaa Unityn ilmoittamasta. Ehdokaskorjaus linssiseppa2/luenta-pcm (4426b7a6): puhe PCM:ksi jo avauksessa
(compressed = false), vertailu `puhe pakattu 1`. Todennus: iPadin laitteistoääni USB:llä (Pelikoodarin IpadTallenne,
omistajan TCC-lupa) tai omistajan laite + kehitysversio (asennuslupa Natiivisepälle).

## Päivitys klo 11.30 — pakattu mp3 pääepäiltynä, FMOD-tason mittari

- **Aikajärjestys:** puhe ja soitin siirtyivät pakattuun muistiin (`DownloadHandlerAudioClip.compressed = true`) proto-commitissa
  4879c355 24.9. (build 22). Kaikki omistajan kohta-oireet ovat sen jälkeen: 27.9. TF 1.0.32 "luenta pomppasi kohtien
  yli", 28.9. 1.0.39 "noin 15 s päästä hyppää alkuun" (isPlaying yhden ruudun epätosi), 29.9. noston 1. napautus alkoi
  virkkeen puolivälistä ja 30.9. 1.0.64 isoisän alusta puuttuu 1–2 virkettä.
- **Hyppy ei ole virkeraja:** Edinburghin kohta 6,63 s osuu keskelle sanaa "myyneet" (aikaleimat 6,30–6,70), eli
  palalogiikka ja jatkokohta eivät selitä sitä. Iskulause (trailerin saapumispuhe) soi samalla Puhe-lähteellä ennen
  luentoa, joten luennan Play on iskulauseen jälkeen, ja kohta 6,63 s kuuluu heti Play-hetkestä. Puhe-lähteen prioriteetti
  on 0, joten virtuaaliääneksi siirtyminen on poissuljettu. Äänite on CBR 128 kbps ja ID3-otsake 45 tavua, joten kelausarvion
  virhe on poissuljettu.
- **FMOD-tason mittari ilman laitteistotallennetta:** verhomittarin puheväylän oma RMS (`AudioSource.GetOutputData` = FMOD:n
  purkama sisältö) kohdistetaan äänitteen RMS-verhoon (`verho_kohdistus.py`). Simulaattorissa pakattuna: Barcelona r 0,99
  siirtymällä 0 s ja Marseille (400 ms:n ruudut) r 0,84 siirtymällä +0,14 s, eli purin soittaa ilmoitettua kohtaa.
- **Laitteistotason mittari:** `kohdistus.py` (10 ms:n dB-verhot, Pearson) toistaa omistajan tallenteen tuloksen (isoisä
  kohdasta 6,63 s, iskulause alusta).
- **Seuraavaksi:** PCM on 1.0.68-junassa (de11ce65). iPad Pro 13 -laitekäännös 4426b7a6 (Natiiviseppä) → A/B `puhe pakattu 1`
  vs `0` Lontoo → Edinburgh, musiikki ja maisema päällä, ABAB. FMOD-tason tulos tulee verhoriviltä. Laitteistotaso saadaan
  IpadTallenteella, kun iPad on kytketty suoraan Maciin (USB 2 -keskittimen takana '!dev').

## A-ajo klo 11.29 — iPadin laitteistoääni, pakattu mp3: vika ei toistunut

iPad Pro 12,9" (5. sukupolvi, M1, iOS 26.4.1), kehitysversio (release, 8f04fa16: ääni- ja puhekoodi sama kuin TF 1.0.64:n
01051a6f), musiikki ja maisema päällä, kaiutin, Lontoo → Edinburgh bussilla. Pelikoodarin IpadTallenne 90 s (48 kHz),
kohdistus 10 ms:n verhoilla:

| Klippi | Unityn Play (loki) | Äänitteen 0-kohta tallenteessa | Kuuluva alku |
|---|---|---|---|
| Iskulause (3526c02a) | 11.29.23,232 | +0,58 s (hiljaisuus 4,0–7,0 s, ääni alkaa 0-kohdassa) | alusta |
| Isoisä, Edinburgh | 11.29.32,754 | +0,56 s | kohta 0,21 s, r 0,99–1,00 loppuun asti yhdellä viiveellä |

Vakio +0,56–0,58 s on lokin ja kaappauksen viive. Tällä laitteella pakattu mp3 soi alusta. Omistajan laitteet (iPhone 17 Pro,
M5-iPad) ovat uudempaa sukupolvea. Unity varoittaa itse, että pakatun raidan ilmoitettu kohta ei välttämättä vastaa
todellista kohtaa, koska paketti voi olla 2–3 s ([AudioSource.time](https://docs.unity3d.com/ScriptReference/AudioSource-time.html)).
Sisäinen "1. soiva kohta 0,043 s" ei siksi todista laitteen purkukohtaa. PCM-klipillä ilmoitettu ja todellinen kohta
ovat samat. Aineisto: proto-3d/lokit/linssiseppa2-ipad-ab-20260930/k5-pakattu/ (ipad.mov, -16k.wav, kohdistus, konsoli).

## TF 1.0.67 samalla iPadilla klo 11.36–11.43 (omistaja pelasi käsin): vika ei toistunut

Uusi peli Ateenasta ja bussilla Sofiaan, musiikki ja maisema päällä. Laitteistotallenne k6 (150 s) ja k7 (240 s):

| Klippi | Kuuluva alku | Kohdistus |
|---|---|---|
| Ateenan luenta (aloitussaapuminen) | 11.37.22,1 | kohdasta 0,06 s loppuun (30,8 s) yhdellä viiveellä, r 0,96 |
| Sofian iskulause | 11.38.29,2 | alusta (r 0,92) |
| Sofian luenta | 11.38.38,6 | kohdasta 0,00 s (r 0,98); 1,2 s:n tauon jälkeen sama nollakohta (r 0,98), ei hyppyä |

Omistajan havainto "äänilähde vaihtui iPadin sisäiseen kaiuttimeen, kun saavuttiin Sofiaan" oli tallenteen loppu. k6 päättyi
11.38.43, 4,7 s Sofian luennon alun jälkeen, ja iPad palautti äänen omaan kaiuttimeensa. k7 sai vain maiseman (huippu
−41 dBFS), koska peli oli jo levossa. Peli ei vaihtanut reittiä itse.

**Johtopäätös:** kolme luentoa M1-iPadilla (kehitysversio ja TF 1.0.67) alkoivat laitteistotasolla alusta. TF:n ja
kehitysversion välillä ei ole eroa, ja äänikoodi on sama. Vika näkyy omistajan uudemmilla laitteilla (iPhone 17 Pro, M5-iPad
Pro) tai niiden istuntotilassa. 1.0.68 (PCM + istuntovahti) on korjausehdokas, ja omistaja todentaa sen omalla laitteellaan.
Jos hyppy toistuu 1.0.68:ssa, seuraava askel on kehitysversio M5-iPadilla (omistajan lupa) IpadTallenteen ja
verhomittarin kanssa. Aineisto: proto-3d/lokit/linssiseppa2-ipad-ab-20260930/k6-tf-1067/ ja k7-tf-sofia/.
