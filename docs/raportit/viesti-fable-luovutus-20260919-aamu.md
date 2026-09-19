# Fablen luovutus Mac Studiolla — 19.9.2026 aamu

Sessio 18.9.2026 klo 19.00 – 19.9.2026 klo 08.30 Suomen aikaa (omistaja pyysi
resetin työpöytäohjelman päivitystä varten). Kaikki tila on repossa, Raamatussa
(Fablen haara claude/bold-ride-vow4ki) ja tässä. Lue ensin: CLAUDE.md,
docs/roolitus.md, Raamatun osiot MAC STUDIO: UUDEN SESSION ALOITUS (A–D, D =
kellonajat aina Suomen aikaa), AGENTIT VAIN OPUS JA SONNET (tarkennukset 1–11),
KARTTAUUDISTUKSEN PAATOKSET 34 (kohdat 17–21 ja TARKENNUS 2), 37–44 sekä
ASTRONAUTIN KAMERA LISAYS 16 (kohdat 47–49).

## Julkaistu ja haarat

| Versio | PR | Tila | Sisältö |
| --- | --- | --- | --- |
| v1945 | #2588 | mainissa | pisteet aina kohdemaassa (34 k21), poltto kohdemaan säännöllä (FRA 13→61), hahmotelman 12 varastokohdetta, kokoruutu zoomattava, reliefivelat, siivous |
| v1946 | #2589 | mainissa | tekstit piilossa + kuvat lentävät lappuun (38), välipisteet (39), siirtozoomi (40), kokoruudun napit, linssin kontrasti |
| v1947 | #2590 | CI / merge (ks. alla) | topografialinssin meret+navat+aukot (41), Astronautin kamera pyramidista + yövarjostus + sumu (41 k4, 43 k7), kohdevalinta (42), saaton suunta (43 k11), Ohita pysyy (43 k10), kaupungit piiloon + yläpalkki iPad (43 k8–9), savukekorjaukset |
| v1948 | ei PR:ää vielä | haara claude/bold-ride-vow4ki-v1948, v1947:n tasalla | Ranskan 27 hahmotelmanoston sisällöt + 81 Commons-kuvaa (44), maastokohteiden kuvat, NASA-pilvikuva (PILVIEN_OSOITE) |

v1947:n viimeinen CI-ajo 35423483607 (commit a4f8eb4e): jos vihreä, mergeä
squashina (`gh pr merge 2590 --squash`), sitten rakenna v1948 mainin päälle
(sama kaava kuin v1946/v1947: `git checkout -B ...-v1948 origin/main && git merge
<vanha v1948>`, konfliktit `--theirs`), `node tools/uusi-versio.mjs`, testit,
build, PR. Sisältöpistokoe on tehty (6 otosta), kuvat ovat ämpärissä.

## Ämpäri (media.matkakirja.app)

- Nostotaso 2026-09-18c-maittain (kohdemaan sääntö, FRA 61 nostoa), luettelo
  viety; 2026-09-18b-maittain jäi käyttämättömäksi.
- Reliefipyramidi 20260918 TÄYDENNETTY: 11 409 laattaa (navat, Siperia),
  reliefipyramidi.json päivitetty. Paikallinen kopio scratchpadissa reliefi15/maailma.
- karttanostot/20260918/: 81 kuvaa (hahmotelma 56 + maasto 25).
- matkakirja/linssit/pilvet-bluemarble-2048.jpg (NASA, PD).
- KERMAKATKOS 18.9. klo 20.00–20.35: `--sarjat nostot` vei luettelon ilman
  väritasoja; korjattu skriptiin (yhdista-nostoluettelo + vahti). Sääntö: vienti
  tarkistetaan verkosta, ei paluukoodilla.

## Macin ympäristö

- Oletusäänilaite vaihdettu Mac Studion kaiuttimiin (Scarlett oli sammutettu →
  Chromiumin Web Audio jumissa 20 s → kaikki äänivartiot punaisia). Raamattu
  MAC STUDIO C. Apuri scratchpad/aanilaite (CoreAudio, swift).
- Pysyvät luvat .claude/settings.local.json: aws s3 sync/cp/ls, source.
- iOS-simulaattori (iPhone 18 Pro) toimii tuotanto-osoitteella; sammutettu.
- launch.json: python http.server 8790 (selainikkuna; laatat eivät lataudu
  ilman välitystä — käytä simulaattoria puhelinkuviin).

## Avoimet velat (Raamatussa kohdittain)

1. Ranskan testipeli simulaattorissa (omistaja: "Testaile ranska kuntoon") — ei aloitettu.
2. Päiväkirjakortti peittää kartan nostoja (Bukarest); nostolaput vartio 6 tunnettu punainen.
3. Topografialinssin tumma lasi 292→790 ms vaikka 1. laatta 85 ms (peitteen siirtymäajat).
4. astro-savukkeiden WebKit-lataus (domcontentloaded), astro-pallo 45c kuormapunainen.
5. Kerma V4 mittapari eri leveysasteilla (tunnettu punainen).
6. Polttoketjun sisäinen-ehto ei tunne lisäkaupunkeja; nimiölimitysmittari ilman maittain-lippua.
7. Kohta 8: pelinäkymässä 1–2 elävää kaupunkinimeä (pallon laudassa Ranskassa 4 kaupunkia) — omistajan tarkennus, jos nimiä halutaan enemmän.
8. Generoidut havainnekuvat nostoihin, kun kuvaputken tokenit palaavat.

## Aloitusviesti uudelle sessiolle

"Olet Fable, päätoimittaja pelissä Matkakirja ja unohdettu aarre, Mac Studiolla
(työkansio /Users/samireivinen/Matkakirja-fable). Aja ensin: git fetch origin &&
git checkout -B claude/bold-ride-vow4ki origin/claude/bold-ride-vow4ki. Lue CLAUDE.md,
docs/roolitus.md, docs/raportit/viesti-fable-luovutus-20260919-aamu.md ja Raamatusta
(js/tyohuone-raamattu.js) osiot MAC STUDIO: UUDEN SESSION ALOITUS (A–D), AGENTIT VAIN
OPUS JA SONNET tarkennukset 1–11, KARTTAUUDISTUKSEN PAATOKSET 34 kohdat 17–21, 37–44 ja
LISAYS 16 kohdat 47–49. Vain Fable kirjoittaa Raamattuun; omistajan sanat sanatarkasti
ASCII:na ennen työtä; kellonajat aina Suomen aikaa (tarkista date). Agentit vain
Opus/Sonnet Agent-työkalulla, enintään neljä rinnakkain, worktree, aikakatto 45 min,
ei PR:iä agenteilta, yksi kohdemittaus, savuke päivitetään samassa erässä; Fable kokoaa
julkaisu-PR:n itse ja mergeää kun Testit ja Savukkeet ovat vihreitä. Kaikki mahdollinen
ajetaan Macilla; avaimet ~/.zshrc; ämpärivienti on sallittu (settings.local.json), vienti
tarkistetaan verkosta. Pulun koodi on Fablen. Ensimmäinen tehtävä: v1947:n merge jos
kesken, sitten v1948 (Ranskan sisällöt) mainin päälle ja PR; sitten Ranskan testipeli
iPhone-simulaattorissa (tuotanto-osoite) ja löydösten korjaus. Kysy omistajalta
AskUserQuestion-korteilla. Vastaa suomeksi, tiiviisti."
