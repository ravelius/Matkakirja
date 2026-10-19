# Pelikoodarin luovutus 19.10.2026 klo 20.50 (Postivahdin KOVA RAJA 36 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-1930.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei omia ajoja, simuja eikä lukituksia (simut sammutettu, SIMU VAPAA annettu JU:lle 20.12).
- JU kääntää L2:lla: ensin 9ed9e57ff (alkoi 20.35, ei keskeytetä), sitten LOPULLINEN 620227d37 → _tyo/julkaisija/juoksupeli-206-app.
  JU ilmoittaa KÄÄNNETTY + SIMU NYT vasta 620227d37:stä.

## ENSIN (YÖJUNA 206, juoksupeli): simu 620227d37:llä → yhteinen kuvapari PT:lle → merge-pyyntö NS:lle
1. JU:n SIMU NYT:sta (tarkista kaannos.txt = 620227d3…): `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-juoksu-206/aja.zsh`
   taustalle, loki `…/simu-juoksu-206/lokit/aja-2.log`; iPhone + iPad peräkkäin ~10 min. Skenaariot sk-juoksu-206-{iphone,ipad}.txt.
2. Tarkista lokit/todistus-juoksu-206-{iphone,ipad}-*/ (PUUTE-rivit, kuva-arkki täysikokoisena):
   - T1/T1b (lähikamera pois) vs T2/T2b (päällä) samalla siemenellä 777 = KÄÄNNÖS ENNEN/JÄLKEEN.
   - U2a/U2/U2b kaarre: Puyi keskikolmanneksella; ENNEN-kuvat = 1. 206-ajo todistus-juoksu-206-iphone-20261019-2004/kuvat/U2.png
     (Puyi reunassa) ja …-ipad-20261019-2008/kuvat/U2.png.
   - R1–R3 pakkotörmäys siemen 1190: lakkarasia (efekti puu-1), bi-kiekko → jadeastia-malli (kivi-jade-1/2), lohikäärmekulho →
     posliinimaljakko-malli (posliini-1…4). Jos Puyi uupuu ennen 3. törmäystä → kirjaa PT:lle (ei uutta ajoa ilman PT:tä).
   - Värit .gamma: seinät vaaleampia kuin 10f80d13-ajossa (ei enää lähes mustia) – mainitse kuvaparissa.
3. SIMU VAPAA JU:lle → PT:lle ≤ 3 riviä + polut, yksityiskohdat tiedostoon
   proto-3d/_tyo/pelikoodari/raportit/juoksupeli-206-simu-20261019.md (lisää osio "2. ajo 620227d37").
4. PT:n ok:lla merge-pyyntö NS:lle (local_fcc10552-5810-49bf-b0cf-188456f1231c): haara pelikoodari/juoksupeli-kerattavat-206 kärki
   620227d37. Yhdistyy puhtaasti Valosepän juoksu-valoon (0654b1763, sama .gamma-rivi) – tarkistettu merge-tree.
5. PT 20.5x: Valosepän (VS) juoksuvalo k3 liitetään 206:n JÄLKEEN (riippuu .gamma-rivistä 9ed9e57ff) – ei osa tätä kuvaparia.
   Seuraava juna: hang_release (Codex puomilta-irti-v1, zip 61033ea2).

## HAARAN 206 SISÄLTÖ (a4e3b86f3 → 620227d37), kaikki PT:n pyytämiä
- 4d237d61d kerättävät aarteet (valkoiset kuutiot) → aarteet-v1-ehjät mallit (simussa OK 10f80d13).
- 61b25723a ovien kamerapalkit Codexin camera-door-blockers.glb:stä: friisi 4,1 m (oli 3,4), tyokalut/ovipalkit_glb.py.
- 8dee8893d äänet v2.2 (puu-1, kivi-jade-1/2, askel-katto-1 silmukka), ääniportin kautta, taso Tehosteet.
- 7e08a96fe kameran keskikolmannes (DroneNosto.KeskikolmasKulma/RajaaKatse; ilman: 36° rampilla s≈111).
- 99d603150 `ui juoksupeli tormaa 1|0` (botti ohjaa väistöesteeseen).
- 9ed9e57ff väistöesineiden arvonta joka juoksulle (ArvoVaistot, ei kahdesti peräkkäin, PT:n ok), posliini → aanet-v2 posliini-1…4,
  glTF baseColorFactor .gamma (Valosepän löydös).
- fa9e12fde + 620227d37 käännöksen lähikamera sisätiloissa (Codex ovikamera-v2: 1,6 m / 1,7 m; ulkona ei – ramppi),
  `ui juoksupeli lahikaannos 0|1`, loki "drone käännöksessä lähellä / (lähikamera pois)".
- Testit: Peli 644/644 (DroneNosto 3/3, JuoksuAanet 3/3, JuoksuArvonta 1/1), tarkista.sh 0 (vahdit ok).

## PÄÄTÖKSET JA VASTAANOTOT TÄLLÄ VUOROLLA
- Juna 205 (juoksupeli v1 ad203186e/0c75cd31) simu OK → PT lukitsi 205 sellaisenaan (b).
- Codex ovikamera-v2 vastaanotettu: yksi kameralogiikka (oma), vertailu raportin lopussa; PT ok. Grafiikan jatkotyöt (hihan sauma,
  kainalot, puomilta irti, PBR) = Codexin.
- Codex puomilta-irti-v1 (hang_release, zip 61033ea2, GLB 846daf12…) → SEURAAVAAN JUNAAN (PT:lle kerrottu 20.4x): vaatii Puyi-perus-GLB:n
  vaihdon ämpärissä, vaiheen mukaisen siirtymän hang_loopista (ei 1,6 s odotusta) ja lentoradan altaan yli; kuvapari ennen/jälkeen.

## MUUT AVOIMET (ennallaan 19.30-luovutuksesta)
- Rakettivideo laukaisupätkä Mac-tallenteena yöllä (_tyo/pelikoodari/mac-rakettivideo/aja.zsh, vain kun omistaja poissa ≥ 5 min).
- Raketin autokäynnistys 30495a9a6 + Pulun välkkymiskorjaus 8eb6e1945: raketti-iOS jonon hännillä.
- Lähteet-nimet pelikoodari/lahteet-nimet-205 2c9c676a2: merge-pyyntö puuttuu (seuraava juna).
- Mac WASD 4814ab2d1 omistajan paluuseen; PR ravelius/Matkakirja#4945 pidossa.
