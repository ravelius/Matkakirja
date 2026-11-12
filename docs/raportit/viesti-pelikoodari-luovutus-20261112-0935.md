# Pelikoodari: luovutus 12.11.2026 klo 09.35 (Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0912.md (d6ec35bce). Sen kohta 1 (kameralaite) on käyty läpi alla, kohta 2 (B1) ennallaan.

## 1. ENSIMMÄINEN TYÖ: PisteKaarella-hyppy (KK 12.11. 09.30, oma commit ja oma junasana)
KK:n päätös: tehtävänannon VIIMEINEN osio (12.11. klo 09.30) tiedostossa
/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md. LUE.
- Koodi: KESKENERÄINEN 8a4c42fd7 (natiivi-backup kameralaite/pala-2, wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite).
  Muutos on vain JuoksuV4.PisteKaarella (noin 20 riviä), EI KÄÄNNETTY, EI TESTATTU.
- Ajatus:
  - Paikan tapa (kaari vai suora + häivytys) valitaan vain osan ja edellisen osan perusteella. Ennen se riippui myös
    ProfiilinLahella(s):stä, joka katkaisi kaaren kesken ja aiheutti 1–5 m:n hypyn.
  - Ilman kaarta (profiili, suoraan, paluu, r < 0,05) osan alun ero p0 − OsanPiste(o,0) häivytetään smoothstepillä 2r:n matkalla.
    Ero sisältää myös Y:n eli profiilin korkeuden.
  - Profiilin lähellä vain suunta tulee jänteestä.
- Lähde ja arvio: TULOS-paatokset-0927.md kohta 5 (Sonnet-koodiluenta).
  - Riski: Lahin() ja vartijat käyttävät OsanPistettä.
  - Avoin: Sivun hypyt säännön kaistanvaihdossa.
  - Lyhyt l (r < 0,05) voi yhä hypätä.
- Näyttö KK:lle:
  - yli 0,25 m:n hypyt 586 → 0 (laskuri: toiston (a)-ikkunoiden määrä 436 on lähes sama; lisää suora laskuri)
  - Peli-testit ja Linssit läpi
  - kaksi käännöstä ennen ja jälkeen Mac-ajosta (JU)
- Sitten oma haara junan päälle: julkaisija/juna-224 + cherry-pick, oma junasana KK:lta.
- SITTEN kamera: toisto uudelleen samalla jaolla (MITTAUS=c3 C3_RIVI=2 sh Linssit-testit/kameratoisto.sh C3Mittaus).
  - (a)-ikkunaa EI laajenneta, ja leikkauksen jälkeiset rikkeet ovat kameran vikoja.
  - Lattia 3,3 / 3,6: yksi taulukko molemmilla lattioilla ja pisimmän peiton kasvun (0,55 → 0,84 s) selitys (dTavLattiaVara 0,3 / 0,6).
  - Jos molemmat ehdot eivät täyty, pelaajalle näkyvä peitto voittaa.

## 2. KAMERALAITE PALA 2: tilanne (natiivi-backup kameralaite/pala-2)
- 9307a37cb (KK 09.27 kohta 1): Seurantaohjaaja.Askel(…, uskottavaVauhti).
  - Alaraja SyoteVaakaMin 1 m/s (KK hyväksyi), NaN = vakio 14,06.
  - JuoksuV4Saanto.KameraUskottavaVauhti = 1,25 × Nopeus. JuoksuV4Maailma ja toisto välittävät arvon.
- b970e598e: C3Mittaus jakaa tuloksen osiin (a) ja (b) sekä tulostaa kolme pahinta (a)-ikkunaa.
  - Ahdas 0,15: (a) L 60 / (b) L 58 askelta.
  - (b):n huiput 60,9 / 927 / 349, joten kytkin pois -ehto ei täyty.
- 7f4f74af2: C3Sarja tulostaa D_tav:n ja ahtauden. T14-toiston syy: TULOS-t14-toisto-0920.md.
  - Suora väli käännöksessä on 2,93 m < 3,3. Vara 0,6 vie läpi, mutta pisin peitto on 0,84 s.
  - T14 kaatuu yhä uudella rajalla (1,34 / 1,32).
- Raportit: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-t14-toisto-0920.md ja TULOS-paatokset-0927.md.

## 3. TAUSTA v133d (LAV 09.2x, KK:n junasana 09.24): EI VIELÄ JUNAAN
- Commit: natiivi-backup pelikoodari/tausta-v133d @ b16fc5818 (juna-224 + TaustaKansio v133d + kulkukartta/esto, wt /Users/Shared/Claude/wt/proto-pelikoodari-v133d).
- Ajo:
  - Loki: proto-3d/_tyo/pelikoodari/kulkukartta/v133d.log.
  - Osasarja v15 vietiin uudelleen: v133d-ajo/osasarja-v15.bin (vanha v129-kansio oli poistunut levyltä).
  - Kulku +6 m², ero 55 m², esineet arvottu uudelleen.
- Peli-testit 930/931. KAATUU LinjatOikeallaKartalla:
  - siemen 1, osa 26 → 27: osan B (67,92; 551,03) → seuraavan A (74,12; 551,03), 6,2 m sivulle (raja 1,87), leveys 8
  - pohjassa (b1-wt) 0/7 ajelehtii
  - Selvitä, ennen kuin LAV tai JU saa junasanan: muuttiko kulkukartta reitin rakennetta tässä kohdassa vai onko kyse botin uudesta polusta?
- LAV:lle ei ole vielä vastattu tämän luovutuksen jälkeen. Kerro LAV:lle tulos, kun selvitys on valmis.

## 4. B1 (botti maali) ennallaan: natiivi-backup pelikoodari/seinat-taso1-v133c @ a405aeb07, odottaa KK:n junasanaa.

Ei agentteja käynnissä. Ei uusia lupia. Työkopiot: proto-pelikoodari-kameralaite, -v133d ja -b1 (/Users/Shared/Claude/wt).
