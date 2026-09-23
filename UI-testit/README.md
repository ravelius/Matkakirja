# Natiivi-UI:n testit ja komennot

UI Toolkit -näkymät: `Assets/Matkakirja/UI/` (Assembly-CSharp, ei asmdefiä, koska
Pelikoodarin näkymärajapinnat `Scripts/Peli/NakymaSopimukset.cs` ovat Assembly-CSharpissa).

- `../Peli-testit/unity-tarkistus.sh` (Pelikoodarin) kääntää myös UI-kansion oikeita
  Unity-DLL:iä vasten (iOS ja editori) ilman editoria. Tavoite 0 virhettä.
- Laitteella/simulaattorissa: kirjoita `Documents/ui-komento.txt`, rivit (ks. UiKomennot.cs):
  `ui valikko`, `ui asetukset`, `ui matka`, `ui heitto`, `ui viesti teksti`, `ui sulje`,
  `ui osuma x y`, `kuva nimi` (→ `Documents/ui-nimi.png`), `odota s`. Loki `Documents/ui-loki.txt`.

Kuvasarja erän 1 tarkistukseen (simulaattori, peli käynnissä):

```
odota 3
kuva palkki
ui valikko
odota 1
kuva valikko
ui sulje
ui asetukset
odota 1
kuva asetukset
ui sulje
ui matka
odota 1
kuva matka
ui sulje
ui heitto
ui viesti Heitit 4 — valitse kohde kartalta
odota 1
kuva heitto
ui sulje
ui kortti firenze
odota 4
kuva kortti
ui sulje
ui kartuscha ITA
odota 3
kuva kartuscha
ui kartuscha ITA auki
odota 2
kuva kartuscha-auki
ui sulje
ui selite
odota 3
kuva selite
```

## Livia (pulu) ilman peliä

`Assets/Matkakirja/UI/Livia/` on webin kokopulun (js/livia-svg.js, js/livia-svg-paa.js,
js/livia-uudet-versiot.js, asentologiikka js/livia-pikselit.js) siirto: `LiviaKuva`
(VisualElement, Painter2D), `LiviaTila` (yhden ruudun asento) ja `LiviaEleet`
(pelin 70 elettä, kestot, ryhmät ja nimet). Eleiden ajoitus ja valinta eivät kuulu tähän.

- `ui livia [ele] [p] [astro] [leiju] [puhe] [mini]` — Livia 152 × 304 pt keskellä
  kerrosta 40 (oletus `blink 0.5`), alla ele, p ja nimi. `astro` = kypärä ja leijunta,
  `leiju` = karttaleijunta, `puhe` = nokka puhuu kellon mukaan, `mini` = minipulu-rajaus.
- `ui livia kierros [astro|leiju|puhe]` — kaikki eleet peräkkäin oikeassa kestossaan
  (0,4 s tauko välissä, yhteensä noin 4,5 min), videotarkistukseen.
- `ui livia pois` — poistaa kuvan.

Kuvasarja (esim. webin kuviin vertaamiseen):

```
ui livia blink 0.5
odota 1
kuva livia-blink
ui livia welcome 0.4
odota 1
kuva livia-welcome
ui livia bunFeast 0.8
odota 1
kuva livia-pulla
ui livia shock 0.5 astro
odota 3
kuva livia-astro
ui livia pois
```

Piirron tarkistus ilman Unityä (tehty siirrossa 23.9.2026): primitiivilista tulostettiin
SVG:ksi ja verrattiin Chromiumissa webin `livianUusiPelikuva`-kuvaan 832 tilassa
(kaikki eleet p = 0 … 1, puhe, leijunta, astronautti, `right` 60). Erot: tekstit
(”z Z”, ”…”, ”?”) ovat viivakorvikkeita ja ryhmän peittävyys kerrotaan osille
(leijunnan siipien ristihäive), muuten kuvat vastaavat toisiaan.
