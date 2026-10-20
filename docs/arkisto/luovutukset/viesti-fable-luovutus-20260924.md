# Fablen luovutus 24.9.2026 klo 02.5x (tili B, sessio 23.9. klo 17.41 → 24.9. klo 02.5x)

Edellinen: viesti-fable-luovutus-20260923-b.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md
klo 17.42 → 02.49 (~150 otsikkoa). Raamattuun lisätty/päivitetty tänä sessiona: NATIIVI PELI ETUSIJALLE
(VAIN AJANTASAISTA JA VAIN NATIIVIA; TÄYSI TOIMINTOPARITEETTI; EI WEBISSÄ → KYSY; NATIIVIN ALOITUSKAAVA; LENNON
ESITYS; VARMENTEET JA PROFIILIT; offline maanosittain; radio myös natiiviin), TYÖTAPA (FABLEN KÄSKYT ILMAN
OMISTAJAN VÄLITYSTÄ), Pelin kulku (aloituskaupungit 19, kulkutavat, peninkulmalinssin tarkennus), aurinko
Aurinko.cs:llä, dokumenttikartalle huipennus-teksti.md. Muistiot päivitetty: session-nollaus-automaattinen
(RC-vaiheet turhia), omistajan-apple-tunnukset (me.com), vihreat-prt-ilman-korttia (ei kumileimasinta).

## Omistajan linjaukset tänä sessiona (sitovat)
1. Koko peli natiiviin, vain ajantasaista kaanonia, ei kuorta vanhasta pelistä (WKWebView pois → lehdet
   natiivisti UITK:lla); kaikki webin nykyiset toiminnot ja napit kopioidaan (myös radio); kehittäjäsäätimet
   vain kehittäjätilassa. Jos jotain ei ole webissä → kortti omistajalle, ilman vastausta ei tehdä
   (poikkeuksina hyväksytty peninkulmalinssi ja huipennus; aloituskaupunki kortilla hylätty).
2. Aloituskaava: valinta pallolta (19 kaupunkia, ei vahvistuskorttia) → kamera Lontooseen → DC-3 lentää
   valittuun kaupunkiin, koneen ääni + intro-luento lennon aikana. Lennon esitys kaikissa lennoissa: kamera
   yläviistosta, vaiheet, puoliorbitti laskussa, pilvisumu, aurinko pelin kellon mukaan, savujana.
3. Radio hybridinä: sallittu ja epäselvä soivat, kielletyt (16 yleisradiota) korvattu (17 asemaa,
   docs/raportit/radio-korvaavat-asemat-20260923.md), kiellettyjen linkkirivit pois; lupakirje FI/EN ja
   Teosto/Gramex-muistio valmiina, ei lähetetä ilman omistajaa; 8 poliittista riskiasemaa kuten webissä.
4. Apurahan arvioijat (TestFlight-julkinen linkki + web) näkevät natiivin, kun omistaja hyväksyy kortilla;
   siihen asti natiivibuildit vain sisäiseen ryhmään. Paid Apps -sopimus vasta ~viikko ennen maksullista
   julkaisua; App Privacy -selosteet omistajan käsityö.
5. Omistajalle vain aidot kysymykset (ei kumileimasinta); Fable käskee sessioita suoraan. Bypass-tila ei
   käy (rikkoo vertaisviestit); auto + sallintalista. Tokeneita riittää, 5 h -kiintiö rajoittaa: Postivahti
   raportoi ja hälyttää 80/90 %, Fable pysäyttää 90 %:ssa (tehty kahdesti: 21.05 ja 01.47).
6. Julkaisija vaihdettu Opukseen (effort high) TestFlight-putken ajaksi (löysi juurisyyn: avainnipun nimi
   "iPhone Distribution" vs "Apple Distribution"); takaisin Sonnetiin kun nightly ajaa itsestään.
7. Bergenin ja Sevillan julisteet kuvaputkella (tehty, R2:ssa); julistevienti Mac-ajurille.
8. Offline-lataus vain maanosittain tai Kaikki. Tarkistuslista omistajalle: omistajan-testflight-lista-20260924.md.
9. macOS/Windows/Android: arviot lokissa, iOS ensin; 3D-maailmat: Blender-GLB ämpäristä, CC0/CC-BY, koe
   kolosseumista kun omistaja on studiolla.

## Natiivin tila (proto-master ~30fe586+, kaikki yön erät masterissa)
- TestFlight: build 4 = 1.0.0 (202609232339), proto 7706efd, ladattu 02.4x; sisäinen ryhmä PR #3009;
  omistaja (me.com) on ASC-käyttäjä ja sisäinen testaaja. Build 2 (202609231658) myös TestFlightissa.
  ASC:ssä 2 aktiivista iOS Distributionia (toinen ylimääräinen, omistaja voi perua). Putki: pysyvä
  avainnippu, SHA-1-tunnistus, ei perumista (PR #3008). Avainnippulapun syy korjattu (oletusnippu).
- Ajantasaisuustarkastus docs/raportit/natiivi-ajantasaisuus-20260923.md: A-lista tehty (kaksintaistelu,
  botti, Tutki, tähti, WKWebView, tapahtumakortit pois), B-lista lähes tehty (lehdet, nostokortit, aarrepiste,
  paljastus, sähke/retkikunta, radio, B7 äänet, linssien hankinta, peninkulma, 1873 erä 1, pieni liike,
  passi, liftausanimaatio, maakunnat). Avoinna: pulun eleiden ajoitus (B11), 1873 erä 2 (odottaa omistajaa).
- Nappi-inventaario docs/raportit/nappi-inventaario-natiivi-20260923.md: ~33/71 tehty.
- Sisältöpaketti: skeema 1.25, koepaketti v32; ämpärin osoitin v11 (1.10, vajaa); osoitinvartija #2975 ja
  skeemasopimus (tunnuskentät + tiiviste) valmiina; ketju 1.17–1.25 odottaa #2984:n mergeä.
- Maasto: maailma GLO-90 tuotettu (11,8 Gt), vienti ämpäriin käynnissä (Karttaseppä ilmoittaa); syvä Ranska
  odottaa #2957.
- Kuulokoe (B7 erä 6) Laitetestaajalla heti nollauksen jälkeen.

## Web
- v2150 tuotannossa (nippu 2 ja 3 mainissa). PR-jono Julkaisijalla: #2984, Siirtosepän ketju, #2991 #2996
  #3000 #3002 #3004 #3006 (sisältö), #2999, #2997 (sähke+pulla-korjaukset), #2985, #2990, #2982, #2957,
  #2950, #2962, #2970, #2989.

## Sessiot (10) ja id:t
Julkaisija (Opus) local_9922c4b6, Natiiviseppä local_860f922b, Pelikoodari local_7b5a6c65, Natiivi-UI
local_9ed5a7df, Linssiseppä local_3273f209, Siirtoseppä local_7a1255c5, Karttaseppä local_445a5c7b,
Sisältökirjuri local_e5685e4a, Laitetestaaja local_992b689f, Postivahti local_6f3d4c35. Fable local_742d1717.
Nollauskaava: luovutus → send_message "clear_session self" → 75 s → aloitusviesti (RC-vaiheet pois).
Kaikki paitsi Karttaseppä nollattu tänä yönä; aloitusviestit docs/raportit/viesti-<rooli>-aloitus.md.

## Jono uudelle Fablelle
1. Julkaisijan ilmoitus: build 4 sisäisessä ryhmässä → varmista että omistaja näkee päivityksen aamulla.
2. Kuulokokeen tulos (Laitetestaaja) → Pelikoodarille korjaukset.
3. #2984 mainiin → Siirtosepän ketju → CI-paketti → osoitin nousee (natiivin puuttuvat kentät korjaantuvat).
4. Omistajan aamun iPad-kokeilu (tarkistuslista) → korjauslista sessioille; sen jälkeen päätös julkisen
   TestFlight-ryhmän ensimmäisestä natiivibuildista (kortti).
5. Julkaisija takaisin Sonnetiin kun nightly on ajanut kerran; putken raportti natiivi-testflight-putki-20260924.md.
6. Sallintalistan täydennys: listaa yön luokitinestot (revoke-koodin commit, credential exploration) ja ehdota
   omistajalle rivit; ei bypassia.
7. Tänään avoimet omistajan kortit tarvittaessa: ylimääräisen iOS Distribution -varmenteen peruminen
   portaalissa (ei kiire), App Privacy -selosteet, Paid Apps myöhemmin.
