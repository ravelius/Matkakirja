# Julkaisija: luovutus 7.11.2026 klo 10.00

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt. Korvaa aiemmat, mutta OPIT ja YÖN SÄÄNNÖT luovutuksista -0450 (haara julkaisija-luovutus-0450) ja -0750 ovat voimassa. Id:t: osoitekirja.

## TF 219 VALMIS
1.1 (219) a8b873e5d sisäisellä ryhmällä 08.58, run 42348000923. Avoin juna 220. PT:lle ja KK:lle kerrottu. Junarivin `juna.py tf` hylättiin, koska "Juna 219" Työn alla ei ole tyhjä: rivi on PT:n, kerrottu.

## ALOITA TÄSTÄ: tarkista jonolokin häntä; nämä voivat olla kesken tai kuittaamatta
1. VS kivet-ipad perus 5b5da152c, T/vs-kivet-perus.zsh, kansio lokit/linssiseppa2-kivet-ipad-perus-5b5da152c. Kuittaus VS:lle: AJO-rivi, MUISTI-rivi, VIKA-rivit, merkit.txt. Koeajon tulos jo kerrottu (VIKA 4094 Mt, 0/8 kuvaa, huippu 4460). Juuri 1,4 Gi jää iPadin Documents/koejuuri-kivisivu2:een; Mac-kopio lokit/julkaisija-kivet-juuri (VS kertoo siivouksesta PT:lle).
2. KS talot-sade 3a6402848, T/ks-sade-ipad.zsh: käännös L1 v115palan jälkeen, iPad perus-ajon jälkeen, sk-sade.txt 5 kuvaa, muistivahti pois, muisti-tarkka 100, raja 1200 s, lopuksi muistivahti.txt = paalla ja runko d092f48c. Kansio lokit/karttaseppa-talot-sade-b8-3a6402848. Kaatuminen tai jetsam: rivi KS:lle heti, ei uusintaa ilman PT:n sanaa. Kuittaus KS:lle, huippu muisti-tarkka.logista.
3. LAV v115pala e1b8a1091 L1, T/lav-v115pala.tulos: "V115PALA AJETTU" -kuittaus LAV:lle.
4. NS lähizoomi dd3a2e10f, ajopyyntö P/_tyo/natiiviseppa/lontoo-kamera/ajopyynto-lahizoomi.md. Mac-ajot jonossa irrotettuna: T/ns-lz-mac-jonossa.zsh pid 53271, L1 KS:n käännöksen jälkeen, koot iphone-vaaka ja iphone, pistekerroin oletus 1 (kerro NS:lle, kuten pyyntö vaatii). Kuittaukset NS:lle. iPad-ajot EI vielä tehty: laitekäännös dd3a2e10f, lz1 ja lz3 omina käynnistyksinä KS:n jälkeen; talopalat Documents/talopalat-lontoo-d7 kuten F3 (T/pk-lontoo-f3-ajo.zsh); keskeytä VIKA:sta, App terminatedista ja "talot: aineisto puuttuu" -rivistä; ei uusintaa ilman NS:n sanaa. Lämpö alussa Normaali. Malli T/vs-kivet-perus.zsh.
5. NUI lähtökysymys 4aa62f018: NUI ajaa itse L2:lla (ESIKATSELU NYT 09.58).
Odota lukot ja pid:t; tail -n 0 -F jonolokista, Monitor 30 min.

## LEVY
Noin 43 Gi. Yli 12 h lokit siirretty T7:lle 08.49 (T/siirto-12h-20261107.py, 12,8 G). Rajat: alle 30 Gi ei TF-ajoa ilman riviä PT:lle.

## VALMIIT MALLIT (T/)
Mac: lav-kolmio1-jonossa.zsh, vs-kivisivu4-jonossa.zsh, ks47-jonossa.zsh, ns-lontoo-jaa-jonossa.zsh. iPad: pk-tf219c-ajo.zsh (kaksi käynnistystä), pk-tf219d-ajo.zsh (muistivahti pois), vs-kivet-ipad.zsh (juuri Documentsiin), vs-kivet-perus.zsh (muistivahti.zsh perään).

## OPIT TÄLTÄ VUOROLTA
- iPad-ajuri ipad-skenaario-f1.zsh tuntee vain alku/peli/linssi/ui/komento/odota/oleta/kuva; odota-maailma, odota-peli ja tallenne-* ohitetaan. Lue skenaario ja kerro tilaajalle ennen ajoa. Haen kuvat `komento kuva` -riveiltä.
- Muistivahti laukeaa juoksupelissä 4080 Mt:ssa, jolloin komennot ohitetaan: "VIKA lähetys" ja 0 kuvaa, ei kaatumista. Katso muistivahti.log ennen selitystä. Kytkin Documents/muistivahti.txt = pois, luetaan käynnistyksessä; lopuksi paalla ja tarkistus.
- Tulosrivin muistivahti-grep "VIKA" laskee myös otsikon "VIKA-raja": käytä 'VIKA muisti'. Vahti pois -ajossa huippu muisti-tarkka.logista.
- Edellisen ajon EXIT-trap kirjoittaa muisti-tarkka.txt = pois: seuraavan ajon on kirjoitettava 100 uudelleen.
- `palatsi mallit` ei palaudu ämpäriin: puuttuva paketti antaa "puuttuu". Juuren linkit osoittavat T7:lle: rsync -aL ja devicectl copy to kansiolle toimii (935 tiedostoa noin 1 min).
- aja-*.zsh:n cp *.mp4 voi keskeyttää koko kopion zsh nomatchilla; kuvaton skenaario antaa VIKA, vaikka ajo onnistui. Katso esikatselukansio. Video: zsh wt/proto-pelikoodari-tarkastelu/tyokalut/tallenne-video.sh <E> <nimi> <mp4>.
- Vertaa kuvat md5:llä, jos koot ovat samat (NS lontoo-jaa: 3 samaa kuvaa, kerrottu).
- Background-Bash voi kuolla nollauksessa: käytä nohup ... &! ajoissa, jotka ylittävät nollauksen.

## LISÄYS 10.0x
L2-jono irrotettuna: NUI, NS lontoo-jaa2 8d8842ce6 (T/ns-lontoo-jaa2-jonossa.zsh, kuittaus NS:lle), VS kivisivu9 dc4b1c69c (T/vs-kivisivu9-jonossa.zsh, kuittaus VS:lle, 2 kuvaa, kuvat-kivisivu9). VS haluaa vertailuajon MUISTI-rivin.

## LISÄYS 10.1x: VS kivisivu10 iPad (PT:n sana), EI ALOITETTU
Käännös lokit/julkaisija-laite-218-5b5da152c valmiina. Ennen käynnistystä Documents/muistivahti.txt = pois, ajon jälkeen paalla ja tarkistus (malli T/pk-tf219d-ajo.zsh, T/ks-sade-ipad.zsh). Juuri: LAV:n koejuuri-v115pala (etsi find P/_tyo -maxdepth 5 -name koejuuri-v115pala) rsync -aL ilman kielletty-rakennukset-v126 ja kielletty-c2-v40, Documents/koejuuri-v115pala (malli T/vs-kivet-ipad.zsh). Skenaario P/_tyo/linssiseppa2/kivisivu/sk-kivisivu10-ipad.txt, 13 kuvaa, raja 1100 s. Lue skenaario: ajurin tuntemat sanat. Raportti VS:lle: huippu muisti-tarkka.logista, kaatuminen kyllä/ei ja kohta merkit.txt:stä, kuvien määrä. Järjestys iPadilla: KS talot-sade, sitten VS kivisivu10 ja NS lähizoomi PT:n ohjeen mukaan.
SIIVOUS VS:n pyynnöstä: koejuuri-kivisivu2 ja koejuuri-v115pala pois Documentsista. devicectl ei poista. Listaa Documents ensin. Sovelluksen poisto vain, jos siellä on pelkästään nämä ja lokeja; jos on muiden aineistoa (kartta-osat, talopalat-lontoo-d7: NS:n lähizoomi tarvitsee, NS kielsi poiston), ÄLÄ poista, vaan listaus VS:lle.
L2: VS kivisivu9 valmistuessa kuittaus VS:lle ja "ESIKATSELU NYT" L2 NUI:lle (lahtokysymys-2 4aa62f018, ajaa itse).
