# Linssisepän luovutus 14.10.2026 klo 01.30 (NOLLAUS, PT:n pyyntö)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot: proto-3d/tyokalut/linssiseppa-ajot/ (ketju `ajo-<nimi>.zsh`,
Julkaisija antaa `kaannos-<nimi>.nyt` / `simu-<nimi>.nyt`; yöllä saa luoda saman apin uusintojen simu-liput itse, kun simuja < 2 (`pgrep -f todistusajo`),
ilmoita SIMU VAPAA; käännökset aina Julkaisijan kautta). Irrotus perl setsid. Testit `nice -n 15 sh Linssit-testit/kaanna.sh`,
`nice -n 15 zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`. Lopetus vain pid:llä (EI pkill -f). Edellinen: -20261013-2325.md.

## 1. KESKEN: OMISTAJAN LIIKEBUGIT (juna 189) — haara `linssiseppa/museo-liike-189`, wt /Users/Shared/Claude/wt/proto-linssiseppa-alkulento187
Omistajan pyynnöt sanatarkasti (14.10. 00.5x, TF 188):
- "taaksepäin astuminen voi jäädä looppiin, jolloin peli astuu sisään-ulos vuorotellen"
- "siirryttäessä toiseen maalaukseen metrokartan kautta, peli liikkuu liian nopeasti ja ilman s kurvi kiihdytyksiä. korjaa"
Haara = museo-maa-188 (9710d3a67) + merge natiiviseppa/juna-189 (68bf3626f) + korjaukset:
- **27909b9f3** taakse-jakso: syy toistettu testissä (MuseoOvensuuTestit.TaakseToistuvaNapautusEiPalaaSisaan: 3,00 → 2,19 → 3,00 → 2,19 m) —
  3 m:n jälkeen seuraava alareunan napautus oli osoitus lattiaan teosta kohti. Nyt jakso jatkuu (alareuna astuu lisää taaksepäin, enintään 15 m,
  katse ±35° teoksessa; kääntyminen/kävely/muu osoitus päättää), liu'un aikana alareuna ohitetaan (TaakseLiukuu, loki "taakse-liuku käynnissä,
  ohitetaan"). Uusi testi TaakseEiHeiluSisaanUlos (kaikki salin teokset, kierros + vapaa).
  S-käyrä: MuseoKavely 4 → 1,8 m/s, MaxS 6 → 20 s, rampit ≤ 1,8 s (sinirampit: kiihtyvyys alkaa nollasta), käännös 180° 1,0 s; MuseoLiuku samalla
  käyrämuodolla (MuseoKavely.SKayra, kestot ennallaan). Nopeuskäyrä ennen/jälkeen lokit/liike189-pt/nopeus-ennen-jalkeen.png.
- **f5dae4fc5** Ranskan lähestymissarjan otsikko kuvan mukaan (SarjaKuva.Otsikko; Louvre / Musée d'Orsay / Musée Rodin; vaihtuu ristin puolivälissä).
Testit 1754/1754, unity 0. Simu `ajo-liike189.zsh` (käännös L2 + iPad + iPhone; sk-liike189-{ipad,iphone}.txt: taakse t0–t3, metrokartta m1–m5,
Ranskan otsikot r1–r3) → TARKISTA lokit/todistus-liike189-* ja lähetä PT:lle (kuva-arkki + lokirivit "alareuna → taakse"/"ohitetaan").
PT kuittaa → ilmoita NS:lle runkoon 189 (museo-liike-189 sisältää museo-maa-188:n).

## 2. KUITATTU JUNAAN 189 (NS:lle ilmoitettu)
- **Rijksmuseum kartalla** `linssiseppa/museo-kartta-189` 8e9480624 (juna-189 + 1): KaupunkiPallot.LisaaMuseo (näkyy kun taidemuseo Saatavilla),
  KaupunkiPalloKuva.LuoMuseo, Resources/KaupunkiPallo/rijksmuseum_kartta.bytes (LR rijksmuseum-kartta-v1). Kuvat lokit/museokartta189-pt/.
  Siirtoseppälle ilmoitettu: kuvia ei tarvita.
- **Vesi index-v21** `linssiseppa/vesi-v21-189` 2b5ac0903 (Tampere KS v9), ämpärissä 23.26.
- **Ranskan museo** `linssiseppa/museo-maa-188` (HEAD 9710d3a67): värikorjaus b8e712a87 (kuitattu), LS2:n sali-v2e…v2h (dd6ffd800), Rodin-lähestyminen
  bbdaa467c (kuitattu), valintasivun salikuvat v1 9710d3a67 (NUI mergeää; v2 tehtävä HDR-korjauksen jälkeen samoilla nimillä, impressionismi heikoin).

## 3. ODOTTAA MUILTA
- Yövartio-salin kertoja: museo-palaute-188 bc5057477 (kierros + 4 teosta, testi 37) EI vielä NS:lle; Äänittäjä tuo 4 ääntä → manifest-rivit
  (aanet/taidemuseo-kertoja-v2/paasali/<id>.mp3 + ajat/) → vienti → simu (kertoja jatkaa SK-C-5:stä) → PT. HUOM: bc5057477 on juna-188-haarassa →
  siirrä cherry-pickillä museo-liike-189:ään, kun äänet tulevat.
- Rodinin vaakakuva: Codex tilattu uudelleen → kun PT hyväksyy, korvaa Resources/Museo/ranska/rodin-lahestyminen-codex-vaaka.jpg (nyt 4:3-rajaus).
- LS2: välikuva RGB111110Float (MuseoNayttamo) → Mona Lisan/Orsayn väärävärit; teosvienti ASTC ok.

## 4. MUIDEN TYÖT (älä koske)
- Siirtoseppä: kehykset + rae (MuseoValaistu.shader, MuseoRakennus.AsetaPinnat, MuseoSovitin "pinnat"-rivi) siirtoseppa/museo-pinnat-189 08550d4cd.
- NUI: tauko-nappi + ‹ ›-nuolet + ☰-valikko + valintasivu (MuseoTaulu*.cs, MuseoSovitin.Tauko/MuseoKertoja, UiKomennot) natiivi-ui/museo-valinta-189.
- KS: Tampere valmis (v9); Särkänniemen kaistale = Googlen pinnan kohouma, ei jahdata.

## 5. MUUTA
- Levy: vanhat app-kopiot + todisteet NAS:lle (11,7 G). Käytössä lokit/linssiseppa-app/{vesi-187k, otsikko-188, rodin-189, museokartta-189, liike-189}.
- LS2:n rodin5/rodin6-apit T7:llä /Volumes/T7 4TB/Matkakirja-arkisto/linssiseppa2-app/.
- Worktreet: proto-linssiseppa-{palaute188 (museo-palaute-188), museo188 (museo-maa-188), katso187 (museo-kartta-189), alkulento187 (museo-liike-189),
  vesi187 (vesi-v21-189)} + vanhat.
- tools/gpu-vapaa.sh checkoutissa seuraamaton (ei minun, älä committaa).
