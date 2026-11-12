# Pelikoodari: luovutus 12.11.2026 klo 05.08 (konteksti 26 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0100.md (haara pelikoodari-luovutus-20261112-0100). TÄMÄ KORVAA SEN KOKONAAN; edellisen
kohdat 2 (kuvajono) ja 3 (v133c, B1, tarkista.sh) ovat ennallaan → lue ne sieltä (git show origin/pelikoodari-luovutus-20261112-0100:docs/raportit/viesti-pelikoodari-luovutus-20261112-0100.md).

## 1. TYÖN ALLA: KAMERALAITE PALA 2 — (a) + c1 KOODISSA, c2-TAULUKKO KK:LLA, ODOTETAAN KK:N VASTAUSTA
Tehtävänanto: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md
(lue osiot "KK:n päätökset PK:n syyraporttiin" ja "KK:n päätökset Mac-ajon f1c47100d faktoihin"; KK:n vastaus tulee todennäköisesti uutena osiona).
Tulos: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-a-c1-c2.md (LUE KOKONAAN). Lähetetty KK:lle 05.07 (4 kysymystä) ja PT:lle.
- Koodi: natiivi-backup kameralaite/pala-2 @ 219ec4b8d (wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite). Unity-tarkistus 0 virhettä.
  Seurantaohjaaja: U-käännös = odotus + leikkaus (Odottaa, YmpariLeikkauksia, OdotusAskelia), SeurantaAsetus.IkkunaMin (oletus 0 = c1).
  Sovitin: odotusruudut erikseen, leikkauksen syy lokiin.
- Testit: `sh Linssit-testit/kaanna.sh 'Kameralaite|Seuranta'` 39/40 (FAIL T14UKaannos kuja: pelaaja sivulla 28,8° > 21,9°).
  UUSI: `sh Linssit-testit/kameratoisto.sh [nimi]` (Peli/ + Ydin, oma kokoonpano, koska muut Linssit-testit törmäävät Peli/-nimiin):
  T14UKaannosToisto FAIL (|L−P| 1,49 < 1,5 leikkaushetkellä); MITTAUS=c1 C1Mittaus (DIAG=1 otokset), MITTAUS=c2 C2Mittaus (noin 60 s);
  keinoradat MITTAUS=c2 kaanna.sh C2Keinoradat. Tulosteet c1-tuloste.txt, c2-tuloste.txt samassa kansiossa.
  HUOM: älä aja kahta kameratoisto.sh:ta yhtä aikaa (sama rakennus/KameraToisto.dll).
- KK:lta kysytty: (1) tunnistus > 120° kolmen askeleen sisällä (peli kääntää kahdessa 90°:n askeleessa); (2) FAIL 1: Leikkaa(asento, nopeus)
  palaan 1 vai raja 0,5 × vaakakulma; FAIL 2: D := D_min + 0,1 vai ehto |L−P| ≥ D_min − 0,1; (3) c1:n ehto jäljen suhteen (pelaajan jälki 929
  askelta ei-kuljettavalla) + sääntö–kulkukartta-ristiriita omaksi työkseen; (4) c2-valinta (rivit 3–5 rikkovat T5:n; vain rivi 5 antaa noin 4 m).
- Avoimet löydökset: toiston a/j/ω-huiput suuret jo nykyrivillä (85 m/s², 5900 m/s³, 704 °/s; rivi 5: 7227 °/s), syy selvittämättä → selvitä
  (missä ja milloin: odotus, leikkaus vai työntö?). Laite alle 0,3 m seinästä 8 % ajasta (tarkka etäisyys KameraToistoTestit.Tarkka).
- SEURAAVAKSI: KK:n vastaukset koodiin → c2-valinta koodiin (liuku ahtauden mukaan, jos KK niin päättää) → Mac-ajo JU:lle
  (skenaario _tyo/pelikoodari/kameralaite/sk-kameralaite-pala2-siemen.txt, uusi sha). Uusi Mac-ajo vasta KK:n c2-valinnan jälkeen (KK 01.20).
  RINNALLA (ei estä): massamittarin väärä hälytys (KK 01.20 päätös 1): peittoruudun "ala 0,00" lähde S 112–118 ja peittoruutujen vienti
  (kamerapeitto 0 riviä Mac-ajossa: vienti kutsutaan vain, kun peliKamera && KameraMittari lakkaa → kirjoita ruudut myös Kierros-kutsussa).

## 2. ESIKATSELUN MITTAKAAVA (PT 01.00, KK 00.59): ei aloitettu; kameran jälkeen (ks. edellisen luovutuksen lisäys 01.0x, NUI:lta yksityiskohdat).

## 3. TYÖKOPIOT
- /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite (kameralaite/pala-2): käytössä.
- /Users/Shared/Claude/wt/proto-pelikoodari-kuvajono: poista, kun 6e47d988f on junassa.
Ei agentteja käynnissä. Ei uusia lupia.
