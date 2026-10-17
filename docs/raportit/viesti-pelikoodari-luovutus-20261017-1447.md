# Pelikoodarin luovutus 17.10.2026 klo 14.47 (KOVA RAJA 39 %, Postivahti + PT)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-iltapaiva (23f81496f).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU local_5cb16c00-…, KS local_eec7f158-…, LR local_996d60ab-…, NS local_674b9ec4-…, Postivahti local_a24c43c0-….
- Simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19 (T7-sarja: skripteissä `source /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh`)
  vain JU:n "SIMU NYT" -luvalla, "SIMU VAPAA" heti. Käännökset JU:n kautta. Ennen käännöspyyntöä `zsh tyokalut/tarkista.sh` (0).
- Mittausajon aikana EI omia käännöksiä/testejä (14.31: kuorma 33 pilasi FFT-parin ms:t).

## 1. ETUSIJA (PT 14.4x): OMISTAJAN PÄÄTÖS 14.46 – Kiinan väestöpinta "Matalampi ja pehmeämpi"
Pehmeät kummut, vain suurimmat keskukset ja armeijat nousevat; kartta, rajat ja valopisteet näkyvät aina. KS madaltaa pinnan; PK sovittaa
kertovan kameran etäisyyden ja katsekulman uuteen pintaan KS:n kanssa (ei liian lähelle, ei liian kauas). Järjestys PT:n mukaan: meren
iPhone-mittauksen (JU) jälkeen.
- Kysytty KS:ltä 14.47: uusi KorkeinM-arvio ja SHA. Odota vastaus.
- Kamera nyt (pelikoodari/kiina-kamera-korkeus **ecfbb9663** = KS 324ebca0a + 87b23756b, KS yhdistää): KiinaKertovaKamera.Lahi = lähikuva
  ≥ max(LahiMinM 1200 km, 2,5 × KorkeinM, 2,5 × kohteen korkeus); laaja/vetäytyminen Pinnalle = ≥ 2,5 × KorkeinM; kallistus 45°
  (Taistelu/PaakaupunkiKallistus) + Nakyva (alkusuunta, josta 150°:n kierron kaari näkee kohteen, muuten loivempi); katse = oton kohteen
  pinta jousella, ≥ 0; LyontiS → laaja lyhenee, kamera taistelussa 0,5 s ennen lyöntiä.
- SUUNNITELMA matalalle pinnalle: LahiMinM 1200 km (v4-regression lattia, kun huiput olivat 480–999 km) → pois tai suhteelliseksi
  (perus TaisteluM 380 / PaakaupunkiM 900 km tai 2,5 × KorkeinM), lähikuvien kallistus takaisin 50–55°, jos huiput < ~150 km. Testit
  KiinaKertovaKameraTestit (12) + OikeatPinnatEivatPeitaPaakaupunkia (lukee Resources/Kiina/Vaestopinta; päivittyy KS:n datalla).
- HUOM: säteen laskentamalli (Nakyva) ei vastannut piirrettyä pintaa v4:ssä (90add615e, kamera pinnan sisällä vaikka säde "vapaa") →
  varmista aina simulla (sk-kiina-kamera-200.txt, ajo-kiina-kamera-200.zsh; HAARA = commit, joka on käännöksessä, esim. `HAARA=ecfbb9663`).
- Kuvat: lokit/todistus-kiina-kamera-200-20261017-1338 (03d0bb1a4), KS:n v3/v4: lokit/todistus-kiina-koko-linssi-20261017-{1347,1417}.

## 2. FFT-MERI SÄVY 2: iPhone-mittaus JU:n kanssa
Pari 14.28 (36723c5f8 = BUILD 199 + 741eb6e1a): avausmeri FFT 27/58/65 vs laatta 20/50/56 (ennen 6/24/35) → sinivihreä OK, PT:lle
ilmoitettu. ms EI kelpaa (MERI=1-ajon kuorma 33). Video _tyo/pelikoodari/raketti-meri-200/raketti-meri-rinnakkain.mp4, arkit
lokit/todistus-raketti-meri-{0-20261017-1427,1-20261017-1431}. Seuraava: laitekäännös/iPhone-mittaus JU:lla (PT:n hyväksyntä).

## 3. TIVOLIN KUVAKORTTI: pyyhkäisyajo v12:lla (LR), JU:n jonossa ~15.15 (NUI ja KS:n iPad-video ensin)
- Ei käännöstä: `APP=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-meri-200-app/Matkakirja3D.app SHA=36723c5f8 HAARA=master UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-tivoli-kuvat-200.zsh`
  (taustalle) → SIMU VAPAA JU:lle → arkki LR:lle (kaikki 5 kuvaa 1/5…5/5).
- Mekanismi: tivoli-kuvat-valmistelu.zsh odottaa uuden asennuksen datakansion ja kopioi _tyo/pelikoodari/tivoli-kuvat-200/Documents
  (pallokierros-koopenhamina-korjaus.json = Q110289.kuvat v12-paketista 20261017g + kuvat suoraan kuvavälimuistiin
  kuvat/esittely_koopenhamina-v10_kuvat_*.jpg). Vaatii `linssi kehittaja 1` (skenaariossa). Toimi 14.12 ja 14.34.
- 14.34-ajossa kortti + "5" + kokoruutu 1/5 OK, mutta veto-rivi oli väärää muotoa → korjattu `veto 340 430 60 430 0.3` (kokoruudussa
  ei ‹ ›-nappeja, vain pyyhkäisy). Jos ei vieläkään selaa: kokeile hitaampaa (`veto 340 430 60 430 0.6`).
- Kuvanosto (yksityiskohtakuvat) EI ohjattavissa korjaustiedostolla (polku vain workerin /opas/aineistot). LR: ei #4808:aa eikä
  ohitusta → kertatesti tehty: v10-luettelo → järvi 0,00 / Carstensen 12,40 / Pierrot 31,04 s, litografia ei ehdokkaana (Pierrot'n url
  yhä esittely/koopenhamina-v1/). Kertatestin lähde: scratchpad (ei repossa).
- Versiohaarat (EI junaan ennen omistajan hyväksyntää; PT kuittaa): **pelikoodari/koopenhamina-v12 a59b0f916** (voimassa: v7 → v12 +
  pysyvä testi TivolinLauseessa2EiLitografiaa, Pallokierros 14/14). Vanhat v8 ed50dceeb (peruttu NS:lle), v9 b65bc8532, v10 572a8472d,
  v11 2c7e6f95d → ei käytössä. Worktree /Users/Shared/Claude/wt/proto-pelikoodari-koopenhamina-v8-200 (haara nyt koopenhamina-v12).

## 4. Muut valmiit tänään
- Cupola OhitaEsittely junan 200 ÄÄNI-pohjaan: pelikoodari/kupoli-ohita-200 **64b347452** (juna-200 b7a916224 + 041942137 + PohjaLahde.Pysayta
  kuten NUI 3d0280f0a), tarkista.sh 0, PT:lle ja NUI:lle ilmoitettu; PT/NS ottaa junaan.
- Kiinan kamera: d1fcec756 (pinnan yllä), 532d8f2ab (Williamin tahti, KiinaKerros.LyontiS), c487cdb37 (Nakyva), 17297a308, 87b23756b – kaikki
  KS:n paketissa.

## Worktreet ja _tyo
- wt/proto-pelikoodari-kiina-kertova-kamera (haara pelikoodari/kiina-kamera-korkeus), wt/proto-pelikoodari-kupoli-ohita-200,
  wt/proto-pelikoodari-koopenhamina-v8-200 (koopenhamina-v12). Vanhat: fft-meri (741eb6e1a, laitekäännökseen), tivoli-vapaa-lento-200
  (PYSÄYTETTY).
- _tyo/pelikoodari: raketti-meri-200-app (36723c5f8, tarvitaan Tivoli-ajoon ja vertailuun), tivoli-kuvat-200 (valmistelu).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-1447.md (haara
pelikoodari-luovutus-20261014-paiva). Etusija: omistajan 14.46-päätös (Kiinan matala pinta) → kameran sovitus KS:n uuteen pintaan
(odota KS:n SHA). Tivolin pyyhkäisyajo v12:lla JU:n SIMU NYT -luvalla (~15.15) → arkki LR:lle. Meren iPhone-mittaus JU:n kanssa."
