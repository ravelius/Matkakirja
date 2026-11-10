# Karttaseppä: luovutus 10.11.2026 klo 21.08 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -2042:n (sen taustat tarvittaessa: git show 7a5f3c8fa:docs/raportit/viesti-karttaseppa-luovutus-20261110-2042.md).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Tila myös: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/tila.md (ajan tasalla 21.08).

## Junahaara (ennallaan)
- 599b0150d (proto karttaseppa/pariisi-koodimallit) = 224.42 pt-ok (PT, omistaja testaa). KJ1b (lokit/karttaseppa-koodijuna-mac2-599b0150d) KATSOTTU 21.0x:
  219/219 ennen om-yleis-kuvaa (unity.log 2683 < 3106), palat 64; Panthéonin ympärillä talot, beige aukko poissa → PT:lle ilmoitettu.
- KJ2 (iso iPad) ei linkin ehto (OMISTAJAN PÄÄTÖS 20.23); aja vain kun iso iPad toimii.

## TEHTY tässä sessiossa: KK:n listan koodimallit (koe, ei junaan), haara karttaseppa/sacre-coeur-koodi (natiivi-backup), worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna
Pino: 599b0150d → c735240ae Louvre → e87952e4a + bf00d7996 Sacré-Cœur → 428b3faee Panthéon → 261067f00 Invalidit. Testit 751/751, unity-tarkistus (sh) 0.
- SACRÉ-CŒUR (OhjelmaKohdePariisiSacreCoeur.cs): OSM way/23762981, Akseli 4,5, origo Tripo-alueen keskipiste, MaaH 130,5 = Tripon mäen laki 261 m / kerroin 2
  (sc-suunnitelma.md: Tripo-kirkon alapinta 75 m MaanpintaH 186:n yllä). Tripon mäki (malli ilman nimeä) jää. Sokkeli −3 m.
  KYTKIN VAIN "koodimallit sacre-coeur:Sacré-Cœur 1": aluekytkin "sacre-coeur" piilottaa myös mäen (Nahtavyysalue rivi 1104 m.KoodiAvain).
  Tiedossa: Tripon terassi ja portaat ovat osa Tripo-kirkkoa → koodiversiossa mäkeen jää portaiden ura ja tyhjä laki kirkon pohjoispuolelle.
  Korostus K 2 kasvattaa vaakaan ×2 alueen keskipisteestä → kirkko osuu Tripo-kirkon paikalle (Tripo ≈ 2× todellinen).
- PANTHÉON (OhjelmaKohdePariisiPantheon.cs): way/16407465, Akseli 71,5 (+z länteen portikolle), MaaH 45, Tripo-pohja jää. Kupoli 32 pylvästä, huippu 83.
- INVALIDIT (OhjelmaKohdePariisiInvalides.cs): relation/1463538 + way/112452790 Dôme + way/64955027 Saint-Louis, Akseli −4,5, ORIGO TRIPO-MALLIN KOHTA
  (alue X 816,3 Y 823 → 48.8559016, 2.3126136), MaaH 45. Uusi yleinen InKortteli(xs, zs, pihat): ruudukko, seinät ulkosivuille, mansardi sisentyy vain ulkoreunoilta.
  Dôme 107 m, kupoli tumma + 16 kultaripaa.
- ScPaaty sai väriylikuorman (käytössä Panthéonissa ja Invalideissa).
- Mittausskriptit: _tyo/karttaseppa/koodijuna/tee-pantheon-pohja.py, tee-invalides-pohja.py (tee-louvre-pohja.py mallina).

## JU:n jonossa (ajopyyntö _tyo/karttaseppa/koodijuna/ajopyynto.md)
- KJ3 Louvre (c735240ae, sk-mac-louvre.txt, loki lokit/karttaseppa-louvre-koodi-c735240ae) – ei vielä alkanut 21.07.
- KJ4 (LISÄYS 20.59, päivitetty 21.07): käännös 261067f00, sk-mac-sacre-coeur.txt, loki lokit/karttaseppa-sacre-coeur-koodi-261067f00, 16 kuvaa
  (SC tripo-*/koodi-*, pn-*, in-*). JU:lle viestit 20.59, 21.0x ja 21.07 (viimeisin jonossa JU:n vuoron takana).
- Kun kuittaus tulee: katso parit TÄYSIKOKOISINA (tarkista erityisesti pinnan suunta/mustat kolmiot – koodimallien kolmioiden kierto tarkistettu vain testeillä,
  SC:n ScPaaty/ScIkkunat, Invalidien InKortteli-katot), MaaH (leijuuko / uppoaako: SC mäen laki, Invalidit/Panthéon 45). Parit → KK (KK:n lista), rivi PT:lle.

## SEURAAVAKSI
1. KJ3- ja KJ4-parit (yllä). Korjaukset samaan haaraan, uusi Mac-pari.
2. Opéra (OSM way/54667456 "Opéra Garnier", height 70, 218 pistettä; Tripo-alue "opera" Lat 48.87198 Lon 2.33163, MaanpintaH 90 → MaaH 45, malli alueen keskellä,
   Suunta −15.9). Mittaa tee-pantheon-pohja.py:n mallilla (vaihda way ja origo). Sitten Sainte-Chapelle (Tripo notre-dame-alueella; ND:n koodimalli jättää sen Tripoksi).
3. Työlistan rivi "Pariisi valmis: kymmenen kohdan lista" päivitetty 21.07 (tyolista.py tilanne).

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
