# Pelikoodari: luovutus 09.11.2026 klo 07.46

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Edellinen: `git show 8eb0c3990:docs/raportit/viesti-pelikoodari-luovutus-20261109-0201.md` (kohdat 2 ja 3 ennallaan).
Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/juoksu-223 (natiivi-backup), kärki 281093d9c.

## 1. d2 ovikuva (KK 9.11. 01.5x, "ovi ja eunukin kasvot kuvassa ≥ 1,2 s kaikilla koilla") – KESKEN, JU-ajo käynnissä
- 451519f87 Mac-kuvat (JU ketju V, lokit/pk-d2-ovikuva-<koko>-451519f87): iPhone vaaka ja iPad vaaka KELPAAVAT (kasvot + keisari d2a–d2c);
  iPhone pysty EI (eunukki ei kuvaan, keisari vasemmasta reunasta ulos). PT:lle kerrottu 07.2x.
- 4c1d100a2: ovikuvassa nopea katsejousi (JuoksuAvaus.OviKatseJousiS 0,1 s / 240°/s), kenttä jousen jälkeisestä katseesta
  (JuoksuAvaus.KatseenKentta), keisari aina kuvassa (RajaaKuvaan oviMax-kentällä), malli kasvot lehden kärjessä (KurkistusKasvotArvio,
  kummankin sivun heikompi, OviVaraAste 2°): malli iPhone pysty 1,36 s. Lokiin rivit "ovikuva tarve …", "ovikuva t …", "ovikuva kasvot …".
- JUURISYY Mac-ajossa: batch-ruutu 640×480 → juoksukameran Kamera.aspect 1,33 myös pystykuvassa (loki "puolikkaat 25.2°/19.4°", max 60°),
  pystykuva rajattiin 4:3:sta → tarve 0. Korjaus 281093d9c: `ui juoksupeli kuvasuhde laite` (JuoksuV4Maailma.KuvasuhdeLaite, testiruudun
  kuvasuhde). Rivi lisätty sk:hon proto-3d/_tyo/pelikoodari/juoksu-223/sk-d2-ovikuva.txt (siksi 4c1d100a2 vaaka/iPad 0/5 – ei vika).
- Mittaus 4c1d100a2: kasvot oven pisteestä kujalle −0,13…0,23 m, sivu ~0,8 m (malli 1,0/±0,6 → voi tarkentaa: ulos ~0,1, sivu 0,8).
- JU ketju AD (pid 73792) ajaa 281093d9c: iphone, iphone-vaaka, ipad → lokit/pk-d2-ovikuva-<koko>-281093d9c.
  TEE: katso d2a–d2c + video (kasvot ja keisari kuvassa, ei hyppyä kentässä; grep "ovikuva" unity.log: tarve > 0 pystyssä, puolikkaat ~9°/19°).
  Kelpaa kaikissa → kuvat KK:lle (local_37f7c945-e1a0-4638-90b8-93c389a36fbe, edellinen PK raportoi KK:lle suoraan) + 3 riviä PT:lle;
  KK hyväksyy → junaan 223 PT:n kautta. Ei kelpaa → lokin ovikuva-riveistä syy (tarve/kenttä/keisari rajattu).
- Muista: ÄLÄ muuta sk-tiedostoa JU:n ketjun aikana.

## LISÄYS 08.1x (korvaa kohdan 1 "TEE")
- JU ketju AD 281093d9c VALMIS: iPhone pysty, iPhone vaaka ja iPad – kasvot + keisari d2a–d2c kaikissa, PUUTE 0; video katsottu (pysty: eunukki
  ja keisari kuvassa koko kurkistuksen, kenttä 74,9° vakio pystyssä). Kuvat KK:lle ja 3 riviä PT:lle 08.1x.
- ODOTTAA: KK:n hyväksyntä → PT vie junaan 223 (451519f87 + 4c1d100a2 + 281093d9c, haara pelikoodari/juoksu-223). Hylkäys → KK:n syyn mukaan.
- Huom: laitteella kuvasuhde on oikea ilman komentoa; Mac-ajoissa juoksupelille aina `ui juoksupeli kuvasuhde laite` (muistiin kirjattu).

## LISÄYS 08.2x
- KK 08.15: d2 (281093d9c) HYVÄKSYTTY junaan 223, KK välitti PT:lle. Ei PK:n toimia ennen PT:n junaviestiä.
- KK:n havainto: iPhone pystyssä taivaalla leijuva kattotiilikaistale (d2a–d2c oikea yläkulma). Sama jo 451519f87:ssä ja vaaka/iPad c-ovi-yläreunassa
  → ei d2:n vika. Arvio: kaukaisen hallin harja/räystäspala, runko karsittu (lähi/kaukomalli tai seinähäivytys). PT:lle 08.2x; odottaa PT:n
  päätöstä tekijästä. Jos PK: Mac-ajo, jossa kappaleen nimi lokiin (esim. säde kuvan pisteestä), sk-d2-ovikuva.txt pohjaksi (kuvasuhde laite).

## LISÄYS 08.3x – ENSIMMÄINEN TYÖ NOLLAUKSEN JÄLKEEN (PT 08.3x): kattokaistaleen tunnistus (estää TF:n, ei junaa)
- PT:n kuva: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/juoksupeli-d2-ovikuva-281093d9c/iphone-d2b-leijuva-kattokaistale.jpg;
  tallenteen ruudut ~1395–1460 (lokit/pk-d2-ovikuva-iphone-281093d9c/juoksu/), rajaus d2a 500–1206 × 300–1100.
- Työkalu valmiina: `ui juoksupeli mika x y` (0–1, y ylhäältä; JuoksuV4Maailma.Mika = Renderer-osumat kuvan pisteessä). Kaistale d2a:ssa
  ~x 0,75–1,0, y ≈ 0,25 (pikseli ~904–1206, 646 / 1206×2622); d2c:ssä ylempänä (y ~0,05–0,1). Tee sk sk-d2-ovikuva.txt:n pohjalta
  (kuvasuhde laite): kuvien d2a–d2c jälkeen heti "ui juoksupeli mika 0.85 0.25" + muutama piste kaistaleen varrelta → JU:lle ajo.
- Päätös PT:ltä: malli/LOD → PT antaa Lavastajalle; karsinta/häivytys (JuoksuSokkeloMaailma, JUOKSU_SEINA, lähimallit) → PK korjaa itse.
  Syy PT:lle rivinä.

## LISÄYS 08.4x – UUSI ENSIMMÄINEN TYÖ (korvaa järjestyksen; kattokaistale rinnalla tai ensin, jos nopeampi)
OMISTAJAN PÄÄTÖS 08.32 (PT välitti sanatarkasti): "Se aiempi versio, missä keisari lähti juoksemaan kohti kameraa, eli kääntyi vasemmalle
sen jälkeen, kun tuli ulos ovesta, oli minun mielestä jouhevampi suunta, koska silloin kamera näkee vielä eunukin ja keisari juoksee kohti
kameraa ja kamera voi sen jälkeen kääntyä keisarin perään, jonka jälkeen tulee numerot 3, 2, 1 ja ohjaus siirtyy sitten pelaajalle."
PT:n tehtävä: palauta TF 223:n suunta ja järjestys: ovesta → käännös vasemmalle → juoksee kohti kameraa, eunukki näkyy ovella → kamera
keisarin taakse → 3-2-1 → ohjaus pelaajalle. d2:n kurkistus (omistaja 08.30 "Kelpaa") ja 1g sivuseinä SÄILYVÄT. 1f ac4bff77a ja d2 EIVÄT mene
junaan 223 (JU palauttaa junan). Tee korjaus JUNAN KÄRJEN päälle (tarkista kärki JU:lta / asemataulusta, ei juoksu-223 281093d9c suoraan).
Mac-kuvat ensin PT:lle, sitten KK:lle.
- Lähtökohdat: TF 223:n versio = ennen ac4bff77a (1f "heti ovelta" ja Raamattu 2.177 #6505 "ei 3-2-1" kumoutuvat tältä osin → PT päivittää Raamatun).
  d2-kurkistus: 0cc5ac36c (KurkistusOvestaM 1,0) + 451519f87/4c1d100a2/281093d9c ovikuva; tarkista, sopiiko "kohti kameraa" -suuntaan (kamera näkee
  oven ilmankin → ovikuvasääntö tarve 0 voi riittää). 1g: a7004996e. Mac-ajoissa aina `ui juoksupeli kuvasuhde laite` (281093d9c, poimi mukaan).
