# Natiivisepän luovutus 3.11.2026 klo 18.45 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1708.md. Sen viittaaman 1622-luovutuksen TILA-osio
(haarat, worktreet, simuketju, lukot, testit) on yhä voimassa: `git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).

## ODOTTAA (JU → sinulle, keskeytä erä sen ajaksi)
- JU:n iso-paketti **c5a120c78** = aaaed4758 (loppurajaus) + **80ea01172** (lähtörajan korjaus) + muistivahti 3e0447b47
  (+ NUI:n kekomittari 453a76a42). JU kääntää Tripo-tauon jälkeen (~19.10, L1) → paketti-iso.zsh (saapuminen 0–60 s kuvat 3 s
  välein, 4 zoomia, ruutuajat) → muistivahtiuusinta jatka → lähizoom → tulos sinulle.
- Analysoi: (1) alun VIKA poissa? jatka-huipun pitäisi pudota 4,4–4,9 Gt:stä noin 2,6 Gt:hen, keko ei saa nousta 0,5 → 2,7 Gt
  ~9 s jatka:n jälkeen; NUI:n "MATKAKIRJA keko:" -rivit kertovat, jääkö NostoSisalto- tai ElavatHetket-osuutta (NUI tai VS).
  (2) lähizoomin huippu (b2a1d27b7: 3,78 Gt), (3) loppurajaus-kuvat 3 zoomia. Analyysiskriptit (scratchpad, kopioi):
  fp-huiput vaiheittain N-riveistä, ms → kello L-rivin kuvaloki-aikaleimasta, keko kuva-lokista (TULOS.md:n taulukko).
- Tulos PT:lle ≤ 3 riviä + tiedosto.

## TEHTY TÄLLÄ VUOROLLA
1. **b2a1d27b7 2 toistoa** (lokit/natiiviseppa-muistihuippu-b2a1d27b7-1748, -1755, **TULOS.md**): ei kaatumista; lähizoom 3,78 Gt
   (44ecc31d1 3,64) → gc-mvt 2856c5cc3 ei auta lähizoomiin. Jatka-huippu 4,80 / 4,88 Gt (vapaa 315 / 242 Mt).
2. **Syy: oma 9613f5ad7 EnnakoiLahto** (KarttaKerrokset): joutilaana lähdön välitasot z11–z16 koko näkymän ruudusta myös
   maanäkymässä. GBR 1 513 km → 18,2 milj. palaa, FRA 1 333 km → 9,5 milj. → Mono-keko +2,2 / +1,2 Gt, pääsäie seis ~5 s.
   JU:n 54b6e3b2c-mittaus (VIKA 4191 / 4403 Mt ~9 s jatka:n jälkeen) ja NUI:n analyysi (nui-lahizoom-20261103/analyysi-54b6e3b2c.md)
   vahvistavat.
3. **Korjaus 80ea01172** (proto, haara natiiviseppa/lahto-raja-218, pohja 9b9695a7d, peili pushattu, wt/proto-natiiviseppa-lahtoraja):
   ElavaEsilataus.Lahto(…, lahiZ): ruutu > 24 km (z11-kartio, LahtoEnintaanKm) → tyhjä; EnnakoiLahto palaa heti maanäkymässä ja antaa
   lahiZ = LoppuTaso(nykyinen korkeus) + 1. Testi LahtoMaanakymastaTyhja; Kartta-testit ElavaEsilataus 8/8. tarkista.sh 0 virhettä
   (aaaed4758 yksin ja aaaed4758 + 80ea01172; yhdistelmähaara natiiviseppa/tarkistus-lahtoraja-218 = 72973621c, saa poistaa).
4. Reunat pois -ruutuprosentit PT:lle (kauko 1,0/2,7 %, keski 1,0/0,3 %, lähin 0,7/0,1 %, zoom 0,5/0,0 %) → reunat ON pysyy.
5. Levy: 6 merged-worktreetä poistettu (-1230 … -1556).

## UUSI ERÄ (PT 18.5x): Pariisin koealue striimikartan päälle, OSA C – toteuta tämä
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-striimikartan-paalle.md
(kohdat Tekotapa 2 ja Osat C/D). Ei NUI:lle. VS tekee osan B (proto linssiseppa2/pariisi-tyyli 8e8b0f25b: ElavaPariisi.cs, kytkin
`elavakartta pariisi 1|0`, ElavaPariisi.Paalla; vertailu VS:n sk-k1.txt: `karikatyyri pois` + `elavakartta pariisi 1`).
VS:lle lähetetty 18.4x rajapintaehdotus (odota vastaus): (1) yhteinen kytkin ElavaPariisi.Paalla; VS lisää
`ElavaPariisi.Sisalla(lat, lon)`, (2) esineet omana instanssikerroksena laattojen päällä, ei laattarasteriin, (3) puut vain
esinekerroksessa (ElavaTyylin puut pois koealueella).

Suunnitelma koodiksi (oma, ei vielä aloitettu):
- **Data**: KS:n _tyo/karttaseppa/pariisi-koealue-20261103/esinepaikat.json (8 nähtävyyttä lat/lon, enu, pituus/leveys,
  suunta_ast; 1 liikenneympyrä; 73 aukiota (koko pieni/keski/iso); 61 puistoa; 18 suihkulähdettä) ja puut.json (5 143 puuta ENU
  x/y m, origo 48.86122, 2.35092, koko pieni/keski/iso/tuntematon, rivi). Työkaluskripti (tyokalut/koealue_esineet.py) → pieni
  Resources/Elava/koealue-pariisi.json (puut: bulevardit = rivi, rannat ja puistot = puiston sisällä; muut pois).
- **Kerros**: PiirrosKerros.Esineet.cs (partial), kutsu Paivita():ssä ENNEN `alfa <= 0.001f` -paluuta (koealue näkyy, kun
  karikatyyri on pois). Näkyy: ElavaPariisi.Paalla, kamera koealueen lähellä, korkeus < ~20 km (puut < ~6 km), häivytys korkeuden mukaan.
- **Paikka**: esineet ENU-kehyksessä origosta (2,5 km: kaarevuus ~0,5 m, ei väliä). Origokehys kolmesta pisteestä
  (origo, 100 m itään, 100 m pohjoiseen) georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity, korkeus MaanpintaH; instanssien
  maailmamatriisit uudelleen vain kehysVersion muuttuessa (~5 000 kertolaskua).
- **Piirto**: Graphics.RenderMeshInstanced, quad maassa (pohjoinen ylös 0°, viisto kuva "etelästä 45°" kuten tyylimalli), kuva per
  esinelaji. Uusi varjostin Varjostimet/KoealueEsine.shader (URP unlit, läpinäkyvä, multi_compile_instancing, _Alfa). Nähtävyydet
  liioiteltuina (G-liioittelu 1.11.), ankkuri Codexin esineet.json:sta (ankkuri_px = maantason keskipiste).
- **Kuvat**: Codex _review-koealue/ (KS:n tilaus ab78cb4c0: esine-notre-dame, -louvre, -sainte-chapelle-oikeuspalatsi,
  -hotel-de-ville, -tour-saint-jacques, esine-aukio-pieni/keski/iso, esine-puu-pieni/keski/iso/jattilainen) → KS tarkistaa → sinulle.
  Siihen asti väliaikaiset merkit koodissa (ympyrä + musteviiva).
- **Kyltit todellisiin koordinaatteihin**: PiirrosKerros.PiirroksenKohta → null, kun ElavaPariisi.Paalla ja piste koealueella
  (NakyvaLat, NakyvaKorkeus, Nimikerros.cs:439, PalloKierto.cs:477 seuraavat); Kohdenostot.cs:86 (piirros-pariisi.json-kuvapiste
  Nakyvyys-painolla) ohittaa koealueen pisteet samoin.
- **Todistus (osa D)**: paikat skriptillä OSM:ää vasten, ruutuajat ja muisti isolla iPadilla ennen/jälkeen (JU:n vuoro),
  kuvapari nykyinen | koealue samasta rajauksesta 3 zoomilla (VS:n sk-k1-zoomit) → PT.

## JONO
0. Erä OSA C (yllä); JU:n tuloksen tullessa analyysi ensin. 1. Vanhan jonon kohdat ennallaan (354 ms PostLateUpdate → xctrace;
osa D NUI:n A + C jälkeen; GC-haara vasta PT:n luvalla). Jono tyhjä → "JONO TYHJÄ: Natiiviseppä" PT:lle.

## TILA
- Uudet: proto natiiviseppa/lahto-raja-218 (80ea01172, wt/proto-natiiviseppa-lahtoraja; esinekerroksen voi aloittaa omaan haaraan
  natiiviseppa/koealue-esineet-218 pohjasta 9b9695a7d tai VS:n 8e8b0f25b:n päältä, kun ElavaPariisi on tarpeen kääntämiseen).
- wt/proto-natiiviseppa-haivytys = natiiviseppa/loppurajaus-9b9-218 (aaaed4758).
- Worktree wt/natiiviseppa-luovutus-1845 saa poistaa mergen jälkeen (myös -1708, -20261103-1622).
