# Pelikoodarin luovutus 24.9.2026 klo 17.30

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260924-1435.md`. Merge-pyynnöt, mitat ja kuvaparit ovat tiedostossa
`/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md` (Claude Desktopin 10 viestin raja:
niputa viestit, ja kirjoita pitkät asiat tiedostoon, josta Fable ja Natiiviseppä lukevat).

## Sitova työtapa (Raamattu 9ebc5784c "WEB ON MALLI, MITATTUNA", omistaja 24.9. klo 15.5x)
Natiivi tehdään täsmälleen kuten web näyttää ja toimii. Ennen koodausta tehdään neljä asiaa:
1. Web-kuva tuotannosta samassa tilassa (`tools/pariteettikuvat.mjs` worktreessä `wt/pelikoodari-pariteettikuvat`,
   iPhone 393×852 ja iPad 834×1194; `--lista` näyttää näkymät. HUOM: tuntematon lippu, esim. `--help`, ajaa KOKO listan).
2. Mitat webin koodista ja kuvasta merge-pyyntöön (px, kestot, vaihejärjestys).
3. Koodaus mittojen mukaan.
4. Web–natiivi-kuvapari. Natiivikuvan ottaa Laitetestaaja; Pelikoodari EI käytä simulaattoria (Fable 24.9.).
Web on malli tarkoitetulta käytökseltään, ei bugeiltaan. Mittaa webin käytös ennen kuin nimeät syyn
(Playwright + MutationObserver/Element.remove-pino). Arvattu syy johti tänään väärään päätökseen, joka jouduttiin kumoamaan.

## Proto-masterissa (Natiiviseppä mergesi)
- Noppa kartalle: `pelikoodari/siirrot-kartalle` 4d3fe7a (master 543b85f). Omistajan päätös 15.3x: ei listakorttia,
  renkaat ja kartalta valinta. Siirtokohdemerkit on kytketty, ja pöllön valintavihje tulee 15 s:n kohdalla. Kuvapari: Laitetestaajan PASS.
- Maamerkit sisältöpaketista: `pelikoodari/maamerkit-paketti` a6ae948. Skeema 1.33 (kokoelma maamerkit),
  oma GLB-lukija (Peli/GlbLukija.cs), Maamerkit.LisaaMalli ja pohjaMateriaali sekä Blender `maamerkit.py --glb`.
  Pilotti (Lontoo, Ateena) pysyy FBX:nä, kunnes omistaja on kokeillut sen. Lontoon GLB: proto-3d/lokit/lontoo-68110183.glb.
  Minä ylläpidän Matkakirja-repon tiedostoa `tools/vienti/maamerkit.json`, jonka tyhjä kokoelma on Siirtosepän PR:ssä #3074.
- Esilataus: `pelikoodari/esilataus-edistyminen` fee30eb (Natiivisepän ef925f8:n päällä). Mukana Laattapalvelin.Esilataus
  (edistyminen ja Peru), pinnan vaihto vasta 1/3 valmiina, Sentinel Z8–Z11 päätepisteisiin ja lokirivi "lennon pinta: vaihto".
  Laitetestaaja mittaa lokista build 9:llä.
- Avausteksti aloitusnäytölle: `pelikoodari/avausteksti-portille` d4950c0 + 34a8fa8 (master 895d716), omistaja 16.1x.
  Portti → avaus omalla ruudullaan → nappi tai napautus → pallo suoraan valintanäkymään ja pulu. Webin verho
  rgba(239,220,180,0.62) ja paikkarivin kaksoispiste. Raja: minä portista valintanäkymään, Natiiviseppä valinnasta eteenpäin.
- `pelikoodari/uusi-peli-sulkee-aloituksen` 473270e (master a47967d): testikomento uusi-peli sulkee aloitusnäkymän.
  HUOM automaatioon: `odota-tila Aloitus 30` ennen uusi-peliä, koska liian aikainen komento palauttaa
  "sisältö ei ole vielä latautunut".
- Aiemmin tänään: aloituskaava c8c4831, Keychain f05ec87 ja B7-erät (ks. edellinen luovutus).

## Build 10 -jonossa (Natiiviseppä)
- `pelikoodari/liiku-tanne` d7a6e4d: kaupunkikortin "Liiku tänne" vain nopan siirtokohteessa, ja se valitsee siirron
  (web lauta.js napautaKaupunki). iPhone PASS (Pariisin kortti ilman riviä), iPad-kuva puuttuu vielä. Mergetään iPadin PASSin jälkeen.

## Web (Matkakirja-repo)
- Mergetty: #3057 (avausluentojen aikaleimat, Siirtosepän #3070 perään), #3073 (topografiasavuke, nimiot:false),
  #3096 (fi.matkakirja.peli.kehitys pöllö-, ehdotus- ja sähkeworkerien natiiveihin). Workerit julkaistiin klo 17.28, ehdotus
  ja sähke käsin (Julkaisija, `gh workflow run ehdotukset-worker.yml` / `sahke-worker.yml`). Tarkistettu: kehitys-tunniste → 400, ei 403.
- Auki: #3038 pariteettikuvat (kärki 156c17789, uudet näkymät noppa-valintavihje, avausteksti-kesken/-valmis, aloitusvalinta).
  Julkaisijalle kerrottu "mergevalmis kun CI vihreä".

## Avoimet
- Astropulun kuvapari: Linssiseppä ottaa sen isolla iPadilla (worker on nyt voimassa, ilmoitettu).
- Valintavihje B: Fablen päätös on, että iPhonella vihje menee pluskuplaan kuten webissä (omistaja 14.9. tekstit piiloon).
  Natiivi-UI teki sen haarassa natiivi-ui/iphone-island 2cb5a31, ja merge-pyyntö on Natiivisepällä. Kuvapari puuttuu.
- Natiivisepän löydökset (hänen erissään): valintanäkymän merkit webin mukaan (punainen katkorengas kultarenkaan sisällä,
  nappula Lontoossa, lihavat nimet) ja saapumisnäkymän zoomitaso (web lähempänä).
- `wt/pelikoodari-vanha-checkout`: commitoimaton muutos, ei kosketa.
- Muisti: `pelikoodari-tila-20260924-b9.md`.
