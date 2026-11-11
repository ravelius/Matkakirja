# Karttaseppä: luovutus 11.11.2026 klo 14.08 (Raamattu 7.37)

Edellinen: viesti-karttaseppa-luovutus-20261111-1358.md (+ LISÄYS 14.0x). Tämä korvaa sen jonon; muut tiedot (PP, pallo, hylätyt paketit) ennallaan.
Natiivityöpuu /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, haara karttaseppa/montmartre (10356557a), puhdas, pushattu natiivi-backupiin.
HUOM: ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`. Testit: `sh Kartta-testit/kaanna.sh`, `sh Peli-testit/unity-tarkistus.sh`.
M = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/montmartre-maasto, K = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna.

## TEHTY TÄSSÄ SESSIOSSA
1. parentUrl TARKISTETTU: Cesium for Unity 1.26 (cesium-native LayerJsonTerrainLoader) lukee parentUrl:n, MUTTA (vuoristopilotti 12.10.,
   Laattapalvelin.cs:268) hakee lapsen polusta myös laatat, joita lapsessa ei ole → 404 → litteä; korjattu vain kehityskomennolla `maasto url`
   (MaastoLapsi/MaastoVanhempi). Lisäksi LaattapakettiRakennus lukee z0–5:n saatavuuden Rakennus.MaastoUrl:n layer.jsonista.
   → VALITTU TAPA A (kuten 214): täysi kansio 2026-11-11-montmartre = z0–12 maailman kopio + RGE ALTI z13–15, yksi layer.json ilman parentUrl:ia.
   M/tyokalu/yhdista-layer.py teki M/kerros/2026-11-11-montmartre/layer.json (maxzoom 15, maailman 0–12 + kerros 13–15; emot tarkistettu).
   parentUrl-versio talteen nimellä layer-koe.json (paikallinen pari `maasto url`, EI vientiin).
2. 863814508: Rakennus.MaastoUrl + Pallo.unity (maastoLayer, _url) → julisteet/maasto/2026-11-11-montmartre/layer.json;
   MaastoOhjaus.Kansiot = {2026-10-29-maailma, 2026-11-11-montmartre} (Lontoon kumpu toimii kummastakin) + testi. 759/759, unity 0.
3. JU:lle 14.0x vientipyyntö: ämpärissä kopio 2026-10-29-maailma/{0..12} → 2026-11-11-montmartre/, levyltä 13–15 + layer.json (ei layer-koe.json).
   ODOTTAA JU:n kuittausta. Haara ei toimi Macilla ennen vientiä (maasto 404).
4. 10356557a: Nahtavyysalue ScKoodi: Tripo-mäki (lahi-r8/sacre-coeur-maki) KoodiAvain, Tripo-pohja r8b PohjaPoisKoodilla (portaat jo ennestään). 759/759, unity 0.

## JONO (järjestyksessä)
1. MONTMARTRE jatkuu (EI JUNAAN ennen omistajan korttia kuvaparista):
   a) TALOT v17 (pariisi.json-versio; palat-vNN = paikallinen ajonumero, viimeisin palat-v41-pp = v16): vain Montmartren palat.
      Ketju: K/raivaus-1-1-petit-palais/aja-palat-v41.sh → K/raivaus-1-1-sc/tee-talot-sc-pohja.py (SC_DZ -16.5, SIISTI, KORVAUS, KAIKKI) →
      K/../koodimallit/tee-talot-nd.py → talokone /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/tee-palat.py
      (pohja :315 `T['pohja'] = (maa − palamaa)·KERROIN − 1,1·clamp(maa − 90, 0, 20)`, maa = IGN altitude_minimale_sol).
      Uusi pohja reiän r ≤ 1400 m paloille: 90 + (maa_RGE − 48,6) − PalaH, maa_RGE talon kohdalta (MontmartreKorkeus-taulukko / M/raaka);
      tarkista ensin TaloKerros.shader / TaloKerros.cs:432 (palaH = Sovita(maa + MaaLisays)), miten pohja ja palaH yhdistyvät, ja että tasaus a·b
      antaa saman 90 + (1 − b)(h − reunaH) kuin maa. Kokoa kuten kokoa-v41-pp.py (vain muuttuneet palat). Paketti K/talot-paketti-pariisi-v17
      vasta KK:n ja omistajan kortin jälkeen ämpäriin.
   b) Sacré-Cœurin koodimalli: MaaH / lattia / terassi / portaat RGE ALTI:sta (portaat ja maa ≤ 1 m koko matkalla).
   c) Mac-parit JU:lla (nykyinen 224.x | uusi, VASTA kun JU on vienyt maastokansion): esityskamera 4 suuntaa (rakennus ≥ 1/3), Place Saint-Pierren
      tasolta ylös, 5 km yleis, lähin (ei särmiä rinteessä, ei porrasta/rakoa mäkialueen reunalla). Mitat: talon pohja ≤ 2 m, portaat ≤ 1 m,
      nousu 0,9–1,2 × kirkko. Parit suoraan KK:lle (kopio PT).
2. PALLO: NUI:n varjokorjaus 81ac33721 → KJ JU:lla; katso kuvat, parit KK:lle (kopio PT).
3. PP: MR67 b8d7c913e → 224.73 PT:n pt-ok:lla; odota LINKKI-riviä.
4. GRAND PALAIS (KK 13.44: Montmartren jälkeen).

## LISÄYS 14.1x
- JU: vienti tapa a PT:n päätöksellä yöllä 01.00 (z0–12 kopio → 13–15 levyltä → layer.json viimeisenä). Rivi KS:lle aamulla; Mac-parit vasta sen jälkeen.
- JU ehdotti z0–12-uudelleenohjausta vanhaan kansioon (vain 53 laattaa vientiin): EI tehty, koska LaattapakettiRakennus (avaimet, sarjan etuliite, layer.json) on sidottu MaastoUrl:n kansioon. Kansio M/kerros/2026-11-11-montmartre lopullinen, älä muuta ennen 01.xx.
- PALLO KJ37b (81ac33721) VALMIS 14.12: rc 0, 16/16, kansio /Users/Shared/Claude/proto-3d/lokit/karttaseppa-pallo-kj37b-81ac33721 (rajaukset/). Esityskuvat liian kaukaa (aja 0.0012 ilman lahizoomia ≈ 800 m) → JU:lle 14.2x uusinta: lahizoomi 8, kallista 35, aja 48.8646 2.3268 0.0005 2, 4 suuntaa (ehto pallo ≥ 1/3 leveydestä, muuten 0.0003). Kun tulee: katso 1000 px kopioina, parit KK:lle (kopio PT).
- PALLO 14.4x: esityskuvat KJ37c–f (kallista 75, kohdepiste 93 m pallon takana katsesuunnassa, arc 0.0017) → koko pallo näkyy, ~1/4 korkeudesta; 1/3-leveysehto ei täyty 17 m:n pallolla (lähempää kamera kuoren sisällä). Parit KK:lle (kopio PT) K/parit-kj37/ (rajaukset + 4 suunnan arkki). ODOTTAA KK:n vastausta: hyväksyntä → junaehdokas (81ac33721).

## LISÄYS 4 (14.5x) — KORVAA JONON JÄRJESTYKSEN
- KK 14.46: PALLO HYVÄKSYTTY. Korjaus köydet tasavalolla 6c5b0f78d (Rakentaja.NormaaliYlos). Junaehdokas a0384240a (natiivi-backup karttaseppa/pallo-juna-pp) = PP b8d7c913e + pallo + Koodimallit.Oletus += "kuumailmapallo"; 759/759, unity 0. JU:lle pyydetty MR67:n jälkeen PT:n pt-ok:lla; KK katsoo köydet junan kuvista (ei uutta kierrosta). Odota LINKKI-riviä.
- KK 14.46 MITTA: korkeille ja kapeille kohteille esityskameran mitta on korkeus (~1/4 kuvasta + lähirajaus); muille 1/3 leveydestä ennallaan.
- JONO NYT: 1) GRAND PALAIS (KK 14.46 "seuraavaksi"; tarkista KK:n/PT:n aiemmat GP-linjat ja K/kj32-35-kansiot ennen työtä). 2) Montmartre talot v17 ja kirkko (ks. yllä 1a–b); Mac-parit vasta JU:n aamun rivin jälkeen (maasto vienti 01.00).
- JU 14.5x: MR70 a0384240a → 224.76 MR69:n jälkeen PT:n pt-ok:lla; linkin jälkeen JU ottaa pallon lähirajauksen + pelikameran lähimmän junan käännöksellä → katso ja välitä KK:lle (köydet).
- JU 15.53: LINKKI 224.73 = df0f36c4b (Petit Palais koodina + talot v16), testit läpi, manifest 200. PP VALMIS.
- PT 16.1x: pallo a0384240a pt-ok → 224.77 (ei 224.76). Appi kaatui ~16.08; KS nollaa itsensä tästä luovutuksesta. Seuraaja: Grand Palais (KK 14.46), sitten Montmartre talot v17.
