# Julkaisijan luovutus 15.10.2026 klo 16.4x (konteksti ~35 %, PT:n pyyntö)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Edellinen: `viesti-julkaisija-luovutus-20261015-paiva.md`.
Asemataulu (TÄMÄ TILI): https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm (talo/eteneminen, talo/junat). Osoitekirja /Users/Shared/Claude/osoitekirja.md.

## 0. UUDET OPIT TÄNÄÄN
- **Docs-PR ei aja testejä** (testit.yml paths-ignore docs/**, *.md, muutosloki): merge suoraan `--match-head-commit`. Lue työnkulut
  `git show origin/main:.github/workflows/…`, ei paikallisesta (vanha). (#4613 suljettiin turhaan.)
- **Vahdin simuvuoro = `touch /tmp/matkakirja-valovahti-simu.nyt`** SIMU-PYYNTÖ-rivistä (vahti ei käynnistä itse; 60 min raja).
  Junan lukituksen ajaksi `echo "<syy>" > /tmp/matkakirja-valovahti-tauko`, poista kun L1+L2 vapaat.
- **Sisältövienti on sarjajono** (vie-sisalto.yml, cancel-in-progress false, 1 pending): ajo ~65–75 min. Jos TF odottaa vientiä,
  vanhan in_progress-ajon peruutus (PT:n luvalla) käynnistää uusimman heti; uusin kirjoittaa koko paketin.
- **Web-PR:t (js/packs, sw.js) vain OMISTAJA PYYSI JULKAISUA -hetkellä** (PT vahvisti 16.0x), vaikka PT sanoisi "kun vihreä".
- **Äänisivun suojaus**: Macin DNS ei ratkaise *.pages.dev → `curl --doh-url https://1.1.1.1/dns-query` (dangerouslyDisableSandbox);
  Access-API-tarkistus aanisivu-julkaise.zsh rivit 1–17.
- **NAS-bundle**: launchd pois (bootout + disable), skripti korjattu; ajo omalla CRONilla 04.03 (aloitusviestin kohta 4).

## 1. Juna 193 – VALMIS 5/5 (15.29)
LUKITSE 14.15 → web #4612 5083e6069 → M 684c434c8 → BUILD 39784f0ed → TF 38726975576 ✓ 14.32 → sisäinen ✓ 14.36 → vienti ✓ 15.22 →
ulkoinen + beta-arvio HYVÄKSYTTY 15.28 → vanhennus 192 ✓ 15.29. Asemataulu + junat TF 193 päivitetty.

## 2. Juna 194 – KÄYNNISSÄ (OMISTAJA PYYSI JULKAISUA 16.05 ehdollisesti, PT LUKITSE 194 16.2x)
- Web MERGED: #4620 eca436fc8, #4624 ee8cf88f5, #4625 100b07b42 (isoisä v3; -v3-äänet ämpärissä 15.58). Myös #4623 aff250785.
- M (muutosloki #4626) = 5f48994bf3bdf539aab4c7894396ed426b5822ee (⊂ 100b07b42).
- **EHTO (NS/PT): TF vasta kun vienti ⊇ 100b07b42 on valmis** (muuten natiivi soittaa -v2). Vienti 38743063789 in_progress
  16.32 alkaen (eca436fc8-vienti peruttu PT:n luvalla) → valmis ~17.40. Taustalla odotus (b2aftkvee) – uudessa sessiossa:
  `gh run view 38743063789 --json status,conclusion`.
- Ennen TF:ää (PT): tarkista CDN:stä tarinakaari.json:n -v3-nimet + yksi #4620:n tiedosto (`?t=`-parametri).
- NS: L1 iOS-lukitus + L2 Mac käännöksessä 16.30 (runko da6b64860). Odota BUILD-SHA → `tf-kaynnista.sh 194 <BUILD> 5f48994bf3bdf539aab4c7894396ed426b5822ee`
  (muistiajo-194.txt = OHITETTU valmiina). Sitten pollaava Monitor tf194-ketju.log; vaiheet tauluun, sisäinen → rivi PT + KK.
- **Valovahti-tauko päällä** (/tmp/matkakirja-valovahti-tauko) → poista kun L1 + L2 vapaat.
- Asemataulu eteneminen v17: 2/5, arvio TF ~18.50 (päivitä: nyt ~17.50).

## 3. Viennit 15.10. iltapäivä (kaikki 0 virhettä)
manifest-193 (LS1), pilvet-v4 (Valoseppä), PK praha-v6/ateena-v7/historia-v1, PK ateena-v8 + historia-v2, andoya-kauko-v2 (Julkaisija
paketoi), maa-koopenhamina-dhm-v3 (KS), maa-ateena-lontoo-v2 (KS), PK ateena-v9 (aebe63f8…, PK vahvisti).

## 4. Muut
Merget: #4609 #4579 #4611 #4615 #4616 #4617 #4618 #4619. Louvre v1c -pari Valosepälle 16.34. Linjat: NS 194; simut 0/2.
Cron 04.03 NAS-bundle (session-only) → luo uudelleen.

## 5. Lisäys 16.4x (ennen nollausta)
- **BUILD 194 = b110dff52ab9166fca0f36ead256d68ae7c8c12d** (NS L1 KÄÄNNETTY fd13650bd 16.35). Mac 194 käännetty; NS käynnistää Mac-TF:n,
  kun ilmoitat viennin valmiiksi. → `tf-kaynnista.sh 194 b110dff52ab9166fca0f36ead256d68ae7c8c12d 5f48994bf3bdf539aab4c7894396ed426b5822ee`
  heti kun vienti 38743063789 = success ja CDN-tarkistus OK; sitten rivi NS:lle ("vienti valmis, Mac-TF").
- Valovahti-tauko POISTETTU 16.4x (L1 + L2 vapaat).
- Valosepän Louvre v1c Google -ajo (kuvat-google.zsh, A26BC7D0) käynnistetty 16.4x tämän session taustalla; jos nollaus katkaisi sen,
  tarkista `/Users/Shared/Claude/proto-3d/lokit/valoseppa-louvre-v1c-google-ajo.log` ja kerro Valosepälle (aja uudelleen tarvittaessa).
