# Julkaisija: luovutus 7.11.2026 klo 11.36

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa -1105, mutta sen OPIT sekä -1000:n, -0450:n ja -0750:n OPIT, MALLIT ja YÖN SÄÄNNÖT ovat voimassa. Id:t: osoitekirja.

## ALOITA: jonolokin häntä, ps ja Monitor (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU', 30 min)
Kaikki on irrotettu nohupilla. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa.

## JONO (kuittaus tilaajalle jokaisesta; tarkista kuvat ja md5, älä arvioi)
iPad järjestyksessä:
1. NS kertoja dd3a2e10f käynnissä 11.34: T/ns-kertoja-ipad.zsh pid 68916, 9 kuvaa, kansio lokit/natiiviseppa-lontoo-kertoja-ipad, seis VIKA muisti ja App terminated. Kuittaus NS:lle.
2. VS kivisivu14 dc4b1c69c: T/vs-kivisivu14-ipad.zsh pid 68958. Kuittaus VS:lle: huippu muisti-tarkka.logista, kaatuminen, kuvat. SEN JÄLKEEN julkaisija-kivet-juuri T7:lle (T/siirto-kivet-juuri.py, PT:n sana), vapaa määrä PT:lle.
3. KS talot-muisti2 5488bdd8b: T/ks-muisti2-ipad.zsh pid 68981. Jos vahti pysäyttää, kerro KS:lle viimeinen ehtinyt komento merkit.txt:stä; ei uusintaa.
4. NUI 5-raketti cbae3153f: T/nui-ipad5.zsh pid 75290. Ketju 84586 pysähtyi 4-maksun SEISiin, joten 5 ajetaan erikseen; NUI voi perua.
L2: NUI ajaa itse "ESIKATSELU NYT" -vuorolla 2 Mac-ajoa (ennen, sitten 909eaac25, noin 12 min), lukko näkyy /tmp/matkakirja-kaannospalvelu-2.lukko. NUI kertoo valmiin. L1 vapaa.
KS jousi 050cd75ed: ajettu, vaistokoe-rivejä 0, kerrottu KS:lle. Uusinta vain KS:n sanalla ja muutetulla skenaariolla.

## JUNA 220
OMISTAJA PYYSI JULKAISUA 11.21 ("jatka kaikkia töitä ja julkaise juna kun kaikki korjaukset valmiit"). PT: sisäinen koeversio kuten TF 219, EI lukitusta, ei ulkoisille, ei mainiin, ei korvaa korttia "Pariisi valmis". LÄHTÖSANA on PT:n rivi "VIE 220 KOEVERSIONA" (korvaa aiemman "LUKITSE 220"). Ennen sitä ei TF:ää.
Haara proton repossa: julkaisija/juna-220 = 5fd6bbaba (a8b873e5d + f86344e8f Taso läpi keskelle + a89993465 varatalot). Lisää PT:n junavuorot: git merge-tree --write-tree + commit-tree + update-ref, ei checkoutia; push natiivi-backup; python3 -I tools/asemataulu/juna.py lisaa --juna 220 "teksti". Yhdistelmää EI ole käännetty.
TF-vienti proto3d-testflight.yml ei aja tarkista.sh:ta; simukäännös (proto-kaanna.sh:120) ajaa. Vahdit kaatuvat rungolla (valovahti; KS korjaa), PT: eivät pidätä 220:tä, sormitodistus vaatii KS:n korjauksen tai jää omistajan koeversioon. KS:n mittaushaara ei mene junaan.

## YÖPORTTI (valmis)
Punainen ainakin 19.10. alkaen: git archive -kopiossa ei gitiä, ja grep | head kaatoi virherivin. Master on TF 209/b5. PR 6453 mergetty cefe0bedc: git init, uusin julkaisija/juna-*, virherivi näkyviin. Käsiajo 42360291336 rungolla 5fd6bbaba: kaanna 868/868, tarkista punainen valovahdista, kultaiset ajamatta. Paikallisesti d092f48cc: kopioista tee-lukijaaanijalki.mjs eroaa, tee-valmisluennat-kultainen.mjs puuttuu vartijasta. PT: vartijakopiot Pelikoodarille PT:n sanalla. Ei JU:n työ. Kerrottu PT:lle.

## LEVY
26 Gi 11.35. Yli 12 h siirto tehty 11.22 (3,0 G, T/siirto-12h-1122.log). Alle 20 Gi: rivi PT:lle, ei uutta iso-kansioista käännöstä. Vapaa määrä PT:lle kivet-juuren jälkeen.

## KUITATTU TÄLLÄ VUOROLLA
PK i4, k1, i5 (viesti). NUI iPad 4 (SEIS muisti 4082 Mt, 4/5). NS yksi-taso, varat 1-3 ja kytkin2, lz1-2, lz3-2.

## OPIT TÄLTÄ VUOROLTA
- Ketju `aja A || exit 1; aja B`: A:n SEIS jättää B:n ajamatta. Tarkista ennen kuin lupaat tilaajalle B:n; lupasin NUI:lle väärin.
- Odottavan iPad-ajon saa siirtää vain kaatamalla sen trapin edellä, muokkaamalla odotuspidin ja käynnistämällä; ketjun seuraavan odotuspid vaihdetaan samalla.
- Skenaarion tallenne-ajo: mac-ajo kopioi vain png:t, tallenne siirretään erikseen (malli T/ks-jousi-jonossa.zsh).
- Jonorivi kirjoitetaan vasta, kun skripti on varmasti käynnissä (yhdistelmäkomennossa rivi ehti ennen epäonnistunutta käynnistystä; korjattu heti).

## LISÄYS: PT:n tilaus ennen VIE-sanaa
Kun KS:n 41022d9db on junassa 220 (odottaa jousen kuvaa, PT antaa junavuoron), aja yöportti uudelleen rungolla: gh workflow run natiivi-yoportti.yml, lue kaikki vaiheet. Kultaiset eivät ole menneet läpi ainakin 19.10. jälkeen, joten niiden tulos on tieto junasta. Jos vain kultainen on punainen, rivi PT:lle ennen VIE-sanaa. PK:n vartijakopiot näkyvät samassa ajossa.

## LISÄYS 11.50: TÄMÄ ON TUOREIN
Juna 220: julkaisija/juna-220 = 61c171795 (+ 497782741 kultaisten kopiot, 41022d9db vahtierä). Junarivit kirjattu. 15c97cc56 (PK j1) vain PT:n junavuorolla, kun PK on katsonut kuvat. KS:n 1c7215bc3 ei junaan. VIE-sana ei ole tullut: PT odottaa NUI:n, PK:n ja Lontoon kylttien kohtia.
Yöportti tehty: 42361120638 rungolla 61c171795 kaanna 868/868 ja tarkista vihreä, punainen vain aanijalki.json ajurilla (paikallisesti läpi), syy auki, ei junasta. PT siirsi selvityksen PK:lle: JU ei jatka. Rivi junarivillä. Kopiot täsmäävät junaan 13/13 paikallisesti.
Kuitattu lisäksi: NS kertoja (9/9, 4 erilaista md5), PK j1 (4/4), KS jousi (vaistokoe 0) ja este (vaistokoe 164). NUI ajoi itse pallonapit, L1 ja L2 vapaat.
iPad jäljellä: VS kivisivu14 ajossa (pid 68958; sen jälkeen kivet-juuri T7:lle), KS muisti2 (68981), NUI 5-raketti (75290).
Oppi: zsh:ssa `$B:Peli-testit` tulkitaan muuntimeksi :P; käytä `${B}:polku`. Suodatin 'talot: aineisto puuttuu' poisti tulosrivin kopiosta ns-kertoja-ipad.zsh: tarkista kopioskriptin rivi-kutsu.
