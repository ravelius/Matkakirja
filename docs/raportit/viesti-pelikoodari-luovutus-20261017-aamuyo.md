# Pelikoodarin luovutus 17.10.2026 aamuyö (KOVA RAJA 41 %, Postivahti, klo 02.4x)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-yo: raketin video tehty (alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti, docs/moduulit/yhteiset-pohjat.md (LIIKE- ja ÄÄNI-pohja).
- Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe,
  JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832,
  Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
- Juna 197 LUKITTU (PT ~01.0x). Kaikki alla oleva on junaa 198 (pohja natiiviseppa/juna-198 4b6ef2395; EI sisällä junan 197 intron korjausta).
- Simu iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19 vain JU:n "SIMU NYT" -luvalla, "SIMU VAPAA" heti ajon jälkeen.
  HUOM: JU:n käännöskääre asentaa 96044270:een itse – pyydä "älä asenna, kopio _tyo:hon riittää" (02.14 asennus tappoi ajon).
- SIMUN KOSKETUKSET OVAT PYSTYKOORDINAATEISSA (402×874) myös `ui kierto vaaka` -tilassa: vaakaruudun `veto`-koordinaatit menevät ohi.
  Vieritykseen `peli vieritys kestokoe <s>` (sovelluksen oma heitto, Ruudunpaivitys.Vierita joka kehys).
- Ajot: /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ajo-*.zsh (SHA=… UDID=… zsh …). Raakakehysajat: skenaariossa
  `komento mittaus alku <nimi>` / `komento mittaus loppu` → Documents/mittaus-<nimi>.txt (kopioi heti: seuraava asennus pyyhkii).

## TEHTY TÄLLÄ VUOROLLA (kaikki peilattu natiivi-backupiin)
1. **Juna 197 punainen korjattu** pelikoodari/museo-kehys-197 **cd5d79c32** (vain MuseoAutoZoomTestit: kehyksen muoto 4 kuvasuhteessa,
   suurennus napautuksella; NUI:n leveät teokset → Auto Zoom 1,00×). NS yhdisti (runko fd8e3f769), PT lukitsi junan 197.
2. **Raketin video** (160db49aa, käännös 1b04a7e49): lokit/todistus-raketti-pulu-197-20261017-0224 OK (MECO 56,29 s "sammuvat",
   irtoaminen 71,47 s "Heippa", telakointiääni äänipohjasta). PT: muuten OK, MUTTA liuku ei näy → kohta 3e.
3. **PT:n junan 198 erät**:
   a. **A VIERITYS** pelikoodari/vieritys-198 **0c728d724**: KuvataajuusPaatos.Vieritys (≥ 60 Hz, 120 Hz ProMotionilla vain kartta pois +
      ei raskasta näkymää + thermal < 2; vain kuuma/kriittinen rajaa), Ruudunpaivitys ohjaa "vieritys"-syyn siihen ennen NakymanKattoa.
      Kartta 499/499 (uudet testit mm. MikaanNakymanKattoEiHidastaVieritysta). HUOM NS:n tiedostot (Kartta/).
      Simu 448127658: `vieritys kestokoe` Cupolassa näkymän katolla 30 → "tila Taysi (vieritys), fps 60", 59,8 fps
      (lokit/todistus-iss-vieritys-198-20261017-0234, PT:lle lähetetty 02.4x). VALMIS.
   b. **B LUKIJA** pelikoodari/lukija-nimi-198 **bfc26ed3f + 5bf6ea91e**: KupoliAanet.LueNimi → Puhe.Lue "kertoja" kohdevalikon
      sijainnille, kohokohdalle (oma nimi), omalle sijainnille ja Cupolan napautukselle; v2-kelaus ("Kelataan seuraavaan…") ei soi.
      Simu 448127658 (bfc26ed3f): nimet lokissa, "Kelataan" ei soi, MUTTA "Peking" jäi 20 s:n jakson taakse → 5bf6ea91e: soiva
      lause pysähtyy nimen ajaksi ja jatkuu (UnPause). 5bf6ea91e unity-tarkistus AJAMATTA, ei simuvideota.
      Testikomento `linssi raketti nimi <teksti>`.
   c. **C INTRON NYKÄYKSET** pelikoodari/aineisto-rauha-198 **560d8c709**: mittaus d79778a43:lla (todistus-intro-nykays-198 + -198b,
      raakakehysajat mittaus-intro-a/b.txt): intro p50 16,7 / p99 18,3 ms, KK:n kohdat puhtaat; ainoa toistuva nykäys 66,7/82,5 ms
      intron ~4 s:ssa = "linssien aineisto valmis" (LinssiOhjain 20 s:n katto osui introon). Korjaus: aineisto odottaa
      Ruudunpaivitys.UiRauhassa, katto 60 s, LataaAineistoHeti ohittaa. HUOM LS:n tiedosto. unity-tarkistus AJAMATTA, ei simua.
   d. Yhteiskäännös A+B: pelikoodari/iss-ab-198 d58c50517 → JU 448127658, app _tyo/pelikoodari/iss-ab-198-app.
   e. **RAKETIN LIUKU** pelikoodari/raketti-liuku-198 **e7b3498a4** (160db49aa:n päällä): lento kylkeen vasta alustan lähikuvan
      perillä-hetkellä (RakettiLahikuvat.PulunLentoAlku = B), ruudun oikeasta alakulmasta naruun 1,5 s liikepohjan liu'ulla, lähikuva
      tähtää laskeutumiskohtaan ennen lentoa (RakettiPulu.Kohdistettava), reunan Pulu näkyy kulmassa lentoon asti (Pulu.Peita).
      Raketti 18/18 (uusi PuluLiukuuLahikuvassa). unity-tarkistus AJAMATTA, ei simuvideota. Videossa ÄLÄ käytä `raketti kello -4`
      (hyppää lennon ohi) – katso ajo-raketti-pulu-197:n skenaario /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/raketti-pulu-197/sk-ajo.txt.
4. Levyhätä: 12 yhdistettyä worktreetä + 4 vanhaa .appia + museovideo pois (~7,7 Gt).

## ENSIMMÄISENÄ
1. `Peli-testit/unity-tarkistus.sh` kolmessa worktreessä: proto-pelikoodari-lukija-nimi-198, -raketti-telakointi-197 (haara
   raketti-liuku-198), -aineisto-rauha-198. Korjaa virheet.
2. Yhteiskäännös JU:lle: uusi haara juna-198:n päälle ⊃ vieritys 0c728d724 + lukija 5bf6ea91e + aineisto-rauha 560d8c709
   (+ raketti-liuku e7b3498a4, jos raketti kuuluu junaan 198 – kysy PT) → videot: B (sk-iss-ab-198 ilman vetoja), raketin liuku, A:n tulos.
3. PT:lle sha + video kustakin (PT 01.4x: "Jokaisesta sha + kuva/video PT:lle").

## Kesken
- PT:lle lähetetty 02.4x: A OK; B 5bf6ea91e, C 560d8c709 ja raketin liuku e7b3498a4 odottavat käännöstä ja videota.
- Worktreet: vieritys-198, lukija-nimi-198, raketti-telakointi-197 (haara nyt raketti-liuku-198), aineisto-rauha-198.
- _tyo/pelikoodari: museo-korkeus-197-app, raketti-pulu-197-app, iss-ab-198-app (≤ 2 + käytössä: poista vanhin uuden tullessa).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-aamuyo.md (haara
pelikoodari-luovutus-20261014-paiva). Ensin unity-tarkistus kolmessa worktreessä, sitten yhteiskäännös JU:lle ja videot PT:lle."
