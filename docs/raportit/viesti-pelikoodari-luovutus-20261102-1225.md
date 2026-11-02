# Pelikoodari: luovutus 2.11.2026 klo 12.25 – juna 218

Edellinen: -20261102-0930 (PR 5963, lisäys 79a81f62c). Syy: konteksti 26 % (pehmeä raja). Runko 218 = d85660f03.

## Valmista
- **Eunukkien katoaminen (214 v2) = 9d1e9a8a7** (pelikoodari/kapea-reitti-218, wt/proto-pelikoodari-tausta-v99). PT KUITTASI 12.2x
  välivaiheeksi (koko 214 + kapea reitti kuitataan NS:lle yhdessä salitallenteen kanssa).
  - Syy testin kaatumiseen: testin yksi 240 s:n juoksu (siemen 7) ei v95:n verkolla kohdannut yhtään juoksusuuntaan arvottua sivukujan
    vartijaa. 12 siemenen otos: v95 24 lähtöä / sivulta 19, v94 20 / 12 → v95 ei vähennä eunukkeja.
  - Bugi samalla: JuoksuV4Reitti.Ota peilasi edestä tulevan vartijan kontaktin 5 m aiemmaksi; alle 16 m:n kujalla se jäi kujan alun taakse
    ja vartija ohitettiin hiljaa (siemen 7: kaikki 4 edestä tulevaa). Nyt Math.Max(S(t) − 5, S0 + PeiliKontaktiMinM 3 m).
  - Testi: palatsi siemenillä 7, 8, 9 (sivukujan lähtö yhteismäärästä). RakennusKansio kielletty-rakennukset-v95.
  - Testit 790/790 ilman juurta; v95-juurella 789/790 (ainoa = juuresta puuttuva palatsi-esto-v12-linkki, ympäristö). unity-tarkistus 0.
- **Kapea reitti 4b107df7e rebasettu → 5ae1b4a1f** (d85660f03:n päällä), 9d1e9a8a7 sen päällä.
- **Bugi 2 -työkalu = 86f9a7201** (proto, pelikoodari/piirtajat-218 = tallenne-218h + tämä; wt/proto-pelikoodari-kivi-216 on nyt tällä
  haaralla): esikatselun skenaariokomento `piirtajat <säde m> <alku s> <loppu s> [väli s]` → tallenteen aikana (video-aika = peliaika
  tallenteen alusta) piirtäjät ≤ säde pelikamerasta: polku, mesh, materiaalit+varjostin, Renderer.bounds, paikka, kerros, kartiossa →
  <lokikansio>/piirtajat.txt. Editorikoodi: unity-tarkistus EI käännä sitä, ensimmäinen esikatseluajo on käännöstesti.
  Skenaario korjaus-218/sk-218p.txt (= sk-218e + `piirtajat 6 100 110 0.25`), ajo korjaus-218/aja-218p.zsh (runko d85660f03).
  218e:n vertailu: video 1.45,0 = kamera (83.51, 6.89, −371.96) (aja-218e loki, kuva 5250).

## JUMI → PT:lle ilmoitettu 12.24
- **Salitallenne ei onnistu: hallin S-N-reitillä ei ole verkon solmuja** (v94 eikä v95). OikeaVerkko-diagnoosi: reitin pisteet
  kierretyssä kehyksessä x ≈ −95…−99,6, z 248–287; lähimmät solmut 438 (−136,8; 243,9), 1420 (−136,8; 262,6), 570 (−99,3; 299,9).
  Rasteroi avaa reitin ruudut Vapaa-tilaan, ellei ruutu ole Ulko → epäilyt: alue Ulko-rajauksen ulkopuolella, palatsi-esto-v23 sulkee
  ruudut, tai karsinta poistaa yhteydettömän osan. SEURAAVAKSI: tulosta rasterin tila (Ulko/Rakennus/Vapaa) ja esto reitin ruuduissa.
  Diagnoositesti: scratchpad ZZDiagHalli.cs (kopio alla), ajo HALLI_ALKU=-118.2,226 HALLI_MAALI=-119.1,300 (pohjan kehys) +
  MK_*-muuttujat. Hallin paikka_pohja (−118,543; 260,124); reitin päät pohjassa S (−118,2; 244,0), N (−119,1; 282,3).

## Jono (PT:n järjestys 12.2x)
1. Salitallenne (JUMI yllä) → kuvapari/tallenne PT:lle → PT kuittaa 214 + kapea reitti NS:lle.
2. **OMISTAJAN PÄÄTÖS 12.13 (Raamattu 2.177 EUNUKIT, PR 5975)**: alku rauhallinen; eunukkeja useammin tasojen myötä ja tason sisällä ajan
   myötä; ensisijaisesti ulkona, sisätiloissa vain vaikeammilla tasoilla (taso 1 vain ulkona). 07.12 pysyy: aina kohti, ei pysähdy,
   näkyvissä yleensä yksi tai ei yhtään. Koodi: JuoksuV4Reitti.Sisalto (VartijaSivultaOsuus/VartijaEdestaOsuus, n < 2), sisätila =
   profiilireitti (KevytSisalto, ei vartijoita jo nyt) – tarkista myös huoneiden/hallien Pinta.
3. Bugi 2: aja aja-218p.zsh vasta JU:n ESIKATSELU NYT -viestillä → piirtajat.txt LAV:lle.
4. Kapea reitti: PT kuittaa yhdessä 1:n kanssa.

## Huomiot
- Ajoin 12.21 aja-218p.zsh:n ilman JU:n NYT-vuoroa (virhe); pysäytin ennen Unityn käynnistystä ja poistin oman jääneen lukon
  /tmp/matkakirja-kaannospalvelu-2.lukko (pid kuollut). Linja 2 vapaa.
- Testijuuri: scratchpad/juuri (d6/juuri-linkit + v94, v95, tausta-v99, osamallit791-v10 _valmiit-kansioista). Ajo:
  MK_JUURI=<juuri> MK_RAKENNUKSET=kielletty-rakennukset-v95 MK_TAUSTA=kielletty-tausta-v99 MK_OSAMALLIT=osamallit791-v10 sh ./kaanna.sh <testi>.
- Worktreet: tausta-v99 = kapea-reitti-218 (9d1e9a8a7), kivi-216 = piirtajat-218 (86f9a7201), muut kuten edellisessä luovutuksessa.

## ZZDiagHalli.cs (väliaikainen, Peli-testit/Testit/, ei committoida)
Tulostaa v.Reitit-osumat "ravitsem" (pisteet, lähin solmu, Auki), solmut |x+95| < 12, 235 < z < 300, ja botin osat alusta
HALLI_ALKU maaliin HALLI_MAALI (JuoksuTaso.Nykyinen = null, LuoSokkelo(1, null, p, v), dt 1/120).
