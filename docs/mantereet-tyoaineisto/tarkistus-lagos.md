# Lagosin faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä faktapohjan
omiin sitaatteihin luotettu. Kiistanalaiset väitteet haettiin
`grep -o` -täsmähaulla sanatarkkoina merkkijonoina. Koordinaatit
haettiin itse (`list=geosearch`) ja kaikki 28 kohdeparin etäisyyttä
laskettiin itse haversinilla.

Luetut artikkelit: **Lagos**, **History of Lagos**, **Lagos Island**,
**Lagos Colony**, **Eyo festival**, **Saro people**, **Shitta-Bey
Mosque**, **Iga Idunganran**, **Makoko**, **Third Mainland Bridge**,
**Danfo**, **Nollywood**, **Lekki Conservation Centre**,
**Cathedral Church of Christ, Lagos**, **Tinubu Square**,
**Lagos Central Mosque**, **Ajele Cemetery**, **Freedom Park
(Lagos)**, **King's College, Lagos**, **Tafawa Balewa Square**,
**Nigerian National Museum**, Amala (food), Agege bread, Fuji music,
Samuel Ajayi Crowther, Lagos Lagoon.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–E ratkaisut tehdään.** Asiavirheitä ei löytynyt. Kolme kohtaa on
Wikipedian sisäisiä ristiriitoja, yksi on lähteen varaus, jota ei saa
pyöristää pois, ja yksi on linjauskysymys.

---

## A. RISTIRIITA — mistä nimi Èkó tulee

**Lähde 1 ("History of Lagos", Historical names), sanatarkasti:**
*"…later as 'Eko' when it was under the administration of the Benin
Kingdom. This name came from Ikurame, meaning 'war camp' in the Edo
language."*

**Lähde 2 ("Lagos", History), sanatarkasti:**
*"'Farmstead' or 'hamlet' translates to Ereko in Yoruba, from which
comes the indigenous name of Lagos; Eko."*

**Ratkaisu:** kirjoittaja käyttää **"History of Lagos" -artikkelin
edonkielistä selitystä** (Ikurame, sotaleiri), koska nosto L2 kertoo
juuri Beninin sotilastukikohdasta ja selitys on siinä yhteydessä
lähteen oma. **Toinen selitys mainitaan samassa nostossa ääneen**
("toinen selitys johtaa nimen joruban sanasta ereko, maatila") — kahta
etymologiaa ei saa esittää yhtenä varmana. Ratkaisu kirjataan
lohkokommenttiin.

---

## B. LÄHTEEN VARAUS — nimi Lagos

**Lähde ("Lagos", Etymology), sanatarkasti:**
*"Lagos was most likely named after Lagos, Portugal, as it was the
main centre of Portuguese maritime expeditions down the African coast
in the 15th century."*

Lisäksi "History of Lagos": Alfred Moloney piti tätä selitystä
**todennäköisempänä** kuin johtamista sanasta *lago* ("lake"), ja Sir
Alan Burns sanoi samaa.

**Ratkaisu:** varaus **"todennäköisimmin"** säilytetään.
**HUOMIO — pelin oma visa sanoo toisin:** `js/packs/africa-questions.js`
`lagos`, viides kysymys vastaa *"portugalin sanasta laguunit"* ja sen
fakta sanoo *"Portugalilaiset purjehtijat nimesivät paikan laguunien
mukaan"*. Wikipedia pitää Portugalin Lagosia todennäköisempänä.
Molemmat ovat totta siinä mielessä, että *lagos* on portugalin "järvet"
ja Portugalin Lagos on samasta sanasta — mutta visan ja lehden ero on
todellinen. **Lehti ei väitä visaa vääräksi eikä toista sitä:**
nosto L2 sanoo, että sana tarkoittaa portugaliksi järviä ja että
kaupunki nimettiin todennäköisimmin Portugalin Lagosin mukaan, ja jättää
asian siihen. Visaan ei kosketa (matkakirjatekstit ja visat ovat
tauolla). **Raportoidaan Fablelle.**

---

## C. RISTIRIITA — Makokon asukasluku

**Lähde ("Makoko", johdanto), sanatarkasti:**
*"Its population is considered to be 85,840; however, the area was not
officially counted as part of the 2007 census and the population has
been estimated to be much higher – as high as over a million in 2020."*

**Ratkaisu:** lehti kertoo **luvun 85 840 ja sen varauksen samassa
virkkeessä** — että aluetta ei laskettu vuoden 2007
väestönlaskennassa. Miljoonan arviota **ei käytetä**, koska lähde
esittää sen arvion arviona ("has been estimated"). Sama linja kuin
Miamin lehdessä äänestäjäluvun kanssa: ristiriitainen luku kerrotaan
selityksineen, ei ilman.

---

## D. LINJAUS — mitä Makokosta EI kerrota

"Makoko"-artikkelin osiot **Demolition** ja **Reactions** kertovat
vuosien 2005, 2012 ja 2026 purkutoimista, kolmesta tuhannesta
kodittomaksi jääneestä ja ihmisoikeusjärjestöjen kritiikistä sekä
tyhjennettyjen alueiden myynnistä rakennuttajille.

**Ratkaisu: jätetään kokonaan pois.** Tämä on nykypolitiikkaa, jota
peli ei käsittele (`docs/moduulit/kaupunkilehti.md`,
`spec-mantereet.md`). Nosto kertoo yhteisöstä: paalut, kuusi kylää,
egun-kansa, kalastus, nimen merkitys ja lempinimi "Afrikan Venetsia".
Samasta syystä ei kerrota Lekin tullipuomin mielenosoituksesta 2020
("Lagos", Ajah/Lekki) eikä artikkelin Crime-osiosta.

---

## E. LINJAUS — Tinubun aukio ja Efunroye Tinubu

**Lähde ("Tinubu Square", johdanto), sanatarkasti:**
*"…named after the Yoruba slave trader, merchant, and aristocrat Madam
Efunroye Tinubu."*

**Ratkaisu:** nähtävyysjuttu **sanoo tämän suoraan lähteen sanoin**
eikä pehmennä sitä "kauppiaaksi". Sama linja kuin Sansibarin lehdessä
Tippu Tipin kohdalla ja Miamin lehdessä Overtownin kanssa: historia
kerrotaan tapahtumina, ei kaunisteltuna eikä yksityiskohtia korostaen.

---

## F. TARKISTETUT LUVUT (kaikki löytyivät sanatarkasti)

| Väite | Lähde | Sanatarkka osuma |
| --- | --- | --- |
| Siirtomaa 5.3.1862, hallinto Kultarannikolta; oma siirtomaa 1886 Moloneyn aikana | History of Lagos | *"Lagos was declared a colony on 5 March 1862 but governed by the Gold Coast… In 1886, Lagos became a separate colony from the Gold Coast under Governor Cornelius Alfred Moloney."* |
| Luovutussopimus 6.8.1861, HMS Prometheus 30.7.1861 | History of Lagos | *"Dosunmu relented and signed the Lagos Treaty of Cession on 6 August 1861."* |
| Katedraali: peruskivi 29.3.1867, perustettu 1869 | Cathedral Church of Christ | *"The foundation stone for the first cathedral building was laid on 29 March 1867 and the cathedral was established in 1869."* |
| Crowther ensimmäinen afrikkalainen piispa 1864 | History of Lagos | *"In 1869, the Cathedral Church of Christ was established in Lagos. Five years earlier, Samuel Ajayi Crowther had become the first African bishop of the Anglican Church."* |
| Eyon ensimmäinen kulkue 20.2.1854 | Eyo festival | *"The first procession in Lagos was on 20 February 1854, to commemorate the life of the Oba Akitoye."* |
| Danfo 14–18 matkustajaa | Danfo | *"Typically seating between 14 and 18 passengers…"* |
| Danfon nimi joruban kiirettä tarkoittavasta sanasta | Danfo | *"The term 'danfo' is believed to derive from the Yoruba word meaning 'hurry'…"* |
| Kolmas mannersilta 11,8 km, Afrikan pisin vuoteen 1996 | Third Mainland Bridge | *"it measures about 11.8 km"*, *"It was the longest bridge in Africa until 1996 when the 6th October Bridge located in Cairo was completed."* |
| Makoko: kuusi kylää, neljä kelluvaa | Makoko | *"Makoko comprises six individual villages, of which four are floating communities (Adogbo, Migbewhe, Oko Agbon and Yanshiwhe)…"* |
| Makokon nimi "Pick Akoko" | Makoko | *"The name Makoko is literally translated from Yoruba to be 'Pick Akoko'."* |
| Vankila 16 000 £ vs. koulutus 700 £ (1882) | Freedom Park (Lagos) | *"…expense on the prison in 1882 (£16,000) revealed the government's priority on law and order versus other initiatives such as education which the government spent £700 on."* |
| Nollywood-termi vuoden 2002 NYT-artikkelista | Nollywood | *"…traced the earliest usage of the word to a 2002 article by Matt Steinglass in the New York Times…"* |
| Ilmasto: kesäkuu 316 mm, tammikuu 13 mm, ylimmät 28–32 °C, maaliskuu 26–32 °C, elokuu 24–28 °C | Lagos, Climate | convert-mallineiden arvot luettu raakatekstistä |

---

## G. KOORDINAATIT JA VÄLIT

Koordinaatit haettiin `list=geosearch`-rajapinnasta (keskipiste
6.4520 / 3.3950, säde 2 500 m) **7.9.2026**, ja kaikki **28 väliä**
laskettiin haversinilla.

**Pienin väli 293 metriä** (Vapauden puisto – King's College). Kaikki
28 väliä ovat yli 200 metrin.

**Neljä ehdokasta pudotettiin 200 metrin säännöllä:**
- Holy Cross -katedraali — **112 m** Vapauden puistosta.
- John Randle -keskus — **145 m** kansallismuseosta.
- Bookshop House — **163 m** Kristuksen katedraalista.
- Ilojo Bar — **63 m** Tinubun aukiosta. (Ilojo Bar olisi pudonnut
  myös aihesyistä: se on afrobrasilialaista arkkitehtuuria, joka on
  noston L4 aihe.)

**Rajaus:** lat 6,4435…6,4585, lon 3,3865…3,4045 eli noin
**1,7 × 2,0 kilometriä**. Kaikki kahdeksan kohdetta ovat Lagosin
saarella.

**Aihesyistä kartan ulkopuolelle:** Iga Idunganran (nosto L1),
Shitta-Beyn moskeija (nosto L4), Carterin silta ja kolmas mannersilta
(teemasivu), Makoko (teemasivu), Idumotan tori
(`africa-valokuvat.js`), Eyo-kulkueen reitti (nosto L5).

---

## H. HAVAINTO, JOTA EI KORJATA TÄSSÄ ERÄSSÄ

`js/packs/africa-questions.js`:n `lagos`-huomioissa isoisän ääni
sanoo: *"Lagosin kauppa käy laguunin yli: kanootit tuovat aamulla
kalaa ja hedelmiä saarilta…"* — tämä sopii vuoteen 1873 hyvin eikä ole
anakronismi. Sen sijaan **visan viides kysymys** (nimen alkuperä, ks.
kohta B) poikkeaa Wikipedian todennäköisimmästä selityksestä.
Matkakirjatekstit, kohtaamiset ja kysymykset ovat omistajan
päätöksellä tauolla, joten niihin ei kosketa; asia raportoidaan
Fablelle.
