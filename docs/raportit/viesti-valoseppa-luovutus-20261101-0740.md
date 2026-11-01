# Valosepän luovutus 1.11.2026 klo 07.40

Syy: konteksti 29 % (pehmeä raja). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 06.1x–07.40).
Edellinen: viesti-valoseppa-luovutus-20261101-0609.md (työtavat voimassa). Proto: haara `linssiseppa2/k17-piha06-216`
(worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k17), kärki **2fc42c04b**. Skriptit `_tyo/linssiseppa2/skriptit-20261031/pari-k06z9…13.zsh`.

## TEHTY
- NS:n liikevahtikorjaus b9f46d37a poimittu haaraan (1330d28c5, TaivasPalat.cs Lerp-rivit liikepoikkeuksiksi).
- Räystään alusvarjo, kierros 1 (kontrastivenytys leivotusta valosta, k06z9–k06z11): b2 (0,35/2,5/0,45) osui tavoitteeseen
  (ylin 1/4 0,61–0,70), mutta **PT 07.4x hylkäsi**: venytys vahvistaa leivonnan tekselilaikut, näkyvät kaukokuvassakin. Sumennus pelissä ei
  onnistu (mip-siirto ei vaikuta suurennetussa atlaksessa; gradienttisumeus vuotaa kolmiosaarten rajoilla vinoiksi saumoiksi).
  Kaikki revertoitu 13fe8b7a5. Selvitys `_tyo/linssiseppa2/alusvarjo-tulos.md`; kuvat lokit/pari-k06z10-20261101-064439/.
- Leivonnan tiheä profiili: julkisivun ulkopinta 0,28–0,32, ylimmät ~2 m → 0,17 (sisäseinät 0,01 sotkivat aiemman keskiarvon).
  Työkalu `_tyo/linssiseppa2/tyokalut/alusvarjo_profiili.py` (o3-kuvan julkisivun 13 kaistaa, suhde alimpaan).
- Kierros 2 (PT:n ehdotus: pehmeä pystygradientti räystäslinjasta, ei leivonnasta): **räystäsliuku** 96a0a64fe + 5d75ef4d7 + 2fc42c04b.
  Latauksessa (RakennaSolmut) seinäkärjille pystysäde ylös → lähin räystäs/palkki/katto saman rakennuksen osista ("…lodN"-avain,
  JuoksuV4Maailma.Valo.cs RaystasLiuku), tulos UV2 = (räystään y, 1); JuoksuMaailma.shader vert → `ry` (maailman y), frag
  `valo *= JuoksuRaystasLiukuK(i.ry, i.w.y, n)` (JuoksuValo.hlsl: lerp(alku, 1, smoothstep(0, pituus, räystäs − y)), vain pystypinnat).
  QA `valo raystasliuku voima [alku] [pituus]` (kytkee kärkilaskennan seuraavista latauksista; skenaariossa ennen mallit-riviä). Oletus pois.

## AVOIN 1 (junan 216 viimeinen valoehto): räystäsliuku ei vielä näy piha 06:n julkisivussa
k06z12/k06z13 (lokit/pari-k06z13-20261101-073410): profiili identtinen b0:n kanssa; vain friisin tummat 0,09 → 0,20 % (b3).
SYY (todennäköinen): piha 06:n julkisivu piirretään osasarjan instansoiduista moduuleista (`palatsi osasarja-valo 1`,
JuoksuSokkeloMaailma.Osasarja.cs, LeivotutMateriaalit), joiden verkot ovat moduulikohtaisia → säde ei näe toisen moduulin kattoa;
RakennaSolmut-polun Meridiaaniportti (runko+palkit/katto) sai osumat (736), mutta ei ole se, joka näkyy.
SUUNNITELMA: **maailmankoordinaattinen räystäskartta** (yksi R16F/RHalf-tekstuuri ylhäältä, esim. 0,5–1 m/solu juoksualueelle): kun
osat on sijoitettu, rasteroi kaikki ei-pystysuorat ei-alfa-kolmiot maailmassa → solun alin varjostin (alaspäin katsovat pinnat ja katot;
lattiat/maa pois: vain y > maa + 2 m). Varjostin: näyte i.w.xz + n.xz·0,25 → räystään y → sama JuoksuRaystasLiukuK (korvaa UV2:n).
Toimii instansseille ja kaikille rakennuksille. Ennen toteutusta: varmista kuvan julkisivun piirtäjä (QA `mika 0.275 0.40` k06z8:ssa →
nimi), ja kysy PT:ltä, kelpaako kartta (muisti ~1–4 Mt). Sitten pari b0/b3 + kauko → PT (pari-k06z13.zsh pohjana).
Mahdollinen siivous: jos kartta toteutetaan, UV2-laskenta (RaystasLiuku, raystasOsat) pois; nyt se maksaa latauksessa kk-taustoilla
70–310 ms/laatta, mutta vain kun QA raystasliuku on annettu (oletus Laske = false).

## AVOIN 2 (ennallaan edellisestä)
- NS:n kuittaus taivaan cherry-pickeille: NS vei v3-8192:n runkoon junaan 216 (viesti 06.3x), simukuva tulossa.
- Lokit T7:lle kuittausten jälkeen (PT:n siirra_lokit_t7.py); LAV v4 odottaa levyä ≥ 70 Gi.

## Työtavat (lisäykset)
- `pari-k06z9…13.zsh <tagi>`: juuri-k06z8, o3-kamera (2.4 6.5 3 45) + kaukokuva (2.4 35 2 55), mittarit raystas_mittaa.py + alusvarjo_profiili.py.
- Testikameran "alas" positiivinen = alas (k06z7:n −20 katsoi ylös).
- Kooste scratchpadissa: kooste.py <E> <ulos> <tagit> <rajaus> (kopioi talteen tarvittaessa).
