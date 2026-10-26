# Päätoimittajan luovutus 19.10.2026 klo 18.15 (oma nollaus, konteksti 30 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (nollattu 18.08). Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261019-1715.md (käsitelty kokonaan). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.

## 0. HETI ALUSSA
1. Monitorit: odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen).
2. PR #4995 (Raamattu 2.177 drone oviaukon läpi + 2.105 rakettivideo 60–90 s): merge, kun `testit` on vihreä headilla ad6a0fb4f, ja sitten `tools/uusi-worktree.sh --poista fable-loki-drone`. Taustavahti b4yh20qo7 tekee tämän, jos sessio jatkuu; tarkista `gh pr view 4995`.
3. HUOM `gh pr merge` mergeää heti, vaikka `testit` olisi pending (#4991 meni näin, testit kuitenkin vihreät). Odota aina ajo loppuun (`gh run watch`), ja jos pushaat uuden commitin, pysäytä vanha vahti.

## 1. Omistajan päätökset tässä vuorossa (kaikki kirjattu Raamattuun ja lokiin, #4992 mergetty, #4995 auki)
- 17.25 aarteen löytöhetki esirenderöitynä videona (Codex Blender/Cycles Tripo-mallista, saumaton silmukka 8–10 s, pysty + vaaka, HEVC 10-bit, < 30 MiB). Raamattu 2.19 ja 4.21 ESIRENDERÖITY VIDEO.
- 17.26–17.28 myös raketin koko lento (ensimmäinen 60–90 s, myöhemmille lyhyt versio, Ohita aina) ja isoisän uni videoina; järjestys Kolme veljestä → raketti → uni. Raketin käynnistysnappi pois.
- 17.29 raketin latauskuva säilyy, ja video ladataan valmiiksi ennen hetkeä (NUI: levy + Prepare, 304b84312).
- 17.32 rakettivideon KOKEILU ensin: 10 s laukaisu + 3 s valas, pysty, ei ääntä (Codex 5d4f8bfea).
- 18.02 juoksupelin drone lentää oviaukosta palkin alta (korvaa 16.50:n noston). Pelikoodari tekee jatkoerän seuraavaan junaan.

## 2. Juna 204 (taulun rivi ajan tasalla: 3/8)
☑ kipin napit (myös Kysy-veto iPhonella todistettu 202b8d35), ☑ ✕ irti reunasta, ☑ Kysy-✕ (iPad + iPhone tarkistettu)
☐ NUI valikko-jatko 9eb354a3a (JU L2, erillinen app ~18.00; EI rungossa)
☐ PK kuvalähde 5890ccd32 (JU L2)
☐ Lavastajan kehyskiilto: v1 ea0fe613a ei kiiltänyt → V2 1e1efa157 (JU L1 ~19.00), pari iPhone + iPad → PT → NS (NS:lle kerrottu)
☐ ISS-kohdevalikon vieritys 60 fps: iPad-vika todistettu (30 Hz), korjaus 04d8dc98d rungossa dcee2c7a9 (vihreä) → JU L1 ~18.40 → NUI mittaa iPadin p50 samassa vuorossa valikko-jatkon kanssa
☐ Aarnin luettelo natiivissa (NUI valikko-jatkon mukana)
Ehdokas: VS M-nappi 7c674a023 (omistajan pyyntö 17.16; JU L2 kuvalähteen jälkeen ~19.30) → kuvaparit lyhyt + pitkä nimi → PT.
L2-järjestys (JU 17.48): NUI jatko2 → PK kuvalähde → VS m-nappi → VS pimennys → PK raketti.
EI junaan 204: juoksupeli-kaaro-v2-204 (omistaja 13.31). Siitä on poistettu hylätyt v1-tehosteet (df8064143), ja merge-pyyntö NS:lle koskee seuraavaa junaa.
Viimeisen ☑:n jälkeen PT katsoo simutodisteet, lähettää polut KK:lle, sitten LUKITSE 204 ja TF suoraan ulkoisille (omistaja 17.09).

## 3. Codex (postilaatikko)
Kuitattu: smaragdin unikuva 645 HYVÄKSYTTY (25b82462b; NUI kytki 51f326738), pajan taustat 658 hyväksytty kokeiluun (48ea37a01; tausta syväterävyyden taakse, suurennus 2,6×), Andøyan ympäristö toimitettu Codexille (Karttaseppä, proto-3d/_valmiit/andoya-ymparisto-codex-v1/, korkeudet × 2).
Odotetaan: Kolme veljestä Tripo-malli (tasan 3) → video pysty + vaaka, sekä rakettikokeilun kevyt esikatselu. Tarkista täysikokoisina; KK:lle ennen omistajaa.

## 4. Roolit
- Pelikoodari (nollattu 17.49): raketti lähtee itsestään 30495a9a6 (JU ~20.00); rakettivertailupätkien uusinta (1. ajo jumitti) simuvuorossa; drone B -jatkoerä.
- NUI (nollattu 17.49): aarrevideo 9678aecec + 304b84312, unikuva 51f326738, Aarnin kolme 330b3bf68 (seuraava juna); simut odottavat JU:n SIMU NYT.
- Karttaseppä: nostonimet 67fb5b478 (JU L1 ~19.00) → kuvapari. Muut erät tehty.
- Valoseppä: M-nappi (ks. 2) → pimennys k6 → tulivuoret (seuraava juna).
- Linssiseppä, Sisältökirjuri, Projektiseppä, Lavastaja: levossa syyllä (odottavat käännöksiä; tehtävät tehty). Projektiseppä teki pohjan esirenderoity-video.md (#4993).
- SK: Raiatean BM-lähde ei ole saatavilla, "jäljet katoavat" pysyy (PR 4994, SK mergeää itse).

## 5. Työlista (talo/tyolista v77)
Uudet rivit: aarrevideo, raketin koko lento (kokeilu ensin), raketti ilman nappia, uni videona (Kolme veljestä unessa aarrevideon mallista: nykyinen unikuva 283 poikkeaa luettelon kuvasta, korjataan ennen kuin uni kytketään päälle). Merkitty valmiiksi: kartan 3D-sarja, museon katseen veto, kippien napit.
