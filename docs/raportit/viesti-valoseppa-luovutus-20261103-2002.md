# Valosepän luovutus 3.11.2026 klo 20.02

Syy: kontekstiraja 27 % (Raamattu 7.37), luonteva tauko: k5 ja k6 JU:n jonossa, osa B:n ensimmäinen versio valmis.
Edellinen: viesti-valoseppa-luovutus-20261103-1906.md (pysyvät työtavat -20261101-2124.md, -2220.md voimassa). Loki:
`/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd ajaa ja ilmoittaa hakemiston).

## Tehty tässä sessiossa
- k4 tarkistettu (Cité ilman vihreää, NS:n esineet paikoillaan) → PT. PT: omistajan pari TAUOLLA (omistaja 19.3x: koko kartta
  yläviistoon; KK:n suunnitelma `Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-ylaviisto-ja-osakirjasto.md`).
- PT:n 3 korjausta parin skriptiin: sama kamera n|p (kohde keskellä), `ui lentopiilo` (tarinapaneeli ja nimiöt pois), pidemmät odotukset
  → `$B/pariisi-tyyli/omistaja/sk.txt` (k5- ja k6-skriptit samaa pohjaa).
- dcf0a13ca: k4:n pystysaumat = talon kattolaji erosi Z14-datapalan rajalla (leikattu talo, eri keskipiste) → piste rajalta + laji korttelista.
- c90019a08: KS:n vesi v2 (lopullinen) + pystysauman häivytys muuntimessa (`codex-pinnat.py` HAIVYTYS vesi 32 px; yli 7,5 → 2,8).
- fb7ff2595: NS 2e05fe9c3 (Louvre v2) yhdistetty = **k5**, JU:n jonossa editoriajona L2:lla + laiteajo isolla iPadilla (NS:n laiteajon pohja).
- **8e0660847 = osa B ensimmäinen versio** (`Kartta/ElavaVinotalot.cs`): katto nousee render_height × Kulma 0,5 (enintään 20 m < MVT-puskuri
  64/4096 ≈ 25 m), etelään katsovat seinät 3 sävyllä (ElavaTyyli.SeinanVarit, väliaikaiset), varjo kaakkoon (muste 60/255), leikkausreunoille
  ei seinää eikä mustetta, talot koostetaan katujen ja veden päälle, välimuisti `-yv1` (ElavaVinotalot.TyyliVersio, Laattapalvelin.ElavaKuva).
  Kartta-testit 593/593. **k6** (`$B/pariisi-tyyli/k6/ajo.zsh`) JU:n jonossa k5:n jälkeen.
- PAIKALLINEN KOEAJO ILMAN UNITYÄ: `ELAVA_KOE=<kansio> ELAVA_Z=16 ELAVA_PINNAT=<wt>/Assets/StreamingAssets/ElavaKoealue sh <wt>/Kartta-testit/kaanna.sh ElavaKoe`
  (kansiossa mvt14/8298_5636.pbf = OpenFreeMap Citén Z14-pala, z10.rgb, z10.txt "518 352"); kokoaja `$B/pariisi-tyyli/yv1/kokoa.py`,
  MVT-tarkistin `yv1/mvtlue.py`. Tulos `yv1/paikallinen-z16-{cite,lahi}.png` (PT:lle 20.01). Data-kansio oli scratchpadissa: lataa pala uudelleen
  `https://tiles.openfreemap.org/planet/20261101_080013_pt/14/8298/5636.pbf` (sama kuin peli hakee).

## TYÖN ALLA: osa B (PT 19.5x)
Haara **linssiseppa2/pariisi-tyyli** (natiivi-backup), wt `/Users/Shared/Claude/wt/proto-linssiseppa2-k17`, HEAD 8e0660847.
- SEURAAVAKSI: k5-tulos (sauma + vesi, kuvat myös NS:lle ja PT:lle JU:lta) ja k6-tulos (yläviisto Unityssä) → tarkista, parit PT:lle.
- KS:ltä kysytty väliaikaiset korttelipinnat/julkisivunauha (ei vastausta 20.02); nyt kattopinnat v1 + yksiväriset seinät.
- Kun KS:n kulmaohje + korttelipinnat + julkisivunauhat tulevat: VERSIOT (`codex-pinnat.py`), julkisivu pinnaksi seinäsävyjen tilalle
  (näytteistys seinän pituuden ja korkeuden mukaan), Kulma kulmaohjeen mukaan, TyyliVersio yv2, korttelikohtainen satunnaissiirto (riski 1).
- Avoimet: seinän korkeus kapeilla kaduilla (riski 2), muste on segmenteittäin (suorituskyky; mittaa iPadilla osa D:ssä), käännetty kartta (kohta 5).
- Osa D: pari Codexin koko kartta | uusi koealue samasta rajauksesta kolmella zoomilla (omistajan 15.40-kuvien zoomit) → PT;
  iso iPad: vierityksen ruutuajat ja muisti ennen ja jälkeen.

## Muuta
- Sade (linssiseppa2/sade-218, 5ed5f95e2) odottaa äänen laitetarkistusta. Rakettivideo tauolla.
- Juoksupelin valo ja taivas palatsiin yleiskäyttöisinä (omistaja 18.45), kun valo-erä alkaa.
- wt `proto-linssiseppa2-korjaus` = vahtikorjaus 99ebdaf89 (poistettavissa, kun junassa).
