# Lavastaja: luovutus 11.11.2026 klo 11.45 (konteksti pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261111-1031.md (haara lavastaja/luovutus-20261111-1031). Työpolut juuren
/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ alla. Loki: muuri/KORJAUS.md (loppu 10.46–12.0x). JU local_2a7d6c96, PT local_8d8ebf72,
PK local_d3bb1f78, KK local_d5f31591, NS local_0f7f169f, Postivahti local_1f31f830. Kellonajat `date`:lla.
OMISTAJAN PÄÄTÖS 11.09 (PT:n välittämä): juoksupelin peruskorjaus KK:lla; v133 ja uusintaleivonta (sali + F2) loppuun; ei uusia juoksupelin ominaisuuksia ilman KK:n määrittelyä.

## TEHTY: TAUSTA-V133 (KK hyväksyi 11.38, PT kuittasi 11.4x, SHA256SUMS OK)
Paketti /Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-kk-lavastaja-tausta-v133-vienti-20261111 (100 tiedostoa, 23 eroaa v132:sta,
SHA256SUMS 986569ed7bc9, muuri/v133/paketoi.zsh, LAHTEET.md). PK vie ensin (TaustaKansio + kulkukartta/esto M1, E4; viesti PK:lle 11.4x lähetetty),
sitten JU. ÄLÄ PAKETOI UUDELLEEN. Kun JU ilmoittaa junasha:n, välitä se PK:lle (kulkukartta + esto).
Viimeiset korjaukset (muuri/m1/): tee_a3 (a22 = 3-1 rakennukset.028 V4_kujakivi_sokkeli_yla, 1 kolmio 13 m2), tee_a20 (1-3 marmoriviuhka 2),
tee_f1 (1-3 ikkunapiikit 4). Parit pari-a3-*.jpg. Jonossa (ei v133): a41 kulmaläppä (seinä/sokkeli y 0,32 kulmassa 121,5;204,75),
a22 kujan suun lattian vino sauma (KK: yhtenäisen lattian työ), ik-2-3 harjasauma, F3 (kamera ei löydä kohdetta, PK:lta paikka).

## KESKEN: UUSINTALEIVONTA (PT ok 11.4x). Kohdelista leivonta-216/SOPIMUS.md loppu ("UUSINTALEIVONTA 11.11. – KOHDELISTA")
TEHTY: kielletty-rakennukset/tyokalut/puuvarjo.py (EI gitissä; alkuperäiset leipojat muuri/apu-20261111/ennen-puut/):
- lisaa_puut(xmin,xmax,zmin,zmax): PUUT_VARJ=<kielletty-lahipuut-v17> -> 3 lajia (idantuija, kiinankataja, pagodipuu) yhdeksi verkoksi kukin,
  puut.json ilmentyminä (sijainti (x,-z,0), Z-kierto +kierto_deg, skaala korkeus/mallin korkeus = Lahipuut.cs), PUUT_VARA 25 m, visible_camera pois.
  Pois: reittikerros.json puut_pois (65) + valinnainen PUUT_POIS. PK 11.5x: julkaisussa VapaaMaailma = true -> kaistarunkoja EI poisteta
  (leivonta-216/uusinta/puut-kaistoilta-pois-v17.json = tyhjä).
- kortit_varjottomiksi(obj): V4_puukortti-kasvot < KORTTI_RAJA 3 m 3D-puusta -> materiaalikopio (Is Shadow Ray -> Transparent); palauta() ennen vientiä.
- Kytketty: leivo_valo.py (kohteen rajat, kortit [kohde]+naapurit, palauta() ennen vientiä, varjostajat.json: puut_varj/puita), leivo_malli.py
  (kohteiden rajat, kortit vain varjostajille), leivo_osasarja.py (ruutu kerrallaan, lajit välimuistissa). Kaikki ast-tarkistettu.
- KOE (vain leivo_valo): 2-3 512 px / 16 näytettä, puilla 334 puuta + 372 korttikasvoa, vienti ilman _eivarjo-materiaaleja; vertailu ilman puita:
  muuri/apu-20261111/puukoe/koe-vertailu.png (ei | puut | ero): lattiasaarella LÄIKIKÄS lehvästövarjo (KK ehto 4 täyttyy), keski 0,173 -> 0,159.
  leivo_malli/leivo_osasarja: koeajamatta -> aja yksi malli (esim. t-portti-m15) ja yksi osasarjaruutu pienillä arvoilla ennen junaa.
SEURAAVAKSI:
1. leivonta-216/uusinta/leivonta-v5.zsh leivonta-v4.zsh:n pohjalta (jatkettava valmiit/-merkein, yksi Blender kerrallaan nice 10, levyraja 70 GiB):
   lähteet tausta-v133 (_valmiit v133), rakennukset-v127, muurikate-v40, osasarja-v15, avoimet-v52, lahipuut-v17 (PUUT_VARJ kaikkiin vaiheisiin),
   aurinko leivonta-aurinko-f4df529a6.json (AZ 39.97, EL 45; aja_leivonta_osasarja.zsh:n oletus d420087dc on VANHA -> AURINKO_JSON aina).
   v4:n arvot: tausta 128 näytettä 2048, rakennukset 256/1024 SOLU_LIMA 0,003, osasarja 96, TAIVAS 1,8, TAIVAS_VARI 0.45,0.46,0.50, polvi 0,6/0,3,
   glb_alfa_mask.py V4_puukortti viennin jälkeen. Edellinen kesti ~10,5 h (LAHTEET-leivonta-v4.md, ajo-leivonta-v4.log).
2. F2 t-portti-m15: tarkista kiertosuunta/normaalit (KORJAUS.md r. 444: 4 t-portti-* nurin) ennen leivontaa; pari KK:lle kamera -92.5 2.4 -8.3 180 8 60.
3. SALI: avoimet-v52/juhlasali.glb omassa kehyksessä, aurinko korkeus 45°, atsimuutti 70° salin kehyksessä (0° = glb −Z, 90° = glb +X;
   kohti = (pohjoinen·cos70 + itä·sin70)·cos45 + ylös·sin45, ValoKohteet.cs r. 260 / Valopohja.SaliAurinko); katto + palkisto varjostajiksi, ei valojuovia
   (NS piirtää). Oma valokartta; työkalu puuttuu (leivo_malli.py:n muunnos: kohde avoimet-glb ilman sijoitusta, AZ/EL salin kehyksestä Blenderiin).
4. Parit suoraan KK:lle (myös ik-1-3 haaleat suorakaiteet, F2); NS tekee puun lähikuvaparin. Muisti ASTC 4×4 ~1,4 Mt/kartta (NS).
5. Leivonta-ajo pitkä -> Monitorilla, ei hiljaisella tunnilla; JU:n vuorot huomioiden (GPU).

## Muuta
Työlista: 'Juoksupeli: puuttuvat seinät ja rakenteet' ja 'Juoksupeli: kaikki varjot leivottuina...' tilanne päivitetty 11.4x (tyolista.py).
Asemataulu jäädytetty (ei päivitetä). Hylätty: muuri/apu-20261111/tee_ikkuna2-hylatty.py (yleissääntö piikeille osui 1267–5084 kolmioon).
Worktreet ennallaan + wt/lavastaja-luovutus-1145.
