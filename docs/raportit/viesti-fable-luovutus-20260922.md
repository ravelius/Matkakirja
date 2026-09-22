# Fablen luovutus 22.9.2026 klo 12.10 (Mac-käyttäjä koodaus, sessio 21.9. klo 17 → 22.9. klo 12)

Edellinen luovutus: viesti-fable-luovutus-20260921-ilta.md. Kaikki päätökset ovat
lokissa docs/raamattu-loki/paatokset-2026-09.md (21.9. klo 16.59 → 22.9. klo 12.00,
~90 otsikkoa). Raamattua muutettiin: KONTEKSTIN NOLLAUS (Fable nollaa sessiot itse,
sitova kaava; Fablen oma nollaus Postivahdin kautta, raja 65 %), REMOTE CONTROL,
B) TYÖTILAT (rooli-worktreet roolin nimellä), LINSSIEN SUUNTA (3D-tilat, lajittelu
maanosittain), TYÖTAPA-kohdan tarkennukset.

## Ympäristö ja sessiot
- Sessiot: Fable, Julkaisija, Karttaseppä, Pelikoodari, Sisältökirjuri, Laitetestaaja,
  Postivahti (10 min loop: posti + kontekstit, ilmoittaa 70 %). Session id:t muistiossa
  session-nollaus-automaattinen.md. Nollauskaava: RC pois → send_message "clear_session
  self" → 60–70 s → send_message aloitusviesti (+ change_directory-rivi) → RC päälle.
- Worktreet roolinimillä /Users/samireivinen/Matkakirja-{julkaisija,pelikoodari,karttaseppa,
  sisaltokirjuri}; Laitetestaaja (Matkakirja-sonnet) ja Postivahti (koodaus/Matkakirja-posti)
  siirretään seuraavassa nollauksessa. Vanhat polut symlinkkejä. Karttasepän worktree katosi
  kahdesti (aina kun sen checkout-haara mergettiin); syy tuntematon (ei Julkaisija, ei app);
  sääntö: rooli-worktree pysyy haarassa jota ei mergetä, väliaikaiset /Users/koodaus/.
- Omistaja antoi koodaukselle ACL:n kotihakemistoonsa ja Käytettävyys-luvan (osascript
  GUI-skriptaus toimii: Safarin Kehitys-valikko). Computer-use ei ole käytössä.
- iPhone (iOS 27.0) on USB:ssä ja parina, mutta Safari 26.6.2:n Web Inspector ei näe sitä
  (versioero) → omistajalle ehdotettu Safari Technology Preview; skripti valmis:
  Kehitys → Samin iPhone → sivu → Timelines → nauhoitus → Export Työpöydälle.

## Tuotanto: v2082 (22.9. klo 11.20)
Yön ja aamun saldo: GL-nimiöt/nostot/nappula oletuksena, uusi pohja 2026-09-22 (isobaatit,
merikoristeet), nimiötaso g (maakunnat FRA/DEU/ITA/ESP/GBR/POL/AUT/CHE), laattakatto,
zoomiennakko, pyyntötahditus, liikevara, MARSEILLE-välkkyminen, nimiön koko, tyyppimerkit,
hehkupiste (Julkaisijalla), turva-alue, nappulan väri, nostotasot koko Eurooppaan (36 maata),
maakuntaluonnehdinnat 97 (lyhyt/pitkä/kuva/pulu; kuvat R2:een kesken), kartuschat
BIH/UKR/RUS/ISL, kohtaamiset C1 mainissa, C2–C4 Julkaisijalla, pelikaupungit CYP/LUX/MLT,
pienoismallit 97 (Codex PR), linssikatalogi maanosittain (Julkaisijalla), maakuntavektorit M0+M1.

## SULAVUUS = YKKÖSPRIORITEETTI (omistaja: panorointi nykii yhä, zoomi ok sisämaassa)
- Mitattu iPhonella: panorointi p95 ok liikevaran jälkeen; Ranska z6 zoomi p95 ~50 → 80
  kuormassa (zoomi-piirto v2078); jäljellä 16–26 ms renderöintiä (ei skripti).
- Työn alla Pelikoodari: a) kerma, sumu ja kohdemaan reikä laatan materiaalin SHADERIIN
  (maskitekstuuri; poistaa hunnun välähdyksen ja pääsäikeen laattatyön; vaihe 2 pohjapallo);
  b) tasaisuusmittari (synteettinen vakionopeusveto, siirtymä/kehys, varianssi) ja deltojen
  soveltaminen rAF:iin (OrbitControls soveltaa tapahtumakohtaisesti); c) esilatauksen
  suunnitelma (yksi jono SW-välimuistiin, ei mobiilibudjettia); d) karttaselitepaneelin
  uudistus Sonnet-parvella (tyyppimerkit, järjestys, Kaikki/Ei mitään, liukusäädin, välilehdet
  Nostot|Maakunnat, maakunnan selite + plus → pop-up, ihmeiden laskurivika).
- Karttaseppä: esilataus levossa (z+1 näkymän ympäriltä + kohdemaa z6–z8 SW-välimuistiin;
  laske Ranskan laattamäärä ensin), merilaattojen tavukoko/pakkaus, z7→z8-kynnys merellä;
  isobaatit vektoritasoon = omistajan päätös sulavuuden jälkeen (viikon työ).
- Laitetestaaja: xctrace Time Profiler simulaattorin WebContent-prosessista (omassa
  mittausikkunassa; Julkaisija ei aja savukkeita ikkunan aikana). dpr 3→2 zoomin ajaksi
  kysytään omistajalta vain jos muu ei riitä. Sulavuuden kuittaus = omistajan tuntumatesti.

## Omistajan odottamat / kortit
- Tuntumatesti aina uuden version jälkeen (Safari Technology Preview -asennus omistajalla).
- Karttaselitepaneelin kaappaukset (parvi) → omistajalle ennen Julkaisijaa.
- Isobaatit vektoritasoon (viikko) — kortti sulavuuden jälkeen.
- Linssit: Maapallon voimat -perhe (El Niño ensin), lajittelu maanosittain tehty, 3D-tilat
  apurahassa; uudet linssit vasta sulavuuden jälkeen.

## Codex (postilaatikko claude/postilaatikko, toimitus PR:nä)
Odottaa: monumentit 81 (tilaukset 5–7), pienoismallit 7 + 18, kohtaamiskuvat C1/C2/C3
(tilaukset 8, 9, 11; C4 tulossa), maakuntien havainnekuvat 97 (tilaus 10). Toimitettu: linssi-
ikonit 47, merikoristeet, nostotyyppimerkit, pienoismallit 97 (#2669). Sähke-token: omistaja
uusii myöhemmin, Julkaisija ei aja sahke-worker.yml:ää ennen Fablen ilmoitusta.

## Sisältökirjuri
Kohtaamiset C4 dataan + kuvatilaus c4 → Fable tilaa Codexilta (tilaus 12); C5–C7 kunnes 41
Euroopan kaupunkia katettu (vain Eurooppa). Sitten: Codex-toimitusten otostarkistus.

## Uuden Fable-session ensimmäiset askeleet
1. Lue tämä, Raamatun kohta 2 (KONTEKSTIN NOLLAUS, FABLEN OMA NOLLAUS), lokin viimeiset 12
   otsikkoa. ListAgents. Remote Control self päälle.
2. Sulavuus ennen kaikkea: odota Pelikoodarin kerma-shader ja tasaisuusmittari, Karttasepän
   esilataus, Laitetestaajan xctrace; kysy omistajalta STP-asennus ja tuntumatesti.
3. Kirjaa kaikki lokiin; kortit vain aidoille päätöksille.

## Lisäys klo 12.25 (juuri ennen nollausta)
- Safari Technology Preview asennettu; sen kehittäjäominaisuudet kytketty GUI-skriptillä.
  Sekä Safari että STP näyttävät puhelimelle "Connecting…" → vika on puhelimen puolella
  (lukitus, Web Inspector -kytkin, Developer Mode tai luottamus). Skripti tallessa:
  tools/mac/safari-kehitys-iphone.applescript. Kun puhelin näkyy, jatko: Develop →
  Samin iPhone → sivu → Web Inspector → Timelines → nauhoitus → Export → Työpöytä →
  Laitetestaaja analysoi.
- Laitetestaaja: xctrace ei toimi ilman Developer Tools -lupaa (Järjestelmäasetukset →
  Tietosuoja ja suojaus → Kehittäjätyökalut → Claude/Terminal) — pyydä omistajalta.
- Julkaisija 73 %: luovutus pyydetty (viesti-julkaisija-luovutus-20260922.md); uusi Fable
  ajaa nollauskaavan (RC pois → clear self → aloitusviesti → RC päälle) ja siirtää
  worktreen jos tarpeen (jo Matkakirja-julkaisija). Aloitusviestiin: merge vihreänä ilman
  --admin, ei worktree-poistoja, mittausikkunat, jono: kohtaamiset c2/c3/c4 (sama tiedosto),
  hehkupiste, linssikatalogi, maakuntien kuvavienti R2, Codex-PR:t.
