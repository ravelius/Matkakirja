# Natiivisepän luovutus 3.11.2026 klo 22.24 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-2052.md. 1622-luovutuksen TILA-osio (haarat,
worktreet, simuketju, lukot, testit) on yhä voimassa: `git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
Omia taustaajoja ei ole. EI testejä eikä Kartta-testejä, kun `pgrep -fl "esikatselu.sh|Unity -batchmode"` näyttää ajon.

## SEURAAVA ERÄ (PT 22.2x): ND k4:n maskiraivaus, kun KS tuo hyväksytyn nähtävyysaluekuvan
- Koodi valmis ja testattu: **5bfa0e684** natiiviseppa/maskiraivaus-218 (pohja a1413d71c): ElavaKoealue.LisaaMaski (Z17-ruudukko,
  ajopituudet rivijärjestyksessä, ensin musta), Laattapalvelin.Elava lukee datan raivaus[].maski {z17_origo, z17_per_px, koko,
  ajot}, monikulmio jää pienille kohteille. Kartta-testit 594/594 (KoealueenRaivausNahtavyydenAlta laajennettu maskilla).
- Hylätty data: abc7c5ae5 (k2-maski, veden päälle levinnyt kuva; PT 21.3x: ei yhdistetä).
- Tee: kaupungin määrittelyyn ND:lle `"raivaus_maski": {"alue": "<k4>-alue.json", "kuva": "<k4-maski>.png"}` (alue.json kuten
  Valosepän pohja: z17_px_origo, z17_px_per_kuva_px, koko_px), aja tee-esineet.py, tarkista raivaus-kuva.py:llä (maski
  vaaleansinisenä), cherry-pick tai yhdistä 5bfa0e684 VS:n pariisi-tyylin päälle + data, Kartta-testit, JU:n k6-sk-ajo.
  HUOM: Codexin aluekuvan sijoitus peliin (NAHTAVYYSALUE.md kohta 4) ei ole vielä kenenkään koodia; ilman sitä maskin alue on
  pelissä tyhjä (vain esinekuvat). Kysy PT:ltä, kuka tekee.

## TILA: väliaikaiset kertoimet (KK:n linja 3.11.)
- Ketju VS:n haarassa linssiseppa2/pariisi-tyyli: a1413d71c (K4) → 05756ae01 (vesi, eb1749604 VS:n 5797b3580:n päälle) →
  **d7972fe6e** (takana oleva joki saa peittyä, omistaja 22.14; suora jatko, VS:lle kelattavaksi 22.2x).
  Kertoimet d7972fe6e: Louvre 1,50 · ND 2,68 · Oikeuspalatsi 1,14 · HdV 4,00 · TSJ 4,00.
- Säännöt (Raamattu 2.204): ei veden päälle (21.29), takana oleva joki saa peittyä, edessä ja sivuilla ei (22.14), kasvu ylöspäin
  (alareuna paikallaan), kadut saa peittää. G-malli d0191a334 (ND ≈ 5 ×, Louvre ≈ 1,7 ×) tulee Codexin nähtävyysalueista.
- Hylätty: 53bcfffb5 korkeuskerroin (KK 22.2x: sivukuvat vääristyisivät). Haara kertoimet-takana-218 osoittaa siihen; älä yhdistä.
- JU:n pelikuvat eb1749604: /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261103-220448/ (vettä ei peity). d7972fe6e:n
  ajoa ei pyydetty erikseen (53bcfffb5-ajo pyydetty 22.1x, se on nyt turha: peru JU:lta, jos ajamatta).
- ND ei pääse yli ~2,7: oikean kokoinen Cité on kapea, apsis osuu itäkärjen sivuveteen. 5× vaatii saaren liioittelun alueena.

## Työkalut (_tyo/natiiviseppa/esineet/, ei gitissä)
- tee-esineet.py: "esteet": ["vesi"] (rantaviiva rajoittaa aina), "vesi_takana": true (jalanjäljen pohjoisreunan takana sallittu),
  "kasvu": "ylos", nähtävyyskohtainen "kerroin_max", "raivaus_maski", "venytys_max" (oletus 1 = ei korkeuskerrointa).
- Määrittelyt: kaupunki-pariisi-k4vt.json = d7972fe6e (tuottaa saman pariisi.json:n, tarkistettu cmp), -k4v.json = eb1749604,
  -g.json = 53bcfffb5 (hylätty), -k4-maski.json = abc7c5ae5 (hylätty).
- Tarkistuskuvat: /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-maskiraivaus-20261103/ (kertoimet-vesi-takana.png, -g.png).

## AVOIMET
1. Moni kaupunki: toiselle ElavaKoealueelle KoealueenRaivaus-kutsu Laattapalvelin.Awakeen (nyt vain ElavaPariisi.Alue).
2. Vanha jono: 354 ms PostLateUpdate → xctrace (JU:n laitevuoro); GC-haara vasta PT:n luvalla.

## TILA (worktreet)
- wt/proto-natiiviseppa-raivaus (haara natiiviseppa/maskiraivaus-218), wt/proto-natiiviseppa-kertoimet (kertoimet-takana-218),
  wt/proto-natiiviseppa-koealue (2e05fe9c3). Älä poista.
- Worktreet natiiviseppa-luovutus-2052, -2015, -1905, -1845, -1708 ja -20261103-1622 saa poistaa mergen jälkeen.
