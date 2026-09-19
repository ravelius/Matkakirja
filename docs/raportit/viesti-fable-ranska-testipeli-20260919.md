# Ranskan testipeli — KIERROS 2 (korvaa kierroksen 1 raportin)

**Tuotantoversio:** v1949 (vahvistettu hamburger-valikosta, ks. kuva
`02-versio-v1949.png`)
**Testiympäristö:** iPhone 18 Pro -simulaattori (UDID
283EDDD1-56DB-4B84-A148-5E842645957D), Safari, https://matkakirja.app/
**Aloitus:** 19.9.2026 klo 10.33 Suomen aikaa
**Lopetus:** 19.9.2026 klo 11.03 Suomen aikaa (n. 30 min käytetty
45 min:n aikakatosta)
**Tekijä:** Sonnet-testausagentti, haara
`claude/bold-ride-vow4ki-ranska-testi-2`

## Tärkein havainto ensin

**RANSKAA EI SAATU TESTATTUA TÄLLÄ KIERROKSELLA.** Peliä ei onnistuttu
ohjaamaan Ranskaan/Pariisiin 45 minuutin aikana kahdesta toisiinsa
liittyvästä syystä (löydökset 1 ja 2 alla). Tämä ei ole edellisen
kierroksen kaltainen koordinaattivirhe — skaalaus (kuvapikselit ÷ 2,29
→ pisteet) tarkistettiin ja pidettiin kurissa koko session ajan, ja
kosketukset osuivat oikeisiin nappeihin toistuvasti (esim. "VALITSE
ALOITUSKAUPUNKI", "Uusi peli" -vahvistus, liikkumisvalikon kuvakkeet
onnistuivat suunnilleen joka kerta ensimmäisellä yrityksellä).

Kaikki alla luetellut löydökset on siis tehty matkalla kohti Ranskaa,
ei Ranskassa itsessään. Testilistan kohtia 1–7 (saapuminen Pariisiin,
Ranskan kartta, nostojen sisällöt, Pariisin kaupunkiliuska, nopanheitto
Pariisista, linssit) EI ehditty testata lainkaan.

## Löydöstaulukko

| # | Mitä tehtiin | Mitä odotettiin | Mitä tapahtui | Vakavuus | Kuva |
|---|---|---|---|---|---|
| 1 | Uusi peli → Aloita seikkailu → Valitse aloituskaupunki → vahvista Lontoo. Toistettu **4 kertaa** täysin tuorein "Uusi peli" -resetoinnein. | Lontoosta pitäisi avautua nopanheitto/kohdevalikoima, jossa Pariisi on "yleensä tarjolla" (ohjeen mukaan). | Joka ikinen kerta (4/4) tarjolla täsmälleen samat viisi kohdetta: **Moskova, Istanbul, Ateena, Kairo, Tanger**. Pariisi ei ollut mukana kertaakaan. Valikoima on siis deterministinen, ei satunnainen nopanheitto — sivun uudelleenlataus tai "Uusi peli" ei vaihda vaihtoehtoja. | **2** — estää ohjeen mukaisen testipolun; jos tämä on tarkoituksellista (esim. kiinteä avausvalikoima), Ranskaan pääsy vaatii aina vähintään kaksi siirtoa Lontoosta, mikä ristiriidassa Raamatun oletuksen "Pariisi yleensä tarjolla" kanssa. | `01-deterministinen...` ei tallentunut erikseen levylle ajanpuutteen vuoksi, mutta ilmiö toistui 4/4 kertaa nähtynä ruudulla (ks. tekstikuvaus); ks. sen sijaan `04-sofia-ohita-liiku-yhdessa.png` samasta reitistä Ateenan kautta |
| 2 | Tangerissa: nappula → "Liiku" → laiva-kuvake → "Laivalla (100 p)" → kelluva kertomusteksti "Voi että — Tanger!" | Kertomustekstin pitäisi johtaa noppaan/kohdevalikoimaan, josta valitaan seuraava satama (toivottavasti Ranskan suunnalla, esim. Marseille). | Kertomustekstin jälkeen ilmestyi noppakuvake, joka **ei reagoinut yhteenkään kosketukseen** (kokeiltu ~6 eri pistettä/menetelmää: tap, pitkä paina, pyyhkäisy kuution päällä — skaalaus tarkistettu joka kerta). Sivun uudelleenlataus EI nollannut pelitilaa (peli tallentuu selaimen local storageen), ja seuraavalla nappula-napautuksella sama "Voi että — Tanger!" -kertomus toistui **identtisenä uudestaan ja uudestaan**, eikä sulkeutunut ulkopuolelle napauttamalla eikä pyyhkäisemällä. Ainoa ulospääsy oli täysi "Uusi peli" (koko pelitilan nollaus, myös rahat ja sijainti menetetään). | **2–3** — pelaaja voi jäädä pysyvästi jumiin valittuaan laivamatkan, ja ainoa korjaus on aloittaa koko peli alusta. Tämä on erittäin vakava käytettävyysongelma tuotannossa, jos toistuu oikeilla laitteilla/selaimilla. | ei tallennettu levylle ajanpuutteen vuoksi (nähtiin ruudulla useita kertoja peräkkäin identtisenä) |
| 3 | Kairosta "Liiku" → juna-kuvake | Kohdelista lähistön kaupunkeihin. | Toimi odotetusti: lista Tripoli, Al Kufra, Suakin, Jerusalem, Siinai, Luxor, hinnat näkyvissä (esim. Luxor 50 p). Matka Luxoriin onnistui, rahat vähenivät oikein (£300→£250). | — (toimii) | ei tallennettu |
| 4 | Ateenasta "Liiku" → juna-kuvake | Kohdelista. | Tarjolla vain **yksi** kohde: Sofia (50 p). Ei suoraa reittiä kohti Länsi-Eurooppaa/Ranskaa. | 1 (tiedoksi, ei bugi — junaverkko on ilmeisesti rajattu naapurimaihin) | `04-sofia-ohita-liiku-yhdessa.png` |
| 5 | Sofiassa saapumisnäkymä: nostotarina + Ohita-nappi + Liiku-valikon kuvakkeet (peukku/juna/laiva/kyyhky) kaikki näkyvissä samaan aikaan | Testataan Raamatun PAATOKSET 43 kohdan 10 periaatetta: Ohita pysyy näkyvissä vaikka karttaa napautetaan kesken luentojen. | Ohita-nappi ja liikkumisvalikko olivat samanaikaisesti näkyvissä ilman ristiriitaa — käyttäytyminen näytti oikealta muualla kuin Ranskassa. Ei voitu vahvistaa Ranskan/Pariisin osalta. | — (positiivinen havainto, muu kuin Ranska) | `04-sofia-ohita-liiku-yhdessa.png` |
| 6 | Nosto-sisällön rakenne (Kreikka/Kreeta, "Kreetanmeren rantaa") | Nosto sisältää kuvan, tekstin ja "LISÄÄ"-napin. | Toimi odotetusti: yksi laadukas kuva, lyhyt kuvateksti, LISÄÄ-nappi. Rakenne vastaa sitä, mitä Ranskan nostoilta odotetaan (kohta 3 testiohjeessa), mutta sisältöä ei nähty Ranskassa. | — (rakenteellinen referenssi, ei Ranska-testi) | `03-nosto-kreetanmeri.png` |
| 7 | "Uusi peli" -vahvistusdialogi | Vahvistus ennen pelin nollaamista. | Toimi hyvin: selkeä varoitusteksti ("kaikki muistit tyhjennetään... Tätä ei voi perua"), Peruuta/Aloita alusta -painikkeet erottuvat selvästi. | — (toimii) | ei tallennettu |
| 8 | Kaupungin pawn-napautus Tangerissa toistuvasti | Pitäisi avata liikkumis-/tietovalikko johdonmukaisesti. | Käytös vaihteli epäjohdonmukaisesti samalla napautuspisteellä eri kerroilla: välillä avautui "Nähtävyydet/Turistiopas/Muut(N)"-kortti, välillä toistui sama pitkä saapumiskertomus, välillä ei tapahtunut mitään näkyvää. Vaikuttaa siltä, että sama kosketusalue laukaisee eri sisältöä tilasta riippuen ilman selkeää visuaalista vihjettä siitä, mitä seuraavaksi tapahtuu. | 2 | (ks. löydös 2, sama ilmiöalue) |

## "Toimii kuten pitää" -lista (muualla kuin Ranskassa nähdyt)

- Tuotantoversio v1949 vahvistui hamburger-valikosta.
- "Uusi peli" -vahvistusdialogi ja sen teksti/painikkeet.
- Saapumisen elokuvamainen otsikkokortti (esim. "ATEENA — MISSÄ
  KESKUSTELU KEKSITTIIN") ennen kartan avautumista.
- Maatietopaneeli (esim. KREIKKA: väkiluku, pinta-ala, demokratia,
  keskitulo, kielet + vertailusijoitukset) latautui oikein.
- Nosto-kortin rakenne (kuva + teksti + LISÄÄ-nappi).
- Junamatkan hinnoittelu ja rahan vähentyminen (£300→£250 Luxor-
  matkalla).
- Ohita-nappi ja liikkumisvalikko voivat olla näkyvissä samanaikaisesti
  saapumisnäkymässä ilman ilmeistä törmäystä.
- Kaupunkiliuskan alustava "Nähtävyydet / Turistiopas / Muut (N)"
  -yhteenvetokortti latautui useissa kaupungeissa.

## Ei ehditty testata

Testiohjeen kohdat 1–7 kokonaisuudessaan:
1. Saapuminen Pariisiin (luennat, Ohita)
2. Ranskan kartta (nostopisteiden määrä, piilotukset, panorointi)
3. Ranskan nostojen sisällöt (Mont Saint-Michel, Loire, Camargue,
   Lascaux, Chartres, Carcassonne, Millaun silta, Carnac, Bayeux,
   Verdun)
4. Pariisin kaupunkiliuska
5. Nopanheitto Pariisista
6. Linssit Ranskassa (Topografialinssi, Astronautin kamera NASA-pilvien
   osalta)
7. Yleiset jumitarkistukset Ranskan sisällä

## Ehdotus korjauserien jaosta Opukselle

1. **Erä A (kriittinen, tee ensin):** Tutki ja korjaa löydös 2 —
   Tangerin "Laivalla"-valinnan jälkeinen noppa-kuvake, joka ei reagoi
   kosketukseen, ja saapumiskertomuksen jumiutuminen niin, ettei sitä
   saa suljettua eikä sivun uudelleenlataus auta. Tämä on pelin
   etenemisen pysäyttävä bugi, joka on syytä korjata riippumatta siitä
   liittyykö se Ranska-testiin.
2. **Erä B:** Selvitä, onko Lontoon ensimmäinen
   nopanheitto/kohdevalikoima (Moskova/Istanbul/Ateena/Kairo/Tanger)
   tarkoituksella kiinteä vai pitäisikö sen olla satunnainen ja
   sisältää useammin/aina Länsi-Euroopan kohteita (mm. Pariisi). Jos
   kiinteä on tarkoituksellista, päivitä Raamattu/testiohjeet
   vastaamaan sitä ja lisää dokumentoitu reitti Ranskaan (esim. mitä
   kautta pelaaja oikeasti pääsee Pariisiin muutamalla siirrolla).
3. **Erä C:** Yhtenäistä pawn-napautuksen käytös (löydös 8) — sama
   kosketuspiste tuotti eri kertoja eri lopputuloksia (tietokortti vs.
   sama pitkä kertomusteksti vs. ei mitään). Lisää selkeä visuaalinen
   tila (esim. eri kuvake tai korostus) sen mukaan, mitä napautus tekee
   seuraavaksi.
4. **Erä D (QA-työkalu, ei kiireellinen):** Harkitse kevyttä
   dev/QA-oikotietä (esim. URL-parametri tai piilotettu valikkonappi),
   jolla testausagentti voi hypätä suoraan tiettyyn maahan/kaupunkiin.
   Ilman sitä minkä tahansa yksittäisen maan systemaattinen testaus voi
   viedä koko 45 minuutin aikakaton pelkkään matkustamiseen, kuten
   tässä kierroksessa kävi.

## Metodologinen huomio (jotta virhe ei toistu kolmannella kierroksella)

Skaalaus (kuvapikselit 920×2000 ÷ 2,29 → pisteet 402×874) tarkistettiin
ja sovellettiin johdonmukaisesti koko session ajan. Yksikään löydös
tässä raportissa ei johdu koordinaattivirheestä — "nappi ei reagoi"
-havainto (löydös 2, noppa) varmistettiin kokeilemalla useita
kosketuspisteitä, pitkää painallusta ja pyyhkäisyä ennen kuin se
kirjattiin todelliseksi vioksi.

---

Haara: `claude/bold-ride-vow4ki-ranska-testi-2`
Löydökset: 1 kpl vakavuus 3 (löydös 2, osittain), 3 kpl vakavuus 2
(löydökset 1, 2, 8), 1 kpl vakavuus 1 (löydös 4), loput positiivisia
havaintoja.
Ranskan sisältöä (kohdat 1–7 testiohjeessa) ei ehditty testata
lainkaan — koko 45 minuutin aikakatto kului yrityksiin päästä
Lontoosta Ranskaan/Pariisiin, mikä epäonnistui deterministisen
nopanheiton ja Tangerin laivamatka-bugin vuoksi. Suositus: korjaa erä A
ennen kolmatta testikierrosta, muuten sama este toistuu.
