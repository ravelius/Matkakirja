# Linssiseppä 2:n luovutus 2.10.2026 (klo 22.1x, LOPULLINEN: tilinvaihto)

Edellinen: viesti-linssiseppa2-luovutus-20261001.md. Kärki nyt: omistajan Astronautin kamera- ja ISS-palaute (2.10. 21.3x,
Päätoimittajan tilaus, ohittaa muut).

## 1. KÄRKI: Astronautin kamera ja ISS (10 kohtaa), proto-haara linssiseppa2/astro-palaute

Worktree /Users/Shared/Claude/wt/proto-linssiseppa2-astro (BUILD 129 = e204abbe:n päällä). Tila:

| Kohta | Mitä | Commit | Tila |
|---|---|---|---|
| 2, 4 | AUTO: ✕, Pulu, ‹ › ja AUTO häivytetään (200/220 ms), 1. napautus palauttaa, piiloon 4 s:n päästä; ei Seuraava/Pysäytä-lappua | a05878fc | todennettu simulla 1ee0a8df |
| 5 | Sumu ×0,5 (Astronauttimatikka 0,62→0,31, 0,15→0,08; kultaiset päivitetty) | a05878fc | todennettu |
| 3 | Sijaintipallo 120/160 pt, iPhone vaaka ruudun vasempaan reunaan 8 pt | fbba7320 | kuvattu pysty; vaaka kuvaamatta |
| 7 | Cupola 3 -kehys +20 % (puhelin 2,4/1,5, tabletti 1,75/1,5) | fbba7320 | todennettu |
| 1, 6, 10 | Robottikäden Pulu vasempaan alakulmaan 60 %, varjokuva, kasvot näkyvät (visiirin soikio), varsi vaakaan oikean reunan yli; Cupolassa kehyksen päällä ja pöydän yläpuolella | 85a8d4b7 + da145b3e | da145b3e KÄÄNTÄMÄTTÄ: todenna seuraavalla simulla (kasvot, varsi reunaan, Pulu ei pöydän päällä) |
| 8, 9 | ISS-säätöpaneeli pieni (vain mittaririvi) ↔ suuri (2 riviä 4+3, ~2×, tekstit ≥ 11 pt, 240 ms, ohinapautus pienentää); POISTU ×-merkki + POISTU-alateksti | 43bac2ff | KÄÄNTÄMÄTTÄ: käännä da145b3e:n kanssa, kuvaa pysty+vaaka |

Päätoimittajan hyväksymät tulkinnat: 6/10 molempiin näkymiin, alus = ISS kuvan ulkopuolella oikealla; 9 erottuva (ei
huomaamattomampi), Codexin punainen/varoitustila jos on, ei uutta tyyliä; 8 kuten yllä.
Kohdat 2–5 koskevat myös webiä: Pelikoodari tekee samat arvot (sovittu 21.4x). Kuvat merkinnöin Päätoimittajalle erä kerrallaan.
Skriptit: proto-3d/lokit/linssiseppa2-skriptit-20261001/astro-nykytila.sh (APP, OUT; pysty + vaaka 14 kuvaa).
Nykytila: lokit/linssiseppa2-astro-nykytila-20261002 (+ nykytila-merkinnat.png), korjaus: lokit/linssiseppa2-astro-korjaus-20261002.
PANEELI (8–9) COMMITOITU 43bac2ff (agentti valmistui tilinvaihdon jälkeen; unity-tarkistus 0, Linssit 572/572, pohjavahti ok),
KÄÄNTÄMÄTTÄ JA KUVAAMATTA. Pieni ~230 × 32 pt (vain mittari); suuri: pysty 2 riviä (iPhone 397 × 336 pt, 42 %), vaaka 1 rivi
(iPhone 476 × 160 pt, 45 %); tekstit iPhonella 11 pt. Testit `astro kyyti paneeli pieni|suuri|tila`. Tarkistettavaa kuvasta: leikkaussaumat,
9-slice-venytys, ×-merkin punainen (Tyylikirja.Tila.Virhe; Päätoimittaja ratkaisee onko uusi tyyli), alalappu aina POISTU (näkymän nimi ei
enää näy), PALAA LIVE pienenä 2 napautusta, "EI KUVAUSPAIKKAA" ~7 pt. Codexin sarjassa ei ole punaista/varoitustilaa.
Valmiina: Natiivisepälle merge-pyyntö haarasta, kun 8–9 ja kuvat ovat Päätoimittajalla kuitattuina.

## 2. Ajattelijat natiivissa (valmis, junissa)

- ea76da0b juna 125 (TF 126), korjauserä 8d91c1c6 + 8e19350f juna 127.
- Data: tyokalut/ajattelijat-natiiviin.mjs <webin juuri> → Resources/Ajattelijat/*.json + atlas. Fontit FontFacella kansiosta
  _lahteet/fontit-kreikka.
- Kutsupiste Linssisepälle: AjattelijatSovitin.AvaaAjattelija(tunnus).
- AVOIN: Platon datana, kun web saa sen. Aja silloin muunnin uudelleen webin datasta, myös #3866:n kartta.piste
  (Linssiseppä lisäsi käsin, ja konfliktissa ajetaan muunnin uudelleen).
- Muisti: [[three-unity-peilaus-triplanar]] ja [[varjostinvirheet-kaannoslokista]].

## 3. Muut

- Web #3842 (avaruuskävely) on valmis ja ämpärissä. Merge kuuluu Julkaisijalle tai Päätoimittajalle.
- LAHTEET.md jokaiseen vientipakettiin (ei SHA256SUMS:iin). Tarkistus: julkaisija-tyokalut/vie-paketti.sh --kuiva.
- Lokikansioon jätetään vain kuvat, konsoli ja yksi uusin .app (valitse SHA:n perusteella, ei kansion ajan mukaan).
