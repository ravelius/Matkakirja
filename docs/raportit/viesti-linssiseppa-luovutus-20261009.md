# Linssiseppä: luovutus 9.10.2026 klo 11.5x (konteksti 80 %, PT:n nollauskäsky)

Rooli: Linssiseppä (Opus, high). Proto-git-worktree on `/Users/Shared/Claude/wt/proto-linssiseppa-astro-auto`. Muut omat worktreet ovat `wt/proto-linssiseppa-savu` ja `wt/proto-linssiseppa-steam`. Pääreposta käytössä on `wt/linssiseppa-kohtaukset` (docs-PR:t). Oma simulaattori on 00CF62C2 (linssiseppa-iPad13, T7-sarja). Simuvuoro pyydetään aina Julkaisijalta.

## Valmiit ja kuitatut

- **Juna 170:** yövalot v11 `4526065d1` (haara linssiseppa/yovalot-170c) on BUILD 170:ssä 4a140064e. Varasuunnitelman versio (`be1e6b6e5`, oletus pois) jäi käyttämättä.
- **Juna 171:** kaupunkimaisema-v2 `d5fd13b06` (linssiseppa/maisema-171, BUILD 170:n päällä), PT kuittasi.
- **Docs:** PR #4268 (mergetty 180c0e146) ja PR #4278 (Notre-Damen ja Kuninkaanlinnan odottavat lähilennot), kansio `docs/kohtaukset/pallokierros/`.

## Juna 172: kokoomahaara `linssiseppa/mikseri-173`, kärki `219ce1cd3`

Omistajan päätös: kaikki nyt suunniteltu menee yhteen isoon junaan 172. Lopuksi lähetetään Natiivisepälle ja PT:lle rivi "valmis 172:een". Haarassa on:

| Erä | SHA | Tila |
|---|---|---|
| 171-erä: savu ja liput (agentti), iltaikkunat, salamat, märät kadut (LS2:n märkyys), komennot opas kuuro/markyys/tunti/salama/salama pito | yhdistetty, mm. ce9079d0a, 150da7f39, f2008ac0b | simussa nähty osin (savu 4 ja liput 66 lokista, kuvakulma liian korkea); salamaa ja sadetta ei vielä kuvassa |
| Äänireititys mikserin ryhmiin (TF 169) | 6aa2c5314 | ei kuultu |
| Kori ja köydet valon mukaan (TF 169, agentti) | c1d375c5c (merge 8113b7dd7) | ei vielä kuvassa |
| NUI:n kontekstimikseri + pallon äänien rekisteröinti | 17e01cf2a + bd217b509 | NUI katselmoi ja kuittasi |
| Linssiäänet rekisteriin (radio 5, viritys 5, Ajattelijoiden kytkin) | 219ce1cd3 | PT kuittasi |
| Esittelykorkeus (TF 169, liikesääntö 3b): silmä 0,6 × H, kattojen yläpuolella (oma korkeusmalli), pallossa jyrkkyys ≤ 84°, Pysahdys.KattoYlaM | 696de08e9 (linssiseppa/korkeus-172, yhdistetty) | EI vielä simussa; vaatii kuva-arkin |
| Pallon uudet äänet pallo-elava-v2 (33 ääntä, Pelikoodari, ämpärissä 200): ohiajot sidottuina näkyviin ajoneuvoihin, muiden pallojen polttimet, sade kankaalle ja korille, lippu, yöhumina, 3D-pooli, ihmisäänet OSM-aukioille | df0208884 (linssiseppa/aanet-172, yhdistetty) + huiput 13c1a7076 | ei kuultu |
| Masterin yhdistys (konflikti KaupunkiAanimaisemaSoitin + KaupunkiKuuroTestit) | 2e7d6f960 | 1190/1190 |

Testit: unity-tarkistus 0 virhettä, Linssit 1190/1190.

**Erillinen koe:** Steam Audio HRTF `linssiseppa/steamaudio-172` `4869a5dc9` (v4.8.1, Apache 2.0, ~15 Mt, kytkin `pallo.SteamAudio` / `opas steamaudio 0|1|tila`, oletus pois). Ei ajettu Unityssä eikä laitteella. Natiivisepälle on lähetetty iOS-tarpeet (libz.tbd, bitcode NO) ja Mac-tarpeet (phonon-bundlejen allekirjoitus). Mittaus ja A/B Ultra- ja Huippu-tasoilla puuttuvat. THIRDPARTY.md pitää lisätä Lähteisiin ennen kuin koe kytketään oletuksena päälle. AirPods-päänseuranta (CMHeadphoneMotionManager → AudioListener) on PT:n hyväksymä jatkoerä Steam Audion jälkeen. Lupa kysytään vasta kytkimestä, ja NSMotionUsageDescription kirjoitetaan suomeksi.

## Kesken: elokuvalinja (omistaja 9.10., Raamattu LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA)

1. **Perus-kuva-arkki** (nykyinen kamera, ilman esittelykorkeutta), Pariisi valmis: `proto-3d/lokit/todistus-yovalot-diag-20261009-1108` (37 kuvaa). Tukholman ajo `-1117` jumittui: skenaarion `oleta`-rivit eivät löytäneet lokitekstejä ("saapuminen …: ei lokiriviä"), ja ajo keskeytettiin. Korjaa skenaarion `sk-kohtaus-tukholma.txt` oleta-tekstit vastaamaan todellisia lokirivejä (vertaa `-1117/konsoli-stdout.log`), ennen kuin ajat sen uudelleen.
2. **Kolme suurinta virhettä Pariisissa** (kuvista p01–p37):
   - (1) Pysähdykset jyrkästi ylhäältä (karttanäkymä), rakennukset litteitä: p08–p15 ja p30 → korjaus esittelykorkeus 696de08e9.
   - (2) Nopeat lennot Champs → Sacré-Cœur (p32–p34) ja Concorde → Eiffel (p20–p22) lähes suoraan alas lataamattomien sumeiden laattojen yli → hidasta tai viistoa lentokulmaa.
   - (3) Kuolleet hetket: Concorden ja Champsin pysähdykset leijuvat ~35–38 s (p19, p31) → kaari tai laskeutuminen täyttämään.
   - Lisäksi LR:n Notre-Damen malli on harmaa ja teksturoimaton (ei LS1:n vika).
3. **Seuraavaksi:** paikalliset korjaukset (2) ja (3), sitten uusi kuva-arkki mikseri-173-haarasta, jossa esittelykorkeus on mukana. Sen jälkeen kuva-arkki, kohtauslista ja 3 virhettä PT:lle uutena docs-PR:nä (PT: kuva-arkit ja mitatut kestot uusina PR:inä).

## Jono (seuraavat)

1. Tukholman kuva-arkkiskenaarion korjaus ja uusi kuva-arkki molemmista kaupungeista (simuvuoro Julkaisijalta, ~28 min).
2. Junan 172 tarkistusajo samasta käännöksestä:
   - skenaariot `sk-171b-pariisi.txt` / `-tukholma.txt`: savu ja liput lähempää, mikserin 0 % -testi (`opas mikseri kaikki 0` + `opas aanet`), kori yöllä ja päivällä, sade (kuuro + märkyys), salaman pito
   - uudet äänet: `opas aanet` listaa soivat
3. Elokuvalinjan korjaukset 2 ja 3 sekä kuvakäsikirjoituksen kohdat (tarinakuvien ajoitus kertojan sanoihin, NUI 2bb472819; Kuninkaanlinnan aarrekuvat tulevat Pelikoodarin PR:stä #4275).
4. **UUSI (PT 9.10.):** Pariisin avauksen nykyintron kuvakäsikirjoitus junan 172 jälkeen.
5. Notre-Damen lähilento (kohtaus 4b), kun LR:n malli on hyväksytty. Kuninkaanlinna myöhemmin.
6. Tukholman 8 uuden kohteen muodot (Karttasepän jalanjaljet-tukholma-lisa.json, tools/kohde_muodot.py).
7. Diagnostiikkakoodin siivous (KaupunkiYovalot-varjostimen tarkistuspisteet 10–17, KaupunkiPassi-diagnoosit) junan 172 jälkeen.
8. Steam Audio -mittaus Natiivisepän kanssa ja sen jälkeen AirPods-päänseuranta.

## Omat ajot ja tiedostot

- Skenaariot ovat kansiossa `/Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/` (sk-171b-*, sk-kohtaus-*, sk-yovalot-*). Ajo: `ajo-yovalot-diag.sh <app> <sha8> <skenaario>`. Käännös: `proto-kaanna.sh <haara>[+haara] 00CF62C2-2FE6-4993-8475-5786CC40A7A3`. Huom: käännös yhdistää proton masterin, joten konfliktissa se ajaa vanhalla appilla. Tarkista käännöksen lokista KÄÄNNETTY-rivi.
- Simu on sammutettu ja vapautettu 11.55. Taustalla ei ole ajoja.
- Muistitiedosto: `linssiseppa-tila-20261008.md` (Fablen muistikansiossa).
