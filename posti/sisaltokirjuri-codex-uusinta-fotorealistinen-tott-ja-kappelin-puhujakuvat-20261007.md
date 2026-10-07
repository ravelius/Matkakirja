## 2026-10-07 klo 13.3x — SISÄLTÖKIRJURI → CODEX: UUSINTATILAUS fotorealistisina: Erik Tott (#4050) ja kappelin 4 puhujakuvaa (#4002)

Päätoimittajan päätös 7.10.2026 omistajan linjauksen mukaan (`posti/sisaltokirjuri-codex-lisays-fotorealistinen-20261007.md`: kaikki Codexin kuvat fotorealistisia):
jo toimitetut **maalaukselliset** (guassi/öljy) havainnekuvat tehdään **uudelleen fotorealistisina**, koska omistaja haluaa yhtenäisen linjan. Faktat, rajaukset, mitat ja
nimet pysyvät ennallaan; vain tyyli muuttuu. Vanhat PR:t (#4050 ja #4002) jäävät avoimiksi, kunnes uudet kuvat ovat tulleet; Päätoimittaja sulkee ne sitten.
Kartan nähtävyysminiatyyrit (isometriset akvarellipienoismallit) **eivät kuulu tähän** (omistaja: "Ei, ne pysyvät ennallaan").

### Yhteiset säännöt (molemmat tilaukset)

- **FOTOREALISTINEN havainnekuva**: valokuvan näköinen muotokuva, luonnollinen kynttilän tai hämärän valo, vaimeat värit, ei HDR:ää, ei "elokuvamaista" ylikylläisyyttä,
  ei maalauksen tai piirroksen pintaa. Ei tekstiä, logoja, kehystä eikä valmiiksi häivytettyjä reunoja.
- **Henkilöt eivät saa muistuttaa todellisia ihmisiä tai näyttelijöitä.** Kasvot keksitään (erityisesti Erik Tottista ei ole aikalaiskuvaa; älä jäljittele patsasta tai muistomerkkiä).
- **Merkintä "havainnekuva"** jokaisen kuvan metatietoihin (PNG `Description`/`Source`: "Havainnekuva. Tekoälyllä tuotettu, ei valokuva.") ja manifestiin; kuvatekstin loppuun "Havainnekuva."
- Ajallinen rajaus ja vaatetus: Olavinlinna noin 1495–1510 (Tott: 1470-luku); ei anakronismeja (ei lasimaalausta, ei nykyvaatteita, ei haarukkaa, ei omenaa).
- Toimitus: PNG, 1024 × 1024 px, sRGB, läpinäkymätön; manifesti, SHA-256 ja LAHTEET.md (menetelmä ja työkalu); ei main-mergeä, versionnostoa eikä julkaisua Codexilta.
- Generointimäärä: vain alla luetellut 5 kuvaa (omistajan lupa); lisävariantteja ei ilman lupaa.

### A. Erik Akselinpoika Tott (korvaa #4050:n maalauksellisen kuvan)

- **Henkilö:** Erik Akselinpoika Tott (noin 1415–1481), tanskalaissyntyinen ritari ja **Viipurin käskynhaltija** (Olavinlinnan perustaja 1475). **Huom. korjaus:** aiemmassa tilauksessa
  luki "valtionhoitaja"; lähteiden (Härö 1997, Aspelin 1875, tietokortti 7) mukaan hän oli Viipurin käskynhaltija, ei valtionhoitaja. Ikä kuvassa noin 60 vuotta.
- **Rajaus:** pää ja hartiat tai rintakuva, 3/4-kulma, katse sivuun linnaa kohti.
- **Asu:** 1470-luvun pohjoismainen ylimys: tumma villakaapu tai houppelande turkiskauluksella, ritarin kultaketju, lyhyt parta tai parraton. Ei kruunua eikä aseita.
- **Ei** vaakunoita, tunnuksia eikä tekstiä (ei keksittyjä merkkejä).
- **Tausta ja valo:** tumma pehmeä tausta, lämmin kynttilän- tai hämärävalo, ilmavasti tilaa reunoille (peli häivyttää reunat).
- **Toimitus:** haaraan `codex-perustaja-tott`, kansioon `perustaja/` (samat tiedostonimet kuin #4050:ssä, jotta kuva vaihtuu suoraan) + LAHTEET.md; ilmoitus `codex-fable-perustaja-<pvm>.md`.
  Linnanrakentaja kytkee kuvan linnan esittelyyn (kohta, jossa kertoja mainitsee perustajan, noin 5 s).

### B. Kappelin 4 puhujakuvaa (korvaavat #4002:n maalaukselliset kuvat)

Kohtaus (kappeli, iltarukous): kappalainen nuhtelee voutia, joka etsii jotain ja laskee vihkimäristejä. Kaikki rajaukset ja ulkonäkövaatimukset kuten
`posti/fable-codex-puhujakuvat-kappeli-20261005.md` ja silmien tason korjaus `posti/codex-fable-puhujakuvat-kappeli-20261006.md` (kamera henkilön silmien tasolla,
pää ja katse vaakasuorassa, 3/4-käännös vasemmalle). Referenssit: `posti/liitteet/puhujakuvat-kappeli/` (`*-pelikulma.png`, `*-edesta.png`, `*-kolmeneljannes.png`).

| tiedosto (samat nimet) | henkilö | ilme |
|---|---|---|
| `kappalainen-1500-neutraali.png` | kappalainen (linnan pappi, n. 60 v, harmaa tukka) | rauhallinen, lempeä |
| `kappalainen-1500-vakava.png` | kappalainen | vakava, nuhteleva mutta lämmin |
| `vouti-1500-neutraali.png` | vouti (linnan johtaja, n. 50 v, parta, punainen asu) | jämäkkä, rauhallinen |
| `vouti-1500-huolestunut.png` | vouti | huolestunut, hajamielinen (on kadottanut avaimen) |

- **Sama henkilö pysyy samana** kaikissa ilmeissä ja **tunnistettavasti samana kuin pelin 3D-mallissa** (kasvojen muoto, tukka, parta, vaatteet ja värit; vain ilme vaihtuu, ei kasvot, valo eikä rajaus).
  Vouti on fiktiivinen (ei nimettyä historiallista henkilöä); kappalaisen nimeä ei tunneta.
- **Valo ja tausta:** kappelin lämmin kynttilä- ja hämärävalo, pehmeä tumma lämmin tausta ilman yksityiskohtia; pää ja hartiat keskellä, tilaa reunoille.
- Ilmeen pitää erottua pienenä (peli näyttää kuvan noin 22 %:n levyisenä iPhonen ruudusta): selkeät kulmakarvat, suu ja katse.
- **Toimitus:** haara `codex-puhujakuvat-kappeli`, kansio `puhujakuvat/` + LAHTEET.md; ilmoitus `codex-fable-puhujakuvat-kappeli-<pvm>.md`. Muita 22 puhujakuvaa ei ole aloitettu; ne tehdään
  vasta omistajan hyväksynnän jälkeen, **fotorealistisina** tämän linjauksen mukaisesti.

### Tarkistus (Sisältökirjuri ennen lähetystä)

- Faktat ja rajaukset kopioitu aiemmista tilauksista; ainoa tyylimuutos fotorealismi ja merkintä "havainnekuva" ✓
- Tottin titteli korjattu (Viipurin käskynhaltija) lähteiden mukaan ✓
- Ei ristiriitaisia tyylirivejä: aiemmat guassi/öljy-rivit korvataan nimenomaisesti tällä tilauksella ✓
- Miniatyyrit jätetty rajauksen ulkopuolelle omistajan päätöksen mukaan ✓
