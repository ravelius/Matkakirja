# Linssisepän luovutus 13.10.2026 klo 23.25

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot: proto-3d/tyokalut/linssiseppa-ajot/ (ketju `ajo-<nimi>.zsh`,
Julkaisija antaa `kaannos-<nimi>.nyt` / `simu-<nimi>.nyt`, irrotus perl setsid). Testit `nice -n 15 sh Linssit-testit/kaanna.sh`,
`nice -n 15 zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`. Edellinen: -20261013-2130.md.

## 1. KUITATTU TÄSSÄ SESSIOSSA
- **Museopalaute 188** `linssiseppa/museo-palaute-188` f7679f89d (iPad + iPhone, palaute188/188c) → junaan 188, NS:llä.
- **Yövartion otsikko** 9d3043465 (sama haara): teoksen ruuturaja myös vapaassa kulussa → otsikko friisin alle, ‹ ›-rivit teoksen alle
  (otsikko188b). Junaan 188, NS:lle ilmoitettu (ota 9d3043465 asti).
- **Vesi index-v20** `linssiseppa/vesi-v20-189` bcd664774 (Tampere KS vesi-v8, tampere3, 3,0 m; vesi19e). Ämpärissä 22.44, NS:lle ilmoitettu.
- **Värikorjaus** `linssiseppa/museo-maa-188` b8e712a87 (SaliMateriaali c.gamma vain maakohtaisille saleille; LR:n löydös): PT kuittasi
  Ranskaan (juna 189). Arkit lokit/gamma188-pt/.

## 2. KUITATTU JUNAAN 189 (PT 23.3x)
- **Vesi index-v21** `linssiseppa/vesi-v21-189` 2b5ac0903 (Tampere KS vesi-v9, tampere4: Näsijärvi +1,0 m, Särkänniemen läiskä lähes
  poissa; vesi19f; v10 ei parantanut, vesi19g). Paketti _valmiit/vesi-v21-vienti-20261013: vienti pyydetty Julkaisijalta, NS:lle ilmoitettu → TARKISTA vesi/index-v21.json 200.

## 3. KESKEN: YÖVARTIO-SALIN KERTOJA (PT 22.3x, junaan kun äänet tulevat)
- museo-palaute-188 bc5057477: kierros.json + mauritshuis-146, -840, -92, -670 SK-C-5:n jälkeen (testi 37 pysähdystä). EI vielä NS:lle.
- Äänittäjä tuo 4 ääntä (SK:n tekstit hyväksytty) → lisää aanet/taidemuseo-kertoja-v2/paasali/<id>.mp3 + ajat/paasali/<id>.json ja
  manifest.json-rivit (sali paasali, kesto_s) → vientipaketti Julkaisijalle → simu: kertoja jatkaa SK-C-5:stä neljän teoksen läpi → PT.

## 4. RANSKAN MUSEO (juna 189, kuitataan laitekuvien jälkeen)
- museo-maa-188 = **dd6ffd800** (LS2: sali-v2e rp-valot, v2f/v2g Mona Lisa, v2h Ajattelijan selkävalo; + minun b8e712a87). LS2 ajaa
  monalisa2-tarkistuksen (Mona Lisa + Ajattelija) ja lähettää PT:lle.
- Teosten ASTC (51) ämpärissä 22.50. Mona Lisan keltaisuus = AgX:n kova min(c, 0,95), jonka f7679f89d korjaa (ei maa-188:ssa).
- Avoimet: Ranskan nayttelykuvat/<huone-id>.jpg + kunniagalleria-panoraama (salikuvat simusta), lahestyminen.json-teksti (SK).
- Peilin push vasta kun koko Ranska kuitataan.

## 5. MUUTA
- Simuskenaarioissa: Ranskan "Louvren klassikot" + "Siirry näyttelyyn" eivät osu (PUUTE, ei haittaa paikka-kuvia); ig/mm vain teoskävelyllä.
- Käytin vahingossa `pkill -f` ankkuroidulla omalla skriptinimellä (ajo-ranska188c) — jatkossa vain pid (`pgrep -f` + kill).
- tools/gpu-vapaa.sh checkoutissa seuraamaton (ei minun, älä committaa).
