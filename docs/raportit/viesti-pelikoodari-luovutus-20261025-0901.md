# Pelikoodarin luovutus 25.10.2026 klo 09.01 (Postivahdin kova raja 45 %)

## Jono (PT 08.4x, kevennetty 08.5x)

PT siirsi kohdat 3 (sali 04:n sisältö) ja 4 (kaukopuut) LR:lle. PK kertoi PT:lle, että molemmat oli jo hoidettu (alla), ja pyysi
perumaan kohdan 4 siirron. Kamerahyppy poistui PT:n jonosta (LT: testiartefakti), mutta hyppysuojan korjaus on tehty (alla).
Jäljellä minulle: **salikamera (kesken), tausta-v48 (paketti valmis, PT:n diagnoosi tarkistettava) ja GC (editoriajo tehty, PT-rivi lähettämättä).**

## Haarat (proto, /Users/Shared/Claude/wt/)

| Erä | Haara (worktree) | Kärki | Tila |
|---|---|---|---|
| Kaukopuut kristalleista puiksi | pelikoodari/kaukopuut-kortit (proto-pelikoodari-kaukopuut-kortit) | b96bb39c9 | VALMIS, PT:lle ilmoitettu 08.5x |
| Tausta-v48 osoitin | pelikoodari/tausta-v48 (proto-pelikoodari-tausta-v48) | 3d4785f26 | ÄMPÄRISSÄ 25.10. 09.05 (JU, PT:n kuittaus; NS:lle kerrottu); diagnoosi ja varjokoe yhä auki |
| Salikamera + hyppysuoja | pelikoodari/sali-kamera (proto-pelikoodari-sali-kamera) | 3df605934 | hyppysuoja valmis, salikamera KESKEN |
| GC-varaukset | pelikoodari/gc-juoksu (proto-pelikoodari-gc-juoksu) | e9b3a9875 | editoriajo puhdas, PT-rivi lähettämättä |

Kaikki pohjautuvat natiiviseppa/juna-210:een (kaukopuut d2f94a515, muut 9d548981d).

### 1. Kaukopuut (b96bb39c9), VALMIS

- Kristallit olivat kolmea lajia: koodin kauko- ja keskipuiden kaksoiskartiot, Lavastajan u-jingshanin V4_puu-oktaedrit (1 003 kpl)
  ja ulkorengas-v5:n V4_lehvasto-silppu. Nyt kaikki ovat ristikorttipuita taustan atlaksella puut-933b (JuoksuKaukopuut.Kortti,
  Kappaleet, RengasPuut). Atlas otetaan taustan palasta: isoin (LOD0) kaukopuille ja Jingshanille, pienin (LOD2) ulkorenkaalle.
- QA: `ui juoksupeli palatsi korttipuut 0|1`. Peli-testit KaukopuuKorttina, JingshaninOktaedritPuiksi ja UlkorenkaanLehvastoPuiksi.
- Kuvaparit: `proto-3d/_tyo/pelikoodari/korttipuut/kuvat/korttipuut-{c,d}-ennen-jalkeen.png` (−220, 545; c = matala, d = 120 m).
- Huom (editori): juoksun ensimmäinen lataus "oletus"-mallijuuresta piirtää koko maailman punaisena (myös GC- ja juna-haaroilla),
  joten skenaarioissa on lämmitysjuoksu ensin. Ilmiö on vain editorissa, ei korttipuista.

### 2. Tausta-v48 (8d5d3bf8e1a1, `_valmiit/juoksupeli-kk-tausta-peking-v48-vienti-20261025`)

- Palat kk-tausta-1-1 ja 2-1 (LOD0) on leivottu uudelleen v46:n asetuksin, mutta f-taihemen ei heitä varjoa (EI_VARJOA).
  Työkalut: `proto-3d/_tyo/pelikoodari/tausta-v48/tyokalut/` (leivo_v48.zsh, leivo_valo.py, paketti.py).
- Sen jälkeen v47:n nurmikorjaus. Rakenne on identtinen v47:n kanssa. LOD1/2 tulevat v47:stä, ja v47:ssä nurmi on korjattu kaikissa
  LODeissa (12/20 palaa kussakin LODissa, PT:n tarkistus).
- **DIAGNOOSI, kerrottava PT:lle ja VS:lle:** leivotussa atlaksessa aukion etuala on auringossa jo v47:ssä (valo ~1,1). Taihemenin
  varjo on vain kapea kaista portin pohjoisreunalla, z −186…−200, ja v48 vaalentaa sen. Kuva:
  `proto-3d/_tyo/pelikoodari/tausta-v48/kuvat/leivottu-valo-v47-v48-ylhaalta.png` (työkalu valo_kartta.py).
  Pelikuvan iso Taihemenin muotoinen etualan varjo ei siis ole atlaksessa. Se on luultavasti ELÄVÄ varjokartta: aurinko 170°/45°,
  heittäjinä rakennusten leivottomat LOD1/2, sillä vain JUOKSU_LEIVOTTU-materiaalit jätetään pois varjokartasta (JuoksuV4Maailma.Valo.cs:86).
- QA `valo aurinko` kesken juoksun ei käännä jo luotua aurinkoa (Valopohja.PeliValo kutsuu Suuntaa vain luodessa). Siksi VS:n koe
  "varjo sama kaikilla aurinkosuunnilla" ei todista leivottua varjoa.
- Varmistava koe ajossa: `proto-3d/_tyo/pelikoodari/tausta-v48/skenaariot/sk-aukio03-varjo.txt` (A varjot 1, B varjot 0, C lodkerroin 6),
  tulos `proto-3d/lokit/esikatselu-20261025-09xx/aukio03-{A-varjot1,B-varjot0,C-lod6}{,-yla}.png`.
  - Jos B:ssä varjo katoaa ja C:ssä myös, korjaus on koodissa: rakennuksen leivottomat LODit pois varjokartasta, jos LOD0 on leivottu,
    tai koko rakennus samaan sääntöön. Tausta-v48:aa ei silloin tarvita, paitsi kapean kaistan vuoksi.
- Mallijuuret esikatseluun: `proto-3d/_tyo/pelikoodari/tausta-v48/juuri-v47|v48/` (`ui juoksupeli palatsi mallit file:///…/`).

### 3. Salikamera (pelikoodari/sali-kamera)

- 66b270ad8 **hyppysuoja**: hypyn jälkeen jatkuva yli 0,6 m/ruutu liike tulkittiin joka ruudussa hypyksi (LT:n 108 riviä).
  Nyt hyppyruudun siirtymä on ehdokasnopeus. Peli-testi HyppysuojaLiikePysahdyksenJalkeen (vanha koodi kaatuu), 735/735. VALMIS.
- a16738a68 + 229473c45 + 3df605934 **salikamera**: keisari salissa → kamera 3,5 m taakse ja räystään alle (DroneNosto.Salissa,
  SaliKorkeus, SaliEtaisyys, SaliHaku 6 m). SaliRaystas on matalin räystäs 6 m:n sisällä, kun keisari on huoneessa (reitti "room",
  avoimen huoneen rajat) tai katon alla.
  - Ajo 0849: salikamera alkoi juoksun alussa ja päättyi 0,33 s:ssa. Juhlasalin keskiosa on katoton (pylväskäytävät katettuina) ja
    reitin osa ei ole "room", joten 3df605934 lisää ehdoksi avoimen huoneen rajat.
  - Uusi ajo jonossa: `proto-3d/_tyo/pelikoodari/sali-kamera/skenaariot/sk-sali04c.txt` (juoksu salista, kuvat 1 s, 2 s, 2 s
    testikameralla ja 4 s). Tarkista, että lokissa on "salikamera alkaa … huoneessa x/True" ja kuvissa kamera on salin sisällä
    katon alla kuten testikamerassa.
  - `valo sijoita` -siirron jälkeiset pelikamerakuvat vaihtelevat ajoituksen mukaan. Älä käytä niitä vertailuun.
  - Riski: sama sääntö kaikkiin avoimiin huoneisiin, joissa on räystäs 6 m:n sisällä (aiemmin kamera ylhäällä). Mainitse PT:lle.
- Sali 04:n sisältö on junassa jo avoimet-v43:na: penkit, kaapit ja pylväsrivit, ei mattoja eikä sermejä. VS:n B12 ajettiin
  avoimet-v34:llä. Kuva: `proto-3d/lokit/esikatselu-20261025-0834/sali04-testikamera.png`.

### 4. GC (e9b3a9875)

- Editoriajo `proto-3d/lokit/esikatselu-20261025-0805`: ei omia poikkeuksia (vain editorin haku- ja Cesium-poikkeukset),
  kamera normaali 3,5 m. 60 s:n kuva normaali, 30 s:n kuvassa editorin punainen ensilataus. PT:lle 1 rivi: "GC e9b3a9875
  editoriajo puhdas".

## Avoimet

- Kuvaparit PT:lle ennen junaa: tausta-v48 (+ varjokokeen tulos) ja salikamera (kun ajo on vihreä).
- Worktreet: edellisten lisäksi proto-pelikoodari-{kaukopuut-kortit, tausta-v48, sali-kamera}.

## Lisäys 25.10. 09.45 (nollauksen jälkeen)

- Varjokoe peruttu (PT 09.2x: 03A:n elävä varjo Valosepälle). Tausta-v48, hyppysuoja ja GC kuitattu junaan 210; v48 ämpärissä 09.05.
- Salikamera: syy = salin häivytetty katto on peittokartassa massaa (ala −0,1) → porttitunneli esti salikameran. Korjaukset
  pelikoodari/sali-kamera 05ae0f8c6 (salikamera ennen porttitunnelia avoimessa huoneessa, kulma räystäästä, katse ≥ 22° alas;
  QA `valo katot` raportoi salin tilan). PT 09.5x: 093208 ei kelpaa (keisari liian iso) → EI junaan.
- Ehdotus omistajalle: pelikoodari/sali-sisakatto-ehdotus 95f3ac452 (salin katto jää sisäkatoksi salikameran ajan = poikkeus
  omistajan kattosääntöön 21.10. 10.43; kamera 3 m, niin kauas kuin sali sallii, seinävara 3 m). Pari PT:lle 09.44:
  havainne-editori-20261025-061905/04 → -094217/04. Odottaa PT:n KK-kysymystä omistajalle; junaan ei mitään ennen päätöstä.
- PT 10.2x: sisäkattoehdotus 094217 HYLÄTTY (ei omistajan kysymystä); 05ae0f8c6 ei junaan. Haarat sali-kamera ja
  sali-sisakatto-ehdotus talteen. Jono tyhjä.
