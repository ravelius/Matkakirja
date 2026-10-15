# Linnanrakentaja → Codex: Louvre #312 – K1 = v2 HYVÄKSYTTY (PT:n linja), K2–K7 saavat alkaa

## K1
Oma laskentani: v3 **70,5 %** (ylin rivi 203 vs 262: palatsi taas liian iso/lähellä), v2 **91,3 %**, v1 53,4 %.
PT:n linjan mukaan (v3 < 95 % → paras ≥ 85 % hyväksytään): **sitova K1 = v2** (`posti/louvre-havainne-v2/louvre-K1.png`).
Kiitos huolellisesta työstä. Mallinnusohje, jonka kirjaan omaan kierroslokiini (ei toimenpiteitä sinulle):
siluetti ja massat LiDARista (K1-maskina käytän LiDAR-maskia), ulkoasu (kivi, katot, kiveys, patsas) v2:sta; v2:n tunnetut
virheet ohitetaan: Seine palatsin takana (oikeasti etelässä), Cour Carrée puuttuu, lähimmät siivet 10–25 px liian kapeat.

## K2–K7 (kaikki nyt 1536 × 1024, 3:2)
Tässä kansiossa natiivit LiDAR-pohjat suoraan oikeasta kamerasta: `louvre-K<n>-massa.png`, `-maski.png`, `-ohje.png`
(punainen = tavoitesiluetti) ja päivitetty `louvre-kulmat-natiivi.json`. **Muutos:** K2, K3 ja K5 ovat nyt 3:2 (sisäisen
työkalun natiivikoko); vaakakenttä on sama kuin ennen, pystykenttä kasvoi (K2/K3 vfov 51,8°, K5 55,2°). Kamera ja katse ennallaan.
Vanhat 2400-pohjat ovat vanhentuneita.

Tee sama menetelmä kuin v2:ssa (4 syötettä: massa koko ruudun pohjaksi, ohje, maski, yksi Commons-kuva materiaaliksi;
v3:ssa palatsi kasvoi, kun pohjaa ei noudatettu). Järjestys K2 → K7, yksi ehdokas per kulma, ja mittaa IoU itse tätä maskia vastaan:
- ≥ 95 %: valmis, jatka seuraavaan.
- 85–95 %: valmis, jatka; listaa selvät virheet (kuten K1:n Seine) – kirjaan ne mallinnusohjeeksi.
- < 85 %: yksi uusinta samalla pohjalla, sitten parempi kahdesta.
Maantiede joka kulmassa: Seine palatsin eteläpuolella akselin suuntaisesti; Rue de Rivoli pohjoisessa; Tuileries ja Carrousel
lännessä; Saint-Germain-l'Auxerrois ja korttelit idässä; Cour Carrée neliöpiha itäpäässä. Ei pyramideja eikä altaita.
Merkintä "havainnekuva" joka kuvaan. Toimita kaikki kuusi yhdessä (tai sitä mukaa); tarkistan IoU:t ja PT hyväksyy kerran.
