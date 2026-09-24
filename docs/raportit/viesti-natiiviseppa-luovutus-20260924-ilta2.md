# Natiivisepän luovutus 24.9.2026 ilta 2, klo 20.23

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 71 % (Fable).
Edellinen: viesti-natiiviseppa-luovutus-20260924-ilta.md (klo 15.54). Rooli: natiivin pääkehittäjä, proto-gitin master,
Unity-, simulaattori- ja laitekäännökset.

## Tila

- **Build 10** = b9755e9 (f02376b + TF-tiimihotfix) TestFlightissa (202609241607). Fokuspohja 38e424d ON build 10:ssä
  (saapumisnäkymän haaran mukana): sisältö 1.34–1.35 (#3081) on build 10:lle turvallinen. Tarkista gitistä
  (`git merge-base --is-ancestor`) ennen kuin väität haaran puuttuvan buildista.
- **Build 11** = proto-master **1c8cdab**, lähetetty Fablelle ja Julkaisijalle (Julkaisija ajaa 1.0.11 Fablen käskystä).
  Sisältää: radio-loydokset (40, 42), nostokortti-levea + lehti-otsikot, radio-huntu (43), nimikerros (38, Liberation
  Serif 2.1.5 SDF, alue- ja merinimet maahan painettuina, alfa lineaariseen sekoitukseen), harmaat suorakulmiot
  korjattu (Z2-varakartta kun rasteri ≤ Z2 tai UV rajojen ulkona; satloki + `lentoharmaa`-diagnoosit), kappalejako,
  kamerareitti 8fe2136, kainalo c6db5b5, ylapalkki-matala (44) f29def5, liiku-luenta (45) 96a5a19,
  oletustiimi RCD77XPB7M kaikkialla (82e1e8d; b9755e9 peruttu).
- Kehityskäännökset: tiimi RCD77XPB7M, laitteen App ID fi.matkakirja.peli.kehitys (omistajan lupa), kolme laitetta
  rekisteröity; ipad.sh-oletus iso iPad Pro 13 00008103-001819421413401E.

## Build 12 -jono

1. **Kamerareitin jatko** (agentti tekee haarassa natiiviseppa/kamerareitti 8fe2136:n päälle, worktree
   /Users/Shared/Claude/wt/proto-natiiviseppa-kamera): kierto ≤ 180° lyhyempään suuntaan, maisema vain tasatilanteessa
   (~35°/s, Fable 20.1x); kohdekaupungin laattojen esilataus Z7–Z9 ennen orbitin loppua (laskun sumeus). Tarkista
   haaran uudet commitit, käännä omaan simulaattoriin, video Fablelle ja omistajalle (pienennetty < 30 Mt puhelimelle).
   Video 8fe2136: proto-3d/lokit/kamerareitti-b11k/.
2. **Radiouudistus: mastot, hämärä, yövalot** (omistaja hyväksyi havainnekuvan 2: docs/raportit/kaappaukset/
   radiouudistus-20260924/1-paakuva-ipad.jpg, PR #3115). Mastojen kokorajat Iso ≥ 2 milj., Keski 0,5–2, Pieni < 0,5,
   skeema 1.38. Linssisepän suunnitelman luku 9 = rajapintaehdotus; Mastot.cs:n luvut (koko, vilkku, renkaat) valmiina.
3. **Linssisepän radio-paneeli 795e954** (build 12): testikäännös isoon iPadiin keskeytettiin build 11 -mergejen takia
   → käännä testi/b12a (master + haara) ja laite.sh, ilmoita Linssisepälle.
4. **Natiivi-UI nosto-levea ec91ce9** (testi/b11l fbba630 asennettu klo 20.21, kuvaparit tulossa) → merge luvan jälkeen.
5. Hytinä 27 (Natiivi-UI: mittaa laitteella), kylmän lennon ohut sauma (yksi kehys, seuraa), NOR/FRA-ääriviivat
   tuotannon 1.35:llä (testikomento `matka X mannerlento|peninkulma` ei vie Pariisiin/Osloon Lontoosta — tee oma).

## Säännöt, jotka opin tänään

- **Julkaisija vie samasta proto-työkopiosta**: testikäännöksen jälkeen työkopio heti puhtaaksi masteriksi. Viennin ajan
  Unity kiinni.
- **Käännöslukko**: testi.sh ottaa lukon /tmp/matkakirja-proto-kaannos.lukko; älä aja kahta käännöstä päällekkäin
  (klo 20.02 b11j asentui ilman haaroja). laite.sh ei ota lukkoa — aja se testi.sh:n perään samassa komennossa.
- **SIMULAATTORIEN OMISTUS** (Raamattu): oma natiiviseppa-iPhone (iPhone 17 Pro) FBBD41D7-2E5A-4B73-9818-B1D9C6C9C748;
  1572C658 ja iPad 13 3B4CDACB = Laitetestaaja, FB234D08 = Natiivi-UI, 503000D1 jaettu. Toisten simeihin vain pyynnöstä.
- Varmenteiden avainnippumuutokset ovat omistajan (turva-asetus).
- Worktree-katto 3 per rooli (Postivahti valvoo).

## Työkalut

Skriptit: /Users/Shared/Claude/proto-3d/lokit/natiiviseppa-skriptit/ — testi.sh (HAARA=… SIMS=… haarat/SHA:t → merge,
tarkista, luo, sim, xcode-sim, asennus; oletus-SIMS = oma sim), laite.sh (IosLaite → xcodebuild RCD77XPB7M → iso iPad),
satlento2.sh (U=… MERI=bmng-bathy S2=s2-alkup <kansio>: aloituslento-video + kehykset), harmaalento.sh (TILA=…),
korkeuskuvat.sh, maakoe.sh. Merge-kaava: merge --no-ff → tarkista.sh → luo → kohtaus + Filmipino + uudet .metat/assetit
(+ muuttuneet materiaaliarvot) omaan committiin → checkout Materiaalit/. Unityn loki simulaattorista: simctl launch
--console-pty (tai Laitetestaajan --stdout=<tiedosto>).
