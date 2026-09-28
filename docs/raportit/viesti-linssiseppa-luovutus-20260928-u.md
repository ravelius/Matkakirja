# Linssisepän luovutus 28.9.2026 (u) — Linssiseppä (Opus) = myös Mallinseppä

*Kirjoitettu klo 22.3x (konteksti 70 %, Päätoimittajan nollaus). Edellinen: -t.md. Session id ennallaan.*

**Session id:t:** Päätoimittaja local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 · Julkaisija on nyt "Julkaisija (Sonnet)" (uusi sessio
28.9. illalla, id ListAgentsista) · Linssiseppä 2 local_e675f86d-210c-416b-8d83-926194307a44 · Natiiviseppä "Natiiviseppä (max)" ·
Natiivi-UI "Natiivi-UI (Opus)" · Siirtoseppä "Siirtoseppä (Opus)". Kiireiselle sessiolle SendMessage NIMELLÄ.

**Kansiot:** ajot S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/3b1d2bb5-b4ca-4199-b729-a1258297ee0d/scratchpad
(ajo-cl*.sh, kaynnista-cl*.sh, laite-nyt-merkki, venv PIL/numpy/scipy, cupola/ = Codexin terävät Cupola 2 -lähteet).
Tämän session työkalut X = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/fbfdd1ac-702d-4ca6-83d7-8662bbba2a53/scratchpad:
koosta_cl13/14/16/17.py, video_nimio.py (pystyvideo 1600 px + PIL-nimiö, -fflags +igndts), pilvet_esik.py (pilvien terävöinti
numpylla), horisontti_render.py ja pyorea_render.py (Cupola-luonnokset ilman simulaattoria: BMNG z6 -laatat X/bmng/, polun y on
XYZ eli pohjoisesta), reunavalo/ (reunavalokuvat). Laitekuvat proto-3d/lokit/linssiseppa-laite-20260928-cl{13,14,15,16}/.

## 1. KESKEN (tee ensin)

**Cupolan rajaukset: omistajan uusi suunta on pyöreä kattoikkuna tiiviisti rajattuna, pystyyn ja vaakaan omat rajaukset.**
- Omistaja 28.9. klo 21.5x mainosvideon ISS-ikkunasta: "tuossa elää auringon valo ikkunanpokissa. ainakin tuo että on todella pimeää
  ohjaamossa tuo tunnelmaa … yksi iso ikkuna olisi pääosassa ja sivuikkunat näkyisivät vähän". Horisonttiluonnoksen jälkeen
  klo 22.5x: "voisiko ennemmin käyttää sitä pyöreää ikkunaa ja rajata se lähelle? toimisi aika hyvin vähän eri rajauksella pysty ja
  vaaka muodossa".
- Proto `linssiseppa/cupola-horisontti` 8852e368, pohja natiiviseppa/juna-1040. Worktree /Users/Shared/Claude/wt/proto-linssiseppa-horisontti.
  - `IssKuvakulma.IkkunanRajaus` Pyorea (oletus) | Horisontti | Katto, A/B `astro kyyti rajaus pyorea|horisontti|katto`.
  - PYÖREÄ: kattoikkuna (Cupola 2 -kuvan alfa-aukko, keskus 603, 1322, halkaisija ~605) täyttää 94 % ruudun lyhyemmästä sivusta,
    ja karmi näkyy reunoilla. Vaakana kerrossäiliö `kupu` käännetään 90°. Katse 55°.
  - HORISONTTI (A/B, e711cf84 + korjaus f12d34bf): yläikkuna 2,3 ×, katse 36°. Musta yläkaista korjattiin Päätoimittajan käskystä,
    ja kehys täyttää nyt ruudun.
  - KATTO = 1.0.40:n koko kupoli (pehmea4, lasin zoom 1,3).
  - Rajauksissa kehys tummennetaan × 0,22, ja käytetään terävää kuvaa (sarja "", koska ~2 × suurennos pehmentää jo).
  - Auringonvalo pokissa: neljä reunavalokerrosta (ämpäri karttanostot/20260928/iss-cupola2-reunavalo-{oikea,vasen,yla,ala}-iphone-…)
    painotetaan auringon ruutusuunnalla (CupolaKerros.Valo, käännetyssä kuvussa L = (−y, x)). Alhaalta tulee lisäksi sininen
    maavalo (CupolaKerros.MaavaloNyt).
  - Työkalu proto-3d/tyokalut/linssiseppa-ajot/cupola_reunavalo.py.
  - A/B myös `katse <astetta>|pois`, `tumma <0–1>` ja `reunavalo 0|1`.
  - Testit: Linssit 394/394 (IkkunanRajaukset), unity-tarkistus 0.
- Luonnokset on lähetetty Päätoimittajalle:
  - lokit/linssiseppa-luonnos-20260928-pyorea/pari-pysty.png ja pari-vaaka.png
  - lokit/linssiseppa-luonnos-20260928-horisontti/
- **AAMULLA laiteajo cl17** (Julkaisija siirsi yötauon takia; pyydä vuoro Julkaisijalta (Sonnet)):
  1. `nohup zsh S/kaynnista-cl17.sh &` (käännös jonottaa lukkoon, laiteajo odottaa S/laite-nyt).
  2. Ajo kuvaa pystyn ja vaa'an rajauksilla katto | pyöreä | horisontti (UI-komento `kierto vaaka|pysty` ui-komento.txt:llä),
     pyöreän ilman reunavaloa, pölyt, 100 × -videon, yön ja kohteen ylle -lennon.
  3. Sen jälkeen `S/venv/bin/python X/koosta_cl17.py <L>` ja video X/video_nimio.py.
  4. Kuvaparit (pysty + vaaka, nyt | pyöreä) Päätoimittajalle, laite-nyt pois ja "sammutettu" Julkaisijalle.
- **Codexin Cupola 3** on tilattu (posti/fable-codex-iss-ohjaamo-20260928.md 53ab2a0c5). Pääikkuna muutettiin pyöreäksi kattoikkunaksi
  (0eb761cb8). Kun kerrokset tulevat (ohjaamo, auringonvalo pokissa, heijastus, ikkunamaski; pysty ja vaaka), ohjaamo korvaa
  kehys2:n rajauksineen ja valokerrokset korvaavat reunavalokuvat. Rakenne (kupu, 4 valokerrosta ja Valo-painotus) on valmis.
- Hyväksynnän jälkeen merge-pyyntö Natiivisepälle: cupola-horisontti (pohja juna-1040, merge-tree puhdas Linssiseppä 2:n
  linssiseppa2/kyyti-saatimet 071a71fc:n kanssa). Web-arvot Pelikoodarille/Siirtosepälle Päätoimittajan kautta.

## 2. TÄNÄÄN VALMISTA

- **1.0.40-juna:** merge-pyynnöt Natiivisepälle, jotka on mergetty sivuhaaraan natiiviseppa/juna-1040 (siirtyy junaan BUILD 39:n
  jälkeen):
  - symbolit-3d-luonnollinen 9ed9288f: erikoismalli maalle + seepia, Colosseum maalla 100 %, Visby ei peitä Vimmerbyä.
  - cupola-polyt 616dd193: pehmea4 = 0,25 × oletukseksi, pölyt, lasi 1,3 ×.
  - pilvet-tarkat cc513896.
- **Terävät pilvet kyydissä** (cc513896): Cupolan "Vielä liikaa blurrina" johtui päivän pilvikuvasta (4096 px ≈ 10 km/px, ja
  Cupolassa yksi tekseli venyi 30–50 px:ksi), ei kehyksestä.
  - Pilvet.shader: bikuubinen näyte ja kohinakynnyksen reuna, vain kyydissä.
  - Kaavat iss-realismi-suunnitelman kohdassa 2b.
  - Web: Siirtoseppä siirsi a25900c8c:ssä (4096 × 2048 R8).
- **Laiteajot:** cl13 (maalle + seepia, Cupola 0,75/0,4/0,25 ×), cl14 (pilvet, nimiöt v1), cl15 (iPad), cl16 (nimiöt v2).
- **Kohdekaupungit:** Trondheim, Salzburg, Krumlov ja Brugge eivät ole kohdekaupunkeja (Päätoimittaja), eikä kaupungit.json:iin
  lisätä mitään.

## 3. AVOIMET

- **Natiivi-UI:n nimiöt** (natiivi-ui/mallin-nimiot): v2 9ff0e9d6 laitteella cl16. Vasemman laidan nimiöt palasivat, mutta
  Visbyn laatikkoon lukittuu "Spillingsin kätkö", ja Krumlovin nimiö puuttuu, vaikka loki sanoo "yla näkyy".
  - Ohjeistin: `Symbolimallit.LisaaKalusteet(ulos, avaimet)` palauttaa laatikon omistajan p.Key:n, ja oma = avain == m.Id
    geometrisen haun sijaan (hyväksyin Symbolimallien puolesta).
  - Aja korjaus S/kaynnista-cl16.sh-kaavalla ja lähetä kolmikko Natiivi-UI:lle ja Päätoimittajalle (X/koosta_cl16.py).
- **Worktreet 3/3:** proto-linssiseppa-pilvet (cc513896, mergetty juna-1040:een, poistettavissa) ja -horisontti (työn alla).
- **tools/gpu-vapaa.sh** on tässä checkoutissa seurannattomana kopiona mainista. Poista, kun haara yhdistää mainin.
- **Jonossa:** natiivin astroselite odottaa Raamattu PR #3527:ää (auki). Kohta 4 (BMNG, Kuu, tähdet) ja Maapallon vuosi ovat
  Linssiseppä 2:lla. Linssiseppä 2:n kyyti-säätimet (pilvipeitto, vuodenaika, oma sijainti) koskevat samoja tiedostoja, eikä
  ristiriitoja ole.
- **Opit:**
  - UI-kerroksiin ei voi tehdä additiivista valoa: alfasekoitettu lämmin valo tumman kehyksen päällä näyttää lähes samalta.
  - Cover-kuvan rajaus lasketaan elementin layoutista: ruutu = c + siirto + z (p − c).
  - Pystykuva vaakaruudulla: käännä säiliö 90°.
  - BMNG-pyramidin polun y on XYZ (pohjoisesta). Pelin {reverseY} vastaa sitä Cesium Nativen sisäisen y:n takia.
  - Yötauko: tarkista klo 22.30 ennen käännöksiä ja simulaattoreita. Julkaisija päättää vuorot.
