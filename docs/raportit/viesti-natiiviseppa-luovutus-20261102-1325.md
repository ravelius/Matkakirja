# Natiivisepän luovutus 2.11.2026 klo 13.25 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261102-0715.md (sisältö tässä ajan tasalla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä ajoja eikä mergejä.

## JONO
1. **UUSI, ALOITTAMATTA: Pariisin vieritys tökkii pienellä iPadilla** (PT 13.2x, OMISTAJAN PYYNTÖ 13.19, juna 218, osa 1):
   "Kun piirros peittää näkymän, striimikarttaa ei piirretä eikä ladata sen alle, ja piirroksen ulkopuolinen tausta on
   mahdollisimman yksinkertainen. Valmis = 20 ms:n ruutuvahti läpi pienellä iPadilla. Koordinoi NUI:n kanssa (PiirrosKerros).
   Mittaus ennen/jälkeen PT:lle." NUI:lle lähti 13.1x ilmoitus (haara natiiviseppa/piirros-striimi-218, älä muokkaa
   PiirrosKerros.cs:ää ennen ilmoitusta) – katso NUI:n vastaus ennen aloitusta. Analyysi ja suunnitelma alla (ANALYYSI).
2. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle "kaikille",
   rivi PT:lle kun testaajilla. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
3. **Odottavat junaan 218:** LAV rakennukset-v95 (JU vie omaan kansioon, EI runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta:
   214 v2 rakennukset.json pudottaa eunukit nollaan); KS HdV-aukio (JU vei aukio-20261102, 54 laattaa) – vaatii PT:n kuittauksen ja
   TasoVersio-commitin; PK bugi 2; PK kapea reitti 4b107df7e odottaa v95:tä. NUI:n leikehaara 7280634c4 / piirros-leikkeet-218 EI.
4. **PT:n pysyvät kuittaukset:** LAV:n bugikorjaukset ja PK:n juoksun 217 -bugilistan korjaukset runkoon kysymättä; muut vain PT:n
   kuittauksella (PK:n/VS:n "PT kuittasi" SHA:n kera on vakiotapa). Malli-/laattapaketit: JU:n VIETY ennen mergeä.

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf).
- **Juna 218 runko = 8aa129301** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218, peili ajan tasalla). Testit 2223/790/586,
  tarkista 0. Tänään 024832f05:n päälle: PK eunukit f691d2e2d, PK palatsin LOD a70ef8f41, NUI kyltit b7b45fef0, PK pariovet 4a2a0658f,
  PK tausta-v99 b6de5360f, NUI nipistys 629ff9da9, NUI tahti bff93a345 + veneet 8ada386f3 + testikorjaus d202f58ce, NUI aarrepiste
  586222bc5, VS rappausrae 9a5662f71 (3 committia: myös JuoksuLattia.shader, Valopohja.cs).
- Kansiot rungossa: rakennukset-v94, tausta-v99, c2-v34, muurikate-v38, osamallit791-v10; piirros TasoVersio veneet-20261102.
- **Pieni iPad** (iPad Pro 11, 00008142-0019686E02F3801C): 52ba93dea asennettu 12.33 omistajan pyynnöstä 12.18
  (`juna213/pieni-ipad.sh <sha9>`; käännös T7:n b6-kopiossa laite210.sh:lla, äppi lokit/natiiviseppa-app-210-runko-<sha>-laite).
- Levy 2.11. 10.2x: linjan 1 Build/dd-laite + laite poistettu PT:n pyynnöstä (proto-3d/tyokalut/vapauta-levy-natiiviseppa-20261102.sh).
- Asemataulu: junat.json "Juna 218" -rivit apuskriptillä (vanha scratchpad 09fcd1aa…/scratchpad/taulu218.py; tee uusi samanlainen).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä tuloste = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -muisti, -tyokalut, -koe67, -varjo eikä T7-kopioita. Simut vain simu-lukko.sh:n kautta.

## ANALYYSI (Pariisin vieritys, tehtävä 1)
- **Striimikartta** = pallon Cesium-tileset `KarttaKerrokset.Instanssi.pallo` + laitteella piirretyt elävät palat Z11–Z17
  (Laattapalvelin.Elava.cs: MVT → JPEG taustasäikeessä, purku pääsäikeessä). PiirrosKerros piirtää ZTest Always päälle, eikä mikään
  pysäytä striimiä piirroksen alla.
- **Valmiit palikat:** `tileset.suspendUpdate` (Ruudunpaivitys.CesiumSeis, CesiumKaupunki) ja renderöijät pois (Pohjapallo.Paljasta /
  CesiumKaupunki.LevonPiirto). Pohjapallo (pergamentti, 1 piirtokutsu) jää näkyviin = yksinkertainen tausta piirroksen ulkopuolella.
  Ehdotus: peitetty = `alfa ≥ 0,999 && tavoite ≥ 0,999` → suspendUpdate + renderöijät pois kerran; heti kun ehto purkautuu, takaisin
  (laatat ovat muistissa, ei latausta). Älä kirjoita päälle muiden pysäytyksiä (Ruudunpaivitys.PysaytettyLevossa, CesiumKaupunki palloOli).
- **Muut epäillyt pääsäikeen kulut PiirrosKerros.cs:ssä:** (a) `Rakenna(p)` joka kehys jokaiselle ladatulle laatalle (81 ECEF-muunnosta +
  verkon lähetys) → rakenna vain, kun georeferenssi muuttuu (`georeferenssi.changed`, kuten Pohjapallo) tai transformin matriisi vaihtuu;
  (b) `HaeLaatta`: `LoadImage` + `Compress` 2048²-laatalle pääsäikeessä vierityksen aikana (luultavasti > 20 ms per laatta). Mittaa
  ensin syyt (KameraKirjoittaja: pitkät ruudut syineen), sitten esim. UnityWebRequestTexture-purku (taustasäie) tai yksi laatta kehystä kohden.
- **Mittaus:** pohjaksi `juna213/vieritys213.sh` (devicectl-komennot: `aja 48.8566 2.3522 <leveys> 2`, `mittaus alku/loppu`, `veto …`;
  nykäysvahti-rivit konsolista, tulkinta tyokalut/nykaysvahti.py). Ennen = äppi runko 52ba93dea (valmiina lokeissa). Pieni iPad on
  omistajan: tarkista ennen ajoa, ettei peli ole hänellä käytössä (asenna210.sh:n prosessitarkistus); kehitysmittaukset Isolla iPadilla
  (vapaa, ipad-lukko.sh), lopullinen todistus pienellä. Muistuta: piirrosta ei saa rikkoa häivytyksessä (kääntö/kallistus → striimi heti takaisin).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~3,5 min; älä mergeä työpuuhun testien aikana; peili käsin:
  git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Toisen roolin commit puuttuu: `git fetch natiivi-backup peili/proto/<rooli>/<haara>`; puhtaus `git merge-tree --write-tree HEAD <sha>`.
- tarkista rc=1 tai testi punainen → korjaus tekijän haaraan, ei poikkeusta ilman PT:tä.
