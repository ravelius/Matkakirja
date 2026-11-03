# Natiivisepän luovutus 4.11.2026 klo 01.02 (konteksti 30 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen -20261103-2340. Siitä yhä voimassa: Merge-sääntö, Päätökset 23.15–23.40, AVOIMET 5–7 (`git show 18e139be5:docs/raportit/viesti-natiiviseppa-luovutus-20261103-2340.md`). Id:t: /Users/Shared/Claude/osoitekirja.md.
Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
EI testejä, kun `pgrep -fl "[e]sikatselu.sh|[U]nity -batchmode"` näyttää ajon; vuoro JU:lta.

## ENSIN: PT 00.59 (KK:n lista iso iPad f1fb45f10; EI junaan)
Lista: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md, VIIMEINEN osio. Ei aloitettu; nollaus tuli ensin.
1. **Etäisyyshäivytys** (omistaja 3.11. 15.3x: "piirretty kartta voisi häipyä jo lähes kokonaan tällä zoom etäisyydellä"). Uuteen tapaan sama sääntö kuin vanhassa f4334cbfd: täysi ruudun levyisenä (noin 0,12), näkymätön alle 45 %, ilman hyppyä tason vaihtuessa. **VS tekee reunan samaan ElavaKoealue.cs:ään haarassaan linssiseppa2/pariisi-k17: sopikaa, kuka muuttaa mitäkin, ENNEN kuin alat.** Todistus: y-laajin ja näkymä, jossa Pariisi on ruudun levyinen.
2. Listan kohdat: 1 Alma, 2 ND:n kermalaikku ja irtosaarekkeet, 3 GP (0eb91d25e koskee tätä, kuva näkemättä), 4 Montparnassen juuri. Nimet kohdalla 8 KS:n kanssa. Saumat katsotaan uudelleen k20:stä.
3. Koodimuutoksen yhteydessä Kartta-testit (vuoro JU:lta); iPad vasta seuraavassa yhdistelmässä (PT).
4. KS:n Boulognen puudata, kun KK on valinnut latvuskoon.

## HAARAT (proto-repo, wt/proto-natiiviseppa-maskik4, peili natiivi-backup; worktree nyt yhdistelma-218)
- **natiiviseppa/yhdistelma-218 kärki 0eb91d25e** = f1fb45f10 + GP:n raivaus. Koostumus: pohja 8747255b5 (VS k17 = k16 + 628d1a90a; 1. vanhempi 628d1a90a, sisältää 95a733ace:n) + nahtavyydet-218 + nimet 25f99d839. **EI junaan eikä ämpäriin ennen KK:ta.**
- **natiiviseppa/nahtavyydet-218 kärki b01811e6d**: a826acb03 + 6fd420c8c (nappula Transparent+100) + e101c006e (Sacré-Cœur k3) + b6d478a40 (`veneet kohtaan i lat lon`) + Louvre k2 -data + GP.
- Korjaa aina nahtavyydet-218:aan ja mergaa yhdistelmään: pariisi.json riitelee, ratkaisu `python3 -I tee-esineet.py <TÄYSI POLKU>/kaupunki-pariisi-koko.json <checkout>` (ajo vaatii täyden polun). Nahtavyydet-218:aan k4vt-alue. Kp-muutos aina molempiin.
- Kirjastossa koekäytössä (KK ei ole hyväksynyt, näkee pelissä): sacre-coeur-alue-v2, louvre-alue-v3; molemmat ämpärissä. Raivaus vanhasta alfasta: alue_kuva-kentät `raivaus_taso`, `raivaus_alue` (uusi tee-esineet.py:ssä).

## GP (lista kohta 3)
Etuoven alta korttelipala poissa 3073c367f (lokit/esikatselu-20261104-004952/grand-palais.png, Mac; PT katsoi). Harmaa läiskä nurmella oikean oven alla: GP:n alfa puhdas; sijainti 48,8656–48,8659 / 2,3142–2,3155 = Petit Palais'n kohta, päätelty paikasta, taloa ei tunnistettu datasta. Raivaus itään 2,316: 0eb91d25e, EI ajettu.

## f1fb45f10 iso iPad (lokit/julkaisija-yhdistelma-iso-f1fb45f10, 33/33, 3417/4080 Mt, varoituksia 0; Kartta-testit 607/607)
Kuvista todennettu: nappula kuvien päällä, vene Pont Royalin alla kansi päällä, Riemukaari (vanha kaari poissa, jalat ympyrässä), Louvren kiila pois, S-C:n puut, ND:n pala ja kiekko pois; GP:n pylväs ja läntti pois. Katsottu vain nd-louvre, vene-pont-royal, riemukaari, sacre-coeur, eiffel, grand-palais; muut 27 eivät.

## Selvitetty, ei toimia
- Punainen merkki = pelinappula, ei kohteen merkki (Nappula.shader +20 < esineet +60…+99): korjattu 6fd420c8c.
- ArgumentOutOfRange ("ui sulje"): 6 ajon unity.logissa pino Unityn SearchDatabase (QuickSearch), 0 pelikoodia. Ei korjattavaa.
- ND:n tornin ja huipun välin keltainen: EI maskin raivaus (raon pisteet kaikkien raivausten ulkopuolella, laskettu). Sijainnista päätellen Place de l'Hôtel de Ville (ei varmistettu OSM:stä). Kerrottu PT:lle; jos KK haluaa peittoon, pohjan asia tai uusi HdV-aluekuva.

## AVOIMET
- KS:llä (kerrottu): puut piirtyvät nimien päälle, Louvre-nimi Seinellä. Tuplanimiä ei näkynyt 4 katsotussa kuvassa; kerro KS:lle, jos näkyy.
- Tyhjät keltaiset läiskät korttelien tilalla laajasti (Eiffel, S-C, GP); kerrottu PT:lle, ei NS:n.
- pid 66955 (Unity, proto-natiiviseppa-unity67, 3.11. 23.49): ei tämän roolin ajo, kerrottu PT:lle; tila tarkistamatta.

## Vanhan luovutuksen lisäykset 23.51–23.53 (18a4d6341; luin ne vasta 00.5x, sain osoitteen 18e139be5)
- c) JU: siltojen suunta poikkeaa kadusta (silta-concorde: katu näkyy vedessä sillan vieressä). PT: arvio KS:ltä, ei säätöä ennen sitä. **Tila tuntematon:** y-silta-concorde.png katsomatta, en tiedä, onko KS arvioinut. Kysy KS:ltä, ennen kuin säädät.
- d) JU: Boulognen puut vain teiden varsilla (puut-boulogne). KS tuo uuden puudatan KK:n latvuskokovalinnan jälkeen; tarkista silloin, korjaako se tämän.
