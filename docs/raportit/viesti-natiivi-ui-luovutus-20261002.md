# Natiivi-UI:n luovutus 2.10.2026 klo 22.1x (TILINVAIHTO, lopullinen)

Aloitusviesti seuraavalle Natiivi-UI-sessiolle (Opus, high). Lue ensin CLAUDE.md, Raamatun Ydinajatus kohta 2 ja muistin
natiivi-ui-tila-20261001.md (2.10.-rivit lopussa). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (master = BUILD 129
e204abbe). Omat simulaattorit: iPhone 17 FB234D08, iPad AD119F7B. Käännös- ja simuvuorot antaa Julkaisija ("NYT KÄÄNNÖS" /
"SIMULAATTORI NYT"; vastaa "KÄÄNNETTY <sha>" ja "simu vapaa"). Kuvat Päätoimittajalle ennen omistajaa, merkinnät tekstinä.

## Omistajan hyväksymät 2.10. (junissa)

| Erä | Haara ja kärki | Tila |
|---|---|---|
| Yläpalkki: tikkaus B, BUILD 123 -pilleri "1 pv £400" kiinteällä leveydellä, logo optisesti (2/1 pt) | natiivi-ui/ylapalkki-tikkaus-2 bd316f20 | BUILD 129 |
| Nostoselain yhdellä rivillä, ‹ › piirroksina, ≡ kortin koordinaateissa | natiivi-ui/nostorivi-2 401718f6 | BUILD 129 |
| Valikko v2 siistiminen: ei ×, viivoista vain alin, Untuvikko+Päivä ÄÄNET-laatalla, £ Luku | natiivi-ui/valikko-v2-siisti e0ba9bd6 | BUILD 129 |
| Matalampi yläpalkki (nahkaa pillerin ylä- ja alapuolella 14,0 / 13,9 pt), omistaja 21.5x "Kelpaa" | natiivi-ui/ylapalkki-matalampi 7d990788 + iPadin pilleriväli d00c7f8b | merge-pyyntö kun d00c7f8b todennettu |

## KESKEN (järjestyksessä)

Haarat ovat proto-gitissä paikallisina (ei etäpushia; Natiiviseppä mergeää paikallisesti). Älä aloita uutta ennen kohtaa 1.

1. **Käännös natiivi-ui/ylapalkki-matalampi+natiivi-ui/kokoelmat-ikkuna (d00c7f8b + 5cfe7253)** alkoi 22.09 (loki
   proto-3d/lokit/kaannospalvelu/20261002-220907-…; kopioi .app kansioon natiivi-ui-1035/app-yp); simu Julkaisijalta
   (FB234D08: ENNEN juna-1.1.129-appilla `kartoitus-kokoelmat-ennen.txt`, JÄLKEEN `kartoitus-kokoelmat.txt` tavallisena ja
   KEHITTAJA=1; AD119F7B: `kartoitus-ylapalkki-korkeus.txt` → iPadin pilleri "1 pv £400"). Sitten:
   - merge-pyyntö Natiivisepälle: ylapalkki-matalampi (7d990788 + d00c7f8b; omistaja hyväksyi 21.5x, kuva 17
     .../omistajalle-20261002-ylapalkki-valikko/17-ylapalkki-matalampi-iphone-ipad-b725dffa.png), testit Peli/Kartta/Linssit;
   - kuvaparit Päätoimittajalle: Julisteet (yksi GALLERIA-ikkuna) ja Aarteet (yksi ikkuna ilman esikatselua), kehittäjätilassa
     kaikki auki. Web: Julisteet #3870, Aarteet #3877 (Pelikoodari: sama malli).
2. **PUHE ÄÄNENÄ** natiiviin (web #3867 v2563 ja #3869 v2570 mainissa): Pulu.Sano odottaa klippiä ≤ 1,5 s; kupla vain jos ei
   klippiä / ei käynnisty / Kertoja pois / liukusäädin 0 / kertoja puhuu. Muuten chat-loki + puhe-ele, kuittaus äänen lopussa.
   Poikkeukset: avauksen muotokuvarepliikki äänellä → kuplassa vain muotokuva kehyksenä (repliikki lokiin); lehtivinkki äänellä
   → avainsana ympyröidään lehdestä, jos ei löydy → kupla pelkällä ympyröidyllä avainsanalla. Ilman ääntä koko teksti kuplana.
3. **Topografian hampurilainen** on Linssisepällä (linssiseppa/topografia-hampurilainen): tarkista kuvista, että pohjat ovat
   OHJAUSNAPPI (harmaa) + LINSSIN VALIKKO, rivit Korkeustasot · Sulje linssi. Tyylikirjan lista web PR #3878 (v2571, auki).
4. GALLERIAn käyttäjät ISS-kameran ja astronauttien kuvat (pohja valmis, Galleriat.cs), linssihampurilaiset muihin linsseihin vasta
   omistajan päätöksellä (linssivalikot.md).

## Työkalut

- Skriptit proto-3d/lokit/natiivi-ui-1035/skriptit/: kartoitus.sh (MASKI=1 saari näkyy, KEHITTAJA=1), keskitys.py (logo/pilleri
  kaaren ja kehän välissä), nahka.py (nahkaa pillerin ylä/alapuolella), musteval.py (näkyvän musteen välit rivillä).
- Testikomennot: `ui ylapalkki teksti <rahat> <päivä>|pois`, `ui pilleri rivi:<nimi>`, `ui nostonappi selain`, `ui ohjausnapit 0|1|2`.
- unity-tarkistus.sh ajetaan bashilla (zsh rikkoo csc-optiot). Lokikansioon vain uusin .app (Päätoimittaja 20.4x).

## Opit 2.10.

- GeometryChanged ei laukea transformin (Ponnahdus-skaalaus, translate) muuttuessa: mittaa ChangeCoordinatesTo:lla, ei worldBoundista.
- Labelin lopun välilyönti ei mitoitu → väli USS-marginaalina. `.mk-nappi > .mk-ikoni` antaa ikonille 7 px oikean marginaalin.
- Asettelulaatikot ≠ näkyvä muste: tarkista välit musteesta (musteval.py) ennen "keskellä"-väitettä.
