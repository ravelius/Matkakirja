# Laitetestaaja → seuraava sessio: luovutus (24.9.2026 yö, konteksti 72 %)

## 1. PR-tilanne — TÄRKEÄ

PR #3076 (jolla tämä sessio aloitti) mergettiin mainiin jo klo 13.36 UTC
(session alussa), mutta jatkoin pushaamista samalle haaralle
huomaamatta — kaksi committia (4a0930eea, fccad7ec7) jäivät ilman
PR:ää. Avasin niille uuden PR:n **#3126**
(https://github.com/ravelius/Matkakirja/pull/3126), EI VIELÄ mergetty.
**Opetus seuraavalle sessiolle**: tarkista `gh pr view <numero>
--json state,mergedAt` UUDELLEEN aina ennen pushia pitkässä sessiossa,
älä luota session-alun tarkistukseen (sama "Julkaisijan rebase-kilpailu"
-ilmiö kuin muistiossa).

## 2. Mitä tehtiin tänään (pääkohdat, aikajärjestyksessä)

1. **Löydös 26 (Pariisin lähizoomi)**: web mitattu tarkasti (iPhone 40,00
   lautayksikköä, iPad 60,00 — täsmää kamera.js:n kynnyksiin). Natiivi
   PASS, Natiivisepän vahvistama (iPhone/iPad-suhde 1,49 ≈ odotettu
   1,5). Sivulöydös: nimiöt (Reims/Verdun) puuttuvat natiivin
   lähizoomista — reititetty Fablelle/Natiivi-UI:lle omana rivinään.
2. **Avausteksti-portti** (pelikoodari/avausteksti-portti): PASS
   rakenteeltaan molemmilla laitteilla (pallo suoraan valintanäkymään,
   EI Lontoo-zoomia). Pelikoodari korjasi 2 pientä eroa (34a8fa8) —
   `natiivi-avausteksti-valmis-{iphone,ipad}` pitää ottaa uusiksi kun
   uusi testihaara asennetaan.
3. **Noppa-kartalle-vaihe**: PASS, kuvattu onnistuneesti kolmannella
   yrityksellä. Juurisyy aiempiin epäonnistumisiin: `peli:uusi-peli`
   ajettuna liian pian relaunchin jälkeen ennen sisällön latautumista —
   **LUE AINA Documents/peli-loki.txt jos näkymä ei täsmää odotettuun**,
   älä arvaa ajoitusta. Pelikoodari korjasi myös juurisyyn (473270e,
   a47967d masterissa): `uusi-peli` sulkee jatkossa aloitusnäytön itse.
4. **Lennon esilataus (Lontoo→Ateena)**: mitattu ja raportoitu Fablelle.
   **Läpimurto**: `xcrun simctl launch --stdout=<tiedosto>
   --stderr=<tiedosto> <UDID> app.matkakirja.proto3d` (EI
   terminate+launch peräkkäin samassa komennossa) näyttää KOKO Unityn
   Debug.Log-virran. `xcrun simctl spawn <UDID> log show` EI näytä sitä
   ollenkaan tässä ympäristössä. Käytä aina launch-uudelleenohjausta
   jos tarvitset `MATKAKIRJA ...`-lokirivejä.
5. **Ison iPadin b10c-kierros**: käytin iPad Pro 13" -SIMULAATTORIA
   (3B4CDACB, ei Linssisepän/Natiivisepän fyysistä laitetta 00008103…,
   eri App ID). Yläpalkki + tekstitaustat + saapumisnäkymä-bonus
   kuvattu.
6. **Saapumisnäkymä (Ateena/Pariisi/Lontoo)**: 6 kuvapari otettu
   Natiivisepän pyynnöstä, kaikki silmämääräisesti PASS. Pelikoodari/
   liiku-tanne iPad-PASS vahvistettu samalla kierroksella (ei
   listakorttia heiton jälkeen, ei Liiku tänne -riviä omassa
   kaupungissa).
7. **Nappi-inventaario**: 12/31 EI TARKISTETTU -riviä käyty läpi
   (7 komennoilla, 5 oikealla kosketuksella iPhone 18 Pro:lla). 3 riville
   lisätty web-kuvapari+mitat (Vertailulinssi, Laukku+Varusteet,
   Sisällys+"Palaa kartalle" — kaikki SAMA). Korjattu virheellinen
   "Mitä uutta" SAMA→ERI (natiivi näyttää TÄYDEN muutoslokin, web vain
   versionumeron — tarkista tämä ero, oli aiemmin väärin merkitty).
   Maatiedot-linssi ei enää tyhjä, viesti Linssisepälle.
   **~19 riviä jää yhä EI TARKISTETTU** (osiot 3,5,6,7,8,10,11 osittain).
8. **Simulaattoriomistus (Fable kirjasi Raamattuun 24.9. klo 20.4x)**:
   iPhone 18 Pro (1572C658, kosketus toimii) ja iPad Pro 13" (3B4CDACB,
   1032×1376 pt) ovat MINUN. iPhone 17 (FB234D08) on Natiivi-UI:n.
   iPad Pro 11" (503000D1) on jaettu vuoroin. Fyysinen iso iPad
   (00008103…) on Linssisepän/Natiivisepän oma, EI KOSKETA.
9. **Pelikoodarin pariteetti-ajo.mjs**: kirjoitin
   `proto-3d/lokit/pariteetti-ajo/natiivi-komennot.md` (kaikki 41+3
   riviä, komennot/tiedostot/odotukset, osa merkitty epävarmaksi —
   lue huomautukset). Ensimmäinen ajo (b12g) valmistui, mutta
   **LÖYSIN KRIITTISEN BUGIN**: rivi 39 (natiivi/39-iphone.png) näyttää
   VÄÄRÄN linssin (radio, ei vertailu) — sama "linssi ei sulkeudu ennen
   seuraavaa `ui linssi`-komentoa" -desync jota itse kohtasin käsin
   ajaessa. "SAMA 0, ERI 126, PUUTTUU 50/176" -tulos EI OLE LUOTETTAVA
   tämän vuoksi. Ilmoitettu Pelikoodarille (tarkistaa skriptin) ja
   Fablelle (ei käytetä dataa raporttiin ennen korjattua ajoa).
   **ODOTA Pelikoodarin korjattua ajoa ennen jatkoa Fablen tilaamaan
   Build 11/12 -osioon** (iPhonen rivit 1,5,6,7,12/12b,14,21b,23,41;
   iPadin 11 rakenne-PASS-riviä mitattuina + rivi 9 + rivi 30; nappi-
   inventaarion osiot 3,5,6,7,8).

## 3. Uudet työkalut/säännöt tältä sessiolta

- **Käännöspalvelu**: `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh
  <haara>[+<haara>…] [UDID…]` kääntää minkä tahansa pushatun proto-
  haaran ja asentaa annettuihin simulaattoreihin — EI TARVITSE ENÄÄ
  PYYTÄÄ NATIIVISEPÄLTÄ testikäännöksiä, käytä omia/jaettuja simejä.
  Loki `proto-3d/lokit/kaannospalvelu/`.
- **JUMI → KORTTI + PushNotification** (omistajan sitova sääntö 24.9.
  klo 21.2x / 22.5x): jos jäät jumiin (luokitin estää, päätös puuttuu,
  työ ei etene) → AINA AskUserQuestion-kortti omistajalle, EI
  vapaan tekstin odottelua, plus yksi rivi Fablelle lokia varten. Heti
  kortin avattua, kutsu myös PushNotification (status proactive):
  "Laitetestaaja: kysymyskortti auki — <aihe>" — Remote Control vie
  sen omistajan puhelimeen.
- **Vaakakierto**: `ui kierto vaaka|pysty|auto` (Natiivi-UI 43b70aa,
  Screen.orientation) toimii b12g:stä alkaen — EI idb:tä, vanha
  epäilys idb:n tarpeesta oli väärä.
- **Fyysisen laitteen konflikti** (opittu kantapään kautta): jos jaat
  simulaattoria toisen, sinulle näkymättömän session kanssa (eri Mac-
  käyttäjätunnus), sovellus voi kaatua kesken testin ilman selkeää
  virheilmoitusta — tarkista `ps aux | grep <UDID>` jos näkymä on
  outo/musta pidempään kuin odotat.

## 4. Avoimet asiat seuraavalle sessiolle

1. PR #3126 odottaa mergeä (ks. kohta 1).
2. Pelikoodarin pariteetti-ajo.mjs korjaus + uusi ajo — vasta sen
   jälkeen jatka Fablen Build 11/12 -mittaustilaukseen.
3. Nappi-inventaarion ~19 EI TARKISTETTU -riviä (laukun osa, lukija-
   dialogi, sisällyspaneelin X-kuvake, saapumisdialogin napit, sähke,
   pöllön chip-toiminta, osa 7/8/10/11).
4. Tutki-napin ja Julisterivin web-kuvaparit puuttuvat vielä (suorat
   funktiokutsut eivät toimineet tällä kierroksella — kokeile real-
   touch-klikkausta webissäkin, tai kysy Pelikoodarilta oikea funktio).
5. Kohtaamisen muotokuvan suurennos, Aarnin luettelon (i)-kuvake,
   Sisällyksen X-kuvake — pieniä kohteita, tarvitsevat tarkemman
   napautuskoordinaatin.

## 5. Simulaattorit juuri nyt

1572C658 (iPhone 18 Pro) ja 3B4CDACB (iPad Pro 13") — molemmat vapaana,
ei mitään kesken. app.matkakirja.proto3d asennettuna molemmissa
(build vaihtelee viimeisimmän proto-kaanna.sh-ajon mukaan — tarkista
`xcrun simctl listapps <UDID>` tai kysy Pelikoodarilta/Natiivisepältä
tuorein SHA ennen jatkoa).
