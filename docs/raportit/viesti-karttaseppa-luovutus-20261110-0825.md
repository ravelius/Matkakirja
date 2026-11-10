# Karttaseppä: luovutus 10.11.2026 klo 08.25 (KS)
Syy: konteksti 26 % (hook, Raamattu 7.37), luonteva väli: Mac-ajot JU:lla. Korvaa -0747:n.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `F=/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/pariisi-pino-20261110/`
Työlista on jono: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (tehty/este kuten -0747).

## VALMIIT TÄSSÄ VUOROSSA (kaikki työlistalla "tehty", PT:lle ilmoitettu)
1. Pino 5 "tarkka alue": `$F/5-tarkka-alue.md` + `5-tarkka-alue-pari-z12.jpg` (NS:n yksi taso -koe 7.11., tulos.md). Suositus "Ei jatketa".
2. Pino 6 "Sacré-Cœurin puisto": `$F/6-sacre-coeur-puisto.md` + `6-sacre-coeur-arkki-ajo48.jpg`. Git-tarkistus: ajo 48 (94c1e6395,
   pohja r8) = juna 224 (68d365e65, r8b) alueeltaan pikselilleen. Suositus "Palautetaan koko puisto" (omistaja 5.11. 13.54).
3. [210] Lontoo rajaus: `b3-lontoo/rajaus-210/rajaus-koe8.jpg` (7 aluetta, ~7 km²). PT 08.2x: tulkinta oikein (luurankokatot 7 alueelle), kelpaa.
   Koe8 `$K/lontoo/palat-d11-katot-koe8` (243 palaa = lontoo-kumpu/palat-d7-kumpu-oikea + 36 uutta; 5 104 taloa, 0 katkoa, +5 Mt).
   Skripti `$K/skriptit/tee-palat-lontoo-luuranko-k8.py` (KATOT_ALUE ';'-eroteltuna useita), ajo `$K/aja-lontoo-koe8.zsh`
   (HUOM: vaihe 3 vaatii UL:n täydeksi kopioksi pohjasta ennen ajoa; `aja-lontoo-koe8-v3.zsh` = vain vaihe 3).
   `$K/lontoo/palat-d11-katot-koe8-keskeytynyt` = ensimmäisen ajon osittainen tulos, ei käytössä.

## TYÖN ALLA / JONO
0. **[210] Mac-ajot 32–33 JU:lla** (pyydetty 07.59, `$K/ajopyynto-mac.md` lopun LISÄYS 08.0x): `sk-lontoo-nyt8` (verrokki) ja
   `sk-lontoo-koe8`, lokit `lokit/karttaseppa-katot-a-lontoo-{nyt8,koe8}`, 7 kuvaa (westminster, stpauls, tower, kensington, greenwich,
   bm 45° lähi + kauka-45). Kun tulevat: "talot tila: palat" > 0, katso täysikoossa, parit (sama rajaus, kohde kokonaan) PT:lle.
   PT: ei junaan ennen iPad-paria (kuten koe7; JU:n Documents-koot).
1. **Pino 7 (PT 08.4x, jarj 2): "Louvre ja Saint-Germain-l'Auxerrois"**: kysymys "muutetaanko Louvren mallia kirkon takia vai jääkö
   kirkko pois?" (malli peittää kirkon 32 %). `$F/7-louvre-kirkko.md` (pohja kysymys-omistajalle.md) + YKSI pari nykyisestä junasta.
   Teksti työlistalla. Aloita `seuraava KS`.
2. Seuraavana jonossa [3] "Pariisi valmis: Seine ja sillat -katsaus".
3. Koe7 iPad-pari ja Louvren korttelit: ennallaan (-0747 a, työlistalla odottaa/este).
4. **Levysiirto NAS:lle** (`/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/siirto-worktreet-20261110.sh`, loki samassa kansiossa .log):
   ajettu uudelleen 07.5x taustalla. 08.23: pariisi-mallinostot, tf-talot, lontoo-oikea siirretty; loput proto-karttaseppa-* kesken.
   luovutus-0625 "DIFF EROAA": NAS:lla katkenneen rsyncin .tmp-jäämä (.TODISTUS.md.VhfCYIcwC8) → ratkaisu: rsync --delete vain tälle
   kansiolle ja skripti uudelleen (ei poistoja omalta levyltä). Valmis → rivi PT:lle: montako, Gt.
5. Nimiotto Lontoolle: ennallaan (-0625 c).

## Vahdit
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min). 08.2x: VAHTI-VIRHE
  "fetch epäonnistui 5 kertaa" → viritä uudelleen; jos toistuu, rivi PT:lle.

## LISÄYS 08.5x (PT, KK:n pyyntö) — ENNEN pino 7:ää, jono jarj 1 "Sacré-Cœurin koko puisto: koeajo ja pari"
Pino 6 tarvitsee PELIKUVAPARIN: nykyinen (r8b) | koko puisto pelistä (ei vanhaa pohjapiirrosta). Valmistele koko puiston pohja KOKEENA
(sama rajaus kuin nykyinen kuvakulma; lähde: koko puiston vanha pohja 24p, Resources/NotreDameKoe/sacre-coeur-pohja.png tai -r6 ja
arkisto NotreDameKoe-arkisto/, tarkista kumpi on 436 m; Nahtavyysalue.cs rivi ~232 Pohja = …) koehaaraan + skenaario JU:lle (Mac,
ylhäältä ja 45°, sama kamera molemmissa). Pari → lisää 6-sacre-coeur-puisto.md:hen ja PT:lle. Ei junaan. Sitten pino 7, Seine-katsaus.
