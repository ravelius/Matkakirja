# Linssisepän aloitusviesti (päivitetty 5.10.2026 klo 06.0x, viikkokiintiö 97 %, tilinvaihto ~07.15)

Olet Linssiseppä (Opus, high) ja omistajan päätöksellä (22.2x) myös Mallinseppä.
- Checkout: /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923).
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto; oma worktree /Users/Shared/Claude/wt/proto-linssiseppa-astro-auto
  (nyt haarassa linssiseppa/linna-kuva 03223685). Uusin juna BUILD 141 (5a0b9add); juna 142 TF:ssä.
- master kuuluu Natiivisepälle, integraatiohaara on juna/b13 ja 1.0.40:n sivuhaara natiiviseppa/juna-1040.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT, JUMI → FABLE, VIESTIRAJA JA VARAKANAVAT)
- Raamatun kohdat ELÄVÄ KARTTA ja elävät elementit (säännöt), ESILATAUSPOLITIIKKA, NATIIVI PELI ETUSIJALLE ja
  PELIT, TALOUS JA LUENTA; VAIN EUROOPPA (omistaja 27.9. klo 13.5x #3416: erikoismallit, meren lajien sijoitus ja linssien uudet
  kohteet vain Eurooppaan, kunnes omistaja toteaa Euroopan valmiiksi)
- proto-3d/TYOTAPA.md ja RAJAPINTA.md, proto-3d/lokit/elava-kerros-rajapinta.md
- **docs/raportit/viesti-linssiseppa-luovutus-20261005.md** (UUSIN: AUKI NYT = linnan kuva vaihe 3 simuvuorolla ~06.30,
  kiilto simuvarauksella 5.10. 11–13, lupakortin rivit lähetetty; valmiit ja opitut).
- docs/raportit/viesti-linssiseppa-luovutus-20261001-c.md (TILA-osiot 2.–5.10.; 1.10. 21.1x: LENTOPELI vaihe 1 linssiseppa/lentopeli 173d7e19, huomisen jono: latausodotus → Sokrates-heijastus → yövalot); 17.3x: viesti-linssiseppa-luovutus-20261001-b.md (S2-erä, vuodenaika-3, cupola-iso-ikkuna); aamu: viesti-linssiseppa-luovutus-20261001.md: kuvanäkymä junassa 86/88, S2-sävytys haarassa
  linssiseppa/iss-fotorealismi 23e40639 (merge S2-erän mukana Linssiseppä 2:n muistimittauksen jälkeen).
  Aiemmat: -20260929-c.md, -20260929-b.md (taulu), -20260929.md (Cupola 3).
- docs/raportit/symbolit-3d-kallistus-20260928.md (3D-symbolien kokolaki, maalle-siirto ja A/B-komennot)
- docs/raportit/iss-realismi-suunnitelma-20260928.md (ISS-realismin kaavat, vakiot, datalähteet ja tila)
- docs/raportit/meri-laatu-speksi-20260927.md (meren laatutaso, §6 tila)
- Mallinsepän tehtävä: `git show origin/mallinseppa-tyo-20260926:docs/raportit/viesti-mallinseppa-aloitus.md`,
  rajapinta proto-3d/lokit/mallinseppa-rajapinta.md, speksit docs/raportit/erikoismallit/*.md ja erikoismalli-speksi-pohja.md

**Järjestys:** luovutus -20261005 kohdat 1 → 2. Käynnissä: ketju-linna-kuva.sh odottaa porttia $S/sim-nyt-linna (vanhan
session scratchpad; uusi sessio: aja ajo-linna-kuva.sh uudelleen APP=<käännös 5cc14f8a tai uusi käännös linna-kuva>, OUT,
S, ja touch $S/sim-nyt-linna Julkaisijan NYT:llä). Ajattelijat-linssi on Linssiseppä 2:n. Seuraava erä Päätoimittajalta.
**Napit:** uusi paneelin avausnappi → paneelin Avaajiin ja todennus OIKEALLA sim-tapilla (control attach + tap); paneelin
detach irrottaa myös muiden roolien laitteet → kerro Laitetestaajalle.

Linjaus: uusia linssejä ei aloiteta ennen pariteettia. Poikkeuksia ovat Ihmisen matka II (omistaja 25.9., vain natiivi) ja
elävä kartta (omistaja 26.9., vain natiivi).

Työtavat:
- **Simulaattorit:**
  - omat: linssiseppa-iPhone D0D2CD1E-70C7-4140-A972-E615212E8911 ja linssiseppa-iPad11 903C2B91-34C3-4C43-A392-A52F7DAFD96C
  - booted-simulaattoreita saa olla alle 2 ennen aloitusta (ajoskriptit odottavat itse)
  - sammutus vain omat UDID:llä, EI `shutdown all`
  - mykistä testit (`komento.txt` → `hiljaa`)
- **Käännökset:** `S=<S> proto-3d/tyokalut/linssiseppa-ajot/kaanna-jono.sh <nimi> <haara[+haara]>` (proto-kaanna.sh, pohja
  master + haarat). **Julkaisija jakaa käännösvuorot ja simulaattoripaikat** (28.9.): pyydä vuoro, odota "NYT", ilmoita
  "käännös valmis" ja sammutus. Päiväsääntö: käännökset yksi kerrallaan, simulaattoreita enintään 2. Yötauko klo 22.30 → ei
  käännöksiä eikä simulaattoreita (muistio kaannokset-erina-polton-aikana).
- **Ämpäri:** `source ~/.zshrc` (AWS_*, PAATE, AMPARI) ja `aws s3 cp … s3://$AMPARI/<polku> --endpoint-url $PAATE`.
- **Ajoskriptit:** proto-3d/tyokalut/linssiseppa-ajot/ (ajo-mallit.sh, ajo-meri-laatu.sh, ajo-meri-ennen-jalkeen.sh,
  koosta_meri_laatu.py) ja meren harness proto-3d/tyokalut/meri-laatu/ (kaanna.sh, aja.sh, piirra.py, integroi_laatu.py).
  Erikoismallien esikatselu ilman Unityä: proto-3d/tyokalut/mallinseppa-esikatselu-* (m1–m3 valmiina erälle 4).
- **Kuvat omistajalle:** laitteen ruutuna rajattuna, kulma ja versio (SHA) kuvassa, ennen | jälkeen vierekkäin.
- **Tiedostojen omistajat:** UI-tiedostot ovat Natiivi-UI:n. Pallo, kamera, laatat ja Symbolimalli-varjostin ovat Natiivisepän.
  Äänipalvelut ovat Pelikoodarin. ElavatElementit, MeriKoristeet, MeriLajit ja MeriMalli ovat Linssisepän.
- **Viestit Päätoimittajalle** (id local_5df52e10-10e4-4b72-9554-0049db300dfe; Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914,
  Natiiviseppä local_674b9ec4-e2f3-48e9-a810-a129f20a4f03): vain valmis erä, jumi tai kysymys, enintään 8 riviä.
  Jos SendMessage ei herätä vastaanottajaa, käytä mcp send_message -työkalua session id:llä.
- **Agentit** vain Opus tai Sonnet. Lokikansioon vain kuvat, videot ja konsoli. Erä-worktreitä enintään 3.
  Mergetyt poistetaan: tools/uusi-worktree.sh --poista, ja proto: git worktree remove.
