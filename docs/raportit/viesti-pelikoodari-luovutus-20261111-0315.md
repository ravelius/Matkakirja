# Pelikoodari: luovutus 11.11.2026 klo 03.15 (SÄÄSTÖ, viikko 98 %: lepo, ei uusia töitä)

Edellinen: viesti-pelikoodari-luovutus-20261111-0245.md (e31eb39bf). TÄMÄ KORVAA SEN JONON.
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/seinat-taso1, kärki **028ec1d6f**:
3199b079a P1 → d63a93686 lahipuut-v16 → 77128fef8 lahipuut-v17 → b6cceaeb7 portaat kujakiveksi → 028ec1d6f lehti kivijalan päällä.
Mac-ajot käyttävät nyt JU:n välimuistikäärettä (julkaisija-tyokalut/esikatselu-valimuisti.zsh); verkkojumi poistunut (P1 9 min / 2 ajoa).

## TEHTY
- P1 (3199b079a): pari katsottu, KK 03.1x "KELPAA JUNAAN". Pushattu natiivi-backup pelikoodari/p1-kivijalkaovi (juna-224 + 1 commit).
  pt-ok-pyyntö PT:lle lähetetty 03.1x – ODOTTAA PT:N KUITTAUSTA.
- b6cceaeb7 (KK 02.5x LAV:n kautta): koneportaat = kopio V4_kujakivi_sokkeli-materiaalista (ilman leivottua valoa), UV0 kuten LAV:n penger2
  (u 0,5/m, v 0,316 + 0,567 (1,2 − y)). PorrasLaji 0 = kujakivi, QA `ovikoe porraslaji 18` palauttaa. Riski: lähdemallin purku → kuva katoaa (pari näyttää).
- 028ec1d6f (KK 03.1x): avoimen lehden kulma rajattu portaiden alkuun − 5 cm (5 ovea, kivijalka 0,25 m: 吉云楼, 房子21, 小房9, 平房22, 竹香馆).
  敬胜斋:n lehti oli jo kivijalan päällä (kärki 0,40 m, reuna 0,75 m) – vastattu KK:lle.
- Testit 912/912, unity 0 kaikissa.

## JONO JU:LLA (L2, tässä järjestyksessä) – katso kuvat, sitten:
1. v17: seinat-taso1/p2/aja-v17.zsh → kuvat p2-e, p2-i, p2-i-lahi, e3-e, p2-ylla, yleis-p KK:lle (mainitse v16:n +793 puuta + reittikerros), kopio PT:lle;
   KK:n katsottua pt-ok-pyyntö 77128fef8 (sisältää d63a93686).
2. porraskivi: seinat-taso1/porraskivi/aja-porraskivi.zsh (ennen 77128fef8 | jälkeen b6cceaeb7, LAV:n sk-penger2 + koejuuri-penger2).
   unity.log: "ovien portaat kujakiveksi" jälkeen-ajossa. Pari penger-* KK:lle, kopio PT:lle ja LAV:lle.
3. P1B (EI JONOSSA: JU 03.1x säästön takia, ajetaan vasta PT:n luvalla – pyydä PT:ltä säästön jälkeen): seinat-taso1/p1b/aja-p1b.zsh 2 028ec1d6f (ennen b6cceaeb7). e1–e7 = 7 ennalleen jäänyttä ovea (taso 1) → PAHIN YKSI KUVA KK:lle päätettäväksi;
   j1/j2 吉云楼 auki ennen|jälkeen → KK:lle.
Parikuvat: scratchpadin pari.py-tapa (vierekkäin, ≤ 2000 px), itse katsottaessa sips -Z 1000.

## ENNALLAAN
B1 bottijumi (−85; 500), eteläosan kartoitus; isolla iPadilla aukiovideo ja renkaiden uusinta. Penger LAV:lla (penger2 tehty).

## LISÄYS 03.2x: v17 ja porraskivi ajettu (JU 03.15/03.18), katsottu, parit KK:lla (kopio PT, LAV)
- v17: seinat-taso1/p2/v17/pari-*.png, rungot lehdessä, ei vikaa. KK:lta kysytty "kelpaako junaan" → kyllä = pt-ok-pyyntö 77128fef8 PT:lle.
- porraskivi: seinat-taso1/porraskivi/pari-*.png, kuvio = penger, mutta portaat vaaleammat (ei leivottua valoa). Ehdotettu KK:lle tummennus
  (oviPorrasKivi _BaseColor ≈ pengerin leivottu sävy, mittaa kuvasta) + uusi pari säästön jälkeen PT:n luvalla. Odottaa KK:n vastausta.
- 03.20 JU: P1 3199b079a JUNASSA 224 (476ea9d97), linkki 224.55 – P1 VALMIS.
- 06.51 JU: P1B (028ec1d6f) KÄYNNISSÄ L2:lla, JU ilmoittaa "P1B AJETTU" → katso e1–e7 + j1/j2 ja vie KK:lle (kohta 3 yllä).

## LISÄYS 07.0x (säästö purettu)
- v17: KK 06.5x "KELPAA JUNAAN" → pt-ok-pyyntö PT:lle lähetetty (natiivi-backup pelikoodari/lahipuut-v17 = 77128fef8, juna-224 476ea9d97 + 2). ODOTTAA PT:tä.
- Porraskivi: KK 06.5x "tummenna pengerin sävyyn, erityisesti päälliset; sama pari uudelleen, sitten junaan sanallani".
  Tehty 96c6632e4 (päälliset omana alaverkkona 5, kertoimet PorrasYlaKerroin/PorrasKylkiKerroin). JU:n jonossa P1B:n jälkeen:
  seinat-taso1/porraskivi2/aja-porraskivi2.zsh (ennen b6cceaeb7 | jälkeen 96c6632e4) → pari KK:lle; KK:n sanalla pt-ok b6cceaeb7+96c6632e4
  (huom: 028ec1d6f lehtikorjaus on niiden välissä, eli pt-ok koko ketju 96c6632e4 asti, kun P1B-lehtipari on KK:lla OK).
- P1B käynnissä JU:lla (06.51).

## LISÄYS 07.1x – SEURAAVAN PK:N TYÖT (konteksti 26 %, nollaus)
A) TAUSTA v132 (PT 07.0x: "Vaihda TaustaKansio v132:een ja tee junaehdokas", yhdistä porraskiven kanssa). v132 = v129 + v130 (lattia7 + piikki1,
   omistaja 10.11. 08.52 Kelpaa) + v131 (raja3a + paaty1b, PT) + penger2. _valmiit/juoksupeli-kk-lavastaja-tausta-v132-vienti-20261111, SHA256SUMS 48b3d06c3486.
   ALOITETTU JA PERUTTU: pelkkä TaustaKansio-vaihto kaataa testin JuoksuKulkuVersiotTestit (kulkukartta tehty v129:stä) →
   aja `nice -n 15 tyokalut/kulkukartta_ajo.py <ulos> <osasarja.bin> --juuri <juuri jossa v132> --vie` (ohje tiedoston alussa; vaiheet kulkukartta →
   ovi_y → tayte_valo → peli → pinta → rajat → vertailu). Lattia7 muutti lattiat → vertailu näyttää, muuttuuko kulkukartta/ovet (P1:n kivijalkaovet!).
   Tarkista myös että v132 on ämpärissä (media.matkakirja.app/juoksupeli/maailma-v4/kielletty-tausta-v132/) ennen Mac-ajoa ilman koejuurta;
   tyokalut/juoksu-leivonta-lista.txt viittaa v129:ään. Sitten Mac-pari ja pt-ok.
B) LAV 07.0x lattia-v131-kartoitus (_tyo/linnanrakentaja/muuri/lattia-v131/kuvat/, sk: kamera-rivit samassa kansiossa):
   E1 e1-180.png (kamera -85,6 4 296,6 suunta 180): vino harmaa levy + puulattiataso eivät ole LAV:n aineistossa → pelin geometriaa (ovilehti? ramppi?
   koneportaat?). M6 m6-90.png: ruskea tanko = P2-runko (-92,0; 427,1), v17 korjaa; vasemman reunan pystysuora laattakaista ei ole taustassa → pelin puolelta.
   Katso kuvat (sips -Z 1000) ja vertaa pelin omiin verkkoihin (ovet koe, lattiat, LattiaV4); QA `mika` listaa kappaleet.
C) JU:n jonossa: P1B (käynnissä 06.51) ja porraskivi2 (96c6632e4). Porraskivi2:n jälkeen voi tehdä v132+porraskivi yhteisen junaehdokkaan.
