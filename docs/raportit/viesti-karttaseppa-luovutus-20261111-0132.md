# Karttaseppä: luovutus 11.11.2026 klo 01.32 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -0105:n; taustat, työkalut, polut ja vahdit:
`git show 9bc34afb7:docs/raportit/viesti-karttaseppa-luovutus-20261111-0105.md` ja sen viittaama -0010 (LUE: tyyliohje, worktree, testit, Monitor-vahti).
HUOM kello: aja `date` ennen jokaista aikaleimaa.

## Tehty (01.10–01.32)
- KJ19 Invalidit ja KJ20 Louvre: KK katsoi. YHTEINEN SYY tyhjille alueille ja ylimääräisille taloille: `talot kansio` ei pudottanut saapumisessa
  ämpäristä ladattuja paloja (TaloKerros.LueIndeksi) → kuvissa vanhat palat. Todistettu kärkilaskennalla (scratchpad alue.py / majat.py:
  15_x_y.bytes, otsikko 36 t, kärki 24 t, x = itä, z = pohjoinen metreinä palan lat/lon-origosta):
  majat way/64954996 + 64955038 v27: 0 kärkeä (vanha 48/34); ONAC way/64955066 (L-jälki kaakkoisnurmella, 15 m) v27:ssä on; Louvren itäpuoli v25-louvre 1493 vs vanha 83.
- Korjaus 8f647a8d4 (proto, natiivi-backup karttaseppa/kj22-louvre-invalidit = a09d91c95 +):
  TaloKerros.VaihdaKansio → pudotaKaikki (VapautaKaikki seuraavassa Updatessa); Louvre PuutPoisKoodilla = LvKoodi (Tripo-rantarivi katolla);
  LvPiha-seiniin LvPihaSeina (1 ikkunarivi 8,2 m, ~10 m väli; kolmioraja 40 000: 3 riviä 44 628, 2 riviä 41 340 → 1 rivi läpi);
  Invalidit in-koodi-maa.png: esplanadin NW-aukko hiekalla 236,206,151 (_tyo/karttaseppa/koodijuna/invalides-maa/tee-hiekka.py, aja tee-maa.py:n jälkeen).
  Testit Kartta 754/754, Peli 911/911, unity (sh) 0.
- Skenaariot: sk-mac-louvre-kj22.txt (6 kuvaa lv22-*), sk-mac-invalidit-kj23.txt (4 kuvaa in23-*), molemmissa talot 0 ennen kansiota.
  ajopyynto.md LISÄYS 01.5x; JU:lle ja KK:lle lähetetty. sk-mac-invalidit-kj21.txt päivitetty myöhässä (KJ21 ajoi vanhalla, majat näkyivät).

## Käynnissä / seuraavat
- KJ22 Louvre ja KJ23 Invalidit JU:lla → lokit/karttaseppa-louvre-kj22-8f647a8d4 ja -invalidit-kj23-8f647a8d4. Katso kuvat itse
  (talot Louvren pohjois-/itäpuolella, ei puita katolla, pihaikkunat; Invalidit: majat poissa, ONAC 3D, aukko hiekalla), sitten KK:lle.
- KK 01.29: Invalidit junaan seuraavan kierroksen jälkeen, kun 3 kohtaa kunnossa (yllä). KK:n OK → PT:lle junaehdokas (talopaketti v27 --edellinen v6,
  koodi-Invalidit oletukseen; JU yhdistää). Louvre: KK:n OK:n jälkeen samoin (palat v25-louvre-opera eivät sisällä Invalideja → ketju tarkistettava).
- Ei tehty, KK:lle kerrottu: Carrouselin nurmen reunat (kartalta), kupolin lohkot (OsaKupoli 32 × K 9 yhteinen muiden kanssa).
- Jono -0105:stä yhä: SACRÉ-CŒUR (lähikuva mäen yläpuolelta + yksi rivi mäestä KK:lle), SAINTE-CHAPELLE (KSC=1, tähtäys mallin kohdalle).
- 224.52 = 69de2ef77 (ND-puisto 0aad16c3f) linkissä (JU 01.2x).
