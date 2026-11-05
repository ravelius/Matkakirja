# PT:n luovutus 4.11.2026 klo 19.06 (konteksti 30 %, pehmeä raja)

Keskustelu: katso /Users/Shared/Claude/keskustelut/ uusin Paatoimittaja-2026-11-04.
Edellinen: viesti-fable-luovutus-20261104-1719.md (sen KK:n sanat, Levy ja Opit voimassa; muu korvattu tällä).
Vahdit: odottajat-vahti ja postilaatikkomonitori. Posti käsitelty aa2672f4b asti. ODOTTAA → talo/toimi-keskustelukanava-odottaa taululle (R6VQ), JATKUU → poista if_versionilla.

## OMISTAJAN PÄÄTÖKSET
- 18.27 Louvre ja Sainte-Chapelle seuraavaksi; lähekkäisille yhteinen pohja, omat mallit; erilliset puut, ei 3D-maastoa (Raamattu 2.206, PR 6256 mainissa). KK:n valtuutus jatkuu ("Jatkan"). Eiffel vain omalla kortilla. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261104-lisaa-nahtavyyksia.md, osat A–D.
- 18.27 "puut näyttävät olevan aivan liian kirkkaita".
- 19.01 "Kirkko näytti hyvältä. Kallistumiset eivät haittaa." (92c47e215, valo v4): tornien kallistumaa ei korjata; harmaa laikku (VS) ja leijuva vene (KS) korjataan.
- 19.03 Louvre ja Sainte-Chapelle: sama valo, mallin omat värit. Muut 3D-merkit ruskeina, oma kortti myöhemmin.

## JUNA 219: PÄÄTÖS AUKI, EI JULKAISUA
Koerunko d9cde0f50: k60 3337 Mt, k45 3804 Mt, 0 varoitusta. Rungossa ei ole striimityyliä tarkoituksella (694e1783a, e4180ac69 puuttuvat).
Ratkaisee:
1. Muurikorjaus 789f3046f (d9c + JuoksuLattia.shader). Muurin aukko on d9c:ssä ja julkaistussa TF 60bd5c356:ssa (Mac; katsoin molemmat). Mac: aukko umpeen, muuri naapuria tummempi (LAV:lle, ei estä). iPad: lahtotaso 4084 Mt, VIKA, raja 4080. Vertailu d9cde0f50 samalla ajolla JU:lla: siitä nähdään, onko syy korjaus vai runko. Korjaus muuttaa vain varjostinta: älä oleta syytä.
2. Katon oranssit palat taivaalla: d9c:ssä ja 789:ssä; TF ja tekijä auki (PK, rivi minulle).
3. p-z15:n vaakaraja ja taivaan portaat: myös c4a5bfafb:ssä (3642 Mt), ei d9c:n uusi vika. TF:llä ei ajettu, ei laitekansiota.
4. Seuraavaan runkoon: NUI nousu-pieni-219 63383ba6e (KK 17.58, kirjattu junaan).
Terassi-v1b (182027cef52c, korvaa v1): oma haara d9c:n päälle, paikallinen juuri, ei junaan.

## ROOLIT
- NOLLAUSREITTI MUUTTUI: Postivahdin clear_session kieltäytyy sessioista, joita se ei käynnistänyt. Toimi 18.0x asti; kielto alkoi sen oman 18.10-nollauksen jälkeen, syy auki. Ohjasin 18.5x: roolit nollaavat itsensä (self, 7.37), Postivahti lähettää aloitusviestin. VS, LAV ja ilmeisesti muut toimivat; Postivahti ei ole kuitannut riveittäin: tarkista. Pyysin, ettei se nollaa itseään kertomatta minulle.
- VS: e22 672f4f9d1 (6469e76e7 + b2101b95e) JU:lla iPadille, 48 kuvaa. Offline-koe Macilla A 2d1084b18, B c968fe777; laite todistamatta, KK tietää. Sitten ND-pohjan laikku. Alppien valtionrajan tyyli KK:lla.
- KS: nd20d toimitettu aa2672f4b; puiden kirkkaus 834376445 kuvat valmiit 18.42. Sitten A–C ja 19.03. Vene.
- PK: katon palat, 789:n iPad, kk3:n kaide, ovet (KK 17.24). Ovet-esineet 974: 4055 Mt, ei junaan; ovimalli mittaamatta.
- LAV: kk2:n pilkkukuvio, erottelukoe JU:lla, kk2 seis. Muurin valo jonossa.
- NUI: lippu 99eb9931e ei kelpaa (Norjan ankkuri, iPhone-vaakan säde 0 pt); korjaus ja uusi ajo.
- NS: ei työtä; b2101b95e VS:n ajossa.
- JU: ks. jonoloki /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt.

## LEVY JA AUKI
Levy 74 Gi (sääntö 100). T7 → NAS -siirto tekemättä. Työlistan vanhat rivit (Olavinlinna, napit, Olavinlinnan väki): ei uutta tietoa.

## OPIT
- Oma virhe: hälytin d9c:n väreistä, vaikka JU:n luovutuksessa luki, ettei rungossa ole striimiä. Tarkista commitit ennen kuin vertaat kahden rungon kuvia.
- Oma virhe: kerroin KK:lle ja lokiin "NS selvittää", vaikka pyyntö oli vasta Postivahdin jonossa ja katosi nollaukseen. Sano "pyydetty", kunnes vastaanottaja kuittaa. Samasta syystä nollauskielto jäi huomaamatta noin 40 min: tarkista kuittaus.
- PK muutti muurin arviota kahdesti: avaa kuva itse ennen junapäätöstä.
