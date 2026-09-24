# Fablen luovutus 23.9.2026 klo 17.25 (tili B, sessio klo 11.50 → 17.2x)

Edellinen: viesti-fable-luovutus-20260923.md (tili A). Kaikki päätökset lokissa
docs/raamattu-loki/paatokset-2026-09.md klo 12.01 → 17.2x (~96 otsikkoa). Raamattuun lisätty kohta
NATIIVI PELI ETUSIJALLE (3 päivitystä) ja kohta B) TYÖTILAT päivitetty. Viikkokiintiö tili B 19 %.

## Omistajan linjaukset tänään (sitovat)
1. Tilinvaihto A → B tehty; sessiot avattu uudelleen, samat id:t. Reboot klo 12.43 (CI-WebKit ei
   korjaantunut sillä; korjaantui selainkopion uudelleenlatauksella + glnimiot-tulostemuodolla).
2. Työtilat: kaikki /Users/Shared/Claude/ (roolit Matkakirja-<rooli>, erät wt/<rooli>-<aihe>,
   tools/uusi-worktree.sh, Postivahti tarkistaa). NAS-arkisto /Volumes/NAS-Homes/koodaus/Claude/
   Matkakirja-arkisto/ (pyramidi-poltto, dem). Vanhat polut symlinkkeinä (/Users/samireivinen/
   Matkakirja-*, /Users/koodaus/Matkakirja-posti, wt-*): poistetaan kun sessiot avataan uusista poluista.
3. NATIIVI (Unity 6.3 + Cesium, ei Google, ei ion): KOKO PELI KAIKKINE LINSSEINEEN TEHDÄÄN NATIIVIIN
   PYSÄHTYMÄTTÄ; web jätetään kesken (Julkaisija ajaa nykyisen jonon loppuun; sisältö jatkuu, koska
   paketti vie sen). Peli mahdollisimman pieni: kaikki striimataan ämpäristä, offline-lataus valinnainen.
   Ali-agentit ja parvet vapaasti (Opus/Sonnet, ei Fable). Developer Program on olemassa (webkuori
   App Storessa), mutta koodaus-Xcode näyttää vain Personal Teamin (F72JLS57C5).
4. Muut: herot pidetään kaikki (attribuutio 60:lle tehty #2918), ei juristia; poltot 22c-häive +
   nostotaso ajetaan; sumeat laikut ja salmiakit = syvyystaistelu (korjattu); tuplanimet jäävät;
   testit aina ilman ääniä; kehittäjäsäätimet rattaan alle; syöteputki ei ollut nykimisen syy.

## Natiivin tila (proto-git /Users/Shared/Claude/proto-3d, master = Natiiviseppä)
- VP1–VP4 iPadilla (iPad Pro 11 M5, 120 Hz): pallo omilla laatoilla, kosketus, 266 kaupunkia
  paketista, napautus → lento → nimikortti, EB Garamond, napakannet, reitit. Kehysajat 0 % tökkäyksiä
  (natiivi vs web iPad 7–43 %; PR #2946, sulavuusportti tools/mittaus/aja-natiivi-sulavuus.mjs).
- Pelikoodari: pelilogiikka C# (/Users/Shared/Claude/natiivi-peli + proto pelikoodari/pelilogiikka
  6ab5520 ja pelikoodari/kysymys-ui fc1938b): pelitila, reittiverkko, matka, kysymykset, XP, aarrelaatat,
  pulmat, kaksintaistelu, tapahtumakortit, kaupat, Unity-silmukka Pariisi → kaupunki → lehti WKWebView
  → tallennus; 125 testiä, kultaiset jäljet identtiset. Seuraava: isoisän luennat. MERGE MASTERIIN
  ODOTTAA NATIIVISEPPÄÄ (66 %, nollaus pyydetty).
- Linssiseppä (uusi): inventaario 7 linssiä, runko linssiseppa/linssirunko; topografia saa 1400 tp
  -kynnyksen; odottaa reliefisarjaa (Karttaseppä ~klo 21) ja KarttaKerroksia (Natiiviseppä).
- Natiivi-UI (uusi): tilarivi, valikot, matkavalinta, kaupunkikortti, lehtikuori (#2942), kartuscha,
  karttaselite, pulu, offline-lataus; tekee visuaaliset näkymät Pelikoodarin rajapintoihin.
- Karttaseppä: maasto Ranska z0–z12 ämpärissä (julisteet/maasto/2026-09-23a, layer.json Natiivisepällä);
  poltto 23a käynnissä (CI estetty polton ajaksi); ketju: reliefisarja → Ranska z9–z10 → E28 → GLO-90
  maailma (docs/raportit/karttaseppa-natiivi-ketju-20260923.md).
- Siirtoseppä: sisältöpaketti skeema 1.5 (osa 1–2 + 1.2 + 1.3), siirtosuunnitelma #2948 (132 toimintoa),
  koepaketti paikallisesti /Users/Shared/Claude/sisalto-koe/; korjauslista C1 (sääntövakiot, tapahtumat),
  kuva-/lippukysymysten data, äänitaulut. Ämpärikirjoitus vain Julkaisija/CI.
- Laitetestaaja: sulavuusportti, pelattavan silmukan savuke simulaattorissa (peli-komento.txt).
- Julkaisija: docs/tools mergetty; nippu 2 (#2947, 10 web-haaraa) ja nippu 3 (sisältöpaketti, 5 haaraa
  + 08d238ec2, 94f94e8a7) odottavat polton loppua; 12 web-PR:ää jonossa; natiivin julkaisuputki #2949
  mainissa (TestFlight, nightly). Worktree poistetaan mergen jälkeen.
- Sisältökirjuri: Afrikan O7-paketti (karthago, murzuk, alkufra, gao ensin), sitten kohdekartat.

## Sessiot (10) ja id:t
Pelikoodari local_7b5a6c65 (nollattu 16.25), Karttaseppä local_445a5c7b (nollattu 15.30), Julkaisija
local_9922c4b6 (35 %), Laitetestaaja local_992b689f, Sisältökirjuri local_e5685e4a, Postivahti
local_6f3d4c35, Natiiviseppä local_860f922b (66 %, luovutus pyydetty), Siirtoseppä local_7a1255c5
(nollattu 14.48), Linssiseppä local_3273f209, Natiivi-UI local_9ed5a7df. Fable local_742d1717.
Nollauskaava: muistio session-nollaus-automaattinen.md (RC pois → send_message clear_session self →
75 s → aloitusviesti → RC päälle).

## Jono uudelle Fablelle
1. Natiivisepän nollaus ja uusi sessio (kallistus, maasto Cesium-terrainiksi, Pelikoodarin merget, iPad).
2. Omistaja palaa treeneistä: iPadilla pelattava silmukka (kun Natiiviseppä on asentanut) → tuntuma.
3. Polton 23a loppu → Julkaisija: nippu 2 → nippu 3 → 12 PR:ää; CI-paketti sisalto/1/vN.
4. Omistajalta myöhemmin: fontti (EB Garamond väliaikainen), maksullisen tiimin Apple ID Xcodeen
   TestFlightia varten, z13-maasto kokeilun jälkeen, K110-maat.
5. Aliakset pois, kun sessiot avataan /Users/Shared/Claude-poluista.

## Lisäys klo 17.40 (ennen Fablen nollausta, 62 %)
- Natiiviseppä nollattu klo 17.38 (uusi sessio: iPad-käännös ab8098e, Natiivi-UI:n merge, maasto 23b,
  Linssisepän haarat, levon 94 ylityksen tutkinta). iPadilla b9847ea: kallistus + erät 1–3.
- Natiivi-UI erä 1 valmis (tilarivi, valikot, ratas + offline, matkavalinta); fontit = iOS:n American
  Typewriter + Iowan Old Style (webin fontit, EB Garamond vara). Järjestys: kaupunkikortti + lehtikuori →
  kysymys/pulma/kaksintaistelu/tapahtumakortti-näkymät → kartuscha → pulu → luennat.
- Siirtoseppä: skeema 1.6–1.9 nipussa 3, koepaketti v4 sisalto-koe/; seuraavaksi Livian cue-data,
  rajapintasopimukset, offline-manifesti.
- Pelikoodari: erä 4 valmis (kysymykset, pulmat, kaksintaistelu, tapahtumakortit, kaupat), luennat työn alla.
- Linssiseppä: aikajanamoottori (ihmisen matka); topografia odottaa reliefisarjaa (~21) ja KarttaKerroksia.
- Karttaseppä: poltto 23a käynnissä; maasto 23b (mustat kiilat korjattu) ~18.
- Omistaja treeneissä, palaa ~18; iPad kytkettynä ja auki. Ensimmäinen asia: iPad-kokeilu, kun
  Natiiviseppä on asentanut ab8098e:n. Lokissa ~100 otsikkoa tältä päivältä (klo 12.01 → 17.4x).
