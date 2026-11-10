# Karttaseppä: luovutus 10.11.2026 klo 21.36 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -2108:n (sen taustat: git show 786af587c:docs/raportit/viesti-karttaseppa-luovutus-20261110-2108.md).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Tila myös: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/tila.md (21.27) ja ajopyynto.md (LISÄYKSET 21.2x–21.33).

## Junahaara (ennallaan)
- 599b0150d (proto karttaseppa/pariisi-koodimallit) = 224.42 pt-ok. KJ2 (iso iPad) ei linkin ehto; vain kun iso iPad toimii.

## TEHTY tässä sessiossa (haara karttaseppa/sacre-coeur-koodi, natiivi-backup; worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna)
Pino: … 261067f00 Invalidit → 613d32f16 Opéra → 939dde71a Sainte-Chapelle → f979c8d59 Louvren lasipyramidi. Testit 753/753, unity-tarkistus (sh) 0.
- OPÉRA (OhjelmaKohdePariisiOpera.cs): way/54667456, Akseli 16 (−z etelään julkisivulle), origo Tripo-alueen keskipiste (malli siinä), MaaH 45, huippu Apollo 60 m.
  Kytkin "koodimallit opera:Opéra 1". Mittaus _tyo/karttaseppa/koodijuna/tee-opera-pohja.py.
- SAINTE-CHAPELLE (OhjelmaKohdePariisiSainteChapelle.cs): relation/3344870, Akseli 59,5 (+z länsijulkisivu), origo Tripo-mallin kohta (notre-dame X 463 Y 495)
  JA MALLI KESKITETTY SIIHEN (OSM-pohja 16,5 m kaakkoon; Tripo siirretty 14 m luoteeseen kadulta, KK 5.11.). Flèche 75 m, harja 42,5, MaaH 45.
  Kytkin "koodimallit notre-dame:Sainte-Chapelle 1". Mittaus tee-sainte-chapelle-pohja.py.
- LOUVRE: PT 21.3x KJ3-parista "pyramidi lasiseksi (sinertävä heijastava, kuten Tripossa)" → f979c8d59 (liukuväri + ruuturivit). Ikkunarytmi "vain jos halpa": EI tehty
  (Louvressa jo ikkunat, kolmioita 38 511 / 40 000).
- KJ3 Louvre (c735240ae) KATSOTTU 21.29 → PT (parit _tyo/karttaseppa/koodijuna/parit-kj3-c735240ae/), PT vei KK:lle.

## JU:n ajot (kuittaus KS:lle; PARIT ENSIN PT:LLE, PT vie KK:lle – PT 21.3x)
- KJ4 käynnissä 21.26 käännöksellä 613d32f16 (EI Sainte-Chapellea) → lokit/karttaseppa-sacre-coeur-koodi-613d32f16. Skenaariossa on sch-* ja op-* (24 kuvaa);
  sch-koodi-kuvat ovat tässä käännöksessä Tripo-piilotus ilman koodimallia → älä arvioi niitä. Katso SC (tripo/koodi-*), pn-*, in-*, op-* täysikokoisina (pari.py alla).
- KJ5 (LISÄYS 21.33) käännös f979c8d59, sk-mac-sainte-chapelle.txt, 6 kuvaa (sch-* + lv-*-pyramidi) → lokit/karttaseppa-sainte-chapelle-koodi-f979c8d59. JU:lle 21.33.
- Parityökalu: scratchpadissa oli pari.py; kopio _tyo/karttaseppa/koodijuna/pari.py (python3 pari.py tripo.png koodi.png ulos.jpg 1600 [x0,y0,x1,y1 täysikoon rajaus]).
- Tarkista: mustat kolmiot / pinnan suunta, MaaH (leijuuko/uppoaako), SC:n mäki, Invalidien InKortteli-katot.

## LEVY (PT 21.2x: 12 Gi vapaana, kriittinen) – KESKEN
- Ei-aktiiviset worktreet NAS:lle: karttaseppa-katot-koe7, proto-karttaseppa-{beauvoir,korostus-juna,luomalli,notredame,sc-koko} (≈ 6,5 Gt; kaikki puhtaita,
  haarat etäpalvelimella; sc-koko pushattu 21.3x). Skripti: _tyo/karttaseppa/koodijuna/nas-siirto.sh → /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/karttaseppa/worktreet-20261110/
  (rsync + erot/tiedostomäärät). Käynnistetty 21.2x taustalla tässä sessiossa; jos tulos puuttuu, aja uudelleen (rsync jatkaa).
- Kun jokaisella "erot 0" ja tiedostomäärät täsmäävät: `git -C /Users/Shared/Claude/wt/<nimi> worktree remove <polku>` (katot-koe7: web-repo; muut proto), sitten `df -h /Users/Shared` → rivi PT:lle "vapautettu N Gt".
- EI siirretä: proto-3d/_tyo/karttaseppa-kohokartta-raaka (37 Gt, nykyinen raaka), karttaseppa-lontoo-oikea (Lontoo-koe käynnissä), proto-karttaseppa-koodijuna (aktiivinen).
  Vanhat karttaseppa-lokit ovat jo T7-symlinkkejä; _tyo/karttaseppa on T7:llä.

## SEURAAVAKSI
1. KJ4- ja KJ5-parit → PT. Korjaukset samaan haaraan, uusi Mac-pari.
2. NAS-siirron loppuun vienti (yllä) + Gt-rivi PT:lle.
3. KK:n koodimallilista on kokonaan tehty; muuta jonossa ei → kun parit hoidettu, rivi PT:lle "JONO TYHJÄ: Karttaseppä".

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).

## LISÄYS 21.4x
- JU kuittasi KJ5:n vielä käännöksellä 939dde71a (viestini 21.30); 21.33:n päivitys f979c8d59 toimitettu JU:lle myöhemmin. Tarkista, kumpi ajettiin (loki -939dde71a vai -f979c8d59);
  jos 939dde71a, pyramidi (lv-*) puuttuu → uusi pieni pyyntö f979c8d59:lle.
- 21.4x: LEVY TEHTY: PT:n/Postivahdin 21.3x käskyllä 6 vanhaa worktreeta pois (git worktree remove; kaikki puhtaita, haarat etäpalvelimella), noin 7 Gt; NAS-kopio keskeytetty (NAS:lla katot-koe7 kokonaan, beauvoir osittain). Jäljellä vain proto-karttaseppa-koodijuna.
- 21.39: LOUVRE KK:n 1)–3) tehty 5a01b0324 (katot LvLiuske 0x7D8996, lämmin kivi); KJ5 nyt 5a01b0324 (loki -5a01b0324). PT:lle vastattu a) korostus K 2 -säännöllä (korkeus ×2, jalanjälki +150 m) b) vaalea raivaus ei palaudu itsestään → rajattava mallin jalanjälkeen (16.18): SEURAAJAN TYÖ, selvitä mekanismi (pohja/talojen raivaus Louvre-alueella).
