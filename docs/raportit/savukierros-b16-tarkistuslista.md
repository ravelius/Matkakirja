# Savukierros build 16: tarkistuslista (Fable 25.9.2026 klo ~19.4x)

Aja kun Pelikoodari ilmoittaa SHA:n (juna/b13, ~20.30–20.45) ja käännösvahti on
asentanut sen (juna.log + `simctl listapps`). Laitteet: iPhone 1572C658, iPad
3B4CDACB (sammuta kierroksen jälkeen). PASS-commit → Fable + Julkaisija rivillä.

1. Ydinkulku kuten build 15 (iPhone + iPad): kylmä käynnistys → aloitusnäyttö →
   Uusi matka → valinta kartalta → lento (Ohita) → Ateena (nosto, matkakirja) →
   radio (`linssi radio`) → avaruuslinssi (`linssi satelliitti`) → liikkuminen
   (`kulkutapa liftaus`, `ui liiku`, `siirto <avain peli-tila.json:sta>`).
2. Lämpövartija (kehittäjätila `defaults write` sovellus kiinni; tyhjennä
   kehysajat.jsonl): levossa (taysi=0) fps ≤ 30 ja lepo.p50 ≥ 30 ms; NYT myös
   lepopiirto: paikallaan > 0 ja piirretty < kehyksia. `lampo kuuma|kriittinen|auto`
   → 30/20/60 fps, renderScale 0,7/0,7/0,8. Edellinen tulos: savukierros-b16-lampo-20260925.md.
3. Ihmisen matka II avautuu (lens `ihmisen-matka`, tarkista nimi Linssiomistus.cs:stä)
   ja CC-nappi toimii.
4. Maakunnat "Pois" (☰ → Nostot/Maakunnat -paneeli, valinta Pois).
5. UITK-napit todennetaan kuvakaappauksesta, ei ui-puusta.

## Lisätieto (Fable 25.9. ~21.4x)
CC-nappi on Ihmisen matka II:n AIKAJANAN vuosilukurivin (alareunan "300 000 v.
sitten" -rivi) OIKEASSA PÄÄSSÄ — ei ylärivillä eikä ☰:ssa. UITK-elementti, näkyy
vain kuvakaappauksesta; näkyy linssin auettua koko ajan, tekstitys oletuksena
pois. Todenna kuvasta seuraavalla kierroksella (kokeile myös napautusta:
tekstitys päälle/pois). Alkuperäinen "ei löytynyt" johtui siitä, että etsin
ylärivistä (raportti savukierros-b16-20260925.md, Avoinna).
