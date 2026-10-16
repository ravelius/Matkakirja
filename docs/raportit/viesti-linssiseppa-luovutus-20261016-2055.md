# Linssisepän luovutus 16.10.2026 klo 20.55 (KOVA RAJA 35 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Testit `sh Linssit-testit/kaanna.sh [nimi] </dev/null` worktreessa, tarkistus `zsh tyokalut/tarkista.sh`.
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (SIMU NYT -liput), Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab.
Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla; jokaisen ajon jälkeen SIMU VAPAA Julkaisijalle.
Kaikki ajoskriptit ovat irrotettuja (nohup) ja odottavat lippuaan, joten nollaus ei katkaise niitä.

## Simujono (Julkaisijalla tiedossa): Köö/Ams-heikot (käynnissä 20.47) → Kiina3 (kun KIINA3 VALMIS) → Peking361c

## 1. ENSIMMÄISEKSI: KIINAN DYNASTIAT v3 -PALLOKUVAT PT:LLE (omistaja 20.35 "Viileä sininen")
- Haara linssiseppa/kiinan-dynastiat 50ade51e8, worktree /Users/Shared/Claude/wt/proto-linssiseppa-kiina. Tässä vuorossa:
  - eb5e498c7: Tiibet 1760 näkyi värittömänä. Syy: maaston korostus 2 nostaa ylängön 5 km:n täyttö- ja rajakerroksen yli
    (ZTest). Kiinan täytöt ja rajat on nostettu 20 km:iin (IsoisaKerros.RajaKorkeus). Testi KolmiotPeittavatKokoAlueen.
  - 03096b843: Sisältökirjurin 19 tarinariviä (#4724) tiedostossa Resources/Kiina/kiina-tarinarivit.json → DynastiaVuosi.Tarina
    (näkyy lokissa `kiina vuosi <v>`). Selite päivitetty: "Ulkoiset hallitsijat viilein sävyin", protektoraatti "vaaleampi, katkoviiva".
  - Data: Karttaseppä 7029baf97 (Qing #41709c, xiongnu #5f7b69) → 718bca80b (turkit 589, uiguurit ja Nanzhao 790, Dali 950–1142).
  - Testit KiinaTestit 7/7, unity-tarkistus 0.
- KÄÄNNÖS KÄYNNISSÄ 20.51: ajo-kiina4v3.zsh → kaanna-kiina3.out → _tyo/linssiseppa/kiina-app. Kun lokiin tulee "KIINA3 VALMIS <sha>",
  lähetä Julkaisijalle KIINA3 VALMIS ja pyydä `touch .../linssiseppa-ajot/simu-kiina4v3.nyt` (Kiina saa mennä Pekingin edelle).
- Skenaario sk-kiina-v3.txt, 12 kuvaa: -221, -100, 589, 790, 950, 1142, 1644, 1760, 1873, 1912 sekä lähikuvat 1760 Tiibet ja Peking.
  HUOM: pystyyn tallentuneet kuvat (vanhoissa K5-kuvissa) on kierrettävä 90° (PIL rotate(90, expand=True)).
- Tulos: lokit/todistus-kiina4v3-ipad-*/kuvat/. Tarkista: Tiibet 1760 vaalealla sinisellä kuten Mongolia, Qing sininen, uudet
  alueet näkyvissä. Kokoa kuvat kansioon _valmiit/kiinan-dynastiat-pallo-20261016/v3/ ja päivitä LUE.md (värivalinta tehty, Tiibet
  korjattu, tarinarivit). Lähetä PT:lle 3 riviä. PT: "linssi junaan, kun kaikki kunnossa" → kun kuvat ovat ok, haara NS:lle junaan.
- Seuraava erä (ei aloitettu, kerro PT:lle): tarinarivit filminauhaan ja kelloon (suunnitelman mukaan "samat kuin aikajanamoottorissa").
  Kiinan linssissä ei vielä ole filminauhaa. Tämä on oma eränsä, ja UI-osa todennäköisesti NUI:lle.

## 2. PEKING #361: JUURISYY LÖYTYI, UUSINTA JONOSSA
- Näkyvyyskoe (korjattu `linssi kerros`, haara linssiseppa/kerros-piilo-197 ea938f67f, kerros-app dc48614f) osoitti, että pelissä
  näkyvä maa on Ionin maastoa ja ilmakuvaa. Omat mallit piilossa → maa pikselilleen sama. Kolmikkokuvat:
  lokit/linssiseppa-peking361koe-20261016/kolmikko-*.jpg.
- SYY: v5-, v6- ja v7-pakettiemme mallit.json-tiedostoista puuttui `ion_leikkaus` (Codexin palatsialue-leikkaus-wgs84.geojson,
  12 osaa; peli tukee sitä Valosepän 3a2212636:sta lähtien). Lisäsin sen v6/ktx- ja v7/ktx-tiedostoihin ([lat, lon]).
  JATKOSSA: rakenna-peking*.zsh:n pitää kopioida ion_leikkaus aina. Lisää se skriptiin ennen seuraavaa pakettia.
- V6:n AO-arvio (399c814e5) ja V7-väliarvio (95e6956d1) eivät olleet päteviä. Codexille kerrottu: 0c6d343d2.
- UUSINTA: ajo-peking361c.zsh (lippu simu-peking361c.nyt, kerros-app, peking361-vertailu.zsh, L=lokit/linssiseppa-peking361c-20261016).
  Tarkista ensin tapahtumat-*.txt: omat mallit + ionin leikkaus, ja onko piilo23-kuvan maa nyt ERI kuin normaalin (oma paving näkyy).
  Tee sitten varsinainen V7-arvio Codexille postiin (worktree /Users/Shared/Claude/wt/linssiseppa-posti, detached → `git push origin
  HEAD:claude/postilaatikko`): kivien luettavuus, 4,8 m:n toisto ja moiré, sävymosaiikki, vanha/uusi-raja, LOD, ruutuaika ja KTX2-koko.
  Jos V7 hyväksytään: Julkaisija vie V7:n (ion_leikkauksella) omistajan piilotettuun kippiin ilman junaa, ja PT:lle lähtee rivi.
  Arvioi samalla V6:n AO uudelleen (nyt näkyvissä).

## 3. KÖÖPENHAMINA JA AMSTERDAM, HEIKOIMMAT KOHDAT (junaan 197)
- Vakioajot valmiit: lokit/todistus-koopenhaminavakio197-ipad-20261016-2006 ja todistus-amsterdamvakio197-ipad-20261016-2019.
  - Kööpenhaminan heikoin: e08 Tivoli. Silmä 32–44 m, kamera järven yllä katsoen 250° Lasihalliin, laatat 36 %, järveä ei näy.
    Tivoli on pallokierroksen dataa (koopenhamina pallokierros-v6, katse_suunta = KAMERAN PUOLI).
  - Amsterdamin heikoin: e01 Rembrandtin talo. Silmä 19 m, etualan sumea moderni julkisivu peittää talon. Työntekijän kohde, katse -.
- KOKEILUAJO KÄYNNISSÄ 20.47: ajo-kooamsheikot197.zsh, skenaario sk-kooams-heikot-197.txt, app belvedere198-app.
  - Tivoli T1–T3 kehittäjän korjauksella (katse_suunta 230/250/200, kaari 20, silmä 60–75). T1 = järvi, laiva ja raatihuoneen
    torni (Wikidata: järvi 12.56973/55.67392, Sct. George III 12.56915/55.67411, Kultainen torni 12.570718/55.673303).
  - Rembrandt R0 = nykyinen. R1–R4 kiinteällä kameralla (Q277316 52.369444/4.901389): 330° 115 m/61°, 225° 115/61, 330° 150/55, 45° 130/60.
- Tuloksesta:
  - Tivoli → pallokierros-v7: Linssit-testit/kultaiset/pallokierros-v1/koopenhamina.json ja Pallokierros.Versiot koopenhamina,
    testien poikkeuslistat Praha v7:n 91251af40:n mallin mukaan. JSON pitää viedä R2:een opas/pallokierros-v7/ kuten aiemmin.
  - Rembrandt → OpasKatseOletukset-rivi (KatseSuunta, KatseKaari 15, SilmaMinM/MaxM; kenttä lisätty: ba9d099ce) + AukionKamerat
    rajattu, jos tarpeen + testi kuten BelvedereYlapalatsiAiheena.
  - Haara linssiseppa/koo-ams-197 (wien-rooma-197:n päällä), worktree /Users/Shared/Claude/wt/proto-linssiseppa-kooams.
    Valmiin haaran kuvat _valmiit/:iin, haara NS:lle ja yksi rivi PT:lle.

## 4. VALMIIT TÄSSÄ VUOROSSA
- Kiinan v1-pallokuvat PT:lle (_valmiit/kiinan-dynastiat-pallo-20261016/), ja omistaja valitsi niiden perusteella sinisen Qingin.
- Tiibet-korjaus, tarinarivit, uusi data ja selite (kohta 1).
- Peking: `linssi kerros` -korjaus ea938f67f ja juurisyy (kohta 2). Codexille väliarvio 95e6956d1 ja koe 0c6d343d2.

## 5. AVOIMET
- Uudet worktreet: kerrospiilo (linssiseppa/kerros-piilo-197, junaan diagnostiikkakorjauksena NS:n kautta), kooams (työn alla).
  Vanhat: kiina, linssiseppa-posti, wienrooma ja edellisen luovutuksen lista.
- _tyo/linssiseppa: kerros-app (Peking-uusinta käyttää), kiina-app, belvedere198-app (Köö/Ams), peking360/ (v5 pois, kun V7 on arvioitu).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-2055.md).
Ensin: `tail -3 ajo-kiina4v3.log ajo-kooamsheikot197.log ajo-peking361c.log` linssiseppa-ajot-kansiossa.
- KIINA3 VALMIS → Julkaisijalle (kohta 1); Kiinan kuvat ovat PT:n ensisijainen työ.
- Köö/Ams-heikot valmis → SIMU VAPAA, valinnat ja haara (kohta 3).
- Peking361c valmis → SIMU VAPAA ja V7-arvio Codexille (kohta 2).
