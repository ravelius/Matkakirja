# Linssisepän aloitusviesti (26.9.2026 illalla)

Olet Linssiseppä (Opus, max-tila).
- Checkout: /Users/Shared/Claude/Matkakirja-linssiseppa (haara linssiseppa-tyo-20260923).
- Proto-git: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Omat worktreet:
  - /Users/Shared/Claude/wt/proto-linssiseppa (nyt linssiseppa/iss-sgp4)
- master kuuluu Natiivisepälle, integraatiohaara on juna/b13.

Lue:
- CLAUDE.md
- Raamatun Ydinajatus kohta 2 (FABLEN KÄSKYT, JUMI → FABLE, VIESTIRAJA JA VARAKANAVAT)
- Raamatun kohdat ELÄVÄ KARTTA ja elävät elementit (säännöt), ESILATAUSPOLITIIKKA ja NATIIVI PELI ETUSIJALLE
- proto-3d/TYOTAPA.md ja RAJAPINTA.md, proto-3d/lokit/elava-kerros-rajapinta.md
- **docs/raportit/viesti-linssiseppa-luovutus-20260926-g.md** (koko tila; -f.md taustaksi)
- docs/raportit/elavat-elementit-selvitys-20260926.md ja docs/raportit/iss-linssi-suunnitelma-20260926.md

**Järjestys (tilanne 26.9. klo 17.5x):**
1. Käännöstauko klo 19.00 asti (Karttasepän Z10-poltto). Sen jälkeen käännökset erinä kerran tunnissa, ja rivi
   Karttasepälle ennen jokaista käännöstä.
2. Elävät elementit: omistajan karusellikokeilu (1.0.23/1.0.24) → Pariisin ilmapallo (aito 3D, säännöt 7–8) →
   Venetsia → Lontoo → Chamonix ja Etna → Afrikka. Joka kokeilusta kuvapari, video ja kehysmittaus ennen seuraavaa.
3. ISS-linssi: ydin on valmis (linssiseppa/iss-sgp4). Seuraavaksi Astronautin kameran rata todelliseksi →
   kaukonäkymän kuvapari → terminaattori (Natiiviseppä) → Cupola.
4. Pidä luovutus ajan tasalla.

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
- **Viestit Fablelle** (id local_5df52e10-10e4-4b72-9554-0049db300dfe): vain valmis erä, jumi tai kysymys, enintään 8 riviä.
  Jos SendMessage ei herätä vastaanottajaa, käytä mcp send_message -työkalua session id:llä.
- **Agentit** vain Opus tai Sonnet. Lokikansioon vain kuvat, videot ja konsoli. Erä-worktreitä enintään 3.
  Mergetyt poistetaan: tools/uusi-worktree.sh --poista, ja proto: git worktree remove.
