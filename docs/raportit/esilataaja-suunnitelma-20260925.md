# Esilataaja-palvelu: suunnitelma (Pelikoodari 25.9.2026)

Raamattu: ESILATAUSPOLITIIKKA (omistaja 25.9.2026 klo 16.1x). Nykytila ja mittari: `esilataus-nykytila-20260925.md`.
Toteutus alkaa build 15:n jälkeen. Tämä sivu hyväksytetään Fablella ennen koodia.

## Rakenne (proto: `Assets/Matkakirja/Kartta/Esilataaja.cs`, Kartta-asmdef, kuten VerkkoOdotus)

```csharp
public enum Taso { Nakyva, SeuraavaRuutu, TamaKaupunki, Kohdekaupungit, Muu }     // politiikan järjestys
public enum Kohta { Kaynnistys = 2, Saapuminen = 3, Joutilas = 4, Ennakointi = 5, Linssi = 6 } // verkkosäännöt
public static class Esilataaja {
  Pyynto Pyyda(Kohde k, Taso t, Kohta kohta, string ryhma);   // ryhma = "saapuminen:ateena"; sama kohde → yksi haku
  void PeruRyhma(string ryhma);                               // kohde vaihtui: jonosta pois, käynnissä olevat jatkuvat
  IEnumerator Odota(Pyynto p);  bool Valmis(Kohde k);
  bool Virransaasto { get; }  event Action Joutilas;          // Siirtosepälle ja Natiivisepälle
}
Kohde.Sisalto(polku) | Kohde.Kuva(url, Pieni|Iso) | Kohde.Puhe(url) | Kohde.Laatat(polut)
  | Kohde.Tiedosto(osoite, sha256, tavuja, kohdePolku)        // Siirtoseppä: paketin deltat
void RyhmaValmis(string ryhma, Action<int valmiit, int virheet> kutsu);
```

- **Jono:** prioriteetti taso → ryhmän ikä. 6 rinnakkaista pyyntöä. Yksi paikka on aina varattu
  Nakyva-tasolle, ja näkyvä pyyntö lähtee heti, vaikka paikat olisivat täynnä (ohittaa jonon).
- **Nykyiset latausavut kulkevat sen kautta ilman kutsujien muutoksia:** `Kuvat.Hae`, `Puhe.LataaJaSoita`,
  `Sisalto.HaePaketista` ja `PeliOhjain.HaeTiedosto` (yhdistetään `Sisalto`an, jolloin uusin.json haetaan kerran)
  ovat taso Nakyva. `Laattapalvelin`in verkkohaut ovat Cesiumin pyynnöt taso Nakyva ja `Laattapalvelin.Esilataa`
  pyytäjän taso.
- **Uusinta:** 429, 5xx ja aikakatkaisu uusitaan viiveellä 1, 2, 4 ja 8 s (Retry-After voittaa). Epäonnistunut
  esilataus palaa jonon loppuun seuraavaan joutilaaseen hetkeen, eikä se jää lopulliseksi.
- **Verkkosäännöt (omistajan tarkennus 25.9.):** mobiilidata lataa aina samat kuin WiFi, joten verkkotyypin
  rajoituksia ei ole (erottelu vasta, jos peli julkaistaan Yhdysvalloissa). Virransäästö
  (`NSProcessInfo.lowPowerModeEnabled`, Plugins/iOS, uusi .mm) pysäyttää kohdat 4–5. Kohta 1 (buildissa mukana) ei
  kuulu palvelulle.
- **Jatkaminen:** `Kohde.Tiedosto` ladataan `.lataus`-tiedostoon Range-pyynnöin, ja keskeytynyt lataus jatkuu
  seuraavalla kerralla. Esilataaja ei tarkista sha256-tiivistettä: sen tekee Siirtoseppä `RyhmaValmis`-kutsussa.
- **Välimuistit:** levyllä nykyiset kansiot (sisalto/ versiolla, kuvat/ osoitteella, aani/ osoitteella, laatat
  sarjan nimellä), yhteinen siivous vanhimmasta, kun yhteensä yli 2 Gt (nyt laatat 600 Mt erikseen). Muistissa
  purettujen tekstuurien LRU tavuina: iPhone 200 Mt ja iPad 300 Mt (nyt Kuvat 48 kpl). Purku on jo taustasäikeessä
  (UnityWebRequestTexture nonReadable, WebP ImageIO).
- **Mittarit:** `VerkkoOdotus` (valmis: odotus ms per vaihe, haut per vaihe ja lähde). Lisäksi osuma-%: kun
  Nakyva-pyyntö löytää kohteen valmiina esilatauksen jäljiltä, se on osuma, muuten huti ja odotus kirjataan.
  Molemmat menevät lokiin, `verkko`-yhteenvetoon ja savukkeeseen.

## Kohtien sisältö (Pelikoodari kokoaa listat, Natiiviseppä laatat)

| Kohta | Laukaisija | Lista |
|---|---|---|
| 3 Saapuminen | kaupungin valinta, lennon alku, matkan alku (5) | luento-, saapumis- ja pulupuheet, isoisän kaksi kuvaa ja luentakuvat, saapumiskortti, nostodata (nyt `NostoSisalto.Esilataa`) + miniatyyrit ja nähtävyyskuvat, maa- ja kaupunkilehden data, maakuntarajat; laatat Z7–Z10 (Natiiviseppä) |
| 4 Joutilas | `Joutilas` (ei kamera-ajoa, ei latausta 2 s) | nostojen isot kuvat ja galleria (pieni ensin), lehtien kuvat, kaupungin puheet, linssien data näkyvälle alueelle, sitten nopalla saavutettavat kaupungit (kohta 3 -lista taso Kohdekaupungit) |
| 5 Ennakointi | `SiirtoKohteetMuuttui` | kohdekaupunkien kohdan 3 lista heti, reitin laatat (Natiiviseppä) |
| 6 Linssi | linssin avaus | Linssiseppä antaa listat (kaari pienenä, kaksi pysäkkiä täysinä, radio nykyinen ja seuraava) |

## Rajapinnat muille

- **Natiiviseppä:** `KarttaKerrokset.EsilataaLento/EsilataaKohde` → `Esilataaja.Pyyda(Kohde.Laatat(polut), taso,
  kohta, ryhma)`. Tason ja ryhmän antaa kutsuja, ja `Laattapalvelin` jää palvelijaksi. Laattojen Z-listat ja
  kotimaan korostus ovat Natiivisepän.
- **Siirtoseppä (PR #3192, sovittu 25.9.):** paketin päivitys antaa tehtävät
  `Kohde.Tiedosto(osoite, sha256, tavuja, kohdePolku)`, taso Muu, kohta 2, yksi ryhmä per versio. Esilataaja hoitaa
  jatkamisen, rinnakkaisuuden ja uusinnan kaikilla verkoilla (ei 5 Mt:n rajaa). Kun ryhmä on valmis, `RyhmaValmis` kutsuu Siirtoseppää,
  joka tarkistaa tiivisteet, kirjoittaa `valmis.json`-tiedoston ja ottaa version käyttöön `Joutilas`-hetkellä tai
  seuraavassa käynnistyksessä.
- **Natiivi-UI:** ei muutoksia. Kuvat, puheet ja sisältö tulevat samoista kutsuista.
- **Laitetestaaja:** `Peli-testit/verkko-savuke.sh` saa rajan: saapumisen odotus 0 ms (lämmin ja kylmä).

## Erät

1. Jono, uusinta ja nykyiset latausavut palvelun kautta, osuma-% (ei uutta esilatausta; mittari näyttää pohjan).
2. Kohta 3 lennon ja matkan aikana + savukkeen raja "saapuminen 0 ms".
3. Kohdat 4 ja 5, virransäästösääntö.
4. Muistin LRU ja 2 Gt:n levysiivous. Kohta 6 Linssisepän listoilla.
