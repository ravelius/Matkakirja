# Päätoimittajan luovutus 16.10.2026 klo 23.3x (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589 (nollattu 23.22, sai PT:n tilannekoosteen). Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; paikallinen talo/junat.json ajan tasalla 23.27 (scratchpad/asemataulu/data/talo/), taulussa v59+ (Postivahti vie).

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor, get_usage self. Tämä luovutus PR:ssä (haara fable-luovutus-20261016-yo2) → docs-PR, merge suoraan; worktree pois mergen jälkeen.

## 1. UUDET PYSYVÄT LINJAUKSET TÄNÄ ILTANA
- YKSI JUNA (omistaja 22.24 "kerää aina kaikki vain yhteen junaan"): Raamattu C) JUNA + loki (#4734 mergetty b5ea5c2de). 198-jono yhdistetty 197:ään; taululla vain Juna 197. Muisti yksi-juna-kerrallaan.
- JULKAISU 197 PYYDETTY 22.45: "julkaise heti kun nämä valmiina". VALTUUTUS 23.06–23.07: "hyväksy sinä kaikki puolestani ja vie peliin ilman testejä" + "näytä kuitenkin valmistuvat jutut minulle mutta älä jää odottamaan hyväksyntääni" → KK hyväksyy esikatselut omistajan puolesta ja näyttää tiedoksi; lukitus ei odota omistajaa. PT tarkistaa ensin, sitten KK:lle; KK:n ok → NS:lle SHA.

## 2. JUNA 197 (NS runko 4d210f6d6 vihreä; lukitusarvio ~01.45, TF ~02.45)
Julkaisija valmis: lukituslista (uusin-4 → v6k22 Louvre k57, viennit esittely-v2a, manifest-198, Köö v7, historia-v2 ämpärissä), muistiajo ohitettu; odottaa PT:n "LUKITSE 197".
RUNGOSSA/HYVÄKSYTTY: Köö/Ams 93dd78948, museon kertoja -v3 b3885c750, Kiinan dynastiat -nauha 78a2b34a4 (musta esittelytausta = keksintöjen pohja, ei poikkeama), valopohja Louvre 160° b65c86c67 (KK 23.15) + LR v6k22, liikepohja + museon auto zoom/kävely c32cbb200 (KK 23.18). NS:n vahtipoikkeukset (dynastiakartan väri, auringon atsimuutti) PT hyväksyi.
KESKEN (junan Työn alla; "mukaan jos ehtii" -kohdat eivät pidätä):
- NUI (nollattu 22.50, luovutus 6d704c5bb): käännös 99cff2b9a (kehys pois + i-kortti SK #4736 + EB Garamond -kytkin) → kehyskuva + fontti- ja i-korttiparit iPhone + iPad → PT → KK; kehys/museo-nimi f6573d715+ad96e5545 NS:lle kun kuva ok. Sitten leveät teokset iPhonella. 13 tekijää ilman PD-muotokuvaa → tyhjä ympyrä (kerro KK:lle i-korttiparin yhteydessä).
- Karttaseppä: pienoismallit (jatkaa NUI:n vihjeet-198 21a0e6f6f; video Laitetestaajalla/Julkaisijan simuvuorolla) + lasipohja 4 puuttuvaan paneeliin.
- Pelikoodari (KOVA RAJA 36 %, luovutus tulossa): intro-tasainen-197 abc4accff (⊃ liikepohja + intro f596cae43 + Praha + historiaosiot omiin pysähdyksiinsä; PT hyväksyi kohdistuksen, tarkistus: kuningas/Louvre-osio Louvreen jos sellainen on) → intron mittaus + video → PT → KK → NS:lle tämä yksi SHA. Lisäksi museokävely: kamera taulun keskikohdan korkeudelle lähestyessä (omistaja 23.22).
- Linssiseppä: 1) kipin selitteet pois nimien alta (23.18), 2) nopeusvipu leveäksi kaasuvivuksi olemassa olevalla vipupohjalla (23.13/23.17), 3) vapaa lento matalalle (syy: 40 m minimikorkeus + luotain pysäytti 120 m ennen katua, vauhti 30 % < 150 m), 4) kipin kompassi jalustalle + lämmin lamppu (23.14).
- Siirtoseppä: kaikki äänet pois kun mikä tahansa linssi/peli käynnistyy, yhteen paikkaan äänipohjassa (23.06).
- Ei junaan 197: raketin savun jatkot (Valoseppä ei aloittanut), valopohja V1/V2.
LUKITUS: kun pakolliset (NUI museo: kehys, fontti, i-kortti, leveät teokset; pienoismallit; lasipohja 4; liikepohja/intro) ovat rungossa → "LUKITSE 197" Julkaisijalle; TF-rivi KK:lle.

## 3. Louvre
KK hyväksyi k57 @160° (pari proto-3d/_tyo/linssiseppa2/louvre1/lahi-L1-L3/k57s/omistajan-pari-160.jpg). LR jatkaa k58: L2-pihan laatoitusvaihtelu, karyatidit + päätykolmio. OMISTAJA 23.22 "Teemme kyllä Louvren itse." → KK:n kortti: tehdäänkö lasipyramidi itse (Raamattu: Ranskan suojattu arkkitehtuuri ei omina malleina) vai kirkastetaanko Googlen pyramidi valolla; odottaa omistajaa.

## 4. Muut
- Sisältökirjuri: i-kortti 115/115 + 40 muotokuvaa (#4736); kertojakorjaukset #4733 (Äänittäjä uusi 6, LS kytki, Julkaisija vei manifest-198).
- Pelikoodari löysi intron nykimisen syyn: sumennus piirrettiin joka ruudulla kaikkien kerrosten takana (GPU 15–16 ms).
- Levy 40 Gi. Rajoitus 1 käännös + 1 simu poistunut.
- Roolit levossa syystä: Äänittäjä (odottaa äänipohjan tasoja), Linnanrakentaja → k58, Karttaseppä nyt työssä.

## 5. Nollaukset tänä iltana
NUI (22.08 ja 22.50), Natiiviseppä (22.3x), Linssiseppä (22.4x), KK (23.22). Pelikoodari seuraavana (luovutus tulossa).
