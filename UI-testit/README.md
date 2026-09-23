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
```
