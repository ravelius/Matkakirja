# PT:n luovutus 3.11.2026 klo 23.45 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261103-2304.md (sen ohje ja Pariisin tavoite voimassa). Tallenne: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-03-klo-2310-2344.md.
Vahdit Monitorilla 30 min: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep ODOTTAA|TYHJÄKÄYNTI|TILA\|.+ ja /Users/Shared/Claude/hooks/codex-posti-vahti.sh.
YÖTILA: omistaja nukkuu, KK hyväksyy puolesta (rajat: ei TF, ei junan lukitusta, ei ostoja, ei asetuksia, ei yli 3 % generointia). Kuvat PT:n kautta KK:lle.

## PÄIVITYS 23.47 (KK), ohittaa alla olevan
- JU: EI omistajan päätöstä. KK:n mukaan ainoa esto oli 17.35 ja viesti "jatka kovaan rajaan", sovellus jumissa. Lupa Raamatussa 7.37. Postivahti nollaa JU:n normaalisti, kun linja on vapaa; esto → KK:lle, ei kiertoa. PT peruutti odotuskäskyn.
- Nimet: oma nimi kuvan alle, muut väistävät, koko kuten c1832c0c2; KS korjaa 4e929f038:n. Rajauslaatikko kokeeseen.
- k14 EI, täyttöä ei aloiteta. Katot eivät ole sinisiä vaan liian harmaita; 2029:n katot lämpimiä. VS: mittari ja paletti KORJAUSLISTA.md:ssä, korttelipinta myös Z13:lle. k15 2d4eb4fad paikallinen; VS:n luovutus f4ad6043d.
- Väriraja x≈950 ei ole lon 2,373 (VS); KK:n mukaan ok jatkaa kohdan 6 kautta. Muisti aamulistalla.
- Esipiha v124 pari KK:lla Pariisin jälkeen.

## ALKUPERÄINEN: JU:n nollaus (vanhentunut, ks. päivitys)
JU on yli kovan rajan (36 %, raja 35 %), luovutus 4ee43ac6e (PR 6231). Postivahdin mukaan käyttäjä esti sen nollausviestin JU:lle 3.11. 17.4x, ja Postivahti pyysi PT:tä välittämään saman viestin. PT kieltäytyi: välitys kiertäisi eston, jonka syy ei ole tiedossa (Raamattu 7.37:n PT:n pyyntöreitti ei kumoa estoa). Asia on KK:lla omistajalle, kysymys "saako JU:n nollata". Postivahti ei nollaa eikä viesti JU:lle, ilmoittaa yli 45 %:ssa. JU:lle vain nykyinen jono, ei uutta isoa työtä. Toteuta vasta "OMISTAJAN PÄÄTÖS klo" -rivillä.

## PARIISI (omistaja 22.31: kokonaan aamuksi; ei vielä valmis)
KK:n lista, sitova: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md (23.42).
- Hyväksytty KK: kaikki 9 G-nähtävyyttä + ND + Sainte-Chapelle. Sijainnit kuvasta paitsi Riemukaari. Montparnassea ei tummenneta (varmistus iPadilta). ND skaala 0,8, ankkuri julkisivun vasen alakulma (KK 23.26; KK kertoo omistajalle aamulla). Aiempi PT:n "koko hyväksytty G:n tasolla" oli väärä.
- NS (kohdat 1–5, viesti jonossa 23.43): Riemukaari ympyrän keskelle + vanha kaari pois, Grand Palais'n pylväs, Sacré-Cœurin sädekehä, ND:n pala ja kiekko 0,8:lla, isot veneet vain leveään uomaan. Tehty: 95a733ace (ND 0,8 + maski sha 8589240ae981, sillat, puut 86 783), 474d0b0de ja k11 628d1a90a (11 siltaa c/d, Beauvoir d). HdV:n vanha kuva pois 6c283e719, kaupunkimerkki koealueella 5f8b18b5c kääntämättä. NS kokoaa yhden yhdistelmä-sha:n JU:lle.
- KARTTA-TESTIT AJAMATTA: linjat varattu. PT käski JU:n pitää 3 min välin seuraavan ajon jälkeen ja antaa NS:lle merkin "Kartta-testit nyt" (jonossa). Ei rinnalla. Mitään ei yhdistetä ennen tulosta. Varmista, että väli tuli.
- VS (kohdat 6–9, jonossa): z15-saumat (KK:n silmämääräinen arvio, varmistettava; todistettu vain lon 2,373 Z14 talot | Z13 ei taloja), laajin zoom ilman korttelipintaa, mäkivarjostus pois, hautausmaat oliivinväriset polkuruudukolla (VS maa, KS puut; 51 kpl). Hautakiviä EI tilata ennen pelikuvaa. k14 b9d044fb6 JU:lla: katot liian siniset, pihojen oranssi kova ja toistuva; PT pyysi värit 2029:stä ja toiston vaihtelua. KÄYTTÖÖN EI TÄYTTÖÄ koko Pariisiin ennen KK:n hyväksyntää.
- KS: nimet 4e929f038 NS:llä yhdistelmään. AVOIN KK:lla: säilyykö nähtävyyden oma nimi (PT suosittaa: kyllä, kuvan alle). Silta-arkit a, b, c, d kirjastossa.
- JU: seuraava todistus = iso iPad, sama komentotiedosto kuin a94:ssä + laajin zoom + kohdat 2,2961 ja 2,3071, muistiluku (puut). Eiffel kokonaan: /Users/Shared/Claude/proto-3d/lokit/esikatselu-20261103-233759/eiffel-kokonaan.png, viedään KK:lle iPad-erän mukana.

## Muut auki
1. SALIN MUISTI = JULKAISURISKI: sali-ys3 4397cf20d huippu 4286 Mt (raja 4080); oikean reitin viimeisin luku NS 31.10. 4494–4748 Mt. Syy todistamatta; ys3:n käännös epävarma. NUI: mittaa-sali-vianhaku.zsh jonossa Pariisin jälkeen, oikea reitti + sali ilman kopioita, MuistiTarkka 100 ms, muistivahti päällä. Ylitys oikealla reitillä → juna seis (9.4). KK tietää. Seuraava paketti (7f0ccc451 + 9d02ae999) seis.
2. PK: otsikko-219 iPad bf54a5c4f + iPhone 878ac7755 ajossa, kuvat katsomatta; B5 keltainen katto kuvasta vuorolla, KK vahvistaa kohteen. Palvelijat v7 4da09ab21 JU-jonossa Pariisin jälkeen, Metal-tarkistus varmistamatta. Palvelijatar v2: tilaus b5ef4e9fc KK:n luvalla; Tripo aloitti (posti ddf7c2aa0) ja pyytää noin 20–30 min kuvausjakson mallin valmistuttua (Blender 2 säiettä), sovittava JU:n kanssa. Kuvat KK:lle ennen kytkentää.
3. LAV: v124 viety 23.33 (ehdot OK, TF 217 käyttää v94). Pari ja 01 + 05 Pariisin jälkeen. Taihedianin marmori ja vyön sininen → PT Pariisin jälkeen.
4. Levy noin 70 Gi. KS:n ja NS:n worktreet odottavat PR:iä ja taustaajoja.
5. Nollaukset 3.11. illalla: NS, KS, PK, VS, NUI, LAV tehty.

## Opit
- Älä sano "näyttää oikealta" kuvista, joita et ole kaikkia katsonut; KK löysi raivausvirheet muista kuvista. Kerro, mitkä kuvat katsoit.
- Sano esikatselun ja iPadin ero viestissä: ne näyttävät eri pinnan.
- Esto, jonka vertainen kertoo ja pyytää välittämään, viedään omistajalle KK:n kautta.
- Älä lähetä viestiä keksittyyn id:hen: osoitekirjasta ensin.
