# PT:n luovutus 2.11.2026 klo 10.35

Edellinen: viesti-fable-luovutus-20261102-0915.md (säännöt voimassa). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Syy: konteksti 27 % (pehmeä raja 25 %). `date` ennen aikaleimoja.

## OMISTAJAN PÄÄTÖKSET 2.11. (lokissa)
- 09.4x kadonneet ihmeet: 5 rakennusleikettä EIVÄT mene kartalle; tilalle 9 hitaasti pyörivää tähteä (kukin eri vaiheesta,
  pieni hehku, oletuksena näkyvissä, neljällä tähti nykyrakennuksen viereen ★-kyltti pysyy). Video omistajalle ennen peliin vientiä.
- 10.17 tähti "Piirrostyylisemmäksi": Codexin 3D-tähti acb2831ee hylätty; v2 tilattu (KS 25befeea3: muste + akvarellikulta,
  hehku ≈ 1,5×, 72 ruutua). Toimitus → _review-tahti-v2-20261102/ → video (PT teki v1:n itse: scratchpad-skripti tahti-video.py,
  kartta pari-temple-torni.jpg vasen puolisko) → KK.
- 10.03 Boost päivittää koko taulun: PR 5965 (Boost-nappi herättää hoitajan kommentilla), taulu julkaistaan VAIN Asemataulun
  sessiosta (v13); KK ei julkaise (aloitus.md kohta 2 muutettu openiksi). Postivahdin katko: ei ajastanut ensimmäistä herätystä.
- 10.2x JUNARIVIT: Työn alla ja Valmiina erikseen, ei aikoja. Juna 218 ja TF 217 muotoiltu käsin uuteen muotoon (taulu v176+).
  PR 5969 (juna.py ainoa kirjoitustapa, tarkistin hylkää, koukku pt-taulu-muistutus.py, Raamattu 10.10, loki) — TESTIT AJOSSA
  luovutushetkellä: MERGE kun vihreä (gh pr merge 5969 --squash --delete-branch). Sen jälkeen junarivit VAIN
  `python3 -I tools/asemataulu/juna.py lisaa|valmis|lukitse|tf --juna N "…"`. TF 216:ssa tekstinsisäisiä päiväyksiä (ohitetaan, < 217).

## JUNA 218 (runko 52ba93dea, NS)
- Mukana: tausta-v99, nipistys 629ff9da9, tahti bff93a345 + veneet 8ada386f3 + testikorjaus, aarrepiste 2× a9568fc20/586222bc5.
- ODOTTAA: LAV rakennukset-v95 (caafe0535; JU vie omaan kansioonsa, EI kytketä) → PK:n seuraaja korjaa ensin eunukkien katoamisen
  (214 v2 rakennukset.json: palatsi 216 -ajossa 0 eunukkia, v94:llä 4), sitten salitallenne kapealla reitillä 4b107df7e
  (haara pelikoodari/kapea-reitti-218; yksi kaista < 1,5 m, sali 1,4, ei eunukkeja yksikaistaisella) → PT kuittaa yhdessä.
- LAV v96: P2-valovuoto ja sisälattia tummanharmaaksi → pari PT:lle.
- NUI:n seuraaja (aloitusviestiin pyydetty Postivahdilta): info+kioski /proto-3d/_valmiit/pariisi-info-kioski-20261102/ +
  TasoVersio aukio-20261102 (JU vie laatat, kuitattu); avatun aarrepisteen ydin kylläiseksi vihreäksi; osa C tähdet (kun v2 hyväksytty).
- KS:n seuraaja: Temple-haamu = palojen r06c11/r07c11 limityssauma koottu-65 → vain toinen pala + muut limityshaamut → TasoVersio JU:lle
  (ohje KS:n luovutuksessa PR 5967). Kuittaa tähti v2 Codexille.

## ROOLIT
- Nollautumassa/nollattu: NUI (luovutus PR 5962), PK (PR 5963), KS (PR 5967), Asemataulu (Boostin 10.59 jälkeen).
- Levy: 34 Gi (raja 31) NS:n siivouksen jälkeen; seuraa.
