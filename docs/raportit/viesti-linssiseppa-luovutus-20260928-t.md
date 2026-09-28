# Linssisepän luovutus 28.9.2026 (t) — Linssiseppä (Opus) = myös Mallinseppä

*Kirjoitettu klo 19.3x (konteksti 76 %). Edellinen: -s.md. Session id ennallaan.*

**Session id:t:** Päätoimittaja local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 · Julkaisija local_24e63224-112c-449a-b6a3-e10e4ed43f4b ·
Linssiseppä 2 local_e675f86d-210c-416b-8d83-926194307a44 · Natiiviseppä nimellä "Natiiviseppä (max)" · Natiivi-UI nimellä
"Natiivi-UI (Opus)". Kiireiselle sessiolle SendMessage NIMELLÄ.

**Kansiot:** ajot S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/3b1d2bb5-b4ca-4199-b729-a1258297ee0d/scratchpad
(ajo-cl*.sh, kaynnista-cl*.sh, laite-nyt-merkki, venv PIL/numpy/scipy, cupola/ = Codexin terävät Cupola 2 -lähteet).
Koostimet P = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/293b184f-542c-45de-9bcb-c4af6a331331/scratchpad
(koosta_cl10/12/13.py, pari.py, pehmea2/ ja pehmea34/ = poltetut sarjat). Laitekuvat proto-3d/lokit/linssiseppa-laite-20260928-cl{9,10,12,13}/.

## 1. KESKEN (tee ensin)

**cl13 ajossa itsestään** (S/kaynnista-cl13.sh → käännös `linssiseppa/symbolit-3d-luonnollinen f6740687 + linssiseppa/cupola-polyt 878b87ae`,
jonossa 19.26 TestFlight-viennin perässä; laite D0D2CD1E Natiivi-UI:n ja Siirtosepän E2E:n jälkeen, noin 20.0x, Julkaisija luo
S/laite-nyt). Kun ajo on valmis (S/ajo-cl13.out "KAIKKI VALMIS"):
1. `S/venv/bin/python P/koosta_cl13.py /Users/Shared/Claude/proto-3d/lokit/linssiseppa-laite-20260928-cl13` ja katso kuvat.
2. Poista S/laite-nyt ja kerro Julkaisijalle "sammutettu".
3. Päätoimittajalle (≤ 8 riviä): pari-rooma-ylhaalta/-kallistettu/-kauko, pari-visby-kallistettu, pari-msm-kallistettu (ennen 0ff66cfc |
   jälkeen f6740687: maalle + seepia), kolmikko-lasi.png (cl12 0,75 × | uusi 0,4 × | vertailu 0,25 ×) ja polyt-merkitty.png + polyt-raw.mp4
   (rajaa ffmpeg -fflags +igndts; tässä ffmpegissä EI ole drawtextiä → nimiöt PIL-kuvina overlaylla, ks. P/nimio-*.png).
   Lokista rivit "kaupungin viereen suuntaan N°" (maalle-suunnat).

**Hyväksynnän jälkeen merge-pyynnöt Natiivisepälle** (1.0.38 tai seuraava juna, jos BUILD 38 ehti):
- `linssiseppa/symbolit-3d-luonnollinen f6740687`. Omistaja hyväksyi 0ff66cfc:n, mutta pyysi ennen mergeä maalle + paletin.
  Natiiviseppä poisti 0ff66cfc:n junasta (juna/b13 = e12c3d53). Kerro: symbolit-2d 5ac726fd on pohjana, ei erikseen. NostotKartalla.cs
  3 riviä (Natiivi-UI:lle kerrottu).
- `linssiseppa/cupola-polyt` (pohja iss-nopeutus 49f4a21b, joka on jo junassa): c2602f07 pölyt, 83af2fa7 lasi 1,3 ×, 647da098 pölyt
  pehmeiksi, 878b87ae sumennus. Jos omistaja valitsee 0,25 ×, vaihda IssKyytiNakyma.OletusSarja = "pehmea4" ja committaa.
- Web-arvot Pelikoodarille Päätoimittajan kautta: lasin zoom 1,3 × (kenttä 80° → 65,7°, kerrokset 1,3 ×) ja kuvat
  karttanostot/20260928/iss-cupola2-pehmea3-* (tai -pehmea4-*).

## 2. TÄNÄÄN VALMISTA

- **Junassa (juna/b13 e12c3d53):** linssiseppa/iss-nopeutus 49f4a21b (ISS-nopeutus natiivissa + Cupolan ajelehdus f4eb4d34), omistaja
  hyväksyi. Rajapintamuutos IAstronautinNakyma.Kyyti + KyydinAika kerrottu Linssiseppä 2:lle.
- **3D-symbolit (f6740687, raportti docs/raportit/symbolit-3d-kallistus-20260928.md df8082ca0):**
  - 3D-symbolit takaisin (VainErikoismallit false) ja ×1,35.
  - Kallistetun kartan kokovika: koko sidottu katsepisteen etäisyyteen (lähempänä isompi), kasvu k^0,82, katto 0,3 × ruutu.
  - Erikoismallit myös ylhäältä.
  - Kaupungissa oleva erikoismalli kaupunkipisteen viereen. f6740687:ssä suunta valitaan maamaskista (Maamaski, 16 suuntaa,
    kaukaa ja läheltä, lännen etusija), ja erikoismallit ovat varjostimen seepiarampilla (kärjen alfa 0).
  - A/B: `symbolit iso|luonnollinen|kasvu|katto|erikoisylhaalta|sivuun|maalla|seepia|kategoriat3d`.
  - Testit: Kartta-testit 386/386, unity-tarkistus 0.
- **Cupola lähemmäs lasia:** IssKuvakulma.LasiZoom 1,3 (`astro kyyti lasi`), sarjat pehmea2/3/4 ämpärissä, `astro kyyti cupola …`.
  Työkalu proto-3d/tyokalut/linssiseppa-ajot/cupola_pehmea.py (parametrit sarja ja raekoko lisätty).
- **Pölyhiukkaset:** IssKyytiNakyma.Polyt, 34 hiukkasta vinossa keilassa vain auringossa.
  - CupolaKerros.Valo lasketaan nyt aina ikkunassa.
  - Piirto: kuvioitu neliö, säteittäinen hehku.
  - A/B `astro kyyti polyt`.

## 3. AVOIMET

- **Natiivi-UI:lta odotan vastausta** (lähetetty 19.2x):
  1. Nimiöt 3D-mallien kanssa: Visbyn malli peittää Vimmerbyn, ja ison mallin oma nimi katoaa. Ehdotin, että oma nimiö menee mallin
     yläpuolelle ja muut väistävät kalustetta.
  2. Kuuluvatko Trondheim, Salzburg, Krumlov ja Brugge kohdekaupunkeihin? Natiivin kaupungit.json:ssa niitä ei ole.
- **Havainto:** kaupungin maamerkki (Colosseum) näkyy vain pelissä, jossa kohdemaa on Italia; kaupunkipiste suodatetaan muuten
  (PeliSuodatin). cl13 aloittaa siksi pelin Roomasta (sed "uusi-peli 5 rooma").
- **tools/gpu-vapaa.sh** on tässä checkoutissa seurannattomana kopiona mainista, koska ajoskriptit kutsuvat sitä polulla
  Matkakirja-linssiseppa/tools/. Poista, kun haara yhdistää mainin.
- **Worktreet 3/3:** proto-linssiseppa-symbolit2d (symbolit-3d-luonnollinen), -nopeutus (junassa; poista kun masterissa) ja -polyt.
- **Jonossa:** natiivin astroselite webin mallin jälkeen. Kohta 4 (BMNG, Kuu, tähdet) ja Maapallon vuosi ovat Linssiseppä 2:lla.
- **Opit:**
  - Ajoskriptin odotussilmukan jälkeen EI saa kutsua vuoro()-ehtoa uudelleen (cl11 kaatui kilpailutilanteeseen); tarkista vain
    laite-nyt.
  - Painter2D:n sisäkkäiset läpikuultavat ympyrät näyttävät laitteella renkailta.
  - Koko ruudun zoom = kenttäkulma (tan-suhde) + UI-kerrosten skaala samalla kertoimella.
