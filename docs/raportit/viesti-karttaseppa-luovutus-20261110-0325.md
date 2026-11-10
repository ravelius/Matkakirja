# Karttaseppä: luovutus 10.11.2026 klo 03.25 (KS)
Syy: konteksti ≥ 25 % (hook), pehmeä raja. Korvaa -0227:n. Vanhemmat luovutukset historiaa.
`K=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/katot-luuranko/`  `B=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/b3-lontoo/`  (ei git-repoja)

## VALMIIT TÄSSÄ VUOROSSA
1. **PR 6533 mainissa 0f3534184**: historian hetkien 4 faktakorjausta (trikolori/Lafayette perimätietona, tunnelikilven kehykset
   vuorotellen, Platter "lähes varmasti Globe", Lontoon palon tuuli tiistain ja keskiviikon välisenä yönä) + kopiot
   (nahtavyysjutut.js; lehtisivut `node tools/paivita-hetkisivut.mjs`). Vrain-Lucasin kuva → "Pascal à Galileo.jpg" (879 px, PD).
2. **PR 6534 mainissa 46724b191**: korttien faktat (PK:n SKANDAALIT/faktat-2.md): Cheapside-smaragdikello ei omenan kokoinen,
   Thamesin luvat noin 5 000 + "arkeologisesti kiinnostavat löydöt, kuten yli 300 v", Mona Lisa: Apollinaire pidätettiin,
   Picassoa kuulusteltiin; Vrain-Lucas-selite 3.1.1633, yhdeksänvuotias (KK 03.13 korjasi minun 1639-virheeni).
   Molemmat: PT:lle valmis-rivi lähetetty. Työpuut ja haarat poistettu.
3. **B3-kansio** `$B/commons-kuvat-pariisi/`: 01-vrain-lucas-a.jpg = Pascal-kirje (md5 f1782f2b…, vanha `vanha-0225/`),
   LAHTEET.md ja selitteet-luonnos.md päivitetty (KK:n ehdotus).
4. **Pariisin saumat paikannettu taloryhmään** (`$K/koe6-tulos.md` lopussa kaikki luvut): rivipuolitus → kaikki saumat palassa
   16597_11271; talopuolitus (koe6, jossa talolistan taloilta yksinkertaistus pois = koe3:n katto) → lähimmät 10 taloa (tA)
   selittävät 87–94 %; tB/tC ≈ koe6. Talo 546797 yksin vain 14–35 %.

## TYÖN ALLA / JONO (järjestyksessä)
a. **Saumat jatkuu**: JU:lla ajot 22–23 (tA1 = talot 1–5, tA2 = 6–10; `$K/ajopyynto-mac.md`, lokit
   `/Users/Shared/Claude/proto-3d/lokit/karttaseppa-katot-a-pariisi-tA{1,2}`). Kun valmis: `python3 $K/profiloi/rivierot.py tA1 tA2`
   (python3 ilman -I, numpy). Sitten puolita voittaja (talot-*.txt `$K/pariisi/`, rakennus `/bin/zsh $K/aja-pariisi-koe6-talot.zsh NIMI`
   kopioi ensin koe6-kansion: ks. `$K/aja-talot-tA12.zsh`; ~1 min/muunnelma) → yksi talo → mikä yksinkertaista()-kohta
   (`$K/skriptit/katot.py`) tekee sauman → korjaa koe7:ksi. Junaan vasta kun raot 0 ja räystäät säilyvät, PT:n pari.
   Työkalu: tee-palat-luuranko.py ymmärtää nyt `KATOT_EI_YKSINK="osm-id ..."` (vaiheet 1 ja 3).
b. Pelikuvat: Lontoon 02-a ja 07-b pelinäkymässä katsomatta (Vrain-Lucas-kohta tehty).
c. Sisäkulmien rypyt (13 %) vasta saumojen jälkeen, jos tarvitaan.
e. Seuraavan js-muutoksen mukana (PT 03.3x, ei omaa PR:ää): kommentti js/packs/kulttuuri-kategoriat.js:571 "omenan kokoinen ontoksi" → kellonkuori yhdestä smaragdista (kuten PR 6534), myös fokusvirta-lontoo.js:454 "omenankokoinen".
d. Nimiäänet Lontoolle vasta Pariisin oton jälkeen (KK 01.0x); nimilista 43 (sijainnit.json lontoo:*).

## Tiedoksi
- JU nollautuu pian; ajopyynnöt seuraajalle osoitekirjan id:llä.
- Faktakorjauksissa kopiot: historian-hetket → nahtavyysjutut + kulttuuri-kategoriat (generoitu, paivita-hetkisivut.mjs);
  fokusvirta-lontoo → nahtavyysjutut, maa-kategoriat, kulttuuri-kategoriat. Korjausskripti-malli
  /Users/Shared/Claude/wt/karttaseppa-faktat3-korjaa.py (`--kuiva`, kaikki js/packs, jatkorivien kääre).
- Päiväykset kuvista: älä arvaa pienestä pikkukuvasta (1639 vs 1633 -virhe); suurenna tai hae lähde.

## Vahdit (viritä uudelleen)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, re-arm).
- Omia ajoja ei käynnissä.
