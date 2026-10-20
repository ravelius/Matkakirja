# Päätoimittajan luovutus 19.10.2026 klo 19.10 (oma nollaus, konteksti 30 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. KK local_8e4fcfed-fc40-464c-854a-1d031b005332. Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261019-1815.md (käsitelty kokonaan). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy.

## 0. HETI ALUSSA
1. Monitorit: odottajat-vahti.py ja codex-posti-vahti.sh (30 min, uudelleen).
2. PR #4998 (Raamattu 4.21/2.105/2.159 videot pelistä, savu täysillä; head d16c038d5): merge kun `testit` vihreä, sitten `tools/uusi-worktree.sh --poista fable-videot-pelista`. Taustavahti kuoli nollauksessa → tarkista `gh pr checks 4998`.
3. PR #5000 (Raamattu 12.19 YÖSIIRTO + tools/levy + loki 18.55, 19.02/19.03): REBASE #4998:n mergen jälkeen (loki-konflikti: pidä molemmat osiot), merge vihreänä, poista wt fable-yosiirto-t7.
4. PR #4995 mergetty; wt fable-loki-drone poistettu.

## 1. Omistajan päätökset tässä vuorossa (lokissa #4998/#5000)
- 18.25 raketti, valas ja uni videoksi PELIN Unity-kohtauksesta (Claude), aarteen löytöhetki Codexin Blenderissä. Codexin rakettikokeilu 665–667/670 pysäytetty (posti 34f60ff35).
- 18.29 raketin savu pelin omana savuna täysillä (video-laatutaso, ei koske puhelinpeliä).
- 18.51 yli 48 h koskemattomat ≥ 5 Mt T7:lle nyt (KK ajoi) ja joka yö (Postivahti ajaa, PT vastaa). Postivahti ajaa `--aja` vasta saatuaan KK:lta OMISTAJAN PÄÄTÖS -rivin (pyydetty KK:lta).
- 18.55 videot vain yöllä; ensin juna, sitten juoksupelin 1. pelattava versio.
- 19.02 OMISTAJA PYYSI JULKAISUA: "julkaise 205 ilman testejä, niin ehdin itse nähdä sen ennen nukkumaanmenoa".
- 19.03 "sitten aamuksi uusi versio johon voi ajaa myös testit. ei aloiteta vielä tänä yönä videoiden renderöintejä jos se hidastaa juoksupelin kehitystä" → yöjuna 206 laitekierroksella; Codexille posti 81489a395 (render vain kun kone vapaa, load < 16).
- 19.06 OMISTAJA PYYSI JULKAISUA: "204 voi julkaista nyt ilman testejä".

## 2. Junat
- JUNA 204: LUKITSE 204 6451b7f8d lähetetty JU:lle 19.08 (8/8, muutosloki 394a699ec #5001). JU: GitHub-TF ulkoisille + NS Mac-TF. Odota JU:n TF valmis → rivi KK:lle → taulun rivi "Testaajilla".
- JUNA 205 = 204 + juoksupeli v1 (runko natiiviseppa/juna-205 4be2a647f, testit ajossa). TF tavoite 22.30–23.00 (KK:lle luvattu, ilmoita heti jos lipsuu). Ehdot:
  ☐ Juoksupeli: Pelikoodarin yhdistetty simu iPhone + iPad oikeilla vedoilla (ohjaukset, kiinni + uusi yritys, uloskäynnin drone 21bfda59e) JU:n käännöksestä ~19.40 → kuvat ~20.15 → PT katsoo täysikokoisina → polut KK:lle. Esteet-v1 pelissä KUITATTU (kuvapari _tyo/pelikoodari/raportit/kuvapari-esteet-v1-20261019/), valikkorivi 5deb98c46, ovikamera B kuitattu.
  ☐ ISS iPad 60 fps -mittaus KEVYELLÄ kuormalla (NUI, sama ikkuna). Uusi mittari: videon kehysvälit; kuorma-ajo p50 16,7 / p95 50 ms. TARKISTA TODISTUS.md:n KUORMA-rivi (muisti fps-todiste-ei-kuorma-ajosta). 25 s varjostinjumi = laiska käännös, ei este; esilämmitys NUI junaan 206.
  Muutosloki 205: NS tekee vain uudesta (juoksupeli) → PT kuittaa (≤ 280 mrk).
  Viimeisen ☑:n jälkeen LUKITSE 205 <sha> + omistajan 19.02-pyyntö sanatarkasti JU:lle. Ei Laitetestaajaa eikä muistiajoa.
- YÖJUNA 206 avataan LUKITSE 205:n jälkeen: juoksupelin jatko + yön kuittaukset, Laitetestaajan kierros (iPhone + iPad, sulavuus), TF aamulla.
  Ehdokkaat 206: Valosepän palkki M-rivillä kortin ollessa auki; NUI varjostinten esilämmitys + "sähköttää"/RETKIKUNTA-kontrasti/Montezuman rivi; SK:n Sheba- ja riipustekstit (PR 4997 mergetty, natiivin sisältöpaketti tarvitsee JU:n julkaisun); Pelikoodarin lähteet-nimet 2c9c676a2; juoksupelin pelinäyttö (NUI), äänitehosteet (Äänittäjä).

## 3. Roolit
- Pelikoodari: juoksupeli v1 (ainoa työ). Lista _tyo/pelikoodari/raportit/juoksupeli-v1-puuttuvat-20261019.md. Rakettivideo ja autokäynnistys odottavat.
- Valoseppä: rakettikokeilu pelistä (10 s + 3 s) RENDERÖINTI VAIN YÖLLÄ kun kone vapaa; päivällä palkkikorjaus (206) ja juoksupeli. Työkalusepän videotallennin 924891faa (Valoseppä mergeää).
- NUI: iPad fps -uusinta (205 ehto), sitten esilämmitys 206.
- Projektiseppä: päivittää esirenderoity-video.md kahdeksi kuluksi (pelistä / Codex) #4998:n jälkeen; Olavinlinnan keittiö 3/4 -jumi listalla (tauolla).
- Työkaluseppä: ennen-junaa vaihe 1 korjattu 941a05bcf (Claude → Codex -toimitukset ohi).
- Äänittäjä: juoksupelin tehosteet + 5 äänimaisemaa (Thames, Lontoo-katu, Praha uusiin hakuihin) → raportti kun Gemini hyväksynyt.
- SK: Sheba + riipus tehty (#4997). Lavastaja, Karttaseppä, Linssiseppä: levossa syyllä.
- Postivahti: siivousrivi (appikopiot ≤ 2, mergetyt wt) lähetetty 9 roolille. Matkakirja-kysymykset poistettu (PT).

## 4. Codex (postilaatikko)
Kuitattu: esteet-v1 #499 hyväksytty peliin (3a5f6d78b). Posti: rakettikokeilu pois (34f60ff35), yön renderöinnit vain vapaalla koneella (81489a395). Odotetaan: Kolme veljestä -video yöllä (tarkista täysikokoisena, KK:lle ennen omistajaa), juoksupelin seuraavat mallit.

## 5. Asemataulu
Junat v61: erilliset rivit Juna 204 (8/8, lukittu) ja Juna 205 (0/2). Työlista v78: juoksupeli kärjessä, rakettivideon rivi päivitetty.
