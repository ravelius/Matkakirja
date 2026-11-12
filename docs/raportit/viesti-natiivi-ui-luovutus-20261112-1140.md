# Natiivi-UI: luovutus 12.11.2026 klo 11.40 (tiivis, Raamattu 7.37; konteksti 26 %; korvaa -1105:n)

Natiivikoodi: remote natiivi-backup (github ravelius/Matkakirja-natiivi), junahaara natiivi-backup/julkaisija/juna-224 (oletus-
haara proto/master, EI main). Worktreet /Users/Shared/Claude/wt/nui-*. Mac-ajot JU:lla, lokit /Users/Shared/Claude/proto-3d/lokit/,
skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Käännöstarkistus: <worktree>/Peli-testit/unity-tarkistus.sh (rc 0).
Kello date-komennosta. Kuvat ≤ 1000 px pienennöksinä omaan katseluun (sips -Z 1000), KK:lle täysikokoiset rajaukset (PIL crop).

## NYT TEHTÄVÄ (KK 11.36; viesti KK:lle vasta, kun on näytettävää tai este)
1. TYÖLISTAN RIVI "Intro" loppuun: nimi ja rakennusvuosi kuvien päälle, isoisän kuvat pois introsta (Raamattu saapuminen-ja-intro
   säännöt 7–8: aloituskaupungissa 6 kuvaa, muissa 3, Pariisissa 5; isoisän kuvia introssa ei ole). Tehty jo: rivit erät 1–3
   (SaapumisKuvat.cs:765–, erä 3 755936ac8 linkissä 224.105), Sofia 8e9399823 + d2cc209da (pt-ok pyydetty 10.16).
   Tarkista työlistasta (tyolista.py) mitä rivillä vielä on auki; jos odottaa SK:n vuosia tai pt-ok:ta → kohta 2 sillä välin.
2. TYÖLISTAN RIVI "Isoisän kuva taitettuna tekstin sekaan" (Raamattu saapuminen-ja-intro 12: isoisän teksti näkyviin luennan
   alkaessa, kuva taitettu tekstin sekaan; kaikkiin kaupunkeihin): KARKEA KUVA KK:lle ennen viimeistelyä (näkyvä työ: KK katsoo ensin,
   PT kopiona). Vihje: Saapumisesitys.cs:526–539 testikomennot `ui saapumisintro sivukuva pariisi|kaikki|pois` ja `isoisankuvat 0|1`.
3. EI: tarinamerkkien 2. kierros odottaa KK:n tavoitekuvaa — älä aloita.

## ODOTTAA (ei toimia, ellei viestiä tule)
- pt-ok PT:ltä: tarinamerkki-9 82e5d93f2 (pyydetty 11.15; KK:n junasana 11.14; JU vie MR108 = 224.111) ja kirahvikorjaus
  d47f98a8b (pyydetty 11.30; KK:n junasana 11.33; JU vie seuraavaan junaan 82e5d93f2..d47f98a8b, kun pt-ok-tiedostossa).
  Haara natiivi-ui/tarinamerkki-koe-2, worktree wt/nui-tarina. Merkit vain kehittäjälle (pelaaja piirretty 0).
- pt-ok PT:ltä: Sofia 8e9399823 + d2cc209da (haara natiivi-ui/intro-rivit-era3).

## VALMIIT TÄNÄÄN (ei toimia)
- Kommentit 47cacd5a1 JUNASSA (juna-224, JU 11.16): Aloitusnakyma/KaupunkiIntro/IssKohdevalikko + tyylikirja.json ✕-sulku.
- Saapumispuheen ääni (KK:n työ B): ei vikaa, kaikki William (KK sulki 11.14).
- Tyylikirja-kortti (vastuu NUI) tarkistettu; KK korjasi PR 6612 ja 6613. Kapselit: ei korjattavaa (nahkapilleri = omistajan valinta).
- Vakiokuvien komento: jo tehty 210c842ad (`ui vakio kuva <i>`), KK kuittasi 11.36.
- Kirahvi: esikatselu piilotti pystysuunnassa liian aikaisin (Screen 640×480 venyy 2,61 × 5,04); d47f98a8b korjaa (pystykerroin
  tila-rivillä, ~1,94 Macilla, ~1 laitteella). -10-ajo lokit/nui-tarinamerkki-10-d47f98a8b, KK katsoi 11.33.

## MUISTA SEURAAVASSA Ylapalkki.cs-MUUTOKSESSA (KK 11.22, ei omaa ajoa)
- Ylapalkki.cs:441–445 kommentti "ei kapseli" → "päädyt lähes pyöreät, omistajan valinta".

## HUOM
- Asemataulu on jäädytetty (9.11.): hookin "päivitä junat.json/tyolista.json" -pyyntö ohitetaan.
- KK local_d5f31591…; PT local_8d8ebf72…; JU local_2a7d6c96…; Postivahti local_1f31f830… (osoitekirja /Users/Shared/Claude/osoitekirja.md).
