# Pelikoodari: luovutus 10.11.2026 klo 01.15

Korvaa kaikki aiemmat. Edellinen: `git show 9f0dafcc6:docs/raportit/viesti-pelikoodari-luovutus-20261110-0025.md` (kaikki sen kohdat hoidettu tai alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu,
haara pelikoodari/juoksu-leivottu = 33bb82d0a (remote natiivi-backup; pohja juna 224 b804a87d6). Python-työkalut ilman -I:tä (numpy käyttäjän site-packagesissa).
Suunnitelma ja ehdot: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksu-leivottu/SUUNNITELMA-vaihe2.md (lue ensin).

## TEHTY TÄSSÄ VUOROSSA
- Vaihe 2 kohta 1 (PT hyväksyi suunnitelman 00.5x): lohkoajat fa45864cc → "latauksen ositus lohkot N: nimi s/ruudut" (sokkelo, palatsi, verkko,
  tausta+avoimet, osamallit, lähipuut, c2, LOD2/1/0, kaukopuut, muurikate, osasarja, kaiteet, c1, ulkorengas, kopiot+lepo, kulkukartta,
  valmiin jälkeen, GC). Ei ulkoasumuutosta.
- PT/KK 01.1x junan ehto 1 PAKETTI PALVELIMELTA: c1825a156 (JuoksuLeivottu.Palvelin = media…/juoksupeli/leivottu-v1/, hakemisto haetaan
  ensimmäisellä Hae-kutsulla levyvälimuistiin, glb:n url vaihdetaan, MKAV-kuvat levylle ennen glb:tä; Rakennus vie paketin buildiin vain
  MATKAKIRJA_JUOKSU_LEIVOTTU=1). 33bb82d0a: QA "ui juoksupeli palatsi valimuisti tyhjenna" + raporttiin "verkosta yhteensä N tiedostoa X Mt".
  JU vei ämpäriin 01.09 (1055 objektia, CDN-otanta OK, loki /Users/Shared/Claude/julkaisija-tyokalut/vienti-leivottu-v1.log).
  Ensilataus Mt: nyt 1509 (alkuperäiset glb:t) → leivottu 1181 (−22 %). PT:lle kerrottu.
- Ehto 2 iPhone: PT/KK 01.2x (Raamattu 9.11) omistajan iPhonea ei käytetä, muuta ei ole → raporttiin "iPhone mittaamatta, laite puuttuu".
- Kulkuajo iPad cf4d34ee4 (JU 01.12): tarkista_kulku TULOS OK, Taso läpi 1696 m 4:00 2196 p; rikotut-rivi todistamatta (rikottuja 0).
  PT:lle rivi (jonossa). Työlistan tilanteet päivitetty (tason 1 kulkualue; lataus nopeammaksi).

## LISÄYS 01.4x (PT 01.3x: tuloskortin viat ENSIN ennen vaihetta 2)
- Valkoinen keisari = leivonnan vika: JuoksuHahmot.Materiaali luki kuvan LoadImagella (ei lue ASTC:tä). Korjattu c378cd773 (JuoksuLeivottu.Pura)
  + korttipuiden atlasvalinta (Lahipuut.KirjaaKorttiKuva vertasi MKAV-viitteiden pituuksia → JuoksuLeivottu.KuvaKoko). Haaran kärki nyt c378cd773.
- Piikki (oikealla venynyt kolmio) auki: JU kääntää c378cd773 ja ajaa järjestyksessä sk-ipad-kylma-0, -kylma-1, -piikki-0, -piikki-1
  → lokit/pelikoodari-kylma-0/-1, lokit/pelikoodari-piikki-0/-1 (kuvat piikki{0,1}-a-pelikamera, -b-laaja). Kokoa pari PT:lle (vasen 0, oikea 1).
  Piikki vain 1:ssä → leivonnan vika, korjaa ennen kuittausta (vertaa glb lähde vs paketti: verkko/accessorit). Molemmissa → vanha: kirjaa ja
  kerro PT:lle kenen (LAV mallit / PK peli). Tarkista myös keisari kuvioituna piikki1-a:ssa.

- 01.5x: pari-0 (JU 01.17) KUVIA 0: komennot eivät menneet laitteelle latauksen jälkeen (CoreDeviceError 7000 komento.txt). Pari-skenaarioihin
  odota 15 ohjauksen siirron jälkeen (oli 1; kulussa 30); JU uusii pari-0 (ja pari-1, jos tyhjä). Toistuva 7000 = laitekopion vika, ei skenaarion.

- 02.0x: 7000-SYY = MUISTIVAHTI: pari-0 konsoli r. 2589 "VIKA muisti 4199 ≥ 4080 Mt" → MuistiVahti.PysaytaKomennot poistaa komentotiedostot
  lukematta. Leivottu POIS -lataus huippu ~4,2–4,3 Gt, päällä ~2,7 Gt. 0-puolen ajot (pari-0, piikki-0) eivät saa kuvia iPadilla; kylma-0:n
  latausrivit ehtivät. PT:lle päätös: (a) VIKA-rajan QA-ohitus vertailuajoihin (suositus) tai (b) 0-puoli Macin esikatselusta. Odota PT:n vastausta.

## JONO
1. KUVAPARI (ennen leivotun kuittausta): JU ajaa sk-ipad-pari-0/-1 cf4d34ee4:llä (jonossa "IK") → lokit/pelikoodari-pari-0 / -1, 4 kuvaa (a alku,
   b kujan pää, c tarkastelukamera kujalla, d sisäpiha). Kokoa parit (vasen 0, oikea 1, sama rajaus, täysikokoiset) PT:lle. Katso samalla
   kulku-tuloskortin huomiot: oikealla venynyt kolmiopiikki (lattian/kaiteen reuna) ja keisari valkoisena tuloskortin alla – uusi vai vanha?
2. ENSILATAUS SEKUNNIT: JU kääntää 33bb82d0a ja ajaa sk-ipad-kylma-0.txt → lokit/pelikoodari-kylma-0, sk-ipad-kylma-1.txt → lokit/pelikoodari-kylma-1
   (juoksu-leivottu-kansio). Lue "latauksen ositus" (s) ja "leivottu lataus … verkosta yhteensä N tiedostoa X Mt". Tarkista kylma-1:ssä
   "leivottu paketti palvelimelta 1054 tiedostoa" ja ei "leivottu kuva … " -varoituksia. Rivi KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a)
   ja PT:lle: iPad ensilataus ennen/jälkeen Mt ja s + lämmin lataus 21,1 → 14,6 s + "iPhone mittaamatta, laite puuttuu". Ei simulaattorilukuja.
3. LOHKOAJAT: JU ajaa sk-ipad-leivottu-1.txt fa45864cc:llä (jonossa "IL") → lokit/pelikoodari-lohkot-1. Lue "latauksen ositus lohkot" -rivit
   → valitse vaihe 2:n leivottavat verkot suurimmista lohkoista (suunnitelma kohta 2: valmiit verkot avaimella, verkkosummat + kuvapari ennen
   kuittausta). Ehdokas: RakennaSolmut-laskenta (JuoksuV4Maailma.cs ~655, kärkimuunnokset ja ryhmittely) taustasäikeeseen, pääsäikeelle vain
   Mesh-luonti. Huom. lohkot-1-käännöksessä paketti oli buildissa (vanha oletus), joten se mittaa lämpimän leivotun.
4. LAV tekee uuden lattian + valon (omistaja 22.56): kun LAV ilmoittaa → `python3 tyokalut/juoksu-leivonta.py tyokalut/juoksu-leivonta-lista.txt`
   työpuussa UUTEEN kansioon paketti-v2 (+ Palvelin leivottu-v2, SHA256SUMS, vienti-skripti kuten vienti-leivottu-v1.zsh). Ämpärin v1 on
   muuttumaton (immutable-välimuisti). ÄLÄ muokkaa lattian geometriaa tai valoa.
5. JUNAAN vasta PT:n kuittauksella (kuvapari + sekunnit): JU poimii pelikoodari/juoksu-leivottu junaan.

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh; ei kata Editor-kansiota). Laitteet: devicectl – iso iPad yhteydessä, iPhone 17 Pro ja iPad Pro 11 omistajan.
