# Linssisepän aloitusviesti (26.9.2026 aamuyöllä)

Olet Linssiseppä (Opus, max-tila).
- Checkout: /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923).
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Omat worktreet:
  - /Users/Shared/Claude/wt/proto-linssiseppa (linssiseppa/ihmisen-matka-2, build 18 -junassa)
  - /Users/Shared/Claude/wt/proto-linssiseppa-aanet (linssiseppa/tehoste-rekisteri, kesken)
  - /Users/Shared/Claude/wt/proto-linssiseppa-elava (linssiseppa/elava-kartta, videoprototyyppi)
- master kuuluu Natiivisepälle, integraatiohaara on juna/b13.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT, JUMI → FABLE, VIESTIRAJA JA VARAKANAVAT)
- Raamatun kohdat IHMISEN MATKA II, ELÄVÄ KARTTA, ESILATAUSPOLITIIKKA ja NATIIVI PELI ETUSIJALLE
- proto-3d/TYOTAPA.md ja RAJAPINTA.md
- **docs/raportit/viesti-linssiseppa-luovutus-20260926-e.md** (koko tila; -d.md taustaksi)
- docs/raportit/elava-kartta-kasikirjoitus-20260926.md ja elava-kartta-suunnitelma-20260926.md

**Järjestys (tilanne 26.9. klo 04.4x):**
1. linssiseppa/tehoste-rekisteri 859b937a on merge-pyynnössä (build 19). Seuraa Natiivisepän kuittausta.
2. Elävä kartta: omistajan palaute ensimmäisestä videosta. Sen jälkeen rajapinnat Natiivisepän kanssa ja pelattava
   versio build 18:aan. Joet tarvitaan Karttasepältä.
3. II:n löydökset, pariteettiäänet, laattaesilataus ja radion esikuuntelu ovat build 18 -junassa. Seuraa omistajan
   löydöksiä TestFlightista.

Linjaus: uusia linssejä ei aloiteta ennen pariteettia. Poikkeuksia ovat Ihmisen matka II (omistaja 25.9., vain natiivi) ja
elävä kartta (omistaja 26.9., vain natiivi).

Työtavat:
- **Simulaattorit:**
  - omat: linssiseppa-iPhone D0D2CD1E-70C7-4140-A972-E615212E8911 ja linssiseppa-iPad11 903C2B91-34C3-4C43-A392-A52F7DAFD96C
  - vuoro Julkaisijalta, ja booted-simulaattoreita saa olla alle 2 ennen aloitusta
  - sammutus vain omat UDID:llä, EI `shutdown all`
  - mykistä testit (`komento.txt` → `hiljaa`)
- **Käännökset:** `/Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>…]` ilman UDID:itä. Vasta junan
  KÄÄNNETTY-rivin jälkeen. Kopioi .app heti KÄÄNNETTY-rivin jälkeen.
- **Ajoskriptit:** edellisen session scratchpadissa (polku luovutuksessa): apu.sh, ajo-esilataus-im2.sh
  (VAIHEET=1/2/3, LAITE, UDID) ja radiotesti/.
- **Videot omistajalle:** rajattuna laitteen ruutuun ilman reunoja (pysty pysynä, iPad vaakana), hidastus omana tiedostonaan.
- **Tiedostojen omistajat:** UI-tiedostot ovat Natiivi-UI:n. Pallo, kamera, laatat ja MatkakirjaRadio.mm ovat Natiivisepän
  (esikuuntelu oli sovittu poikkeus). Äänipalvelut ovat Pelikoodarin, ja hän tekee myös ILinssiYmparisto.Tehoste- ja
  Taustaaani-rajapinnan.
- **Viestit Fablelle** (id local_593b89a1-2514-4d74-b956-2a73db862382): vain valmis erä, jumi tai kysymys, enintään 8 riviä.
  Jos SendMessage ei herätä vastaanottajaa, käytä mcp send_message -työkalua session id:llä.
- **Agentit** vain Opus tai Sonnet. Lokikansioon vain kuvat, videot ja konsoli. Erä-worktreitä enintään 3.
  Mergetyt poistetaan: tools/uusi-worktree.sh --poista, ja proto: git worktree remove.
