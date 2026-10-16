# Linssisepän luovutus 16.10.2026 klo 19.46 (KOVA RAJA 35 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Testit `sh Linssit-testit/kaanna.sh [nimi] </dev/null` worktreessa, tarkistus `zsh tyokalut/tarkista.sh`.
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 (SIMU NYT -liput), Karttaseppä local_eec7f158-d9f3-4b93-9368-c50935bd19ab,
NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832. Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla; ajon jälkeen SIMU VAPAA Julkaisijalle.
Kaikki ajoskriptit ovat irrotettuja (nohup) ja odottavat lippuaan, joten nollaus ei katkaise niitä.

## 1. ENSIMMÄISEKSI: KIINAN DYNASTIAT -PALLOKUVA PELISTÄ (omistaja 19.19 PT:n kautta; PT: luovutuksessa ensimmäisenä)
- Haara linssiseppa/kiinan-dynastiat e159fb979, worktree /Users/Shared/Claude/wt/proto-linssiseppa-kiina (pohja natiiviseppa/juna-197).
  - Ydin/Kiina/KiinanDynastiat.cs, Unity/KiinaKerros.cs, Resources/Varjostimet/KiinaAlue.shader, LinssiOhjain (LataaKiina, KiinaSovitin,
    komennot `linssi kiinan-dynastiat`, `kiina vuosi <v>`, `kiina vari qing #41709c|pois`, `kiina tila`).
  - Isoisän pohjalla: rajaton pohjasarja (Isoisa1873Linssi.RajatonPohja) sekä rajat ja nimiöt IsoisaKerroksella. Täytöt 0,62.
    Kotiseutu vinoviivoin, protektoraatti emovärin vaaleana ilman pisteitä. Pieni nimi näytetään keskikokoisena.
    Pääkaupunki on punainen neliö. Linssi on Kesken = vain kehittäjälle.
  - Testit: KiinaTestit 5/5, Linssit 1933/1933 (ennen 19 vuoden dataa), unity-tarkistus 0.
- DATA: Karttasepän json sellaisenaan (LOPULLINEN MUOTO, sovittu, ei enää vaihtoja): haara karttaseppa-kiinan-rajat,
  data/linssit/kiinan-dynastiat/kiinan-dynastiat.json ($skeema matkakirja-linssi/kiinan-dynastiat/1, MUOTO.md). Nyt 08753a3ec, 19 vuotta (PR #4720).
  Uusi versio: `git show <sha>:data/linssit/kiinan-dynastiat/kiinan-dynastiat.json > Assets/Matkakirja/Linssit/Resources/Kiina/kiinan-dynastiat.json`
  → testit (KiinaTestit tarkistaa vuosilistan) → commit → käännös.
- KÄÄNNÖS KÄYNNISSÄ 19.45 L2:lla: kaanna-kiina.out → _tyo/linssiseppa/kiina-app. Jos kuoli, aja uudelleen:
  `PROTO_LINJA=2 PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa/kiina-app zsh /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh linssiseppa/kiinan-dynastiat`
- AJO ODOTTAA: ajo-kiina4v.zsh (pgrep ajo-kiina4v; jos ei käynnissä, `nohup zsh ajo-kiina4v.zsh > ajo-kiina4v.log 2>&1 &`).
  - Ajo odottaa lippua simu-kiina4v.nyt, kiina-appin käännöstä ja kuormaa alle 20.
  - Skenaario sk-kiina-4v.txt: iPad vaaka, kamera 34/102/7000 km, vuodet -221, -100, 1142 ja 1760. Lisäksi 1760 Qing viileällä
    #41709c (K4b) ja lähikuva keltainen/viileä (K5, K5b).
  - KUN KÄÄNNÖS VALMIS: lähetä Julkaisijalle "KIINA VALMIS" ja pyydä touch simu-kiina4v.nyt. Julkaisijan jono: NUI museo (jos pyytää) → Kiina → Köö/Ams.
- TULOS: lokit/todistus-kiina4v-ipad-*/kuvat/.
  - Tarkista ensin, että alueet, vinoviivat, rajat ja nimet näkyvät ja kamera rajaa Itä-Aasian. Säädä tarvittaessa kamera
    tai skenaario ja aja uudelleen.
  - Kokoa kuvat kansioon _valmiit/kiinan-dynastiat-pallo-20261016/ ja kirjoita LUE.md. Siinä Qing keltainen vs #41709c
    rinnakkain omistajalle (Karttaseppä: väri on avoin).
  - Lähetä PT:lle 3 riviä. Ei junaan ennen omistajan kuvahyväksyntää.

## 2. PEKING #361 V7 (Codex be272cf07 19.42): PELITESTI KÄYNNISSÄ 19.46 (Julkaisijan SIMU NYT)
- Paketti _tyo/linssiseppa/peking360/v7/ktx: V6 + kolme Codexin GLB:tä, hashit ok, portti 0, ruutu 2_3 17 → 21 Mt.
  rakenna-peking361.zsh: p344v4/ktx/ion-naytteet.json on poistunut, joten kopio otetaan v6/ktx:stä (tehty käsin).
- Ajo ajo-peking361.zsh → peking361-vertailu.zsh (V6 vs V7, klo 13 ja 18, k1–k5 + liuku).
  - Lisäksi NÄKYVYYSKOE, jota Codex pyysi: k1 ja k3 klo 13 ensin `linssi kerros peking_2_3 0` (piilo23-*), sitten `linssi kerros Omat 0` (piilokaikki-*).
  - Tulos: lokit/linssiseppa-peking361-20261016/ (pari-*.jpg, erot.tsv, tapahtumat-*.txt; "kerros"-rivit kertovat piilotettujen renderöijien määrän).
- EPÄILY V6:sta (siksi koe): V6:n maa-alueen kirkkausero oli täsmälleen 0 ja näkyvä maa näytti sumealta ilmakuvalta. Voi olla,
  että näkyvää kiveystä ei piirrä oma malli vaan Ion- tai pohjakuva tai matala LOD. Jos piilo23-kuva on sama kuin normaali kuva,
  oma paving ei näy, ja se on ensisijainen löydös Codexille.
- Ajon jälkeen SIMU VAPAA Julkaisijalle. Tee arvio Codexille postiin (worktree /Users/Shared/Claude/wt/linssiseppa-posti, detached
  → `git push origin HEAD:claude/postilaatikko`; mallina 399c814e5). Arvioi kivien luettavuus, 4,8 m:n toisto ja moiré, sävymosaiikki,
  vanha/uusi-raja (8 m:n pilottireuna), läiskät ja halot, LOD ja ruutuaika sekä KTX2-koko (+3 Mt).
  Jos V7 hyväksytään: Julkaisija vie V7:n omistajan piilotettuun kippiin ilman junaa, ja PT:lle lähtee rivi.
- #362 (katto303-variantit, punaiset seinät) on Codexilla. 303-variantit sallittiin 2_3:een, kunhan pinta-alapainotettu keskiarvo
  on 303 ja sävykulma ei muutu. Seuraava toimitus arvioidaan alle 30 minuutissa samalla putkella.

## 3. KÖÖPENHAMINA JA AMSTERDAM (opaskierrosten hionta, junaan 197)
- Ajo ajo-kooamsvakio197.zsh odottaa (lippu simu-kooamsvakio197.nyt ja kuorma < 20). App on belvedere198-app.
  Skenaariot sk-koopenhamina-vakio-197.txt ja sk-amsterdam-vakio-197.txt.
- Tuloksesta valitaan kummankin kaupungin heikoin pysähdys, ja se korjataan OpasKatseOletukset.cs:ään uudessa haarassa
  linssiseppa/wien-rooma-197:n päällä. Kuvat _valmiit/:iin, haara NS:lle ja yksi rivi PT:lle.

## 4. VALMIIT TÄSSÄ VUOROSSA
- Peking #360 V6 arvioitu (posti 399c814e5). Rakenne on ok, mutta AO ei näy pelikorkeudelta. V6 jää pohjaksi eikä mene kippiin.
  Codexille vastattiin myös 303-varianteista (sallittu) ja lähdeportista (meidän esikäsittely ratkaisee sen).
- Museon nimi seinälle: NUI:n 6d2043e0c + 902e2266b jää, minun 90b7a67b3 hylätty (PT:n sovittelu). Haara linssiseppa/museo-nimi-197 jää talteen.

## 5. AVOIMET
- Worktreet: kiina (työn alla), linssiseppa-posti, wienrooma (belvedere-piste-198, NS) sekä edellisen luovutuksen lista
  (ateenahionta, prahav7, telakointi, telakointik5, aariviiva, peking197, porttitasanne, reittiedella, korostusmaa, kehysvari,
  kierrokset195 = todistusajo.sh – älä poista, puutomat191). Museonimi ja museovert on poistettu.
- _tyo/linssiseppa: belvedere198-app (Köö/Ams käyttää), kiina-app (tulossa), peking360/ (v5, v6, v7; v5 pois, kun V7 on arvioitu).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-1946.md).
Ensin: `pgrep -fl "peking361|ajo-kiina4v|proto-kaanna.sh linssiseppa"` ja `tail ajo-peking361.log kaanna-kiina.out`.
- Jos V7-ajo on valmis: SIMU VAPAA → arvio Codexille ja PT:lle (kohta 2).
- Kiina-pallokuva (kohta 1) on PT:n ensisijainen.
- Sen jälkeen Köö/Ams (kohta 3).
