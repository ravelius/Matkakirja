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
