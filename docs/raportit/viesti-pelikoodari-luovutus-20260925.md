# Pelikoodarin luovutus 25.9.2026 aamu (klo 06)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260925-yo.md`. Merge-pyynnöt, mitat ja kuvaparit:
`/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md`.

## 1. PÄÄTEEMA build 13: LIIKKUMISEN JA REITTIEN PARITEETTIKIERROS (Fable klo 04.5x)
- **Lista:** `docs/raportit/liikkuminen-pariteetti-20260925.md`. Luku 1 on Laitetestaajan kuvauskäsikirjoitus J1–J5,
  luku 2 tarkistuslista osioittain (A noppa, B matka ja reitit, C saapuminen, D Maailma).
  - 41 ERI- ja 13 PUUTTUU-riviä; 37 on merkitty KORJATTU haarassa (ei vielä simulaattorissa todennettu).
  - B25 (lennon elokuvakamera) on hyväksytty poikkeama (Fable).
- **Rivijako:** Pelikoodari = pelilogiikka ja PeliOhjain, Natiiviseppä = kamera, pallo ja reitit 3D:ssä, Natiivi-UI =
  näkymät, kuplat ja lehti. Sarake "Korjaaja".
- **Haara `pelikoodari/liikkuminen`, kärki fb0a30e** (proto-git; worktree `/Users/Shared/Claude/wt/proto-pelikoodari-liikkuminen`,
  pohja juna/b13 + natiiviseppa/reitit-b13 + natiiviseppa/saattokamera). kaanna 274/274, unity-tarkistus 0.
  - 55: automaattiheitto 0,75 s (`PeliOhjain.Automaattiheitto.cs`).
  - 53/54, A7, C14: VaiennaPaikanPuhe ja LuentoOhitettu (`PeliOhjain.Paikka.cs`). Natiivi-UI kytki
    PaikanPuheVaiennettu ja LiukuAuki haarassa natiivi-ui/paikan-puhe b3bf99c.
  - 58, D4/D5: Matka.KehittajaSiirto ja MaailmaHyppy (testi KehittajaSiirtoKuinWeb).
  - 57/60, B1–B11: matkareittien valinta (`PeliOhjain.Matkareitit.cs`), kytketty Reitit.NaytaPeli,
    PeliApu.ReittiPiste (B7) ja KaupunkiMerkit.PeliOhjaaReitit.
  - D15: PeliSuodatin.
  - A20/A21/B12–B16: Nappula.Matkaliike ja MatkanKesto. B21: Laskeutui → step/arrive.
  - A10: 260 ms tauko. D13: kortin Mannerlento-rivi pois. C4: trailerin ehto. B20: bussi soi metsää.
- **Muiden haarat samaan junaan:**
  - natiiviseppa/kohdesovitus 8961981 (56)
  - natiiviseppa/maarajat 8c8ea63 (D7/D8/D11). Natiiviseppä lisää `kierto.MaailmaTila = Paavalikko.Maailma` PeliOhjaimeen.
  - natiivi-ui/saapuminen-ei-lehtea e8c0c51 (59)
  - natiivi-ui/paikan-puhe b3bf99c
- **KESKEN:**
  1. Todennus simulaattorissa: `proto-kaanna.sh juna/b13+pelikoodari/liikkuminen A2FD9C9F… 88939C12…` oli jonossa klo 06
     (tarkista loki `proto-3d/lokit/kaannospalvelu/`, aja uudelleen, jos kesken). Kuvaa J3/J4 (liftaus → automaattiheitto
     → reitit → saapuminen). Lokissa rivit `matkareitit [...]` ja `automaattiheitto`.
  2. Laitetestaaja kuvaa webin (Playwright webkit, liftausnappi `button[aria-label="Liftaus"]`) ja natiivin videot
     kansioon `proto-3d/lokit/liikkuminen-pariteetti/`. Natiivin J2 (Ohita) kuvataan uudelleen korjatulla käännöksellä.
  3. Merge-pyyntö Natiivisepälle, kun todennettu. Haara sisältää natiiviseppa/reitit-b13:n ja saattokameran
     (järjestys: maarajat → heidän haaransa → pelikoodari/liikkuminen).
  4. Lopuksi videopari omistajalle (Fable).
  5. Natiivi-UI:n rivit A6, A9, A11, C10–C13, C16, D6 ja D17 ovat heidän jonossaan.

## 2. Muut löydökset
- **61** (kortin kamera zoomaa ulos): kytkentä 66fb66b ei ollut build 12:ssa, nyt juna/b13 044a2fe:ssä. Todenna b13-käännöksessä
  napautuksella (`napauta <kaupunki>`).
- **63** (Nähtävyydet ei toimi): rivi → `Nahtavyysnakyma.Avaa(id)` on Natiivi-UI:n oma; selvitä simulaattorissa (`ui`-komento
  UiKomennot.cs:842).
- **66/67** (pulu ei elä chatissa, vastaus katkeaa "…muurin alta, n"): Opus-agentti mittasi webin; tulokset tulevat kansioon
  `proto-3d/lokit/loydos66-67/` (pulu-chat-animaatio.md, pulu-vastaus-katkeaa.md, sse-schliemann.txt). Jos kansio on tyhjä,
  aja mittaus uudelleen. Natiivin SSE-jäsennys (PuluChat.SseKasittelija) vastaa webin logiikkaa. Syy on joko workerin loppu.vastaus
  tai näyttö.
- **49 VALMIS** (juurisyy: AudioListener puuttui Pallo.unity:stä; laitteella rms > 0). Avoin laatukysymys: Unityn ulostulo on
  24000 Hz, istunto 48000 Hz.
- **52 välikortti, 48 kamera, aanet-kuuluviin:** mergetty juna/b13:een (044a2fe). UITK letter-spacing on em/100
  (Natiivi-UI muunsi USS:n).

## 3. Web
- #3135 (nostonimiöt kursiiviksi) ja #3136 (PARIISI-lukko, Fablen päätös: lattiakertoimella ei lukita; nimi näkyviin vasta
  perillä, savuke `tools/savukkeet/savuke-pariisi-saapumislukko.mjs` 11/11). Julkaisija uusii savukkeet ja mergeää, jos vain
  astro-pallo on punainen. nimiot-elavat ja pariisi-lahizoom-1400-liuska ovat heiluvia vanhoja punaisia (todisteet
  lähetetty Julkaisijalle).
- Web-worktree `wt/pelikoodari-liiku-luenta` (pariteetti-ajo-haara) on yhä olemassa; `pelikoodari-nimio-kursiivi` on poistettu.

## 4. Linjaukset ja työkalut
- **JUMI → FABLE** (omistaja 25.9. klo 04.4x, korvaa JUMI → KORTTI): jumissa yksi viesti Fablelle (tilanne, vaihtoehdot,
  suositus), ei korttia omistajalle; jatka muuta työtä. Lupaikkunasta ilmoitetaan Fablelle heti.
- **Pariteettisimulaattorit** (Fable 25.9. klo 06): pidetään kaikki neljä. Aja
  `proto-3d/tyokalut/siivoa-pariteettisimut.sh --aja` jokaisen pariteettiajon lopussa (tyhjentää sovelluksen ja datan,
  ei aja käännöspalvelun asentaessa). Lisää kutsu `tools/pariteetti-ajo.mjs`:n loppuun, kun sen haara avataan.
- **Käännöspalvelu:** jono on hidas (käännös noin 15–25 min, useita jonossa). Haaranimet ratkeavat mergehetkellä, joten
  uusin commit tulee mukaan. iPhone-simulaattorin paneeli: Natiivi-UI:n korjaus natiivi-ui/radio-sulku 85539c2 (×3, 402 pt),
  todennettu.
- **Mittarit:** `aani mittaa|sini|istunto|nollaa` (peli-komento), `ui saapumiskortti[-mitta]`.
