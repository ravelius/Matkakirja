# Kabul — faktantarkistus

Tarkistettu 21.8.2026. Lähteet: en-Wikipedia raakateksti (action=raw)
artikkeleista Kabul, Gardens of Babur, Bala Hissar (Kabul),
Pul-e Khishti Mosque, National Museum of Afghanistan, Chihil Sutun,
Char Chatta Bazaar. Koordinaattien ristiintarkistus: Nominatim
(nominatim.openstreetmap.org) ja Overpass API (peili
maps.mail.ru/osm/tools/overpass/api/interpreter).

## 1. Chihil Sutunin koordinaatti (RATKAISTU)

**Väite faktapohjassa:** Chihil Sutun -artikkelin näkyvä koordinaatti
on vain karkea `{{coord|34|28|N|69|10|E|...|source:GNS-enwiki}}`, kun
taas tarkempi arvo (34,468712°N, 69,152097°E) on HTML-kommentoitu pois
artikkelin infoboksista eikä siis näy Wikipedian sivulla. Faktapohja
käytti kommentoitua arvoa mutta merkitsi sen epävarmaksi.

**Ratkaisu:** Sekä Nominatim että Overpass paikantavat kohteen
"Chihilsitoon Garden" (باغ چهلستون, Wikidata Q2795775) osoitteesta
**34,4682–34,4685°N, 69,1522–69,1523°E** — käytännössä identtinen
kommentoidun Wikipedia-koordinaatin (34,468712°N, 69,152097°E) kanssa
(ero alle 100 m). **Kommentoitu koordinaatti on siis oikea ja
käyttökelpoinen**, ja se kannattaa ottaa käyttöön kohdekartalla
sellaisenaan — se on selvästi tarkempi kuin näkyvä
"lähde:GNS-enwiki"-rivi, joka osoittautuu n. 1,3–1,4 km:n päähän
todellisesta sijainnista (34°28′N 69°10′E = 34,4667°N, 69,1667°E, ero
todelliseen ~1,35 km).

- Lähde: Nominatim-haku "Chihilsitoon Kabul" → way 387447673, lat
  34,4681673, lon 69,1523306.
- Lähde: Overpass-haku `name~"چهلستون"` bbox-rajattuna → way 387447673,
  keskipiste lat 34,4685059, lon 69,1521859 (wikidata Q2795775,
  wikipedia-tunniste "de:Tschehel Sotun (Kabul)").

## 2. Etäisyyslaskelmien korjaus — koko Darulaman-ryhmä aliarvioitu

Uusintalaskettuna (pallogeometria, asteet × 111 km, pituusasteille
× cos(34,5°) ≈ 0,824) kolmen Darulaman-alueen kohteen (museo, Darul
Aman -palatsi, Chihil Sutun) etäisyys keskustasta osoittautuu
selvästi SUUREMMAKSI kuin alkuperäisessä faktapohjassa ilmoitettu —
noin 2–2,5 km enemmän jokaisessa:

| Kohde | Alkuperäinen etäisyysarvio | Uusintalaskelma | Ero |
|---|---|---|---|
| Afganistanin kansallismuseo | ~6,1 km | **~8,34 km** | +2,2 km |
| Darul Aman -palatsi | ~6,4 km | **~8,58 km** | +2,2 km |
| Chihil Sutun (korjatulla koordinaatilla) | ~3,7 km | **~6,73 km** | +3,0 km |

Muiden, lähempänä keskustaa olevien kohteiden (Bala Hissar, Pul-e
Khishti, Shah-Do Shamshira, Baburin puutarhat) uusintalaskelmat
sen sijaan täsmäävät alkuperäisiin arvoihin hyvin (ero alle 300 m,
paitsi Baburin puutarhat ~700 m suurempi, ks. taulukko osiossa 5) —
virhe koskee siis erityisesti koko kaukaisempaa Darulaman-klusteria.
**Suositus:** käytä lehtityössä tämän raportin uusintalaskettuja
etäisyyksiä, ja harkitse Darulaman-alueen (museo, Darul Aman, Chihil
Sutun — kaikki nyt ~6,7–8,6 km keskustasta) käsittelyä selvästi
omana, kauempana sijaitsevana ryhmänään kohdekartalla, kuten
alkuperäinen faktapohjakin jo ehdotti, mutta etäisyys keskustaan on
vielä hieman aiottua suurempi.

## 3. Uusi löydös: Kabulin tammikuun ja vuosikeskilämpötila ristiriitaiset Wikipediassa

Faktapohja käytti säälaatikon (weather box -taulukon) lukuja
(tammikuu −0,5 °C, vuosikeskiarvo 12,8 °C), mutta SAMAN artikkelin
LEIPÄTEKSTI ilmoittaa eri luvut samoista suureista:

> "a subzero January daily average temperature of −2.3 °C... the
> annual mean temperature is only 12.1 °C"

Sekä tammikuun keskilämpötila (−0,5 °C taulukossa vs. −2,3 °C
leipätekstissä) että vuosikeskiarvo (12,8 °C taulukossa vs. 12,1 °C
leipätekstissä) eroavat toisistaan saman artikkelin sisällä, eikä eroa
selitetä. Tätä ristiriitaa ei ollut merkitty alkuperäiseen
faktapohjaan (toisin kuin Lhasan ja Kashgarin korkeusristiriidat).
**Kannanotto:** ei selvää perustetta valita jompaakumpaa —
säälaatikon luvut (1991–2020-normaalit, CMA-tyyppinen mittausdata)
vaikuttavat todennäköisemmin tarkemmilta kuin leipätekstin pyöristetyt
luvut, mutta suosittelen mainitsemaan tämän kirjoittajalle samaan
tapaan kuin muiden kaupunkien korkeusristiriidat.

## 4. Muut varmennetut faktat (ei virheitä)

Seuraavat faktapohjan väitteet tarkistettiin suoraan artikkelien
raakatekstistä ja todettiin paikkansapitäviksi sellaisenaan:

- Baburin puutarhat: Babur määräsi rakennettavaksi 1504, Jahangirin
  pyhiinvaellus 1607 (muurit, rukousalusta), Shah Jahanin marmoriaita
  1638, 11,5 ha, yli 500-vuotias, jopa miljoona kävijää vuodessa. —
  en-Wikipedia "Gardens of Babur"
- Bala Hissar: rakennettu arviolta 400-luvulla (5th century AD),
  jakautunut ala- ja ylälinnoitukseen (tallit/kasarmit/kolme palatsia
  vs. asevarasto ja "Musta kuoppa"/Siyah Chal), Akbarin aikana
  Kabulin subahin päämaja, Aurangzeb rakennutti moskeijan, verrattavissa
  kokoluokaltaan Agraan ja Lahoreen. — en-Wikipedia "Bala Hissar, Kabul"
- Cavagnarin murha syyskuussa 1879 Bala Hissarissa, laukaisi Toisen
  Anglo-Afgaani-sodan toisen vaiheen; residenssi poltettiin, asevarasto
  räjähti; Frederick Roberts halusi purkaa linnoituksen, mutta se
  vahvistettiin keväällä 1880; linnoitus hylättiin kokonaan 1890-luvulla.
  — sama
- Pul-e Khishti: Kabulin suurin moskeija, sininen kupoli, rakennettu
  1700-luvun lopulla; "kaupunkilaisten kertoma" (Wikipedian oma
  varovainen sanamuoto "Many Kabulis assert...") tarina englantilaisesta
  islaminuskoon kääntyneestä imaamista 1900-luvun alusta. —
  en-Wikipedia "Pul-e Khishti Mosque"
- Afganistanin kansallismuseo: avattu 1919 Amanullah Khanin aikana,
  kokoelma siirtyi 1922, nykyiselle paikalle Darulamaniin 1931, yli
  100 000 esinettä, Bagramin/Ai-Khanoumin/Tepe Fullolin kaivauslöytöjä.
  — en-Wikipedia "National Museum of Afghanistan"
- 1839: Shah Shuja Durrani asennettiin takaisin valtaan brittien
  avulla. 1841: kansannousu tappoi brittiläisen asuinvirkamiehen. 1842:
  perääntymisellä Jalalabadiin kuoli 4 500 brittisotilasta ja 14 000
  siviiliä. 1842: britit palasivat ja tuhosivat pääbasaarin kostoksi
  ennen vetäytymistä. — en-Wikipedia "Kabul"
- Abul Fazl kuvasi Kabulin yhdeksi "Hindustanin kahdesta portista"
  (toinen Kandahar); Kabul löi kulta-/hopearahaa Alamgir II:n
  hallituskauteen asti; George Forster kuvasi 1700-luvun lopun Kabulia
  "parhaaksi ja puhtaimmaksi kaupungiksi Aasiassa". — sama
- Nimihistoria: Rigveda/Avesta "Kubha", kreikkalaiset "Kophen/Kophes/
  Koa", Ptolemaios "Kabura", Xuanzang 600-luvulla "Gaofu". — sama
- Ahmad Shah Durrani, 4 000 abdali-afgaanin komentaja, julistautui
  hallitsijaksi 1747; Kabulin väkiluku painunut n. 10 000:een; Timur
  Shah siirsi pääkaupungin Kandaharista Kabuliin 1776. — sama
- Baburnaman kuvaus Kabulin laakson väestön moninaisuudesta (turkkilaiset,
  arabit, sartit, pašait, paratšit, tadžikit, birkit, afgaaniheimot,
  hazarat osin mongolinkielisiä, kafirien kansat) — suora lainaus
  artikkelista. — sama
- Kabul n. 1 791 m korkeudessa (yksi yksiselitteinen infoboksin luku,
  ei ristiriitaa toisin kuin Lhasassa/Kashgarissa), lähimmät
  pääkaupungit Islamabad/Dušanbe/Taškent/New Delhi/Biškek, suunnilleen
  puolimatkassa Istanbulin ja Hanoin välillä. — sama

## 5. Post-1978-poisrajauksen ja turvallisuustoteamuksen varmennus

**Poisrajaus:** Kaikki faktapohjan sivuehdotukset, nostot, jaksot ja
kuvatekstiehdotukset käytiin läpi: yksikään ei viittaa vuoden 1978
jälkeisiin tapahtumiin. Kabul-artikkelissa on runsaasti myöhempää
materiaalia (esim. rivi 197: "On 24 December 1979, the Soviet Union
invaded Afghanistan..." ja ISI:n toiminta, mujahideen-sota,
"Kultakausi" 1919–1978) — mitään tästä ei ole käytetty. Myös
"kultakausi" (1919–1978) on tietoisesti jätetty pois linjauksen
mukaisesti, kuten faktapohja itse toteaa.

**Turvallisuustoteamus:** Jakso 1:ssä ("Perille ja liikkeelle") on
SITOVA toteamus: "Nykyään matkailu Afganistaniin ei ole turvallista,
samaan tapaan kuin Jemenissä." Toteamus on läsnä ja muotoiltu
neutraalisti, samaan tyyliin kuin Jemenin Sanaa-/Aden-lehdissä —
vaatimus täyttyy. Faktapohja on tietoisesti jättänyt tarkat
päivämäärät/tapahtumat pois (Neuvostoliiton miehitys, sisällissodat,
Taliban-kaudet), koska niiden käyttö rikkoisi 1978-rajausta — tämä on
linjassa tehtävänannon kanssa.

## 6. Päivitetty kohdekartan taulukko

| # | Kohde | Koordinaatti | Tila | Etäisyys keskustasta (uusintalaskelma) |
|---|---|---|---|---|
| 1 | Kabul, keskipiste | 34°31′31″N 69°10′42″E | ennallaan | (keskipiste) |
| 2 | Bala Hissarin linnoitus | 34°30′20″N 69°11′30″E | ennallaan (laskelma tarkennettu) | ~2,51 km (LE) |
| 3 | Pul-e Khishtin moskeija | 34°30′56″N 69°10′49″E | ennallaan | ~1,09 km (E) |
| 4 | Shah-Do Shamshiran moskeija | 34°30′56″N 69°10′17″E | ennallaan | ~1,25 km (LE) |
| 5 | Baburin puutarhat | 34°30′11″N 69°09′29″E | ennallaan (laskelma tarkennettu) | ~3,09 km (LE) — alkup. ~2,4 km |
| 6 | Afganistanin kansallismuseo | 34°28′03″N 69°07′12″E | ennallaan (laskelma **korjattu**) | **~8,34 km** (LE) — alkup. ~6,1 km |
| 7 | Darul Amanin palatsi | 34°27′55″N 69°07′09″E | ennallaan (laskelma **korjattu**) | **~8,58 km** (LE) — alkup. ~6,4 km |
| 8 | Chihil Sutunin palatsi | **34,4682°N 69,1522°E** (Overpass/Nominatim vahvistama, ent. "epävarma" kommentoitu arvo) | **VAHVISTETTU** | **~6,73 km** (LE) — alkup. ~3,7 km |

(LE = lounas, E = etelä)

**Rajausehdotus (päivitetty):** Kohteet 1–5 mahtuvat edelleen n. 3 km
säteelle keskustasta. Darulaman-alueen kolmikko (museo, Darul Aman,
Chihil Sutun) on nyt todettu olevan selvästi kauempana kuin
alkuperäinen arvio (~6,7–8,6 km, ei ~3,7–6,4 km) — suositus säilyy:
käsittele näitä omana, erillisenä ryhmänä kartalla tai jätä pois
tiiviistä 2–4 km:n rajauksesta.

## Yhteenveto

Kabulin faktapohja on historiallisilta faktoiltaan (Baburin puutarhat,
Bala Hissar, Cavagnarin murha, Pul-e Khishti, kansallismuseo, nimihistoria,
Ahmad Shah Durrani, Anglo-Afgaani-sotien tapahtumat) täysin tarkka —
kaikki tarkistetut väitteet täsmäävät sanatarkasti en-Wikipedian
raakatekstiin. Kaksi asiaa korjattiin/tarkennettiin: (1) Chihil
Sutunin epävarmaksi merkitty kommentoitu koordinaatti (34,4687°N,
69,1521°E) VAHVISTETTIIN oikeaksi Overpass/Nominatim-mittauksella
(ero <100 m) ja on nyt turvallista ottaa käyttöön; (2) koko
Darulaman-alueen (museo, Darul Aman, Chihil Sutun) etäisyys
keskustasta oli alkuperäisessä faktapohjassa aliarvioitu n. 2–3 km —
uusintalasketut arvot (6,7–8,6 km) ovat merkittävästi suurempia.
Lisäksi löytyi uusi, aiemmin merkitsemätön ristiriita: Kabul-artikkelin
leipäteksti ja säälaatikko antavat eri luvut tammikuun (−2,3 vs. −0,5 °C)
ja vuoden keskilämpötilalle (12,1 vs. 12,8 °C) — jätetty auki samaan
tapaan kuin muiden kaupunkien korkeusristiriidat. Post-1978-rajaus ja
sitova turvallisuustoteamus on toteutettu tehtävänannon mukaisesti.
