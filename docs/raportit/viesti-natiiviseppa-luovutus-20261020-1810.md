# Natiivisepän luovutus 20.10.2026 klo 18.1x (tilinvaihto; juna 208 runko a1d4b9561 testeissä)

Vain voimassa oleva tila (omistaja 15.11, Raamattu 7.22). Historia: juna208/jono-208.txt ja aiemmat luovutukset git-historiassa.
Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt. Id:t AINA osoitekirjasta.

## TILA
- **BUILD 207 = proto master 7ffa2ed9a** (TF:ssä).
- **JUNA 208 auki**: runko natiiviseppa/juna-208 (wt/proto-natiiviseppa-ehdokas) = **a1d4b9561**, peilissä (natiivi-backup peili/proto/natiiviseppa/juna-208).
  = 37d8e8507 (iPhone-paketti + laatat, vihreä 2183/690/517) + PK tausta-v5-208 b4e384537 (Lavastajan tausta v5 + esto v3, PT OK).
  **Testit + laite208 käynnissä 18.08** (lokit/natiiviseppa-testit208-a1d4b9561.log, -ketju208-a1d4b9561.log). Jos ajo katkesi tilinvaihdossa:
  `zsh juna208/testit208-odota.sh > lokit/natiiviseppa-testit208-a1d4b9561.log &` + `zsh juna208/ketju208.sh a1d4b9561`.
- Rungon sisältö cd1391001:n päälle: NUI salanappi f8c0bc0ce, PK jäätyminen + GPU-sarja 10e6a5a68 (LT raskas 10,4 ms), avauserä (PK avaus 1f1a75eec →
  äänikärki ae4c2cdde → laatat 177560643 → tausta-v5 b4e384537; VS hehku 404a63482 + cc9564c36 (liike-epäterävyys kameraan, hehku 0,5; liike-osa
  mittaamatta laitteella); NUI kuvateksti 3cf7887fa + siirtokartta 63d0fe853; LS zoomaus ee84e9303).
- **Laitteet**: omistajan iPhone = 37d8e8507 (KK asensi 18.10). iPad Pro 13 = e3cff21f6 (17.45) → **asenna a1d4b9561 heti kun vihreä**
  (iso iPad roolien käytössä aina, omistajan pysyvä päätös 17.17 PT:n kautta: ei kysytä auki olevasta pelistä → PAKOTA=1;
  paitsi LT:n mittaus käynnissä → kysy LT:ltä VAPAA).
- **Ämpäri**: kielletty-tausta-v5 + palatsi-esto-v3 viety (JU 18.06/18.08). Oma curl esto-v3:een antoi 404 kolmella arvatulla polulla – polku tulee
  PalatsiMallitPolku-muuttujasta; varmista laitteella (loki "palatsi v2: maan täyte …", ei latausvirhettä).
- **ODOTTAA**: Lavastajan **tausta-v6** (~18.20; aukkojen alle tasainen maa, korvaa v5) → PT: runkoon heti ämpärissä. Tarvitsee PK:n kärjen
  (TaustaKansio "kielletty-tausta-v6/" ja mahdollisesti uusi esto-leivonta). PT on jo antanut OK:n (18.1x).
- **ODOTTAA paketin jälkeen**: VS 8d53e567e (iso-ipad-208 = cc9564c36 + iso iPad piirtotarkkuus 0,8 + MSAA 2) laite208-mittauskäännös → LT + VS;
  runkoon vasta LT:n kuvaparin ja PT OK:n jälkeen.
- 208 lukitaan VAIN PT:n viestillä "OMISTAJA PYYSI JULKAISUA". build208-viesti.txt: TÄYTÄ LUKITSE; muutosloki-208.txt puuttuu (PT:n teksti).
- Tunnettu varoitus (ei estä): Shader warning JuoksuLattia.shader(108) SokkelonPinta mahdollisesti alustamaton (PK tietää).

## TYÖNKULKU (voimassa)
- Erä runkoon vain PT:n OMALLA OK-rivillä tai KK:n "OMISTAJAN PÄÄTÖS" -listalla. merge-tree ensin; älä yhdistä testien aikana
  (pkill juna208/ketju208.sh, juna208/testit208, NetCoreRuntime/dotnet rakennus), yhdistä --no-ff, push peiliin, käynnistä uudelleen.
- Vihreä runko: `testit208-odota.sh` + `ketju208.sh <sha>` (testit → laite208) → `asenna208.sh <sha>` (oletus iPad Pro 13; U=<udid> muille;
  iPhone 00008150-000A212E1407801C vain omistajan/KK:n pyynnöstä).
- Mittauskäännökset: `laite208.sh <sha> <nimi>` → lokit/natiiviseppa-app-208-<nimi>-laite → polku pyytäjälle/LT:lle. Käännöslukko sarjoittaa.
  Muu appi kuin runko-<sha> asennetaan suoraan: `xcrun devicectl device install app --device <udid> <app>`.
- Jokaisesta laitekäännöksestä JU:lle "KÄÄNNETTY <sha>".

## OPITUT 20.10. ilta
- iPad-käännetty Release-appi asentuu myös iPhoneen (sama laiteappi).
- Viestit useimmiten jonoon (queued) – älä odota vastausta, jatka.
