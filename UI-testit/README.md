# Natiivi-UI:n testit ja komennot

UI Toolkit -näkymät: `Assets/Matkakirja/UI/` (Assembly-CSharp, ei asmdefiä, koska
Pelikoodarin näkymärajapinnat `Scripts/Peli/NakymaSopimukset.cs` ovat Assembly-CSharpissa).

- `../Peli-testit/unity-tarkistus.sh` (Pelikoodarin) kääntää myös UI-kansion oikeita
  Unity-DLL:iä vasten (iOS ja editori) ilman editoria. Tavoite 0 virhettä.
- Laitteella/simulaattorissa: kirjoita `Documents/ui-komento.txt`, rivit (ks. UiKomennot.cs):
  `ui valikko`, `ui asetukset`, `ui matka`, `ui heitto`, `ui viesti teksti`, `ui sulje`,
  `ui osuma x y`, `kuva nimi` (→ `Documents/ui-nimi.png`), `odota s`. Loki `Documents/ui-loki.txt`.
- `ui kysymys [laji]` näyttää kysymysnäkymän (`KysymysNakyma.cs`) käsin rakennetulla
  esimerkillä ilman peliä (`KysymysEsimerkki.cs`). Lajit: `visa` (oletus; vihje, 50:50,
  45 s tiimalasi), `vaite` (isoisän väittämä ja paikka), `kuva` (valokuva Commonsista),
  `lippu`, `pulma [id]` (luonnos Painter2D:llä; id: `pylvaat` (oletus, valokuvavaihtoehdot),
  `roomalaiset`, `kuunvaiheet`, muut webin oletusdatalla: `hieroglyfit`, `punnukset`,
  `naksutus`, `vesileilit`, `suolaaltaat`, `geysir`, `laiturit`, `kukko`),
  `kaksintaistelu` (8 vaihtoehtoa, helpotus), `tapahtumakortti`, `tulos [laattatyyppi]`
  (paljastus: löydön kuva tyypin mukaan — `star` (aarrekuva ämpäristä), `mannerAarre`,
  `isoAarre` (oletus), `pieniAarre`, `robber`, `pollo` — 50:50 käytetty, fakta, lähteet,
  Jatka), `kohtaaminen` (Márta, Budapest: pieni kohtaamiskuva, "yritys 1/2", vastauksen
  jälkeen repliikki ja uuden yrityksen ohje) ja `kohtaaminen-tervehdys` (tervehdyssivu:
  iso kuva ja kuvateksti, tervehdys kirjoituskoneella, viimeisen yrityksen varoitus ja
  "Yritä viimeistä kertaa"; aika alkaa vasta napista). Esimerkki toimii kuin ohjain:
  vastaus näyttää tuomion ja 0,9 s myöhemmin paljastuksen (TulosVaihe 1 → 2), vihje,
  50:50, Aloita ja Jatka päivittävät näkymän, aika kuluu, ja aika loppuu -tulos tulee
  itsestään. Napautus kortissa näyttää kirjoitettavan tekstin kokonaan. `ui sulje` sulkee.

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

Kuvasarja kysymysnäkymän tarkistukseen (erä 3):

```
ui kysymys visa
odota 2
kuva kysymys-visa
ui kysymys vaite
odota 2
kuva kysymys-vaite
ui kysymys kuva
odota 4
kuva kysymys-kuva
ui kysymys lippu
odota 4
kuva kysymys-lippu
ui kysymys pulma pylvaat
odota 5
kuva kysymys-pulma
ui kysymys pulma kukko
odota 1
kuva kysymys-kukko
ui kysymys pulma kuunvaiheet
odota 1
kuva kysymys-kuunvaiheet
ui kysymys kaksintaistelu
odota 2
kuva kysymys-kaksintaistelu
ui kysymys tapahtumakortti
odota 1
kuva kysymys-tapahtuma
ui kysymys tulos
odota 1
kuva kysymys-tulos
ui kysymys tulos star
odota 3
kuva kysymys-tulos-star
ui kysymys kohtaaminen-tervehdys
odota 1
kuva kysymys-tervehdys-kirjoitus
odota 5
kuva kysymys-tervehdys
ui kysymys kohtaaminen
odota 3
kuva kysymys-kohtaaminen
ui sulje
```
