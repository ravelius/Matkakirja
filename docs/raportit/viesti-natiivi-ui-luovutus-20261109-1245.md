# Natiivi-UI: luovutus 9.11.2026 klo 12.45 (kontekstivahti 25 %; korvaa -1221:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870,
PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7. Kuvat ensin PT:lle (3 riviä: mitä, sha, arkin polku).
Arkki: python3 -I <scratchpad>/arkki.py ulos.jpg sarakkeet otsikko kuva1 nimi1 … (kopio
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/3dc7bbec-885c-4a0e-b127-937a7143979d/scratchpad/arkki.py).
Odotusvahti: bash <sama scratchpad>/vahti.sh (Monitor 30 min; ohittaa valmiit). Tarkistus `sh Linssit-testit/unity-tarkistus.sh`,
`python3 -I tyokalut/pohjavahti.py`. zsh:n grep = ugrep → /usr/bin/grep tai git grep. Ääniportti: `python3 tyokalut/palvelu/aaniportti.py <paketti>` (ilman -I, numpy).

## 1. OMISTAJA 12.38 (PT 12.4x), kaksi korjausta HETI, junaan 223
1) VERSIORIVI – TEHTY, KUVA PUUTTUU: natiivi-backup natiivi-ui/versiorivi 4ab1852b2 (= juna 223 734ed685d + UiNakymat.cs: kehittäjätilassa
   "v0.1.0 (223) · 9.11. 12.31", ei "koottu"-sanaa, commitia eikä "· kehittäjä"; TF ennallaan; commit yhä Testinäkymässä). Worktree
   /Users/Shared/Claude/wt/proto-natiivi-ui-versiorivi. SEURAAVAKSI: JU-ajo, jossa ☰ auki kehittäjätilassa (iphone + ipad), kuva → PT.
2) ‹ RANSKA ▾ › PALKISSA: nimen pitää avata AINA sen paikan nostovalikko (KK suunnitelmat/20261109-kaupungin-nimi-ja-kiinnitetty-nosto.md,
   omistaja 07.21); nyt avaa noston. EI ALOITETTU. Koodi: Pinnaus.cs PaivitaSelaus/NostotPainettu/AsetaYhdistetty (rivit ~363–400):
   Yhdistetty vaatii KaupunkiNakyma.Nimi + Pienena + KaupunkiNostovalikko.Viimeisin; muuten nimi-nappi avaa noston oman listan
   (NostotValikko) tai napautus osuu palkkiin (palkin napautus palauttaa noston, 4.12). Selvitä laitteella, kumpi (lokissa
   "ui pinnaus: kaupungin nimi palkissa …"), ja korjaa niin, että nimi avaa kaupungin/paikan nostovalikon myös maan tasolla ("Ranska").
   Tee junan 223 päälle (voi samaan haaraan natiivi-ui/versiorivi tai omaan).
   EI töitä kohtaan "palkki näkyvissä myös avatussa nostossa" ennen omistajan korttia. Mont Blancin pysähtymiskorkeus (myös p-4 Cosquer) = NS.

## 2. PAIKKAPALKKI 027326c38 (natiivi-backup natiivi-ui/paikkapalkki; worktree wt/proto-natiivi-ui-paikkapalkki, haara paikkapalkki-paluu samassa)
- = 5f8860254 + NS d554280c0 + NUI-kutsu 26277d99a (fast-forward, PT 12.4x) + 027326c38 pohjavahdin tokenit (lentokartan piste/viiva).
- JU ajaa 3 kokoa → lokit/nui-paikkapalkki-1-<koko>-027326c38. iPhone katsottu: p-1–p-6 ok, MUTTA p-5a yhä sumea beige (esilataus käy:
  "paluu alkoi, esiladattu 11.1 s"; kuva nousun alusta Lagorce/Ardèche ~15 km, NS:n koekuva osui myöhemmäksi Brioude ~60 km).
  Vika + vertailu NS:lle ja PT:lle (12.43): arkki-p5a-vrt-ns-koe.jpg ja arkki-paikkapalkki-1-iphone.jpg samassa kansiossa.
  iphone-vaaka valmis 12.45 (katsomatta), ipad tulossa. EI KK:lle ennen p-5a:n korjausta (NS). Kun NS korjaa: yhdistä, ajo 3 kokoa → PT;
  PT:n kuittauksen jälkeen KK, juna ja pienen iPadin asennus (OMISTAJA 12.0x).

## 3. FPV-HUD natiivi-backup natiivi-ui/fpv-napit b57df8ec6 (worktree wt/proto-natiivi-ui-fpv-napit)
- 593ea3639: iPadilla tietorivi 19 pt (ISS-ohjauspöydän LCD:n yksirivinen koko IssOhjaamo.PoytaYksiRiviPt; kilpi samassa suhteessa,
  FpvNakyma.MitoitaRivi); iPhone ennallaan. Katsottu, PT:lle "valmis KK:lle" (arkki lokit/nui-fpv-hud-1-ipad-593ea3639/arkki-fpv-hud-ipad-rivi.jpg).
- b57df8ec6 = + NS:n tikut/hover 95b65cbe4 (NS:n hover-ajo ok). Odota PT:n/KK:n palautetta.

## 4. OPAS-M 6ce1efd49 (natiivi-backup natiivi-ui/opas-m, worktree wt/proto-natiivi-ui-opas-m) – JU:n jonossa (ajoa ei vielä)
- JU ajaa PK:n sk proto-3d/_tyo/pelikoodari/lontoo/sk-m2.txt iphone+ipad → lokit/nui-opas-m-<koko>-6ce1efd49. Katso m2-saapui → PT.

## 5. JUOKSUPELIN HUUDOT (kala-allas + granaattiomenapuu, omistaja 12.32 "äänet hyvät") – TEHTY
- JU vei 12.38: media.matkakirja.app/juoksupeli/puyi-ulkoesineet-v1/huudot/01-kala-allas-1.mp3 … 08-kukkaruukku-4.mp3 + manifest.json
  (taso ennallaan, vastaa puyi-huudot-v1:tä). Paketti proto-3d/_valmiit/juoksupeli-huudot-kala-allas-ruukku-vienti-20261109.
  PK:lle polut ja kestot; PK kytkee PuyiHuudot.cs:n.

## Muuta
- Vanhat worktreet poistettavissa: wt/proto-natiivi-ui-nostovalikko-juna223, wt/proto-natiivi-ui-nostovalikko (ei poistettu).
