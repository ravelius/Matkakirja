# Linnanrakentajan luovutus 29.9.2026 klo 20 (-e): Olavinlinna UUDELLA TAVALLA (Blender + fotogrammetria)

Rooli: **Linnanrakentaja (Opus, max)**. Päätoimittaja johtaa (viestit NIMELLÄ, ListAgents). Edellinen: `…-20260929-d.md`
(erä 3 proseduraalinen, tausta). Nollaus Päätoimittajan pyynnöstä kontekstin 70 %:ssa.

## Omistajan linjaukset tänään (sitovat)
- 19.2x: linna VAIN natiiviin. ULKOKUORI = Senaatin fotogrammetria (CC BY 4.0), SISÄTILAT Blenderissä valokuvamaisina
  (PBR + Cycles-leivottu valo), Unity-puoli Siirtosepällä. Äänet vasta kun omistaja on nähnyt (äänitilaus PERUTTU).
- 19.4x: laatutasot laitteen mukaan: HUIPPU ~1,35 M + täysi tekstuuri (A17 Pro+, M-iPadit, ämpäristä), NORMAALI 400 k + 4k,
  KEVYT 150 k + 2k; kehittäjätilaan tasovalitsin.
- Poly Haven CC0 hyväksytty (Päätoimittaja): lähde + lisenssi manifestiin ja tekijätietoihin.

## Missä mitäkin on
- **Pelin repo** worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-3`, haara `linnanrakentaja-linna-3` (pushattu):
  - `tools/dioraama/blender/`: `leivo_tila.py` (--renderoi, --leivo [UV1-atlas 4k/2k, glb TEXCOORD_1 + liekki:/valo:/
    ikkuna:-tyhjät], --tarkista, --kuori <glb> kuoren kanssa + leikkausikkuna renderissä), `ulkokuori.py` (vesi pois,
    keskitys, vesi −7, laatutasot), `kuori_kuva.py`, `kuori_ylakuva.py`, `kuori_korkeudet.py` (säteet), `ulkokuori_tutki.py`.
    Ajo: `nice -n 15 /Applications/Blender.app/Contents/MacOS/Blender -b -P <skripti> -- …`.
  - `tools/dioraama/sijoitus.mjs` + rakenna.mjs: tilan `sijoitus: {ankkuri, paikka, suunta}` siirtää kaiken tilan datan
    todelliseen paikkaan (538266b9d). keittio.js ja kappeli.js sijoitettu (commitoimatta tätä kirjoitettaessa: ks. alla).
  - Speksi: `docs/raportit/dioraama-rajapinnat-blender-20260929.md` (kuori, sijoitustaulukko, leikkausikkuna, putki).
  - Erä 3:n proseduraaliset 7 tilaa (cde916e74) varalla; tekstit/faktat käytetään uudelleen.
- **Assetit** `/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender/` (LUEMINUT.md): leivottu keittio.glb +
  valot/keittio.jpg/-2k.jpg, ulkokuori_{huippu,normaali,kevyt}.glb.
- **Lähteet**: kuori `/Users/Shared/Claude/proto-3d/_lahteet/olavinlinna-senaatti/` (LAHDE.md, CC BY 4.0: "Olavinlinna by
  Senaatti-kiinteistöt – Senate Properties"), Poly Haven CC0 `/Users/Shared/Claude/proto-3d/_lahteet/polyhaven/` +
  manifest.json (tekijät). Pohjakaava: Sisältökirjurin `sisaltokirjuri-olavinlinna-pohjakaava-20260929.md`.
- **Proto**: minun `linnanrakentaja/linna-3` f5877128 (kiertue, Tila.Ulkona, varjoetäisyys kameraan, valitsimen
  kerrosjärjestys, Aanisoitin a/c) → Siirtosepän `siirtoseppa/linna-valo` (b1ac2ab3: leivottu varjostin, liekit+savu,
  ikkunakeilat, kuoren lataus + laatutasot + "poikki kuori auto|huippu|normaali|kevyt"). Sovittu: samaan merge-pyyntöön
  pinona linna-3 → linna-valo. EI 1.0.54-junaan (Päätoimittaja). Siirtoseppä kääntää ja ottaa laitekuvaparin.
- **Siirtosepän sopimus**: tila `valoatlas: {tiedosto: valot/<id>.jpg, puoli: valot/<id>-2k.jpg}`, kaikilla primitiiveillä
  TEXCOORD_1; tyhjät liekki:<id> (extras koko, savu, korkeus, sade), valo:<id> (vari, sade, voima, lepatus),
  ikkuna:<id> (Blender-Z = keilan suunta; leveys, korkeus, pituus, levenema, voima, vari, poly); rakennus.json juuressa
  `ulkokuori: {huippu, normaali, kevyt}`; leikkausikkuna speksin kohta 3 (Siirtoseppä toteuttaa).
- **Kuvat omistajalle** (rooli-repo `docs/raportit/kuvat/linnanrakentaja-era3/`): kuvapari-nyt-vs-huippu.jpg,
  keittio-blender-leivottu.jpg (lähetetty Päätoimittajalle), keittio-kuoressa-koe.jpg ja kappeli-kuoressa-koe.jpg (uudet,
  sijoitus + leikkaus toimii periaatteessa; ei vielä lähetetty).

## Mitattua
- Kuori: 186,8 × 105,8 m, korkeus −1,2…47,3 m vedestä; Pieni linnanpiha y ≈ −3,0; itäsiiven katto 12,6; tornien huiput
  ~29–30. Tornit (Blender x itä, y pohjoinen): Kellotorni (−50, 5), Kirkkotorni (−21/−22, 13/14); Eerikin tornin
  raunio pohjakaavan mukaan (−10, −23) (oma arvioni (−1, −17) oli väärin). Tornien ulkohalkaisija ≈ 17 m.

## Käynnissä / auki
1. **Kuoren siivous** (Sonnet-agentti käynnissä nollaushetkellä): nosturi (22, 8), työkoneet (36, 16) ja (25, −1), telineet
   x 5…15 y −17…4, pressut/kontti x −23…−5 y −35…−30 → `tools/dioraama/blender/kuori_siivous.py` + `ulkokuori.py --siivoa`,
   tulokset `…/scratchpad/kuori-siisti/` (tämän session scratchpad 4105d911…). Jos agentti on kadonnut: aja uudelleen.
2. Keittiö/kappeli kuoressa: hio leikkausaukon reunat, tilan perustusmuuri (keittiössä kellumisvaikutelma), kamerat
   todellisiin paikkoihin; muut 6 tilaa sijoituksineen (taulukko speksin kohdassa 2); tornitiloille todellinen säde.
3. Leivo sijoitetut tilat kuoren kanssa (`--kuori … --leivo`), vie assetit + rakennus.json (valoatlas, ulkokuori) ämpäripolkuun
   (Julkaisija / vie-dioraama) tai Siirtosepän peiliin `/Users/Shared/Claude/proto-3d/lokit/siirtoseppa-linna-peili/`.
4. Valokuvamaisuus: Poly Haven CC0 -mallit kalusteiksi, hiillos (nyt valkoinen laatta), kuluma.
5. ASTC esipakkaus (astcenc) huipputasolle — Siirtoseppä kertoo omistajalle.

## Säännöt, jotka opittiin tänään
- **Kuorma**: enintään 2 selain-/rakennus-/Blender-ajoa kerrallaan, nice -n 15 (7 rinnakkaista Playwright-agenttia jumitti
  koneen, kuorma 271, omistaja ei päässyt etäyhteyteen). Esikatselu Metal-GPU:lla (esikatselu-kuvat.mjs oletus).
  Kevyt tila `/tmp/matkakirja-kevyt` = tauko. Muistio: selainagentit-max-kaksi.
- Sonnet-agentit: selkeä tiedosto-omistus, atominen kirjoitus, `kierto.etaisyys` on kerroin (testi valvoo).

## Viimeisin (klo 20.0x)
- Siirtoseppä: leikkausikkuna tehty `linna-valo` 9ea5cff3 (Tila.leikkaus {laajennus 1.0, kameraan true, [min,max]},
  12 cm vaalea kivireuna, 0→1 kaarilennon jälkipuoliskolla). HUOM: jatke on vaakasuora rajojen korkeudella → aseta
  tilan rajat.max.y katon yli tai anna leikkaus.max, muuten ylhäältä katsottaessa katto jää näkyviin.
