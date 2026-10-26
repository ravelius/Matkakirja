# Olavinlinna: kohtaukset v2 (kertoja + keskustelu yhtenä ottona, Pulu vain napautuksesta)

Päätoimittaja 5.10.2026 klo 13.0x. Omistajan linnapalaute klo 12.4x–12.5x (iPad-ajoa katsoessaan), sanatarkasti:
- "henkilöt puhuvat toisilleen ilman minkäänlaista taukoa. ja suurin ongelma on että pulu puhuu keskutelujen väliin. olisi luontevampaa että linnan henkilöiden väliset keskustelut olisivat yksi kokonaisuus eikä pulu puhuisi niiden väliin. kertojan ääni olisi myös ehkä luontevampi kuvaamaan tapahtumia kuin pulun. pulu voisi puhua vain kun pelaaja itse osoittaa jotain kohtaa, mihin pulu voisi reagoida selitämällä."
- "elevenlabsissa saa muuten useamman kertojan samaan tiedostoon, sillä voisi saada luonnollisemman keskustelun henkilöiden välillä. … ja tärkeää että kaikki teksti yhdestä kohtauksesta on yhdessä otossa, jotta rytmi säilyy luontevana."
- "kertojan voi varmasti eriyttää omakseen, mutta linnan henkilöiden keskustelut yhteen" / "siis jos kertoja ajetaan jatkossa vain ennen ja tai jälkeen keskustelun"
- Kappelin kohtauksesta: "siinä toinen henkilö on huono ja se pitää vaihtaa" → voudin ääni vaihdetaan.
- Kortti 12.4x: kertojan uudet äänet SALLITTU, William-äänellä.

## Rakenne joka huoneessa

1. **Kertoja** (oma tiedosto, William): yksi lyhyt kuvaus ENNEN keskustelua. Ei koskaan keskustelun keskellä.
2. **Keskustelu**: huoneen kaikki henkilöiden repliikit YHTENÄ monipuhujaottona (ElevenLabs Text to Dialogue), yksi pyyntö per kohtaus, yksi otto, ei vertailuottoja. Tauot ja rytmi tulevat otosta, ei liitoksista.
3. **Pulu ei puhu esittelyssä lainkaan** (ei kohta-, reaktio-, intro- eikä kuunnelman Pulu-rivejä). Pulu puhuu vain pelaajan napautuksesta: hahmo → Pulun reaktio hahmolle; esine tai kohta → taulun faktakohta tai Pulun entinen kuunnelmarivi (esim. fatabuurin vihje kankaista). Nykyiset Pulun äänitiedostot käytetään sellaisinaan.

## Generointi (Pelikoodari)

- Keskustelut: Text to Dialogue, hahmojen nykyiset äänet, paitsi **vouti = uusi ääni** (yksi suositus: v4-yhteensopiva, ei fi-merkintää, paljon käytetty, jämäkkä keski-ikäinen mies). Aikaleimat puhujittain (with-timestamps), jotta puhuva hahmo ja avainsanat tahdistuvat.
- Malli v4, jos Text to Dialogue tukee sitä. Jos vain v3 → JUMI → Päätoimittaja (omistaja päättää).
- Kertoja: Iv4 William `oae6GCCzwoEbfc5FHdEu`, eleven_v4, oletusvakaus (ei stability-kenttää), style 0, ei tageja, vuosiluvut sanoina, yksi pyyntö per teksti, RMS −17,2 dB + alimiter 0.97. Jos avauskierroksen 4 kertojajaksoa (linna-kertoja-*) eivät ole Williamia, generoi nekin samoilla teksteillä, niin linnassa on yksi kertoja.
- Tasot: keskustelut nykyisten hahmorepliikkien tasolle, kertoja Williamin tasolle. Raakatiedostot talteen.

## Kohtaukset

### Laituri
Kertoja: Laiturilla soutaja kiinnittää venettään, ja renki nostaa säkkejä rantaan. Vene oli saarilinnan elinehto: myöhemmin linnalla oli peräti yhdeksän suurta kavassia.
- Soutaja: Kaikki tulee vesitse: kivi, kalkki, kala ja vouti. Ilman venettä tämä linna olisi pelkkä kivikasa saaressa.
- Renki: Isoisä souti kiveä, kun linnaa rakennettiin. Proomuissa istui toista kymmentä haarniskamiestä vahdissa.
- Soutaja: Ja tänään vouti kysyi, onko joku vienyt jotain veneellä yli salmen. Kukaan ei ole vienyt mitään – paitsi minun hermoni.

### Fatabuuri
Kertoja: Kellotornin holvissa on fatabuuri, ruotsiksi vaate- ja tavara-aitta. Hoitaja laskee tavaroita kirjaansa, kun renki tulee holviin.
- Hoitaja: Kolme viittaa, kaksi verkaröijyä, tusina tinakannuja. Kaikki kirjaan – muuten vouti kysyy.
- Renki: Arkun kansi oli raollaan, kun tulin. Joku on käynyt täällä ilman lupaa.
- Hoitaja: Ilman lupaa? Kellotornin holviin ei tulla kuin avaimella. Tämä on linnan arvotavaran varasto, ei mikään ruokakellari.

### Kierreportaat
Kertoja: Kapeat kierreportaat nousevat tornin kerroksesta toiseen. Kirjuri kiirehtii ylös kirjeineen, ja portaissa häntä vastaan tulee renki.
- Kirjuri: Kolmas kerros, neljäs kerros… Ilman voudin sinettiä ei yksikään kirje lähde linnasta, ja minä juoksen näitä portaita edestakaisin.
- Renki: Varovasti, herra kirjuri, näissä portaissa ei ohiteta ketään. Kapeaa ja ahdasta – vihollisellekin, kiitos siitä.
- Kirjuri: Viisi kerrosta, ja ylin asuttu on kolmas. Neljännellä vain tuuli ja vartijat. Minä en ole kumpaakaan.

### Muurinharja
Kertoja: Muurin harjalla kulkee avoin puolustuskäytävä. Vartija tähyilee itään, ja hänen vierellään seisoo talonpoika, joka on kerran puolustanut näitä muureja.
- Vartija: Tuuli viiltää, ja silti täällä harjalla ei nukuta. Itäraja on lähempänä kuin luulisi.
- Talonpoika: Minä seisoin tällä samalla harjalla vuonna 1495, kun ne tulivat. Kiviä ja nuolia alas, ja piiritysportaat perään.
- Vartija: Silloin vouti Kylliäinen komensi kuin olisi syntynyt haarniska päällä. Nykyisestä voudista en tiedä – se etsii jotain kaikista kolmesta tornista.

### Kappeli
Kertoja: Kirkkotornin kolmannessa kerroksessa on linnan kappeli, ja kynttilät on jo sytytetty. Kappalainen valmistautuu iltarukoukseen, kun vouti astuu sisään ajatuksissaan.
- Kappalainen: Dominus vobiscum… Herra vouti, iltarukous alkaa, ja te seisotte käytävällä kuin kadonnutta lammasta etsien.
- Vouti (UUSI ÄÄNI): Anteeksi, isä. En etsi mitään. Laskin vain vihkimäristit – kaksitoista, niin kuin aina.
- Kappalainen: Laskekaa mieluummin syntinne. Ja siirtykää: tuon pienen aukon takana sairaat odottavat näkevänsä alttarin.
- Vouti (UUSI ÄÄNI): Fatabuurin avain… missä minä sitä pitelinkään?

### Keskushalli
Kertoja: Keskushallin alakerrassa on Linnantupa, sotaväen ruokasali. Linnassa asui jopa kaksisataa henkeä, ja iltaisin tuvassa on tungosta.
- Apulainen: Tietä, tietä! Kalakeittoa Linnantupaan ja voudin pöytään ylös toiseen kerrokseen – kumpikaan ei odota.
- Vartija 2: Kolme kuutosta! Maksa, kun vielä kehtaat.
- Vartija: Puhu hiljempaa. Vouti ravaa tänään portaissa kuin päätön kana – jotain on hukassa.
- Talonpoika: Ja me lämmitellään täällä alhaalla. Hormeja myöten paras lämpö nousee voudin kamariin.

### Keittiö
Kertoja: Keittiö on pienellä linnanpihalla, ja valtavissa padoissa porisee ilta-ateria. Kokki komentaa, ja vesipoika kantaa sankoja sisään.
- Kokki: Kalaa ja naurista, naurista ja kalaa! Jos vouti vielä kerran kysyy, mitä tänään syödään, sanon: samaa mitä järvi ja pelto antaa.
- Vesipoika: Kaksi sankoa lisää. Tuli on palanu aamusta asti – kohta tää keittiö kiehuu itekin.
- Kokki: Vie tää vati Linnantupaan sotilaille. Yläsaliin mä vien itse – siellä ei kelpaa sankonkantajan likaiset sormet.
- Vouti (UUSI ÄÄNI): Kokki, en ehdi aterioimaan. Iltarukous alkaa, ja minun on vielä pistäydyttävä kappelissa.

## Hyväksyntä

Päätoimittaja kuuntelee jokaisen kohtauksen äänellisenä videona (tauot, puhujanvaihdot, tasot mitattuina) ennen omistajaa; omistaja kuulee kappelin kohtauksen uudella voudilla ensin. Juna: VIE-ikkuna, kun kuitattu (ei pidätetä junaa).
