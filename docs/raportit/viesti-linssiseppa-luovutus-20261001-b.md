# Linssisepän luovutus 1.10.2026 klo 14.3x (päivä), päivitetty 17.3x

Luovuttaa: Linssiseppä (Opus, high). Edellinen: `viesti-linssiseppa-luovutus-20261001.md` (aamu). Muistitiedosto:
`linssiseppa-tila-20261001-paiva.md`.

## Päivitys 17.3x
- **S2-erä merge-pyynnössä Natiivisepällä:** linssiseppa/iss-fotorealismi = 683ce774 (S2Kaytossa = true, muistiraja laiteluokan mukaan).
  Pyyntö: proto-3d/lokit/linssiseppa-muisti-ikkuna-20261001/merge-pyynto-s2.md. iPad 00008103: fps 30, +480 Mt (kuitattu).
- Junajono: S2-erä → linssiseppa2/iss-kamera-kuva → linssiseppa/iss-vuodenaika-3 = eb08b05c (sis. vuorokausi + kyydin aurinko,
  Natiivisepän OK Kartta/Aurinko.cs) → linssiseppa/cupola-iso-ikkuna = 359e65e4 (omistajan valinta: iPhone 2,0/1,25, iPad 1,45/1,25).
- Seuraavaksi: lähikuvan yövalot pisteiksi (Päätoimittaja). Avoin: kiillon pystyleikkaus.

## Proto-haarat (tila 14.3x) (proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, worktree wt/proto-linssiseppa-iss-hionta)

| Haara | Kärki | Sisältö | Tila |
|---|---|---|---|
| linssiseppa/iss-fotorealismi | b82606cb | S2-erä: fotorealismi oletuksena päällä (B), S2-sävy varjostimessa vain S2-alueella (_s2Savy 100/−10/1), S2-reuna 1,5° (_s2Reuna, sekoitusalikaavio paikka 2), ilmakehä 2,5 kaikkialle, kerrosjärjestys s2 0:ssa, kuvaputki (päivätähdet 0, kaarivoima, KyydinAurinko), iltakuoren korjaus (Ilmakeha2 hylkäys 120 km), kiillon A/B-komennot | odottaa ämpäri-S2:ta (~16.30–17) → todennus, S2Kaytossa = true, iPad 00008103 (Natiiviseppä yhdistää masteriin 0b8a590d = BUILD 98, sis. 822f3d30), YKSI merge-pyyntö Natiivisepälle |
| linssiseppa/iss-vuodenaika-3 | 22594574 | Linssiseppä 2:n linssiseppa2/iss-kamera-kuva 134992b5:n päällä: vuodenaika (tammi/touko/heinä/syys, S2 lumettomina kausina), vuorokaudenaika (Iss.Vuorokausi + IssNyt.AurinkoKello, astro kyyti vuorokausi …), VUOROKAUSI-nuppi, v4-paneeli, reliefi pois BMNG:n alta kyydissä (Cupolan yö) | käännös + kuvat jonossa ~15.35 (ajo-vuodenaika.sh); merge LS2:n kamerahaaran jälkeen |

Testit: Linssit 551/551 (vuodenaika-3), 527/527 (fotorealismi), Kartta 413, Peli 362, unity-tarkistus 0.

## Merge-pyyntöön (S2-erä)
- shadergraph-diff vain uudet slotit/ominaisuudet/solmut (tee_tileset.py + paikkaus, rungot synkassa) — `git diff --stat` liitteeksi.
- Kyytipino.asset.meta syntyy jokaisessa käännöksessä (Rakennus poistaa ja luo assetin) → ei puute.
- Ei UI-muutoksia. Kuvaparit: lokit/linssiseppa-s2esi-20261001-{c,d,e,f}-iphone, havainne lokit/linssiseppa-kiilto2-20261001-iphone/havainne-bmng-vs-s2.jpg.

## Avoimet
- Kiillon pystysuorat leikkaukset (Linssiseppä 2:n juliste): katoavat vain kiilto 0:lla; vesimaski oikein (Gotlanti, Pohjanlahti),
  Revontulet ZWrite Off. Juurisyy auki Yokuori.shaderin kiiltolaskennassa. Kuvat lokit/linssiseppa-kiilto{,2}-20261001-iphone.
- Tunisian tummat palkit: vain LS2:n vanhan paikallisen S2-testisarjan kanssa → tarkista ämpäridatalla.
- Alppien BMNG ilmakehällä 2,5 tumma/sininen (talvi) — Päätoimittajalle kerrottu, linja "sama kaikkialla".
- Jaettu .app proto-3d/app-jako/linssiseppa-5966fe77 → poista 2.10.
