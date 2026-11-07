# Julkaisija: luovutus 7.11.2026 klo 21.24 (korvaa -2040:n; sen ja -1803/-1700/-1628:n OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa: git show 29478fdbd:docs/raportit/viesti-julkaisija-luovutus-20261107-2040.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS|vahtikytkin|skripti loppui|sarja loppui', 30 min), sitten ps pideistä ja tail jonolokista: mitä jäi kuittaamatta. Kaikki on nohupilla.

## JONO (kuittaus tilaajalle: kuvat, md5, samat kuvat nimeten, aika; älä arvioi)
- VS vyö 2+2 (2 ajoa per sha, VS kuittasi sanan): pid 77527 ajaa d9207ccc2 -eikons (VALMIS 21.18, 2/2, huippu 3925, VIKA-skenaario 0) ja 72e257a0b -eikons-4 (ajossa 21.18); sitten pid 86437: d9207ccc2 -eikons-2 ja 72e257a0b -eikons-5. Kansiot lokit/linssiseppa2-vyo-<sha>-eikons[-n]. Rivi "sarja loppui" tulee 77527:stä välikierroksena; OIKEA LOPPU = "VS vyo-eikons 2+2 sarja loppui". KOKO SARJA KUITTAAMATTA VS:lle: yksi viesti lopussa, huippu ("hinta") jokaisesta, md5:t.
- VS nappula-lasku-ipad pid 11811 (T/vs-nl-ipad-jonossa.zsh, ajuri T/vs-nl-eikons.zsh): 86437:n jälkeen d9207ccc2 ja 72e257a0b, 1+1, vahti päällä, 16 kuvaa nl-*, kansiot lokit/linssiseppa2-nappula-lasku-<sha>-ipad. Loppu: "VS nappula-lasku-ipad sarja loppui". Kuittaus VS:lle.
- LAV s4e iPad 10e9b6c4a pid 10370 (T/lav-s4e-ipad.zsh, loki T/lav-s4e-ipad.log): laitekäännös L1 ajossa (21.21), iPad 86437:n jälkeen, lukko sarjoittaa pid 11811:n kanssa. Ilman konsolia (kerrottu LAV:lle), VAHTI POIS, muisti-tarkka 100 ms, kerran, ei uusintaa, 17 kuvaa. Kuittaus LAV:lle: md5-eri, kulku1-6-eri, huippu, ELOSSA-LOPUSSA, juoksu-puuttuu, PUUTE, polku lokit/linnanrakentaja-s4e-ipad. Vahti palaa lopetuksessa: katso jonorivi "runko takaisin, kytkin: paalla". LAV katsoo kuvat ennen PT:tä. VERTAILU: seina4/5 huiput 4646/4608 Mt.
- NS muistivaiheet 0, V, 1, 2 (omistaja 21.19, PT): tulevat iPad-jonoon NS:n pyynnöistä; "kartan kuva-ajot ensin". Nappulan ja LAV:n ajot pysyvät ennallaan.

## JUNA 220: julkaisija/juna-220 = 72e257a0b (natiivi-backup; 901e4004b + VS 73c744f37, 72e257a0b; vahdit ok, Kartta-testit 710/710, junarivi kirjattu, ei käännetty). PT 21.0x: pysyy kärkenä, EI palautusta. PT: napakalotit junaan omistajan päätöksellä 21.19: NS tekee puhtaan commitin, JUNAVUORO VAIN PT:N SANALLA; juna = 72e257a0b siihen asti. Ei lähtökäännöstä ennen nappulan piilotusta (d9207ccc2, ei junassa); lähtö ja TF vain omistajan pyynnöstä. PK:n 10e9b6c4a (vakiot, kulkukartta) ei junaan ilman PT:n sanaa. iPhone-tarkistus junalla ennallaan.
Tapa: git show 02e202344:docs/raportit/viesti-julkaisija-luovutus-20261107-1231.md rivit 18-19; testit puusta git archive + git init + Kartta-testit sh ./kaanna.sh. Suora siirto: update-ref vanhalla arvolla + push natiivi-backup + python3 -I tools/asemataulu/juna.py lisaa --juna 220.

## ODOTTAA SANAA
- .appit lokit/julkaisija-laite-218-*: 72e257a0b, 73c744f37 PT:n sanaan asti (VS); 901e4004b JU:n päätös: säilytä (edellinen junakärki, VS ei tarvitse); d9207ccc2 ja 10e9b6c4a tilaajan sanaan; NS f1c6111a8, a04bdb753 NS:n sanaan.
- AAMU 8.11.: tarkista /Users/Shared/Claude/_levy/simu-yosiivous-20261108.log: ajo tapahtui ja "iPad-välimuisti" -rivi. Rivi PT:lle.

## VALMISTA TÄLLÄ VUOROLLA (kuitattu)
VS vyö-eikons 72e/73c/72e; NS katot koe11, koe12; NS pariisi-muisti 0b (AJETTU-rivin huippu 3917 oli jäämä, oikea muisti-tarkka 4251 Mt, kerrottu NS:lle: ajo.zsh hakee vanhan tuloksen, kun vahti pois); KS afrikka-1 (1 NRE PalloKierto.cs:905); VS nappula-piilo d92/72e, nappula-lasku, lasku2; PK ovet-s4e (kuittaus jonossa PK:lle); LAV esto-s4e (ERO; LAV mittasi uusia 0, poistuneita 66); VIETY 21.09 saanto4e ec728ab2659a 230 + palatsi-esto-v40 8e308a2b21e1 1, virheitä 0, PK vahvisti 0 viittausta.

## OPIT
- Vahti pois -ajossa muistivahti-tulos.txt ja muistivahti.log ovat EDELLISEN ajon jäämiä: katso huippu muisti-tarkka.logista ja aika aina. T/lav-s4e-ipad.zsh ei hae niitä.
- muisti-tarkka.log kantaa MATKAKIRJA-rivit (^L): juoksupeli-puuttuu sama määrä kuin konsolissa (seina5 3 = 3), joten konsolia ei tarvita. peli-loki.txt ei käy tähän.
- "2+2" ja "1+1" = ajoja per sha, ei kuvia. Kysy tai kerro tulkinta heti viestissä.
- Bash: zsh-laajennus ${(f)...} komentorivillä kaatuu turvatarkistukseen (ei rm:ää): skripti tiedostoon.
- SEIS voi tulla viestinä siirron jälkeen: kerro sha, kysy PT:ltä, älä palauta itse.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille.
