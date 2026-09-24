# Build 12 -suunnitelma (Natiiviseppä 24.9.2026 klo 22.4x)

Omistajan kortti klo 22.2x (Raamattu "TYÖTAVAN NELJÄ PARANNUSTA"): käännöspalvelu ja build-juna.
Build 11 = proto-master 6ff16f3 (TestFlight 1.0.11). Build 12 -pohja = proto-master bcc46ef.

## Käännöspalvelu (käytössä 24.9. klo 22.3x)

- Kopio `/Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos`: proto-gitin worktree (irrotettu HEAD) ja oma
  Library (APFS-klooni pääkopiosta, ei vie tilaa ennen muutoksia) sekä oma Build.
- Kutsu (kuka tahansa sessio): `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>…] [UDID …]`.
  Pohja on aina master, ja haarat mergetään sen päälle. Haarat näkyvät heti ilman pushia, koska git on sama.
  Vaiheet: tarkista.sh → LuoPallo → IosSimulaattori (-batchmode -nographics) → xcodebuild → simctl install.
- Jono: yksi käännös kerrallaan (lukko /tmp/matkakirja-kaannospalvelu.lukko), seuraava odottaa vuoroaan enintään
  60 min. Loki: `proto-3d/lokit/kaannospalvelu/`. Viimeinen rivi: `KÄÄNNETTY <SHA> … → asennettu …` tai `VIKA …`.
- Pääkopio (`Matkakirja-proto`) jää Natiivisepän editorille, laitekäännöksille ja merge-kaavalle. Julkaisijan
  TestFlight-vienti ajaa valmiista Build/yo:sta. Julkaisijan oma kopio tehdään, kun levyä on ≥ 40 Gt, koska
  kopion Build vie noin 7 Gt.
- Levyraja: palvelu ei käännä, jos vapaata on alle 25 Gt. Vapaana on 43 Gt (22.3x).

## Build-juna

- Integraatiohaara `juna/b12` proto-gitissä. Natiiviseppä mergeää sinne vihreät haarat (unity-tarkistus 0 ja
  kuvapari tai mittaus hyväksytty), ja juna mergetään masteriin, kun se on kääntynyt ja käynnistyy simulaattorissa.
- Ajastettu käännös joka toinen tasatunti (08, 10, … 22): `proto-kaanna.sh juna/b12` + Laitetestaajan simulaattorit.
  Ajastin on launchd-agentti koodaus-käyttäjälle, ja se tehdään omistajan luvalla (pysyvä järjestelmäasetus).
- TestFlight: yöllä klo 04 ja lisäksi aina, kun proto-masterin merge-commitin viestissä on sana BUILD (Julkaisija
  ajaa sen automaattisesti).

## Haarat ja integrointijärjestys

| # | Haara | Kärki | Omistaja | Tila |
|---|---|---|---|---|
| 1 | natiivi-ui/tyyppikuvake | 79a49af | Natiivi-UI | testikäännös b12j (palvelu), kuvaparit tulossa; metoihin Alpha is Transparency + HQ |
| 2 | natiivi-ui/intro-palstat | 993437c | Natiivi-UI | b12j:ssä |
| 3 | natiiviseppa/radio-mastot | eaa1be0 | Natiiviseppä | b12f iso iPad; kuvapari b12f, mitoitus oikein; pohja topografiaksi (omistaja 22.3x) |
| 4 | natiivi-ui/radio-mastonimi | 7dd1e45 | Natiivi-UI | mergelupa (kuvapari b12f) — radio-mastojen kanssa |
| 5 | linssiseppa/radio-paneeli | cd805ce | Linssiseppä | b12i iso iPad (pinnat korjattu), kuvapari tulossa |
| 6 | natiiviseppa/lento-pinta | 2371f8e | Natiiviseppä | kylmän alun sumeus: kokeet D/F (b12l), S2-reunan häivytys valmis |
| 7 | Black Marble -yövalot | – | Karttaseppä → Natiiviseppä | odottaa polttoa |
| 8 | Linnut (boid-parvet) | – | Natiiviseppä | mastojen jälkeen omana eränään |

Haaroilla 3 ja 6 on yhteinen generaattori tee_tileset.py (RadioHamara ja S2Hiipuma omina lohkoinaan). Mergessä
generaattori ajetaan uudelleen. Vanhat haarat (natiivi-ui/gamma, linssiseppa/avaruusavaus, natiiviseppa/syva-ranska,
pelikoodari/linssiomistus) eivät kuulu build 12:een, ellei omistaja pyydä.

## Käännösajat (Mac Studio, 24.9.)

- Simulaattori (tarkista + luo + sim + xcode-sim): 5–8 min, kun Library on lämmin.
- Laite (iso iPad, IosLaite + xcodebuild): noin 4 min lisää.
- Kylmä aloituslentokoe (asennus + lento + video): noin 2 min per vaihtoehto.
