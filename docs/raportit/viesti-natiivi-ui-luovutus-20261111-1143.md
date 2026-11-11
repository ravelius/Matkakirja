# Natiivi-UI: luovutus 11.11.2026 klo 11.43 (kontekstivahti 26 %; korvaa -1125:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a. TYÖTAPA: näkyvät suoraan KK:lle, PT kopiona.
Taustat (testikomennot, A–E, NS kohta 6 diagnoosi): -1125, -1027, -0951 (haarat natiivi-ui/luovutus-20261111-*).
Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo (remote natiivi-backup; push `git push natiivi-backup HEAD:refs/heads/<haara>`),
nyt haarassa natiivi-ui/esittely-mallirajat. Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null` (taustalle, ~3 min).
TALLENNEVIKA KORJATTU (JU 11.4x: f2511a80f / juna 224 17fbf3e35): jos skenaariossa kuvia tallenteen jälkeen, yhdistä korjaus omaan haaraan.

## 1. ESITTELYN RAJAUS MALLISTA (KK 11.3x + 11.38 kohta 2) – kohteet-arkki-2 JU:lla ajossa
- KK:n sääntö: jokainen kohde, jolla on malli (Tripo tai koodi), rajataan mallin omista rajoista samalla tavalla; kyltti ei ehto; maisema vain
  ilman mallia. Kohde kierrossa ~1/3–1/2 ruudun lyhyemmästä sivusta. EI kohdekohtaisia rajauksia. Kameran liikkeisiin ei kosketa.
- 16ed591a7: NahtavyysEsittely.Mallikohteet() = Kylttikohteet + luodut koodimallit (OhjelmaKohteet.KoodiMalli, georeferenssin lapsi) ilman
  samannimistä kylttikohdetta; OnMalli ja Mitat käyttävät sitä (Orsay oli maisema 2,4 km). Rajoitus: koodimalli löytyy vasta kun se on luotu.
- 919e7e855: Rajat(keskelle:true) – säde ja kiertopiste mallin rajalaatikon vaakakeskipisteestä, ei kyltin pisteestä (ND säde 141 m ≈ kyltin piste
  ~85 m katedraalista → ~15 %). Loki: "mallin keskipiste X m kohteen pisteestä, säde Y m". VaistaEsteet ennallaan.
- VÄLITULOS orsay-rajaus-1 (16ed591a7, ajettiin ennen peruutusta): Orsay mallina 330 m, ~puolet ruudusta, lähin Seinen yllä ilman seinää;
  SC ja GP ennallaan. Arkki lokit/nui-orsay-rajaus-1-16ed591a7/arkki-orsay-rajaus-1000.jpg viety KK:lle 11.4x (SC pieni = mäki mallissa;
  ehdotettu SC:n koodimallia oletukseksi, jos keskipiste ei auta).
- AJO: kohteet-arkki-2 (skripti _tyo/natiivi-ui/sk-kohteet-arkki-2.txt) → lokit/nui-kohteet-arkki-2-919e7e855. orsay-rajaus-1 peruttu.
- SEURAAVAKSI: arkit kuten -1125 kohta 3 (montage 5×3 osat + -1000-kopiot, `montage … -tile 5x3 -geometry 600x450+6+6 -label '%t'`), vertaa
  arkki-1:een (lokit/nui-kohteet-arkki-1-17ddd9e1c/arkki-kohteet-osa1…4-1000.jpg), arvioi 1/3–1/2-tavoite jokaiselle 12:sta.
  Huom: Sacré-Cœurin Tripo-mallissa on mäki (maa 207, säde 158) → jos jää pieneksi, KERRO KK:lle (mallin asia), älä paikkaa rajauksella.
  Orsayn lähin: jos talon seinä kameran ja kohteen välissä, kerro KK:lle. → KK suoraan, PT kopio, KS:lle tieto (KJ40-vertailu).

## 2. NS:n saapumiskoe kohta 6
- (a) TEHTY 05d55e239 (natiivi-ui/luenta-ohita-paikka, NS:n d7a60539d:n päällä): Kuvat.Kaistale ei M-nappia (MNappina → Rect.zero);
  AsetaPaikka: kuva ja Ohita oikean yläkulman nappien (Karttaselite KaupunkiNapit/Nappi/LinssitNappi) alle + Vali.S. NS ottaa seuraavaan ajoonsa.
- (b) mac-4 s5b/s6/s7: lappua ei näy lainkaan → pyydetty NS:ltä aika/kehys, jos näkyy.

## 3. MATKAOPAS (KK 11.38 kohta 3) – EI ALOITETTU (iso; uusi istunto)
Rakenne hyväksytty (kartalla vain Lehti, Matkaopas Lehden sisällä). Ennen junaa:
- (a) Etusivun Matkaopas-juttu (Lehtinakyma.Matkailijalle(kaupunki:true), 2c75bcf22/237e44e6f): pysty-Eiffel leveässä laatikossa → kuva ~1/3
  vasemmalle, teksti ja linkki oikealle; kuvaksi jo ladattu Pariisin kuva liikkumisesta tai katuelämästä (ei Eiffel).
- (b) "Matkaopas →" avaa nyt Nahtavyysarkki.AvaaOpas (oma arkki kartan päällä, kuva lokit/nui-matkaopas-2-2c75bcf22/m3). KK: sivun pitää tuntua
  Lehden sivulta (sama paperi, paluu etusivun samaan kohtaan). Vaihtoehdot: opas Lehtinakyman sivuksi (TaitaOpas-sisältö ScrollViewiin, paluu
  tallennetulla scrollOffsetilla) tai arkki Lehden paperina Lehden päälle niin, että sulkeminen palaa samaan kohtaan. Ajattele KK:n linjalla
  (yksi sääntö, ei erikoistapausta). Todiste KK:lle: etusivu, avattu sivu, paluu (kuvat ennen tallennetta).

## 4. Junaan / JU
- pallo-maa-3 27ef4dd78 HYVÄKSYTTY (KK 11.38) → JU:lle junaan pyydetty 11.4x (ei 6ab7d27b0-mittausriviä).
- JU:n uusinnat katse-2 (24c2e8fa0) ja lento-3 (f62e126c8) tallennekorjauksella → tulokset KK:lle (luvattu), PT kopio.

## Avoimet kysymykset: ei. Remote Control: Postivahdin aloitusviesti pyytää, työkalu sallii vain omistajan pyynnöstä → ei kytketty.
