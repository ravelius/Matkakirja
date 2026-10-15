# Natiivi-UI: luovutus 15.10.2026 klo 17.1x (PT: konteksti 34 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261015-ilta.md (lasipohjan riskit),
säännöt -20261014-ilta3.md ja -20261014-paiva.md. Viestit send_messagella id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md
(PT local_5df52e10…, Postivahti local_a24c43c0…, PK local_7fcab04b…). PT:lle ≤ 3 riviä. Omistaja 09.36 "Ei testejä junaan".
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto. NUI:n worktreet: wt/proto-natiivi-ui-aloitus-195 (tämä erä) ja
wt/proto-natiivi-ui-luettavuus (todistusajo.sh); web-worktree wt/natiivi-ui-apuraha-pallo (poista --poista-lipulla PR:n mergen jälkeen).

## TEHTY (juna 195, omistajan TF 193 -palaute 16.33 ja 16.5x; kaikki pushattu, PT kuittasi 1–3)
Haara natiivi-ui/aloitus-195 (natiivi-backup), master b110dff52 (BUILD 194) päällä:
- 2a9db0956 Aloitusjuliste rakentuu rivi kerrallaan (web naytaAvausjuliste, 600/1050 + 700 ms/rivi, salama 1,25 → 1), portin napit
  vasta lopuksi (visible=false siihen asti), napautus näyttää kaiken. Ehto kuten webissä: käynnistys, valikon Uusi peli,
  huipennuksen Uusi matka (avauksen juliste ennen luentaa). USS .mk-juliste--rakentuu. + Livian aloitusohje "Napauta kohteita…"
  lasipohjalle: Ylapalkki.LasiViesti (Lasipohja.Kiinnita ehdolla), .mk-ilmoitus--lasi.
- 465910243 Valintanäkymä: pallo koko ruudulle Euroopan päälle (PeittoEtaisyys, 1,15 × nurkka) ja hidas kääntyminen itään
  (0,25 °/s → 8°, kosketus pysäyttää; iPhone pysty 2°, iPhone vaaka loitontaa). Nappula.Valintanakyma päivittyy; PK:lle
  rajapintaviesti lähetetty (lentokoneen koko Asennon korkeudesta).
- 8eaf6307c Kaupunki-intron pehmeys: uusi UI/Pulu/TraileriLiike.cs (webin cubic-bezierit, perspektiivikirjain, DynamicTransform,
  KameranJalkeen), Introesitys täysi ruudunpäivitys koko esityksen ajan (juurisyy: kirjaimet 30 fps:llä). PT:n kuittaus
  odottaa (viesti jonossa).
Web: ravelius/Matkakirja#4629 b6ce67cab apurahan MAAPALLO-kuva = pelin peruskarttapallo; EI mergeä ennen julkaisupyyntöä.
Myös: alkuintron 59 hyväksyttyä Codex-kuvaa todettu kytketyiksi (sisältöpaketti v743); proto-repon 29 vanhaa testihaaraa poistettu.

## AVOIMET
1. Intro-pehmennys (8eaf6307c) on tehty mutta näkemättä laitteella: jos TF 195:n jälkeen omistaja sanoo yhä nykiväksi, katso
   lokista "traileri ruutuja … fps, pisin väli" ja TraileriTausta.Keskisavy (ReadPixels = GPU-odotus kuvan latautuessa).
2. Lasipohjan riskikohdat (edellinen luovutus, kohta 1) odottavat yhä omistajan palautetta.
3. Levy: app-kopiot proto-3d/lokit/natiivi-ui-app-testi192v ja -192w (vanhempi pois seuraavan käännöksen jälkeen).

## Opit
- Kirjainrivillä Saapumistraileri.cs:ssä on sitova välilyönti (U+00A0) " " – tarkka korvaus ei osu; käytä regexiä tai osaa riviä.
- USS-siirtymissä ei ole cubic-bezieriä: webin käyrät vaativat koodiliikkeen (TraileriLiike), ja USS-siirtymä pitää poistaa samalta
  ominaisuudelta, muuten inline-arvo siirtyy vielä kerran.
- Pohjavahti: yli 250 ms:n intro-/esitysliikkeet merkitään "/* ympäristöanimaatio (…; pohjavahdin poikkeus 8.10.) */".
