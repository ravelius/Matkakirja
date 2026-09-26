# Linssisepän luovutus 26.9.2026 ilta (g)

*Päivitetty 26.9. klo 20.3x (sessio a00188e3; SendMessage-raja täynnä → varakanava mcp send_message). Linssiseppä (Opus), sessio f0b4fec1, 26.9. klo 09.2x–17.5x. Edellinen: -f.md (sama päivä, jatkettu tähän asti).
Fablen session id: local_5df52e10-10e4-4b72-9554-0049db300dfe. Kontekstin 70 % raja, ja käännöstauko on klo 19.00 asti.*

## Tila lyhyesti

| Aihe | Tila |
|---|---|
| Elävä kartta 4+5 (reitti, hetket), usva 159 | masterissa (build 20–21) |
| Kuljettu reitti katkoviivana, väri B, piilotuskytkin | masterissa (build 21) |
| 162 saapuminen luennan ja kortin jälkeen (+ kuvapakka heti) | masterissa (build 21) |
| Myllyt (kokeilu 1) | build 22, omistaja hyväksyi |
| Karuselli (kokeilu 2): ketjukaruselli, maapohja, hillityt värit, vaihtelu ja tauot | build 23 / 1.0.23 |
| Aito 3D (pop-up pois), puut pois, 90 lamppua | juna fe86446e → 1.0.24 |
| Fonttilämmitys verhon jälkeen, 4 ms/kehys | juna fe86446e → 1.0.24 |
| Fonttilämmitys b: ennakoiva raja, ensimmäinen jäsennys omassa kehyksessään, puuttujat HasCharacterilla | linssiseppa/fonttilammitys-b 6595a5ea, Natiivisepän 1.0.25-jonossa; simulaattori c540fa68: pisin 3,8 ms |
| Kokeilu 3: Pariisin ilmapallo (536 kolmiota) | junassa (2bd6263d), omistaja hyväksyi 20.2x 1.0.26-pelikokeiluun; kuvat lokit/linssiseppa-ilmapallo-20260926-b |
| Kokeilu 4: Venetsian gondolit (~880 kolmiota, kaavamainen S-mutka, 2 gondolia, odotus päissä) | linssiseppa/gondolit 0aaedd6a, käännös ja ajo (ajo-gondolit.sh) käynnissä; sitten kuvapari + video omistajalle ja merge-pyyntö |
| Löydös 172 (kone matalammalle, lähikuvassa vaakasuora) | junassa (99e01a78), omistaja hyväksyi 20.2x; kuvapari lokit/linssiseppa-lento-172-jalkeen |
| Löydös 168 (herätys ilman värjäystä) | linssiseppa/loydos168 41916946 Natiivisepän mergeen 2aba4103:n kanssa |
| Löydös 175 (arkkityypit) | tyyliohje Natiivisepälle 20.1x (sävy, valo, reuna, maapohja, ≤ 40 pt); koodi Natiivisepän |
| ISS-ydin + todellinen rata Astronautin kamerassa (IssNyt, IssTleLataaja, `iss tila\|lataa`) | junassa (684ff5a6); kuvapari lokit/linssiseppa-iss-kaukonakyma-20260926; buildin TLE-kytkentä (tools/iss-tle.mjs) Natiivisepälle/Julkaisijalle |

## Elävät elementit (docs/raportit/elavat-elementit-selvitys-20260926.md)

- **Koodi:** Linssit/Unity/ElavatElementit.cs.
  - Aihe: paikka, KokoPt, Suunta, yksilöt, Runko, Roottori, Lapsi, LastenPaikat, Valot, Animoi(roottori, lapset,
    t, nopeus), PohjaSade, Haalistus ja Vaihtelu(i).
  - Yksilo: oma nopeus, aika ja aikataulu.
  - MalliRakenne (Vaippa, VaippaRaidat, Kansi, Laatikko, Nuppi), MalliVarit (paletti 160 + SageVaalea ja
    TerrakottaHimmea), MaaPohja, MyllyGeometria, KaruselliGeometria.
- **Muut tiedostot:**
  - Varjostin Linssit/Resources/Varjostimet/Malli.shader: kiedottu valo, _Haalistus, _ZTest ja _ZWrite, usva.
  - Linssit/Ydin/Elava/Vaihtelu.cs: siemenellä toistettava käynti ja tauko sekä puuskat. Testit VaihteluTestit.
- **Piirto:** Elava-layer ja ElavaKerros.Animoi 30 fps (Natiivisepän rajapinta, masterissa). Aihe animoi vain, kun
  se on ruudulla (reunavara 12 %) ja 15–600 km:n korkeudella, ja kerros pysähtyy, kun mikään ei liiku.
- **Komennot:** `elava elementit tila | siirra <s> | 0|1` (myös `elava myllyt`). Tila-rivillä yksilön nopeus ja
  seuraava tauko. `siirra` hyppää aikataulussa, joten tauko ja käynti saadaan kuvaan.
- **Yhteiset säännöt** (selvitys 1–8; Fable kirjaa Raamattuun):
  1. yksi aihe kaupunkia kohden
  2. hidas liike
  3. pieni amplitudi
  4. hillitty paletti
  5. näkyvyysikkuna
  6. budjetti ≤ 3 000 kolmiota ja 0,15 ms
  7. vaihtelu ja tauot, ei monotoniaa
  8. maakontakti, ei leijuntaa

  Lisäksi omistajan 17.1x-sääntö: aito 3D kaikille, ylhäältä katto ja kallistettaessa kylki.
- **Omistajan hyväksynnät:** myllyt 15.2x. Karuselli pelikokeilussa (1.0.23/1.0.24): palaute 16.5x ja 17.1x on tehty.
- **Seuraavat kokeilut järjestyksessä:** Pariisin kiinnitetty ilmapallo (Tuileries, nousu ja lasku 24 s, kori heiluu
  5 s, terrakotta, säännöt 7–8, aito 3D) → Venetsian gondolit → Lontoo (maailmanpyörä + Thamesin siipiratashöyry) →
  Chamonixin köysirata ja Etna → Afrikka.
  - Polkudata on valmis: media.matkakirja.app/julisteet/pallo/vektorit/elavat-polut-2026-09-26b/elavat-polut.json
    (Canal Grande, Thames, Tonava, köysirata, Amboseli; pysakit ja kulku).
  - Saharan ja Namibin kulkueet tilataan Karttasepältä, kun Afrikan vuoro tulee.
  - Varalla: Lissabonin raitiovaunu, Prahan Orloj, Tukholman purjevene ja Wienin Riesenrad.
- **HUOM köysirata ja Etna:** mallin juuri on nyt 25 m:n ellipsoidikorkeudessa, joten vuoristossa tarvitaan maaston
  korkeus (korostus 2×).

## ISS-linssi (docs/raportit/iss-linssi-suunnitelma-20260926.md, omistaja hyväksyi 14.4x)

- **Suunnitelman sisältö:** data (TLE Actions 6 h ja buildiin), kolme kameraa (kaukonäkymä, seuranta ja Cupola-ikkuna
  realistisena 420 km:stä), efektit (terminaattori, Black Marble -yövalot, ISS varjossa), offline-porrastus,
  budjetti ja 1873-estetiikka. Astronautin kameran jatkoideat 1–4 ovat ISS-linssin jälkeen.
- **Cupola-kehys** on toimitettu: media.matkakirja.app/karttanostot/20260926/iss-cupola-* (6 PNG:tä, manifesti
  postissa bf8a6101d). Kehys peittää noin 40 % ruudusta. Omistaja hyväksyy kuvaparin, jossa on ikkuna ilman kehystä ja
  kehyksen kanssa.
- **Ydin valmis** (1d2c0872, testit 331/331):
  - Linssit/Ydin/Iss/Sgp4.cs: Tle, Aika, Rata.Sijainti ja Alapiste.
  - Linssit/Ydin/Iss/Aurinko.cs: suunta, alihajapiste ja varjo.
- **TLE:** tilattu Siirtosepältä (ämpäri data/iss-tle.json ja StreamingAssets/mukana/iss-tle.json).
- **Seuraava askel:** vaihda Astronautin kameran havainnollinen rata (Ydin/Astronautti/AstronauttiLinssi.cs rivit
  noin 158–159, Astronauttimatikka.IssPaikka ja IssKaari) todelliseen Rata.Alapiste-rataan. TLE:n latausjärjestys:
  ämpäri → välimuisti → buildin tiedosto → havainnollinen varamalli. Pallo topografiana. Sitten kuvapari
  kaukonäkymästä, Natiivisepältä terminaattori ja yövalot, seuranta ja Cupola (video) ja ylilento.

## Käytännöt ja huomiot

- **Käännöskuri Karttasepän polton aikana** (26.–27.9.): tauko klo 19.00 asti. Sen jälkeen enintään yksi käännös
  tunnissa (:00–:15), erä koossa ja unity-tarkistus 0 virhettä, ja rivi Karttasepälle ennen käännöstä. Ei
  koekäännöksiä eikä simulaattoriasennuksia tauon aikana.
- **Verhomittaus:** ajo-elava.sh VAIHEET=1 lähettää uusi-peli-komennon verhon aikana, jolloin verho osuu 8 s:n kattoon.
  Verho mitataan ilman komentoja ennen "aloitusverho: pois" -riviä.
- **Viestit:** SendMessage-rajan (~10 viestiä/vuoro) täytyttyä käytä varakanavaa mcp__ccd_session_mgmt__send_message
  session id:llä. Omistajaa ei pyydetä välittämään.
- **Skriptit:**
  - Scratchpad f0b4fec1 (/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/f0b4fec1-…/scratchpad):
    ajo-ketju2.sh, ajo-3d-b.sh, ajo-162d.sh, ajo-rajaus.sh, ajo-fontti.sh.
  - Apuskriptit ovat yhä edellisessä scratchpadissa 15ddf057: kaanna.sh, ajo-elava.sh, kuvapari.sh.
- **Worktree:** wt/proto-linssiseppa, nyt haarassa linssiseppa/iss-sgp4. Mergetyt haarat (karuselli, myllyt,
  elementit-3d, fonttilammitys, usva-159, saapuminen-luennan-jalkeen) voi poistaa, kun ne ovat masterissa.
- **Simulaattorit:** linssiseppa-iPhone D0D2… ja iPad 903C… (tyhjennetty 16.5x, sallinnat #3329 mainissa).
