# Natiivi-UI: luovutus 11.11.2026 klo 09.10 (kontekstivahti 27 %; korvaa -0845:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
TYÖTAPA: näkyvän työn tallenteet suoraan KK:lle, PT kopiona; junaan vasta KK:n katsottua. Tallenteesta ei leikata tunnettua vikaa.
Koodi: worktree /Users/Shared/Claude/wt/proto-nui-paisuu, haara natiivi-ui/napautus-lento (push AINA `git push natiivi-backup
HEAD:refs/heads/natiivi-ui/napautus-lento`; upstream julkaisija/juna-224 – ei sinne). Pohja juna-224 a4ef0d609.
tyokalut/tarkista.sh päivittää tyylikirjan → git checkout ennen committia; POHJAVAHTI- ja LIIKEVAHTI-rivit ovat pohjassa jo (tarkistettu).

## Commitit haarassa (uusin alimpana)
- f2a844889 + 50565c427 työ A (napautus yhtenä lentona, kohde keskelle); 8eb544f7c työ B (kohdelukko); 9c24daf3e täysi ympyrä.
- b07796650 KK:n B-palaute 1–4 (KK 08.5x) + Sainte-Chapellen koko:
  1) PalloKierto.EsitysKatse: kohdelukon ajan katsepiste mallin keskikorkeudella maa + (huippu − maa)/2 (NahtavyysEsittely.Katse, mallin
     mitatut maa/huippu, ei KiertoKorkeus). Liukuu 0,6 s; pois päältä katsepiste liukuu katsesuoraa pitkin (PudotaEsitysKatse, ei hyppyä),
     ajon aikana hiipuu. Rajauksen muoto kiertopisteestä (NahtavyysRajaus.Muoto.Siirretty). Testi KatsepisteKeskikorkeudellaKeskittaaKohteen:
     ellipsoidilla dy kyllästyy ≤ −0,45, keskellä |dy| < 0,1 (diagnoosi vahvistui). Testikomento `ui nahtavyysesittely katse 0|1`.
  2) PalloKierto.EsitysLahin = rajausetäisyys × NahtavyysEsittely.EsitysLahinOsuus (0,7) → LahinSallittu lukossa (enintään nykyinen korkeus).
  3) Esittele-silmukka: jos tappi pysäytti kierron (TappiViimeksi), JatkaKierto 0,5 s tauon jälkeen (Taysi, vauhti levosta 2 s).
     Huom: täysi ympyrä ei pysähdy tappeihin (Kiertaa → kierrossa-haara); KK:n havainto oli 8eb544f7c-ajosta (kertoja lopetti 6,1 s).
  4) KameraTappi: tähtäin piilossa, kun EsitysKohde != null.
- 59f3dcbb6 työ C: kartan tapit Ø 80 (pohja 64), nuppi 30 (.mk-tappi--kamera, ohjausnappi.uss); herkkyys: kallistus 30, kierto 40 °/s,
  zoom 0,6 ln/s, sivu 0,3 (KameraEleet); liikkumisala OpasTapit.Tappi.Ala = KameraTappi.KartanTapinAla 1,3 (sormi renkaan yli).
- 237e44e6f työ D: kaupunkilehden etusivulle Matkailijalle-juttu ennen osiohakemistoa (yksi kappale, kuva, MATKAOPAS-nauha, linkki
  "Matkaopas →"); oppaan arkin otsikko "Matkaopas"; Turisti-info-nappi pois kartalta (Karttaselite.InfoNappiKartalla false).
  Testikomennot `ui lehti matkaopas 0|1`, `ui kaupunkinapit info 0|1`. Avauskortin TURISTI-INFO-rivi ennallaan (ei pyydetty).
Testit: Kartta 755/755, Linssit 2289/2289, Peli 912/912, kameratesti ok, kielivahti ok, unity 0.

## Odottaa (JU:lla, tulokset seuraavalle NUI:lle)
- nui-napautus-katse-1 (sk-napautus-katse-1.txt, Sainte-Chapelle + Eiffel: 10 s, vasen tappi ylös 3 s, oikea tappi, 4 s jälkeen, sulku).
  Pyydetty sha 59f3dcbb6 (tai b07796650, jos ehti alkaa); kansio /Users/Shared/Claude/proto-3d/lokit/nui-napautus-katse-1-<sha>.
  Katso: kohde keskellä ja selvästi isompi kuin lento-3:ssa, lähennys ei vie jalkoihin, ei ristimerkkiä, sulussa ei hyppyä (loki
  "esityksen katse … pois, katsepiste liukui"), tapit isommat. Sitten tallenteet KK:lle (kopio PT) ja PT:lle 3 riviä.
- nui-matkaopas-1-237e44e6f (sk-matkaopas-1.txt): kartalla vain Lehti-nappi, etusivun Matkaopas-juttu, Matkaopas-sivu. Kuvat KK:lle.
  `ui lehti sisallys-ala` ei ehkä vieritä etusivun alaosaan – tarkista kuvasta m2; tarvittaessa uusi skenaario.
- lento-3 (9c24daf3e) valmistui (kuvat lokit/nui-napautus-lento-3-9c24daf3e); JU vie KK:lle.
- KS: seinänpalat KJ33 JU:lla (ei NUI:n työ).

## SEURAAVA TYÖ
- KK:n palaute katse-1/matkaopas-1 → korjaukset; kaikki A–D junaan yhdessä vasta KK:n hyväksynnän jälkeen.
- Lähtöviive 0,8 s (Sainte-Chapelle) vs 0,2 s (Eiffel): mittaa katse-1:stä (smootherstep-lennon alku hidas).
- E (koe): Lehden nappi nostopalkin vasemmalle puolelle. Symmetria KK 08.3x: palkkia/kuvaa EI siirretä.
- Saapumisen tavoitekuva Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saapuminen-kaupunkiin.md: NS tekee, NUI auttaa
  introkuvissa (Introesitys, UiNakymat.Hae().Introesitys, Aloita(sumeaTausta: true)).
- Myöhemmin: iso iPad 0f0f950a6 / KS 599b0150d -ajo JU:n vuorolla; tarinamerkit odottavat Codexia.
