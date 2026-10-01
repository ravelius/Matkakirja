# Linnanrakentajan luovutus 1.10.2026 klo 20.0x (-b, Opus high)

## Tila
- **#3812 kuori v24** (venyneet tekstuurit, blender 0e1a7b5806ca986f) junassa linnaetusijalla. Osoitin vasta omistajan
  luvalla Siirtosepän kuittauksen jälkeen. Siirtoseppä mittaa (+33 k kolmiota huippu-tasolla).
- Mainissa tänään: #3766 rantaviiva, #3774 (delighting + reiät + ympäristö-ASTC, korvasi #3772:n), #3806 detalji/maasto-ASTC
  + keski, #3773 ISS v3 (KUVAA, VUODENAIKA), #3794 ISS v4 (VUOROKAUSI, NOPEUS ±48/±16°).
- Ei avoimia omia PR:iä #3812:n lisäksi. Ei worktreetä.

## Kuoriputki (tools/dioraama/blender/kuori_putki.sh) — koko kuori yhdellä ajolla
Vaiheet: kuori (ulkokuori.py --siivoa --venyneet) lod reiat esrgan hamara reiatvalo delight ikkunat ranta astc maski.
Ajo ~1 h 45 min (kuori-vaihe ~75 min). **Aina irrotettuna**: perl fork+setsid (oma PGID), muuten kuolee sessioiden
uudelleenkäynnistyksessä. Tulos `<ulos>/ulkokuori`; vientikansioon kopio + senaatti-alkup + LAHDE.md-merkintä, lähde
`_valmiit/olavinlinna-blender-vNN` (symlinkit v19:n tilat/valot/rakennus-sijoitettu, ulkokuori-vNN, ymparisto-ranta).

## Vientilähteet (_valmiit)
- `olavinlinna-blender-v24` = nykyinen (ulkokuori-v24, ymparisto-ranta). `olavinlinna-blender-reiat` = v22 (1b2133d9).
- `linna-laatu/kuori-v24` = v24:n build-kansio (raaka mukana), `ulkokuori-v24`, `ulkokuori-v22`, `ymparisto-ranta` (+ .astcm:t).
- Detalji-ASTC: `_kirjasto/valmiit/materiaali/<id>/<id>_{diff,nor_gl}-4x4.astcm`; maasto: `ymparisto-ranta/maasto/*_1k-4x4.astcm`.

## Juurisyyt ja opit
- Venyneet korjataan ennen LOD:ia (ulkokuori.py), muuten normaali/kevyt näyttävät vanhat UV:t.
- `kuori_hamara --tasoita` pystytekselit: siivousmaskin tekselit saavat valon muurista yläpuolelta → soihdun hehku katosi
  (v23 suorakaide); nyt max(alkuperäinen, korvaava).
- Jälkimaalauksen vertailuväri naapureista toi tiiliseinän punaisen vaakakatolle; nyt kolmion oma alkuperäinen väri.
- Reiät: triangle_fill epäonnistuu vinoille silmukoille → PCA-tessellointi + silotus; seinapaikka ohittaa < 3 kolmion
  sektorit; täytteen valo ympäristöstä (`--valo`).
- Katot (2B) kokeiltu ja hylätty: 8k-valokuvakatot jo teräviä, maalaus vahamainen.
- PR-haarat: kun osa haarasta on jo mainissa, ota oma diff `git diff origin/main...<haara> -- <tiedostot> | git apply -3`
  uuteen haaraan mainista (koko tiedoston checkout palauttaa muiden muutoksia).

## Seuraavaksi / odottaa
- Siirtosepän kuittaus v24:stä → osoitin omistajan luvalla.
- Jäljellä kuoressa: lounaisbastionin repaleiset lautalevyt (geometriaa, x −18…−10, y −26…−30), pieni piikin jäänne.
- Ranskan toinen linna: raportti `linna-ranska-kartoitus-20261001.md` (suositus Allymes) — omistaja: ei aloiteta vielä.
- Mikseri: v3-otot ~120 repliikille vasta omistajan laitesäätöjen jälkeen (Päätoimittaja tilaa).
