# Erikoismalli: Visbyn muuri ja hansakaupunki (speksi 27.9.2026, Mallinseppä)

*Pohja docs/raportit/erikoismalli-speksi-pohja.md. Elämänidea on erän 5 ehdotuksen kohta 2
(docs/raportit/erikoismallit/era5-ehdotus-20260927.md), jonka omistaja hyväksyi. B:tä ei ole.*

## 0. ELÄMÄNIDEA — OMISTAJA HYVÄKSYI 27.9.2026

- **Kolme riviä (fakta):** Visbyn muuri on 3,4 km pitkä, jopa 11 m korkea, ja sen 29 päätornista 27 ja 22–23
  satulatornista 9 on yhä pystyssä (sv-Wikipedia "Visby ringmur"). Maamuuri rakennettiin pääosin 1270–1280-luvuilla, ja
  vanhin osa, satamaa vartioinut Kruttornet, on noin vuodelta 1160. Hansakaupunki Visby on UNESCOn maailmanperintökohde
  vuodesta 1995 (en-Wikipedia "Visby"). Kaupunki on rinteessä: merenpuoleinen muuri on noin 2 m:n ja itämuuri Klintenin
  päällä noin 40 m:n korkeudella (en-Wikipedia "Visby City Wall"). Nykyään Destination Gotlandin lautat tulevat satamaan
  Nynäshamnista ja Oskarshamnista (sv-Wikipedia "Destination Gotland").
- **Legenda (ei faktaa):** Valdemar Atterdag valloitti Visbyn 1361. Tarinan mukaan tanskalaiset asettivat kolme
  oluttynnyriä (ölkar) ja vaativat ne täytettäviksi aarteilla. Tarinaa ei ole missään aikalaislähteessä. Se esiintyy
  ensimmäisen kerran Hans Nielssøn Strelowin kronikassa vuonna 1633, ja C. G. Hellqvistin maalaus (1882) kuvaa sen torilla
  (sv-Wikipedia "Valdemar Atterdag brandskattar Visby"). Kortissa legenda ja fakta pidetään erillään: fakta on, että
  Valdemar valloitti kaupungin 1361 ja teetti symbolisesti aukon muuriin Söderportin kaakkoispuolelle (muurattiin umpeen
  1363, sv-Wikipedia "Visby ringmur").

### Idea: Gotlannin lautta ja Valdemar Atterdagin oluttynnyrit
- **Perusliike:** Gotlannin lautta liukuu Visbyn satamaan muurin edustalle, kääntyy ja peruuttaa laituriin, odottaa ja
  lähtee. Lautta tulee näkyviin meren vasemmasta päästä (pohjoisesta, Nynäshamnin suunnalta), liukuu kaupungin
  rantamuurin ja Kruttornetin editse satamaan, tekee satama-altaassa puolikäännöksen ja peruuttaa perä edellä
  lauttalaituriin. Siellä se odottaa, lähtee keula edellä takaisin ja katoaa samasta päästä. Siemenestä vaihtelevat
  tauko merellä, odotus laiturissa, vauhti, käännöksen suunta ja kulkulinja.
- **Harvinainen (noin 1/10 saapumisista):** Stora torgetille ilmestyy kolme oluttynnyriä, jotka täyttyvät
  kimaltelevalla kullalla (kulta-aksentti) ja katoavat (noin 7 s).
- **Reaktio:** lähestyminen tuo lautan heti satamaan, ja napautus näyttää tynnyrit (enintään kerran 20 s:ssa, myös yöllä).
- **Yöllä:** muurin tornit ja Pyhän Katariinan (S:ta Karin) kirkon raunio hehkuvat lämpiminä, kuten Visbyn
  iltavalaistuksessa. Lautta kulkee yölläkin, ja sen ikkunanauha hehkuu. Tynnyrit eivät tule yöllä itsestään.
- **Laatukynnys:** vaalea muurikehä ja sen monet neliötornit tunnistaa sekunnissa, ja lautta liikkuu mallin edessä
  vedellä, joten liike näkyy 40 pt:ssä. Kultaa täyttyvät tynnyrit hymyilyttävät ja opettavat legendan. Kaikki liike
  pysyy mallin jalanjäljellä, ja satama on pieni. Lautta on nykyaikaa (AIKA sallii).

## 1. Tunniste ja paikka
- `kohde:visby`, avain `visby`. Ruotsi (SWE), 57,6357 N, 18,299 E (js/packs/nostoankkurit-swe.js), taso 1,
  tyyppi kaupunki (js/packs/maastokohteet-swe.js, nappi "Ruusujen ja raunioiden kaupunki").

## 2. Viitekuvat (Commons, lisenssit ja tekijät tarkistettu Commonsin API:sta 27.9.)

| Tiedosto | Näkymä | Lisenssi ja tekijä |
|---|---|---|
| Visby - KMB - 16000300020678.jpg | ilmasta idästä: Östermur tornineen, punakattoinen kaupunki, tuomiokirkko, S:ta Karin ja meri | CC BY 2.5, Jan Norrman (Riksantikvarieämbetet) |
| Visby - KMB - 16000300024305.jpg | ilmasta kaakosta: maamuuri ja tornit, kaupunki rinteessä meren yllä | CC BY 2.5, Jan Norrman (Riksantikvarieämbetet) |
| Aerial photograph of Visby, July 2016.jpg | ilmasta idästä merelle: S:ta Karin, Stora torget, Almedalen, satama ja lautta | CC BY 2.0, CucombreLibre |
| Visby domkyrka från luften.jpg | tuomiokirkko: länsitorni ja kaksi itätornia mustine barokkihuppuineen | CC BY-SA 4.0, L.G.foto |
| Visby ringmur. Landmuren Östermur med vallgravar.jpg | Östermur ulkoa: neliötornit, satulakattoinen Dalmanstornet | CC BY-SA 4.0, Xr.Stg |
| Kruttornet, Visby.jpg | Kruttornet pyramidikattoineen ja rantamuuri mereltä | CC BY-SA 4.0, Bene Riobó |
| Campus Gotland - Visby harbor.jpg | Almedalen, Kruttornet ja satama ylhäältä | CC BY-SA 3.0, Dagge67 |
| MS Visborg.jpg | lautta M/S Visborg (nyk. M/S Visby): valkoinen runko, tummat ikkunanauhat, piippu perässä | CC BY-SA 4.0, Sinikka Halme |
| 18th century map of Visby, Sweden.jpg | pohjapiirros 1790-luvulta: muurin kehä, portit, puutarhat ja satama | PD, Fredrik Adolf Wiblingen |
| Carl Gustaf Hellqvist - Valdemar Atterdag Holding Visby to Ransom, 1361 - Google Art Project.jpg | legendan tynnyrit torilla (maalaus 1882) | PD, Carl Gustaf Hellqvist |

- Muurin, porttien, kirkkojen ja torin paikat on otettu OpenStreetMapista (ODbL, © OpenStreetMapin tekijät) vain
  viitteeksi. Kuvat ovat vain viitteitä. Malli on oma (CC0), eikä kuvista kopioida pintoja eikä tekstuureja.

## 3. Siluetti ja tunnusmerkit (tärkein ensin)
1. Vaalea kalkkikivimuuri kehänä kaupungin ympärillä ja siinä monta korkeaa neliötornia tasaisin välein. Maamuurin kaari
   nousee rinnettä ylös ja kiertää kaupungin takaa. Porttitornit (Norderport, satulakattoinen Dalmanstornet ja Österport)
   ovat muita tukevampia, ja rannassa on Kruttornet pyramidikattoineen.
2. Tiivis kaupunki jyrkkine, punaruskeine tiilikattoineen rinteessä merestä Klinteniin. Rinteen yläosa (ylempi kaupunki)
   on puutarhojen vihreä.
3. Pyhän Marian tuomiokirkko Klintenin juurella: vaalea kirkko jyrkkine kattoineen, neliömäinen länsitorni ja kaksi
   hoikkaa kahdeksankulmaista itätornia. Kaikissa kolmessa on musta barokkihuppu, ja ne ovat mallin korkein kohta.
4. Kirkkojen rauniot kattojen keskellä: kattoja vailla olevat vaaleat kivikehät, eli S:ta Karin Stora torgetin laidalla,
   S:t Nicolai, Drotten ja S:t Lars sekä S:t Hans ja S:t Per.
5. Kapea meri mallin edessä, pieni satama oikealla ja valkoinen Gotlannin lautta.
- **Pelikoko 40 pt (kallistus 30–55°):** tunnistus tulee vaaleasta tornikehästä punaisen kattomassan ympärillä, kolmesta
  mustasta tornihuipusta ja sinisestä rantakaistasta, jolla on valkoinen lautta. Ylhäältä luetaan D:n muotoinen kehä,
  jonka ulkoreunalla on tornien neliöt, sekä katot ja raunioiden vaaleat kehykset.
- **Pois jätetään:** muurin ulkopuolinen nykykaupunki (Östercentrum, satamaterminaalit ja risteilylaituri), vallihaudat,
  Visborgin linnan jäänteet, S:t Göranin ja muut muurin ulkopuoliset rauniot, kadut ja suurin osa satulatorneista (vain
  lähitasossa). Pienet rauniot (S:t Clemens, Helge And, S:t Olof) ovat mukana vain, jos budjetti riittää.

## 4. Mitat ja koko
- **Todelliset mitat:** muurin kehä on noin 1,42 km rannan suuntaan ja 0,6 km syvä (OpenStreetMap). Muuri on jopa 11 m
  korkea (sv-Wikipedia), Dalmanstornet noin 17 m (sv-Wikipedia) ja Långa Lisa korkein muuritorni (kuusi kerrosta).
  Tuomiokirkon länsitorni hupun kanssa on 58 m ja itätornit 54,5 m (sv-Wikipedia "Visby domkyrka"). Maasto nousee
  merenpuoleisen muurin 2 m:stä itämuurin 40 m:iin (en-Wikipedia). Lautta M/S Visby on 200 m pitkä ja 25,2 m leveä
  (sv-Wikipedia "M/S Visby (2018)"). Talojen ja raunioiden korkeudet on arvioitu kuvista.
- **Yksikkö:** 1,0 ≈ 1 450 m. Mallin mitat noin 1,00 × 0,17 × 0,54 (x × y × z), juuri jalanjäljen keskellä maassa, eikä
  pohjalevyä ole.
- **Liioittelu:** rakennukset noin 4 × (muuri 0,032, tornit 0,06–0,08, talot 0,025–0,035 ja tuomiokirkon huippu 0,16) ja
  maasto noin 1,3 × (Klint nostaa ylemmän kaupungin 0,035:een). Tornit ja talot ovat pohjaltaan liioiteltuja (talo
  0,03–0,05 edustaa korttelin kattoja). Lautta on 0,10 × 0,024 eli noin 0,7 × todellinen pituus, jotta satama ei hallitse.
  Legendan tynnyrit ovat 0,04 korkeita (legendan kokoisia, noin 25 ×).
- **Suunta tyylitelty:** todellisuudessa meri on lännessä ja maamuurin kaari kiertää kaupungin pohjoisesta idän kautta
  etelään. Malli on käännetty 116° vastapäivään: rannikko (Strandmuren) on mallin etureuna, meri ja satama ovat edessä
  (todellinen länsiluode) ja maamuurin kaari tornineen kiertää kaupungin takana (itä). Snäckgärdsporten on vasemmassa
  päässä (pohjoiskoillinen) ja Söderport ja Skansport oikealla (etelälounas). Kaari avautuu kameraa kohti kuin
  amfiteatteri, joten kallistettu kamera näkee koko kehän, rinteen ja sataman lautan, ja tornit nousevat kaupungin taakse
  Klintenin päälle. Rantamuuri on tyylitelty suoraksi ja yhtenäiseksi Kruttornetista satamaan (nykyään osin purettu).
  Satama on siirretty muurin lounaiskulman eteen (todellisuudessa kulman ulkopuolella etelässä).

## 5. Paletti ja aksentti
- Muuri ja tornit ovat vaaleaa kalkkikiveä #d2c8b0, varjossa #b6a888. Avoimien tornien sisus on #8a7a5e, porttitornien
  ja Kruttornetin katot ovat tiiltä.
- Talojen katot ovat hillittyä punaruskeaa tiiltä #94654a ja tummempana #7c5540, ja seinät paperia #efe4cc tai vaaleaa
  okraa #e2cfa2.
- Tuomiokirkko on harmaata kiveä #cabfa4, katto #8a5c44 ja huput mustetta #3b2f22. Rauniot ovat kalkkikiveä #d8ceb4, ja
  niiden sisällä on nurmea #a9a67c.
- Maasto: alakaupunki #e0d3b3, ylemmän kaupungin puutarhat #b3b184 ja Klintenin rinne #bfae8a. Puut ovat EmPuu.
- Vesi on EmVesi, laiturit EmKiviVaalea ja lautta valkoinen #f6f0e0 (ikkunanauha mustetta ja piippu tiiltä).
- **Aksentti on kulta EmKulta #dcb466:** vain tynnyrien kulta ja kimallus, tapahtuman aikana alle 2 % alasta. Ei muita
  täysiä värejä eikä kiiltoa.
- Yövalot ovat EmIkkunavalo.

## 6. Animaatio (VisbyLiike, malli/Elava/ErikoisLiikeVisby.cs)
- **lautta** (pivot laiturissa, keula vasemmalle): tulee näkyviin meren vasemmasta päästä (x −0,43) skaalalla 0 → 1
  1,2 s:ssa ja liukuu kulkulinjalla (z −0,205) oikealle satamaan (14 s, smootherstep). Satama-altaassa se tekee
  puolikäännöksen (180°, 4,5 s, suunta siemenestä), peruuttaa laituriin (3,5 s) ja odottaa. Lähtö on keula edellä takaisin
  vasemmalle (15 s), ja lautta katoaa skaalalla vasemmassa päässä. Liikkeessä runko kallistuu hieman (±1,5°).
- **vana:** V-muotoinen ohut vaalea vana perän takana, skaala vauhdin mukaan (kuten Bruggessa). Ei ääriviivaa.
- **tynnyri0–2, kulta0–2 ja kimallus0–2** (tapahtuma noin 7,2 s): tynnyrit putoavat torille porrastettuina (0,25 s välein
  ja pieni pomppu), kulta nousee tynnyrin sisältä reunan yli kasaksi (1,0–3,5 s), kimallus pyörii ja sykkii kasan yllä ja
  kaikki pienenevät pois 6,0–7,2 s. Järjestys, täyttövauhti (±15 %) ja kimalluksen vaihe tulevat siemenestä.
- **valot0–3** (muurin tornit neljänä ryhmänä, pivot ryhmän keskitornin juuressa, jottei hehku leijaile) ja **valot4**
  (S:ta Karin): Valot() eli syttyminen ja sammuminen 1,5 s ilman välähdystä. **lauttavalo:** lautan ikkunanauhan hehku
  yöllä lautan asennossa.
- **Vaihtelu:** KayMinS 20, KayMaxS 26 (saapuminen, käännös ja peruutus), SeisooMinS 15, SeisooMaxS 45 (laiturissa), tauko
  merellä 25–70 s, TaukoTod 0,2 (pitkä tauko 70–120 s) ja Puuska 0. Vauhti ±10 %, kulkulinja ±0,006 ja käännöksen suunta
  vaihtelevat. Siemen tulee noston tunnuksesta, joten sama tunnus tuottaa saman aikataulun ja eri tunnus eri aikataulun.
- Harvinainen arvotaan jokaisesta saapumisesta (p 0,1, oma kanava). Lähestyminen tuo lautan heti, jos se on merellä.
  Laiturissa odottava lautta, merellä oleva lautta ja hiljainen tori piirtävät 0 kehystä, ja vähennetty liike pysäyttää
  pehmeästi. Liikkuvat osat ovat alle kolmanneksen mallista.

## 7. Kolmiot ja LOD
- **Runko noin 1 200:**
  - meri ja satama 60 (vesi palasina ilman ääriviivaa, laituri, aallonmurtaja ja lauttalaituri)
  - maasto 90 (alakaupunki, Klintenin rinne ja ylempi kaupunki) ja ranta 20
  - muuri 150 ja tornit 230 (noin 17 päätornia, porttitornit ja Kruttornet)
  - tuomiokirkko 70, rauniot 110 (4–5 kpl), Stora torget 4
  - talot 420 (noin 30 taloa) ja puut 50
- **Osat noin 250:** lautta 34, vana 4, tynnyrit 3 × 24, kulta 3 × 10, kimallus 3 × 16, valot 56 ja lauttavalo 4.
  **LOD0 yhteensä noin 1 450** (budjetti 1 500).
- LOD1 ei ole tasolla 1 käytössä. Tarvittaessa noin 350: kehä yhtenä muurina ja 10 tornia laatikkoina, kattomassat, kirkko
  ilman huppuja ja vesi.
- **Lähitaso (VisbyLahi, arvio 2 900 eli noin 2,4 × runko, katto 3 000).** Siluetti, mittasuhteet, värit, ääriviivaosat ja
  osien pivotit ovat samat kuin rungossa. Lisätään:
  - muurin sakarat ja ampuma-aukot, tornien avoimet takaseinät kerroksineen (Visbyn tornit ovat kaupungin puolelta
    avoimia), tornien sakarat, porttikaaret ja muutama satulatorni
  - Kruttornetin luukku ja rantamuurin portit (Fiskarporten, Lilla Strandporten)
  - tuomiokirkon ikkunat, lombardinauha ja huppujen lyhdyt
  - raunioiden suippokaari-ikkunat ja S:ta Karinin pilarit, talojen ikkunat, ovet ja porraspäädyt
  - laiturin pollarit ja lauttalaiturin ramppi sekä puita lisää.
  - Liikkuvat osat sopivat edelleen: kulkulinja, laituri, tori ja tornien valopinnat ovat samoissa kohdissa.

## 8. Ääriviiva ja perspektiivi
- Omat ääriviivaosansa: muurikehä tornineen, maasto ja ranta (yksi osa, joten viiva kiertää kehän ulkoreunaa eikä
  jokaista tornia erikseen), tuomiokirkko ja satamalaituri.
- Vesi on palasina (kukin alle ääriviivan kynnyksen), joten sillä ei ole ääriviivaa eikä kehystä. Rannan viiva jää veden
  alle. Kameran puoleinen reuna ja päät rajautuvat suoraan karttaan.
- Ilman ääriviivaa jäävät talot, rauniot, puut ja tori, koska niiden puoliväli on alle 0,035. Liikkuvilla osilla ei ole
  ääriviivaa: lautta erottuu valkoisena vedestä ja tynnyrit ja kulta torilta. Vana ja kimallus rakennetaan ilman
  ääriviivaryhmää.
- Aukot, ikkunarivit ja tornien sisukset ovat sisäviivoja kärkiväreinä. Perspektiivi on mallin juuressa, ja kaikki
  geometria on maan yläpuolella (y ≥ 0).

## 9. Hyväksyminen
- Kuvat kansioon `kuvat/`: `visby-{lepo,tynnyrit,yo}-{ylhaalta,kallistus30,reuna55,kolme}.png` (vähintään 600 px,
  rajattuna, kulma, versio ja kolmiomäärä kuvaan) ja pelikokoarviot `-pelikoko60.png` (180 px), `-pelikoko40.png` (120 px)
  ja `-pelikoko33.png` (100 px).
- Video `visby-video30.mp4`: 14 s, 30°. Lautta liukuu satamaan, ja napautus näyttää tynnyrit 8 s:n kohdalla.
- Lähitaso: `visby-lahitaso-45.png`, `-lahitaso-55.png` ja 2 × 2 -vertailu keski vs lähi (kulma, versio ja kolmiomäärä
  kuvaan).
- Kehyshinta ≤ 0,3 ms mallia kohden, levossa 0 kehystä ja unity-tarkistus 0 virhettä integroinnin yhteydessä. Omistaja
  hyväksyy kuvat ennen seuraavaa erää.

## 10. Tiedostomuoto ja toimitus
- Koodina: `Assets/Matkakirja/Kartta/Erikoismallit/Visby.cs` (partial class Symbolimallit: `VisbyRunko()`, `VisbyLahi()`
  ja liikkuvat osat omina verkkoinaan, etuliite Vb). Rekisteröinti `static readonly bool visby = Rekisteroi("visby", …)`,
  ja liike lisätään ErikoisLiikkeen Luo-kytkimeen (`"visby" => new VisbyLiike(id),`).
- Haara `mallinseppa/<erä>` junan päälle, merge-pyyntö Natiivisepälle ja kuvat kansioon
  proto-3d/lokit/erikoismallit/visby/.

## 11. Toteutus 27.9.2026 (Opus-agentti, harness proto-3d/tyokalut/mallinseppa-esikatselu-n2)
- Runko 1 206 + osat 269 = **LOD0 1 475**, **Lahi 2 823**. Mitat 0,984 × 0,195 × 0,536. Luo: `"visby" => new VisbyLiike(id)`.
  Tila: valmis katselmointiin (malli, lähitaso, liike, testit, kuvat ja video); omistajan katselmointi ja laitekuvat puuttuvat.
- Poikkeamat: talot 14 korttelirivinä (osa päädyt kadulle, Strandgatanilla porraspäädyt lähitasossa) ja 5 erillisenä talona;
  pohjoinen kolmannes puutarhojen vihreää ja ytimen lattia katujen harmaanruskea #c4b593 (speksin vaalea lattia luki tyhjänä
  maana); rauniot 5 (S:t Clemens, Helge And ja S:t Olof pois budjetin takia); laituri ilman ääriviivaa kolmena palana (veden
  opetus: ei tummaa viivaa sataman ympärille); valot yhdeksänä osana, jotta syttyminen ei leijaile; keinunta ±1,2°; meren
  vasen pää kapenee karttaan; video 24 s, jotta käännös ja peruutus näkyvät.
- Liikeydin: lautan runko pysyy vedessä (0 virhettä 24 h:n simulaatiossa), tynnyrit 10,8 % saapumisista, lepokehyksiä 69 %,
  0 allokaatiota kehyksessä, noin 1,3 µs/kehys.
- Kuvat ja toteutusmuistio: harnessin kuvat/ ja visby-toteutus.md.
- **Integrointi 27.9. klo 23.2x (Linssiseppä):** kuvat tarkistettu (kehä, lautta ja peruutus, tynnyrit, yö ja lähitaso) ja
  hyväksytty. Proto `mallinseppa/era5` **d35e9f2c** junan 508761e8 päällä, unity-tarkistus 0 virhettä; käännös ja laitekuvat
  aamulla (yötauko).
