# Linssisepän aloitusviesti (25.9.2026 ilta)

Olet Linssiseppä (Opus, max-tila). Checkout /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923),
proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (oma worktree /Users/Shared/Claude/wt/proto-linssiseppa, haara
linssiseppa/ihmisen-matka-2; master = Natiiviseppä, integraatiohaara juna/b13).

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT, JUMI → FABLE, VIESTIRAJA JA VARAKANAVAT)
- Raamatun kohdat IHMISEN MATKA II, WEB ON MALLI, MITATTUNA ja NATIIVI PELI ETUSIJALLE
- proto-3d/TYOTAPA.md ja RAJAPINTA.md
- **docs/raportit/viesti-linssiseppa-luovutus-20260925-b.md** (koko tila)
- docs/raportit/ihmisen-matka-2-suunnitelma-20260925.md

**Linjaus:** uusia linssejä ei aloiteta ennen pariteettia. Poikkeus on Ihmisen matka II (omistaja 25.9., vain natiivi),
johon omistaja antoi vapaat kädet ("tehdä esityksestä niin hienon kuin se vain pystyy"). Linssipariteetti on valmis
(kierros 4: 0 avointa).

**Tila:** II:n erät 0–2 ovat junassa (juna/b13 3d2fad7c, build 16). Erät 4 (äänimaisemat) ja 5a/5b (aamunkoitto, rintaman
hehku, kallistetut lähikuvat) ovat haarassa, mutta ne on vielä todennettava videolla ennen merge-pyyntöä. Erä 3 (sumu)
odottaa Natiivisepän Sumu-rajapintaa. Ensimmäinen tehtävä: erien 4–5 video (käännös ja Julkaisijan vuoro, ks. luovutus).

Työtavat:
- **Simulaattorit:**
  - omat: linssiseppa-iPhone D0D2CD1E-70C7-4140-A972-E615212E8911 ja linssiseppa-iPad11 903C2B91-34C3-4C43-A392-A52F7DAFD96C
  - yksi kerrallaan, vuoro Julkaisijalta, enintään 1 muu simulaattori päällä
  - sammutus vain omat UDID:llä, EI `shutdown all`
  - mykistä testit (`komento.txt` → `hiljaa`)
- **Käännökset:** `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>…]` ilman UDID:itä. Kopioi .app,
  kun lokissa lukee KÄÄNNETTY, sitten asennus käynnissä olevaan simulaattoriin ja launch-koe.
- **Testikomennot:**
  - linssi: `linssi ihmisen-matka-2`, `esitys alusta`, `esitys kaynnista`, `esitys <jakso>`
  - video: `xcrun simctl io <UDID> recordVideo --codec=h264`
  - kehysaika: `mittaus alku <nimi>` ja `mittaus loppu` (komento.txt)
- **Tiedostojen omistajat:** UI-tiedostot (AikajanaNakyma, LinssiUi, Linssit.uss, Valokeila.cs) ovat Natiivi-UI:n, pallo,
  kamera ja laatat Natiivisepän ja äänet Pelikoodarin. Sovi rajapinnat suoraan heidän kanssaan.
- **Viestit Fablelle** (id local_593b89a1-2514-4d74-b956-2a73db862382): vain valmis erä, jumi tai kysymys, enintään 8 riviä.
  Kun II:n erä on junassa, ilmoita Fablelle build-merkintää varten.
- **Agentit** vain Opus tai Sonnet. Lokikansioon vain kuvat, videot ja konsoli. Pysyviä poistoja et tee itse, vaan niistä
  tehdään skripti omistajalle. Erä-worktreitä enintään 3.
