# Louvren pariteettilista (Linssiseppä 17.10.2026 klo 06.57, PT:n erä junaan 199/200)

Vertailu: Ranska (Louvre/Orsay/Rodin) vs Alankomaat (Rijksmuseum), proto-haara linssiseppa/louvre-pariteetti
(rebase masterin BUILD 198 päälle; Ranskan kohdat.json jo masterissa #4768, oma commit pudotettu).

## Linssisepän korjaukset tässä erässä: c8c6bff49 (proto, linssiseppa/louvre-pariteetti)
- Auto zoomin ajat 7 uudelleenäänitetylle teokselle manifest-198:n sana-ajoista (orsay-rf-2735 oli −4…−5 s, muut 0,1–1,6 s).
- Rodinin 8 veistospysähdystä hakevat kertojan patsaan tunnuksella (ennen teos tyhjä → äänite ei soinut koskaan).
- Kuvalähestymisen ulko- ja sisäänmenoääni maan lahestyminen.json:sta (ulkoaani, sisaanmeno); puuttuva = Museumplein.
- Testit LahestymisAanetDatasta ja RanskanKierrosKertojalle; Linssit-testit 1980/1980, unity-tarkistus 0 virhettä.
- Haarassa myös aiemmat: Louvren askeleet (c14679734), houkutin pallon viereen lipun takana (5eb1fa558, 46a637393).

## Linssisepän auki (seuraavat)
- Veistokset näkyviin teoslistaan, nimikylttiin ja i-korttiin (tarvitsee nimitiedot SK:n patsaat.json:sta; UI Natiivi-UI).
- lahestyminen.json luonnos → false, kun SK/PT hyväksyy tekstin; testi MuseoMaaTestit.RanskanLahestyminen päivitetään samalla.
- Kaksi valinnaista teosta (orsay-rf-1975-19, orsay-rf-1951-42) kierrokselle vain PT:n luvalla.
- Pienet: QA:n 3D-lento vain Alankomaille, Ranskan osio LAHTEET.md:hen, kävijät/vartija Alankomaiden osissa (lippu pois).

## Agentin koko tarkistus

Mitä tarkistettiin: worktree /Users/Shared/Claude/wt/proto-linssiseppa-louvre, haara linssiseppa/louvre-pariteetti (46a637393 = BUILD 198 + 3 Louvre-commitia).
Datapolku R = Assets/Matkakirja/Linssit/Resources/Museo/. Median tiedostot tarkistettiin HEAD-pyynnöillä osoitteesta media.matkakirja.app.
Kertojan manifestina käytettiin manifest-198.json:ia (_valmiit/taidemuseo-kertoja-v2-manifest198-vienti-20261016b).
Lähtötilanne: Pariisin museo on kiinni omistajan päätöksellä 16.10. klo 23.53 (KaupunkiPallot.cs:101–103), kunnes puutteet on korjattu.
Silloin nimetyistä puutteista kohdat.json (2578a6d71) ja askeleet (c14679734) ovat jo valmiit. Lähestyminen on edelleen luonnos.

## Taulukko

| Kohta | Alankomaat | Ranska | Tila | Kenen työ |
|---|---|---|---|---|
| 1a Salit: huoneet, osat, ovet, kulkureitti | 9 huonetta, 16 osaa, 15 aukkoa, reitti 15; esteet koodissa | 4 huonetta, 10 osaa, 11 aukkoa, reitti 15; esteet, penkit, taivas ja GLB sali.json:ssa | OK | – |
| 1b Salikortit ja selitteet | SK:n tekstit (aula ja leiden ilman selitettä) | 4/4 selite ja teksti, mutta LS1:n luonnoksia | PUUTTUU (hyväksyntä) | SK |
| 1c Näyttelykuvat ja keskushallin kuva | 7 salia + panoraama | 4/4 + -iso + panoraama (pelikuva) | OK | – |
| 1d Salien avausäänet | ei ole | 4/4 manifestissa ja ämpärissä | OK (Ranskalla enemmän) | – |
| 1e Tekstitaulut | 64/64 | 50/51: se-monalisa (vitriini, seina null) ilman | OK (vitriini tarkoituksella) | LR, jos taulu halutaan |
| 2a Mitat ja kuvasuhde | 63/64 (kartta ilman mittoja tarkoituksella) | 51/51, ei pienennettyjä ripustuksia | OK | – |
| 2b Kuva-ASTC, seinä-JPEG ja teos.json ämpärissä | 64/64 ×3 | 51/51 ×3 | OK | – |
| 2c Paketin kuvasuhde vs mitat (venytys) | 13 yli 2 %, suurin 6,7 % | 15 yli 2 %, suurin 4,9 % | OK (sama taso) | – |
| 2d Kuvan tekijä ja krediitti (krediitti, kuva_tiedot.tekija_kuvalle, lahde_url) | 64/64 | 0/51 (vain kuva.commons_tiedosto); 15 kuvaa riskiluokka R1 ilman luokkaa, 1 D, 1 C | PUUTTUU (dokumentaatio ja riski) | SK |
| 2e lat, lon, tekija_wikidata, elinvuodet_lahde | kaikilla | 0/51 | PUUTTUU (koodi ei lue näitä) | SK (matala) |
| 2f teokset.json kuva.px | vastaa pakettia | 2 vanhentunutta (orsay-rf-1972, louvre-inv-4885) | kosmeettinen | SK tai Linssiseppä |
| 3a Ympyrät (kohdat.json) | 62/64 teosta, 176 ympyrää, luonnos false | 51/51, 152 ympyrää (50 × 3 + 1 × 2), luonnos false, kaikki kentät täynnä | OK | – |
| 3b kohdat.json:n huomio-teksti | – | Sanoo yhä "LUONNOS … PT hyväksyy ennen kytkentää" | kosmeettinen | SK |
| 4a Kertoja: teosten äänitteet | 37/37 pysähdystä, mp3 ja ajat ämpärissä | 49/49 maalauspysähdystä + 2 valinnaista, 57/57 mp3 ja ajat ämpärissä | OK | – |
| 4b Kertoja: veistospysähdykset | ei veistospysähdyksiä | 8 Rodin-pysähdystä ilman äänitettä; koodikaan ei soittaisi niitä | PUUTTUU | SK + Kertoja + Linssiseppä |
| 4c Valinnaiset teokset kierroksella | kaikki kerrotut ovat pysähdyksiä | orsay-rf-1975-19 ja orsay-rf-1951-42: kertoja, kohdat ja kohtazoom valmiina, mutta eivät kierroksella | PÄÄTÖS | PT → Linssiseppä |
| 5a i-kortti (lyhyt, elinvuodet, tekniikka, mitat, museo, muotokuva) | 64/64; muotokuva 16/28 tekijällä | 51/51; tekniikka puuttuu 1:ltä; muotokuva 28/29 tekijällä | OK, yksi aukko | SK |
| 5b Esittelykortti (kuvateksti_fi, myös ääneen luettuna) | 64/64 | 0/51 | PUUTTUU | SK |
| 5c Veistoksen kortti tai nimi | ei tarvita | Rodin-pysähdyksillä ei nimeä, korttia eikä listan rivejä | PUUTTUU | Linssiseppä + Natiivi-UI + SK |
| 6a Lähestyminen: kuvat | 8 valokuvaa + 2 havainnekuvaa + vanha kuva, luonnos false | 3 × 2 havainnekuvaa (Louvre, Orsay, Rodin), Rodinin vaaka on rajaus | OK, Rodinin vaaka väliaikainen | SK (Codex #233) |
| 6b Lähestyminen: teksti, puhe ja hyväksyntä | luonnos false, puhe | luonnos true, ylätason aani tyhjä, puhe kuvittain (Louvre ja Orsay, Rodinilla ei) | PUUTTUU (omistajan avausehto) | SK + PT |
| 6c Lähestymisen äänet | Museumpleinin ulkosilmukka ja Rijksin sisäänmeno | samat Amsterdamin äänet | PUUTTUU | ÄÄ + Linssiseppä |
| 6d 3D-lento (vain QA) | Amsterdam | lentää Amsterdamiin | matala | Linssiseppä |
| 7a Askeleet lattian mukaan | parketti ja marmori | parketti_tumma ja _vaalea → parketti (v2), sora ja kivi_hiekka (v3), kaikki ämpärissä | OK | – |
| 7b Salin taustaääni ja sello | museo-sali | sama | OK | – |
| 7c Elämä-lippu (oletus pois) | kävijät ja vartija Kunniagalleriassa | KgAlue on kovakoodattu Alankomaiden osiin | PUUTTUU (lippu pois) | Linssiseppä (matala) |
| 8 Auto zoom ja kohtazoom | 37/37, ajat osuvat | 51/51 kattavuus, mutta 5 uudelleenäänitettyä teosta ajastettu vanhoihin ottoihin | PUUTTUU | Linssiseppä |
| 9a Veistokset ja patsaspaketit | 34/34 sijoitettu ja ämpärissä | 8/8 Rodin ok; rodin-kolme-haamua JPEG-varan GLB 404; sc-nike ja gg-venus ilman patsasta | osin | NS + SK |
| 9b Muotokuvat | 16 kuvaa | 28 kuvaa (de La Tour null tarkoituksella) | OK | – |
| 9c Testit | 15 testitiedostoa | vain MuseoMaaTestit, AutoZoom ×2 ja LeveaTeos | PUUTTUU | Linssiseppä |
| 9d Kovakoodattu "alankomaat" | – | vain QA:n Elämä-lippu, 3D-lento ja testinäkymän "kg" | OK (vain QA/kehitys) | – |
| 9e LAHTEET.md ja Tekijätiedot | lähestymiskuvat ja panoraama dokumentoitu | Ranskan Codex-lähestymiskuvat ja panoraama puuttuvat LAHTEET.md:stä; Rodin-skannaukset näkyvät Tekijätiedoissa | PUUTTUU (dokumentti) | Linssiseppä/SK |
| 9f Kartan pienoismalli | Rijksmuseum | sama Rijksin malli Pariisissa | PUUTTUU | NS/LR |

## PUUTTUU-rivien tarkat tiedot

- **1b.** R/ranska/huoneet.json:3 huomio kertoo, että tekstit ovat LS1:n luonnoksia. Selitteet ja tekstit pitäisi korvata SK:n hyväksytyillä.
  Koskee huoneita louvre, romantiikka, impressionismi ja rodin.
- **2d.** Ranskan teokset.json:sta puuttuvat kentät krediitti, lahde_url, kuva_tiedot (commons_sha1, tekija_kuvalle) ja tekija_wikidata kaikilta 51 teokselta. Ranskalla on vain kuva.commons_tiedosto ja kuva.riski.
  Riskiluokat:
  - D: louvre-inv-777 (gallerix.ru).
  - C: orsay-rf-12258.
  - Luokka null, riski R1 (Louvren salikuvia, joissa on kävijän valokuva, ja Orsayn Google Art -kopioita): louvre-inv-4935, -4958, -5067, -4885, louvre-rf-1158, louvre-inv-3820, -4884, -3823, louvre-rf-2346, louvre-rf-129, louvre-inv-3824, louvre-mi-708, louvre-rf-1938-51, orsay-rf-1975-19 ja orsay-rf-1951-42.
- **4b.** Kierroksen rb-pronssikausi, rb-suudelma, rb-danaidi, rb-kasi, rp-porvarit, rp-ajattelija, rp-balzac ja rp-haamut eivät ole manifest-198:ssa.
  Lisäksi MuseoSovitin.cs:507 lukee `id = Kierros.NykyinenTeos?.Teos.Id`, joka on veistoksella null. Siksi kertoja.On(id) ei soittaisi veistosta, vaikka äänite olisi olemassa.
  Rodin-salissa soi vain ranska-sali4-avaus.
- **4c.** R/ranska/kierros.json:3: "valinnaiset eivät pysähdyksiä". Kertoja on silti tehty myös näille kahdelle.
- **5a.** R/ranska/teokset.json:492: louvre-inv-4935 `"tekniikka": null`, joten korttiin jää rivi "vuosi · mitat".
- **5b.** MuseoTaulu.cs:652 näyttää rivin Kuvateksti ja :657 lukee sen ääneen. Ranskalla kuvateksti_fi on 0/51, joten esittelykortista puuttuu kuvausrivi ja ääneen luetaan vain nimi ja tekijä.
  MuseoTestit.cs:273 InfokortinTiedot vaatii kuvatekstin vain Alankomailta.
- **5c.** MuseoTaulu ja MuseoSovitin.Teokset eivät tunne Nayttely.Veistokset-listaa. Rodin-näyttelyn teoslista on tyhjä, eikä pysähdyksellä näy nimeä eikä i-korttia.
  Veistosten nimitiedot ovat vain veistokset.json:n lahteet[].teos-kentässä. Ranskan sali.json:n veistospaikoilta puuttuu "teos"-objekti, joka Alankomailla on (nimi, mitat_m, krediitti).
- **6b.** R/ranska/lahestyminen.json:3 `"luonnos": true` ja :6 `"aani": ""`. Huomio väittää yhä "tyhjä teksti", vaikka teksti on täytetty.
  MuseoMaaTestit.cs:49 vaatii `d.Luonnos && d.AaniUrl == null`, joten testi pitää päivittää hyväksynnän yhteydessä.
- **6c.** MuseoSovitin.Lahestyminen.cs:62–63 määrittää UlkoUrl- ja SisaanmenoUrl-osoitteet kiinteästi (taidemuseo-taidehalli-v1, Museumplein). MuseoSovitin.Kuvalahestyminen.cs:133 soittaa saman Ranskassa.
- **7c.** MuseoKavijatLiike.cs:15 määrittää KgAlue-alueen Alankomaiden osista (kg, kg-k1v…kg-k4o, yv). MuseoElama.cs:88 ottaa vartijan osasta "kg".
- **8.** R/ranska/kohtazoom.json:n alku_s- ja loppu_s-ajat on laskettu vanhoista otoista. Ne eivät osu manifest-198:n ottojen sana-aikoihin:

  | Teos | Rivi | Kohtazoom | Sana-aika | Ero |
  |---|---|---|---|---|
  | orsay-rf-2735 (-v3) | 322 | "kattoja" 24,73 / 34,55 | 29,02 / 39,35 | −4,3…−4,8 s |
  | orsay-rf-2735 (-v3) | 322 | "oksat" 35,85 / 38,26 | 39,86 / 42,62 | −4,0…−4,4 s |
  | orsay-rf-1976 (-v3) | 1462 | "miestä" 12,36 | 12,07 | +0,3 s |
  | orsay-rf-1976 (-v3) | 1462 | "tyttöä" 20,22 / 27,89 | 19,56 / 26,26 | +0,7…+1,6 s |
  | orsay-rf-1976 (-v3) | 1462 | "koira" 26,98 | 25,82 | +1,2 s |
  | louvre-rf-1158 (-v3) | 1383 | – | – | −0,5 s |
  | louvre-rf-1938-51 (-v3) | 1097 | – | – | −0,3…−0,6 s |
  | orsay-rf-2027 (b-otto) | 1304 | – | – | −0,3…−0,6 s |

  louvre-rf-2346 ja orsay-rf-2449 (-v3) osuvat. Samalla tarkistuksella Alankomaiden ajat osuvat kaikki; sieltä tuli vain numero- ja monisanaosumien vääriä hälytyksiä.
- **9a.**
  - media taidemuseo/ranska/patsaat/glb/rodin-kolme-haamua.glb palauttaa 404. Tätä varaa käytetään vain ilman ASTC-tukea (simulaattori).
  - R/ranska/sali.json:5895 sc-nike (louvre-ma-2369) ja :5961 gg-venus (louvre-ma-399) ovat veistospaikkoja ilman sijoitusta, "ei 3D-mallia v1:ssä".
  - Koodi ohittaa tyhjät paikat (MuseoRakennus.cs:359). Tarkista simulla, näkyykö GLB:ssä tyhjä jalusta.
  - Sivuhuomio Alankomaista: veistokset.json:ssa ei ole lahteet[]-listaa. Siksi 34 CC BY -skannausta ei näy Tekijätiedoissa (Tietoja.cs:217 lukee vain lahteet[]).
- **9c.** Vain Alankomaiden dataa lukevat:
  - MuseoTestit.cs: Huoneet, Jalustat, KierrosJaPysahdykset, KatseluasentoKaikilleTeoksille, InfokortinTiedot, TeoskierrosKertojanTeoksilla, SisaltokirjurinSkeema ja TeoksetV2.
  - MuseoKohdatTestit.cs:40 KohdatTiedostosta.
  - MuseoKavely-, MuseoKavijat-, MuseoKehysvarjo-, MuseoKuvaporras-, MuseoKuvareitti-, MuseoOsoitus-, MuseoOvensuu- ja MuseoTaukoKameraTestit.
- **9e.** LAHTEET.md:ssä ei ole Ranskan rivejä seuraaville: louvre-, orsay- ja rodin-lahestyminen-codex-{pysty,vaaka}.jpg (oma tuotanto) ja ranska/nayttelykuvat/kunniagalleria-panoraama.jpg (pelikuva).
- **9f.** KaupunkiPallot.cs:96–97: "Louvren omaa karttamallia ei vielä ole".

## Linssisepän korjattavat (konkreettiset muutokset)

1. **Kohtazoomin ajat uusiin ottoihin.** Tiedosto: R/ranska/kohtazoom.json.
   - Laske alku_s ja loppu_s uudelleen manifest-198:n ajat-tiedostoista: ajat/ranska/<id>-v3.json ja orsay-rf-2027b.json.
   - Koskee teoksia orsay-rf-2735, orsay-rf-1976, louvre-rf-1158, louvre-rf-1938-51 ja orsay-rf-2027.
   - Haku alku- ja loppusanalla sanat[]-listasta, kuten alkuperäisessä työkalussa.
   - Lisää testi, joka tarkistaa jokaisen Ranskan kohdan osuvan manifestin sana-aikoihin.
2. **Veistospysähdyksen kertoja.** MuseoSovitin.cs:507 (`var id = Kierros.NykyinenTeos?.Teos.Id`) ja :515/:528/:531:
   - Käytä veistoksella tunnusta `Kierros.NykyinenVeistos?.Veistos` (patsas-id), jotta manifestin rivi "rodin-…" soi ja pidentää pysähdystä.
   - Tarvitsee 8 äänitettä: SK tekstit, Kertoja generoi.
3. **Veistos listaan ja nimikylttiin.**
   - MuseoSovitin.Teokset ja NykyinenTeos: lisää veistokset näyttelyn riveiksi Nayttely.Veistokset-listasta.
   - Nimi, tekijä ja vuosi: lisää veistokset.json:iin teostiedot (nimi_fi, tekija, vuosi, materiaali, mitat, museo, lyhyt_fi) tai lue ne SK:n patsaat.json:sta.
   - MuseoTaulu (Natiivi-UI) näyttää veistoksen nimen ja i-kortin.
4. **Lähestymisen ulkoäänet maan mukaan.**
   - MuseoLahestymisData: lisää lahestyminen.json:iin kentät "ulkoaani" ja "sisaanmeno"; puuttuessa käytetään nykyistä Museumpleinin ääntä.
   - MuseoSovitin.Kuvalahestyminen.cs:133 ja Lahestyminen.cs:127/299 käyttävät dataa UlkoUrl- ja SisaanmenoUrl-vakioiden sijaan.
   - Pariisin ääni tilataan ÄÄ:ltä: Cour Napoléon ja pyramidi.
5. **Lähestymisen tila, kun SK ja PT ovat hyväksyneet.** R/ranska/lahestyminen.json:
   - `"luonnos": false`
   - Huomio-teksti ajan tasalle.
   - Päätös ylätason aani-kentästä (nyt "", kuvakohtaiset puheet ok).
   - Päivitä MuseoMaaTestit.cs:49.
6. **Kierroksen valinnaiset teokset.** Jos PT hyväksyy, lisää R/ranska/kierros.json:iin orsay-rf-1975-19 ja orsay-rf-1951-42 impressionismin kohdalle; kertoja, kohdat ja kohtazoom ovat valmiina.
7. **Ranskan datatestit Alankomaiden mallin mukaan.** MuseoMaaTestit.cs tai uusi MuseoRanskaTestit.cs:
   - InfokortinTiedot: elinvuodet, tekniikka ja kuvateksti 51/51.
   - KohdatTiedostosta: 51 teosta, 152 ympyrää, https-lähteet.
   - KatseluasentoKaikilleTeoksille.
   - TeoskierrosKertojanTeoksilla: jokaisella pysähdyksellä, veistokset mukaan lukien, on manifestin rivi.
   - Ovensuu jokaiselle 4 salille.
8. **Elämä-lippu (matala).**
   - MuseoKavijatLiike.KgAlue ja MuseoElama.cs:88 vartija "kg": alue ja vartijan osa sali.json:sta tai huoneet.json:sta (esim. kentät "elama_alue" ja "vartija").
   - Toinen vaihtoehto: estä lippu Ranskassa lokirivillä.
9. **3D-lento (matala, vain QA).** MuseoSovitin.cs:309: Lahestyminen3d vain, kun MuseoMaa.Id == Alankomaat; muuten kuvalähestyminen ja lokirivi.
10. **LAHTEET.md.** Lisää osio "Ranska": louvre-, orsay- ja rodin-lahestyminen-codex-{pysty,vaaka}.jpg (Codex, oma tuotanto, havainnekuva) ja ranska/nayttelykuvat/* + kunniagalleria-panoraama.jpg (pelikuvat, oma tuotanto).
11. **teokset.json kuva.px (kosmeettinen).** Päivitä orsay-rf-1972 → [2444, 1921] ja louvre-inv-4885 → [4489, 5853] pakettien teos.json:n mukaan.
12. **Sivuhuomio Alankomaista.** R/alankomaat/veistokset.json: lisää lahteet[] sali.json:n veistospaikat[].teos-tiedoista (34 CC BY -skannausta), jotta Tekijätiedot (Tietoja.cs:217) nimeää ne.

## Muiden työt (ei Linssisepän)

- **SK:**
  - Teksti kuvateksti_fi 51 teokselle.
  - louvre-inv-4935 tekniikka.
  - Salien selitteet ja tekstit (huoneet.json) LS1:n luonnosten tilalle.
  - Lähestymisen tekstin hyväksyntä.
  - 8 Rodin-veistoksen kertojatekstit ja i-kortin tiedot.
  - Kuvien krediitit ja riskien (R1, C, D) ratkaisu, tarvittaessa paremmat kuvat louvre-inv-777:lle ja R1-kuville.
  - kohdat.json:n huomio-teksti ajan tasalle.
- **Kertoja/ÄÄ:**
  - 8 veistosäänitettä manifestiin (uusi manifest-199).
  - Pariisin ulkoilmasilmukka ja sisäänmeno lähestymiseen.
- **NS:** rodin-kolme-haamua.glb (JPEG-vara) ämpäriin. Louvren oma pienoismalli karttaan (yhdessä LR:n kanssa).
- **LR/NS:** Tarkista, näkyykö sc-niken ja gg-venuksen jalusta tyhjänä. Patsas, jos lisensoitu skannaus löytyy.
- **SK (Codex):** Rodinin vaakakuva #233 (nyt pystykuvan rajaus).
