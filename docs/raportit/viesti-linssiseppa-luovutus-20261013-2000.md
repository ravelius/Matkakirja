# Linssisepän luovutus 13.10.2026 klo 20.00 (PT:n nollaus 50 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot kuten ennen: ketju `ajo-<nimi>.zsh` kansiossa
proto-3d/tyokalut/linssiseppa-ajot/, Julkaisija antaa `kaannos-<nimi>.nyt` / `simu-<nimi>.nyt`, irrotus perl setsid; ilmoita LUKKO VAPAA ja SIMU VAPAA.
Testit `nice -n 15 sh Linssit-testit/kaanna.sh`, `nice -n 15 zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`. Edellinen: -20261013-1753.md.

## 1. KUITATTU TÄSSÄ SESSIOSSA
- Juna 187: kaukolautat b2c813d6c (PT ilmoitti NS:lle).
- Vesi: index-v16 (ämpärissä 18.30) → PT:n ehto Tampere 0,4 → **index-v16b 8c6aa45c3** (ämpärissä 18.36; NS: myöhästyi 187:n lukituksesta → juna 188).
  **index-v17 77825ca2c** (linssiseppa/vesi-v17-188, Oslo/Bergen/Islanti 3,0 m; ämpärissä 18.58) KUITATTU junaan 188 ja NS:lle.
- **Maa Tukholma v3 b4769884a** (linssiseppa/maa-tukholma-v3-188, wt proto-linssiseppa-maa188): KUITATTU junaan 188, NS:n muistiajo. Kuvat lokit/maa188-pt/.

## 2. KESKEN: VESI v18 (PT:n lupa omana eränä: Tampere v3, Sevilla v3, Sofia v3, Lissabon v2; KS:n paketit _tyo/karttaseppa/kaupunki-<id>-20261013/vesi-v{2,3}/)
- Testi paikallisella juurella: scratchpad vesitesti/ (index-v15.json + index-v17.json = v17, tiedosto <id>2 → KS:n paketit), python http.server 8787
  (prosessi 34889 kuuntelee yhä; sk:ssa `doc kaupunki-vesi.txt=http://127.0.0.1:8787/`). HUOM: uusi sessio ei näe palvelinta → käynnistä uudelleen
  (`python3 -m http.server 8787 --bind 127.0.0.1 --directory <vesitesti>`), jos 34889 on kuollut.
- vesi188a: toisen käynnin kamera samassa kaupungissa osui väärälle korkeudelle (Sofia harmaa, Lissabon/Tampere maassa) → **vesi188b VALMIS 20.02: lokit/todistus-vesi188b-ipad-20261013-1955 (katso kuvat, vertaa 188a:n ennen-kuviin)**
  (vain v18, yksi käynti/kaupunki; vertaa vesi188a:n "ennen"-kuviin). Havainnot 188a:sta: Sevillan järvi täyttyi oikein (v3), mutta iso tumma
  suorakaide pellolla (37.355,-5.915) jää molemmissa → KS:lle; Guadalquivirin vaalea läiskä (37.325,-5.995) ei muutu.
- Kun kuvat kelpaavat: index-v18 (kuten v17: _valmiit/vesi-v18-vienti-…, "tiedosto": "<id>2", vesipalat <id>2-8m.{json,bytes} mukaan pakettiin
  + LAHTEET lisenssirivillä!) + VesiIndeksi v18 ensin (haara vesi-v17-188 päälle) → Julkaisija → kuvat PT:lle. Tampere: 3,0 m v3-datalla testissä.

## 3. KESKEN: RANSKAN TAIDEMUSEO (PT; salit 1–3 minun, sali 4 Rodin = LS2)
Haara **linssiseppa/museo-maa-188** (wt /Users/Shared/Claude/wt/proto-linssiseppa-museo188, BUILD 187 6b14ba649 päällä):
275873464 MuseoMaa (Museo/<maa>/, taidemuseo/<maa>/, "museo maa ranska", sali.json glb/esteet/penkit) · 2a2e024e4 Ranskan data (LR sali-v1, 55 maalausta,
huoneet 4, kierros 52, Louvre/Orsay Codex-lähestyminen) · 8e4f9fb31 ranska.meta + veistokset.json LS2:n GUIDilla · **4e96f619f veistospysähdykset**
→ LS2:n Rodin-pysähdykset linssiseppa2/museo-ranska-rodin2 4a8c0525c (4e96f619f:n päällä; kierros + rodin-rivi; LS2:n oma Rodin-simu) — seuraava Ranska-käännös siitä. Testit 1746/1746, unity 0. Teosluettelo: _tyo/linssiseppa/taidemuseo-ranska/teosluettelo-v1.json (+ tee_teokset.py).
LR: sali-v1 ämpärissä (taidemuseo/ranska/sali-v1/), tekee v2:ta (puutarha + taivas.glb -sopimus, Mona Lisan keila).
Simu ranska188a (fc00e45c0 = 8e4f9fb31, lokit/todistus-ranska188a-ipad-20261013-1949): sali, ripustus ja kävely toimivat. AVOIMET:
1. Teoskuvat 404 (SK lataa Commons-kuvat → teos_astc.py astc-v1/<id>/ + lahde/kuvat/seina/<id>.jpg → vienti).
2. Kultakehykset näkyvät ORANSSEINA (fr_-profiilit, kehysmateriaali kulta + uuden salin KultaValoUusi?) → mittaa ja korjaa.
3. Näyttelyvalinta: otsikko/teksti "Rijksmuseum" ja Kunniagallerian panoraama → ui.museo.aloitus-* ja panoraama maan mukaan (Museo/<maa>/nayttelykuvat/,
   otsikko/teksti lahestyminen.json:sta) + salikuvat ranska/nayttelykuvat/<huone-id>.jpg.
4. Rodin-sali puuttui listasta (build ennen 4e96f619f:ää) → seuraava käännös. MuseoTaulun listassa vain Teokset (veistosrivit LS2/NUI).
5. Oma sk-virhe: "museo paikka" yaw 180 katsoi taaksepäin (sk-ranska188a-ipad.txt rivit r11–r13).
6. Lähestymisen teksti/puhe: SK:n infolappu odottaa hyväksyntää (lahestyminen.json luonnos).
Rodinin mallit: _valmiit/taidemuseo-ranska-patsaat-astc-v1-vienti-20261013 (LS2 korjasi, vientijonossa).

## 4. MUUTA
- LS2 tekee VeneAanet-rajan (haara linssiseppa2/veneaanet-raja), älä koske VeneAanet.cs:ään.
- Proto-wt:t: palaute187, kippi187, alkulento187, katso187, vesi187 (haarat vesi-v15-187 / vesi-v16-187 / vesi-v17-188), lautat188, maa188, museo188.
- Appikopiot lokit/linssiseppa-app/: maa-188 (105870ae6), ranska-188a (fc00e45c0), vesi-187k.
