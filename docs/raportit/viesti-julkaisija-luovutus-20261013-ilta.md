# Julkaisijan luovutus 13.10.2026 ilta (~18.5x, PT:n nollauskäsky, konteksti ~50 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150; kellonajat `date`-komennosta). Edellinen luovutus
`viesti-julkaisija-luovutus-20261013-aamu.md`. PT: "PÄÄTOIMITTAJA (Opus, max)", session `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31`
(jos SendMessage nimellä ei löydy → `mcp__ccd_session_mgmt__send_message` session_id:llä). Siirtoseppä-nimellä on kaksi riviä:
käytä `Siirtoseppä (Opus, high) [a1f87d]` (tämä kone).

## 0. Sääntö 0 KORJATTU (omistaja 13.10. 18.4x)

**PT:n välittämä "OMISTAJA PYYSI JULKAISUA" RIITTÄÄ** TF:ään (iOS + Mac) ja junan web-mergeihin. Omistaja PT:n ikkunassa: "Totta kai voi
viedä. Se on aina vienyt", ja vahvisti saman Julkaisijan ikkunassa korttivastauksella ("Julkaise nyt… välitetty pyyntö riittää jatkossakin").
ÄLÄ pyydä omistajaa kirjoittamaan Julkaisijan ikkunaan julkaisua varten. Muistiportti pysyy (muistiajo-N.txt), ellei omistaja ohita.

## 1. Juna 187 – JATKOKOHTA

- **Web-merget VALMIS 7/7:** #4535 fd10dad24, #4547 cd89c0611, #4550 fdcb551da (--merge, pinottu), #4561 2e8a09c82 (--merge),
  #4557 1341a69f7, #4558 b924600c0, #4560 9598bbbda. Muutosloki #4567 → e2649e4c2. Lista `julkaisija-tyokalut/juna187-merge-jarjestys.md`.
- **TF 187 iOS KÄYNNISSÄ:** ajo 38425085365 (18.47, proto 6b14ba64961d7a1197a58e906e6edcaaf2f790f5 = BUILD 187), ketju
  `julkaisija-tyokalut/tf187.sh` (irrotettu, jatkuu nollauksen yli), loki `tf187-ketju.log`: TF → vienti ⊇ e2649e4c2 → sisäinen →
  ulkoinen + beta-arvio → vanhennus (186 pois). **Kun VANHENNUS-rivi tulee: rivi PT:lle "TF 187 VALMIS 5/5"** + Laitetestaajalle.
  Jos ketju kuolee: aja tf187.sh:n loput käsin (`gh workflow run testflight-ulkoinen.yml --ref main -f build_numero=187`, sitten
  `-f vanhenna_vanhemmat=187`).
- **Mac 1.1 (187):** NS käänsi (lokit/natiiviseppa-mac-tf-187), "TF NYT" annettu NS:lle 18.4x → NS ajaa proto3d-mac-testflight.yml build=187
  ja ilmoittaa ajon numeron. Varmista NS:ltä.
- **Muistiportti:** `muistiajo-187.txt` = OK bfefbfccb 0,75 Gt (lopullinen 0461129b1: Olavinlinna 1,06, museo 2,50, shakki 2,79).

## 2. Juna 188 (kertyy) ja avoimet

- **Vesi:** index-v16b VIETY 18.36 (CDN 200; Tampere 0,4 m) → koodi `linssiseppa/vesi-v16-187` (NS siirsi 188:aan). Myös v15, v16 ämpärissä.
- **LS1:** ei avoimia ketjuja (vesi187n, vesi187o valmiit 18.42/18.48). Lautat188(b), kaukolautat-188 = juna 188. LS1 pyytää simut
  `simu-<nimi>.nyt` / `kaannos-<nimi>.nyt` / `linja-<nimi>.txt` -tiedostoilla kansiossa proto-3d/tyokalut/linssiseppa-ajot/ (luo ne kun annat
  vuoron; tarkista `pgrep -f ajo-<nimi>.zsh` ja **udid ennen rinnakkaista lupaa** – sama iPad 00CF62C2 kahdelle ketjulle törmäsi 12.49).
- **LS2:** koopenhamina-korkeus 479b545e1 (DHM v3) = PT kuittasi 187:ään (mukana BUILD 187:ssä). Ei avoimia.
- **KS:** ei avoimia vientejä. Kööpenhamina: pallokierros-v3…v6, korkeus v2/v3, Tukholma maa-v3 (Lantmäteriet CC BY 4.0) viety.
- **NUI, PK, SK, NS:** ei avoimia vuoroja. SK:n #4557/#4558 mergetty → SK poistaa worktreensa.
- **Huom:** Macin uudelleenkäynnistys ~13.40 tyhjensi /tmp: Olavinlinna-vahdin taukolippu ja vahti ovat poissa (linna tauolla, ei tarvita).
- **Hiljainen tunti** (omistaja Macilla) ilmoitetaan PT:ltä: ei KÄÄNNÖS/SIMU-vuoroja, ämpäriviennit sallittu.

## 3. Käytännöt tältä päivältä

- Simuraja ≤ 2 päivällä; lyhyet kiireelliset ajot saa ajaa toisen roolin simulla vain sen roolin luvalla (todistusajo sammuttaa simun lopuksi).
- vie-paketti.sh hylkää paketin, jos LAHTEET.md ei mainitse lisenssiä → pyydä tekijää lisäämään rivi, älä muokkaa itse.
- CDN-404-välimuisti: tarkista viennin jälkeen `curl` ilman `?t=`, kun polkua on kysytty ennen vientiä.
- Pelin assetteja muuttavat web-PR:t (esim. assets/kartat) pidätetään julkaisuun asti; työkalu-/testi-PR:t mergetään vihreinä (#4565 174354c15).
- Monitorit (lukot, TF-ketju) on asetettava uudelleen nollauksen jälkeen; 30 min välein uusinta.
