# Julkaisija: luovutus 7.11.2026 (korvaa -1700:n; sen ja -1628:n OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS|vahtikytkin', 30 min), sitten ps pideistä. Kaikki on nohupilla.

## JONO (kuittaus tilaajalle: kuvat, md5, samat kuvat nimeten, aika; älä arvioi)
- LAV saanto2 61afeb7f2 pid 76858, L1 perus-osa 18.00 alkaen, 45 + 45 kuvaa, palkki/kuvat-saanto2 ja -perus. Valmis-rivi LAV:lle. Ei vientiä, ei iPadia.
- VS film11-verrokki 84deb0978 pid 83210: laitekäännös L2 17.43 alkaen (luo hidas T7-siirtojen takia, ei vika), sitten iso iPad, 3 kuvaa, vahti PÄÄLLÄ, lokit/linssiseppa2-film11-verrokki-84deb0978. Kuittaus VS:lle, tarkka-huippu mukaan. Jonolokin tulosrivin kansionimi voi olla väärä (mallipohja): käytä tätä. VS: jos Xcode kaatuu toisen kerran, rivi syystä VS:lle, ei kolmatta yritystä.
- VS film11-vahti-pois 02a6cc1dd pid 83228: odottaa verrokkia; ei aja, jos verrokin tulosriviä ei ole. Valmis .app, 3 kuvaa, VAHTI POIS vain tässä ajossa, lokit/linssiseppa2-film11-pois-02a6cc1dd. Lopetus palauttaa kytkimen (jonorivi "vahtikytkin takaisin ... luettu paalla") ja rungon. Yksi ajo, ei uusintaa. Kuittaus VS:lle. .appit 02a6cc1dd ja 84deb0978 pois VS:n sanalla.
- NUI elämä 10 7fc20c516 pid 81978: odottaa linjaa ja T/laite-iso.zsh:n lukkoa, käännös alusta, sitten iso iPad, 6 kuvaa, VAHTI POIS vain tässä ajossa, lokit/natiivi-ui-kartan-elama-10-ipad-kuvat-7fc20c516. Huippu muisti-tarkka.logista. Rivi NUI:lle: kuvat, lokit ja kytkin takaisin (luettu paalla; myös kytkin-listaus.txt). Kuvat ja tulos NUI:lle, junaan ei mitään ilman korttia. iPad-järjestys ratkeaa lukolla.

## LEVY (omistajan pyyntö, PT 17.43): RAPORTTI PT:LLE KESKEN
T/siirto-levy-1745.py --aja pid 93200 ajossa (log T/siirto-levy-1745.log tulostuu lopussa): esikatselu-2-Library-b7 (6,3 Gt) ja app-jako (2,5 Gt) T7:lle proto-arkisto/ linkillä. Grep: b7 vain vanhoissa b8-skripteissä; app-jako mainittu yhdessä natiivi-ui-ajot-tekstissä, linkki riittää. Kun valmis, rivi PT:lle: montako Gt ja mitä jäi:
- Worktree pariisi-219 poistettu 0,5 Gt, haara jää. 28 vanhaa T/*.zsh viittaa siihen; uusiin wt/julkaisija-ns-gc/tyokalut/ipad-lukko.sh.
- Jäi: yhdistelma-218 (c1a30e11f ei etäpäässä), ns-gc ja pk-218 (esikatselu-rungolla), postilaatikko 4 kt.
- Esikatselukopiot 7,3 Gt: EI vapaudu, Library 6,6 Gt on ajojen tuonti ja ne ovat käytössä.
- .app-kopiot: muut jo T7:llä linkillä. Jäivät d092f48cc, a8b873e5d, 2cba21a3e, 02a6cc1dd.
- _tyo/julkaisija 28 kt, ei siirretty. mke.* 11 Gi tehty aiemmin. Levy 190 Gi 18.00. Levyn rajat PT: alle 15 Gi rivi, alle 12 Gi käännökset seis.

## AAMU 8.11.: tarkista /Users/Shared/Claude/_levy/simu-yosiivous-20261108.log: ajo tapahtui ja "iPad-välimuisti" -rivi. Rivi PT:lle. Yöajon ajaa Claude-ajastus matkakirja-simu-yosiivous (ei launchd, ei Postivahti). PR 6478 mainissa a9b805011.

## JUNA 220: julkaisija/juna-220 = 901e4004b (+ NS iPhone-katto 60 m), natiivi-backupissa, junarivi kirjattu, vahdit ok. Ei käännetty.
LISÄYS junan iPhone-tarkistukseen (PT 17.30): kallista hitaasti 85° → 45° Pariisin yllä, näkyykö hyppy kamerassa; rivi PT:lle ja NS:lle; ei erillistä ajoa ennen junan käännöstä. Muu ennallaan: odottaa LAV:n testikuvia ja omistajan sanaa, yhteisajo ja kylmä aloitus vain PT:n sanalla, ei VIE-sanaa, yöportti lopullisella rungolla.

## KUITATTU tällä vuorolla: VS film8, film9, film10, taivas-karki, taivas-lento (2), taivas-matala (2), hyppy-runko, hyppy-runko2; LAV saanto; NS iphone-katto, talotyylit koe1; NUI elämä 8 ja 9 (SEIS 4084 ja 4088 Mt; .app poistettu 9:n jälkeen); VS film11 (SEIS 4084 Mt, huippu 4092).

## OPIT
- L1 ja L2 laitekäännökset jakavat saman T7-kopion. T/laite-iso.zsh:ssä nyt lukko /tmp/ju-laite-kopio.lukko; jos prosessi tapetaan -9:llä, tarkista lukko. Odottavan skriptin "while kill -0" ei kerro onnistumista: tarkista tulosrivi.
- Tallenne-ajo jättää kuvat kansioihin ja fps.txt:n (kuvat, video). Mp4 ffmpegillä, malli T/vs-hyppy-runko2.zsh.
- zsh: "$X:refs" tulkitaan :r-muunnokseksi; refspec lainausmerkkeihin ilman muuttujaa tai ${X}.
- Pysäytetyn laite-sha:n lukko voi jäädä: tarkista pid ja kuka, sitten vasta pois.
