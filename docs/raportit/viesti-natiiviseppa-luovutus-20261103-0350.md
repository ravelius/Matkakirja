# Natiivisepän luovutus 3.11.2026 klo 03.50 (konteksti 29 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261103-0230.md (tämä korvaa sen, myös PR 6059:n lisäyksen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. JU:lle VAPAA lähetetty 03.47.

## ETUSIJA (PT 3.11.): SAAPUMISEN MUISTITAPPO, MYÖS RELEASESSA
Mittaus Isolla iPadilla (iPad13,8, M1, jetsam-raja 5119 Mt), Lontoo → Pariisi bussilla, MuistiTarkka 250 ms:
- A 16c732c8c (runko 55ce62126 + esilataus-218 2cf83b7c3, EI GC 3–5): kuoli 82 s = aloitusintron LOPPU
  ("esitys aloitusintro pariisi pois"): gfx 1723 → 3046 Mt 250 ms:ssa, fp 5140, signal 9. Varoitukset 63 s ja 82 s.
- B 390e3d9d9 (A + GC 3–5): kuoli 64 s = aloitusintron ALKU (6 kuvaa, kuva 1 sisään): viimeinen näyte fp 4160 / vapaa 954,
  sitten > 950 Mt alle 250 ms:ssa, signal 9.
- Johtopäätös: tappaja on aloitusintron alun/lopun ~1,3 Gt:n GPU-piikki (gfx = Metal-resurssit), ei GC. GC 3–5 laski intron
  edeltävää tasoa, mutta marginaali on 0 % molemmissa. PT:n ehto (< 20 %) → TÄMÄ ON SEURAAVA ERÄ ennen muuta.
- Pieni iPad (Pro 11 M5, omistajan laite, ei mitata yöllä): raja mittaamatta, piikki sama → riski. PT vie aamulla KK:n kautta.
- Lokit: proto-3d/lokit/natiiviseppa-muisti-16c732c8c-20261103/ ja -390e3d9d9-20261103/ (muisti-*.log: N = fp/vapaa/gfx,
  A = VM-alueet, L = lokirivit; yhteenveto.txt). Skriptit juna218/: muisti-ab218.sh <A> <B>, saapuminen-muisti218.sh,
  muisti-yhteenveto218.py <log> [konsoli].
- SEURAAVAT ASKELEET: (1) etsi intron siirtymän GPU-varaukset (aloitusintro sisään/pois: kuvat 6 kpl täysikokoisina, mahdollinen
  RenderTexture/kaappaus/sumennus, kartan uudelleenpiirto intron alla). MuistiTarkka T-rivit (tekstuurit tyypeittäin) kirjoitetaan,
  kun fp nousee ≥ 150 Mt / 0,3 s – tässä piikki tuli yhden näytteen välissä, joten aja väli 50 ms ja katso T-rivit.
  (2) Korjaus erikseen haaraan, (3) uusi A/B samalla skriptillä JU:n vuorolla. Releasessa tavoite marginaali ≥ 20 % (≥ 1 Gt).
- devicectl-ansa: `launch --console` epäonnistuu (CoreDevice 10002, Invalid argument), jos appDataContaineriin on juuri kopioitu
  tiedosto. Documents/muisti-tarkka.txt ("250") on nyt laitteella valmiina (säilyy päivitysasennuksessa); skripti ei kopioi sitä.
- Iso iPadissa nyt B 390e3d9d9 → JU palauttaa uusimman rungon.

## TEHTY TÄLLÄ VUOROLLA
- **GC osa 3–4 profiloitu** (PT kuittasi): profiilikäännös 4ffd8aae5 = 8b2c66f8d + paikannuksen mittauskoodi (haara
  natiiviseppa/gc-mvt-profiili-218, vain mittaukseen). Taustavaraukset −20 % (Suurenna, Ympyra, ElavaPala pois; Vuokraa 214→119).
  Edellinen 8b2c66f8d-profiili epäonnistui: GC-haarassa ei ollut "cpu loki" -komentoa → saapuminen-profiili218.sh käyttää nyt
  ajokohtaista .raw-nimeä ja VIKA, jos puuttuu. Tulos: proto-3d/lokit/natiiviseppa-saapuminen-kutsupinot-4ffd8aae5-20261103/tulos.md.
- **GC osa 5 2856c5cc3** (PT kuittasi): ElavaMvt-kohteesta puretaan vain tyyppi ja paikat; tagit, arvot ja renkaat kysyttäessä.
  Koneella (Kartta-testit ElavaMvtVaraukset, ELAVA_MVT=<kansio *.pbf>): purku 29,1 → 7,1 Mt, purku + nimet + Z15-piirto
  53,4 → 42,0 Mt. Haara natiiviseppa/gc-mvt-218 (sis. runko 55ce62126 merge 9d66542e9), testit läpi, peili pushattu.
  EI runkoon ennen PT:n kuittausta merge-luvasta (osa 5 kuitattu, mutta muistitappo ensin).
- **Tasojen 9–10 tyhjä jakso → KS** (PT: pohjan virhe, ei elävän aikaistusta eikä nopeampaa zoomausta): KS:lle tasorajat
  (SileaUrl pohja-20261027 Z0–Z9 maailma, Z10 kaupunkien ±1°, elävä Z11–17; Lontoon Z9/Z10-laatoissa ei teitä, Thames hiusviiva).
  KS tekee uuden pohjasarjan; suosittelin Z9:n koko Eurooppaan (Z10 kaupunkien ulkopuolella tehdään Z9:stä). KS lähettää kansion
  + sha → NS vaihtaa SileaUrl/offline.json kaupunkiRasterin ja todentaa lepokuvilla (lepokuvat-valitaso.sh, kaaret 1.5/0.8/0.4).
- Mittaushaarat: natiiviseppa/mittaus-a-218 16c732c8c, mittaus-b-218 390e3d9d9 (peilit pushattu). Release-äpit
  lokit/natiiviseppa-app-210-runko-{16c732c8c,390e3d9d9}-laite.

## JONO
1. **Muistitappo (yllä)** – ETUSIJA.
2. **KS:n uusi pohjasarja** → SileaUrl + kaupunkiRasteri-vaihto + lepokuvat.
3. **OSA C ODOTTAA OMISTAJAN VALINTAA** (ennallaan; KK suosittaa (b) + taustaesilataus). Haara natiiviseppa/esilataus-218
   2cf83b7c3 (työpuu wt/proto-natiiviseppa-esilataus). EI runkoon ennen valintaa. (b): zoomaus heti, ennakointi ja hiljainen
   taustaesilataus säilyvät, odotus ja 30 s raja pois.
4. **GC-haara runkoon** vasta PT:n luvalla (2856c5cc3; yhteinen laitemittaus tehty, ks. yllä).
5. **Merget** (VS/NUI/KS) PT:n kuittausten mukaan: `git merge-tree --write-tree runko haara` → commit-tree → update-ref.
   zsh-ansa: `$C:refs/...` tulkitaan :r-muuntimeksi → kirjoita `${C}:refs/...`.
6. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA" (tagi natiiviseppa/runko-218-tf).
7. **JU:n löydös (ei tehty)**: proto-kaanna.sh linja 2 → uninstall ennen installia vain epäonnistuneen käynnistyksen jälkeen.
8. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n
   leikehaara 7280634c4 EI. Pariisin vieritys osa 3 EI NYT. Pariisin piirros tehdään alusta: ÄLÄ optimoi sen laattoja
   (PuraTaustalla 258 Mt / 17 varausta saapumisessa = piirroksen purku, jätetty).
9. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- TF 217 testaajilla (runko 60bd5c356). Juna 218 runko = 55ce62126 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218).
  Kansiot ennallaan (rakennukset-v98, tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; TasoVersio
  haamu3-20261102, LeikeVersio leikkeet-20261102, SiltaVersio leikkeet-sillat-20261102).
- Nykäysvahti 4.24 on omistajan sitova sääntö; rajaa ei muuteta.
- Development-käännökset kuolevat saapumisessa (signal 9) – nyt selitetty: sama intron muistipiikki.
- Laiteäpit: 2cf83b7c3, 16c732c8c, 390e3d9d9 (Release), 4ffd8aae5-kehitys (profiili). PT: pidä 2 uusinta + käytössä.
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus eikä T7-kopioita. Luovutusworktreet
  natiiviseppa-luovutus-20261103-{0120,0230,0350} saa poistaa mergen jälkeen (`tools/uusi-worktree.sh --poista <nimi>`).
- Testiaineisto (ei repoon, ODbL): Lontoon 9 Z14-palaa scratchpadissa katoaa nollauksessa; hae uudelleen
  https://tiles.openfreemap.org/planet/20261025_080012_pt/14/{8185..8187}/{5447..5449}.pbf.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; peili: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Release-laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`.
- Muisti A/B (vuoro JU:lta): `zsh .../juna218/muisti-ab218.sh <shaA> <shaB>` (kääntää puuttuvat, mittaa molemmat).
- Kehitysprofiili: `zsh .../juna218/kutsupinot218.sh <sha9 jossa cpu loki>` (mittauskoodi: poimi 2a02b6ed3 9be55d9ea b20aee47f).
- Kartta-testit nopeasti: `bash <työpuu>/Kartta-testit/kaanna.sh [nimi]` (~1 min).
- Odotussilmukka-ansa: `until ! pgrep -f X` osuu omaan komentoriviin → käytä pid:tä (`kill -0 <pid>`).
