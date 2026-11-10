# Pelikoodari: luovutus 10.11.2026 klo 14.31 (konteksti 26 %, pehmeä raja)

Natiivityöpuu: /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/latausruutu-225 (natiivi-backup), kärki 87a9d0e69.
Ketju juna-224:n kärjestä f08387e78: 423e02931 → d42a45345 (jumi) → 15baea099 (Poistu) → f45192f8e (musiikki) → 7ca1d628f (leiman ääni)
→ 87a9d0e69 (PJ3:n korjaukset). Kaikissa unity 0. Edellinen luovutus: viesti-pelikoodari-luovutus-20261110-1310.md (kohdat 2–4 yhä voimassa).

## 1. JUOKSUPELIN LATAUSRUUTU – KESKEN, Mac-ajo JU:lla
- 7ca1d628f LEIMAN TÖMÄHDYS (PT 13.3x: oma pankki, ei Soundlya, ei kokoruudun ohjausta): LeimaAaniUrl =
  media.matkakirja.app/aanet/museo-askeleet-v1/museo-askel-01.mp3 (ämpärissä 13.10. alkaen, md5 = äänisivun uudet/museo-askel-01;
  0,55 s, kuiva, yksi isku), LeimaAaniSavel 0,85 (raskaampi). Äänittäjälle kerrottu; Soundly jää, ellei KK pyydä.
- PJ3 (Mac pieni iPad pysty, 7ca1d628f, proto-3d/lokit/pk-latausruutu-7ca1d628f) KATSOTTU: ☰ oikeassa yläkulmassa ja valikko (Poistu
  alimpana) latauskuvan päällä OK (l1-valikko); otsikko ei osu katon koristeisiin; leiman ääni soi; Poistu kesken latauksen → kartta OK.
  VIAT → 87a9d0e69:
  a) latausmusiikki hiljeni latauskuvan tullessa (AaniPohja.NakymaVaihtuu rivillä ~358 hiljensi juoksun oman lähteen) → NakymaVaihtuu(sailyta:)
     säästää maailman juuren alla soivat; lennossa pitää näkyä "musiikki avaus jatkuu (lento)".
  b) ajo 2 (0,12 Mt/s): latausraja 120 s laukesi, mutta alkaneet haut jatkuivat → latausruudulla 197 s. Nyt katkaisun jälkeen ohitettavat
     käynnissä olevat haut (mallit, kuvat, ei hahmot-) katki heti ("verkko katkaistu kesken").
  c) Abort ei päätä hakua samassa ruudussa → sama haku katkaistiin ~600× (5511 riviä) → jo katkaistut ohitetaan Tarkkaile-silmukassa.
  HUOM: ajo 1:ssä verkko antoi 0 tavua kaikille hauille 60 s (ajo 2: 0,12–0,18 Mt/s; curl nyt 0,3 s) → leiman PNG ei latautunut ja palkki
  seisoi 0,02:ssa (palkki = todellinen edistyminen, ei arvattua aikaa, Natiivi-UI 26.10. – ei muutettu). Puyi (puyi-perus.glb 17 Mt) on
  hidas verkko -tilanteen pullonkaula: 0,12 Mt/s ≈ 145 s; hahmoa ei ohiteta. Jos PT haluaa: Puyi ensimmäiseksi hakujonoon.
- SEURAAVAKSI: JU ajaa sk julkaisija-tyokalut/sk-taysi/pk-latausruutu-87a9d0e69.txt (444, md5 32db3bec6a5f) → lokit/pk-latausruutu-87a9d0e69.
  Tarkista loki: (1) "näkymä juoksupeli avautuu" ei listaa "Juoksupeli: musiikki", "musiikki avaus jatkuu (lento)"; (2) "hiljainen haku
  katki" kerran per haku; (3) ajo 2 maailma valmis pian 60 s:n jälkeen; (4) kuvat l1-valikko, l2-4s (leima), l2-maailma, l3-kartta.
  Jos OK → JU:lle ok pienen iPadin LAITEAJOON 87a9d0e69:llä (sama sk pystyssä + ruutu-/äänitallenne: latausmusiikki → lento, leiman
  tömähdys) → pari ennen (omistaja-20261110/juoksupeli-latausruutu-jumi-1247.png) | jälkeen PT:lle; KK:lle kuulonäyte + pari (PT 13.3x).
- sk-tyhjenemisvika (13.19 ja 13.30 sk 0 tavua) oli JU:n mac-yleis.zsh:ssa (kerros-versio samaan polkuun) – JU korjasi 14.2x.

## 2. TYÖLISTA (PT kuittasi 13.3x)
- "Peukalorenkaat…": ei koodityötä (ae161fdb6 + 06d003a24 + 1ceb5e35e junassa 224); laitekuva v131-ajosta.
- "Ei automaattisia käännöksiä, dronelento, latauskuva koko ruutuun": tehty (kaikki koodissa 2.11. alkaen), PT kuittasi.
- Montparnasse [1] ja tausta v131: iso iPad ei käynnisty (error 22, 13.21 ja 14.12, laitevika) → JU:n PK4-ketjussa, kun laite kunnossa.
  v131-ajon kuvat (renkaat alussa näkyvät) → pari PT:lle, kuten edellisen luovutuksen kohta 2.
- Lyon-b (edellisen luovutuksen kohta 3) yhä JU:n jonossa.
