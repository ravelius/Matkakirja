# Julkaisija: luovutus 5.11.2026 klo 17.06 (TILINVAIHTO, omistaja 17.05)

Rooli: Julkaisija (JU). Korvaa -1502:n ALOITA-osan; sen OPIT ja -1245:n sekä -1130:n VIRHEET ja OPIT ovat voimassa. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt (lue 30 viimeistä riviä).

## ALOITA TÄSTÄ
1. Jono on tyhjä. Tarkista ps (`esikatselu.sh`) ja hoida kaksi ajossa ollutta:
   - L1, JU:n oma: LAV lattia13, `zsh /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe/aja13.zsh` (980bb115c, kaksi ajoa, koe ja verrokki, 26 + 26 kuvaa). Kuvat lattiakoe/kuvat13-koe ja kuvat13-verrokki. Valmis, kun kummassakin on 26 kuvaa: rivi LATTIA13 AJETTU + polut LAV:lle. Jos tilinvaihto katkaisi sen, aja sama rivi uudelleen; skripti kiinnittää PROTO_LINJA=1.
   - L2, PK:n oma: 4c4cf9d8d, kaksi ajoa (8 + 5 min), aloitettu 17.05. PK ilmoittaa itse. Jos katkesi, PK pyytää tai anna uusi ESIKATSELU NYT L2.
2. Tilinvaihdon jälkeen session id:t osoitekirjasta, älä tämän tiedoston muistista.
3. Odota PT:n sanaa ennen uusia käännöksiä (PT 17.05: "Älä aloita uutta käännöstä").

## SITOVAT LINJAT
- OMISTAJA 16.41 + PT:n oikaisu: "keskitytään vain pariisin 3d rakennuksiin". Mac vuorottelee juoksupeliä (PK, LAV) ja Pariisin 3D-rakennuksia (KS, NUI: Eiffel ja sarjan seitsemän, sitten niiden kyltit). Muut Pariisin ajot (NS, VS) vain, kun näitä ei odota. Korvaa 13.24:n "Pariisi kärkeen".
- OMISTAJA 16.41 (VS:n välittämä): VS:n metsä-, laikku- ja saumakokeet loppu, ei lukitusajoa; VS:n uudet ajot vain PT:n käskyllä.
- OMISTAJA 14.44: pieni iPad 00008142 vain erässä (kallistus NS, uudet 3D KS, kyltit ja horisontin nimet NUI) ja vain PT:n tai KK:n sanalla. KS on kahdesti maininnut asennuksen 2.214:n mukaan; roolin rivi ei riitä. T/pieni-nahtavyydet.zsh <sha>.
- MUISTUTUS pienen iPadin erään (NUI, PT): KaytettyRaja() ja || Kiertaa palautetaan, kun lento-haara yhdistyy (be9b73bc7).
- Yhä voimassa -1502:sta: 2.209 ei iPad-ajoja eikä mittauksia Pariisille ja juoksupelille; 4.42 ei lippua Pariisin haaraan.

## TEHTY 15.04–17.06 (polut T/jonolokissa)
- NS: matka2 f446775c8, notredame85 a88c8f846, saapuminen 461a0241e, intro 9bb4e3476, porras 5282b9fc4, intro-varitaso 52e3d2940, liiku 99748962f, matka ja intro 379991bd6. bd0e8e50e pysäytetty NS:n pyynnöstä.
- KS: 8d0cf457e, e88559857, b4cf1f86d, b09c05441 (yhteis), 59fde3622, 5263cacb5 (yhteis), Eiffel f8b35f66d, Eiffel-lähi f8b35f66d, Eiffel-kyltti 9e8c8ab1e.
- NUI: 1c5c26667, omat be9b73bc7, d2d97e163, e88559857, b4cf1f86d. aja4 d5850ff4e.
- VS: portaat5 f028eb320, portaat6 f998e0726 (8abcf1931 ei kääntynyt), alpit caa2c0918 ja c430bcd40, portaat7 c430bcd40.
- LAV: yhd3 lisä, yhd3 pk, lattiakoe. PK: 4c4d6f297, c97861a9a, f57b79db0, dcad62532.

## VIRHEET, JOTKA EIVÄT SAA TOISTUA
- Nollaus katkaisi NS matka2:n 14.57: JU:n omat ajot kuolevat session mukana, kun ne on käynnistetty taustatyönä. Älä nollaa oman ajon aikana; tarkista loki ja ps heti aloituksessa.

## OPIT
- Kaksi roolia samalla skenaariolla (KS ja NUI, sk-pariisi-kyltit.txt) vaihtoi kärkeä kymmenkunta kertaa ja kärjet erkanivat. Tarkista aina: `git merge-base --is-ancestor`. Nimeä yksi kirjoittaja ja yksi sha; vuoron alettua sha ei vaihdu.
- Sha ei ole Matkakirjan repossa vaan protossa: git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto-esikatselu-2, tarvittaessa fetch natiivi-backup <haara> (NS ja NUI: peili/proto/<rooli>/<haara>).
- Käännös kaatuu minuutissa, jos rooli ei ole ajanut tarkista.sh:ta (f3f259ad4, 8abcf1931). Pyydä se ennen vuoroa (Raamattu 10.4).
- PK:n ajossa ps kertoo tilanteen ennen valmis-riviä: anna linja seuraavalle, kun prosessia ei ole.
- Rooli voi ajaa muun sha:n kuin pyysi (PK dcad62532): katso ps.
- LAV:n skriptit kiinnittävät linjan 1: käynnistä ne vain L1:llä. Lue vieras skripti ennen ajoa.
- Omistajan odottama ajo menee kärkeen (10.5), ja juoksupeli saa silti vuoronsa (PT); kirjaa jokainen muutos jonolokiin.
