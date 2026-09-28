# Linssisepän luovutus 28.9.2026 (s) — Linssiseppä (Opus) = myös Mallinseppä

*Kirjoitettu klo 17.2x (konteksti 77 %). Edellinen: -r.md. Session id ennallaan.*

**Session id:t:** Päätoimittaja local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 · Julkaisija local_24e63224-112c-449a-b6a3-e10e4ed43f4b ·
Pelikoodari local_11aca9cd-eda6-4db9-9019-8a153c8b8795 · Siirtoseppä local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4 ·
Karttaseppä local_16f80454-5b30-4180-ae9b-8c6d1edb6779 · Linssiseppä 2 local_e675f86d-210c-416b-8d83-926194307a44 ·
Natiiviseppä nimellä "Natiiviseppä (max)" (uusi sessio 28.9. iltapäivällä). SendMessage session id:llä toimii.

**Scratchpad** S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/3b1d2bb5-b4ca-4199-b729-a1258297ee0d/scratchpad
(ajo-cl4…cl9.sh, arkki.py, venv numpy/scipy/PIL, npm/sharp, pilvet/, cupola/). Laitekuvat /Users/Shared/Claude/proto-3d/lokit/linssiseppa-laite-20260928-cl{4..9}/.

## 1. KESKEN (tee ensin)

**cl9 odottaa laitevuoroa.** Käännös on jonossa 17.17 alkaen: linssiseppa/symbolit-2d + linssiseppa/iss-nopeutus (S/kaanna-cl9.out).
Ajo `S/ajo-cl9.sh` lähtee itse, kun Julkaisija luo tiedoston `S/laite-nyt`. Julkaisijan mukaan vuoro tulee Natiivi-UI:n
loitonnuskuvien jälkeen, noin klo 17.5x. Ajo sammuttaa D0D2CD1E:n itse. Sen jälkeen:
- Kerro Julkaisijalle "D0D2CD1E sammutettu" ja poista `S/laite-nyt`.
- Kopioi Unityn .metat `S/cl9-metat/`-kansiosta haaraan linssiseppa/iss-nopeutus (Simukello.cs, Ylilento.cs,
  Kehyskello.cs) worktreessä -nopeutus ja committaa.

**cl9:n tulokset Päätoimittajalle:**
1. **3D-symbolit pois** (omistaja 17.2x): `italia-{ennen,jalkeen}.png` ja `tsekki-{ennen,jalkeen}.png`.
   - Koosta tools/…/koosta_pari.py:llä: kulma 45°, versio 5ac726fd.
   - Lisää yksi rivi siitä, millä zoomilla erikoismallit näkyvät. Tarkistettu koodista (Symbolimallit.KulmaSallii ja
     YlhaaltaKelpaa): erikoismallit piirtyvät vasta, kun kartta on kallistettu yli 25° (kaksi sormea) ja kerroin on
     vähintään 1,25 (pienissä maissa 0,9 × suurin). Ylhäältä ne eivät näy, siksi omistaja ei ole nähnyt niitä.
   - Suositus Päätoimittajalle: salli erikoismallit myös ylhäältä liioitellulla perspektiivillä
     (YlhaaltaKelpaa: `t.Erikois != null`), yhden rivin muutos.
   - Kun kuvapari on hyväksytty, lähetä MERGE-PYYNTÖ Natiivisepälle 1.0.38:aan: linssiseppa/symbolit-2d 5ac726fd (pohja
     master BUILD 37). Kartta-testit 377/377, unity-tarkistus 0, paluu komennolla `symbolit kategoriat3d 1`.
2. **Cupolan painoton ajelehdus** (omistaja 16.3x): video `cupola-ajelehdus-raw.mp4` ja kuva.
   - Omistajan mediasääntö: PNG-pysäytyskuvat laitteen ruutuna, video vain liikkeelle ja rajattuna ruutuun
     (ffmpeg -fflags +igndts).
   - Toteutus: iss-nopeutus f4eb4d34, IssKyytiNakyma.Ajelehdi. Kehys ja heijastus siirtyvät ≤ 8/7 pt, skaala 1,08 ± 0,015,
     kallistus ≤ 0,5° ja jaksot 23–47 s. Ulko-osat liikkuvat 1/10, maa pysyy paikallaan. Vähennetyllä liikkeellä pois,
     A/B `astro kyyti ajelehdus 0|1`.
3. **ISS-nopeutus natiivissa** (Opus-agentti, web 891958e17): kyyti-5-nopeutus-100x, kyyti-palaa-live,
   kyyti-kelaus-venetsia, kyyti-6-ylilento-venetsia.
   - Kuvapari webin kanssa: Pelikoodarin kuvat proto-3d/lokit/iss-kyyti-web/.
   - Linssit-testit 381/381.
   - Rajapintamuutos: IAstronautinNakyma.Kyyti sai viidennen parametrin KyydinAika. Kerro Linssiseppä 2:lle ennen mergeä.

**Tekemättä Päätoimittajan 16.3x-käskystä:** pölyhiukkaset auringonsäteessä vain päiväpuolella.
- Toteuta IssKyytiNakyma-näkymään (haara iss-nopeutus): Painter2D, 30–40 pehmeää hiukkasta, kirkkaus vinossa valokeilassa.
- Päivä/yö ISS:n varjosta, katso CupolaKerros/CupolanValo.
- Vähennetyllä liikkeellä paikallaan.
- Leijuva kamera siirtyi Pulun avaruuskävelyyn, joten Codex-tilausta EI lähetetty (luonnos S/codex-tilaus-esineet.md).
  Kynä on valinnainen.

## 2. VALMISTA JA HYVÄKSYTTYÄ TÄNÄÄN

- **1.0.37-juna** (Natiiviseppä): linssiseppa/symbolit-lippu 6e5ccf55 sekä linssiseppa/iss-kyyti 411b0bc7 ja jatko 1e773968.
  - Cupola 2 pehmeä + rae, poltettu itse: karttanostot/20260928/iss-cupola2-pehmea-*, työkalu tyokalut/linssiseppa-ajot/cupola_pehmea.py.
  - Lippu: saapuessa 120 pt ja kasvu neliöjuurena.
  - Kaupunkien valot 60 % (0,96).
  - Pilvet näkyvät kyydissä peitolla 0,9 (Päätoimittajan päätös).
  - Pilvet himmentävät valot ja heijastuksen, ja yöllä pilvet ja vesi ovat tummia.
  - Pituuden peilausvika korjattu (b3186915).
- **Data:** pilvien minimikooste #3555 ja pehmeät reunat #3566 on mergetty, ja iss-pilvet on ajettu.
- **Web:** Pelikoodari ce3c13cf5 (Cupola pehmeä). Siirtoseppä 4254ceea0: realismi 1–3 ja valot 60 %; yökuori ja valot ovat
  webissä Siirtosepän koodia.
- **Kohta 4 (BMNG, Kuu, tähdet) ja Maapallon vuosi** ovat Linssiseppä 2:lla.
  - Tiedostojako on sovittu: Yokuori, Avaruus/Ilmakaari, Pilvikuori, Revontulet, IssKyytiNakyma, CupolaKerros ja Lipputanko
    ovat minun.
  - Heidän korjauksensa: KyydinTahdet-varjostimen _Kierto oli nolla SRP-batcherissa, korjaus af358263.
  - Opittu sääntö: jokainen UnityPerMaterial-muuttuja tarvitsee Properties-rivin.
- **Suunnitelma ja arvot webille:** docs/raportit/iss-realismi-suunnitelma-20260928.md.

## 3. AVOIMET

- **Heijastuksen kuvapari puuttuu.** Seurannan heijastusgeometria (aurinko edessä noin 35°, alla merta) toteutuu vasta
  lokakuun lopulla. Testikello `astro kyyti kello kiilto` hakee sen 35 vrk:n päästä (7d754da3). Ikkunassa heijastus jää
  kehyksen taakse.
- **Revontulet:** ei näkyvää aktiivisuutta testihetkillä. Kuvapari odottaa aktiivista yötä.
- **Worktreet 3/3:** /Users/Shared/Claude/wt/proto-linssiseppa-{astro,nopeutus,symbolit2d}.
  - astro: iss-kyyti on junassa; poista, kun juna on masterissa.
  - symbolit2d: poista merge-pyynnön jälkeen.
- **Muistihakemisto** MEMORY.md on 21 kt (raja 24). Tiivistin Linssisepän rivit, ja muiden roolien karsinta kuuluu Päätoimittajalle.
- **Opit:**
  - Unityn maailma on vasenkätinen, joten ECEF Y annetaan C#:sta eikä lasketa cross(z, x):llä.
  - A/B-kuviin vähintään 5 s tauko, kun kerros lisätään uudelleen (laatat latautuvat).
  - Automaattitilan tarkistin voi pudota: 10 perättäistä virhettä päättää vuoron.
