# Raportti 14 (Valoseppä 15.11.2026): KK 09.00 A + a b c, kierros 7 mittaus. EI JUNAAN.

Ajo: JU VS-TYYPPIMALLIT7 09.24, pelihaara valoseppa/tyyppimallit-peliin c77f13bd2, iPad, Pariisi p8–p11 UUSI 4/4 (rc 0).
Kuvat lokit/valoseppa-tyyppimallit7-pariisi. Mittaus: arkki6.py vari (mediaani suorakaiteesta) ja mittaa7.py (seinä + ikkuna, ruskeat pikselit).
Testit c77f13bd2: Kartta 857/857, Linssit 2342/2342, unity-tarkistus 0, testi_hallit, testi_kattovari OK.

## 1. Loiva katto ±3 % naapurikatosta (kanavittain) — TÄYTTYY
| Kuva | Mallin katto | Naapurikatto | Ero |
|---|---|---|---|
| p9 Palais Royal, yläläpe (x1600–1800 y540–580) | #A3A9AB | #A2A8AB (vasen talo) / #A6ACAE (oikea talo) | +0,6 % / −1,7 % |
| p8 Saint-Ignace, laivan valoisa lape | #969B9D | #969898 (talo oikealla keskellä) | 0 / +1,3 / +3,3 % (B) |
Kierros 6: mallin katto #959996 vs talot #ABAFB1 (−13 %). Uusi katto (#949EAA = kattovari) poisti eron; omaa vakiota ei lisätty.
p8:ssa sininen kanava osuu rajalle, koska laivan lape on kalteva ja talojen katto tasainen (sama valo-ero kuin raportissa 13); p9 on puhdas vertailu.

## 2. Jyrkkä lape talojen mansardilappeiden välissä — TÄYTTYY
- p11 Saint-Pierre de Chaillot, laivan lape #777A7E (kierros 6 #727474). Talojen mansardit: p11 #929495, kierros 6 #707275–#8B8F90.
- p9 palatsin alaläpe (varjopuoli) #787B7D, samassa välissä.

## 3. Ikkuna = taloikkunan väri (b) — TÄYTTYY
| Pinta | Seinä | Ikkuna | Ikkuna/seinä |
|---|---|---|---|
| p9 palatsin julkisivu | #A9977D | #67574A | 0,61 0,58 0,59 |
| p9 vasemman talon sivu (sama valo) | #A9977C | #665649 | 0,60 0,57 0,59 |
| p10 talo | #AC9A7F | #6A5A4B | 0,62 0,58 0,59 |
| p11 talo (aurinkopuoli) | #D1BD9D | #816F5C | 0,62 0,59 0,59 |
Palatsi ja talo samassa valossa: seinä ja ikkuna 1 tavun päässä toisistaan.

## 4. Palatsin pihaseinien ikkunat (c) — NÄKYVÄT
p9: pohjoissiiven pihan puoli (#AC9D89 / ikkunat #756C63, sumu kauempana) ja länsisiiven sisäpinta (#A9977F / #6B5E53) ikkunoineen.

## Huomiot KK:lle arkin yhteydessä
- Tornin huippu (TyHuippu) on ainoa oma katon väri; se koskee myös kupoleita (KK:n poikkeus). p10 ja p11 huiput tummat kuten ennen.
- Lontoon seinä #D0BA8C (lontoo-perheen suurin) tekee Lontoon kirkoista kellanruskeita (London stock).

## Seuraava
Mitta täyttyi ja testit vihreät → KK:n ehdollinen leivontasana voimassa. Leivonta yksinajona PT:n vuorolla (raportti 10 kohta 3);
sen jälkeen yksi arkki KK:lle: p5, p9, p11, p12, l3 (vasen NYT, oikea UUSI).
