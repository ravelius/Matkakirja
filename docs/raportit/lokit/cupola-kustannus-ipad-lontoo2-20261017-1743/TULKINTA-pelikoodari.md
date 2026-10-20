# Cupola-kustannus iPadilla (iPad13,8), kierros 1 – Pelikoodarin tulkinta 17.10.2026 17.5x

Ajo: JU lontoo2 17.43 (ce479c342-laitekäännös), skenaario sk-cupola-kustannus.txt. Ajot 17.17 ja 17.29 eivät avanneet Cupolaa
(OLETA PUUTE; 17.29:n mittaus = muu peli ilman Cupolaa: GPU 8 ms, 30 kuvaa/s) ja 17.28 kaatui (signal 9) → vain lontoo2 kelpaa.

Mediaanit 5 s raporteista (siirtymän 1. raportti pois):

```
alku     tila                       n   gpuMs    p50    p95 kuvaa/s
17:44:53 kehys1 pallo1              7    62.6   33.4   37.8    29.8
17:45:33 kehys0 pallo1              7    64.7   33.4   38.2    28.8
17:46:13 kehys1 pallo1              7    71.2   37.8   42.0    26.4
17:46:54 kehys1 pallo0              7    78.3   41.7   50.5    23.8
17:47:34 kehys0 pallo0              7    79.0   41.7   53.3    23.6
17:48:14 kehys1 pallo1              7    85.2   49.4   57.9    21.6
17:48:54 valot1 kehys1 pallo1       7    83.5   45.5   57.8    22.2
```

## Tulkinta
- **UITK-kehys ei ole syy**: kehys 0 → GPU 62,6 → 64,7 ms (J0→J1), J3→J4 78,3 → 79,0. Ei pudotusta.
- **Pallojakso ei mitannut palloa**: `linssi kerros Pallo 0` piilotti vain 6 renderöijää (KaupunkiPalloKuva, Pohjapallo, Sijaintipallo);
  Cesiumin laattoja FindObjectsByType ei löydä, joten maastolaatat jäivät näkyviin. → kierros 2 käyttää `peli pallo pohja paljas`
  (Pohjapallo.Paljasta piilottaa tilesetin kaikki laatat joka LateUpdatessa).
- **GPU kasvaa ajan mukana tasaisesti** 62 → 85 ms (fps 30 → 22) 4 minuutissa, thermal 0 koko ajan, kytkimistä riippumatta.
  Mahdolliset syyt: (a) ISS lentää maan yli (51,4 N -105,6 → 47,2 N -83,6, Pohjois-Amerikka), laattoja/peittoa enemmän;
  (b) jokin kertyy (laatat, tekstuurit, yövalot 4 × 4096²); (c) GPU:n kellotus laskee ennen kuin thermal-tila muuttuu.
  Kierros 2 erottaa tämän: perus-jakso joka toisena + 80 s loppu.

## Kierros 2
/Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-cupola-kustannus2.txt (sama laitekäännös): laatat pois, pilvet pois,
ilmakeha2 0, bloom 0, kaikki + kehys pois, perus välissä.
