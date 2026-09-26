# Erikoismalli: Brandenburgin portti (speksi, pohja docs/raportit/erikoismalli-speksi-pohja.md)

## 0. ELÄMÄNIDEA
- Brandenburgin portti on Berliinin tunnus: kvadriga katsoo kaupunkiin päin, ja Pariser Platzilla odottavat
  turistien hevosvaunut. Uudenvuoden ilotulitus portin yllä on Berliinin suurin juhla. Yöllä portti valaistaan.
- **Perusliike:** hevosvaunut odottavat aukiolla (20–60 s), ajavat keskiaukon läpi portin toiselle puolelle (12 s),
  kääntyvät ja ajavat takaisin.
- **Harvinainen (noin 1/10 matkoista):** uudenvuoden ilotulitus. Kolme kultaista rakettia puhkeaa portin yllä
  porrastettuina, kolme kierrosta (noin 10 s).
- **Reaktio:** lähestyttäessä odottavat vaunut lähtevät. Napautus käynnistää ilotulituksen heti.
- **Yöllä:** kulkuaukot hehkuvat lämpiminä, ja palkiston alla on valonauha.

## 1. Tunniste ja paikka
- `kohde:brandenburgin-portti`, avain `brandenburgin-portti`. Saksa (Berliini), 52,5163 N, 13,3777 E, taso 1
  (historia). Nosto ei ole pääkartalla, joten malli piirretään Berliinin maamerkkinä: Kaupunki = "berliini"
  (Colosseumin kaava).

## 2. Viitekuvat (Commons)
- Ilmasta: File:Bundesarchiv Bild 146-1998-010-21, Berlin, Pariser Platz, Luftaufnahme.jpg (CC BY-SA 3.0 DE,
  Klinke & Co., 1931).
- Edestä: File:Berlin, Brandenburger Tor 2012 01.jpg (CC BY-SA 4.0, Dk0704).
- Pohjapiirros: File:1820-Grundriss-Brandenburger-Tor.jpg (PD, E. v. Siefart 1912).

## 3. Siluetti ja tunnusmerkit
1. Kaksi kuuden doorilaisen pylvään riviä ja viisi kulkuaukkoa, joista keskimmäinen on levein.
2. Raskas palkisto ja porrastettu attika, jonka päällä on tumma kvadriga (neljä hevosta ja Victoria sauvoineen).
3. Sivuilla on matalat vartiohuoneet pylväikköineen.
- Pois jätetään pylväiden uurteet, reliefit ja Pariser Platzin talot.

## 4. Mitat ja koko
- Leveys 65,5 m, syvyys 11 m, korkeus 26 m kvadrigan kanssa.
- Yksikkö: 1,0 = 70 m, pystyliioittelu 1,25.
- **Suunta tyylitelty:** todellisuudessa julkisivu ja kvadriga ovat itään (Pariser Platz). Kallistettu kamera katsoo
  kuitenkin etelästä, joten julkisivu on käännetty etelään. Muuten portti näkyisi kallistettuna päädystä.
- Koko 60 pt (KokoKerroin 1,5).

## 5. Paletti ja aksentti
- Hiekkakivi vaalea paperi, väliseinät seepia, kulkuaukot varjossa ja kvadriga tumma pronssi. Luonnossa kvadriga on
  vihreä patina, mutta lajin paletissa se on tumma, jotta siluetti erottuu vaaleasta portista.
- Aksenttina kultainen ilotulitus, joka näkyy vain tapahtumassa.

## 6. Animaatio
- **Vaunut:** liuku etelä–pohjoinen-akselilla ±0,36 (pehmeä), kääntyminen 180° 1,5 s:ssa.
- **Ilotulitus (osat ilotulitus0–2):** puhkeaa 0,8 s:ssa (skaala 0 → 1), kipinät valuvat alas ja hiipuvat 1,7 s:ssa.
  Porrastus on 1,2 s ja kierroksen väli 3,6 s.
- Levossa piirretään 0 kehystä.

## 7. Kolmiot ja LOD
- Runko 874 (12 pylvästä, 6 väliseinää, palkisto, attika, kvadriga ja vartiohuoneet). Vaunut 40, ilotulitus 3 × 72
  ja valot 24. Yhteensä 1 154.

## 8. Ääriviiva ja perspektiivi
- Portti, kvadriga ja kumpikin vartiohuone ovat omia ääriviivaosiaan. Kulkuaukkojen varjot ovat sisäviivoja
  kärkiväreinä.

## 9. Hyväksyminen
- Kuvat: ylhäältä (attika, kvadriga ja vartiohuoneet), 30°:n kallistus (pylväät ja kvadriga) ja reuna. Video 12 s
  ilotulituksesta.
