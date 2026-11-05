# Karttaseppä: luovutus 6.11.2026 klo 01.21 (KS)
Syy: konteksti yli 25 %, luonteva tauko, kun Mac-ajo on JU:lla (7.37). **Voittaa -0107:n ja -0059:n ristiriidassa; lue ne taustaksi.** W:n kärki 65a42c1a8 (karttaseppa/nahtavyydet-219, natiivi-backup). Kaikki kokeena, ei junaan. KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. JU = local_b4a7e82a-2522-437f-84ff-813401120931.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`.

## KK 01.09 (sitova)
Sacré-Cœur otto 1, mäki ja Codexin 24p kelpaavat kokeena; ei junaan, ei uutta ottoa, omistaja voi aamulla pysäyttää. Kuitattu Codexille ja Tripolle d0d5ac0e3. Kapseli saa jäädä. Seuraavaan ajoon samat kuvat, yksi kysymys: **seisooko eteläpää maassa.**

## AJO JU:LLA
`_tyo/karttaseppa/sk-pariisi-sc-2.txt`, tulos `lokit/karttaseppa-sc-65a42c1a8`, 6 kuvaa (5 samaa + PT:n puut-ylhaalta).

## AJON JÄLKEEN
1. Katso täysikoossa: eteläpää (`sc-matala`, `sc-lahi-koillinen`), terassin lattia (hyväksytty 216,203,190), askelmat, portaiden liitos kaaren alla ja pää, nurmi 4096e2309 (hyväksytty 133,144,79; mitattu aiemmin 157,166,97).
2. Lokista `maasto siirtyma` -rivi juuri ennen `sc-matala`-kuvaa: mikä valinta ja kerroin.
3. Parit `sc-pari.py`:llä (vaihda lokikansio ja rajaukset; mäki on nyt 10 m pidempi etelään). Kuvat KK:lle, kysymys "seisooko eteläpää maassa".
4. `puut-ylhaalta` PT:lle: näkyykö puu varjonsa päällä. Ei korjausta ennen PT:n sanaa.

## MITÄ 65a42c1a8 TEKEE (`sarja24-asennus/`)
- `sc-maki.py 186`: rasteri päättyi z 240:een ja katkaisi kapselin suoraksi, nyt z 270 ja kapseli 250 × 480 m pyöreällä päällä. Mäki seuraa porrasviivaa (94, 53) → (243, −13,2). Nurmi vaihtuu viimeisillä 22 m:llä kartan väriin: kuvassa 226,184,169 = kartta 219,190,146 mäen Savyn läpi.
- `sc-muokkaa.py`: lattian 614 kolmiota atlaksessa × 1,364 / 1,235 / 1,653 (lineaarinen). Tripon portaat pois (1836 kolmiota). Atlas on JPEG (images[1]); PNG on normaalikartta.
- `sc-portaat.py`: oma malli, 18 kolmiota, 46 askelmaa kuvana, koska otsapintaa ei näy ylhäältä. Väri sama albedo kuin lattia, Savy kuten kirkolla.
- `sc-asenna.py <Resources/NotreDameKoe>` ajaa kaiken edellä paitsi `sc-maki.py`:n. Pohja ei muuttunut.

## AUKI, KK:LLE KERROTTU
- Portaat päättyvät noin 7 m ennen reunaa: maasto kallistuu leveydellä 10 m (z 245: x −26 = −14,7, x +26 = −24,8).
- Maastotaso ei ole todistettu. z12 165 / z11 181 / z10 119 m eteläpäässä; SSE-laskelma antaa z12:n näihin kuviin, mutta kaukaa z10 voi jättää mäen 46 m ilmaan. Jos ajo näyttää yhä lautan, seuraava keino on helma reunan ulkopuolelle maaston alle (syvyystesti maastoa vasten selvitettävä ensin).
- Itärinne jyrkkä ja tumma: ei tehty.

## TYÖJONO
1. Ajon tulos KK:lle. 2. Montparnasse: torni oikeista mitoista ilman Tripoa (87575ff09); mittaa maasto ensin `sc-maasto.py`:n tavalla.

## Opit
- `python3 -I` ei löydä numpya; käytä `/opt/homebrew/bin/python3` omille skripteille.
- GLB:ssä ensimmäinen kuva ei välttämättä ole peruskuva: lue indeksi materiaalista ennen tallennusmuotoa.
- Kolmion poisto keskipisteellä jätti pitkiä piikkejä: katso kärjet.
- Rasterin rajat ennen muodon rajoja: 240:n raja näytti kapselin omalta muodolta.
