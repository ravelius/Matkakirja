# Pelikoodarin luovutus 18.10.2026 klo 09.52 (KOVA RAJA, Postivahti)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto. Id:t /Users/Shared/Claude/osoitekirja.md. Edellinen luovutus -20261018-0913 (375242330).
Proto-haarat varmuuskopioitu natiivi-backup peili/proto/pelikoodari/<haara>.

## Lue ensin
CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. PT:lle ≤ 3 riviä. Kuvat täysikokoisina ennen lähettämistä. Ei rm:ää.
OMISTAJAN PÄÄTÖS 09.37 (PT): työn alla vain ISS, Louvre ja aamun pyynnöt; juoksupeli TAUOLLA.

## ENSIN: ISS-PÖYTÄ LUONNOS 6 (omistaja 09.2x "Katso itse myös iss paneeli läpi …", KK:n havainnot, PT 09.37; junaan 202)
- PT:n viesti 09.37 sanatarkasti: "Uusi ENSIN (omistaja 09.2x "Katso itse myös iss paneeli läpi. Siellä vielä outo asettelu ja fontit
  eivät mahdu luontevasti omiin paikkoihinsa"): KK:n havainnot (todistus-iss-poyta5-201-k6b, iPhone + iPad P1/P5): NOPEUS täyttää pillerin
  reunoja myöten, KAMERA koskee napin reunoihin, 1×/1000× ahtaat, ATLANTIN VALTAMERI reunasta reunaan, kolme otsikkotyyliä (vihreä pilleri /
  harmaa TILA / näytön sisäinen), ryhmien ylä- ja alareunat eri tasoissa, alhaalla tyhjä kaista (iPadilla alapuolisko tyhjä). Tavoite: yksi
  huolellinen laitepaneeli, yhtenäiset otsikot samalla rivillä, tekstit väljästi, ryhmät tasattuina, ei tyhjää kaistaa, pitkät nimet
  siististi; vain olemassa olevilla UI-pohjilla (puuttuva pohja → kysy PT:ltä). Pari ennen|jälkeen iPhone + iPad PT:lle → KK. Junaan 202."
- TILA 09.5x: kaikki kahdeksan havaintoa korjattu koodissa ja kuvissa (alla); laitekuvat puuttuvat (käännös L2-jonossa, ei vielä simua).
- Haara pelikoodari/iss-paneeli-202 **d653af8ff**, worktree /Users/Shared/Claude/wt/proto-pelikoodari-iss-paneeli-202, tarkista.sh 0.
- Sisältö: poyta.py luonnos 6 (Blender renderöity, osat Resources/IssOhjauspoyta/, raakarenderit _tyo/pelikoodari/ohjauspoyta-l6):
  neljä ryhmää samankorkuisissa kehyksissä, otsikot (NOPEUS/ZOOM, TILA, PAIKKA … KOHTEET ›) koodissa yhdellä rivillä kehysten yllä
  (poyta.json "otsikot", USS --otsikko/--rivi, --tk-paperi-muste 14 pt), kytkimen puoliskot 59 pt, 1×/1000× 14 pt, pitkä nimi kahdelle
  riville (IssOhjaamo.SovitaKohde, 17 pt), levy 78 pt + 55 % turva-alueesta (9-slice). ui.iss.tila-iso uusi. Tekstimalli tarkistettu
  (scratch l6-malli.png): kaikki mahtuu väljästi.
- KÄÄNNÖS L2 (JU: KÄÄNNÖS NYT L2 09.4x) jonotettiin 09.4x minulla taustalla: `PROTO_LINJA=2 PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/app-iss-paneeli-202 zsh /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh d653af8ff`
  (JU arvio valmis ~10.35). Katkeaa todennäköisesti nollauksessa: tarkista proto-3d/lokit/kaannospalvelu/*d653af8ff*-l2.log; jos ei
  KÄÄNNETTY, aja sama komento uudelleen (sama NYT-vuoro, kerro JU:lle) ja ilmoita LUKKO VAPAA.
- SEURAAVAKSI: SIMU NYT JU:lta (iPhone BD64C8E4-A5E4-459B-A863-B5460E2A26DB + iPad 00CF62C2-2FE6-4993-8475-5786CC40A7A3, IPAD=1,
  ENSIN-etusija) → tyokalut/todistusajo/todistusajo.sh skenaarioilla proto-3d/tyokalut/pelikoodari-ajot/sk-iss-paneeli6-202-{iphone,ipad}.txt
  (--app _tyo/pelikoodari/app-iss-paneeli-202/Matkakirja3D.app, --sha käännöksen SHA, --haara d653af8ff). HUOM näytön napautus
  laskettu uusista mitoista (tap 288 823 / 601 1333), ei kokeiltu: jos P4 PUUTE, korjaa koordinaatti. → ennen|jälkeen-parit
  (ennen: lokit/todistus-iss-poyta5-201-k6b-{iphone,ipad}-20261018-0733 P1/P5) täysikokoisina tarkistettuina PT:lle → KK.

## 2) LAINAUSMERKIT NATIIVISSA (PT kiireellinen 09.3x) — VALMIS, odottaa junaa 202
- pelikoodari/lainausmerkit-202 **df8a9d9b5** (worktree wt/proto-pelikoodari-lainausmerkit-202): Peli/Lainausmerkit.Normalisoi,
  Valmisluennat.Url (normalisoitu + raaka), Lukijaaani.Valimuistiavain (normalisoitu), Sahketehtava.TiivisteTasmaa. Peli-testit 609/609,
  tarkista.sh 0. PT:lle kerrottu 09.3x. Junan kokoaja ottaa haaran.

## 3) KULTAISET: PT 09.5x "kultaiset #4862:n mergen jälkeen" (ei tarkempaa tehtävää tällä vuorolla; kysy PT:ltä mitä kultaisia, kun #4862 on mergetty).

## 4) JUOKSUPELI 202 — TAUOLLA (omistaja 09.37)
- pelikoodari/juoksupeli-202 **13a1927cf**: vartijat näkyvät seuraavan risteyksen käytävillä (reitinvalinta, omistaja 21.51), matalat
  korttelit, HUD ←n ↑n →n, talossa huoneet oviaukoin; testit 17/17. Puutelista + tila: proto-3d/_tyo/pelikoodari/juoksupeli/PUUTELISTA-202.md.
- Käännetty L1 afb2b8c32 09.48 (.app _tyo/pelikoodari/app-juoksupeli-202), LUKKO VAPAA JU:lle ilmoitettu. Video (sk-juoksupeli-202.txt)
  vasta kun PT avaa.

## VALMIIT TÄLLÄ VUOROLLA
- Äänikartat lontoo/praha/ateena ämpärissä (sha = paketti), Siirtoseppä kytki (natiivi 75b9d6874, PR #4861). Ateena täydellinen (PT perui).
- #4860 lainausmerkit (web): merge pidossa junan 202 julkaisuun (JU), SK:lle kerrottu.

## Worktreet
wt/proto-pelikoodari-iss-paneeli-202 (ENSIN), -lainausmerkit-202, -juoksupeli-202 (tauko), wt/pelikoodari-lainausmerkit (PR #4860),
wt/proto-pelikoodari-galleria, -esikatselu, -tivoli-vapaa-lento-200, wt/pelikoodari-vapaa-lento-osio, wt/pelikoodari-posti.

## LISÄYS 11.3x (nollauksen jälkeinen vuoro)
- ISS-PÖYTÄ LUONNOS 6 VALMIS: käännös L2 f88411b77 (d653af8ff), todistusajot OK (lokit/todistus-iss-paneeli6-202-{iphone-20261018-1100,
  ipad-20261018-1104}), parit + LUE.md lokit/todistus-iss-paneeli6-202-parit/. KK hyväksyi junaan 202; d653af8ff junassa 378e328b0 (NS).
  SIMU VAPAA JU:lle (app poistettu, simut sammutettu).
- iPadin levyn kavennus 6af527f3b PERUTTU (PT: sivujen tyhjä levy = omistajan 02.00-päätös, pyyntötiedosto 6b) → palautus ef819661c
  (puu = d653af8ff). ÄLÄ kavenna iPadin levyä.
- JUOKSUPELI RATA 1 -SUUNNITELMA (omistaja 10.46; PT hyväksyi 11.3x koodauksen pohjaksi 19.10.):
  /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksupeli/RATA1-SUUNNITELMA.md. Koodaus vasta 19.10. haaran juoksupeli-202 13a1927cf päälle.
  OMISTAJAN PÄÄTÖS 11.43 omena: "Ei, takaa-ajajaa paetaan" → heitto vain edessä oleviin vartijoihin (kirjattu suunnitelmaan; Heita jo näin).
- Kultaiset: tauko kunnes #4862 mergetään (vasta OMISTAJA PYYSI JULKAISUA). JONO TYHJÄ huomiseen.
- KUVATEKSTIT KUVAN ULKOPUOLELLE (omistaja 12.14, PT #4872): todistusajon merkitse() → raita kuvan alle: proto pelikoodari/kuvateksti-202
  08272d736 (worktree wt/proto-pelikoodari-kuvateksti-202), NS:lle junaan 202. Omat parikoosteet: otsikkokaista kuvan yläpuolelle (ei päälle).
- JUNA 203 (OMISTAJA PYYSI JULKAISUA 16.02, PT 16.05): ISS A1, A3–A7 proto pelikoodari/iss-ohjaus-203 0d36a7aba (wt/proto-pelikoodari-iss-ohjaus-203),
  NS:lle runkoon 203. TODISTEET rungon 203 Release-käännöksestä (JU tekee; EI omaa käännöstä): skenaariot
  proto-3d/tyokalut/pelikoodari-ajot/sk-iss-ohjaus-203-{iphone,ipad}.txt (A1-kuva + video kupola pieni/iso veto + zoom 10 + video A7-valinta)
  → A1-kuvaan kosketuskohta merkitään jälkikäteen (raita kuvan ulkopuolelle) → KK + PT. A2/A8 NUI.
- SEIS 19.10. ASTI (OMISTAJAN PÄÄTÖS 16.15 KK:n kautta "ÄLÄ TEE HUOMISEN TÖITÄ"; PT vahvisti): EI junaan eikä NS:lle tänään. JUNA 204: B6 + B7 proto pelikoodari/iss-nopeus-204 7c3448de0 (wt/proto-pelikoodari-iss-nopeus-204,
  rungon 203 6d67d042d päällä) → NS. Avoin PT:lle: iPadin fyysisesti pidempi vipu (uusi pohjarender + sivulevy) vai nykyinen pituus koko välillä.
  Video B6/B7 KK:lle + PT:lle 203:n todisteiden jälkeen (204:n käännöksestä).

## LISÄYS 19.10. 07.1x (gmail-tili)
- B6+B7 automaattiset testit valmiit: proto pelikoodari/iss-nopeus-204 58cabb404 (NopeusVipuTestit, IssEtsinTestit.LentotilanNipistys…,
  vivun ±1×-reunan korjaus; Linssit-testit 2092/2092, tarkista.sh 0). Kuitattu PT:lle → NS junaan 204.
- Avoin PT:lle/KK:lle: iPadin vivun fyysinen pituus (nykyinen vai pidempi vipu + uusi pohjarender). Ei laitetestejä.
- JUNA 204 LISÄT (PT 07.3x): proto pelikoodari/iss-c2-204 d2c30b96e (wt/proto-pelikoodari-iss-nopeus-204, ⊃ 58cabb404): C2 8cdc917af (vain Cupolan
  näkymä mustaan), B2 IssKameraKuva.Peruuta() 9a8e797ec (NUI:lle kerrottu), C4 d2c30b96e (kehittäjälle maksulliset aina; aiheuttaja 357069b3d;
  valvova testi KehittajanMaksutTestit). Kuitattu PT:lle → NS junaan 204.
- JUOKSUPELI (PT 07.3x; omistaja 07.20 "ei pyydetä mitään muutoksia" Codexilta): proto pelikoodari/juoksupeli-202 dd7009250 Puyi v7 + vartija
  hahmoina (JuoksuHahmot, GlbLeikeLainaus, JuoksuLiikkeet). Vientipaketti proto-3d/_valmiit/juoksupeli-hahmot-v1-vienti-20261019 → JU:n
  vie-paketti.sh pyydetty. Seuraavaksi rata 1 (RATA1-SUUNNITELMA.md) samaan haaraan. Kääntö (KaantoAste 180) ja mitoitus todentamatta laitteella.
- RATA 1 VALMIS (08.2x): proto pelikoodari/juoksupeli-202 57f0f0afe (⊃ hahmot dd7009250): JuoksuRata1 + valikko "Juoksupeli: Rata 1" + "Maali!"-tulos,
  botti 20/20 maaliin 33–40 s. Avoin PT:lle: pidennys (suunnitelma 2–3 min) vai 1. versioksi. Ei simu-/laitetodistetta (19.10. ei laitetestejä).
  Odottaa: JU:n vienti juoksupeli-hahmot-v1 ämpäriin (ilman sitä harmaat laatikot); haara NS:lle junaan vasta PT:n luvalla.
- 09.0x: iPadin pidempi NOPEUS-vipu proto pelikoodari/iss-c2-204 7d74a47a5 (Resources/IssOhjauspoyta/ipad/, poyta.py POYTA_VIPU_LISA=98),
  kuvapari proto-3d/_tyo/pelikoodari/ipad-vipu-204/. Peruuta-koukku pelikoodari/peruuta-koukku-204 d1fcf02d6 (⊃ 7d74a47a5 + NUI d56b8d5fc) → NS junaan 204.
- Rata 1 pidennetty e04149615 (9 huonekierrosta, botti 168–173 s). Mallit ämpärissä (JU 07.58). AVOIN PT: käännösvuoro simutodisteeseen;
  Codexin maailma v4 (kävelymittakaava 317 m, 3,2 m käytävät) → ehdotettu oma "Rata v4" -tila reittigraafilla, ~1 päivä, PT päättää.
  Worktreet: ei poistettavaa ennen junan 204 mergeä (Postivahdille kerrottu).
- 09.4x SEIS-merkki a9513c71d (iss-c2-204; iPad valaistu lovi + SEIS asteikossa; iPhone ennallaan, perustelu PT:lle). Peruuta-koukku NUI bcd63d8e9:stä
  (d1fcf02d6 jätetty pois).
- RATA V4 (omistajan päätös 08.15): proto pelikoodari/juoksupeli-202 572d4eb97 (JuoksuV4 + JuoksuV4Maailma + rajapinta JuoksuKierrokset).
  Maailman vienti _valmiit/juoksupeli-maailma-v4-vienti-20261019 → JU. SEURAAVA: JU:n simuvuoro rata 1 + v4 kerralla → video PT:lle;
  todennäköiset hionnat: kamera seinien läpi (ei estesäteitä), materiaalien sävyt, vartijoiden paikat.
