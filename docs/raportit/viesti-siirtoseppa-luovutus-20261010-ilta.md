# Siirtosepän luovutus 10.10.2026 ilta (Opus 5.5, high; PT:n nollaus 50 %)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): johdat Olavinlinnan historiamoottoria (pelattava pala, esittely ja vaiheet, historia, linnan äänet ja vesi,
LR:n pakettien kytkentä, kiinnijäänti- ja tarkistuspistesäännöt). Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Testaus vain
automaattisin; simuajot vain PT:n pyytämiin kuviin Julkaisijan KÄÄNNÖS NYT / SIMULAATTORI NYT -vuorolla. Oma simu
8362879F-30B9-4625-9F42-57326EBC3439 (T7-sarja). Ilmoita Julkaisijalle "lukko vapaa" / "simu vapaa".
Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello (haara siirtoseppa/diag-kivet a08c0094a, puhdas). Peilit
natiivi-backup peili/proto/siirtoseppa-<haara>. Skenaariot /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/.
Todistusajo: `zsh tyokalut/todistusajo/todistusajo.sh --era <nimi> --udid 8362879F-… --app <.app> --sha <käännöksen SHA> --skenaario <tiedosto> --haara <commit> --laite iphone --nyt`.
Käännös: `PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/lokit/siirtoseppa-app-<sha> proto-3d/tyokalut/proto-kaanna.sh <haara>` (taustalla).

## JUNAT (kaikki kuitattu, Natiiviseppä kokoaa)

Ketju (proto): 99b9fead3 → a98b7e1a6 → 73bc9b9bd → 8775705c9 → eecbb6474 → 674f3d589 → 187359ae0 → 51029519e → 1f7429f6b → 0771b2e05 → c3091ed82.
- juna 178: 99b9fead3 (v47a palatsiraja), 73bc9b9bd (laaja kiinnijääntitesti M-osa), 8775705c9 (ajurin osarajasääntö; piste 69 reilu ajoitus).
- juna 179: 5f4b1f616 (ReittiKulku Ytimeen, eri haara 8775705c9:n päällä), eecbb6474 (huoneet 2–4 laajaan testiin), 674f3d589 (lokivaroitus
  puuttuvasta pintanimestä), 187359ae0 (tarkistuspiste tikkaiden yläpäähän), 51029519e (torkkuva vartija ei valpastu muiden kiinniotoista,
  pahin menetys 99 → 63 s, LisaMaxS 80), 1f7429f6b (avainesineiden tarkistuspisteet T6b/T6c/T8a), 0771b2e05 (tarjotin palaa kiinnijäännissä
  pöydälle: tyrmäjumi pois), c3091ed82 (v47b: pala e7d9da6d44f147d1, esittely 4e1b2774ab27119a, rantakivi-pinta, b1499-paalu ennen 1975 pois).
- Laaja testi: `OLAVINLINNA_LAAJA=1 ./kaanna.sh KiinniJokaPisteessa` (~170 s) aina kun Olavinlinnan paketti, reitti tai vartijat muuttuvat.
  Juna 179 + 0771b2e05 ajettu: M 70 kohtaa pahin 63 s, huoneet 2–4 18 kohtaa pahin 71 s, ei uusia jumeja.
- Web: PR ravelius/Matkakirja#4351 (pintapankkiin rantakivi + rantakivi(-puoli).jpg = kallio × 0,66) ja LR:n #4355 (rakenna.mjs lisaPinnat)
  Julkaisijalla mergeen.

## KESKEN: RANTAKIVIEN VALKOISUUS (PT: vanha vika, ei regressio)

Kuvapari: ennen todistus-vaiheet-v46z-176-b-20261010-1224/kuvat/v06-1499.png, jälkeen todistus-ranta-v47b-20261010-1732/kuvat/v06-1499.png:
kivet yhä valkoiset, vaikka rantakivi-pinta latautui (lokissa "pinta rantakivi tekstuuri valmis"). Selvitetty:
- Natiivi lukee pinnat vain paketin rakennus.jsonista; pohjakuva korvaa värin (tila B); COLOR_0 = AO/lämpö/satunnainen. Historiassa
  SeikkailuHistoria.TasainenRanta korvaa kavely:ranta-1499:n valoatlaksen vakiolla 0,42 (Valaistu ValoVain kertoo atlaksen × 2).
- Ympäristössä on erillinen malli blender/ymparisto/mallit/rantakivet.glb (DioraamaYmparisto.LataaMalli, DioraamaMaasto: väri = kuva(uv0) ·
  _Kirkkaus, ei splattia), kuva on tumma (keskiarvo 49/255) → valkoisuus syntyy piirrossa. Detalji rantakivi neutraali (albedo_keskiarvo 0,502).
- PIILOTUSKOE odottaa: haara siirtoseppa/diag-kivet a08c0094a (DIAG, EI JUNAAN: `poikki piilota|nayta <nimen alku>` kirjaa myös materiaalit).
  KÄÄNNETTY 1b8329002 (17:51): .app /Users/Shared/Claude/proto-3d/lokit/siirtoseppa-app-a08c0094a/Matkakirja3D.app (todistusajon --sha 1b8329002 --haara a08c0094a).
  Skenaario skenaariot/kivet-diag.txt: 1499-vaiheessa kuvat d1 normaali, d2 ilman Ymparisto:malli:rantakivet, d3 ilman Tila:kavely:ranta-1499.
  Pyydä Julkaisijalta SIMULAATTORI NYT 8362879F (~7 min). Tuloksen mukaan: ympäristömalli → DioraamaMaasto/LataaMalli (kuva, uv, kirkkaus);
  kävelyosa → TasainenRanta / ValoKlooni. Rivi PT:lle ja LR:lle.

## OPITTUA

- ThiefAjuri: laaja haku odottaa 75 s:iin ≤ 6 s välein; osarajaa ei ylitetä epäilyn aikana (yleissääntö, RauhallinenYlitys tyhjä).
- Huonesimulaation ja pelin säännöt pidettävä samoina: tikkaiden yläpää, esinetarkistus (EpaileePelaajaa: harhautus muualla sallittu),
  torkkuja ei valpastu, tarjotin pöydälle.
- LR:n vienti väärältä pohjalta (main ilman v45f:n olavinlinna.js-muutoksia) kadotti 1499-asun ja kappalaisen kädet: DioraamaTestit kaatuvat
  (PalanKuoriOnVuoden1499Asu, KappalainenKantaaKirjaa) → hylkää paketti ja pyydä uusi vienti.
- Uusi vuosileikkaus (b1499-*) tarvitsee Historiajana.OlavinlinnanOsat-rivin (HistoriajanaTestit).
