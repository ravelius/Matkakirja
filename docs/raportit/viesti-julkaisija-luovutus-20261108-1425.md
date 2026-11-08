# Julkaisija: luovutus 8.11.2026 klo 14.25 (korvaa -1200:n; sen OPIT ja -1045/-0910:n OPIT voimassa)

Edelliset: git show cc810d9b3:docs/raportit/viesti-julkaisija-luovutus-20261108-1200.md (OPIT), f27870749:…-1045.md (TF-kaava).
Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, L = P/lokit, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (grep 'AJO |VIKA|laitekaannos VALMIS|SEIS|ALKOI|KESKEYTYI|rc [1-9]'), tail -30.

## 1. Juna 222 (TF vain omistajan sanalla; PT 14.05: EI TF:ää ennen navat-kohinan korjausta)
- Kärki f9ab126ce = 50200fb68 + navat (ca92af647, ffc355105, 86916cbd7) + lippu 4.42 (1f26c51b4; poistettu 061f730a8 ja palautettu ae521c8a8,
  OMISTAJA 13.14 "Ei vielä" → 13.17 "Oikein") + PK lataus c (208264a65..e59541a34, esipurku oletus pois) + NS kehä A 11b66adc5.
  wt /Users/Shared/Claude/wt/julkaisija-juna-221 (detached, HEAD = f9ab126ce), natiivi-backup julkaisija/juna-222 = f9ab126ce. Unity sh 0 joka vaiheessa (T/juna222-*-unity-tarkistus.txt).
- HUOM: TF 1.1 (222) = 5d6967444 on JO julkaistu (ajo 42460254109); laskuri P/lokit/testflight-ordinaali.txt = 222 → seuraava TF on 1.1 (223), muutosloki "1.1 (223)" mainiin ENNEN ajoa.
- NAVAT-KOHINA (PT 14.05 tehtävä, raportoitu PT:lle ja NS:lle 14.22): T/selvitys-v1020-20261108.txt. v1020 = mainin automaattivienti 51a54057a, vain Raamattu/lehti → ei syy.
  TF-verrokki 5d6967444 kohina 0,27 vs 86916cbd7 1,22 → junan 222 navat-vika, laukeaa Pariisin kautta (kalotit pois/takaisin). Rajaukset L/natiiviseppa-navat-koho/tf-verrokki-rajaukset/.
  Odottaa NS:n korjausta → uusi commit junaan PT:n sanalla.

## 2. Ämpärit: valmiit ja kuitatut KS:lle
- Merenpohja koko maailma 699051/699051 CDN 13 OK (13.15; 11.13-ajo kuoli ilman rc:tä → jatko JATKA=1, T/ks-merenpohja-vienti-jatko.zsh).
- Kohokartta v6 kaikki 8 osaa ok (13.25). HUOM: v6-vienti.zsh "osia vialla N/8" on rikki (laskee "virheitä 0" -rivit) → tarkista osien viimeiset rivit itse.

## 3. iPad-jono (iso iPad 00008103)
- KÄYNNISSÄ: PK glb 9c40eb7e3 (T/pk-glb.zsh pid 69238): 0a, 2a, 0b VALMIS (huiput 4416/4426/4413 Mt, kaikki rc 0 ELOSSA); 2b, 0c, 2c jäljellä
  → L/pelikoodari-lataus-glb-*. Kun sarja loppuu ("PK glb 6 ajon sarja loppui"): YKSI kuittaus PK:lle (local_91a1bc27-6870-46aa-9886-66fd33b68880) kaikista kuudesta (rc, huippu, ELOSSA).
- Kuitattu tällä vuorolla: NUI lippu-442-2, kartta-lukittu-2 (md5:t), napautus-2 c33b2ebd1, kartta-lukittu-3, topoesittely Mac-videot 79f8a637b (-2 ja -3/mac);
  PK g+f, kuvat-c (L1); NS kehä, kehä-verrokki, FPV-kuvakoe 2efebff6e; TF-verrokki 5d6967444.
- UUSI: T/pk-lataus-ipad.zsh odottaa etuoikeutta: jos /tmp/ju-etuoikeus/pid on elävä pid, PK-ajot odottavat (kiireellinen ajo ohi). Tiedostossa nyt kuollut pid → ei vaikutusta.

## 4. Siivottavat (vain kuittausten jälkeen; säilytä junan kärjet, rungot d092f48cc/2cba21a3e/10e9b6c4a, 5d6967444 (TF-verrokki) ja jonon käännökset)
L/julkaisija-laite-218-{48e5654ae,756f4962d,491bec23b,ca92af647,b4e624cfe,ae84dd1dd,1f26c51b4,c33b2ebd1,17addbe2d,11b66adc5,2efebff6e}; 86916cbd7 säilytä kunnes navat-kohina ratkaistu; 9c40eb7e3 kun glb-sarja kuitattu.

## OPIT (uudet)
- Kaksi lukkoa odottavaa kääreensä: PK-sarja (pk-lataus-ipad) ottaa lukon heti edellisen jälkeen; kiireelliselle käytä /tmp/ju-etuoikeus/pid tai odota sarjan pid:tä.
- Sama käännös voi antaa eri kuvan: tarkista ajon konsolista, kävikö kamera Pariisissa ("napakalotit: Pariisi"), ruutulaskuri (merkit.txt) ja osumaPros (kehysajat.jsonl).
- Sisältöpaketin muutos: aws s3api list-objects-v2 --prefix sisalto/1/vNNNN/ --query 'Contents[].[Key,ETag]' kahdesta versiosta + diff; uusin.json kertoo commitin.

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille (local_afae44f0-722b-4541-a3b8-30ca4f76543b).
