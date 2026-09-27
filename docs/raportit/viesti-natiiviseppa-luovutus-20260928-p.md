# Natiivisepän luovutus 28.9.2026 (p), klo 00.2x EEST — tilinvaihto (BUILD 34 PASSia odottamassa)

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus), sessio nollattiin luovutuksen -o jälkeen. Syy: tilinvaihto
(omistaja 27.9. klo 23.58 Fablen kautta). Edellinen: viesti-natiiviseppa-luovutus-20260927-o.md, jonka kaikki kohdat ovat
yhä voimassa, ellei tässä toisin sanota.

## Lue ensin

1. CLAUDE.md ja Raamatun Ydinajatus, kohta 2 (TYÖTAPA JA SESSIOT, JUMI → FABLE).
2. Tämä raportti ja luovutus -o kokonaan.
3. Muisti: natiiviseppa-oma-simulaattori (vain FBBD41D7), kaannokset-erina-polton-aikana, testikaannos-ei-junan-edelle.

## Tila

- **BUILD 34 = proto-master 17c2928b** (tag build34) = BUILD 33 edf03bfd + VAIN pelikoodari/puhetagit 9fac9748 (omistaja 23.58:
  vain striimiluenta julkaisuun). Puu e30bc79e; Peli-testit 342/342, unity-tarkistus 0 virhettä.
- Käännös: `proto-kaanna.sh build34 FBBD41D7` klo 00.13 julkaisulipulla (loki lokit/kaannospalvelu/20260928-001331-build34.log).
  **KÄÄNNETTY 17c2928b klo 00.16**, savuke FBBD41D7 0 poikkeusta, verho 2,2 s, kartta näkyy (lokit/savuke-build34-17c2928b).
  .app: /Users/Shared/Claude/proto-3d/_valmiit/build34-17c2928b/Matkakirja3D.app. Julkaisulippu poistettu klo 00.18.
- Lähetetty klo 00.18: Laitetestaajalle puhe-PASSiin (PASS suoraan Julkaisijalle ja Fablelle), Julkaisijalle SHA (TF 1.0.34
  PASSin jälkeen, Julkaisija asettaa lipun), Fablelle valmis erä. Julkaisijan muutoslokirivi 1.0.34 (#3518) on jo mainissa.
  Pulun äänitagit (web #3513, v2349) tuotannossa 00.02 alkaen.
- **Ei mergejä proto-masteriin ennen Julkaisijan "vienti valmis" -viestiä (TF 1.0.34).**
- TF 1.0.33 (202609272009) valmis klo 23.56 sisäisessä ryhmässä.
- Yötauko jatkuu Karttasepän polton loppuun: ei käännöksiä eikä simulaattoreita, paitsi julkaisu lipulla
  (`touch /tmp/matkakirja-julkaisu`, `rm -f` heti kun kukaan ei aja; lippu on yhteinen, tarkista `gh run list`).
- Build-juna tauolla (/tmp/matkakirja-juna-tauko). **juna/b13 on yhä 508761e8 (= BUILD 33)**: mergeä master 17c2928b junaan
  ensimmäisenä, kun 1.0.34-juna avataan.

## Haarat (proto-git), ei vielä junassa

| Haara | SHA | Tila |
|---|---|---|
| natiiviseppa/aloitusrata (wt/proto-natiiviseppa-offline-media) | cbb4811f | aloituslento v2, TAUOLLA (v3-palaute alla) |
| natiiviseppa/symbolit-erikoismalli (wt/proto-natiiviseppa-symbolit) | 6cecf733 | laatikkoleikkaus valmis, laiteajo Kinderdijk jalka vs. laatikko puuttuu |
| linssiseppa/symbolit-lippu (Linssisepän) | cd4911b1 | merge-pyyntö aamulla laitekuvien ja Fablen OK:n jälkeen; yhdistyy puhtaasti |
| mallinseppa/era5 (Linssisepän) | d35e9f2c | 1.0.34-jonossa |
| Natiivi-UI: ihme-nappi pois | ? | 1.0.34-jonossa (kysy SHA Natiivi-UI:lta) |
| natiivi-ui/nimet-laskuri | 5d79edd9 | 1.0.34 (luovutus -o, muut avoimet 5) |

## Tauolla: ALOITUSLENTO v3 (omistajan palaute v2-videoon 27.9. klo 23.5x, SANATARKASTI Fablen aloitusviestistä)

"kone pitää näkyä paljon pienempänä kun se kuvataan kaukaa. laskeutuessa kamera pitää olla sen verran kauempana että töksö
laskeutuminen ei näy kun kone näkyy ihan pienenä."
Fablen lisäykset: ohituksen ja saapumisen usva (maa hukkuu sumuun → kamera korkeammalle tai usva ohuemmaksi lähikuvassa),
saapumisen verkosta latautuvat laatat. Kaikki muu v2:ssa pysyy (lähtö korkealta napautusnäkymästä, kone aina kuvassa eikä
koskaan takaa, ohitus vasemmalta oikealle, kuminauhakamera, ruskea Tiger Moth, alkutekstien kolme paikkaa). Tavoite: kaukaa
kone on pieni esine valtavan kartan päällä (mittakaava tuntuu), kasvaa vasta kun kamera todella tulee lähelle; lasku nähdään
kaukaa ja pehmeästi, kosketusta ei lähikuvana. Oma ajatus: symbolisen koneen siipiväli (nyt 5 % kameran etäisyydestä,
AloituslennonRata.cs) ei saa seurata etäisyyttä; käytä todellista kokoa + pieni vähimmäiskoko ruudulla (esim. ≥ 1,5 % leveydestä),
ja saapumisen avaimet kauemmas (kosketus ≥ ~15 km:stä). Video rajattuna laitteen ruutuun, versio kuvaan → Fablelle.
Merge 1.0.34:ään vasta omistajan OK:n jälkeen.

## Jono (Fablen aloitusviestin järjestys, kun tauko päättyy)

1. BUILD 34 loppuun (PASS → TF), jos ei vielä valmis.
2. Aloituslento v3 (yllä), kun Fable avaa.
3. RAE- ja PATINA-säätimet (luovutus -o, oma osio).
4. Kinderdijkin laiteajo 6cecf733: Linssisepän ajo-symbolit-alla.sh, `symbolit alla jalka|laatikko`, kuvapari Fablelle.
5. Ensikäynnistyksen karttavika (fyysinen iPad Pro 13, sovi vuoro), 120 Hz -mittaus.
6. 1.0.34-junan merget polton jälkeen: master 17c2928b → juna/b13, sitten yllä olevan taulukon haarat.

## Tässä vuorossa muuttunut / opetukset

- git merge-tree tekee ristiriidan viereisistä riveistä; yksi muuttumaton rivi väliin riittää (koe scratchpadissa). Kun toinen
  rooli muuttaa samaa tiedostoa, pidä omat muutokset vähintään rivin päässä sen riveistä.
- Hotfix-build master-ensin (kuten BUILD 29b): `proto-kaanna.sh build34 <UDID>` kääntää masterin sellaisenaan (merge on no-op),
  joten Laitetestaajan testaama SHA = Julkaisijan vientiSHA.

## Aloitusviesti seuraavalle Natiivisepälle

```
Olet Natiiviseppä (Opus): Matkakirja-pelin natiivin (Unity, proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto) kamera,
laatat, merkit, käännökset ja proto-masterin omistaja. Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja, Macin käyttäjä koodaus.
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja luovutuksesi: git fetch origin && git show
origin/selvittaja-3d-luovutus:docs/raportit/viesti-natiiviseppa-luovutus-20260928-p.md (ja siitä viitattu -o kokonaan).
Tarkista ensin BUILD 34 (17c2928b): onko Laitetestaajan puhe-PASS tullut ja onko Julkaisija vienyt TF 1.0.34:n.
Yötauko polton ajan: ei käännöksiä eikä simulaattoreita, paitsi julkaisu lipulla. Vain oma simulaattori FBBD41D7.
Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä), Fablen session id local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc.
Agentit vain Opus/Sonnet. Aikaleimat date-komennolla.
```
