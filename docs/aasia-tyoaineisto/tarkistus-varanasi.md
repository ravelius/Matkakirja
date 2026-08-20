# Varanasi-faktapohjan riippumaton tarkistus

Tarkistin `faktapohja-varanasi.md`:n kaikki yksittäiset faktaväitteet
suoraan en-Wikipedian raakatekstistä (`action=raw`, NODE_USE_ENV_PROXY=1),
lisäksi haettu erikseen "Silk weaving in Varanasi" (ohjaa artikkeliin
**"Silk industry in Varanasi"**) ja "Benares State" -artikkelit sekä
tarkistin Ramnagarin linnoituksen koordinaatin Overpassista. Kaikki
koordinaattietäisyydet on laskettu itse uudelleen haversine-kaavalla
(Python), ei toistettu kokoajan omaa 111 km/aste-approksimaatiota.

Haetut lähdetiedostot: `wiki-varanasi.txt`, `wiki-Kashi_Vishwanath_Temple.txt`,
`wiki-Sarnath.txt`, `wiki-Banarasi_sari.txt`, `wiki-Dashashwamedh_Ghat.txt`,
`wiki-Manikarnika_Ghat.txt`, `wiki-Assi_Ghat.txt`, `wiki-Ramnagar_Fort.txt`,
`wiki-Dhamek_Stupa.txt`, `wiki-Chaukhandi_Stupa.txt`,
`wiki-Silk_weaving_in_Varanasi.txt` (→ "Silk industry in Varanasi"),
`wiki-Benares_State.txt` — kaikki samassa scratchpad-kansiossa.

**Yleisarvio:** Faktapohja on erittäin huolellisesti koottu. Valtaosa
(n. 60+ yksittäistä faktaväitettä) täsmää sanatarkasti lähteisiin,
mukaan lukien kaikki 7 tarkistettavaa koordinaattia (paitsi Ramnagar,
ks. alla), koko IMD-säätaulukko (13 riviä, kaikki täsmäävät desimaalilleen),
Twain-sitaatti, Sherring/Prinsep/Weeks-viittaukset, 84 ghatia, 692 km
Delhistä, Sarnathin 8 km (vs. pääartikkelin ristiriitainen 10 km — ei
kokoajan virhe, ks. alla), Faizabadin sopimus 1775, provinssien vuodet,
Ramnagarin linnoituksen 1750/chunar-hiekkakivi, Ramlila 1830/Udit
Narayan Singh, ja jopa norsu-yksityiskohta (löytyi "Ramnagar Fort"
-artikkelista, ei "Varanasi"-artikkelista — kokoajan lähdeviittaus oli
oikea). Sisältölinjauksen noudattaminen (ei Modia, ei käytävähanketta,
ei lihakauppakieltoa) on tarkistettu koko tekstistä eikä näitä aiheita
esiinny nostoissa tai jaksoissa.

Löysin kuitenkin **7 korjattavaa kohtaa**, joista kaksi on suoria
virheitä julkaistavassa tekstissä (ei vain sivuhuomautuksissa) ja loput
tarkkuus-/lähdeviittausongelmia.

---

## Virheet ja korjaukset

### 1. VIRHE — Ganga Aartin kesto väärin nosto K1:n leipätekstissä

**Väite (K1, julkaistava nostoteksti):** "...pappien ryhmä heiluttaa
palavia öljylamppuja rytmikkäästi jokea kohti **puolentoista tunnin
ajan**."

**Oikea tieto:** Ganga Aarti kestää n. **45 minuuttia**, ei 1,5 tuntia.
Tämä on myös kokoajan OMA faktalistaus samassa nostossa: "kestää n. 45
minuuttia" — eli nostoteksti on ristiriidassa kokoajan omien
lähdemerkintöjen kanssa.

**Lähde:** en-Wikipedia "Dashashwamedh Ghat", osio "Ganga aarti": "The
Ganga Aarti starts soon after sunset and lasts for about 45 minutes. In
the summer, the Aarti begins at about 7pm... in winter it starts at
around 6pm."

**Korjausehdotus:** vaihda "puolentoista tunnin ajan" → "noin 45
minuutin ajan" (merkkimäärä pysyy lähes samana, korjaus on pieni).

---

### 2. VIRHE — Manikarnika Ghatin ilmansuunta kohdekartassa väärin (osio 4, taulukko)

**Väite:** Manikarnika Ghat "~0,9 km **E**" (itä) keskustasta.

**Oma haversine-laskelmani** (keskipiste 25,31889°N 83,01278°E →
Manikarnika 25°18′39,134″N 83°00′50,708″E): etäisyys **901 m** (täsmää
kokoajan lukuun), mutta suuntima on **171,6°** eli lähes suoraan
**etelässä** (S), vain hieman idän puolella — ei itään. Kartantekijä
sijoittaisi kohteen kartalle väärälle puolelle keskipistettä, jos
seuraa "E"-merkintää.

Sama koskee lievemmin muitakin taulukon suuntamerkintöjä: Kashi
Vishwanath -temppeli (193,6°), Dashashwamedh Ghat (190,7°) ja Assi Ghat
(190,2°) ovat kaikki käytännössä suoraan etelässä (bearing 190–194°),
lähempänä "S":ää kuin "LS":ää (lounas, 225°) — tämä on vain pieni
epätarkkuus eikä yhtä harhaanjohtava kuin Manikarnikan tapaus, mutta
kannattaa korjata samalla, jos taulukkoa muokataan.

**Korjausehdotus:** Manikarnika Ghat → "S" (etelä), ei "E". Muut
ydinalueen neljä kohdetta (2–5) voisi yksinkertaisesti merkitä "S"
kaikki, koska yksikään ei ole todellisuudessa itä- tai
lounassuunnassa vaan käytännössä suoraan etelässä.

---

### 3. KORJAUS — Ramnagarin linnoituksen koordinaatti ja etäisyys (osio 4, kohde 8)

Kokoaja merkitsi tämän oikein epätarkaksi ja pyysi tarkennusta —
tarkensin sen Overpassista pyydetyllä tavalla.

**Wikipedian infoboksi:** `{{coord|25.28|83.03}}` (2 desimaalia).

**Overpass (OpenStreetMap, way-elementti, jolla `wikidata=Q4492020`,
`wikipedia=en:Ramnagar Fort`, `name:en=Ramnagar Fort`):** keskipiste
**25,2697098°N, 83,0245479°E**.

**Ero Wikipedian infoboksin ja Overpassin välillä: ~1269 m** — reilusti
yli 100 m -kynnyksen, joten tehtävänannon säännön mukaan Overpass
voittaa.

**Vaikutus etäisyyslaskelmaan:** kokoajan oma laskelma (Wikipedian
epätarkalla koordinaatilla) antoi ~4,7 km. Overpassin koordinaatilla
oikea etäisyys keskustasta on **~5,6 km** (5595 m), suuntima 167,8°
(S/SSE) — ero on lähes 1 km / ~20 %, ei merkityksetön kartan
mittakaavan kannalta.

**Suositus:** käytä kohdekartassa koordinaattia **25,2697°N, 83,0245°E**
Wikipedian 25,28/83,03 sijaan, ja päivitä etäisyys ~5,6 km:ksi.
(Wikipedian tekstissä mainittu "14 km via Ramnagar-silta" -tieajolukema
pysyy toki ennallaan — se ei ole ristiriidassa, kuten kokoaja jo
oikein totesi.)

---

### 4. PIENI VIRHE — Dhamek-stupan koristelun ajoitus liian laaja

**Väite (H1-nosto ja footnote):** "koristelu Gupta-kaudelta
(300–500-luku)".

**Lähde (en-Wikipedia "Dhamek Stupa"):** "the stone facing displays
delicate floral carvings characteristic of the Gupta era... The
contemporary profile of the Dhamek Stupa has been conclusively dated
to the Gupta Empire and **the 5th-6th century CE**."

Artikkeli ajoittaa koristelun nimenomaisesti 400–500-luvulle, ei
300-luvulle asti. "300–500-luku" on turhan laaja/epätarkka.

**Korjausehdotus:** "koristelu Gupta-kaudelta (400–500-luku)" tai
"5.–6. vuosisadalta".

---

### 5. LÄHDERISTIRIITA, EI MERKITTY — Kashi Vishwanathin kultauksen vuosi (K3)

Kokoaja siteeraa kultausvuotta 1835 kahdella lähteellä yhdessä:
"en-Wikipedia 'Varanasi' / 'Kashi Vishwanath Temple'" — mutta nämä
kaksi Wikipedia-artikkelia ovat itsessään **eri mieltä** vuodesta:

- "Kashi Vishwanath Temple" -artikkeli: "In 1835, Maharaja Ranjit
  Singh... donated 1 tonne of gold for plating the temple's dome."
- "Varanasi"-pääartikkeli: "The two pinnacles of the temple are
  covered in gold and were **donated in 1839** by Ranjit Singh."

1835 on todennäköisesti oikeampi valinta (se toistuu kahdesti
"Kashi Vishwanath Temple" -artikkelissa, myös sen infoboksissa: "1835
Gold Plating"), mutta kokoajan olisi pitänyt huomata ja merkitä tämä
Wikipedia-sisäinen ristiriita eikä siteerata molempia artikkeleita
ikään kuin ne tukisivat toisiaan samasta luvusta.

**Suositus:** pidä 1835, mutta poista "Varanasi" toissijaisena lähteenä
tälle yksittäiselle vuosiluvulle (tai mainitse ristiriita
kirjoittajalle).

---

### 6. LÄHDEVIITTAUSVIRHE — Manikarnika Ghatin 1302-rakennusvuosi väärässä artikkelissa (K4)

**Kokoajan footnote:** "Nykyinen pysyvä rantalaituri rakennettu 1302;
ghat mainittu jo 400-luvun Gupta-kauden kirjoituksissa. —
en-Wikipedia 'Manikarnika Ghat'"

Tarkistin dedikoidun "Manikarnika Ghat" -artikkelin kokonaan: **vuotta
1302 ei mainita siinä lainkaan.** 1302-luku löytyy ainoastaan
pääartikkelista "Varanasi" (osio "Ghats"): "the current ghat as a
permanent riverside embankment was built in 1302 and has been
renovated at least three times."

Lisäksi näiden kahden artikkelin välillä on ristiriita
kirjoitusajankohdasta: "Manikarnika Ghat" -artikkeli sanoo "mentioned
in a Gupta inscription of **5th century**" (=400-luku, täsmää
kokoajan tekstiin), mutta "Varanasi"-artikkeli sanoo "**Fourth-century**
Gupta period inscriptions mention this ghat" (=300-luku). Tätäkään
ristiriitaa ei ole merkitty.

**Suositus:** vaihda 1302-faktan lähdeviittaus "Manikarnika Ghat" →
"Varanasi", ja mainitse kirjoittajalle 4.–5. vuosisadan
lähdeepäselvyys (turvallisin valinta on pitäytyä muotoilussa "varhaisilla
vuosisadoilla" tai valita jompikumpi eksplisiittisesti äläkä molempia
lähteitä yhdessä).

---

### 7. PIENI EPÄTARKKUUS — Jonathan Duncanin löytö vs. julkaisu (H2-nosto)

**Väite (H2, julkaistava nostoteksti):** "...kunnes brittiläinen
upseeri Jonathan Duncan **kuvasi löytönsä paikalta 1794**."

Muotoilu antaa ymmärtää, että Duncan itse teki ja kuvasi löydön
paikan päällä 1794. Todellisuudessa (Wikipedia "Sarnath"): löytö
(reliikkiuurna) tehtiin tammikuussa 1794 zamindar Jagat Singhin
työntekijöiden toimesta; Duncan (Aasian seuran jäsen, myöhemmin
Bombayn kuvernööri) **julkaisi** kuvauksensa siitä vasta **1799**
("Duncan published his observations in 1799"). Kokoajan oma footnote
tässä samassa nostossa on jo oikein ("löytö tehtiin 1794... Duncan
julkaisi... kuvauksen... 1799") — vain leipäteksti on epätarkka.

**Korjausehdotus:** esim. "...kunnes brittiläinen virkamies Jonathan
Duncan julkaisi ensimmäisen kuvauksen löydöstä 1799" tai "...kunnes
paikalta tehty löytö päätyi brittiläisen virkamiehen Jonathan Duncanin
kuvaukseen 1799".

---

## Vahvistetut, ei-virheelliset erikoistapaukset (ei toimenpiteitä)

- **"Silk weaving in Varanasi"** ohjaa oikeasti artikkeliin **"Silk
  industry in Varanasi"**. Hain sen kokonaan: se vahvistaa K2:n ja
  jakson 3 väitteet (kutojat enimmäkseen Ansari-muslimeja, GI-status
  2009) eikä sisällä mitään, mikä kumoaisi tai laajentaisi nykyistä
  K2-tekstiä olennaisesti. K2 ja jakso 3 voi jättää ennalleen.
- **692 km Delhistä**: tekstissä on kaksi lukua — 692 km (linnuntietä/
  yleismaininta) ja 797 km (tieajo, geografiaosiossa) — kokoaja käytti
  oikein 692 km -mainintaa siitä kohdasta, jossa lukema esiintyy
  sanatarkasti.
- **Sarnath 8 km vs. Varanasi-artikkelin 10 km**: Wikipedia-sisäinen
  ristiriita (Sarnath-artikkeli sanoo "8 km northeast", Varanasi-
  artikkeli "10 kilometres north-east"), mutta kokoaja siteerasi
  oikein juuri Sarnath-artikkelin lukua omalla viittauksellaan — ei
  kokoajan virhe, mainitaan vain täydellisyyden vuoksi.
- **Ramnagarin linnoituksen jurisdiktio-väite** ("ilman
  lainkäyttövaltaa itse kaupungissa"): ei ollut suoraan "Varanasi"-
  artikkelissa, mutta vahvistui täysin erikseen haetusta "Benares
  State" -artikkelista: "...zamindari privileges in an area around
  Benares city, but not in the city, which the East India Company
  had annexed."

---

## Sisältölinjaus: Kashi Vishwanathin 1669-tuhoamishistorian poisjättö

**Kysymys:** onko kokoajan ratkaisu jättää koko 1669-tuho (Aurangzeb)
pois — myös neutraalina historiana — kestävä, vai pitäisikö se
kertoa?

**Havainto lähteistä:** "Kashi Vishwanath Temple" -artikkeli kertoo
asian suoraviivaisesti faktana ilman nykypolitiikkaa: "Mughal Emperor
Aurangzeb ordered the demolition of the Hindu temple in 1669...The
current structure was constructed on an adjacent site by...Ahilyabai
Holkar...in 1780." Pelkkä lause "aiempi temppeli tuhoutui 1669,
Ahilyabai Holkar rakennutti nykyisen 1780" olisi sinänsä hyvin
mahdollista esittää ilman mainintaa moskeijasta, Gyanvapista tai
nykyriidasta.

**Suositukseni: kokoajan ratkaisu on KESTÄVÄ, pidä ennallaan.**
Perustelut:

1. Tehtävänanto kielsi nimenomaisesti Gyanvapi-kiistan, ja jo pelkkä
   "1669, Aurangzeb tuhosi" -maininta on käytännössä mahdoton irrottaa
   kokonaan aiheesta 13+ / aikuisyleisölle — looginen jatkokysymys
   ("mitä tilalle rakennettiin?") johtaa suoraan moskeijaan ja sitä
   kautta 2021+ oikeusriitaan, jonka kokoaja on velvoitettu
   välttämään. Turvallisin tapa noudattaa "ei Gyanvapia" -linjausta on
   olla avaamatta koko tuhoamis–moskeija-ketjua, ei vain sen viimeistä
   lenkkiä.
2. K3 toimii silti täysin itsenäisesti ja aukottomasti ilman
   1669-mainintaa: "nykyinen rakennus on Ahilyabai Holkarin 1780
   rakennuttama" ei vaadi selitystä, miksi "nykyinen" — pelaaja ei
   välttämättä edes kysy, oliko olemassa aiempaa. Vastaava rajaustapa
   (uuden rakennuksen positiivinen rakennushistoria ilman tuhon syytä)
   on tavallinen ja hyväksytty tapa käsitellä herkkiä
   uskonnollis-poliittisia aiheita matka-/historiatekstissä.
3. 1873-henkisyys ei kärsi: matkakirjan aikalaisen (isoisän) näkökulma
   1800-luvulta ei automaattisesti vaadi 1600-luvun tuhohistoriaa —
   kultaus 1780/1835 ja jyotirlinga-status kantavat nostoa hyvin
   yksinään.

**Ainoa varaus:** jos peli myöhemmin haluaa syventää historia-sivua
lisäjaksolla eikä vain nostoina, lyhyt, mosaiikiton yksi lause
("aiempi temppeli tuhoutui 1669, ja Ahilyabai Holkar rakennutti
nykyisen sen tilalle 1780") olisi historiallisesti tarkka eikä
sinänsä laukaisisi Gyanvapi-aihetta, MUTTA tämä on kirjoittajan oma
harkinta eikä muuta suositustani nykyisestä poisjättöratkaisusta.

**Muut osion 7 rajaukset (Modi/käytävä/lihakauppa) tarkistettu:**
koko faktapohja-tiedosto luettu läpi eikä näitä aiheita esiinny
missään nostossa tai jaksossa — rajaus on toteutunut käytännössä
täydellisesti. Polttohautaus (K4) on käsitelty arvokkaasti: ei
kuvausta itse rovioista tai vainajista, keskittyy ghatin historiaan
ja moksa-uskomukseen — linjaus täyttyy.

---

## Yhteenveto

- **Tarkistettuja yksittäisiä faktaväitteitä:** n. 70 (kaikki 8
  nostoa á 4 faktaa, molemmat johdannot, kaikki 5 jaksoa, koko
  13-rivinen IMD-säätaulukko, kaikki 8 kohdekartan koordinaattia +
  niiden etäisyys-/suuntalaskelmat).
- **Suoria virheitä julkaistavassa tekstissä:** 2 (Ganga Aartin kesto
  K1:ssä; Manikarnika Ghatin ilmansuunta kohdekarttataulukossa).
- **Korjattava/tarkennettava koordinaatti:** 1 (Ramnagarin linnoitus —
  Overpass antoi ~1,27 km tarkemman sijainnin, muuttaa etäisyyden
  ~4,7 km:stä ~5,6 km:iin).
- **Pieniä tarkkuus-/lähdeviittausongelmia footnoteissa (ei
  vaikuta julkaistavaan leipätekstiin merkittävästi):** 4 (Dhamek-
  koristelun ajoitus liian laaja; KVT-kultausvuoden lähderistiriita
  merkitsemättä; Manikarnika 1302 väärässä lähdeartikkelissa +
  4./5. vuosisadan ristiriita; Duncanin löytö/julkaisu-sekaannus H2:ssa).
- **Ei löytynyt virheitä:** kaikki muut koordinaatit, koko
  säätaulukko, historialliset vuosiluvut (1750, 1775, 1780, 1805,
  1830, 1836, 1902, 1911, 1835–36, 1851–52, 1905, 1194), sitaatit
  (Twain, Sherring), silkkiväitteet (vahvistettu myös erikseen
  haetulla "Silk industry in Varanasi" -artikkelilla), ja koko
  sisältölinjauksen noudattaminen (ei Modia/käytävää/lihakauppaa,
  polttohautaus arvokkaasti).
- **Sisältölinjaussuositus:** 1669-tuhon täyskielto on kestävä valinta,
  suosittelen pitämään sen ennallaan (perustelut yllä).
