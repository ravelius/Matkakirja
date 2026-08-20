> **ARKISTOITU 19.8.2026 (Opus).** Tämä ei ole ohje vaan KÄYTTÄMÄTÖN
> RAAKA-AINE: Sonnet-agentin kokoama faktapohja, jonka päälle lehteä ei
> ole vielä kirjoitettu. Tiedosto on tallennettu repoon, koska se syntyi
> konttiympäristön väliaikaiskansioon ja olisi muuten kadonnut session
> mukana. JOKAINEN FAKTA ON TARKISTETTAVA LÄHTEESTÄ ennen käyttöä —
> raportti merkitsee itse omat epävarmuutensa viimeiseen osioonsa, ja
> aiemmissa lehdissä agenttien raporteista on löytynyt sekä keksittyjä
> lukuja että väärintulkintoja. Ks. docs/arkisto/kapulanvaihto-2026-08-19-opus.md

# Mekka — faktakoosteraportti kaupunkilehteä varten

Lähteet: en-Wikipedia (WebFetch, elokuu 2026): "Mecca", "Masjid al-Haram", "Kaaba",
"Well of Zamzam"/"Zamzam Well", "Kiswah", "Mahmal", "Johann Ludwig Burckhardt",
"Richard Francis Burton", "Ajyad Fortress", "Abraj Al Bait", "Jannat al-Mu'alla",
"Mosque of the Jinn", "Safa and Marwa", "Maqam Ibrahim", "Makkah Al Mukarramah
Library", "Al-Adl cemetery", "Hejaz Railway", "Hejaz Vilayet", "Jabal al-Nour",
"Jabal Thawr", "Mina, Saudi Arabia", "Mount Arafat", "Muzdalifah", "History of
Mecca", "Timeline of Mecca", "Al-Rayah Mosque, Mecca", "Category:Buildings and
structures in Mecca", "Category:Mosques in Mecca", "Category:Masjid al-Haram".
Kaikki merkkimäärät on laskettu Python-skriptillä (`len()`), ei arvioitu.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Mekka"

**Johdanto (213 merkkiä):**

> Laakso vuorten välissä, jonne sade tulee harvoin mutta rajusti – kaupunki on
> taistellut veden puutetta ja liikaa vastaan. Karavaanit toivat kangasta ja
> mausteita, 1800-luvulla myös valepukuisia matkakirjailijoita.

### Sivu B — teemasivu, ehdotettu id `historia` (nimi "Historia")

**Perustelu valinnalle:** tehtävänannon painotukset — vesihuolto, kauppareitit,
arkkitehtuurin rakennushistoria ja 1800-luvun eurooppalaiset matkakuvaukset —
ovat kaikki lähtökohdiltaan historiallisia tapahtumia ja rakennuksia, eivät
esim. kuvataidetta, kirjallisuutta tai ruokaa sellaisenaan. Muista sallituista
vakioaiheista mikään ei istu yhtä hyvin: "luonto" olisi ollut vaihtoehto
laakso/vuoret-teemalle, mutta suurin osa kerätystä aineistosta (kaivon
historia, linnoitus, hautausmaa, matkakirjailijat) on nimenomaan historiaa.
Siksi `historia` kantaa teemasivun, ja geografia (K1) sopii silti hyvin myös
`kaupunki`-sivun nostoksi.

**Johdanto (217 merkkiä):**

> Ottomaanien hallintokaupunki, jossa moskeijaa laajennettiin ja linnoitus
> vartioi kukkulalta – ja jonne kaksi eurooppalaista matkakirjailijaa livahti
> valepuvussa 1800-luvulla kertoakseen, mitä täällä oikeasti tapahtuu.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki` — nostot

**K1. "Laakso jota vuoret vartioivat" (603 merkkiä)**

> Mekka on rakennettu kapeaan laaksoon, jota on kutsuttu Mekan kuopaksi –
> kaupunki lepää 277 metrin korkeudessa merenpinnasta, alastomien vuorten
> ympäröimänä, noin 70 kilometrin päässä Punaisenmeren rannalla sijaitsevasta
> Jeddasta. Ahdas laakso on siunaus ja kirous yhtä aikaa: sama muoto joka
> suojasi kaupunkia tuulilta, kerää rankkasateen vedet suoraan kaduille.
> Ongelma ei ole uusi. Jo kalifi Umarin (634–644) ja Uthmanin (644–656)
> aikana Mekkaan kutsuttiin kristittyjä insinöörejä rakentamaan patoja ja
> penkereitä matalille alueille, jotta pyhäkön ympäristö säilyisi kuivana
> seuraavan tulvan tullessa.

Faktat ja lähteet:
- Sijainti 70 km sisämaassa Jeddasta, laakso 277 m merenpinnan yläpuolella — en-Wikipedia "Mecca" (johdanto/Geography).
- Laaksoa/kaupunkia kutsutaan nimellä "Hollow of Mecca" (Mekan kuoppa/onkalo) — en-Wikipedia "Mecca" (Topography, Special:Export-haku).
- Kalifi Umarin (634–644) ja Uthmanin (644–656) aikana kutsuttiin kristittyjä insinöörejä rakentamaan patoja ja penkereitä tulvasuojaksi Kaaban ympäristön matalille alueille — en-Wikipedia "Mecca" (History-osio).

**K2. "Zamzamin kaivo keskellä pihaa" (650 merkkiä)**

> Kaksikymmentä metriä Kaaban itäpuolella on kaivo, josta koko kaupunki eli
> ennen vesijohtoja: Zamzam ulottuu noin 30 metrin syvyyteen, yläosa
> muurattua kiveä hiekkaisessa maaperässä, alaosa louhittu suoraan kallioon.
> Perimätiedon mukaan kaivo avautui, kun Hagar etsi vettä pojalleen
> Ismailille autiomaasta. Kaivoa on kunnostettu vuosisatojen kuluessa:
> 700-luvulla se sai marmoripäällysteen, 800-luvulla mosaiikin ja
> 1500-luvulla osmanisulttaani Suleiman rakennutti sille uuden katon.
> Wikipedian mukaan monet Mekan vanhat kaivot – Zamzam mukaan lukien –
> tuottivat historiallisesti suolaista murtovettä; makea juomavesi oli
> kaupungissa pitkään kallista.

Faktat ja lähteet:
- Sijainti n. 20 m Kaaban itäpuolella, syvyys n. 30 m, halkaisija 1,08–2,66 m, yläosa muurattua kiveä hiekka-alluviumissa / alaosa kallioon louhittu — en-Wikipedia "Well of Zamzam".
- Perinnetarina Hagarista ja Ismailista — en-Wikipedia "Well of Zamzam" (Origin).
- Kunnostukset: al-Mansur 775–778 marmoripäällyste, al-Mu'tasim 833–855 mosaiikki, mamlukit 1489 suihkulähde, Suleiman 1540–1542 uusi katto — en-Wikipedia "Well of Zamzam" (History).
- "Local wells, such as the Zamzam Well, that produced generally brackish water" — en-Wikipedia "Mecca" (Geography, Sources of water). **Huom: ks. epävarmuusosio kohta 7 — tämä on herkkä yksityiskohta.**

**K3. "Kiswa kulki karavaanissa" (648 merkkiä)**

> Mekka eli karavaaneista. Kamelijonot kuljettivat Afrikasta ja Kaukoidästä
> tulevia mausteita, nahkaa, lääkkeitä, kangasta ja orjia kohti Syyriaa, ja
> paluumatkalla Mekkaan tuotiin rahaa, aseita, viljaa ja viiniä. Yksi
> vuotuinen karavaani oli erityisen juhlava: Kairon Dar al-Khoronfoshin
> verstaassa kudottu, kullalla kirjailtu musta Kaaban peite eli kiswa kulki
> kaupunkiin kamelinselässä rumpujen ja lippujen saattelemana, tyhjän
> tila-arvokamelin eli mahmalin johdattamana. 1800-luvun alussa Egyptin
> hallitsija Muhammad Ali Pasha määräsi kiswan valmistuskulut maksettavaksi
> valtion kassasta – näkyvä tapa osoittaa valtaa pyhien paikkojen
> suojelijana.

Faktat ja lähteet:
- "Goods from Africa and the Far East passed through en route to Syria including spices, leather, medicine, cloth, and slaves; in return Mecca received money, weapons, cereals, and wine" — en-Wikipedia "Mecca" (Economy).
- Kiswa valmistettiin Kairon Dar al-Khoronfosh-verstaassa Ayyubidien ajasta lähtien, kuljetettiin Mekkaan kamelilla rumpujen ja lippujen saattelemana — en-Wikipedia "Kiswah".
- Mahmal: seremoniallinen tyhjä kamelipaari, symboloi sulttaanin valtaa pyhien paikkojen suojelijana — en-Wikipedia "Mahmal".
- "Muhammad Ali Pasha of Egypt ordered the expenses for making the kiswah to be met by his state treasury in the early 19th century" — en-Wikipedia "Kiswah".

**K4. "Kaaba: kivet, tulva ja musta kivi" (646 merkkiä)**

> Nykyinen Kaaba ei ole sama kivirakennus kuin vuosisatoja sitten. Vuonna
> 1626 rankkasade tuhosi sen seinät, ja kolme vuotta myöhemmin sulttaani
> Murad IV rakennutti rakennuksen uudelleen mekkalaisesta graniitista –
> tässä muodossa se säilyi osmanien ajalta lähes muuttumattomana isoisän
> matkan aikaan asti. Rakennus on 13,1 metriä korkea ja pohjaltaan noin
> 12,9 x 11 metriä, seinät marmoria ja kalkkikiveä. Itäkulmassa on musta
> kivi, jota pyhiinvaeltajat ovat vuosisatojen ajan koskettaneet niin
> paljon, että se on lohjennut moneen palaan. Koko rakennus verhotaan
> vuosittain mustalla, kultalankaisin koraaninlausein kirjaillulla
> kankaalla, kiswalla.

Faktat ja lähteet:
- Mitat: korkeus 13,1 m, pituus 12,86 m, leveys 11,03 m; materiaali kivi/marmori/kalkkikivi — en-Wikipedia "Kaaba".
- 1626 tulva vaurioitti seiniä, sulttaani Murad IV rakennutti Kaaban uudelleen mekkalaisesta graniitista — en-Wikipedia "Kaaba" ja "Masjid al-Haram" (tila pysyi muuttumattomana lähes 3 vuosisataa, "unaltered state... for nearly three centuries").
- Musta kivi on lohjennut osiin vuosisatojen käsittelyssä — en-Wikipedia "Kaaba".
- Kiswa: musta kangas, kultakirjailtu koraanijae mm. shahada n. 2/3 korkeudesta, vaihdetaan vuosittain — en-Wikipedia "Kaaba"/"Kiswah".

### Sivu `historia` — nostot

**H1. "Sveitsiläinen tiedemies muslimin valepuvussa" (649 merkkiä)**

> Sveitsiläinen tutkimusmatkailija Johann Ludwig Burckhardt vietti yli kaksi
> vuotta Syyriassa opettelemassa arabiaa ja islamilaisia tapoja, ennen kuin
> astui Jeddahiin 18. heinäkuuta 1814 nimellä šeikki Ibrahim ibn Abdallah.
> Naamio piti: hän vietti Mekassa useita kuukausia ja suoritti hajj-riitit
> kokonaan – ennenkuulumaton saavutus eurooppalaiselle tuohon aikaan. Matka
> koitui raskaaksi: hän sairastui punatautiin Jeddahissa ja Medinassa ja
> palasi Kairoon kesäkuussa 1815 uupuneena. Hän kuoli Kairossa lokakuussa
> 1817; muistiinpanot julkaistiin vasta 1829 nimellä Travels in Arabia ja
> niistä tuli lähde myöhemmälle Mekan-kävijälle Richard Burtonille.

Faktat ja lähteet:
- Sveitsiläinen matkailija/maantieteilijä/orientalisti, alias "Sheikh Ibrahim Ibn Abdallah", yli 2 v. valmistautuminen Syyriassa — en-Wikipedia "Johann Ludwig Burckhardt".
- Saapui Jeddahiin 18.7.1814, vietti kuukausia Mekassa suorittaen hajj-riitit — sama.
- Sairastui punatautiin Jeddahissa ja Medinassa, palasi Kairoon 24.6.1815 uupuneena — sama.
- Kuoli Kairossa 15.10.1817; "Travels in Arabia" julkaistiin postuumisti 1829, oli myöhemmin lähde Richard Burtonille — sama.

**H2. "Englantilainen upseeri pyhiinvaeltajana" (658 merkkiä)**

> Brittiläinen upseeri Richard Francis Burton matkasi Mekkaan 1853 ja
> vaihtoi henkilöllisyyttä matkalla – ensin persialaiseksi mirzaksi, sitten
> sheikiksi, lääkäriksi ja dervissiksi. Reitti kulki huhtikuussa
> Aleksandriasta Kairoon, Suezin ja Yanbun kautta karavaanilla Medinaan 27.
> heinäkuuta; Mekkaan hän saapui 11. syyskuuta. Paljastuminen olisi voinut
> maksaa hengen, joten hän alistui ympärileikkaukseen. Matkasta syntyi teos
> Personal Narrative of a Pilgrimage to Al-Medinah and Meccah: "Mekassa ei
> ole mitään teatraalista, mikään ei muistuta oopperaa, kaikki on
> yksinkertaista ja vaikuttavaa." Pyhiinvaellus toi hänelle hajji-arvonimen
> ja vihreän turbaanin.

Faktat ja lähteet:
- Useat valeasut matkalla (persialainen mirza, sunnisheikki, lääkäri, taikuri, dervissi) — en-Wikipedia "Richard Francis Burton".
- Reitti/päivämäärät: huhtikuu Aleksandria, toukokuu Kairo, Medinaan 27.7.1853, Mekkaan 11.9.1853 — sama.
- "Nothing could save a European detected by populace"; alistui ympärileikkaukseen riskin pienentämiseksi — sama.
- Kirja "Personal Narrative of a Pilgrimage to Al-Medinah and Meccah"; suora lainaus "at Mecca there is nothing theatrical, nothing suggests the opera, but all is simple and impressive" — sama.
- Pyhiinvaellus toi hajji-arvonimen ja oikeuden vihreään turbaaniin — sama.

**H3. "Linnoitus joka vartioi Kaabaa" (523 merkkiä)**

> Kaaban yläpuolella kohoavalla Bulbul-kukkulalla seisoi vuodesta 1780
> osmanien rakentama Ajyadin linnoitus – noin 23 000 neliömetrin
> kivilinnake, joka rakennettiin suojaamaan pyhäkköä rosvoilta ja
> hyökkääjiltä. Se oli osa Mekan siluettia koko 1800-luvun, myös isoisän
> matkan aikaan; linnake kohosi kukkulalla ja sieltä oli näköala suoraan
> moskeijan pihaan. Linnoitus purettiin tammikuussa 2002 nykyisen
> kellotornikompleksin tieltä, ja siitä on nykyään jäljellä enää
> 1:25-kokoinen pienoismalli Istanbulin Miniatürk-puistossa.

Faktat ja lähteet:
- Rakennettu 1780, osmanien Habesh Eyalet/Hejazin vilajetti, Bulbul-kukkulalla, n. 23 000 m², tarkoitus suojata Kaabaa rosvoilta/hyökkääjiltä — en-Wikipedia "Ajyad Fortress".
- Purettu tammikuussa 2002 Abraj Al Bait -kellotornikompleksin tieltä — en-Wikipedia "Ajyad Fortress" ja "Abraj Al Bait".
- 1:25-pienoismalli Miniatürk-puistossa Istanbulissa — en-Wikipedia "Ajyad Fortress".
- (Poliittinen kiista purun ympärillä jätetty pois pelin sisältölinjauksen mukaisesti — ks. kohta 7.)

**H4. "Hautausmaa kaupungin pohjoispuolella" (644 merkkiä)**

> Kaupungin pohjoispuolella, reilun kilometrin päässä Kaabasta, sijaitsee
> Jannat al-Mu'allan hautausmaa, jota on käytetty hautapaikkana
> esi-islamilaisesta ajasta lähtien. Quraysh-heimon ja arvostettujen
> mekkalaissukujen vainajat haudattiin tänne vuosisatojen ajan, joukossa
> useita Muhammadin lähisukulaisia, jotka kuolivat ennen vuoden 622 muuttoa
> Medinaan. Ajan myötä hautausmaalle nousi kupolikattoisia hautarakennuksia
> arvostetuimpien vainajien muistoksi. Vuosina 1925–1926 suuri osa niistä
> purettiin osana uudistusta, joka pyrki yksinkertaistamaan
> hautamuistomerkkejä – hautausmaa on yhä käytössä, mutta lähes ilman
> koristeellisia rakenteita.

Faktat ja lähteet:
- Käytetty hautamaana esi-islamilaisesta ajasta, Qurayshin ja arvostettujen sukujen hautapaikka — en-Wikipedia "Jannat al-Mu'alla".
- Haudattuja: Khadija, Abd al-Muttalib, Abu Talib, Qasim ibn Muhammad (kuolivat ennen v. 622 muuttoa) — sama.
- Vuosisatojen kuluessa rakennettiin kupolihautoja ja mausoleumeja — sama.
- 1925–1926 suuri osa rakenteista purettiin osana uskonnollista uudistusta — sama.

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

**J1. "Perille ja liikkeelle"**

Mekka on 70 km sisämaassa Punaisenmeren Jeddasta — meriteitse saapuvan
matkailijan reitti kulki 1800-luvulla Jeddan sataman kautta. Rautatietä
Mekkaan ei ollut vielä 1873 eikä pitkään sen jälkeenkään: Hejazin rautatie
rakennettiin vasta 1900–1908, ja senkin pääte oli Medinassa, 400 km päässä
Mekasta — rataa Mekkaan ei koskaan rakennettu. Ennen rautatietä
karavaanimatka esimerkiksi Damaskoksesta Medinaan kesti 40 päivää, ja jopa
20 % pyhiinvaeltajista kuoli matkalla vuoristoisen ja ankaran reitin takia.
*Lähteet: en-Wikipedia "Mecca" (sijainti), "Hejaz Railway" (rakennusajat,
matka-ajat, kuolleisuus).*

**J2. Alueen rakenne**

Mekan keskusta on vuorten välinen käytävä, jota kutsutaan nimellä "Hollow of
Mecca" (Mekan kuoppa). Laaksossa on omat nimetyt notkonsa: al-Taneemin,
Bakkahin ja Abqarin laaksot, ja tämä vuoristoinen muoto on ohjannut kaupungin
laajenemista koko sen historian ajan. Ahtaus näkyy myös vitsauksena: tutkija
al-Kurdin mukaan Mekassa oli tapahtunut 89 tulvaa vuoteen 1965 mennessä,
pahin niistä 1942. *Lähde: en-Wikipedia "Mecca" (Geography → Topography,
Sources of water).*

**J3. Arjen ilmiö: pyhiinvaellustalous ja sen riskit**

Mekka ja Medina olivat vapautettuja osmaanien verotuksesta ja saivat
päinvastoin valtion kassasta vuotuisen "surre"-avustuksen. Suurin osa
mekkalaisista eli suoraan pyhiinvaellussesongista — oppaina, kamelinvälittäjinä
tai moskeijan ylläpitotehtävissä. Sesonkiväki toi myös sesonkiriskin:
Wikipedian mukaan koleraa puhkesi pyhiinvaeltajien keskuudessa 27 kertaa
vuosina 1830–1930. *Lähteet: en-Wikipedia "Hejaz Vilayet" (verovapaus, surre),
"Mecca" (elinkeino, koleraepidemiat).*

**J4. Historian käännekohta: vuosi ennen Foggia**

Vuonna 1803 ensimmäinen saudivaltio valtasi Mekan ja piti sitä hallussaan
kymmenen vuotta, jolloin osa historiallisista haudoista ja kupoleista
tuhottiin. Egyptin Muhammad Ali Pasha palautti kaupungin osmaanihallintaan
1813. Vuonna 1872 — vuosi ennen pelin kehysvuotta — Hejaz järjestettiin
uudelleen vilajetiksi vuoden 1864 vilajettilain mukaisesti, ja Mekasta tuli
tämän vilajetin keskus, Medinan ja Jeddan toimiessa sen alaisina sandžakkeina.
*Lähteet: en-Wikipedia "Mecca" (History → Under the Ottomans), "Hejaz
Vilayet" (1872 uudelleenjärjestely).*

**J5. Milloin kannattaa tulla**

Mekassa on kuiva aavikkoilmasto. Talvella yöt ovat viileitä (Wikipedian
mukaan noin 19 °C) ja päivät lämpiävät noin 30 asteeseen; kesällä
päivälämpötila nousee säännöllisesti yli 40 asteen. Sadetta on vain vähän, ja
sitäkin lähinnä marras–tammikuun välillä. *Huom: kuukausikohtaiset lämpötila-
ja sadenormaalit haetaan erikseen mittausdatasta (tools/hae-saanormaalit.mjs)
— tämä kappale on tarkoitettu vain sanalliseksi pohjaksi, ei numeeriseksi
lähteeksi. Lähde: en-Wikipedia "Mecca" (Geography → Climate).*

---

## 4. Kymmenen kohdekartan kohdetta

Tiivis 9 kohteen ydinjoukko mahtuu noin **3,2 km (itä–länsi) × 2,6 km
(pohjois–etelä)** rajaukseen — hyvin tehtävänannon 2–4 km sisällä. Kymmenes,
laajalti tunnettu kohde (Hiran luola) jää tästä rajauksesta selvästi
ulkopuolelle; ks. huomautus lopussa.

**Ehdotettu rajaus (kattaa kohteet 1–9):**
- Pohjoinen: n. 21,441° N (juuri Al-Adlin hautausmaan pohjoispuolella)
- Etelä: n. 21,416° N (juuri Ajyad-kohteen eteläpuolella)
- Länsi: n. 39,823° E (juuri Kaaban länsipuolella)
- Itä: n. 39,856° E (juuri Al-Adlin hautausmaan itäpuolella)

| # | Nimi suomeksi | Koordinaatit (en-Wikipedian infobox) | Lähdeartikkeli |
|---|---|---|---|
| 1 | Kaaba | 21°25′21″N 39°49′34″E | "Kaaba" |
| 2 | Maqam Ibrahim (Abrahamin asema) | 21°25′21″N 39°49′35″E | "Maqam Ibrahim" |
| 3 | Zamzamin kaivo | 21°25′19,2″N 39°49′33,6″E | "Well of Zamzam" |
| 4 | Safa ja Marwa -kukkulat | 21°25′25″N 39°49′38″E | "Safa and Marwa" |
| 5 | Muhammadin perinteinen syntymäpaikka (nyk. Mekan kirjasto) | 21°25′30″N 39°49′48″E | "Makkah Al Mukarramah Library" |
| 6 | Ajyadin linnoituksen paikka (nyk. kellotornikompleksi) | 21°25′08″N 39°49′35″E | "Ajyad Fortress" / "Abraj Al Bait" |
| 7 | Jinnien moskeija (Masjid al-Jinn) | 21°26′00″N 39°49′44″E | "Mosque of the Jinn" |
| 8 | Jannat al-Mu'allan hautausmaa | 21°26′13″N 39°49′45″E | "Jannat al-Mu'alla" |
| 9 | Al-Adlin hautausmaa | 21°26′20″N 39°51′11″E | "Al-Adl cemetery" |
| 10 | Jabal al-Nour (Hiran vuori/luola) — **HUOM: n. 5,3 km rajauksen ulkopuolella koilliseen, ks. alla** | 21°27′29″N 39°51′41″E | "Jabal al-Nour" |

**Huomautus kohteesta 10 ja rajauksesta:** laskin etäisyyden Kaabasta Jabal
al-Nouriin (Hiran luola, jossa perinteen mukaan ensimmäinen ilmestys
tapahtui) — se on n. 5,3 km koilliseen ydinalueesta, eli selvästi yli
2–4 km:n rajauksen. Samoin Jabal Thawr (Thawrin luola, n. 5,6 km etelään)
ja Mina (n. 5,4 km itään) ovat liian kaukana mahtuakseen samaan tiiviiseen
karttaan. Ehdotan joko (a) 9 kohteen tiivistä ydinkarttaa yllä olevalla
rajauksella, tai (b) toista, väljempää n. 6–7 km karttaa, joka kattaisi myös
Jabal al-Nourin ja Jabal Thawrin — päätös jää sisältövastaavalle. En halunnut
venyttää rajausta keinotekoisesti "2–4 km:ksi", kun todellinen etäisyys on
suurempi.

Ei-käytetyt ehdokkaat, joilla ei ollut tarkkaa koordinaattia
Wikipediassa (siksi jätetty pois taulukosta, ei keksitty sijaintia):
Muzdalifah (artikkelissa ei infobox-koordinaattia), Suq al-Layl
(artikkelia ei ole en-Wikipediassa, 404), Al Hamidiyah Palace ja Qishla of
Mecca (sijainti kerrottu vain kaupunginosan tasolla: Ajyad ja Jarwal).

---

## 5. Säätiedot

- **Keskustan koordinaatit (kaupungin infobox):** 21°25′21″N 39°49′24″E
  (huom: hieman eri kuin Kaaban oma koordinaatti 39°49′34″E — ero n. 290 m,
  molemmat ovat aidosti Wikipediasta, kaupungin infobox-koordinaatti lienee
  luontevin säädatan hakupisteeksi).
- **Korkeus merenpinnasta:** 277 m.
- **Vuodenkierto sanallisesti (ei kuukausilukuja — ne haetaan
  mittausdatasta):** Mekassa on kuiva aavikkoilmasto. Wikipedian mukaan
  talviöiden lämpötila on noin 19 °C ja päivät lämpiävät noin 30 asteeseen;
  kesät ovat hyvin kuumia ja päivälämpötila ylittää säännöllisesti 40 astetta.
  Sadetta on vähän ja epäsäännöllisesti, ja sitäkin lähinnä
  marras–tammikuussa. *Lähde: en-Wikipedia "Mecca" (Geography → Climate).*

---

## 6. Kuva-aiheet sanoin (ei tiedostonimiä)

Erityishuomio: Mekan valokuvissa on lähes aina suuria, tunnistettavia
ihmisjoukkoja pyhiinvaellussesonkina, joten hakuja kannattaa suunnata
maisemaan, arkkitehtuuriin, historiallisiin kaiverruksiin/karttoihin ja
esineisiin — ei ihmisiin edes taustalla, jos he erottuvat yksilöinä.

**Avauskuvat (3):**
1. Laaja, korkealta otettu maisemakuva Mekan laaksosta vuorten välissä —
   matala rakennusmeri laakson pohjalla, paljaat ruskeat vuoret ympärillä,
   ei ihmisiä lähikuvassa.
2. Vanha (1800-luvun) eurooppalainen kaiverrus tai litografia Mekasta tai
   Kaabasta yleiskuvana — arkistokuvitusta, ei valokuva.
3. Kivinen vuoristomaisema Jabal al-Nourin tai Jabal Thawrin luolansuulta,
   kapea polku ja aavikkomainen ympäristö, tyhjä maisema.

**Kansikuvat (3):**
1. Etäältä/korkealta otettu yleisnäkymä Mekan keskustan siluetista aamu-
   tai iltavalossa, ilman erottuvia ihmishahmoja.
2. Vanha kartta tai kaiverrus Mekasta (esim. 1800-luvun eurooppalainen
   matkakirjan kuvitus) — arkistolähde.
3. Zamzamin kaivon historiallinen rakennelma tai sen vanha piirros/valokuva
   kaivorakennuksesta, ilman ihmisiä.

**Nosto-/jaksokuvat (8):**
1. K1: Vuoristolaakson yleiskuva korkealta, kaupunki alhaalla pienenä.
2. K2: Zamzamin kaivorakennuksen tai -katoksen historiallinen kuva/piirros.
3. K3: Vanha kaiverrus tai piirros aavikkokaravaanista — kamelijono
   etäältä kuvattuna, ei lähikuvia kasvoista — tai kiswan kangasyksityiskohta
   lähikuvana.
4. K4: Kaaban rakennuksen arkkitehtoninen yksityiskohta (kulma, seinäpinta)
   tai vanha piirros/kaiverrus Kaabasta 1600–1800-luvulta.
5. H1: Burckhardtin teoksen "Travels in Arabia" nimiösivu tai aikakauden
   kartta hänen reitistään — ei henkilökuvaa.
6. H2: Burtonin teoksen "Personal Narrative of a Pilgrimage to Al-Medinah
   and Meccah" nimiösivu tai aikakauden reittikartta.
7. H3: Historiallinen piirros tai valokuva Ajyadin linnoituksesta kukkulalla
   (jos sellainen löytyy arkistoista) — muuten linnoituksen sijaintikukkulan
   nykyinen maisemakuva ilman ihmisiä.
8. H4: Jannat al-Mu'allan hautausmaan näkymä — hautakivirivistö tai
   -arkkitehtuuri, ei ihmisiä.

Näitä kahdeksaa voi tarvittaessa täydentää matkaoppaan jaksokuvilla: Jeddan
satama-alueen tai Punaisenmeren rannikon maisema (J1), aavikko/vuoristoreitin
yleiskuva ilman karavaania (J1 vaihtoehto), ja vanha Ottomaanien
hallintorakennus tai asiakirja Hejazin vilajetista (J4) — kaikki ilman
tunnistettavia ihmisiä.

---

## 7. Ristiriidat, epävarmuudet ja ei-Wikipedia-lähteet

1. **"Timeline of Mecca" -sivun päivämäärät ovat epäluotettavia — älä
   käytä niitä sellaisenaan.** Sivu ilmoittaa mm. "1830: kaupunki
   ryöstettiin, Musta kivi vietiin" ja "1851: Musta kivi palautettiin
   suurta lunnasta vastaan" sekä "1793: Harun al-Rashid vierailee
   kaupungissa". Nämä ovat historiallisesti mahdottomia annetuilla
   vuosiluvuilla (karmatien ryöstö ja Mustan kiven vienti tapahtuivat
   oikeasti n. 930 jaa. ja palautus n. 951 jaa.; Harun al-Rashid kuoli
   809 jaa. eikä olisi voinut vierailla 1793). Vaikuttaa systemaattiselta
   virheeltä ko. Wikipedia-sivulla (mahdollisesti sekoitus islamilaista ja
   gregoriaanista kalenteria tai puhdas kirjoitusvirhe). En käyttänyt
   näitä lukuja raportissa. Samalta sivulta löytyivät myös luvut
   "väestö n. 45 000 vuonna 1885" ja "kirjapaino aloitti n. 1886" —
   nämä eivät vaikuta yhtä ilmeisen virheellisiltä, mutta koska sama sivu
   sisälsi todistetusti vääriä tietoja, en käyttänyt niitäkään
   varmistamattomina.
2. **"Al-Rayah Mosque, Mecca" -artikkelin koordinaatti on todennäköisesti
   virheellinen.** Artikkeli ilmoittaa koordinaatiksi 24°28′44″N
   39°36′1″E — tämä on n. 340 km pohjoiseen oikeasta Mekasta (n. 21,4° N),
   lähempänä Medinaa. En käyttänyt kohdetta kartalla tämän vuoksi.
3. **Zamzamin veden "murtovesi"-maininta on herkkä yksityiskohta.**
   En-Wikipedian Mecca-artikkelin Geography-osio kuvailee Zamzamin
   kuuluneen historiallisesti "generally brackish" (yleisesti murtovettä
   tuottaviin) kaivoihin — tämä on hieman ristiriidassa yleisen
   pyhiinvaellusperinteen kanssa, jossa Zamzamin vesi mielletään
   makeaksi/siunatuksi. Molemmat voivat olla totta eri näkökulmista
   (uskonnollinen perinne vs. geologinen kuvaus), mutta muotoilu kannattaa
   harkita tarkkaan ennen julkaisua.
4. **Kohdekartan 10. kohde ei mahdu 2–4 km rajaukseen.** Ks. kohta 4 —
   esitin asian rehellisesti sen sijaan että olisin venyttänyt rajausta.
5. **Burckhardtin kuolinvuosi tarkistettiin erikseen** (en tiennyt sitä
   ensimmäisestä hausta) — 15.10.1817 Kairossa, vahvistettu suoraan
   artikkelin infoboxista.
6. **Ajyadin linnoituksen purkuun liittyvä diplomaattinen kiista (Turkin
   ulkoministeriön protesti, vertaus Bamiyanin buddhapatsaisiin) jätettiin
   tarkoituksella pois** nosto H3:sta pelin linjauksen mukaisesti (ei
   nykypolitiikkaa) — mainitsen sen tässä vain läpinäkyvyyden vuoksi, jos
   sisältövastaava haluaa arvioida asian uudelleen.
7. **Jannat al-Mu'allan hautarakenteiden purku 1925–1926** kuvataan
   raportissa neutraalisti "uskonnollisena uudistuksena" Wikipedian sanoin;
   tarkempi konteksti (wahhabilainen tulkinta) on Wikipediassa mutta jätin
   sen mainitsematta noston tekstissä pysyäkseni asiallisen neutraalina —
   sisältövastaava voi lisätä tarkennuksen jos katsoo tarpeelliseksi.
8. **Kaikki käytetyt lähteet olivat en-Wikipediaa.** Ainoa poikkeus:
   WebSearch-haku Wikipedia-kategoriasivujen listaamiseen (ei
   sisältöfaktoja, vain artikkelinimien löytämiseen kohdekartan
   ehdokkaita varten) ja yksi yleishaku tulvahistoriasta, jonka tulokset
   (Smarthistory, zamzam.com-blogi ym.) EIVÄT päätyneet raporttiin —
   käytin vain sen kautta löytynyttä Wikipedia-viittausta ("Timeline of
   Mecca"), jonka totesin edellä epäluotettavaksi.
9. **En löytänyt Wikipediasta varmennettua yhtenäistä kuvausta Mekan
   1873-luvun kaupunkirakenteesta (kortteleista, kujista, talotyypeistä).**
   Masjid al-Haram -artikkeli hyppää suoraan 1629 → 1955, eikä siinä
   kerrota 1800-luvun porteista (Bab al-Salam ym.) tai kaupunginosista
   (Suq al-Layl, Jarwal, Shamiya). Tämä on aukko, joka kannattaa täyttää
   tarvittaessa muista lähteistä (esim. Burckhardtin tai Burtonin omat
   matkakertomukset), mutta en tehnyt sitä nyt, koska tehtävänanto rajasi
   lähteeksi Wikipedian.

**Ei käytetty raportissa mutta löytyi tutkimuksessa** (mahdollisia
lisälähteitä myöhemmin, ei koordinaatteja): Al Hamidiyah Palace (rakennettu
1885 Osman Nuri Pashan toimesta, purettu 1957), Canal of Zubaidah
(Zubaidan akveduktijärjestelmä, n. 35 km, valmistui 800-luvun alussa,
toiminnassa aina vuoteen 1974 asti), Qishla of Mecca (1700-luvun
osmaanikasarmi Jarwalin kaupunginosassa, purettu).
