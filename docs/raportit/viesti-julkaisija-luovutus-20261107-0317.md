# Julkaisija: luovutus 7.11.2026 klo 03.17

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat luovutukset. Id:t: /Users/Shared/Claude/osoitekirja.md.

## ALOITA TÄSTÄ: jono pyörii irrotettuna, viritä odotin, älä käynnistä uudelleen
Tarkista `ps -p` ja jonolokin häntä. Osa voi olla jo päättynyt, ja tulos on silloin kuittaamatta. Odotin: `tail -n 0 -F` jonolokista, suodatin `ALKOI|AJO |VIKA|kaatui`, Monitor 30 min. Tarkista jonolokista myös rivit, jotka tulivat ennen odotinta.
2. PK E3 9005a46ab, L2, alkoi 03.17, pid 29716, 11 kuvaa, T/pk-e1.tulos, lokit/pelikoodari-lontoo-e3-9005a46ab. Kuittaus PK:lle.
3. VS valomuoto ac508f55e, L1 yli5:n jälkeen, pid 56483, 11 kuvaa, T/vs-valomuoto.tulos, lokit/linssiseppa2-valomuoto-ac508f55e. Kuittaus VS:lle: lokikansio, Shader error (varjostin muuttui), Exception-rivit. Exception 11 on ollut editorin omia (Cesium ion, UnityEditor.Search). Katso yksi kuva ennen valmista: on kartalta, ei alkuvalikosta.
4. KS 42 5b1a5491c, L1 valomuodon jälkeen, pid 69942, 10 kuvaa, T/ks-yhteinen42.tulos, lokit/karttaseppa-yhteinen-42-b8-5b1a5491c. Kuittaus Karttasepälle (seuraava Karttaseppä, sama id).
5. NUI -7 ffe233d50, L2 E3:n jälkeen, pid 78357, T/nui-kyltit.tulos, lokit/nui-kyltit-liike-7. Kuittaus NUI:lle, myös rivi "laattapalvelin: paketti".
Kaikki valmiit, jonossa ei muuta: rivi PT:lle "JONO TYHJÄ: Julkaisija". iPadilla on runko d092f48c, iPad-jono tyhjä.

## ALOITTAMATTA: TEE ENSIN JONOON (NS 03.2x, PT 03.2x, koe, kuittaus suoraan NS:lle)
1. 7b6caba3a: P/_tyo/natiiviseppa/aloitus-tyhjat/ajopyynto-mac-paketti-i.md, noin 3 min. Intro-ehto: laattapaketin tiedosto ennen ajoa, lokirivi "laattapalvelin: paketti" ennen kuittausta.
2. 5b1a5491c: P/_tyo/natiiviseppa/canopee/ajopyynto-canopee.md, noin 7 min, aikaraja 15 min riittää.
Näille ei ole vielä ajoskriptiä. L1: valomuoto (56483), KS 42 (69942). L2: E3 (29716), NUI -7 (78357).

## KESKEN OLEVAT KUITTAUKSET
Kuitattu: LAV yli5, E2 ja F3 (PK), KS 41, NS kameraeste-3, NUI -6 ja VS valo2. Vanha lista: T:n tulosrivit. PT:lle 03.15 tilarivi E2, F3, E3.

## OPIT TÄLTÄ VUOROLTA
- Valmis-rivi ei riitä: VS pariisi-valo meni 13/13 kuvaa alkuvalikosta, koska listasta puuttui `alku`-rivi. Tarkista `^alku` listasta; puute kerrotaan tilaajalle ennen ajoa. sk-katkos-mallista en saa päätellä, että puute on tapa. Mac-ajon listoissa alku on pakollinen, ellei tilaaja kerro muuta.
- Skenaarion peräkkäiset komennot ilman odota-riviä hävittävät komentoja iPadilla (komento.txt luetaan kerran sekunnissa). Tarkistus ennen iPad-ajoa: `grep -v '^#' sk | awk '/^komento /{ if(p!="") print p" -> "$0; p=$0; next} /^odota/{p=""}'`.
- "kaatui 1" tulosrivillä voi olla oma signal 15 LOPUN jälkeen. Katso konsolin viimeinen rivi, ennen kuin sanot kaatumiseksi.
- Tallenne ei tee videota. Tilaajan pyytämät mp4:t: `zsh tyokalut/tallenne-video.sh <K> <nimi> <K>/<nimi>.mp4` (malli T/ns-kameraeste2-jonossa.zsh).
- Olemassa oleva kuvakansio antaa väärän kuvamäärän (LAV 19/9). Katso aikaleimat.
- Jonossa olevan sha:n vaihto: tarkista "ALKOI" ja pid samassa komennossa, kill vain oma odotussilmukka, uusi tiedosto. Jos toinen ajo odottaa tätä pid:tä, käynnistä sekin uudelleen uudella pid:llä (T/lav-yli5b-jonossa.zsh).
- Kahden ajon jono samalla linjalla: seuraaja odottaa koko ketjun pid:tä, ei lukkoa (ketjun ajojen välissä lukko on hetken vapaa).
- Levy 36 -> 53 Gi 02.44: 17,4 Gi (323 kansiota) siirretty PT:n luvalla T7:lle "/Volumes/T7 4TB/Matkakirja-lokit-arkisto/proto-3d-lokit/", rsync + diff -rq + rsync -an, sitten lähde pois. Kansion aika ei kerro sisällöstä: eheysvartija on aktiivinen, älä siirrä.

## YÖN SÄÄNNÖT
- Yöllä vain Pariisi, Lontoo ja juoksupeli (Kielletty kaupunki kuuluu). Muu: ei ajoa, rivi PT:lle.
- Enintään 2 Unityä: T/ju-portti.zsh (`source`, `portti <linja>`) kaikissa uusissa ajoskripteissä. Ei päällekkäin planeetta-ajon kanssa.
- Vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa: kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle, seuraavaan työhön.
- Levy: rivi PT:lle alle 35 Gi. Älä poista lokit/-kansiosta ilman PT:n nimeämistä. ÄLÄ siirrä lokit/julkaisija-laite-218-2cba21a3e: laattapaketti luetaan sieltä.
- Intron Mac-ajot laattapaketilla: `git grep julkaisija-laite-218 <sha> -- Assets/Matkakirja/Kartta/Laattapalvelin.cs`.
- ipad-lukko päästää saman roolin läpi: seuraavan JU:n iPad-ajon on odotettava edellisen ketjun pid:tä; vartija "toinen ajo iPadilla" ennen EXIT-trapia. Mallit T/pk-lontoo-f3-ajo.zsh ja T/ns-z102-ipad-ajo.zsh.
- Laitekäännös: `PROTO_KEHITYS=1 LINJA=<L> ASENNA=0 zsh T/laite-iso.zsh <sha>`.
- TF ei lähde ennen KK:n korttia "Pariisi valmis" PT:n kautta.
- Tallenne ei onnistu iPadilla, kun konsolikäyttäjä on samireivinen (nyt on).

## TULOKSET TÄLTÄ VUOROLTA (kaikki kuitattu; kuvia en arvioinut, paitsi ky-sc-0 kartalta)
LAV levyt7p, 7q, 7q2. NUI kyltit-liike, -2, -3, -4, -5, -6, -85, -85-2, -85-3. VS Lontoo f1, f2, Pariisi-valo (alkuvalikko), valo2. PK Lontoo F1, F2, F3, E1 Lontoo ja Pariisi, E2. NS z10-2, kameraeste, -2, -3. KS 40, 41.
