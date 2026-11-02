# Pelikoodari: luovutus 3.11.2026 klo 01.50 – juna 218

Edellinen: -20261102-2225 (9c4d43e14, PR 6026): sen jono ja huomiot ovat voimassa, ellei alla toisin. Syy: konteksti pehmeällä rajalla.
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (commitit paikallisia),
kärki **31094e036**. Salirunko **pelikoodari/sali-218d = 0e0e89be5** (31094e036 + piirtajat-218 5fa87046d; merge-tree, ei worktreetä).

## Tehty
- **31094e036 MAALI-KORTIN HATTU** (tarkistus 0 virhettä, Peli-testit 797/797 v117-juurella): syy oli, että QA-botti juoksi salitallenteissa
  maaliin jo AVAUSLENNON aikana (avauksen silmukka ajaa BottiAskelia). Saanto.Ohi → AvausKesken ei enää kutsuttu → m.AvausT jäi ≥ 0
  (avauksen drone + kamerasuoja Puyin selän taakse) ja loppuHetki = −1 → ei maalin näköalaa, kortti heti. Nyt JuoksupeliNakyma
  (avauksen haara): jos juoksu loppuu kesken lennon, avaus päättyy (avausT/AvausT −1, ajajan pito pois), loppuHetki kirjataan ja
  Ohita/juliste/kuvateksti piiloon ilman gongia. Loki "juoksu loppui kesken lennon t … avaus päättyy". Pelaajalla ei tapahdu (ei ohjausta lennossa).
- **8 salia uudelleen sali-218d:llä, kaikki tarkistettu arkilla, Maali-kortissa ei hattua keskellä** (sali-218b/):
  yk 20261103-000919, cx 013640, th 002943, tj 003727, ty 004510, cc 005312, xf 010128, ys 012736 (`<aika>-<koodi>-v2.mp4`).
  Kortin aikana joko Puyi kortin alla (kamera ylhäällä, katse alas; yk/tj/ys, ys:ssä hattu juuri kortin alareunan alla) tai näköala kattojen
  yli (th/ty/cc). xf 59 s: ensimmäisellä juoksulla eunukki otti kiinni → juoksu alusta (ei vika). Vanha cx 001853 (kujamaali, kamera räystään
  sisällä) poistettu.
- **sk2-cx.txt maali salin takaovelle** (reitti S-N piste 9, (−110,35; 438,01)); vanha kujamaali tallessa sk2-cx-kuja.txt.
- **leikkaa.zsh korjattu**: alku = TOINEN laskeutuminen alle 8 m (1. = Meridiaaniportin alitus). Vanha "viimeinen kuva > 8 m" osui maalin
  korkeaan kameraan (th 15,5 m) → video 3 s.
- **taso1b4 OK** (tallenne-218t/20261103-011539-taso1b4.mp4, 97 s, linja 2 JU:n vuorolla): kääntö hyväksyttiin vasta OhjausPelaajalle-rivin
  jälkeen (unity.log 5148 → 5250), ei kiinniottoa tallenteessa. (Lokin kiinniotto rivillä 4239 on ENNEN `avaus nyt` -komentoa: skenaarion
  ensimmäinen, tallentamaton juoksu.)
- **Osa 3 lähetetty KK:lle 01.47** (8 salia + taso1b4 + iPad vaaka/pysty v2), kopio PT:lle; JU:lle ESIKATSELU VAPAA molemmista linjoista 01.46.
- PT:n pyynnöstä worktreet pelikoodari-luovutus-1715 ja -2100 poistettu (PR:t mergetty, puhtaat).
- Työlista: eunukkirivi (tehty 76ef8082c) ja arkisten hahmojen rivi (odottaa Codexia) päivitetty.

## Huomiot
- Eunukkimäärät (omistaja 12.13) ON TEHTY 76ef8082c (kapea-reitti-218:ssa). Ristikko-ovi (bugi 2) PT kuittasi 2.11. (218q vs 218r,
  lahipuut-v15). Jonon "eunukkikorjaukset ja ristikko-ovibugi" on siis tehty; jäljellä vain siivoukset (alla kohta 3).
- Musiikki käynnistyy batch-esikatselussa uudelleen joka ruudulla (SoitaMusiikki "alku"): vanha esikatseluilmiö (myös 2.11. ajoissa),
  ei laitteella. Ei korjattu.
- Kapea-reitti-218:n uudet commitit NS:lle vain PT:n kuittauksella (pysyvä kuittaus: tallenne PT:lle → SHA NS:lle): 1657d1932 (景阳宫) ja
  31094e036 (vain QA-polku; PT päättää, tarvitaanko junaan).

## Jono
1. **Arkiset hahmot** heti, kun Codexin paketti tulee postilaatikkoon (tilaus 409d7f494 + 2a5910c5a: ruokaeunukki, palvelijatar, vedenkantaja
   + täyttö, lakaisija, särkyvät tavarat; särkymisen ääni EI houkuttele jahtaajia). Video omistajalle taso 1:stä KK:n kautta.
   Worktree wt/pelikoodari-postilaatikko.
2. VS:n juoksupelin sade (luovutus 22.25 kohta 6): tarkista kytkentä, kun VS ilmoittaa.
3. Siivoukset: Taso1ReittiPortiltaAukiolle03 (käyttää yhä bottia alkuun ja vanhaa juurta, ohittuu), kameratallenne kamera-218/SEIS JU:n vuorolla.
4. KK:n vastaus osaan 3: korjaa, mitä KK pyytää (salien ja Maali-kortin uusinta: `RUNKO=pelikoodari/sali-218d zsh sali-218b/ketju8r.zsh <koodit>`;
   jos kärki muuttuu, tee uusi sali-218e merge-treellä).
