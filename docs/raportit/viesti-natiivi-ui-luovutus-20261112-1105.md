# Natiivi-UI: luovutus 12.11.2026 klo 11.05 (tiivis, Raamattu 7.37; konteksti 25 %)

Natiivikoodi: natiivi-backup-remote, worktreet /Users/Shared/Claude/wt/nui-*. Mac-ajot JU:lla, lokit /Users/Shared/Claude/proto-3d/lokit/,
skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/. Käännöstarkistus: <worktree>/Peli-testit/unity-tarkistus.sh (rc 0 = 0 virhettä).
Kello date-komennosta. Kuvat ≤ 1000 px pienennöksinä omaan katseluun, KK:lle täysikokoiset rajaukset (PIL crop).

## AUKI (järjestyksessä)

1. TARINAMERKKI-9 — 82e5d93f2, haara natiivi-ui/tarinamerkki-koe-2, worktree wt/nui-tarina. JU:lle ajopyyntö 11.03,
   skenaario sk-tarinamerkki-9.txt → lokit/nui-tarinamerkki-9-82e5d93f2 (kk-, k-, l-curie-pasteur, l-pelaaja).
   - KK 10.58 HYVÄKSYI -8:n (cbf463a7f): TarinaKoko 0,55 (ympyrä 53 px vs tähti 57 px kaukonäkymässä), nimien väistö ok.
   - KK 10.58 PÄÄTÖKSET, tehty 82e5d93f2:ssa: (1) ei ryhmittelyä; ruudulla päällekkäisistä datan ensimmäinen, toinen palaa kun
     väli > 1,2 × halkaisija (TarinaPaluuKerroin); (2) sama piste samoin; (3) tähden alle jäävät tila-riville ("tähden alla").
     Merkit vain kehittäjälle (TarinamerkitNakyvat = KaupunkiMerkit.Kehittajatila).
   - JUNASANA EHDOLLA: (a) pelaaja ei näe merkkejä (tehty; -9:n l-pelaaja + tila "näkyvät ei (pelaaja)", piirretty 0) ja
     (b) kk-rajaus Curie–Pasteurin kohdalta oikealla datalla: Curie näkyy, Pasteur piilossa; lähempää molemmat.
   - TARKISTA -9:stä: tila-rivit (päällekkäin piilossa: pasteur-1862 kk:ssa, ei l:ssä; torni-romuraudaksi aina; tähden alla
     bastilji-1789), rajaus kk Curie–Pasteur (lat 48.8421, lon 2.3464). OK → KK:lle YKSI viesti: rajaus(et) + yksi rivi
     "pelaaja junaversiossa: ei tarinamerkkejä lainkaan (vain kehittäjätilassa)" → junasana → pt-ok PT:ltä.
   - Pariisin oikea data (Kohdenostot/sijainnit.json, KK:n suunnitelman 8 ehdokasta): alle 0,6 km: tornin pari 0 m,
     Curie–Pasteur 178 m, Bastilji–Lavoisier 534 m (Bastilji tähden alla).

2. SOFIA — natiivi-ui/intro-rivit-era3: 8e9399823 introrivi "Banja Bašin moskeija · n. 1566" (KK:n junasana 10.14) +
   d2cc209da Aarretehtavat/eurooppa.json r925 samaan asuun (KK 10.14: ei uutta junasanaa). pt-ok PYYDETTY PT:ltä 10.16.
   Vientitiedostot (sijainnit.json, oppaan kierros) päivittyvät viennissä (web PR 6599): EI käsin.

3. KORTTIEN TARKISTUS (KK 10.52) — VASTATTU KK:lle 11.00 yhtenä viestinä (saapuminen-ja-intro + ui-pohjat, tiedosto:rivi).
   Tarjottu: koodin vanhentuneet kommentit (Aloitusnakyma.cs:13-17, KaupunkiIntro.cs:215-222, IssKohdevalikko.cs:11-25)
   omana committinaan, jos KK haluaa. Odottaa KK:n vastausta.

## VALMIIT TÄNÄÄN (ei toimia)
- Luennat-asetus 0b7f0e02f: KK:n ehto täyttyi (9286 v12, Sainte-Chapelle 5f2b0ca0….mp3), pt-ok 09.23, JU vie 224.107:nä
  (KK 09.38: v12, ei v13; 2a:n faktatarkistus kesken). ManifestiOletus pysyy v11:ssä viimeiseen erään.
- Introrivit erä 3 755936ac8 linkissä 224.105 (d0a85b85c).

## HUOM
- Tarinamerkin tila-rivin pt/px-luvut ovat batchin 640×480-ruudusta: älä raportoi niitä laitteen pt:nä.
- Tila-rivin "nimiä alla" listaa ympyrän + 4 pt varan alle osuvat nimilaatikot; reunakosketus näkyy listassa, vaikka kuvassa
  nimi on kokonaan näkyvissä. Kuva ratkaisee.
- KK:n viestit: local_d5f31591…; PT local_8d8ebf72…; JU local_2a7d6c96… (osoitekirja /Users/Shared/Claude/osoitekirja.md).
