# Pelikoodari: luovutus 1.11.2026 klo 12.58 (konteksti 25 %, pehmeä raja)

Edellinen: -20261101-0650 (sen Kesken 1–2 tehty, 3 = tallenne valmisteltu). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktreet (ei originia):
- wt/proto-pelikoodari-reitti-216 (haara pelikoodari/reitti-216, kärki **3d05d3640**)
- wt/proto-pelikoodari-yhd-216 (haara pelikoodari/reitti-216-yhd, kärki **8f2bfd128** = NS mergesi junaan 216, runko 655f80e81)
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/ (sauma/, tallenne/, tyolista-havainne-jaljella.txt).

## Valmista tässä vuorossa
- Sauma-uusinta v89e: EI korjaantunut (vinot kolmiot y −0,04…−0,76) → LAV teki v89f → eb8110427 TaustaKansio → kielletty-tausta-v89f.
  Ajo esikatselu-20261101-071954: portin edusta y 0, laattarivit jatkuvat, Puyi/kamera ei hyppää tunnelin suulla. PT kuittasi.
  Kuvat sauma/m-loppu-v89f-lattia.png, sauma/arkki-v89f-b104-b119.jpg; havainnot sauma/sauma-havainnot.txt.
- reitti-216-yhd: + v89f (dd8e36b76) + liikevahtikorjaus d5eceb50b (8f2bfd128) → NS mergesi junaan 216 (655f80e81, testit 2223/787/581).
- REAALIAIKATALLENNE (PT 07.4x, kuitattu 07.5x): Esikatselu.cs uudet komennot tallenne-alku <nimi> [videon fps 30] [leveys 1376],
  tallenne-loppu, odota-peli <s>, hyppy-jos <merkki> <ehto>, merkki <nimi> (1a94eac8b, 3d05d3640). Editori pysäytetään ja askelletaan
  (EditorApplication.Step) → yksi kuva per peliruutu, 0 ohitettua. HUOM: askel = fixedDeltaTime 0,02 s (captureDeltaTime ei vaikuta)
  → kuvien fps (50) mitataan peliajasta nimi/fps.txt:hen; tyokalut/tallenne-video.sh koodaa reaaliaikaisena 30 fps:llä.
  Skenaario tallenne/sk-tallenne.txt: A = reitti maaliin (elinvoima-apu 2 s peliajan välein, hyppy-jos maali) + odota-peli 11
  (maalinousu, ovet) + kuva3d a-loppu; B = sivueunukit s0–s2. Koeajo esikatselu-20261101-073912 → tallenne/koe-reitti.mp4 (135 s),
  koe-sivu.mp4 (94 s). Yksi komento: zsh tallenne/aja-tallenne.zsh (odottaa vapaan koneen, ajaa, tekee videot <aika>-reitti/-sivu.mp4).
  Tallenne on Macin Unity-editorissa, EI simulla (simu-lukko ei koske sitä).
- Työlistan "seinät, koristeet ja taivas" PK-osuus PT:lle (tyolista-havainne-jaljella.txt); PT poisti SSAO:n ja taivas 8192:n.

## Kesken / seuraava
1. V4-KYTKENTÄ (PT 13.0x + 13.1x): kun JU vahvistaa ämpärin (tarkista: curl 200 maailma-v4/kielletty-rakennukset-v91/rakennukset.json,
   kielletty-c2-v31/c2-sijoitukset.json, kielletty-muurikate-v37/kk-muurikate-v26-pohja.glb):
   `python3 /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/tallenne/kytke-v4.py /Users/Shared/Claude/wt/proto-pelikoodari-reitti-216`
   (RakennusKansio v90 → v91, MuurikateC2Kansio c2-v30 → c2-v31, MuurikateC3Kansio + MuurikateTiedosto v36 → v37; SHA:t PT:n viesteistä).
   Ovikoodi valmis (ab0c93256: AvaaOvet, PorttiOvet ovi_V/ovi_O myös kaiteettomasta LOD0:sta). Sitten tyokalut/tarkista.sh + liikevahti,
   commit, sama yhd-haaraan (cherry-pick) → merge-pyyntö NS:lle (NS local_99130238-…).
2. TALLENNE v4-valolla: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/reitti-216/tallenne/aja-tallenne.zsh (taustalla, ~11 min).
   Tarkista lokista "ovi aukeaa … a-meridiaaniportti" (EI "maaliportissa ei ovia"), "tallenne … valmis … ohitettuja peliruutuja 0",
   ja v89f:n mahdollinen kaukovälkyntä portin edessä (lod1/2 limittäiset kerrokset, LAV ei tarkistanut). Video PT:lle (PT vie KK:lle).
3. RAKENNUKSET-V92 (LAV avoin: v91 + edusta-v3), kun LAV toimittaa → polku.
4. Vanha Kesken 4 (botin uupuminen, elinvoima-apu kuva-ajoissa) ennallaan.
Huom. esikatselu.sh ajaa haaran KÄRJEN → commit ennen ajoa. Taustavahti b7dlxesqt (v91/c2-v31-odotus) kuolee nollauksessa: tarkista itse.
