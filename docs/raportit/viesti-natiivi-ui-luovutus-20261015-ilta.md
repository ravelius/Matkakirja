# Natiivi-UI: luovutus 15.10.2026 klo 15.4x (PT: pehmeä raja)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261015-paiva.md (skanneri, opit),
säännöt -20261014-ilta3.md ja -20261014-paiva.md. Viestit send_messagella id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md
(TILINVAIHTO 15.10. 12.1x: PT local_5df52e10…, Postivahti local_a24c43c0…, NS local_674b9ec4…; vanhat id:t eivät ole käytössä).
PT:lle ≤ 3 riviä. Omistaja 09.36 "Ei testejä junaan": PT kuittaa ilman simua, pienet virheet seuraavaan junaan.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto; NUI:n worktree vain wt/proto-natiivi-ui-luettavuus (todistusajo.sh).

## TEHTY TÄSSÄ SESSIOSSA (kaikki PT kuittasi, kaikki NS:n junissa)
- natiivi-ui/museo-nimi-ipad-193 **98b573e50** (juna 193): museon teosnimen himmennysliuku myös, kun teos kehyksineen ulottuu tekstin
  alle (LS1:n lista iPad vaaka 37+4/51; MuseoSovitin.TeosVasenRuudulla uusi). LS1:n kansio todistus-ranskasali2-ipad-20261015-0120
  on käsitelty (LS1 voi siirtää sen).
- natiivi-ui/lasi-kaikkialle-193 **2358c4f21** (juna 193): YKSI YHTEINEN LASIPOHJA (omistaja 14.10. 23.33). Lasipohja.Luokat liittää
  lasin automaattisesti (0,5 s haku kaikista UI-kerroksista) linssien ja pelien lasi-, harmaa- ja tummapintaisiin paneeleihin ja
  kortteihin; uusi paneeli saa sen merkillä mk-lasipohja. Lähde: museo, dioraama, ajattelijat → Lasipohja.AsetaLahde (sumennetaan
  linssin oma RT, Lasitausta.EnnenKehysta). Pulun chat lasilla kaikissa linsseissä. Paperi jää paperiksi.
- natiivi-ui/museo-lista-194 **1c759c09d** (juna 194): museon salilistan napautus pyyhkäisyn jälkeen (UITK ScrollView nieli
  napautuksen jäljelle jääneen nopeuden takia) → Kosketusvieritys.Liita Valitse näyttely -sivulle ja LinssiValikon listoille
  (kuten oppaan valikko juna 144). Lasipohja ohittaa koko sivut (mk-opas-aloitus).
- Tarkistettu jo tehdyiksi: isoisän ja Pulun kuvat (kertomuskuvat-190 8d0bc0963), ISS-palaute 12.25 (iss-palaute-190 a9fbdf4d4).
  Tekstilaatikot läpinäkyviksi EI (kumottu 14.10. 21.42 ja 23.33).

## AVOIMET
1. LASIPOHJAN RISKIKOHDAT, katso TF 193:n jälkeen omistajan palautteesta (PT:n pyyntö): a) lähdekuvan sumennus (komentopuskuri +
   Blitter render graphin ulkopuolella): museossa, dioraamassa ja ajattelijoissa lasi voi olla musta, väärin päin tai väärästä
   kohdasta (kartoitus lähteen elementin worldBoundiin); b) sisäpinnat: paneelin lapsen peittävä tausta peittää lasin (korjattu vain
   tumma kortti, USS .mk-lasi--paalla); epäiltävät aikajana-paneeli, ajattelija(-lappu), lentopeli, ISS-ikkunat; c) lasikerros
   paneelin ensimmäisenä lapsena näkyessään (Children()/IndexOf-koodi). Testikomento `ui lasi 0|1` ja `ui lasi mittaa`.
2. Levy: app-kopiot natiivi-ui-app-testi192v ja -192w (poista vanhempi seuraavan käännöksen jälkeen); testihaarat natiivi-ui/testi-192*
   ja koe-* poistettavissa (juna 192 julkaistu).

## Opit
- Ennen uutta työtä: grep proto-repon git log (--all --since) ja Raamattu-loki; PT:n erissä oli kolmesti jo tehtyä työtä.
- Matkakirja-natiivi-ui: ÄLÄ käytä `git commit -a` (.claude/settings.local.json on muutettuna paikallisesti; tuli kahdesti mukaan).
- Lasipohja kiinnittää paneelin ensimmäiseksi lapseksi: peittävät sisäpinnat tarvitsevat USS-säännön .mk-lasi--paalla-luokalla.
