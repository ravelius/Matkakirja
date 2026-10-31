# Pelikoodari: luovutus 31.10.2026 klo 22.10 (PT: viikkokäyttö 90 %)

Edellinen: -20261031-2155 (lue sen Kesken-lista; tämä täydentää). Muistin tila: pelikoodari-tila-20261018-aamu.md.
Proto-worktree wt/proto-pelikoodari-reitti-216 (pelikoodari/reitti-216, kärki 693ac624d, ei pushattu: protolla ei originia).

## Valmista tässä vuorossa (reitti-216)
- 24ab63986: portin jälki ennakossa. c4 t 61,3: hetkelliset näytteet −0,1, mutta ennakon tarve oli 10,1. Kameran ja keisarin välinen
  ennakkokohta (dk < 0) oli vielä läpikulussa, ja sen sivunäytteet osuivat portin seinämassaan. Nyt läpikulun katon alla oleva
  ennakkokohta on lattiaa ilman sivunäytteitä (porttiJalki). Kameraväli-lokiin tuli `ennakko H/k s/näyte(k|s+|s-)/dk m`.
- 693ac624d: korkeudellinen liitos avoimet-sijoitus.json:ssa. Pisteet [x, y, z] → koko viiva yhtenä reittinä, ja y on osan profiili.
  Testi AvoimetHuoneetReiteiksi. 782/782 + uusi testi, unity-tarkistus 0.
- Koejuuri _tyo/pelikoodari/reitti-216/lzm/juuri (= juuri-r89 + oma avoimet-sijoitus.json arvioidulla liitoksella):
  MK_VERKKO_KOHTA=-117,171 → verkko kulkee aukosta z ≈ 170–172, profiili 0 → 0,70 → 0, ei rakennusten läpi.
- LOD-erä: koekohtauksen 06 sauma EI ole LOD:n syytä. LAV löysi syyn: kk-ulkorengas-3-2:n lod2-kieleke, ja korjaus on ulkorengas-v10
  (_valmiit/juoksupeli-kk-lavastaja-ulkorengas-v10-vienti-20261031). PT 22.1x: tausta-lod-216 EI junaan 216
  (sauma ei liity LODiin); VS tekee parin 06 ulkorengas-v10:llä. Kuvat _tyo/pelikoodari/tausta-lod-216/pari-06.jpg ja sauma-06-rajaus.jpg.

## Ajossa
- d2 (_tyo/pelikoodari/reitti-216/d2, aja-d2.zsh taustalla, loki aja-d2.log) jonottaa linjalla 2 VS:n ajojen jälkeen.
  Skenaario = c4 + `palatsi mallit file://…/linssiseppa2/juuri-r89/` (v89 v81-nimellä), SHA luetaan lukon saannin hetkellä.
  **Älä committoi reitti-216:een ennen kuin d2 on saanut lukon** (TaustaKansio-vaihto v89:ään rikkoisi juuri-r89-ajon).
  Vertailu: VS:n ajo c2ecc5896 + juuri-r89 (lokit/esikatselu-20261031-220050): tausta ilman vikoja, mutta portin läpikulussa kamera
  katsoo yhä jyrkästi alas ja seinät näkyvät ilman kattoa (_tyo/linssiseppa2/reitti-v89/kooste-v89-0.jpg rivi 4, kooste-v89-35.jpg rivi 5).
  Ajossa oli vielä vanha koodi ilman 24ab63986:ta. Katso, korjaako d2 kohdan; jos ei, se on c5:n este.
  Tarkista: kameraväli t ~57–63 ja ~80–83: tarve ja `ennakko`-kenttä; tavoite kamera ≤ ~4 m portista tultaessa (c4: 8,3 m, kenttä 29°).

## d2 TULOS (valmis 22.18, lokit/esikatselu-20261031-220258, 693ac624d, juuri-r89): EI KUNNOSSA
- Portin jälkeinen nousu jatkuu: t 61,2 tarve 10,1 (tunneli −1,42), kamera 8,6 m t 62,7, kenttä 28–33°. Toinen portti t 75–81 lievempi (5 m).
- Syy lokin uudesta ennakko-kentästä: ennen porttia (t 60,4) ennakko 15,9 m / 2,0 s / näyte k / 10,6 m edessä = reitin oma
  tunnelikohta, jonka H on porttirakennuksen katto. Pito (KulmaPitoS) ja jousi kantavat tarpeen tunnelin yli, ja portin jälkeen
  ennakko on 0, mutta tarve on yhä 10,1. Korjaus 24ab63986 koski vain portin jälkeisiä näytteitä, eikä se riitä.
- Ratkaisu vaatii linjauksen: KK 29.10 "ennakoiva nosto ehtii ennen porttia" (kamera nousee portin yli) vs. tunneli (kamera aukosta
  läpi). Vaihtoehdot: (a) ennakkokohta, jonka KatonAlapinta ≥ PorttiMinAla, on aina lattiaa (kamera seuraa tunneliin); (b) tunnelista
  ulos tultaessa (porttiJalki) vaatiiPidetty/vaatiiLasku nollataan nykytarpeeseen. Suositus (b) + (a) vain, jos KK/PT hyväksyy.

## Kesken / seuraava
1. d2 analyysi. Jos portin jälkeinen nousu on kunnossa, toinen portti (c4 t 57–58: 6,4 m / 30° ennen porttia) tarkistetaan samasta lokista.
2. Pakettien vaihto reitti-216:ssa (d2:n jälkeen): TaustaKansio → kielletty-tausta-v89b (LAV 22.0x: v89 + liitos "longzongmen",
   _valmiit/juoksupeli-kk-lavastaja-tausta-v89b-vienti-20261031, SHA256SUMS ec03c59ef662; v89 ämpärissä JU 22.02, v89b ämpärissä
   JU 22.12) ja UlkorengasKansio v9 → v10 (VS/LAV). Omat koejuuret: ulkorengas v9 → v10 (VS:n juuri-k06c).
3. c5 KK:lle kokonaisena ämpäristä (ei QA-juurta): sk-d2.txt ilman mallit-riviä. Mukana Longzongmenin läpijuoksu (katso, että keisari
   juoksee y 0,70:llä ja kamera kulkee hallin läpi tunnelina; Raamattu 2.177 katto piiloon sisällä, jos ei toteudu → PT:lle).
   Sitten merge-pyyntö NS:lle (pelikoodari/reitti-216).
4. LAV:n tarkat liitospisteet (v89b): (−140,0) (−130,25,0) (−130,2,0,2) (−126,65,0,2) (−126,6,0,45) (−125,5,0,45) (−125,45,0,7)
   (−106,55,0,7) (−106,5,0,45) (−105,45,0,45) (−105,4,0,2) (−103,65,0,2) (−103,6,0) (−96,0), z 171. Aja verkkotesti v89b-juurella.
5. Valo-k1-216: ennallaan (edellisen luovutuksen Kesken 5).
