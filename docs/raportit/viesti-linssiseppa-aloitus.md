# Linssisepän aloitusviesti (26.9.2026 myöhäisilta)

Olet Linssiseppä (Opus, max-tila) ja omistajan päätöksellä (22.2x) myös Mallinseppä.
- Checkout: /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923).
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Omat worktreet:
  - /Users/Shared/Claude/wt/proto-linssiseppa (nyt linssiseppa/hoyrylaiva)
  - /Users/Shared/Claude/wt/proto-mallinseppa (nyt mallinseppa/pohja, erikoismallit)
- master kuuluu Natiivisepälle, integraatiohaara on juna/b13.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT, JUMI → FABLE, VIESTIRAJA JA VARAKANAVAT)
- Raamatun kohdat ELÄVÄ KARTTA ja elävät elementit (säännöt), ESILATAUSPOLITIIKKA ja NATIIVI PELI ETUSIJALLE
- proto-3d/TYOTAPA.md ja RAJAPINTA.md, proto-3d/lokit/elava-kerros-rajapinta.md
- **docs/raportit/viesti-linssiseppa-luovutus-20260927-i.md** (koko tila; -h.md taustaksi)
- Mallinsepän tehtävä: `git show origin/mallinseppa-tyo-20260926:docs/raportit/viesti-mallinseppa-aloitus.md`,
  rajapinta proto-3d/lokit/mallinseppa-rajapinta.md, speksit docs/raportit/erikoismallit/*.md ja erikoismalli-speksi-pohja.md

**Järjestys (omistaja 22.3x, Fable):**
1. Kolme erikoismallia (Mont-Saint-Michel, Stonehenge, Colosseum; koodi mallinseppa/pohja 9bb99488) → käännös
   Natiivisepän kautta → laitekuvat (3 kulmaa isona + 10 s video) → rivi Fablelle → PYSÄHDY omistajan tarkastukseen.
2. Meren koristeet: kokeilu höyrylaiva + valas Norjan länsirannikolla (kartta/merikohdat.json, lista hyväksytty).
3. Lento v3 -speksi docs/raportit/lento-v3-speksi.md (saa tehdä agentilla rinnalla, vain Opus/Sonnet).
4. Elävät elementit (linssiseppa/hoyrylaiva b59c99b0) on merge-pyynnössä 1.0.27-junaan: tarkista, että meni.
5. Pidä luovutus ajan tasalla.

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
  (VAIHEET=1/2/3, LAITE, UDID) ja radiotesti/. Erikoismallien esikatselu ilman Unityä:
  /Users/Shared/Claude/proto-3d/tyokalut/mallinseppa-esikatselu/ (kaanna.sh, msm.py/sh.py/co.py, video.py).
- **Videot omistajalle:** rajattuna laitteen ruutuun ilman reunoja (pysty pysynä, iPad vaakana), hidastus omana tiedostonaan.
- **Tiedostojen omistajat:** UI-tiedostot ovat Natiivi-UI:n. Pallo, kamera, laatat ja MatkakirjaRadio.mm ovat Natiivisepän
  (esikuuntelu oli sovittu poikkeus). Äänipalvelut ovat Pelikoodarin, ja hän tekee myös ILinssiYmparisto.Tehoste- ja
  Taustaaani-rajapinnan.
- **Viestit Fablelle** (id local_5df52e10-10e4-4b72-9554-0049db300dfe): vain valmis erä, jumi tai kysymys, enintään 8 riviä.
  Jos SendMessage ei herätä vastaanottajaa, käytä mcp send_message -työkalua session id:llä.
- **Agentit** vain Opus tai Sonnet. Lokikansioon vain kuvat, videot ja konsoli. Erä-worktreitä enintään 3.
  Mergetyt poistetaan: tools/uusi-worktree.sh --poista, ja proto: git worktree remove.
