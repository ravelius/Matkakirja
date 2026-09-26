# TF 1.0.27 -juna juna/b13 5cbd7870 (käännös 16be7e44), 27.9.2026 ~01.3x

Valmisteltua reseptiä ajettu (docs/raportit/laitetestaaja-reseptit.md, "TF 1.0.27 -kierroksen
valmisteltu resepti"). Käännös oli jo asennettu simulaattoreihin Natiivisepän toimesta 01.18 — ei
tarvinnut reinstallia (oppia edellisestä sudenkuopasta: en koskenut asennukseen). iPhone yksin,
console-pty-kaappauksella.

## Tulokset

- **0 poikkeusta koko session ajan: PASS.**
- **178 (nähtävyyskartalla vain paikat): PASS.** `ui nahtavyydet amsterdam`: kartalla vain
  rakennuskohteita (4 kpl), ei EI-RAKENNUS-tyyppisiä kohteita (maalauksia/veistoksia) näkyvissä.
- **179 (Tapaa-nappi pois lehdestä): PASS.** `ui lehti firenze`, selattu useita sivuja: ei kultaista
  "Tapaa"-nappia alapalkissa millään sivulla (vain "POISTU"/"EDELLINEN"/"SEURAAVA").
- **Lipun perspektiivi: PASS.** Kreikan Traakia (41.08, 25.95, sivukamera): täysi liehuva lippu +
  tanko. Pariisi lähes suoraan ylhäältä (48.87, 2.3275, arc 0.4): lippu näkyy pienenä pyöreänä
  pisteenä — lähes näkymätön kriteeri täyttyy. Reunatestiä (tangon säteittäisyys) ei saatu täysin
  toistettua tarkasti tällä kertaa — kamera hyppäsi liian kauas eikä osunut selkeästi lipun reunalle;
  ei kuitenkaan poikkeamaa keskeisessä kriteerissä.
- **Höyrylaiva (Thames): PASS lokista.** `elava elementit tila` Thamesilla: "hoyrylaiva näkyvissä
  (peitto 1,00), nopeus 0,53" (liikkeessä). Ei saatu suoraan kuvakaappaukseen laivaa itseään
  (näkyvissä vain maailmanpyörä samalla alueella), mutta lokirivi vahvistaa toiminnan.
- **177-variantti (uusi peli nostokortti avattuna): PASS, ristiin vahvistettu.** Avasin
  nostokortin (`ui nosto skandaali:shakkiturkkilainen`), sitten `uusi-peli 1 pariisi`: kortti
  sulkeutui siististi, uusi peli alkoi puhtaasti Pariisiin (ei jäänteitä). Sama tulos kuin
  Natiivi-UI:n omalla laitteella (korjaus cc33ba3b, MatkaAlkoi sulkee nostokortin).
- **170 (kuva vaihtuu kesken istunnon): EI TESTATTU.** Vaatii uudemman sisältöpaketin saatavilla
  session aikana (ei konsolikomentoa) — ei ollut käytettävissä tällä kierroksella.

## Yhteenveto
6/7 pyydetystä kohdasta PASS (178, 179, lipun perspektiivi keskeisiltä osin, höyrylaiva, 177-variantti,
0 poikkeusta). 170 ei ollut testattavissa ilman elävää sisältöpäivitystä. Simulaattori sammutettu
turvallisesti.
