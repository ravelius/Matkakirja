# Julkaisija: luovutus 7.11.2026 klo 12.31

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt. Korvaa -1136:n ja sen lisäykset; sen ja vanhempien OPIT, MALLIT ja YÖN SÄÄNNÖT ovat voimassa (git show 3e6bdcd69:docs/raportit/viesti-julkaisija-luovutus-20261107-1136.md).

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS', 30 min), sitten ps pideistä. Kaikki on nohupilla. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa.

## JONO (kuittaus tilaajalle; tarkista kuvat, md5 ja aika, älä arvioi)
iPad järjestyksessä:
1. KS muisti4 5488bdd8b, T/ks-muisti4-ipad.zsh pid 12703, ajossa 12.26, vahti päällä. VIKA on tulos, ei uusintaa. Rivi KS:lle.
2. LAV seinä2 a8b873e5d (TF 219), T/lav-seina2-ipad.zsh pid 17259, VAHTI POIS (PT:n sana), lopetus palauttaa vahdin. Kysyy lukkoa 0,2 s välein, joten menee kertoja2:n edelle. Kirjaa huippu ja kaatuminen; tarkista pelia.png:n md5 ja aika tästä ajosta (skripti nimeää ajon alkua vanhemman VANHA-alkuiseksi). Tulos PT:lle ja LAV:lle: pelia.png ja konsoli.txt (LAV lukee sarjojen peittopisterivin, ensimmäisessä ajossa konsoli 1336). Jos kaatuu: ei uusintaa, rivi molemmille. TULOS RATKAISEE KIVET, ks. JUNA.
3. NS kertoja2 59abbd78a, pid 48966, ÄÄNI KUULUU, odottaa HIDIdleTime ≥ 60 s ja ettei /tmp/matkakirja-kevyt ole. Käännös valmis. Kuittaus NS:lle.
L1: T/ns-yksi2-jonossa.zsh pid 32719 (kallistus-ennen ja -jälkeen valmiit 11/11, vaihto ajossa 12.16, raja 20 min; sitten rivi "3 ajoa loppu": kuittaus NS:lle kaikista kolmesta; mp4-laskuri voi näyttää 0, tarkista lokit/natiiviseppa-yksi-vaihto) → T/ns-joki-jonossa.zsh pid 42086 (46b7cf417; kuittaus NS:lle) → T/ks49-jonossa.zsh pid 81292 (KS yhteinen-49 e52a8cb7f, 83 kuvaa, raja 60 min; ratkaisee usvan ehdon ja Louvren nimen; rivi KS:lle).
L2: T/ns-pohja-jonossa.zsh pid 5560 (NS mac-3 d2ba2f540, odottaa pid 32719:ää; kuittaus NS:lle) → T/pk-jalat-jonossa.zsh pid 9447 (ennen 7dcd156ba, jälkeen 1dd3a812f; rivi PK:lle; PK:lle kerrottu, että 7dcd156ba sisältää kivet) → T/nui-elama-jonossa.zsh pid 19600 (fc153914a; NUI:lle kansio).

## JUNA 220: julkaisija/juna-220 = 59319f789, natiivi-backupissa. Ei käännetty tässä kokoonpanossa.
Lisätty tällä vuorolla: e65e82df9 + 95c540690 (NUI lähtökysymys, oppaan valikko; napautus tarkistetaan junan käännöksestä), f9106079e (PK Lontoon isot). dc4b1c69c kivet lisätty ja PERUTTU revertillä e4ed1c5e6 (KK 12.13, PT).
KIVET TAKAISIN vain PT:n sanalla ja kumoamalla revertti e4ed1c5e6: dc4b1c69c on jo historiassa, joten uusi yhdistäminen ei tuo muutosta. Siksi 4c35cbc3c:n ja 7dcd156ba:n sisältöä ei saa pitää junan sisältönä.
Tapa: git merge-tree --write-tree + AJA VAHDIT PUUSTA ENNEN update-refiä (git archive puu Assets/Matkakirja tyokalut tyylikirja scratchpadiin; pohjavahti valovahti liikevahti kameravahti kielivahti tyylikirja-tarkistus uss-tarkistus) + commit-tree + update-ref vanhalla arvolla + push natiivi-backup + python3 -I tools/asemataulu/juna.py lisaa --juna 220 "teksti" (≤ 110 merkkiä per kohta, ei valmiin työn sanoja kuten "korjattu").
Valo- tai liikevahdin valitus: rivi PT:lle ennen ohitusta. VIE-sana (PT:n rivi "VIE 220 KOEVERSIONA") ei ole tullut; omistaja 11.52: juna odottaa talot kauemmas. Ehdot junarivillä: usva 16 km kuvattu koko Pariisin kuvakulmista (ajo 49). Lontoon palat-d9 ja -d10: mediassa olo tarkistamatta, kerrottu PT:lle. Kun runko on lopullinen, yöportti uudelleen (gh workflow run natiivi-yoportti.yml, lue kaikki vaiheet); PR 6457 node@22 on mainissa a852df695.

## LEVY: 22 Gi 12.31. Alle 20 Gi: rivi PT:lle, ei uutta iso-kansioista käännöstä. Alle 10 Gi: ei käännöksiä, rivi heti. Tällä vuorolla T7:lle 10,2 G (T/siirto-12h-1218.log, T/siirto-laitekopiot-1219.py malliksi; tulee linkki). PT poisti postilaatikon työpuun, joka oli syy. Fablen checkoutin pakkaan ei kosketa.

## KUITATTU: NUI 5-raketti (PUUTE 2), KS muisti3 (0/3, vahti VIKA), PK lontoo-i7, VS film1 ("karttafilmi: rakeen tekstuuri puuttuu" kerrottu), LAV seinä 1 (ei kuvaa).

## OPIT
- iPad-ajon haettu kuva voi olla VANHA: vahdin pysäytys estää uuden kuvan, ja sama nimi tulee laitteelta edellisestä ajosta (seinäajo 12.25: "1/1", kuva oli VS:n 11.51). Tarkista kuvan aika ajon alkuun ja md5. Malli T/lav-seina2-ipad.zsh, rivit ALKU= ja VANHA.
- Kun tilaaja ei sano vahdista, älä peri "vahti päällä" mallista: kuva-ajossa se pysäyttää ennen kuvaa rajalla 4080 Mt. Kysy tai kerro valinta kuittauksessa.
- Junavuoron commit-lista voi olla vajaa: tarkista git cherry juna haara ennen poimintaa (NUI 4 → 6).
- Yhdistelmäkomennossa vahdit AJETAAN ennen update-refiä, ei jälkeen; pohjavahti meni kerran punaisena pushiin.
- Tulosrivin laskurit: lue myös unity.log, sillä tilaajan sanamuoto voi poiketa (film1).
- BSD sed ja monimutkaiset korvaukset kaatuivat; kopioskriptit pythonilla ja assert jokaiselle korvaukselle.

## LISÄYS 12.33: TÄMÄ ON TUOREIN
NS yksi2:n 3 ajoa kuitattu NS:lle, pid 32719 päättyy. Vaihdosta puuttuu mp4 ja kamera.txt, ruudut tallella; NS sanoo, tehdäänkö videot. L1:llä joki 46b7cf417 alkoi 12.32, sitten ajo 49. L2:lla NS mac-3 pääsee alkamaan.
