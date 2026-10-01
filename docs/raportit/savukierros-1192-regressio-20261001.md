# Savukierros 1.1 (92) cf1a5326 — regression täydennys, iPhone 18 Pro (1572C658), 1.10.2026 klo 08.4x–08.5x

UnityFramework-md5 = juna-1.1.92-cf1a5326 (b4f90ae8…). Pelin ääni mykistettynä (`aani mykistys 1`); `aani mykistys 0` vain ~4 s tasomittauksiin. 0 Exception, 0 layout-varoitusta (konsolit konsoli.txt…konsoli4.txt). Täydentää `savukierros-1192-20261001.md`.

HUOM menetelmä: vahti asensi 93-junan (ef4a9319) simulaattoriini kesken ajon (~08.49, md5 a8ef0246 ≠ 92); asensin 92:n takaisin (md5 b4f90ae8 ✔) ja ajoin ääni- ja pelaaja-kohdat uudelleen 92:lla. Tuore asennus: pelin "Laita äänet päälle" oli pois → alkumittauksissa humina taso 0,00 / tavoite 0,00 (EI vika: äänet-asetus). Napautettuani "Laita äänet päälle" luvut ovat alla.

1) Astronautin kameran kuvanäkymä (`astro kuva 0`): PASS. Etna — Sisilia, Italia -kuva, ‹ › -napit alhaalla keskellä, kaksi pikkukuvaa, Maa-pallo vasemmalla, minipulu oikealla; valikko "Minne katsotaan?" (Maapallo, ISS:n rinnalla, ISS:n sisälle, Avaruuskävely, Astronauttien kuvat, Kysy Pululta).
2) ISS:n rinnalla -humina (83:n FAIL): PASS. `ui cupolaaani`: humina tila 2 taso 0,63 tavoite 0,63, radio 0,00; `aani mittaa 3`: rms 0, soivia 0 [] (ei Maisemaa astronautin-kamera/…93aaf7fb.mp3). `kuvat/regr92-iss-rinnalla-20261001.png`.
3) Cupola (ISS:n sisälle, ikkuna): PASS. Näkymä + ohjauspaneeli (Nopeus LIVE, Pilvet, Kuukausi, Kohde, Oma paikka, Poistu), "ISS · 425 km · 27 560 km/h"; humina 0,63, radio 0,07 (puhe True → väistö), tila 2 = soi; `silmukat: 0 soi cupola-humina-90s.wav`, `1 soi cupola-radio-eva38-23min.mp3`.
4) Äänimikseri Cupolassa: PASS. Nappi (keltainen liukusäädinkuvake vasemmalla) → paneeli: Humina, Radio, Huminan väistö, Radion väistö, A/B; `ui mikseri tila` → "auki · ISS · Cupola · A · humina=100, radio=100, humina-vaisto=100, radio-vaisto=100". `kuvat/regr92-cupola-mikseri-20261001.png`.
5) `ui pelaaja 1|0` Cupolassa: PASS. `pelaaja 1` → mikserinappi piilossa (`kuvat/regr92-cupola-pelaaja1-…`), `pelaaja 0` → nappi takaisin (`…-pelaaja0-…`). (Linnassa pelaaja 1/0 todennettu 1.1 (91):ssä; ei muutosta tässä.)
6) Ei ajettu: avaruuskävely/EVA-kuvaa (komento kuittautui jo 92-kierroksella), Cupolan Poistu-nappi.

Lopuksi: uninstall + iPhone Shutdown (iPad ei käytetty). Seuraava asennus: 93 (ef4a9319) on proto-3d/lokit/juna-1.1.93-ef4a9319/ — vahti asentaa sen uudelleen tai asennus käsin.
