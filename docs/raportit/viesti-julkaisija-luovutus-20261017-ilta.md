# Julkaisijan luovutus 17.10.2026 klo 18.55 (Postivahti: kova raja 35 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -120). Edellinen luovutus: `viesti-julkaisija-luovutus-20261017-iltapaiva.md`.
Osoitekirja: /Users/Shared/Claude/osoitekirja.md. Viestiraja: SendMessage paussilla (11 viestiä ilman omistajaa) → varakanava
`mcp__ccd_session_mgmt__send_message` (hook-ohje); käytä säästeliäästi, yhdistä KÄÄNNETTY + SIMU NYT samaan viestiin.

## PT:N ENSIN-JONO (PT 18.5x, sitova järjestys)
1) PK intro-korjaus 7e2e28368 iPad Pro Pariisi 2/2 (pitää junan 200 lukitusta) — kohta 0.
2) LS Louvren avaus a9d86b242 simu (kartta + ☰) — uusi, LS lähettää pyynnön/appin.
3) NUI ohjauspöytä 049b0ef6e+43439f3b5 (= 8fe92ebab) simu.
4) VS Louvre k82 ja valas k13.
5) KS Kiinan 19 pysäkin video (oli jo simulla ~18.46 → tarkista KS:ltä, valmistuiko; jos kesken, kesken jäänyt ajo saa päättyä).
Juna 200: lukitusehto v6k24 (R2 17.03); EI lukitusta ennen omistajan pyyntöä ("OMISTAJA PYYSI JULKAISUA").

## 0. ENSIN (heti nollauksen jälkeen)
- **iPad-ajo kesken:** `pariisi-intro-oletus.zsh` (PK 7e2e28368, sumennus 2,5 s oletuksena, juna 200 odottaa) ajaa iPad Pro 12.9:llä
  2 × Pariisi-alku → `proto-3d/lokit/pariisi-intro-oletus-ipad-20261017-1853/{1,2}` (konsoli, merkit, muisti-tarkka.log). Taustatehtävä kuolee
  nollauksessa. Tarkista kansiot: jos {1,2}/muisti-tarkka.log puuttuu, aja uudelleen `zsh julkaisija-tyokalut/pariisi-intro-oletus.zsh`
  (laitekäännös lokit/intro-muisti-200-oletus-laite on jo valmis → ohittaa käännöksen). Raportoi PK:lle: MemoryWarning-määrä,
  `grep 'App terminated'` (signal 15 = oma lopetus, 9 = kaatui), `grep -o 'huippu [0-9]*' muisti-tarkka.log | tail -1`.
  Vertailu 18.22: sumennus 1 → huippu 5161 + 1 varoitus; 0/2500 → ~2630, 0 varoitusta. Odotus: oletus ≈ 2500.
- Käynnistä levyvahti Monitorina (`zsh julkaisija-tyokalut/levyvahti-l2.zsh`, 30 min, aina uudelleen) ja `levy25-vahti.zsh` taustalle.
  Levy 31 Gi (18.54), laskee ~3 Gi/h (simuvideot). 25 Gi → ei SIMU NYT:ia videoajoille + rivi PT:lle; `siirra-4h-t7.zsh` vapautti 14.42 22 Gi.
- Varmista ettei L2-lukko jää orvoksi: `cat /tmp/matkakirja-kaannospalvelu-2.lukko/kuka` (18.53: LS orsay-valinnaiset-200, ei minun).

## 1. SIMUJONO (yksi kerrallaan, SIMU NYT → "SIMU VAPAA minulle")
Nyt: **KS** koko Kiinan linssi 19 pysäkkiä + video (omistaja 18.20), _tyo/karttaseppa/kiina-selkea-19-app (128c2924e → 6b4a79a97), iPad 00CF62C2, alkoi ~18.46.
Sitten:
1. **NUI** ohjauspoyta-201 8fe92ebab (käännetty 18.43), iPhone + iPad ~10 min.
2. **VS** Louvre k82 6036ade5b (_tyo/linssiseppa2/t214-louvre-hehku), iPad ~7 min.
3. **VS** valas k13 — käännös L2-jonossa, VS ilmoittaa.
Tyhjä jono → rivi PT:lle "JONO TYHJÄ: Julkaisija".

## 2. JUNA 200 (odottaa PT:n LUKITSE 200)
- Runko NS 08ab7e6e8 testattu vihreä; BUILD-sha syntyy lukituksessa (NS: muutosloki-PR + M → lukitse200-b L2).
- Lukituslista: **uusin-4 → v6k24** (omat-mallit-vienti-20261017-v6k24 VIETY 17.03, 53/53; EI v6k23) + taidemuseo-kertoja-v2-manifest200 (viety 13.26).
  Osoitin vaihdetaan vasta LUKITSE 200:ssa (`vaihda-osoitin.zsh`).
- PK:n intron sumennuskorjaus 7e2e28368 voi tulla junaan (iPad-tulos kohdasta 0 ratkaisee).
- PR #4808 (LR) odottaa omistajaa — ei mergeä.

## 3. TÄNÄÄN TEHTY (14.30–18.55)
- L2: PK fft-meri laite 36723c5f8 + ce479c342, BUILD 199 laite 6339b1aec, intro-muisti f95ea463f + 7e2e28368 (laite); KS Kiina v5/v7/v8/589/589-v2/hunnu/selkea-19
  (v6, v9, 589-v3 peruttu odottajina); PK koopenhamina-v12. Poistettu KS:n luvalla kiina-koko-linssi-v5/v7/v8-app.
- Viennit: koopenhamina-tivoli-kuvat-20261017g (14.45, PT kuittasi), omat-mallit v6k24 (17.03).
- iPad Pro 12.9 (M1) -mittaukset, raportit lokit/-kansioissa:
  fft-meri A/B (FFT ≈ laatta; Cupolan ~22 kuvaa/s on näkymän oma), Cupola-kustannus (GPU kasvaa ajan mukana ~+5 ms/min, kehys/pallo eivät hinta),
  Pariisin uusi peli: ce479c342 kaatui 2/2 (signal 9), BUILD 199 ei, syy = intron UITK-sumennus (+2,5 Gt).
- Uudet työkalut: `ipad-skenaario.zsh <app> <skenaario> <kansio> [raja]` (todistusajon skenaario fyysisellä iPadilla, merkit.txt, kaatumistunnistus,
  muisti-tarkka.log talteen; ALKUODOTUS=60 oletus), `fftmeri-ipad-mittaus.zsh`, jaksoanalyysi scratchpadissa (kirjoita uudelleen tarvittaessa).

## 4. OPIT
- **iPad-skenaario: odota ≥ 60 s käynnistyksestä** ennen linssikomentoja ("ISS-linssi ei ole valmis" 22 s:ssa, aineisto ~25 s).
- **A/B-mittaus vain jäähtyneellä laitteella** (B heti A:n perään → Kuuma-lämpösuoja vääristi; 1. tulkinta piti korjata).
- **Pariisin alku kaatoi vanhan iPadin** FFT-haarassa → Cupola-skenaariot Lontoo-alulla (`sk-cupola-kustannus*-lontoo.txt`).
- Odottava L2-käännös kääntää haaran kärjen vasta lukon saadessaan → "anna valmistua, sitten uusi sha" -pyynnöt: pysäytä odottaja, pyydä siirto heti.
- Odottajan saa pysäyttää (TaskStop), lukossa olevaa ei koskaan.
