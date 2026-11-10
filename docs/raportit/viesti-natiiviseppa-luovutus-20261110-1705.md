# Natiivisepän luovutus 10.11.2026 klo 17.05

Edellinen: -1635 (84cad2698, haara natiiviseppa-luovutus-20261110-1635) ja sen kautta -1435 VOIMASSA paitsi alla päivitetyt kohdat.
Syy: kontekstivahti 26 % (7.37). Älä poista mitään.

## TEHTY TÄLLÄ VUOROLLA
- Marseille/Barcelona mac-2 94303946d katsottu: katuverkko 5 s kohdalla molemmissa, rc 0, 0 PUUTE. PT KUITTASI → JU vie junaan
  pt-ok-numerolla. Marseillen striimikärki on siis valmis Macilla; iPad-varmistus kuidun palattua (OK-ehto -1635:ssä).
- "RANSKA" Barcelonassa EI ole vika: alakulman maanimi = pelaajan maa (omistaja 9.11. 16.4x; muisti maanimi-alakulmassa-pelaajan-maa).
- NN-sarja (muistikatto f08387e78, 3× Pariisi + 3× Lontoo) luettu: lokit NAS:lla
  /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/lokit-20261110-e/natiiviseppa-muistikatto-*; taulukot
  proto-3d/_tyo/natiiviseppa/muistikatto/tulos.md. Ei kaatumisia (signal 15 = skenaarion lopetus). Tiukin: kaupunki 80° liikkeessä
  3218–3599 Mt (vara 3940:een +341); juoksupeli 2599–3053. HUOM (PT): klo 9–16.38 ajojen latausajat hitaassa verkossa – muisti kelpaa, ajat ei.

## KÄRKI: MUISTIVAIHEET – KAUPUNKI 80° -PIIKKI (PT 16.5x hyväksyi; tavoite: piikki selvästi alas ilman näkyvää laatumuutosta)
- Syy (pariisi-1 muisti-tarkka.log rivit 7237–7650): kallistuksen 80 jälkeen pallon laatat 453 → 866 (+N −0) ja rasterit ov 246 → 520 Mt,
  tex 474 → 768 Mt: Cesium (Pallo SSE 20, välimuisti 256 Mt, forbidHoles) valitsee laatat horisonttiin asti, vaikka lineaarisen sumun
  lopun (RenderSettings.fogEndDistance, Aurinko/Horisonttiusva) takana maa on täyttä usvaa. Cesiumin oma sumukarsinta ei tunne pelin usvaa.
- Korjaus 60623ec85 (natiivi-backup natiiviseppa/usvarajaus, wt /Users/Shared/Claude/wt/proto-natiiviseppa-usvarajaus, juna 224 89b687706 päällä):
  Kartta/UsvaRajaus.cs (puhdas) + LiikeLaatat.PaivitaUsva: levossa ja pääkameran valinnassa pallon hallintaan kaksi piirtämätöntä kameraa:
  RAJATTU (yläreuna sumun lopun rivillä + vara 0,03, sama pikselitiheys) + KARKEA koko kuva 0,25. Pois: lento, seuranta, saapuminen,
  verho, portti, peitto, liikkeen varjo (Kiinnita sammuttaa ensin). Komento `maasto usva 0|1|tila`; loki "MATKAKIRJA usvarajaus: päällä/pois".
  Kartta-testit UsvaRajausTestit 5/5, unity-tarkistus (sh) 0 virhettä. EI laitteella vielä.
- AJO JU:lla: proto-3d/_tyo/natiiviseppa/usvarajaus/ajopyynto-1.md (sk-usva-a/b, a,b,a,b ~5 min) → lokit/natiiviseppa-usva-{a,b}-{1,2}.
  LUE: muistikatto/jaksot.py lokikansioille (80° huippu a vs b; tavoite selvästi alle 3200), U-rivien "Pallo N … ov" a vs b,
  konsolista "usvarajaus: päällä, raja y …" (jos ei päälle: tarkista RenderSettings.fog/fogMode ja UsvanRivi). KUVAT täysikoossa:
  usvaa-80-* vs usvab-80-* sama rajaus → pari PT:lle (näkyykö ero usvan rajalla/yläkulmissa; jos reikiä, KarkeaKerroin 0,5).
  Vasta sitten junaan PT:n sanalla.

## MUUT
- Britannia-2-kylmä, PE-vieritys (0421-u, 4444-u, juna224-1) ja kertoja: JU:n jonossa, odottavat kuitua (laitteet puhelinverkossa 16.38-;
  JU kertoo kun lähtevät). LUE niiden tulokset (britannia-saumat/ajopyynto-2.md, vieritys-pe/).
- Muistikatto-tulos: juoksupeli toisena (2599–3053) – seuraava muistikohde 80°:n jälkeen, jos PT haluaa.

## VIESTIT TÄLLÄ VUOROLLA
PT: mac-2 valmis + RANSKA (kuitattu), NN-sarja + kärkiehdotus (hyväksytty), usvarajaus 60623ec85 + ajo. JU: jono (Britannia/PE kuituun),
usvarajaus-ajopyyntö 17.0x.
