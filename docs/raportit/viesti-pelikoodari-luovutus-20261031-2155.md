# Pelikoodari: luovutus 31.10.2026 klo 21.55 (konteksti ~40 %)

Edellinen: -20261031-2045 (lisäykset 2–3). Muistin tila: pelikoodari-tila-20261018-aamu.md. Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto.
Worktreet: wt/proto-pelikoodari-reitti-216 (pelikoodari/reitti-216, kärki c2ecc5896), wt/proto-pelikoodari-lod-216 (pelikoodari/tausta-lod-216,
kärki 8d0ce1dec), wt/proto-pelikoodari-v98c (pelikoodari/valo-k1-216 8bcfebdf2, ennallaan). Tiedot: _tyo/pelikoodari/reitti-216/c4/terassi-ja-c4.md.

## Valmista tässä vuorossa (reitti-216)
- 653d65819: kameraväli-lokiin lisätty noston syyt: `tavoite A → B m` (ennen ja jälkeen nostojen), `tarve` (muurin korkeustarve),
  `tunneli` (tunnelipito; negatiivinen = portin jälki päällä) ja `kamera` (todellinen korkeus).
- 1e4f33ecc + d2e2ab9c2: leijuvat harjakoristeet (PT:n c4-lista kohta 2) ovat koristeet.json:n eläinrivejä, chiweneitä ja chuishoita
  rakennuksilla, joiden katto puuttuu näkyvästä mallista. Lähikoriste näytetään vain, kun peittokartan huippu on enintään 2,5 m sen alla
  (KoristeKatolla). c4:ssä piiloon meni 12 eri koristetta (loki "lähikoriste ilmassa piiloon"). Kun LAV lisää katot, ne palaavat itsestään.
- d2e2ab9c2: portin jälkeen katettu läpikulku on muurin tarpeelle lattiaa (porttiJalki: TunneliPitoS tai kamera itse läpikulun katon
  alla). **EI RIITTÄNYT**, katso Kesken 1.
- c2ecc5896: testi OikeanPalatsinVerkkoEiKuleRakennuksenLapi (MK_JUURI) ja `MK_VERKKO_KOHTA=x,z` (kiertämätön pohja), joka tulostaa
  kohdan verkon ja rasterin kartan. 782/782 (MK_JUURI = _tyo/pelikoodari/leivonta-217/juuri-k3), unity-tarkistus 0.
- **Kohta 3 (terassi) ratkaistu:** halli on oikea (OSM 隆宗门, Longzongmen). Reitti kulkee oikein sen pohjoispuolen käytävässä z 186–190.
  Vika oli käytävän päälle ulottuva laatta, ja LAV:n tausta-v89 poistaa sen. PT 21.4x: c4:ään riittää laatan poisto.
  Muunnos pelistä pohjaan tällä alueella: pohja x ≈ −pelin x, pohja z ≈ −pelin z − 389,5 (mika-mittauksista; oma juuren siirtymä).

## Ajot
- d1 (lokit/esikatselu-20261031-205406): diagnoosi. Portista ulos tultaessa tavoitteen kohta oli läpikulun katolla → tarve 10 m.
- c4 (lokit/esikatselu-20261031-211132, c2ecc5896, 88 kuvaa, tausta vielä v81): **EI KK:lle.** Laatta on vielä mukana, ja portin jälkeinen
  nousu jatkuu: t 61,3 tarve 10,1 (tunneli −1,38 = portin jälki päällä, hetkelliset näytteet k/s+/s- −0,1), t 63,3 kamera 8,3 m ja kenttä 29°.
- m1 (lokit/esikatselu-20261031-210130, tausta-lod-216 8d0ce1dec): LOD0-taustapalojen määrä taustalod 0 → 1 (vanha → uusi):
  06 1 → 2, kuja 02 4 → 8, kuja 05 4 → 6 (23 palasta); muisti ennallaan (varattu 2181–2227 Mt, grafiikka 2186–2255 Mt molemmilla),
  koska kaikki LOD-tasot ladataan alussa. Kuvat lod0-06/lod1-06 (sauma) sekä 02 ja 05 samassa kansiossa.

## Kesken / seuraava
1. **Portin jälkeinen nousu (c4-lista kohta 1, KK:n rivi 3 sar. 8–10, rivi 5 sar. 6–9):** hetkelliset näytteet ovat nyt kunnossa, mutta
   10 m:n tarve tulee ennakosta (tarveE: VaatiiEnnakkoS 4 s, s.PisteetEdessa risteyksen yli kaikki avoimet kujat, sivunäytteet ±sv).
   Todennäköisesti portin edustan sivukujan näytteet osuvat portin seinämassaan. Seuraava askel: kirjaa lokiin ennakon suurin näyte
   (k, qk, sivu, H) kuten rEnnLoki, ja korjaa. Vaihtoehdot: (a) porttiJalki-aikana ennakko vain omalle kujalle tai ei sivunäytteitä
   seinämassaan, (b) muurin tarpeen nosto rKatton yli NostoLahemmas-periaatteella (KK: "keisari samankokoinen, kamera vain jyrkkenee").
   Tarkista sama myös toisessa portissa (c4 t 57–58: 6,4 m / 30°, ennen porttia).
   VS 21.3x: v88-ajossa b-42…45 kamera katsoo jyrkästi alas portin läpi (_tyo/linssiseppa2/reitti-v88/kooste-v88-b.jpg, rivi 2), luultavasti sama ilmiö.
2. **c5 KK:lle kokonaisena,** kun kohta 1 on korjattu ja LAV:n tausta-v89 on ämpärissä. Vaihda TaustaKansio v89:ään reitti-216:ssa
   (tai junan kautta) ja aja sama skenaario (c4/sk-c4.txt, aja-c4.zsh mallina). Huom: botti juoksee ajosta toiseen eri reittiä, joten
   kuvanumerot eivät vastaa toisiaan. Vertaa lokin ajan t mukaan. Lopuksi merge-pyyntö NS:lle (pelikoodari/reitti-216 59e5d8218…).
3. **Kulku Longzongmenin läpi (PT 21.4x, erillinen pieni lisä, ei odota c5:tä):** kun LAV:n porttiaukot (länsi ja itä, lattia y 0,70,
   askelmat) ovat v89:ssä: itä–länsi-kulku portin keskiaukosta (z ≈ 169 kiertämättömässä pohjassa; portti x −130…−104), y 0,70,
   katto piiloon sisällä (Raamattu 2.177, avoin palatsi). Työkalu: MK_VERKKO_KOHTA=−117,169 ./kaanna.sh VerkkoEiKuleRakennuksen.
4. **Taustan LOD -erä NS:lle:** mittaus tehty (m1 yllä). Lähetä VS:lle ja PT:lle kuvapari lod0-06/lod1-06 (VS:n sauma
   _tyo/linssiseppa2/k06-f0-sauma.png) ja NS:lle merge-pyyntö pelikoodari/tausta-lod-216 (06fed34e2, 8d0ce1dec) junaan 216.
5. Valo-k1-216 (edellisen luovutuksen Kesken 2): ennallaan.

## Huomiot
- Linja 2 on jaettu VS:n kanssa (lukko /tmp/matkakirja-kaannospalvelu-2.lukko jonottaa itse). esikatselu.sh lukee SHA:n ja skenaarion
  vasta lukon saatuaan, joten haaraan voi committoida vielä jonon aikana.
- `ui juoksupeli mika X Y`: Y = 0 on kuvan YLÄreuna (osumat-rivin y = 0 on alareuna).
