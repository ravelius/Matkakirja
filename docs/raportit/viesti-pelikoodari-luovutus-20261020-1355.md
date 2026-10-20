# Pelikoodarin luovutus 20.10.2026 klo 13.55 (sovellus kaatui ~13.02, PT:n herätys 13.5x, konteksti 47 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-1033.md (sen ENSIN-kohdat tehty: 208v10 ja 208v11b ajettu, palatsi junassa).
Rooli: Pelikoodari (Opus, high). Proto-repo on paikallinen (ei pushia). Worktree: /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206.

## PALATSI 208: VALMIS JA JUNASSA
- Haara pelikoodari/palatsi-208 = **83ba2501e**, tarjottu NS:lle PT:n OK:lla. Sisältö: tausta-v4 (maa 0, PT päätös a), esto v2,
  VS:n joki k6, porttien kohteet muurin sisään, lähtö kohti Taihediania, kaide ei nosta puomia, katto pysyy kameran ollessa
  räystään alla (6b34f90be) ja Lavastajan rakennukset v12 (ämpärissä 11.51).
- 208v11b-kuvat kuitattu PT:llä (V1, V2, V3, V5 ja V6 OK). Erittely: _tyo/pelikoodari/palatsi-208/havainnot-208v11.md.
- Omistaja 11.47: palatsi ei mene omistajalle kuvina, ja kierrokset menevät vain PT:lle. Simu vain uudelle tekniikalle (omistaja 11.45).

## KESKEN: ILMESTYMISET (PT:n kärkierä junaan 208; omistaja 12.33 iPadilla: "mikään ei saa ilmestyä yhtäkkiä ruudulle")
Haara **pelikoodari/ilmestymiset-208 = 43de2c3b8** (⊃ palatsi-208 83ba2501e). unity-tarkistus 0, liikevahti ok, testit 679/680.
Syyt (Explore-selvitys) ja korjaukset:
1. Reitillä ei ollut ennakkoa: kuja ja sen sisältö syntyivät risteyksessä 2–19 m Puyin eteen.
   → V4Ennakko: kujan sisältö arvotaan kerran ja säilyy kujalla (JuoksuV4.cs: Jatka/Ota/Ennakoi/Tutki/AlueJonoon/EnnakoiAlue).
   Muurisokkelossa reittiä pitkin 90 m. Palatsin verkossa alue 200 m loppuristeyksestä jonona, 6 kujaa per Askel.
   Mitattu: uusi sisältö syntyy ≥ 52 m:n päähän muurisokkelossa (kulman takana) ja ≥ 200 m:n päähän palatsissa. Risteysruudun
   laskenta on Macilla ≤ 1,3 ms.
2. Vartijat syntyivät 35 m:n rajalla ja tyhjästä. → Ennakon odottava hahmo samassa paikassa (LisaaEnnakot), ja oikea vartija
   ottaa sen (PaivitaVartijat). Poistettu vartija palaa odottamaan (Palauta), käännös on pehmeä, eikä edessä ole etärajaa.
3. Harmaat paikkamallit vaihtuivat malleiksi silmien edessä. → SisaltoValmis: juoksu ja kuva alkavat vasta, kun mallit ja ennakot
   ovat valmiit (vararaja 8 s). JuoksupeliNakyma odottaa ja piirtää sillä välin (Nakyvissa).
4. Kauko-osat: farClip 400 → 2600. Palatsin LOD-vaihto rasterihäivytyksellä (LodHaivytys, 0,4 s) ja 10 m:n hystereesillä.
   Sisältö 24 m:n soluissa kasvaa näkyviin 160 → 130 m:ssä (PaivitaSolut).
5. Takaa-ajaja hyppäsi 9 → 2,5 m yhdessä ruudussa. → Etäisyys muuttuu 4 m/s.
Botti: SeuraavaEsteSuuntaan (seuraavan kujan este), eikä omenahyppyä liukuesteen edessä.
Uusi testi: JuoksuV4Testit.SokkelonEnnakkoEiSynnyLahelle.

## ENSIN (seuraaja)
1. Korjaa testi JuoksuPalatsiTestit.VerkkoAvoimistaTiloista: alussa ennakossa 48/82 kujaa (odotus ≥ 90 %, jono 0).
   Tarkista, ovatko AlueAvain ja Avain(o) samaa muotoa ja ovatko kaikki solmut 200 m:n säteellä ensimmäisen osan B:stä
   (testipalatsi 200 × 300 m). Korjaa joko koodi tai testin odotus perustellusti.
2. Pyydä JU:lta käännös (uusi sha) → app _tyo/pelikoodari/ilmestymiset-208-app.
   **SIMUVIDEO iPad + iPhone** (PT: näkyvyys ja suorituskyky ovat tekniikkaa, joten simu sallittu). Palatsin juoksu botilla A:sta
   noin 40 s ja G:stä noin 20 s. Pohjaksi sk-palatsi-208v11.txt kansiossa _tyo/pelikoodari/simu-sokkelo-206/
   (video-alku/-loppu ja oleta-rivit). Tarkista videosta ruutu ruudulta, ettei mitään ilmesty (vartijat, omenat, esteet, talot) ja
   että fps on kevyellä kuormalla 60.
3. Valmis → sha + 3 riviä PT:lle, ja PT:n OK:lla NS:lle junaan 208 (korvaa palatsi-208 83ba2501e:n).
- Mittaustyökalu (ei committia): _tyo/pelikoodari/palatsi-208/tilapaiset/TilapainenPalatsiEnnakko.cs. Kopioi Peli-testit/Testit/:iin ja aja:
  `PALATSI_SISAAN=<kk-pohja-v1d/pohja.json> ./kaanna.sh PalatsiEnnakko`. Pohja haetaan osoitteesta
  media.matkakirja.app/juoksupeli/maailma-v4/kk-pohja-v1d/pohja.json.

## AVOIMET / HUOMIOT
- farClip 2600 näyttää kauko-Pekingin 50 %:n usvan läpi, kun ennen 400 m:n takana oli tyhjää. Tämä kuuluu VS:lle (usva), joten
  kerro VS:lle simukuvien kanssa.
- Varasokkelo (ruudukko, jos palatsi ei lataudu) rakentaa solmut 64–80 m:n renkaana: poksahdus on yhä mahdollinen, ei korjattu.
- Hahmojen luonti: LisaaEnnakot luo enintään 6 kujaa ruudussa näkyvissä. Tarkista simussa, ettei vartijahahmojen luonti nykäise.
- Omat appit: jäljellä palatsi-208v11-app ja palatsi-208v11b-app (17 vanhaa poistettu, noin 10 Gt).
