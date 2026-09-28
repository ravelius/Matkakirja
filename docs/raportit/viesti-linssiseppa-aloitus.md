# Linssisepän aloitusviesti (päivitetty 28.9.2026 klo 10.1x)

Olet Linssiseppä (Opus, max-tila) ja omistajan päätöksellä (22.2x) myös Mallinseppä.
- Checkout: /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923).
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Omat worktreet (3/3): /Users/Shared/Claude/wt/proto-linssiseppa-era5
  (nyt mallinseppa/era6, junassa), -symbolit (linssiseppa/symbolit-lippu) ja -astro (linssiseppa/iss-kyyti); luovutus -q kohta 7.
- master kuuluu Natiivisepälle, integraatiohaara on juna/b13.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT, JUMI → FABLE, VIESTIRAJA JA VARAKANAVAT)
- Raamatun kohdat ELÄVÄ KARTTA ja elävät elementit (säännöt), ESILATAUSPOLITIIKKA, NATIIVI PELI ETUSIJALLE ja
  PELIT, TALOUS JA LUENTA; VAIN EUROOPPA (omistaja 27.9. klo 13.5x #3416: erikoismallit, meren lajien sijoitus ja linssien uudet
  kohteet vain Eurooppaan, kunnes omistaja toteaa Euroopan valmiiksi)
- proto-3d/TYOTAPA.md ja RAJAPINTA.md, proto-3d/lokit/elava-kerros-rajapinta.md
- **docs/raportit/viesti-linssiseppa-luovutus-20260928-q.md** (jono, Cupola-erä, lippu, työkalut ja opit; -p.md aiempi)
- docs/raportit/meri-laatu-speksi-20260927.md (meren laatutaso, §6 tila)
- Mallinsepän tehtävä: `git show origin/mallinseppa-tyo-20260926:docs/raportit/viesti-mallinseppa-aloitus.md`,
  rajapinta proto-3d/lokit/mallinseppa-rajapinta.md, speksit docs/raportit/erikoismallit/*.md ja erikoismalli-speksi-pohja.md

**Järjestys: luovutus -q kohta 1:** tarkista itsenäisen cl-ajon tulokset (käännös iss-kyyti + symbolit-lippu, laiteajo
$S/ajo-cl.sh), sitten Cupolan usvan diagnoosi ja korjaus, Cupolan kuvapari + video Fablelle, lipun kuvapari Fablelle.
Junassa jo: erät 5+6, astro-selain, joet. Sen jälkeen Geysir-tarkistus (matala prioriteetti) ja natiivin astroselite
webin mallin jälkeen.

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
  "käännös valmis" ja sammutus. Päiväsääntö: käännökset yksi kerrallaan, simulaattoreita enintään 2.
- **Ajoskriptit:** proto-3d/tyokalut/linssiseppa-ajot/ (ajo-mallit.sh, ajo-meri-laatu.sh, ajo-meri-ennen-jalkeen.sh,
  koosta_meri_laatu.py) ja meren harness proto-3d/tyokalut/meri-laatu/ (kaanna.sh, aja.sh, piirra.py, integroi_laatu.py).
  Erikoismallien esikatselu ilman Unityä: proto-3d/tyokalut/mallinseppa-esikatselu-* (m1–m3 valmiina erälle 4).
- **Kuvat omistajalle:** laitteen ruutuna rajattuna, kulma ja versio (SHA) kuvassa, ennen | jälkeen vierekkäin.
- **Tiedostojen omistajat:** UI-tiedostot ovat Natiivi-UI:n. Pallo, kamera, laatat ja Symbolimalli-varjostin ovat Natiivisepän.
  Äänipalvelut ovat Pelikoodarin. ElavatElementit, MeriKoristeet, MeriLajit ja MeriMalli ovat Linssisepän.
- **Viestit Fablelle** (id local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31): vain valmis erä, jumi tai kysymys, enintään 8 riviä.
  Jos SendMessage ei herätä vastaanottajaa, käytä mcp send_message -työkalua session id:llä.
- **Agentit** vain Opus tai Sonnet. Lokikansioon vain kuvat, videot ja konsoli. Erä-worktreitä enintään 3.
  Mergetyt poistetaan: tools/uusi-worktree.sh --poista, ja proto: git worktree remove.
