# Julkaisija: luovutus 8.11.2026 klo 02.00 (korvaa -0028:n; -0003:n ALOITA, OPIT ja ODOTTAA SANAA voimassa: git show 75df8de5b:docs/raportit/viesti-julkaisija-luovutus-20261108-0003.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: kuten -0003 (Monitor jonolokiin, grep lisäksi 'amparivienti valmis|laitekaannos VALMIS'; ps alla olevista pid:eistä; tail jonolokista).

## 1. Juna 221 (TF VAIN OMISTAJAN SANALLA)
juna 221 = 330a43515 (natiivi-backup julkaisija/juna-221; worktree /Users/Shared/Claude/wt/julkaisija-juna-221), unity-tarkistus sh 0 virhettä, taululla:
- 0ac8cd436: NUI kohta 8 = ffec8fdc4 + 2c12b920a (PT 00.4x; PT nimesi vain 2c12b920a, ajettu tila sisälsi molemmat).
- 330a43515: NS pallon välimuisti 256 Mt + muistijarru V raja (PT 01.2x), fast-forward.
PT 02.05 (OMISTAJAN PÄÄTÖS 02.0x, KK): PK 22dc4c06b junaan 221, KUN PK on varmistanut kääntymisohjeen ehdon ja antaa sha:n (voi olla eri kuin 22dc4c06b) → liitä se sha (cherry-pick -x worktreessa, unity-tarkistus sh, push, juna.py lisaa, rivi PT:lle). Ei TF:ää ilman omistajan pyyntöä.
ODOTTAA PT:N SANAA edelleen: PK 61f63adb9 (ks. -0003).

## 2. KÄYNNISSÄ
- KS kohokartta v5 ÄMPÄRIVIENTI (PT 00.5x) pid 21125 (T/ks-kohokartta-v5-vienti.zsh): paketti P/_valmiit/kohokartta-v5-vienti-20261108, 87381 jpg → linssit/topografia/kohokartta/v5-20261108/{z}/{x}/{y}.jpg, 8 osaa rinnakkain (T/ks-kohokartta-v5-osa0..7.log; 02.00: 50968/87381). LAHTEET.md korjattu KS:n sanalla (GLO-90 maininta + ETOPO1, PD).
  Kun jonolokiin "kohokartta v5 amparivienti valmis": tarkista osien lokit (VIKA/virhe), aws s3 ls muutamasta polusta ja julkinen URL ?t=-parametrilla (muisti ampari-cdn-404) esim. 0/0/0.jpg ja 8/x/y.jpg → sitten `: > T/ks-v5-cdn-ok` (vapauttaa kohokartta-5:n) → osoite https://media.matkakirja.app/linssit/topografia/kohokartta/v5-20261108/{z}/{x}/{y}.jpg NUI:lle (local_43962c89-fc14-4098-9dd7-6153133ffcea) ja KS:lle (local_740947d7-aa79-4b1e-948e-1b7dfc734364), rivi PT:lle.
- KS kohokartta-5 decf8bef4 pid 75992 (T/ks-kohokartta5.zsh) odottaa lippua T/ks-v5-cdn-ok, sitten Mac vapaa linja, 8 kuvaa, lokit/karttaseppa-kohokartta-5-b8-decf8bef4 → kuittaus KS:lle (md5, Shader-error, PUUTE). Koe, ei junaan. (kohokartta-4 pid 76973 PYSÄYTETTY ennen alkua, PT halusi ämpäriosoitteen.)
- PK iPad-sarja pid 15261 (T/pk-lataus-pari2.zsh): ennen-2 VALMIS 01.51 (huippu 4679 Mt, ELOSSA), jalkeen-2 61f63adb9 ALKOI 01.52, sitten tahti4-1 61f63adb9 (sk-ipad-tahti4). → kuittaus PK:lle (local_91a1bc27-6870-46aa-9886-66fd33b68880): kansiot lokit/pelikoodari-lataus-{ennen-2,jalkeen-2,tahti4-1}, huiput, ELOSSA. Huom pari 1:ssä "avataan 0 latauskuva-pois 0" ja kehysajat vanha (kerrottu PK:lle).

## 3. Kuitattu tällä vuorolla
KS lähialue-1; VS vesikerros Mac + iPad (GPU p50 15.05 → 8.33 ms), ilmaperspektiivi de7e323a6 (a, b) ja 98ee4c01e (5 skenaariota); NUI nimet-reuna, kohokartta-kytkin-1, kartan-puut-1 (p1-pois = p2-pois, NUI: skenaariovirhe), -2, puut3 iPad (pois 4039 Mt OK; päällä SEIS vahti 4080 Mt, 6/11; raportti P/lokit/nui-kartan-puut-3-ipad-RAPORTTI-2f9479036.txt PT:llä ja NUI:lla); NS vaihe12-uusinta (v2 vahti 4090, b2 OK), ASTC2 821e5ba74 (a2+ka2 6/6, mallit teksturoituja), nui-ajo 10604363c (n1 3 kuvaa, n2 1); PK latauspari 1, esikatselu aja-kuvat.sh 4/4.

## OPIT
- Uudet yleisskriptit: T/mac-yksi.zsh <rooli> <tunnus> <sha> <skenaario> <kansio> (vapaa linja + rivit); T/pk-lataus-ipad.zsh ottaa nyt 4. argumenttina skenaarion.
- ns-yksi-ajo.zsh: älä anna nimeksi "ASTC" tai "vaihe12" (koukut ajavat Vrajan/latausraja2:n) → käytin ASTC2.
- Monitorin grep on kirjainkoon mukainen: "laitekaannos VALMIS" isolla.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille.
