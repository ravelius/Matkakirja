# Natiivisepän luovutus 2.11.2026 klo 17.10 (konteksti 26 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261102-1540.md (PR 6005, tämä korvaa sen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. Rungon a7cdb4478 testit läpi ja peili ajan tasalla (16.34).

## JONO
1. **SAAPUMISEN NYKÄYSVAHTI (PT 15.3x, NS:n korjaus), KESKEN, EI RUNKOON.** Haara natiiviseppa/saapuminen-vahti-218
   (työpuu wt/proto-natiiviseppa-saapuminen, pohja 8b81a3f29, peilissä): 8aa00a90b → 5a7c27945 → e48588e37 (testit läpi).
   - Sisältö: iOS:llä leikkeet (PNG, esikerronta pois) ja maskit (R8) puretaan taustasäikeessä kuten laatat, enintään 2 purkua
     yhtä aikaa, data natiivissa puskurissa (LoadRawTextureData(IntPtr)); pääsäikeen asennukset: yksi laatta tai pienet 3 ms:iin
     ruudussa; vahditun ikkunan (liike + 1 s) aikana laatta 1024 px:nä, tarkennus 2048:aan levossa (luku välimuistitiedostosta);
     ETC-pakkaus vain kahden potensseille (varoitukset 0); uusia hakuja ≤ 4/ruutu; ESILATAUS: PeliOhjain.EsilataaSaapuminen →
     PiirrosKerros.EsilataaKeskusta (keskustan 3,5 km matkan alusta, 30 s).
   - **Reilu vertailu samalla skriptillä** (`juna218/saapuminen-matka218.sh`, Lontoo → bussi Pariisiin, keskustan zoomaus):
     runko 8b81a3f29 (lokit/natiiviseppa-saapuminen-matka-ennen3-20261102): zoom 70 pitkää, suurin 225 ms, Purku 286 ms/14.
     e48588e37 (…-jalkeen3-…): zoom 90 pitkää, suurin 150 ms, Purku ≤ 1 ms. (5a7c27945: 82/142; 8aa00a90b: 92/134.)
     Eli suurin ruutu ja purku korjautuivat, mutta pitkien ruutujen MÄÄRÄ kasvoi (muu/merkitsemätön 2797 → 3652 ms):
     esilataus siirtää työn liikkeen ajalle. Molemmat HYLÄTTY (4.24).
   - **Seuraava askel:** mittaa versio ilman esilatausta (poista kutsu PeliOhjain.Esilataus.cs:stä, muu ennallaan). Jos se on
     ≤ 70 pitkää ja suurin < 225 ms, se runkoon PT:n kuittauksella; esilataus vasta erikseen. Loput pitkät ruudut eivät ole
     piirroksen: GC 1–3× (Update 60–110 ms merkitsemätöntä), Nimikerros (jopa 91 ms), KaupunkiMerkit (55 ms),
     Laattapalvelin, Saapumistraileri/Kuvat.Lataa traileria avattaessa (kohta c: traileri vasta +1 s:n jälkeen = UX-muutos,
     PT päättää). Muistivaroitus (applicationDidReceiveMemoryWarning) 3–4 kertaa myös ilman korjausta, intron aikana.
2. **Pieni iPad (omistajan laite): asennus VAIN, kun KK välittää omistajan luvan.** PT 16.4x: käännös ilmoitettavaksi, kun
   nykäyskorjaus on runkoon tai PT päättää ilman sitä. Sitten `juna213/pieni-ipad.sh <sha9>`.
3. **NUI piirros-nostot-218 c94645ac3** (B-kohdenostot, PT kuittasi 16.1x): runkoon VASTA pienen iPadin käännöksen jälkeen;
   merge-tree 8b81a3f29:ää vasten puhdas (NUI).
4. **VS:n/NUI:n/KS:n merget** sitä mukaa kuin PT kuittaa (tarkista media ämpärissä curl -I:llä, jos TasoVersio/LeikeVersio/SiltaVersio vaihtuu).
5. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle
   "kaikille", rivi PT:lle. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
6. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2;
   NUI:n leikehaara 7280634c4 EI. Pariisin vieritys osa 3 (pakkaus ~11 ms/laatta) EI NYT (PT).
7. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf).
- **Juna 218 runko = a7cdb4478** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218). Tänään 744e72d03:n jälkeen:
  NUI 47067b095 (Liiku-kumous) → dda8d2624, eb9ad99fc (omistaja 14.37) → 0f0a9a873, 58f0974db (saapuminen keskustaan) →
  8b81a3f29; VS salikatot-218 ad9a6cea7 → a7cdb4478 (testit 2223/793/586, tarkista 0, peili 16.34). PT:lle ja tekijöille kerrottu.
- Nykäysvahti, PT:n linja: 4.24 (koko liike + 1 s, yksikin yli 20 ms = hylkäys) on omistajan sitova sääntö; rajaa ei muuteta.
- Kansiot rungossa ennallaan: rakennukset-v98, tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; piirros
  TasoVersio haamu3-20261102, LeikeVersio leikkeet-20261102, SiltaVersio leikkeet-sillat-20261102.
- Laiteäpit (lokit/natiiviseppa-app-210-runko-<sha>-laite): 5a7c27945, e48588e37, 8b81a3f29 (= runko ilman korjausta).
  Pieni iPad: asennettuna 52ba93dea (12.33).
- Levy (PT 15.5x ja Postivahti 16.2x): siivottu vanhat luovutus-worktreet, worktreet koe67 ja muisti (haarat peilissä) ja vanhat
  äpit; vapaata 34–41 Gi. Build/-kansiot ovat T7:llä. unity-b5 ja unity67 ovat vain linkkejä T7:lle.
- Mittausskriptit proto-3d/tyokalut/natiiviseppa-skriptit/juna218/: piirros-vieritys218.sh, saapuminen-matka218.sh (ipad-lukko).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen eikä T7-kopioita.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-218).
- Laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`
  (commit peiliin ensin; ~17 min).
- Saapumismittaus: `zsh .../juna218/saapuminen-matka218.sh natiiviseppa-saapuminen-matka-<nimi>-<pvm> <sha9>` (~4 min, Iso iPad).
- Puhtaus `git merge-tree --write-tree HEAD <sha>`; tarkista rc=1 tai testi punainen → korjaus tekijän haaraan.
