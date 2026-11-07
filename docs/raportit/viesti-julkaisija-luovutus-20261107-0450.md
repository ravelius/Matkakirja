# Julkaisija: luovutus 7.11.2026 klo 04.50

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat luovutukset. Id:t: /Users/Shared/Claude/osoitekirja.md.

## ALOITA TÄSTÄ: yksi ajo pyörii irrotettuna, viritä odotin, älä käynnistä uudelleen
Tarkista `ps -p 32850` ja jonolokin häntä. Ajo voi olla jo päättynyt, ja tulos on silloin kuittaamatta. Odotin: `tail -n 0 -F` jonolokista, suodatin `ALKOI|AJO |VIKA|kaatui`, Monitor 30 min, viritä uudelleen päättyessä.
- KS 44 b58c19ea9, L1, alkoi 04.45, pid 32850 (T/ks44-jonossa.zsh), 31 kuvaa, aikaraja 35 min, kerroin 0.465, T/ks-yhteinen44.tulos, lokit/karttaseppa-yhteinen-44-b8-b58c19ea9. Varjostin TaloKerros.shader muuttui: kerro Shader error -määrä. Kuittaus valmiista Karttasepälle (alku kuitattu).
Kun KS 44 on kuitattu eikä jonossa ole muuta: rivi PT:lle "JONO TYHJÄ: Julkaisija". L2 on vapaa. iPadilla runko d092f48c, iPad-jono tyhjä.

## KUITATTU TÄLLÄ VUOROLLA (kuvia en arvioinut, paitsi valomuodosta yksi kartalta)
PK E3, E4 (fdbf8a0ef), juoksu-x (puute 1: rikkomisreaktio, kuvat 11/11), juoksu-y, y2, z, z2. VS valomuoto, lahi-1, rappaus-1, -2, -3. KS 42, 43 (71/71; myös PT:lle). NS intro paketti-i, Canopée. NUI -7, kuvat-3, -4, -5, yhteinen-1, kainalo-lontoo-1. LAV jalusta1, -2, seina1, -2, -3, vyo1.
PT:lle 04.39 "JONO TYHJÄ", sen jälkeen tuli vielä z2, rappaus-3, KS 44 ja vyo1.

## VALMIIT AJOSKRIPTIMALLIT (T/)
- LAV:n aja-*.zsh: lav-seina2-jonossa.zsh (linja vapaa heti), lav-jalusta2-jonossa.zsh (odottaa pid:tä). Vaihda sed:llä nimi, sha, L.
- VS rappaus (tarkastelu-worktree, oletuskerroin): vs-rappaus3-jonossa.zsh. VS Pariisi 0.465: vs-lahi1b-jonossa.zsh.
- PK juoksupeli (oletuskerroin, koko a[3]; katkeamisessa kuvat talteen): pk-juoksu-z2-jonossa.zsh. PK Lontoo 0.465: pk-e4b-jonossa.zsh.
- NUI aloituslento: nui-aloituslento4-jonossa.zsh, kaksi peräkkäin nui-kohta10-jonossa.zsh. NUI tallenne: nui-kyltit7-jonossa.zsh.
- NS tallenne + mp4: ns-canopee2-jonossa.zsh. KS: ks44-jonossa.zsh (ks-yhteinen-l1.zsh on L1).

## OPIT TÄLTÄ VUOROLTA
- Pyynnön "rinnalla vain X" tarkoittaa: seuraavat ajot odottavat tämän pid:tä, vaikka toinen linja olisi vapaa (jalusta2 ja kainalo-lontoo-1).
- Skenaarion otsikko voi sanoa kertoimen, vaikka pyyntö ei sano: lue ensimmäiset rivit (sk-d5: 0.465).
- Lyhyet KK-kohdat pitkien edelle: tarkista ALKOI samassa komennossa, kill vain odotussilmukat, ketju uudelleen uusilla pid:illä, viesti siirtyville tilaajille.
- zsh lukee ajossa olevaa skriptiä: älä muokkaa odottavaa tiedostoa, tee uusi tiedosto.
- Laattapaketti-rivi vaaditaan vain, kun `git grep julkaisija-laite-218 <sha> -- Assets/Matkakirja/Kartta/Laattapalvelin.cs` löytää; 5b1a5491c ja e5619a1c1 eivät viittaa.
- Exception 11 on ollut joka ajossa; en avannut rivejä muualta kuin valomuodosta (Cesium ion). Kuittauksessa sanotaan, jos rivejä ei avattu.
- aja-vyo1.zsh tulostaa "SEINA2 AJETTU" (LAV:n kopiointi, kerrottu LAV:lle).

## OPIT EDELLISELTÄ VUOROLTA (voimassa)
- Valmis-rivi ei riitä: tarkista `^alku` listasta; puute kerrotaan tilaajalle ennen ajoa. Mac-ajon listoissa alku on pakollinen, ellei tilaaja kerro muuta.
- Skenaarion peräkkäiset komennot ilman odota-riviä hävittävät komentoja iPadilla. Tarkistus ennen iPad-ajoa: `grep -v '^#' sk | awk '/^komento /{ if(p!="") print p" -> "$0; p=$0; next} /^odota/{p=""}'`.
- "kaatui 1" tulosrivillä voi olla oma signal 15 LOPUN jälkeen: katso konsolin viimeinen rivi.
- Tallenne ei tee videota: `zsh tyokalut/tallenne-video.sh <K> <nimi> <K>/<nimi>.mp4`.
- Olemassa oleva kuvakansio antaa väärän kuvamäärän: katso aikaleimat.
- Kahden ajon jono samalla linjalla: seuraaja odottaa koko ketjun pid:tä, ei lukkoa.
- Levy siirto T7:lle vain PT:n luvalla ("/Volumes/T7 4TB/Matkakirja-lokit-arkisto/proto-3d-lokit/", rsync + diff -rq + rsync -an, sitten lähde pois). Nyt 44 Gi.

## YÖN SÄÄNNÖT
- Yöllä vain Pariisi, Lontoo ja juoksupeli (Kielletty kaupunki kuuluu). Muu: ei ajoa, rivi PT:lle.
- Enintään 2 Unityä: T/ju-portti.zsh (`source`, `portti <linja>`) kaikissa uusissa ajoskripteissä. Ei päällekkäin planeetta-ajon kanssa.
- Vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa: kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle, seuraavaan työhön.
- Levy: rivi PT:lle alle 35 Gi. Älä poista lokit/-kansiosta ilman PT:n nimeämistä. ÄLÄ siirrä lokit/julkaisija-laite-218-2cba21a3e: laattapaketti luetaan sieltä.
- ipad-lukko päästää saman roolin läpi: seuraavan JU:n iPad-ajon on odotettava edellisen ketjun pid:tä; vartija "toinen ajo iPadilla" ennen EXIT-trapia. Mallit T/pk-lontoo-f3-ajo.zsh ja T/ns-z102-ipad-ajo.zsh.
- Laitekäännös: `PROTO_KEHITYS=1 LINJA=<L> ASENNA=0 zsh T/laite-iso.zsh <sha>`.
- TF ei lähde ennen KK:n korttia "Pariisi valmis" PT:n kautta.
- Tallenne ei onnistu iPadilla, kun konsolikäyttäjä on samireivinen (oli 03.17).
