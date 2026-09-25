# Méridan faktapohjan tarkistus

Tarkistettu **7.9.2026** Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`). Tarkistus
on **menetelmällisesti erillinen vaihe**: lähteet luettiin uudelleen
alkuperäisistä latauksista eikä faktapohjan omiin sitaatteihin
luotettu. Riidanalaiset luvut haettiin `grep -o` -täsmähaulla
sanatarkkoina merkkijonoina. Koordinaatit haettiin itse (es-Wikipedian
`prop=coordinates`, artikkelin oma koordinaattimalline ja Nominatim),
ja **kaikki 28 kohdeparin etäisyyttä laskettiin itse haversinilla**.

Luetut artikkelit **en**: Mérida Yucatán, Yucatán, Yucatán Peninsula,
Caste War of Yucatán, Republic of Yucatán, Cathedral of Mérida
Yucatán, Paseo de Montejo, T'ho, Agave fourcroydes, Francisco de
Montejo, Dzibilchaltun, Uxmal, Progreso Yucatán, Celestún, Izamal,
Cenote, Cochinita pibil, Papadzules, Sopa de lima, Jarana yucateca,
Huipil, Yucatec Maya language, Maya peoples.
Luetut artikkelit **es**: Casa de los Montejo, Teatro Peón Contreras,
Ermita de Santa Isabel (Mérida, Yucatán), Museo de la Ciudad de
Mérida, Parque de La Mejorada, Museo de la Canción Yucateca, Barrio de
San Juan (Mérida, México), Barrio de San Cristóbal (Mérida, Yucatán),
Barrio de Santa Ana (Mérida, México).

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–G ratkaisut tehdään.** Asiavirheitä ei löytynyt. Kaksi kohtaa on
Wikipedian sisäisiä ristiriitoja, yksi on kieliversioiden välinen
ristiriita, yksi lähteen oma varaus, yksi heikko lähde,
yksi etäisyystarkistus ja yksi linjauskysymys.

---

## A. RISTIRIITA — katedraalin ikä ja järjestysnumero

Kolme väitettä, kaksi artikkelia:

**Lähde 1 ("Mérida, Yucatán", johdanto), sanatarkasti:** *"The
Cathedral of Mérida, Yucatán was built in the late 16th century with
stones from nearby Maya ruins and is the oldest cathedral in the
mainland Americas."*

**Lähde 2 (sama artikkeli, Historic sites), sanatarkasti:** *"The
Cathedral of Mérida, Yucatán, dating to 1598, was the first cathedral
in continental North América."*

**Lähde 3 ("Cathedral of Mérida, Yucatán"), sanatarkasti:**
*"Construction of the cathedral of Mérida began in 1561, and it was
completed in 1598. It was the second cathedral to be completed in the
Americas (the Cathedral of Santo Domingo, completed in 1550, was the
first)."* — ja saman artikkelin Construction-osiossa: *"It was not
until 1562 that construction of the cathedral began."*

Kohdeartikkeli on siis itsensäkin kanssa ristiriidassa aloitusvuodesta
(1561 vs. 1562) ja yleisartikkeli väittää kirkkoa ensimmäiseksi, kun
kohdeartikkeli laskee sen toiseksi.

**Ratkaisu:** lehti käyttää **kohdeartikkelia** ja kertoo asian
lukijalle auki: rakentaminen alkoi 1561 tai 1562 (artikkeli antaa
molemmat), valmis 1598, ja se oli **Amerikan toinen valmistunut
katedraali** Santo Domingon (1550) jälkeen. Ero kirjataan
lohkokommenttiin. Ennakkotapaus: v925/v932/v937 — tarkempi lähde
voittaa ja ero selitetään.

---

## B. KIELIVERSIORISTIRIITA — mistä liikanimi "Valkoinen kaupunki"

**en-Wikipedia ("Mérida, Yucatán", Nickname), sanatarkasti:** *"This
nickname may be due to the white color of the limestone used to paint
the façades of the city's colonial buildings."* Sama osio kutsuu
segregaatioselitystä **kansanperinteeksi** ja kumoaa sen
ajoituksella: *"However, the first arches were not commissioned until
1690, almost 150 years after the city's foundation."*

**es-Wikipedia ("Barrio de San Juan (Mérida, México)"),
sanatarkasti:** *"El mote de ''Ciudad Blanca'' deriva, según
investigaciones del historiador Michel Antochiw Kolpa, no por el
encalado… sino de un hecho que se remonta a la fundación de la Ciudad
en 1542: Los Montejo… quisieron por razones de seguridad y de fundado
temor… hacer una ciudad 'Blanca', esto es, para los blancos."*

**Ratkaisu:** lehti **ei valitse**. Nosto kertoo molemmat selitykset
ja **nimenomaan sen tosiasian, että kaaret rakennettiin vasta 1690** —
eli että kansanperinteen ajoitus ei täsmää, vaikka kaupungin
alkuperäinen suunnitelma oli eriyttävä. Sävy on kunnioittava eikä
syyttävä (pilari 3): kaupunginosat kuvataan elävinä nykypäivän
kaupunginosina, ei uhrikertomuksena. Ratkaisu kirjataan
lohkokommenttiin.

---

## C. RISTIRIITA — kastisodan uhriluku

**Infobox, sanatarkasti:** *"casualties1 = ~314,000 rebels"*,
*"casualties2 = 50,000 military"*, *"casualties3 = 364,000 in total"*.

**Leipäteksti (20th century and the end of the war), sanatarkasti:**
*"In one form or another, war and armed struggle had continued for
more than 50 years, and an estimated 40,000–50,000 people died in the
hostilities."*

Ero on lähes kymmenkertainen. **Ratkaisu:** lehti **ei anna yhtä
lukua**. Se sanoo, että arviot kuolleiden määrästä vaihtelevat
suuresti — leipäteksti puhuu 40 000–50 000:sta, infobox yli
300 000:sta — ja jättää sen siihen. Sama ratkaisu kuin
spec-mantereet.md:n katastrofikohdassa ("uhriluvun ristiriita
kirjoitetaan auki lähteineen, ei valita yhtä lukua"). Kirjataan
lohkokommenttiin.

---

## D. LÄHTEEN OMA VARAUS — Dzibilchaltúnin päiväntasaus

**Lähde ("Dzibilchaltun", Architecture), sanatarkasti:** *"On the
vernal equinox, the site is crowded by visitors observing the sunrise
through the temple's doorways. However, there is no archaeological
feature marking the observation spot, making any relationship between
the orientation of the temple with the equinoxes highly unlikely."*

Tämä on juuri se kohta, jossa matkaopas houkuttelee tekemään
"mayat rakensivat auringonseurantalaitteen" -väitteen. **Ratkaisu:**
varaus säilytetään sanatarkasti: opas kertoo, että väkeä kokoontuu
katsomaan auringonnousua oviaukkojen läpi, **ja että arkeologista
merkkiä katselupaikasta ei ole, joten yhteys on artikkelin mukaan
hyvin epätodennäköinen.** Varausta ei saa pyöristää pois.

---

## E. HEIKKO LÄHDE — jarana yucateca

**Lähde ("Jarana yucateca")** on rakenteeltaan poikkeuksellinen
Wikipedia-artikkeli: väliotsikot ovat kokonaisia lauseita ja
lähdeviitteet osoittavat matkailublogiin (latamliving.com). Sen
tulkinnat vaquería-juhlan synnystä ovat sen omia.

**Ratkaisu:** artikkelista otetaan **vain rakenteelliset,
tarkistettavat piirteet**: tanssi on Yucatánin niemimaan tunnusomainen
tanssi, tahtilajit 6/8 ja 3/4, tanssitaan pareittain samoin askelin,
säestys on puhallinyhtye, tanssijat pitävät pulloa päänsä päällä,
naisilla terno (jubón, hipil, fustán) ja miehillä guayabera, hattu ja
paliacate. **Vaquería-juhlan syntyselitystä ei esitetä faktana** vaan
korkeintaan sillä varauksella, jonka artikkeli antaa. Jarana ei ole
lehden nosto vaan matkaoppaan maininta.

---

## F. ETÄISYYSTARKISTUS — kolme kohdetta jää pois

Kaikki 28 väliä laskettiin haversinilla (R = 6 371 008,8 m).
**Kaikki kahdeksan valittua kohdetta täyttävät 200 metrin säännön
selvästi.**

| väli | metriä |
| --- | --- |
| Casa de los Montejo – kaupunginmuseo | **368** |
| Teatro Peón Contreras – Casa de los Montejo | 417 |
| Casa de los Montejo – San Juanin puisto | 433 |
| kaupunginmuseo – San Juanin puisto | 525 |
| kaupunginmuseo – San Cristóbalin kirkko | 552 |
| Santa Anan kirkko – Santa Isabelin ermita (suurin) | 2 245 |

Pois jätetyt, mitattuna lähimpään valittuun kohteeseen:

| pois jätetty | metriä | lähin | peruste |
| --- | --- | --- | --- |
| kaupungintalo | **103** | Casa de los Montejo | 200 m:n sääntö |
| Santa Lucían puisto | **188** | Teatro Peón Contreras | 200 m:n sääntö |
| Yucatánin hallintopalatsi | **206** | Teatro Peón Contreras | mahtuisi, mutta Plaza Grandelta otetaan vain yksi kohde |

Hallintopalatsi on Casa de los Montejosta 211 metriä. Se olisi siis
sääntöjen puolesta kelvannut; se jätettiin pois, koska kaksi kohdetta
samalta aukiolta olisi tehnyt kartasta epätasaisen. Kaikki kolme
mainitaan matkaoppaassa.

---

## G. LINJAUS — mitä jätetään pois (spec-mantereet.md)

1. **Chichén Itzá ja Chicxulubin cenote-kehä** ovat Meksikon
   maalehden ja karttanostojen aiheita — **eivät tämän lehden**.
   Chichén Itzá saa jäädä saapumistekstiin (se oli siellä ennestään),
   mutta lehti ei jatka aiheesta. Kaupungin visa
   (`northamerica-questions.js`, `merida`) kysyy Chicxulubista, joten
   **minitehtävä ei saa kysyä siitä.**
2. **Nykypolitiikka pois:** Mérida-aloite 2007, presidenttitapaamiset
   1999 ja 2007, Mérida Initiative, nykyiset pormestarit.
3. **Turvallisuusvertailut pois** ("among the safest cities of
   Mexico", International Safe Community 2015, Forbes-listat,
   UN-Habitat 2022). Ne ovat nykypolitiikan ja markkinoinnin rajalla
   eivätkä kuulu lehteen.
4. **Kastisota kerrotaan tapahtumina.** Manuel Antonio Ayn teloitus,
   Tepichin polttaminen, Cecilio Chin käsky ja sotavankien myynti
   Kuubaan mainitaan **kukin yhdellä lauseella ilman yksityiskohtia**
   (pilari 4). Mayajohtajat saavat oman äänensä (Patin kirje 1848,
   Chin kirje 1849) — kansa ei ole pelkkä kohde.
5. **Mayat nykypäivän toimijoina:** kolmasosa osavaltion väestöstä
   puhuu yucatekia, Hanal Pixán ja jarana ovat elävää arkea. Ei
   "kadonneen kansan" romantiikkaa, ei museokehystä.
6. **Kielen leima kerrotaan neutraalisti** ("Language and accent"
   -osion havainto ikäryhmien eroista) mutta ilman arvottamista.

---

## H. PISTOKOKEET — sanatarkat osumat

| väite | osuma |
| --- | --- |
| Mérida perustettiin 1542, mukana Montejo nuorempi ja Juan de la Cámara | `"founded in 1542 by the Spanish [[conquistador]]s, including [[Francisco de Montejo the Younger]] and [[Juan de la Cámara]], and named after the town of [[Mérida, Spain\|Mérida]] in Extremadura, Spain."` |
| Ichcaanzihó = "viiden kukkulan kaupunki" | `"City of Five Hills"` |
| Nimi Augusta Emeritan raunioiden mukaan | `"Augusta Emerita"` |
| Kaaret tilattiin vasta 1690 | `"not commissioned until 1690, almost 150 years after the city's foundation."` |
| Quijanon koristekaari 1760 | `"1760 in front of his house"` |
| Katedraali: alku 1561, valmis 1598, toinen Amerikassa | `"began in 1561, and it was completed in 1598."`, `"second cathedral to be completed in the Americas (the [[Cathedral of Santo Domingo]], completed in 1550, was the first)"` |
| Sama artikkeli sanoo myös 1562 | `"not until 1562 that construction of the cathedral began."` |
| Kiviä otettiin temppelistä Yajam Cumu; mayatyöläisiä Francisco Pool | `"Yajam Cumu"`, `"Francisco Pool"` |
| Kastisota: henekenviljelmät 1833 alkaen | `"from 1833"` |
| Yucatán liitettiin takaisin Meksikoon 17.8.1848 | `"17 August 1848"` |
| Canul haavoittui kuolettavasti 1.9.1872 | `"1 September 1872, when Canul was mortally wounded at the [[Battle of Orange Walk]]."` |
| Canul löi britit 21.12.1866 | `"21 December 1866, at the Battle of San Pedro Yalbac."` |
| Sota päättyi 5.5.1901 / syyskuussa 1915 / viimeinen kahakka 4/1933 | `"May 5, 1901"`, `"September 1915"`, `"April 1933"` |
| Leipätekstin uhriarvio | `"40,000–50,000 people died"` |
| Heneken on steriili hybridi, kuitu ei yhtä hyvää kuin sisal | `"sterile [[Hybrid (biology)"`, `"not of as high a quality as [[sisal"` |
| Lehdet 1,2–1,8 m, leveys 8–13 cm, piikki 2–2,5 cm, kukinto 5–6 m | `"1.2-1.8\|m"`, `"8–13\|cm"`, `"2–2.5\|cm"`, `"5–6\|m\|ft"` |
| José María Lanz tutki henekenin 1783 | `"José María Lanz"`, `"in Yucatán in 1783"` |
| Korealainen siirtolaisuus alkoi 1905 Jemulposta | `"Korean immigration]] to Mexico began in 1905 when more than a thousand people arrived in Yucatán from the city of [[Incheon\|Jemulpo]]."` |
| Progreso perustettiin 1872 (Juan Miguel Castro), laituri 6,5 km, 1989 | `"founded in 1872 by Don Juan Miguel Castro"`, `"6.5\|km\|mi\|abbr=on}} into"`, `"Terminal Remota opened in 1989"` |
| Niemimaan ensimmäinen rautatiekisko La Mejoradassa 1.4.1870 | `"primer riel de ferrocarril en la [[península de Yucatán]] el 1 de abril de 1870."` |
| Mejoradan kirkko 1621→1640, luostari 1688–1694, Echeverri 1820 | `"1621"`, `"1640"`, `"1688 y 1694"`, `"Juan María Echeverri"` |
| Kaupungin korkeus noin 9 m | `"30\|ft\|m\|0\|order=flip"` (näkyy muodossa "9 metres (30 ft)") |
| Ilmasto: vuoden keskiylin 33,5 °C, joulukuu 30,6, toukokuu 36,3 | `"33.5\|°C\|°F\|1}}"`, `"30.6\|°C\|°F\|1}}"`, `"36.3\|°C\|°F\|1}}"` |
| Alimmat 17,2 °C – 21,7 °C | `"17.2\|°C\|°F\|1}}"`, `"21.7\|°C\|°F\|1}}"` |
| Historiallinen keskusta maanosan kolmanneksi suurin | `"third largest old town"` |
