# Pelikoodari: luovutus 09.11.2026 klo 17.45

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (25 %). Edellinen: `git show 092cca1eb:docs/raportit/viesti-pelikoodari-luovutus-20261109-1721.md`
(kaikki sen kohdat hoidettu tai alla). Kuvat ≤ 1000 px (sips -Z 1000 scratchpadiin), laajat haut Sonnet-agenteilla.

## TEHTY TÄSSÄ VUOROSSA
- SISÄLTÖVIENTI d8dcdc43a: run 42642827977 success → sisältöversio v1031. Lontoon 14 juttua + kohdekartan kohdetta, 2 kuvaa kukin;
  Commons-tiedostot 28/28 olemassa (API). ORNC:lla ei fi-wikiä, mutta koodi hakee en-wikin → ei vika (KS:lle kerrottu). PT:lle "ok" 17.4x.
- LONTOO-14 PULUN KYSYMYKSET → Pulu v4:
  - Pääreponi pelikoodari/pulu-kaupungit-maat 93572a50e (työpuu /Users/Shared/Claude/wt/pulu-kaupungit-maat): pulu-esigenerointi/
    LONTOO-MALLINOSTOT (luonnos-ks.json = KS:n 28 kysymystä + PK:n faktavastaukset, agenttiohje, vaihe1/2) + valmistele-mallinostot.mjs
    lontoo/GBR. 28 + 81 vastausta Sonnet-agenteilla, tarkista-era/tarkista-valmis 0 virhettä, PK luki kaikki (6 korjausta).
  - Paketti /Users/Shared/Claude/proto-3d/_valmiit/pulu-v4-lontoo-mallinostot-vienti-20261109 (v3 tavulleen + GBR) → JU vei 17.36 (44, 0 virhettä).
  - Natiivi 08f48ac73 (natiivi-backup pelikoodari/pulu-lontoo-mallinostot, 4c49da614:n päällä): polku v3 → v4 (PuluValmiitLataus, PuluValmiit,
    nosto-kysymykset.py, pulu-kultaiset.py). unity-tarkistusta ei ajettu (pelkkä merkkijono).
  - JU ajaa sk /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/pulu-lontoo-mallinostot/sk-pulu-lontoo-mallinostot.txt iphone
    → lokit/pk-pulu-lontoo-mallinostot-iphone-08f48ac73 (odotukset sk:n alussa: keskikohde kohdekartta:lontoo:Westminster Abbey (valmiit 2) jne.).
- NIMIÄÄNET bda9945bf: kieli.json korjattu jo 17.3x, JU vei paketit 17.24/17.26. Ajo 17.38 EI todistanut: testikomento "ui tietokortti
  napauta" ei löytänyt nimiä ("nimeä ei näy kartalla", ladottuja 13, näkymä tyhjä) → syy skenaario. sk v2 samassa polussa
  (_tyo/pelikoodari/pariisi-nimet-20261109/sk-pariisi-nimiaanet.txt; v1 -v1.txt): maasto siirtyma 5 0 30 + lahizoomi 3, näkymäkuvat,
  vaihtoehtoiset nimet. PT 17.4x: tarkista KS:n napautusketjun kanssa → YHDISTELMÄ eb4318b15 (natiivi-backup
  pelikoodari/nimiaanet-tietonapautus = bda9945bf + karttaseppa/tietonapautus ab57114e5, siisti merge, unity-tarkistus 0; työpuu
  /Users/Shared/Claude/wt/natiivi-nimiaanet-yhd). JU:lle 17.4x: sk v2 eb4318b15:llä → lokit/pk-pariisi-nimiaanet-v2-iphone-eb4318b15
  (ja mahdollisesti bda9945bf-v2, jos jo käynnissä).
  Testikomento kulkee oikeaa reittiä (kierto.Napauta → NostotKartalla.TietoNapautus). Yhdistelmässä Forum des Halles on KS:n QID-alias
  kohdenostoon → avaa esittelyn eikä soita nimiääntä (oikein); Pompidou-keskus = tavallinen nimi → "nimiääni: pariisi:Pompidou-keskus soi".

## JONO
1. JU:n nimiääni-yhdistelmäajon tulos: loki "MATKAKIRJA nimiääni: 130 nimeä ladattu", "nimiääni: pariisi:<nimi> soi" tavalliselle nimelle,
   ✦-nostolle ei nimiääntä, Concorde "valmis kappale … ← <avain>.mp3" v8/k/. Kuvat katsottuna → PT:lle ≤ 3 riviä → junaan 224 (eb4318b15
   tai bda9945bf + KS-ketju; PT päättää). Jos napautus taas "nimeä ei näy": katso n-0-nakyma-kuva ja vaihda sk:n nimet näkyviin.
2. JU:n Lontoo-Pulu-ajon tulos (08f48ac73) → kuvat + loki katsottuna → PT:lle → junaan 224 (Pulu v4).
3. Kun kumpikin kuitattu: "JONO TYHJÄ: Pelikoodari" PT:lle.

Testit: `cd Peli-testit && sh kaanna.sh <osa>`, `sh Peli-testit/unity-tarkistus.sh` (työpuussa); pöllö: `node --test tests/pollo*.test.mjs`.
