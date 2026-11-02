# Natiivisepän luovutus 2.11.2026 klo 22.35 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261102-1900.md (PR 6018, tämä korvaa sen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. Rungon 8d9951aa7 testit läpi (2223/793/587, tarkista 0), peili ajan tasalla.

## JONO
1. **PT 22.0x, OMISTAJAN PYYNTÖ 21.42: saapumiszoomaus kaikkiin Euroopan kaupunkeihin, NS:n osa C** (suunnitelma
   scratchpad/keskustelukanava/suunnitelmat/20261102-nostot-ja-zoomaus-kaikkiin.md; lue NS:n osuus): matkan aikana kohdekaupungin
   saapumisnäkymän striimilaattojen esilataus (EI verkko- eikä kokoehtoja, Raamattu 6.1) + nykäysvahtimittaus Isolla iPadilla
   Lontoossa ja Bratislavassa samalla kehyksellä (saapuminen-matka218.sh: kaupunki ja matka parametreiksi; ab-saapuminen218.sh A/B).
2. **GC-korjaus jatkuu (PT:n kohta 1), runkoon tehty kaksi osaa.** Saapuminen yhä HYLÄTTY 4.24:n vahdissa (~65–75 pitkää, suurin ~135 ms).
   - Tehty: kutsupinot profiililokiin (CpuMittari.Loki enableAllocationCallstacks + ProfiiliVaraukset: "ENSIMMÄINEN OMA METODI").
     Ennen: taustasäie 2,6 Gt / 30 s, josta ElavaMvt ~1,9 Gt. Osa 1 9be37e4f2 (ElavaMvt laiska taso, tagitaulukko, geometria tavuista;
     identtinen 4 Pariisin palalla, −75 % varausta): runko 96/195 ja 113/225 → 71/108 ja 81/183 (pitkiä/suurin), ruutuja +18 %.
     Osa 2 8d9951aa7 (maskivuokra: ElavaMaski-taulukot heikkoviiteallas Piirra-kutsun ajan): 70/167 ja 71/183 → 68/133 ja 63/142.
   - Profiili osan 1 jälkeen (lokit/natiiviseppa-saapuminen-kutsupinot-f579371ad-20261102/…varaukset.txt): taustasäie 1,2 Gt,
     Tayta 538 Mt (nyt vuokralla), "(ei omaa metodia)" 157 Mt, ElavaMvt.LueKohde/LueArvo/Pakatut ~130 Mt, HaeSisalto 40 Mt,
     pääsäie 95 Mt (Nimikerros.LisaaElavat 19 Mt). GC.Collect taustasäikeessä 33× 77 ms.
   - Seuraava: uusi profiili 8d9951aa7:n päältä (paikannus-218 + osa 2 = haara natiiviseppa/paikannus-218 kärki; rakenna
     `kutsupinot218.sh <sha9>`), sitten suurin jäljellä oleva. Pääsäikeen pitkät ruudut voivat olla muuta kuin GC:tä: katso
     yhteenvedon "PITKÄ … | ali:" -rivit (merkinnät 4fff097b6:ssa). PT:n kohdat 2 (ulkona/GPU) ja 3 odottavat.
   - NUI:n Nimikerros 2a1a6e0e7 mitattu: ei parannusta (89/183, 93/142 → 101/150, 87/142), EI runkoon; NUI:lle ja PT:lle kerrottu.
   - Karttaseppälle kerrottu ElavaMvt/ElavaPiirto-muutoksista (rajapinta ennallaan; Kohde.Ominaisuudet oma luokka).
3. **VS:n/NUI:n/KS:n merget** sitä mukaa kuin PT kuittaa (tarkista media ämpärissä curl -I:llä, jos TasoVersio/LeikeVersio/SiltaVersio
   tai katalogikuvat vaihtuvat).
4. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle "kaikille",
   rivi PT:lle. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
5. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara
   7280634c4 EI. Pariisin vieritys osa 3 EI NYT (PT). Pariisin piirros tehdään alusta (omistaja 17.42): ÄLÄ optimoi sen laattoja.
6. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf). Pieni iPad: asennettu 17.13 (PT), ei odota nykäyskorjausta.
- **Juna 218 runko = 8d9951aa7** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; 22.33: 0ffb7e562 → GC-korjaus 9be37e4f2 →
  maskivuokra 8d9951aa7, molemmat fast-forward natiiviseppa/gc-mvt-218:sta, työpuu wt/proto-natiiviseppa-gcmvt). Aiemmin tänään a7cdb4478:n jälkeen:
  NUI piirros-nostot-218 c94645ac3 → c4953bfae; NUI pelikuvat-218 ddce40e7c → eb035c8c4; VS kattoalla 32fbecda3 (cherry-pick -x)
  → 0ffb7e562. PT:lle ja tekijöille kerrottu (VS:lle viesti jonossa 17.4x).
- Nykäysvahti 4.24 (koko liike + 1 s, yksikin yli 20 ms = hylkäys) on omistajan sitova sääntö; rajaa ei muuteta.
- Kansiot rungossa ennallaan: rakennukset-v98, tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; piirros
  TasoVersio haamu3-20261102, LeikeVersio leikkeet-20261102, SiltaVersio leikkeet-sillat-20261102.
- Laiteäpit (lokit/natiiviseppa-app-210-runko-<sha>-laite): 0ffb7e562, 9be37e4f2, 8d9951aa7, 2a1a6e0e7, 4fff097b6;
  Development (kutsupinot): runko-b20aee47f-kehitys, runko-f579371ad-kehitys.
- Mittausskriptit proto-3d/tyokalut/natiiviseppa-skriptit/juna218/: saapuminen-matka218.sh (Release), saapuminen-profiili218.sh
  (Development + Profiler-loki, PROFIILI_S=30 riittää: saapuminen ~6 s matkakomennosta), profiili-varaukset218.sh <.raw> <sha9>
  (editori b6-kopiossa käännöslukon alla, ~10 min / 1 Gt).
- Cron Unity-beeta (luotu 2.11. 20.1x tähän sessioon) "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt eikä T7-kopioita. Levy 96 %: .raw-profiilit poistettu analyysin jälkeen; kutsupinot-f579371ad .raw (~2 Gt) poistettavissa.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`
  (commit peiliin ensin; ~17 min). Development: lisää `PROTO_KEHITYS=1` ja nimeksi runko-<sha9>-kehitys.
- Saapumismittaus: `zsh .../juna218/saapuminen-matka218.sh natiiviseppa-saapuminen-matka-<nimi>-<pvm> <sha9>` (~4 min, Iso iPad);
  yhteenveto: `grep -a -h "MATKAKIRJA nykäysvahti" konsoli-*.txt; python3 <työpuu>/tyokalut/nykaysvahti.py konsoli-*.txt`.
- Profiili: `PROFIILI_S=30 zsh .../juna218/saapuminen-profiili218.sh <kansio> <sha9>` → `zsh .../juna218/profiili-varaukset218.sh
  <kansio>/saapuminen-profiili.raw <sha9>`.
- Puhtaus `git merge-tree --write-tree HEAD <sha>`; tarkista rc=1 tai testi punainen → korjaus tekijän haaraan.
- A/B saapuminen: `zsh .../juna218/ab-saapuminen218.sh <nimi> <runko sha9> <korjaus sha9> <korjauksen työpuu>` (testit + käännökset +
  A/B ×2, ~60 min); epäonnistunut ajo (VIKA lähetys peli-komento.txt → vain 1 liike) korvataan `ab-lisapari218.sh <nimi> <A> <B> <n>`.
- Kutsupinoprofiili: `zsh .../juna218/kutsupinot218.sh <sha9>` (Development-käännös + profiili + analyysi, ~45 min).
- Kartta-testit nopeasti: `bash <työpuu>/Kartta-testit/kaanna.sh` (bash, ei zsh; ~1 min).
