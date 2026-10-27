# Pelikoodari: luovutus 27.10.2026 klo 14.56

Konteksti noin 35 %. Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN).

## Haara ja tila
- Proto-haara `pelikoodari/juoksu-taso1-212` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211), pää ed8cfaf46, ei junassa.
- tarkista.sh: 0 virhettä. Palauta sen jälkeen gitistä Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json.
- Edellinen luovutus: f06d1cc73 (-20261027-1351).

## Tehty
- **pc-3** (KK: kaarto lähikuvasta keisarin taakse ilman lattiaa)
  - Kaartoloki näytti syyn: lähikuvan lopussa kamera oli jo 117°:n päässä keisarin takana, joten paluu kasvoista keisariin kääntyi 160° lattian kautta.
  - Korjaus: tasolla 1 koko kaari (kulma, säde, korkeus) etenee k³:lla (JuoksuAvaus.KaariKulmaPotenssi).
  - PorttiKaartoS 4,2 → 4,8, eli ohjaus pelaajalle +0,6 s. KurkistusUlosS 1,4 → 1,0.
  - Kääntö kasvoista keisariin lasketaan suuntima- ja kallistuskulmina (JuoksuV4Maailma), ei pisteiden Lerpinä.
  - Keisari on kuvassa koko kaarron ajan (enintään 34° keskeltä).
  - Kokeiltu ja hylätty: nyökkäysraja −18° pudotti keisarin alareunaan.
  - Kuvat: _tyo/pelikoodari/juoksu-alku-opetus-20261027/kuvat-taso1-peekcall-v5/ (KK:lle). Odottaa KK:n arviota. Kaaren sivulla 2 m:stä kuvassa on yhä seinää ja lattiaa.
- **LOD1 instansseina** (Codex b72c20705, LR)
  - InstSarja.lod1 lukee mallin vierestä tiedoston `<malli>-lod1.glb` (puuttuessa vain LOD0).
  - Vaihto palakohtaisesti MuurikateLod1M = 25 m. QA `palatsi lod1 <m>` (9999 = vain LOD0).
  - Loki: "LOD1 C3 1/1, C2 3/3".
  - Taso 1:n alussa lähiruuduissa 170 palaa, joista 168 LOD1:llä. Kuvaero LOD0:aan on huomaamaton.
  - LR vaihtoi 1057:n -lod1.glb:n v2:ksi (bad11e63).
  - Koejuuren kielletty-muurikate-v18 on OMA kansio, jossa on linkit LR:n tiedostoihin.
- **C2 "ei lähelle"** ratkesi: C2 toimii (lähellä 135 palaa / LOD1 135). Editori 06:n paikka oli väärässä kehyksessä.
  - C2:n neljä ruutua ovat juuren kehyksessä x 64…134, z −394…−323.
- **Sivulta kiinniotto** (Codex f97bebb26)
  - JuoksuHahmot.PariSivu* ja SivuKiertoUnity −90 (+90 käänsi ottajan selin).
  - Lähestyminen sopimuksen käyrällä. Kamera edestä 30° ottajan puolelle.
  - QA `kiinni sivu`, koejuuri hahmot-v6-koe. Kuvat: _tyo/pelikoodari/kiinniotto-sivulta-20261027/.
- **Rimpuilu takaa-pidossa** (Codex 84d3ea888, PT 14.1x)
  - JuoksuV4Maailma.Rimpuilu: ensimmäinen napautus vaihtaa rimpuiluun heti, muut vaihdot silmukan rajalla (satunnainen 1–4).
  - Uupuessa struggle_give_up, loppuasento pidetään.
  - Irti päästessä struggle_free 0,6 s: säännössä uusi JuoksuV4Saanto.IrtiKerroin (0,18 s paikallaan, tasainen kiihdytys 0,42 s). Ottaja pysyy pitopaikalla.
  - Koejuuri hahmot-v7-koe (kumulatiivinen: takaa, edestä, sivu, peek_call, rimpuilu). Kuvat: _tyo/pelikoodari/rimpuilu-takaa-20261027/.
- Codex-kuittaus 81be79422 (claude/postilaatikko). Viesti KK:lle (3 erää) ja PT:lle lähetetty.
- **GPU-mittaus**
  - JU asensi 8af5b36a1:n isoon iPadiin: iPad Pro 13, UDID 00008103-001819421413401E. Huom: lyhyt "00008103…" ei riitä devicectl:lle.
  - Kevyt juuri on kopioitu laitteen Documents/juuri-v77m-kevyt-kansioon (392 glb).
  - LT on ohjeistettu A/B-ajoon: `palatsi c3-lahi 0` vs 60. Jos LT on levossa, mittaus odottaa PT:n vahvistusta.

## Odottaa / seuraavaksi
1. KK:n arvio: pc-3, sivuote ja rimpuilu. Jos KK haluaa kujan näkyviin myös kaaren sivulla, vaihtoehto on ylitse kiertävä nosturiliike (ei kokeiltu).
2. LT:n GPU-tulos → PT.
3. F/G-kaiteet (C2 r 1/2) LOD1:n kanssa. LR:n kaiteettomat LOD0:t ovat kielletty-c2-v1:ssä (f-taihemen-lod0-kaiteeton.glb, g-jalusta-lod0-kaiteeton.glb).
4. hahmot-v5/v6/v7-koe EI ole ämpärissä: JU/PK vievät ennen junaa. hahmot-v7 on kumulatiivinen, joten se riittää.
5. Sivuote tarvitsee pelitilanteen (KK).

## Opit
- Tarkista `ls -ld` ennen muokkausta: koejuuren kansio voi olla symlinkki toisen roolin kansioon. Vahinko korjattiin heti, v1:n SHA täsmäsi.
- Editorin kuva-komento syö ~1 s peliaikaa → lyhyet vaiheet kuvataan lokilla (0,1 s välein) tai pysäyttämällä autopilotti.
