# Pelikoodari: luovutus 12.11.2026 klo 05.18 (konteksti 25 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0508.md (haara pelikoodari-luovutus-20261112-0508). TÄMÄ KORVAA SEN, paitsi: kohta 1 (kamera pala 2:
tehtävänanto, TULOS-a-c1-c2.md, testikomennot, 4 kysymystä KK:lle) ja kohdat 2–3 ovat ennallaan → lue ne sieltä
(git show origin/pelikoodari-luovutus-20261112-0508:docs/raportit/viesti-pelikoodari-luovutus-20261112-0508.md) ja sen kautta 0100:n kohdat 2–3.

## 1. KAMERALAITE PALA 2: ODOTETAAN KK:N VASTAUSTA (ei muutosta 05.08:sta)
KK:lle lähetetty 05.07 neljä kysymystä + c2-valinta; vastausta ei vielä 05.18 (tehtävänannon tiedosto muuttumaton 01.21:stä:
/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md — KK:n vastaus tulee
todennäköisesti uutena osiona tai viestinä). SEURAAVAKSI kuten 05.08: vastaukset koodiin → c2-valinta koodiin → Mac-ajo JU:lle (uusi sha).
Koodi nyt: natiivi-backup kameralaite/pala-2 @ 2749b7b77 (219ec4b8d + peittoruutujen vienti), wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite.
Avoin löydös yhä: toiston a/j/ω-huiput (85 m/s², 5900 m/s³, 704 °/s jo nykyrivillä) syy selvittämättä → seuraava rinnakkaistyö.

## 2. VALMIS 05.17: MASSAMITTARIN VÄÄRÄ HÄLYTYS (KK 01.20 kohta 1) — KK:lle ja PT:lle lähetetty 05.17
Tulos: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-massalahde.md (+ massalahde-f1c47100d.txt; työkalut peittolahde.py,
massaetaisyys.py samassa kansiossa, aja `python3 -P`, ei -I: numpy käyttäjän paketeissa).
- 55/55 uuden kameran massaruutua vääriä: Massassa kokoaa 1 m:n ruudun. Varasto (37): 16 cm kivireunus (yli MatalaReuna 0,15) + räystään
  päätetiilet; juhlasalin koilliskulma (15): laite räystään alla 0,43 m kulmapilarista; S 172 (3): punamuuri 1 m, harja 0,37 m yllä.
- Mittarin korjaus = oma pieni työnsä (ehdotus tiedostossa), EI tehty, odottaa KK:n sanaa.
- Peittoruutujen vienti korjattu 2749b7b77 (juokseva 200:n erinä). "Kameraruutu alkoi t 481" ei vika (uuden kameran ajon alku).
- Koordinaatit: juuren (x, z) → pohja: peittolahde.py juuri_pohjaan (vakiot KameraToistoTestit.Kartta); GLB:n (x, z) = pohja (x, z);
  avoimet huoneet avoimet-sijoitus.json translation + Y-kvaternio; peittokartta = palatsiOsat LOD1 + avoimetOsat (osamallit, huoneet),
  osasarja EI (SarjatPeittoon = false).

## 3. TYÖKOPIOT: ennallaan (kuvajono-wt pois, kun 6e47d988f junassa). Ei agentteja käynnissä. Ei uusia lupia.
