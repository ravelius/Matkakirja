# Pelikoodari: luovutus 10.11.2026 klo 19.25 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-pelikoodari-luovutus-20261110-1828.md (LISÄYS 18.5x:n osan 8 kuvapari ja 18.4x:n palkkikysymys yhä voimassa).
Natiivityöpuu: /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, NYT haarassa pelikoodari/osa11-opasteet (remote natiivi-backup).

## 0. TEHTY TÄLLÄ VUOROLLA (kaikki pushattu natiivi-backupiin, PT:lle ilmoitettu)
- OSA 6 pienet logiikkaviat 4df0ce2a3 (pelikoodari/osa6-logiikkaviat, osien 1–3 e59ed43e9 päälle), 898/898, unity 0.
  KK:n tarkastus (Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-juoksupeli-tarkastus-logiikka.md luku 5):
  2 ulkoesineet latauskuvan alla (JuoksuV4Maailma: yield EsineetPeliin) · 4 V4Osa.KaistaAuki/Kaistalle/AukiJollain/AvoinKaista: aukot
  kaistoittain, seinän edessä keisari siirtyy aukon kaistalle (KaistaAukolle, tapahtuma "kaista aukolle") · 5 heitto ei odottavaan eunukkiin
  loputtomassa reitissä (Heitettava) · 6 HeitaTaakse vain AjajaHeitettavissa (≥ 1 m kirinyt) · 7 KarttaJatka jatkaa kesken jääneen liu'un
  · 9 SamallaKadulla keruussa. Kohdat 1 ja 3 = osat 1–3; kohta 8 = osa 10.
- OSA 10 TasoAika 93a4f77f2 (pelikoodari/osa10-tasoaika, NUI:n fb3f19f31 päälle), 894/894, unity 0. TasoAika kasvaa vain !Pidetty && !Esittelyssa,
  tason ehto ja V4Kierros.TasoOsuus TasoAikasta, IJuoksuKierros.TasoOsuus (Ruudukko NaN). Sha NUI:lle annettu (JuoksupeliNakyma:1981 heidän).
- OSA 11 opastetekstit 92e50fb68 (pelikoodari/osa11-opasteet, osan 6 päälle), 899/899, unity 0. JuoksuOpetus: uudet Lahto, Omena, HeittoTaakse,
  Voimat, Seina, HyppyOmena (enumin loppuun); Kaista-teksti, KiinniTeksti (V4Kierros.Kehote); liuku ei tasolla 1; tieto-ohjeet (lähtö, voimat)
  ilman peukaloa/hidastusta 4 s, alin etusija, toimintaohje keskeyttää. JuoksupeliNakyma (pieni): opetus.Avaus = AvausKaynnissa, HyppyOmena →
  ylös-osoitin, tieto-ohje ohjekaistan pohjalle → KERRO NUI:lle (tiedosto heidän alueellaan), jos PT ei jo kertonut.

## 1. SEURAAVAKSI
1. Osan 11 valmis-rivi PT:lle (jos ei lähtenyt): 92e50fb68. Näyttö: iPad-video tasolta 1 (lähtö, omena, kulma, heitto) JU:n vuorolla PT → KK, kun PT sanoo.
2. HAAROJEN JÄRJESTYS JUNAAN: osat 1–3 e59ed43e9 → osa 6 4df0ce2a3 → osa 11 92e50fb68 (ketju); osa 8 3eb33531c ja osa 10 93a4f77f2 erillisiä
   (5f8780605/fb3f19f31-pohjalla). Osa 10 ja osa 6 koskevat JuoksuV4.cs:ää eri kohdista; osa 11 ei sisällä osan 10 TasoAikaa.
3. OSA 8 KUVAPARI: lokit/pk-osa8-ovet-mac-3eb33531c-2 yhä TYHJÄ 19.23 (JU). Kun kuvat tulevat: k1/k2 vs a1/a2 täysikoossa, "ovet: mallit valmis …
   kiinni K", pari + rajaluku 0/663 PT:lle. Jos timeout taas → kuitujonoon (KK:n sana).
4. Renkaiden uusinta v2-sk:lla JU:lla (1745 kohta 2) ja 18.4x:n palkkikysymys (NUI:n t-3-loppu.png, vaalea palkki kujan lattialla) → rivi PT:lle.
5. Jonossa ei muuta PT:n järjestyksestä; tyhjänä "JONO TYHJÄ: Pelikoodari" PT:lle.

## LISÄYS 19.3x (luovutuksen jälkeen; tämä on viimeisin)
- OSA 11 kärki nyt aae0ab729: lähtölause ("Pakene vartijoita…") vain NUI:n tavoitepalkissa (308cd1d16, MR29 → 224.39), ei kehotekaistalla
  (JuoksuOhje.Lahto poistettu; tieto-ohjeena vain Voimat). NUI ja PT kuittaavat. NUI yhdisti osan 10 (93a4f77f2) → 308cd1d16.
- OSA 6 iPad-bottiajo JU:lla (uudelleenkäynnistyksen jälkeen; iPad TAUKO, error 22): skenaario proto-3d/_tyo/pelikoodari/osa6/
  sk-ipad-osa6-logiikkaviat.txt (md5 7c07989e266a) → lokit/pk-osa6-4df0ce2a3-ipad. Katso o1–o4 ja lokista "ulkoesineet peliin, N kpl"
  ennen 1. juoksua → rivi PT:lle.
- OSA 8 ovet-2 Mac-ajo JU:lla käynnissä 19.17 (ipad-koko, raja 40 min) → lokit/pk-osa8-ovet-mac-3eb33531c-2 (kohta 1.3).
- 19.4x: JU:lle KÄRKI aae0ab729 (ei 92e50fb68). Osan 11 sk proto-3d/_tyo/pelikoodari/osa11/sk-ipad-osa11-opasteet.txt (md5 a4fb9faa2d77, kuvat p1–p23)
  → lokit/pk-osa11-aae0ab729-ipad; osan 6 sk samalla käännöksellä → lokit/pk-osa6-aae0ab729-ipad. Iso iPad heti uudelleenkäynnistyksen jälkeen.
  Katso kuvat (ohjeteksti + peukalon syke, lähtölause vain palkissa) ja lokin "opetus X → Y" -rivit → rivi PT:lle.
- 19.3x: OSA 8 ovet-2 EI KELPAA (katsottu: kaikki 4 kuvaa sama latauskuva, Request timeout) → kuitujonossa JU:lla (ovet-3, KK:n sana valokuidusta).
  PT:lle kerrottu. Kun ovet-3 tulee: k1/k2 vs a1/a2 täysikoossa, "kiinni K" lokista, pari + rajaluku 0/663 PT:lle.

## LISÄYS 20.1x (uusin)
- OMISTAJAN PÄÄTÖS 20.23 (PT 20.5x): osat 6, 11 ja 8 linkkiin Mac-tarkistuksella ILMAN ison iPadin ajoa (iPad-sk:t osa6/osa11 pois jonosta).
  JU:lle pyydetty: aae0ab729 Mac, sk proto-3d/_tyo/pelikoodari/osa11/sk-mac-osa6-11-aae0ab729.txt (md5 42acce9ae3fe, kuvat p1–p23)
  → lokit/pk-osa6-11-mac-aae0ab729; osa 8 ovet-3 3eb33531c (osa8-ovet/sk-mac-ovet-kiinni-auki.txt). Kun kuvat tulevat: katso, rivi PT:lle → pt-ok.
  "kokeiltava"-rivi PT:lle lähetetty 20.1x.
- ESTE: Macin v4-lataus jumissa 18.4x alkaen (ovet-2: 58 × Request timeout leivottu-v3:sta; klo 16.38 ajossa 0; curl puyi.glb 9 Mt 19 s).
- Palkkikysymys (18.4x) VASTATTU PT:lle: palatsimallin rakennusjalustan reunakivi, ei koodin kappale; kuvat proto-3d/_tyo/pelikoodari/palkki-t3/.
- Renkaiden uusinta pyydetty JU:lta 224.37-linkillä 191aaeaf2 → lokit/pk-renkaat-191aaeaf2-ipad (iPad; odottaa isoa iPadia).
- Linkit: 224.37 = 191aaeaf2 (osa 9), 224.38 = 271e46fd9 (osat 1–3).

## LISÄYS 20.4x (uusin)
- Mac-latausjumin syy: esikatselu.sh:65 TMPDIR=/tmp/mke.* joka ajolle → juoksupelin välimuisti kylmä, 1,2 Gt verkosta. Vahti
  proto-3d/_tyo/pelikoodari/mac-valimuisti/esitayta-valimuisti.sh <sha…> kloonaa peilin juoksu-ipad-peili-v3/juoksupeli-mallit ajon TMPDIR:iin
  (vain annetut sha:t). Pysyvä korjaus ehdotettu PT:lle (NS/JU:n alue).
- OSAT 6+11 aae0ab729 Mac katsottu (p6/p7/p19) → PT 224.41.pt-ok, MR31 JU:lla. Ulkoesineet eivät näy Macilla (StreamingAssets vain käännöksessä).
- OSA 8 ovet-3 3eb33531c Mac katsottu (kiinni 245 → 0), pari proto-3d/_tyo/pelikoodari/osa8-ovet/pari-ovet-3/ PT:lle + rajaluku 0/663 → odottaa pt-ok.
- Jäljellä: renkaiden uusinta (iPad, 191aaeaf2) isolla iPadilla, kun se toimii (omistaja: huomenna).

## LISÄYS 20.5x: NOLLAUS (tämä on viimeisin; aloita tästä)
- Osa 8 ovet: PT 224.42.pt-ok 20.42 (JU). Osat 6+11: 224.41.pt-ok (MR31 JU). KK:n jarjestys.md:n JONO (PK) "8 → 6 → 11" on siis TEHTY.
- SEURAAVAKSI: OSA 5 AUKIOT kokeena (KK:n suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/
  20261110-juoksupeli-linjat-ja-tarkastus.md, kohta 5 ja omistajan kortti 17.04 "Kokeena linjojen jälkeen"): aukiolla useampi kaista;
  napautus = yksi kaista kohti lähintä omenaa (~30 m), muuten yksi kaista kohti aukion keskikaistaa (napautus liikuttaa aina);
  eunukit, ulkoesineet ja testibotti useammalle kaistalle. Kumoaa aukioilla 21.10.:n "vain kaksi kaistaa" (JuoksuV4.cs:57).
  Pohja: 224.41/224.42-ketjun kärki natiivi-backupista (osat 1–3, 6, 9, 10, 11 ja 8). Näyttö: oma video aukiolta (iso iPad huomenna;
  sitä ennen Mac-pari + esitäyttövahti mac-valimuisti/esitayta-valimuisti.sh <sha>).
- Jonossa myös (KK): peukalorenkaat suuremmiksi; renkaiden uusinta isolla iPadilla (191aaeaf2).
- 20.5x JU: esitäyttö nyt pysyvä kaikissa JU:n Mac-ajoissa (julkaisija-tyokalut/esikatselu-rungolla.zsh; ESIKATSELU_KYLMA=1 ohittaa) → oma vahti tarpeeton.

## LISÄYS 20.5x (toinen): OSA 5 AUKIOT (uusin; aloita tästä)
- OSA 5 kokeena b744c680b (natiivi-backup pelikoodari/osa5-aukiot; pohja juna-224 3c214599d + osat 6/11 aae0ab729 + osa 8 3eb33531c,
  JU ei ollut vielä yhdistänyt MR31/osa 8 junaan), 911/911, unity 0. Aukiolla (yli AukioM 8 m) enintään 5 kaistaa samasta 1,6 m:n ruudukosta
  (JuoksuV4Reitti.AukioLinjat, V4Osa.KaistaMaara/Aukio); napautus JuoksuV4Saanto.AukioKohde: kaista kerrallaan kohti lähintä omenaa (30 m),
  muuten kohti keskikaistaa, liikuttaa aina; vaihdon aikana napautus jonoon. Sivuvartija kattaa oman puolen puolikkaan (OmaPuoli), esine
  lähimmälle kaistalle, botti napauttaa aukiolla, opetuksen omenaohje N kaistalle. QA `ui juoksupeli aukio 0|1` (JuoksupeliNakyma, NUI:lle kerrottu).
  Uudet testit Peli-testit/Testit/JuoksuAukioTestit.cs. Oikealla kartalla botti: omena 119 → 87 m välein, läpi 12/12.
- Yhdistetyllä pohjalla ilman osaa 5 LinjatOikeallaKartalla punainen (ajelehti 1/9); osan 5 jälkeen vihreä (PT:lle kerrottu).
- Mac-pari JU:lla: proto-3d/_tyo/pelikoodari/osa5-aukiot/sk-mac-osa5-aukio.txt (dac74b23a24d) → lokit/pk-osa5-aukio-mac-b744c680b ja
  -pois.txt (78254e71594f) → ...-pois. Lähtö lahto -97,363.2 l (osan 9 piha). Katso k1–k9 vs e1–e9 täysikoossa + lokin "aukio kaista N omena|keski"
  → pari PT:lle. Sen jälkeen iso iPad -video aukiolta (huomenna).
- Jonossa yhä (KK): peukalorenkaat suuremmiksi; renkaiden uusinta isolla iPadilla (191aaeaf2).
