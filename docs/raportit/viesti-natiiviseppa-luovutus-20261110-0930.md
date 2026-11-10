# Natiivisepän luovutus 10.11.2026 klo 09.30

Edellinen: -0905 (58a84094f), -0820 (e2631b4d0); niiden avoimet kohdat käsitelty alla. Syy: kontekstivahti 30 % (7.37). Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työlista: python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava NS. PT 09.1x järjestys: ISS-muisti C → Yksi tarkkuus → Pont du Gard → kertojan viive.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (session oma; /opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").

## LEVY: siirto-wt.zsh ajossa (aloitettu 09.13, loki _tyo/natiiviseppa/levy/siirto-wt-0913.log; 09.26 talolataus)
Nollaus katkaisee sen → aja uudelleen taustalla: /bin/zsh /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/levy/siirto-wt.zsh >
…/levy/siirto-wt-<hhmm>.log 2>&1 (valmiit "ei kansiota"). VALMIS-rivin jälkeen rivi PT:lle (montako, vapaa tila; 09.2x vapaana 67 Gt).

## KAIKKI ODOTTAVAT JU:N AJOJA (JU kuittasi 09.24; samassa käännöksessä 8fd6cf441)
1. ISS-MUISTI KOE C 630e6bc31: ennallaan, ks. -0905 (iPad-jonossa ensimmäisenä).
2. YKSI TARKKUUS (työlista NYT, omistajan kortti 08.00, koe): haara natiivi-backup natiiviseppa/yksi-tarkkuus 8fd6cf441,
   wt /Users/Shared/Claude/wt/proto-natiiviseppa-yksitarkkuus (juna-224 3bbe27523 + 7.11. kokeen 4 committia cherry-pickinä + uusi).
   Yritys 1 (yritys 2 vielä käyttämättä):
   - Pääkamera PYSYY Cesiumin valinnassa; YksiTaso-kamera (K·d taakse) vain lisää: kerroin 1 = keskustan taso koko ruudulle →
     Pariisi pysyy nykyisellä tasolla, kulmat nousevat, mikään ei karkene. 7.11. kerroin 0,79 ilman pääkameraa karkensi keskustan.
   - Kova palakatto: LiikeLaatatPaatos.YksiTasoLaske laskee valintakameran palat SEN OMASTA kartiosta (7.11. malli laski vain ruudun maan
     → 6,5× aliarvio), raja 1,6 × pääkamera; kallistettuna alue ≤ 2·d (YksiTasoLahiK); hillintä × palaute < 0,75 → irti ("hillitty");
     palaute pallon aktiivisista lapsiolioista (iPad katto 1000, levossa vain alas, uusi lepo askel ylös); PalloMuistiJarru ≥ 1 → irti.
     Malli: 0° oma/pää 1,3 (ei hillintää), 45° hillintä 0,82, 60–85° 0,42–0,68 → kallistettuna käytännössä irti (= nykyinen).
   - Vain levossa (0,4 s paikallaan kierron lat/lon/korkeus/kallistus + asento): eleessä nykyinen valinta (ei tasohyppyä). LiikkeessaYksi
     oletus false. SiirtymaEste ei enää estä siirtymävalintaa (siirtymäalue voittaa).
   - Komennot maasto yksitaso katto|lahi|raja; tila-rivi: irti-syy, levossa, malli oma/pää, palaute, palat aktiiviset/kaikki.
   - Testit 742/742 (uudet YksiTarkkuus*), unity-tarkistus sh 0 virhettä.
   Ajot: _tyo/natiiviseppa/yksi-tarkkuus/ajopyynto-1.md → lokit/natiiviseppa-yksi-tarkkuus-{mac,ipad}-{nyky,uusi}.
   KUN VALMIS: Mac yn-* vs yu-* täysikoossa: 0° z12–z14 kulmat = keskusta, ei suoraa lohkorajaa, keskusta EI karkeampi kuin nyky;
   45°/80° ≈ nyky; tila-rivit (kiinni/irti-syy, palat, malli); pyynnöt (pyynnot.py, _tyo/natiiviseppa/yksi-taso/); tallenne yu-ele vs
   yn-ele hyppymittarilla (ks. yksi-taso/tulos.md vaihto2: 320×240, solut 32×24, ero > 6). iPad: huippu uusi vs nyky (KS 4208–4267),
   palat, ei App terminated, kuva yiu-z13-0. Mac-katto oli pois: aseta iPadin katto mitatun mukaan. Tulos → tulos.md samaan kansioon,
   rivi + pari PT:lle. Jos ei kelpaa: yritys 2 (esim. katto/raja, LahiK), sitten rivi PT:lle.
3. PONT DU GARD SUMEA (työlista jarj 2, omistaja 09.19, kuva Matkakirja-fable docs/raportit/kaappaukset/omistaja-20261110/0855-pont-du-gard-sumea-kartta.png):
   koodista (agentti): NahtavyysEsittely.Katselu → maisemakohde (ei 3D-mallia eikä piirrosta) 0,2° (~22 km) ja kallistus ≥ 65° (PT 9.11.
   Mont Blanc -päätös); kierron (20–60 s) ajan kamera-ajo → LiikeLaatat varjo (karkea valinta); Aurinko/Horisonttiusva vahvistuu kallistuksella.
   Omistajan kuvassa koko ruutu beige ja täplikäs (pohjapallo? usva?). Toisto: _tyo/natiiviseppa/pontdugard/ajopyynto-1.md → lokit/natiiviseppa-pontdugard-1:
   A oletus, B maasto liike pois, C usva pois; kuvat pdg-{a,b,c}-{0,4,16,36}. KUN VALMIS: kumpi syy (B terävä → laattavalinta kierrossa;
   C terävä → usva), lokin maisema-/rajausrivi (onko Pont du Gard maisema), kartta purku tila. Korjaus haaraan juna-224:n päälle.
4. KERTOJAN VIIVE (jarj 3, "mittaa ensin"): iPad kylmä käynnistys, 3 esittelyä (Louvre isoisän alkupuheen aikana, Eiffel, Louvre uudelleen),
   tila 1 s välein: _tyo/natiiviseppa/kertoja-viive/ajopyynto-1.md → lokit/natiiviseppa-kertoja-viive-1. KUN VALMIS: viive napautus →
   "kertoja alkoi" (peli-komento-ajat), "puhe: alkoi X ms (verkko|välimuisti)", "valmis kappale", "pinnattu"/"ohitettu" (isoisän puhe
   pinnattuna?). Mac 8.11.: 1. kohdeluenta verkosta 106 ms; valmisluennat-manifesti iPadilla valmis ennen Aloitusta. Hypoteesit:
   pinnattu alkupuhe, ensimmäinen verkkoyhteys (DNS/TLS), palavirta-synteesi jos valmis puuttuu.

## VIESTIT TÄLLÄ VUOROLLA
JU: kolme pyyntöä (yksi tarkkuus 09.2x, Pont du Gard, kertoja); JU kuittasi ensimmäisen 09.24. PT: ei viestejä (ei vielä tuloksia).
