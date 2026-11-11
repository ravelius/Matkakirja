# Natiivi-UI: luovutus 11.11.2026 klo 10.27 (kontekstivahti 26 %; korvaa -0951:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a. TYÖTAPA: näkyvät tallenteet suoraan KK:lle, PT kopiona; tunnettua vikaa ei leikata.
Taustat (A–E, testikomennot, push): -0951 ja -0910 (haarat natiivi-ui/luovutus-20261111-0951 / -0910). Kaikki push: `git push natiivi-backup HEAD:refs/heads/<haara>`.
Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null` (tyokalut/tarkista.sh muuttaa tyylikirjan → git checkout ne ennen committia).
Ajojen odotus: scratchpadin odota.sh-malli (bash, until loki.txt "valmis N s"); zsh-glob tyhjällä kansiolla kaataa until-silmukan.

## 1. PALLOVIKA (omistaja 09.23) – ENSIMMÄINEN
- pallo-maa-1 (bd7f0ea44, lokit/nui-pallo-maa-1-bd7f0ea44) EPÄONNISTUI: kiinteä 78 m × kerroin vei UI-pallon piirroskartalla Grand Palais'n päälle
  (~1 km) ja liukui yhä. Syy: piirroksen näkyessä merkkien pinta = MaanPinta.Nosto (kerroin × (1 − PiirrosKerros.Nakyvyys) → 0).
  bd7f0ea44/ee1c731cd EIVÄT junaan. KK ja PT tietävät.
- KORJAUS 27ef4dd78 (natiivi-ui/pallo-maa, worktree /Users/Shared/Claude/wt/proto-nui-pallo; HUOM worktree on nyt haarassa natiivi-ui/pallo-3d):
  KaupunkiPallot.Pinta(p): Pariisissa MaanPinta.Nosto, odottaessa Sovita(MaaM) × (1 − Nakyvyys), muualla Sovita(MaaM). `ui kaupunkipallot maa 0` = vanha vika.
- AJO pallo-maa-2 JU:lla → lokit/nui-pallo-maa-2-27ef4dd78 (sk-pallo-maa-2.txt, sama ohjelma kuin -1; e = maa 0, j = uusi).
  KATSO: `aja`-komento keskittää ankkurin ruudun keskelle (Tuileries'n puutarha) → j:ssä köyden pää pysyy keskellä/puutarhassa kaikissa liikkeissä
  (vertaa ★-merkkeihin ja Grand Palais'hen; arkki k-000000/090/200/320/450/520/640/740 + rajaus keskeltä). OK → j-jalkeen.mp4 (+ e) KK:lle, PT 3 riviä;
  KK OK → 27ef4dd78 junaan (JU). Ei ok → syy ensin (vertaa Kohdenostot.cs:n RuutuPiste(.., pinta)).
- 3D-pallon kytkös (KS:n pyyntö, KK) 8923f43b9 natiivi-ui/pallo-3d (27ef4dd78:n päällä): OhjelmaKohteet.KoodimallinNakyvyys("kuumailmapallo") →
  UI-kuva ja köysi 1 − näkyvyys, kyltti jää; > 0,5 napautus mallin rajoista (±7 m, 11–42 m) → Avaa(p). `ui kaupunkipallot malli 0|1`, tilaan "3d".
  KS poimi molemmat koehaaraan 2cf7b7e48; KS:n KJ37 JU:lla → lokit/karttaseppa-pallo-kj37-2cf7b7e48 (kp37-ennen-*, kp37-pallo-*): katso, ettei
  UI-pallo jää 3D:n rinnalle, kyltti paikallaan. Koe, ei junaan ennen KK:ta.

## 2. Napautus A+B (natiivi-ui/napautus-lento 2c75bcf22)
- katse-2 katsottu ja KK:lle viety; KK 10.3x: NUI:n osa KUNNOSSA (lento, kierto, katsepiste, sulku, Eiffel-huippu, Lehti-nappi).
- KK:N PÄÄTÖS: A+B EI junaan yksin. SC:n viat (naapuritalon katto kuoren läpi, tornin kärki katkeaa Tripo-mallissa) = KS, jonossa KJ37:n jälkeen.
- KK:n tehtävä 1: PYSYVÄ LÄHIKUVATARKISTUS: sk-kohteet-arkki-1.txt (12 Pariisin kohdetta × alku/90°/180°/270°/lähin = 60 kuvaa, kiertovauhti 15; 270° lisätty PT 10.3x: KK:n ehto 4 suuntaa; JU:lle sanottu kopioi uudelleen, raja 30 min) → JU ajaa matkaopas-2:n
  jälkeen: lokit/nui-kohteet-arkki-1-17ddd9e1c. Haara natiivi-ui/kohteet-arkki 17ddd9e1c (worktree /Users/Shared/Claude/wt/proto-nui-kohteet) =
  2c75bcf22 + karttaseppa/montparnasse-juna a4f6cd17b (Orsay+Montparnasse koodina, talot v14), unity 0. Orsay: `ui kohdenostot napauta Orsayn taidemuseo`
  (ei 3D-kylttiä; tarkista lokista, avautuiko esitys). Tee arkit (montage 5 saraketta × 12 riviä, sips -Z 1000 -kopiot) → KK:lle ja KS:lle.
  Sama skenaario myöhemmin Lontoolle.
- KK:n kohta 3: lähin etäisyys on nyt yhteinen kaava (NahtavyysEsittely.Lahin: h × EsitysLahinOsuus 0,7, palkin alle). KK:lle sanottu: kohdekohtainen
  vähimmäisetäisyys (nimen mukaan) tehdään, kun arkeista näkyy tarve. Sitten A+B + KS:n korjatut mallit junaan yhdessä KK:n sanalla.

## 3. Matkaopas
- matkaopas-1 m0/m1/m3 KK:lle viety; m2 näytti sisällyksen → matkaopas-2 (sk-matkaopas-2.txt, `ui lehti vierita 1100/1700/loppu`, sha 2c75bcf22)
  JU:lla pallo-maa-2:n jälkeen → lokit/nui-matkaopas-2-2c75bcf22. Katso, missä kuvassa Matkaopas-juttu (kuva, kappale, "Matkaopas →") näkyy → KK:lle.

## JU:n jono (NUI): pallo-maa-2 → matkaopas-2 → kohteet-arkki-1.
## SEURAAVA: 1) pallo-maa-2 → KK. 2) matkaopas-2 → KK. 3) kohteet-arkki-1 → KK + KS. 4) KJ37-kuvat (KS lähettää). Sitten saapumisen intro (NS johtaa).
