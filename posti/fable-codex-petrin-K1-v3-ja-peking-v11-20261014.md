# PT → CODEX: Petřín K1 v3 (dc1e096c7) ja Peking v11 (40c32bd4a), 14.10.2026 klo 22.1x

## Petřín K1 v3 – HYVÄKSYTTY tavoitekuvaksi sovitetulla kameralla

Katsoin v3:n täydellä tarkkuudella. Kuva on uskottava, fotorealistinen, koko torni näkyy ja tyyli on oikea. Kolmen kierroksen jälkeen (85 → 73 → 63 %) generaattori ei siirry 40 %:iin; osittaista muokkausta/outpaintia ei tehdä (omistajan ohje, oikein että pysähdyit).

PT:n ratkaisu (kamera on meidän valintamme, ei kuvan):
1. **K1 v3 + sen maski hyväksytään K1-tavoitteeksi.** Alkuperäinen 40 %-kamera hylätään; **K1-kamera sovitetaan v3:een** (etäisyys/korkeus/FOV niin, että #253:n fyysisillä mitoilla tehty torni osuu v3:n siluettiin: mastokärki ~15 %, jalat ~78 %).
2. **Geometria aina #253:n fyysisistä mitoista** (runko 58,7 m, tasanteet 20 m ja 51 m). Kuvan tasanteiden poikkeama (alatasanne 36,8 % vs. ~26 %) kirjataan generaattorin virheeksi; malli EI seuraa sitä.
3. **IoU K1:lle ≥ 85 %** sovitetulla kameralla (90 % → 85 % vain K1:lle tasanne-eron takia), korkeus- ja ΔE-rajat ennallaan. Maski kelpaa IoU-vertailuun sellaisenaan (täytetty ulkosiluetti; sertifiointia ei tarvita).
4. Jatka **K2–K5 yksi kerrallaan** samalla periaatteella: generoi, mittaa, ja jos rajaus poikkeaa, sovita kamera kuvaan (älä uusi kuvaa pelkän rajauksen takia). Uusinta vain, jos kuva on epäuskottava tai torni ei näy kokonaan.
Toimita K2 + maski + sovitettu kamera ja pysähdy.

## Peking v11 – VASTAANOTETTU välitoimituksena (ei peliin)

Kiitos rehellisestä raportista. Kierros 3 on oikea valinta; malli on vielä selvästi pelkistetty tavoitekuviin nähden. Seuraava rajattu luuppi (enintään 10 kierrosta) tässä järjestyksessä, suurin näkyvä hyöty ensin:
1. **Pinnat:** kivetyksen, veden ja hutong-kattojen toistuva harmaa → vaihtelevat materiaalit tavoitekuvien mukaan (laatoitus, saumat, kosteus, kattotiilen rivit); veden heijastus ja sävy.
2. **Historialliset katot ja julkisivut:** Taihedianin ja pääsalien kattomittasuhteet, räystäät, ovet, terassit ja rampin detaljit.
3. **Puusto:** monimuotoiset latvukset (koko, sävy, tiheys) ja Beihain pohjoisrannan paljaat pinnat peittoon.
Sama raportointi kuin v11:ssä (diagnostiset luvut nullina, jos niitä ei voi varmentaa). Peking pysyy poissa pelistä.
